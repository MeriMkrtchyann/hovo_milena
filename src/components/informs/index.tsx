import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button, Flex, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import church from './charch.png'
import restorant from './restorant.png'
import home from './home.png'

const {Text} = Typography;

export default function Informs() {

    const router = useRouter();

    return (
        <Flex vertical gap={24} align='center'>
            <Text className="ArmCoronetU" style={{fontSize: '4rem', textAlign: 'center'}}>
                Տեղեկացում
            </Text>
            <Flex vertical gap={12} align='center'>
                <Text className="GHEAMariamReg"
                      style={{
                          fontSize: 18,
                          paddingLeft: 80,
                          paddingRight: 80,
                          textAlign: 'center',
                      }}>
                    Փեսայի տուն

                </Text>
                <Image
                    src={home}
                    alt="Church icon"
                    width={150}
                    height={150}
                />

                <Button style={{borderRadius: 20, textAlign: 'center', padding: '10px 35px'}}
                        onClick={() =>
                            router.push(
                                "https://yandex.ru/navi?ol=geo&text=3-%D0%B9%20%D1%82%D1%83%D0%BF%D0%B8%D0%BA%20%D1%83%D0%BB%D0%B8%D1%86%D1%8B%20%D0%9A%D0%B0%D1%80%D0%B0%D0%BF%D0%B5%D1%82%20%D0%A3%D0%BB%D0%BD%D0%B5%D1%86%D1%83,%207&sll=44.538804,40.210048&sspn=0.006295,0.008210&si=4x47b0evv3pwwarqb8cvcbv1vc"
                            )
                        }> Քարտեզ <ArrowRightOutlined/></Button>
            </Flex>
            <Flex vertical gap={12} align='center'>
                <Text className="GHEAMariamReg"
                      style={{
                          fontSize: 18,
                          paddingLeft: 80,
                          paddingRight: 80,
                          textAlign: 'center',
                      }}>
                    Հարսի տուն

                </Text>
                <Image
                    src={home}
                    alt="Church icon"
                    width={150}
                    height={150}
                />

                <Button style={{borderRadius: 20, textAlign: 'center', padding: '10px 35px'}}
                        onClick={() =>
                            router.push(
                                "https://yandex.ru/navi?ol=geo&text=%D0%95%D1%80%D0%B5%D0%B2%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0,%209&sll=44.534914,39.960281&sspn=0.006318,0.008211&si=4x47b0evv3pwwarqb8cvcbv1vc"
                            )
                        }> Քարտեզ <ArrowRightOutlined/></Button>
            </Flex>
            <Flex vertical gap={12} align='center'>
                <Text className="GHEAMariamReg"
                      style={{
                          fontSize: 18,
                          paddingLeft: 80,
                          paddingRight: 80,
                          textAlign: 'center',
                      }}>
                    Պսակադրությունը կանցկացվի
                    {" "}
                    <span style={{
                        fontWeight: 600,
                    }}>
                        Սուրբ Խաչ
                    </span>{" "}
                    եկեղեցում
                </Text>
                <Image
                    src={church}
                    alt="Church icon"
                    width={150}
                    height={150}
                />

                <Button style={{borderRadius: 20, textAlign: 'center', padding: '10px 35px'}}
                        onClick={() =>
                            router.push(
                                "https://yandex.com/navi/?ol=geo&text=Komitas%20Avenue,%2064&sll=44.524413,40.205784&sspn=0.006295,0.008210&si=kpp126jbrc2nw1arnaeyw6vugm"
                            )
                        }> Քարտեզ <ArrowRightOutlined/></Button>
            </Flex>
            <Flex vertical align='center' gap={12}>
                <Text className="GHEAMariamReg"
                      style={{
                          fontSize: 18,
                          paddingLeft: 60,
                          paddingRight: 60,
                          textAlign: 'center',
                      }}>
                    Տոնական խնջույքը կանցկացվի
                    {" "}
                    <span style={{
                        fontWeight: 600,
                    }}>
                       «Օջախ»
                    </span>{" "}
                    ռեստորանային համալիրում
                </Text>
                <Image
                    width={250}
                    height={150}
                    src={restorant}
                    alt="Church icon"
                />

                <Button style={{borderRadius: 20, textAlign: 'center', padding: '10px 35px'}}
                        onClick={() =>
                            router.push(
                                "https://yandex.com/navi/org/69357937409?si=kpp126jbrc2nw1arnaeyw6vugm"
                            )
                        }> Քարտեզ <ArrowRightOutlined/></Button>
            </Flex>

        </Flex>
    );
}


