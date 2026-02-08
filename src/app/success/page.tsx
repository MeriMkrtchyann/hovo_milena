'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {Button, Flex, Typography} from 'antd';

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
            className="GHEAMariamReg"
            style={{
                minHeight: '100vh',
                maxWidth: '450px',
                textAlign: 'center'
            }}
        >
            <Title
                className="ArmCoronetU"
                style={{
                    fontSize: '3rem',
                    marginBottom: 30,
                }}
            >
                Շնորհակալություն!
            </Title>

            <Text
                className="GHEAMariamReg"
                style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    marginBottom: 40,
                    maxWidth: '350px'
                }}
            >
                Ձեր պատասխանը հաջողությամբ ուղարկվել է։

            </Text>

            <Button
                size="large"
                onClick={goBack}
                style={{
                    height: 'auto',
                    fontSize: '16px',
                    borderRadius: 20
                }}
            >
                Վերադառնալ գլխավոր էջ
            </Button>
        </Flex>
    );
}