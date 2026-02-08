'use client';

import React from 'react';
import {Button, Flex, Typography} from 'antd';
import {useRouter} from 'next/navigation';

const {Title, Text} = Typography;

export default function SuccessPage() {
    const router = useRouter();

    const goBack = () => {
        router.push('/');
    };

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            className="vrdznagir-font"
            style={{
                padding: '20px',
                margin: '0 auto',
                maxWidth: '450px',
                minHeight: '100vh',
                textAlign: 'center'
            }}
        >
            <Title level={1} style={{fontSize: '4rem', margin: '20px 0'}}>
                🎉
            </Title>

            <Title
                level={2}
                className="ArmCoronetU"
                style={{
                    fontSize: 60,
                    color: '#52c41a',
                    marginBottom: 30
                }}
            >
                Շնորհակալություն!
            </Title>

            <Text
                className="GHEAMariamReg"
                style={{
                    fontSize: 24,
                    lineHeight: 1.6,
                    marginBottom: 40,
                    maxWidth: '350px'
                }}
            >
                Ձեր պատասխանը հաջողությամբ ուղարկվել է։
                <br/>
                <br/>
                Մենք անհամբեր սպասում ենք Ձեր հետ հանդիպմանը։
            </Text>

            <Button
                type="primary"
                size="large"
                onClick={goBack}
                style={{
                    height: 'auto',
                    fontSize: '16px',
                    borderRadius: 20,
                    padding: '10px 35px'
                }}
            >
                Վերադառնալ գլխավոր էջ
            </Button>
        </Flex>
    );
}