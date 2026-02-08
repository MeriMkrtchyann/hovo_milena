'use client';

import * as XLSX from 'xlsx';
import {db} from '../../../lib/firebase';
import React, {useState} from 'react';
import {FileExcelOutlined, LockOutlined} from '@ant-design/icons';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {Button, Card, Flex, Input, message, Modal, Space, Statistic, Table, Typography} from 'antd';
import {useRouter} from "next/navigation";

const {Title} = Typography;

const ADMIN_PASSWORD = 'passMeRiArThUr20word';

interface RSVPData {
    id: string;
    guestType: string;
    fullName: string;
    guestCount: number;
    willAttend: boolean;
    guestNames?: string[];
    additionalInfo?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submittedAt: any;
}

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [data, setData] = useState<RSVPData[]>([]);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);

    React.useEffect(() => {
        document.body.classList.add('admin-page');
        return () => {
            document.body.classList.remove('admin-page');
        };
    }, []);

    React.useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const handlePasswordSubmit = () => {
        setPasswordLoading(true);

        setTimeout(() => {
            if (passwordInput === ADMIN_PASSWORD) {
                setIsAuthenticated(true);
                setPasswordModalVisible(false);
                message.success('Բարի գալուստ ադմին վահանակ!');
            } else {
                message.error('Սխալ գաղտնաբառ!');
                setPasswordInput('');
            }
            setPasswordLoading(false);
        }, 500);
    };

    const fetchData = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            const q = query(
                collection(db, 'rsvp-responses'),
                orderBy('submittedAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            const responses: RSVPData[] = [];
            querySnapshot.forEach((doc) => {
                responses.push({
                    id: doc.id,
                    ...doc.data()
                } as RSVPData);
            });

            setData(responses);
        } catch (error) {
            console.error('Տվյալների բեռնման սխալ:', error);
            message.error('Տվյալների բեռնման սխալ');
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        setExporting(true);

        try {
            const groomData = data.filter(item => item.guestType === 'groom');
            const brideData = data.filter(item => item.guestType === 'bride');

            const prepareExcelData = (items: RSVPData[]) =>
                items.map((item, index) => ({
                    '№': index + 1,
                    'Հիմնական հյուր': item.fullName,
                    'Բոլոր հյուրերը': item.guestNames && item.guestNames.length > 0 ?
                        item.guestNames.join(', ') : item.fullName,
                    'Կգա': item.willAttend ? 'Այո' : 'Ոչ',
                    'Հյուրերի քանակ': item.willAttend ? item.guestCount : 0,
                    'Լրացուցիչ տեղեկություն': item.additionalInfo || '-',
                    'Պատասխանի ամսաթիվ': item.submittedAt ?
                        new Date(item.submittedAt.seconds * 1000).toLocaleString('hy-AM') :
                        'Անհայտ'
                }));

            const wsGroom = XLSX.utils.json_to_sheet(prepareExcelData(groomData));
            const wbGroom = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wbGroom, wsGroom, 'Փեսայի հյուրեր');
            XLSX.writeFile(wbGroom, `wedding-groom-${new Date().toISOString().split('T')[0]}.xlsx`);

            const wsBride = XLSX.utils.json_to_sheet(prepareExcelData(brideData));
            const wbBride = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wbBride, wsBride, 'Հարսի հյուրեր');
            XLSX.writeFile(wbBride, `wedding-bride-${new Date().toISOString().split('T')[0]}.xlsx`);

        } catch (error) {
            console.error('Էքսպորտի սխալ:', error);
            message.error('Ֆայլերի էքսպորտի ժամանակ սխալ');
        } finally {
            setExporting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Modal
                    title={
                        <div className="flex items-center gap-2">
                            <LockOutlined/>
                            Մուտք ադմին վահանակ
                        </div>
                    }
                    open={passwordModalVisible}
                    onOk={handlePasswordSubmit}
                    onCancel={() => {
                        setPasswordModalVisible(false);
                        router.push('/');
                    }}
                    okText="Մուտք գործել"
                    cancelText="Չեղարկել"
                    confirmLoading={passwordLoading}
                    closable={false}
                    maskClosable={false}
                >
                    <div className="py-4">
                        <p className="mb-4 text-gray-600">
                            Մուտքագրեք գաղտնաբառը ադմին վահանակ մուտք գործելու համար․
                        </p>
                        <Input.Password
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Մուտքագրեք գաղտնաբառը"
                            onPressEnter={handlePasswordSubmit}
                            size="large"
                        />
                    </div>
                </Modal>
            </div>
        );
    }

    const attendingCount = data.filter(item => item.willAttend).length;
    const notAttendingCount = data.filter(item => !item.willAttend).length;
    const totalGuests = data
        .filter(item => item.willAttend)
        .reduce((sum, item) => sum + item.guestCount, 0);

    let groomSideGuests = 0;
    let brideSideGuests = 0;

    data.forEach(item => {
        if (item.willAttend) {
            const guestCount = item.guestCount || 1;
            if (item.guestType === 'groom') {
                groomSideGuests += guestCount;
            } else {
                brideSideGuests += guestCount;
            }
        }
    });

    const groomResponses = data.filter(item => item.guestType === 'groom').length;
    const brideResponses = data.filter(item => item.guestType === 'bride').length;

    const columns = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {title: '№', key: 'index', width: 50, render: (_: any, __: any, index: number) => index + 1},
        {title: 'Հիմնական հյուր', dataIndex: 'fullName', key: 'fullName', width: 150},
        {
            title: 'Բոլոր հյուրերը',
            key: 'allGuests',
            width: 250,
            render: (record: RSVPData) => {
                if (record.guestNames && record.guestNames.length) {
                    return (
                        <div className="text-xs">
                            {record.guestNames.map((name, idx) => (
                                <div key={idx} className="mb-1">
                                    {idx + 1}. {name || `Հյուր ${idx + 1}`}
                                </div>
                            ))}
                        </div>
                    );
                }
                return record.fullName;
            },
        },
        {
            title: 'Կողմ',
            dataIndex: 'guestType',
            key: 'guestType',
            width: 100,
            render: (type: string) => type === 'groom' ? '🤵 Փեսա' : '👰 Հարս',
        },
        {
            title: 'Կգա',
            dataIndex: 'willAttend',
            key: 'willAttend',
            width: 80,
            render: (attend: boolean) => attend ? '✅ Այո' : '❌ Ոչ',
        },
        {
            title: 'Հյուրերի քանակ',
            dataIndex: 'guestCount',
            key: 'guestCount',
            width: 120,
            render: (count: number, record: RSVPData) => record.willAttend ? count : '-',
        },
        {
            title: 'Պատասխանի ամսաթիվ',
            dataIndex: 'submittedAt',
            key: 'submittedAt',
            width: 150,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (date: any) => {
                if (!date) return 'Անհայտ';
                return new Date(date.seconds * 1000).toLocaleString('hy-AM');
            },
        },
    ];

    return (
        <Flex className='admin-page'>
            <div>
                <Card className="mb-6">
                    <div className="flex justify-between items-center mb-30">
                        <Title level={2} className='mobileSizeTitle'>📊 Ադմին վահանակ - RSVP պատասխաններ</Title>
                        <Space style={{marginBottom: '20px'}}>
                            <Button onClick={fetchData} loading={loading}>Թարմացնել տվյալները</Button>
                            <Button
                                type="primary"
                                icon={<FileExcelOutlined/>}
                                onClick={exportToExcel}
                                loading={exporting}
                                size="large"
                            >
                                Ներբեռնել Excel
                            </Button>
                        </Space>
                    </div>
                    <Flex vertical gap={10}>
                        <Flex justify='space-between' gap={10} className='mobileSize'>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic title="Ընդհանուր պատասխաններ" value={data.length}
                                               valueStyle={{color: '#1890ff'}}/>
                                </Card>
                            </Flex>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic title="Կգան" value={attendingCount} valueStyle={{color: '#52c41a'}}/>
                                </Card>
                            </Flex>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic title="Չեն գա" value={notAttendingCount}
                                               valueStyle={{color: '#f5222d'}}/>
                                </Card>
                            </Flex>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic title="Ընդհանուր հյուրեր" value={totalGuests}
                                               valueStyle={{color: '#722ed1'}}
                                               suffix={`/ 350`}/>
                                </Card>
                            </Flex>
                        </Flex>

                        <Flex justify='space-between' gap={10} className='mobileSize'>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic title="🤵 Փեսայի հյուրեր" value={groomSideGuests}
                                               valueStyle={{color: '#1890ff'}}/>
                                    <div className="text-xs text-gray-500 mt-1">Պատասխաններ: {groomResponses}</div>
                                </Card>
                            </Flex>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic title="👰 Հարսի հյուրեր" value={brideSideGuests}
                                               valueStyle={{color: '#eb2f96'}}/>
                                    <div className="text-xs text-gray-500 mt-1">Պատասխաններ: {brideResponses}</div>
                                </Card>
                            </Flex>
                            <Flex style={{width: '100%'}}>
                                <Card style={{width: '100%'}}>
                                    <Statistic
                                        title="⚖️ Հարաբերակցություն"
                                        value={totalGuests > 0 ? `${Math.round(groomSideGuests / totalGuests * 100)}% / ${Math.round(brideSideGuests / totalGuests * 100)}%` : '0% / 0%'}
                                        valueStyle={{color: '#722ed1'}}
                                    />
                                    <div className="text-xs text-gray-500 mt-1">Փեսա / Հարս</div>
                                </Card>
                            </Flex>
                        </Flex>

                    </Flex>

                </Card>

                <Card>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        loading={loading}
                        scroll={{x: 1000}}
                        pagination={{
                            pageSize: 50,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total) => `Ընդամենը ${total} գրառում`,
                        }}
                    />
                </Card>
            </div>
        </Flex>
    );
}
