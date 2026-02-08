'use client';

import React from "react";
import {db} from "../../../lib/firebase";
import {useRouter} from 'next/navigation';
import {Controller, useForm} from "react-hook-form";
import {addDoc, collection} from "firebase/firestore";
import {Button, Flex, Form, Input, Radio, Select, Space, Typography} from "antd";

const {Text} = Typography;
const {Option} = Select;

interface FormData {
    fullName: string;
    guestNames?: string[];
    additionalInfo?: string;
    guestCount: number | null;
    willAttend: boolean | null | undefined;
    guestType: 'groom' | 'bride' | null;
}

export default function Questionnaire() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            guestType: null,
            fullName: '',
            guestCount: null,
            willAttend: undefined,
            guestNames: [''],
            additionalInfo: '',
        },
    });

    const willAttend = watch('willAttend');
    const guestCount = watch('guestCount');

    React.useEffect(() => {
        if (willAttend && guestCount) {
            const currentNames = watch('guestNames') || [];
            const newNames = Array(guestCount - 1).fill('').map((_, index) => currentNames[index] || '');
            setValue('guestNames', newNames);
        }
    }, [guestCount, willAttend, setValue, watch]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const guestData = {
                ...data,
                guestNames: data.guestCount === 1 ? [data.fullName] : data.guestNames,
                submittedAt: new Date(),
                timestamp: Date.now(),
            };

            await addDoc(collection(db, 'rsvp-responses'), guestData);

            router.replace('/success');

        } catch (error) {
            console.error('Ошибка при отправке:', error);
            alert('Произошла ошибка при отправке. Попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex vertical align='center' gap={24} style={{padding: 20}}>
            <Text className="ArmCoronetU" style={{fontSize: '4rem',}}>
                Հարցաթերթիկ
            </Text>
            <Text className="GHEAMariamReg containerText"
                  style={{fontSize: 18, textAlign: 'center', maxWidth: 340}}>
                Խնդրում ենք նախապես տեղեկացնել Ձեր մասնակցության մասին մինչև
                {" "}
                <span style={{
                    fontWeight: 600,
                }}>
                    Մայիսի 20-ը
                    </span>
            </Text>
            <Flex vertical gap={16} align="center">
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Space direction="vertical" size="large">
                        <Flex vertical gap={6} style={{width: '300px'}}>
                            <Text className="GHEAMariamReg questionnaireText" style={{fontSize: 18}}>
                                Կկարողանա՞ք մասնակցել
                            </Text>
                            <Controller
                                name="willAttend"
                                control={control}
                                rules={{
                                    validate: (value) =>
                                        value !== null && value !== undefined || 'Պարտադիր դաշտ',
                                }}
                                render={({field}) => (
                                    <Radio.Group
                                        {...field}
                                        style={{display: 'flex', flexDirection: 'column', gap: 10}}
                                    >
                                        <Radio value={true}>Այո, սիրով կմասնակցեմ</Radio>
                                        <Radio value={false}>Ոչ, ցավոք չեմ կարողանա մասնակցել</Radio>
                                    </Radio.Group>
                                )}
                            />

                            {errors.willAttend && (
                                <Text type="danger" className="text-sm mt-1">
                                    {errors.willAttend.message}
                                </Text>
                            )}
                        </Flex>

                        <Flex vertical gap={6}>
                            <Text className="GHEAMariamReg questionnaireText"
                                  style={{fontSize: 18}}>
                                Ո՞ւմ կողմից եք հրավիրված
                            </Text>
                            <Controller
                                name="guestType"
                                control={control}
                                rules={{required: 'Ընտրեք կողմը'}}
                                render={({field}) => (
                                    <Radio.Group {...field} className="w-full"
                                                 style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                                        <Radio value="groom" className="block mb-2">Հովո</Radio>
                                        <Radio value="bride" className="block">Միլենա</Radio>
                                    </Radio.Group>
                                )}
                            />
                            {errors.guestType && (
                                <Text type="danger" className="text-sm mt-1">{errors.guestType.message}</Text>
                            )}
                        </Flex>


                        <Flex vertical gap={6}>
                            <Text className="GHEAMariamReg questionnaireText" style={{fontSize: 18}}>
                                Հյուրերի քանակը
                            </Text>
                            <Controller
                                name="guestCount"
                                control={control}
                                rules={{required: 'Պարտադիր դաշտ'}}
                                render={({field}) => (
                                    <Select {...field} size="large" className="w-full">
                                        {[...Array(15)].map((_, i) => {
                                            const num = i + 1;
                                            return (
                                                <Option key={num} value={num}>
                                                    {num}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                )}
                            />
                            {errors.guestCount && (
                                <Text type="danger" className="text-sm">{errors.guestCount.message}</Text>
                            )}
                        </Flex>


                        <Flex vertical gap={6} style={{maxWidth: 350}}>
                            <Text className="GHEAMariamReg questionnaireText"
                                  style={{fontSize: 18}}>
                                Անուն Ազգանուն
                            </Text>
                            <Controller
                                name="fullName"
                                control={control}
                                rules={{
                                    required: 'Անունը պարտադիր է',
                                    minLength: {
                                        value: 2,
                                        message: 'Անունը պետք է լինի առնվազն 2 տառ',
                                    },
                                }}
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        size="large"
                                        className="w-full"
                                    />
                                )}
                            />
                            {errors.fullName && (
                                <Text type="danger" className="text-sm">{errors.fullName.message}</Text>
                            )}
                            {!!guestCount && guestCount > 1 && (
                                <Flex gap={6} vertical>
                                    {Array.from({length: guestCount - 1}).map((_, index) => (
                                        <div key={index}>
                                            <Text className="GHEAMariamReg questionnaireText" style={{fontSize: 18}}>
                                                Անուն Ազգանուն ({index + 2})
                                            </Text>
                                            <Controller
                                                name={`guestNames.${index}` as const}
                                                control={control}
                                                rules={{
                                                    required: 'Անունը պարտադիր է',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Անունը պետք է լինի առնվազն 2 տառ',
                                                    },
                                                }}
                                                render={({field}) => (
                                                    <Input
                                                        {...field}
                                                        size="large"
                                                        className="w-full"
                                                    />
                                                )}
                                            />
                                            {errors.guestNames?.[index] && (
                                                <Text type="danger" className="text-sm">
                                                    {errors.guestNames[index]?.message}
                                                </Text>
                                            )}
                                        </div>
                                    ))}
                                </Flex>
                            )}
                        </Flex>


                        <Flex justify="center">
                            <Button
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                style={{
                                    borderRadius: 20,
                                    textAlign: 'center',
                                    padding: '10px 35px',
                                }}
                            >
                                {loading ? 'Ուղարկվում է...' : 'Ուղարկել'}
                            </Button>
                        </Flex>
                    </Space>
                </Form>

                <Text className="GHEAMariamReg footer"
                      style={{fontSize: 14, textAlign: 'center', padding: 30}}>
                    Եթե ունեք որևէ հարց, խնդրում ենք ուղղակիորեն կապվել մեզ հետ
                </Text>
            </Flex>
        </Flex>
    );
}