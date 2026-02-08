import dayjs from "dayjs";
import {Flex, Typography} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";

const {Text} = Typography;

type ImageTimerProps = {
    setIsButtonClicked: (e: boolean) => void;
};

function Colon() {
    return <span style={{fontSize: "30px", fontWeight: "bold", color: 'black'}}>:</span>;
}

function TimeBlock({value, label}: { value: number; label: string }) {
    return (
        <Flex align="center" justify="center" vertical gap={5}>
            <Text style={{fontSize: 32, fontWeight: "bold", lineHeight: 1,}}>
                {value}
            </Text>
            <Text style={{fontSize: 14, opacity: 0.9,}}>{label}</Text>
        </Flex>
    );
}

export default function ImageTimer({setIsButtonClicked}: ImageTimerProps) {
    const weddingDate = dayjs("2026-06-13 11:00");

    const calculateTimeLeft = () => {
        const now = dayjs();
        const difference = weddingDate.diff(now);

        if (difference > 0) {
            return {
                days: Math.floor(difference / (24 * 60 * 60 * 1000)),
                hours: Math.floor((difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
                minutes: Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000)),
                seconds: Math.floor((difference % (60 * 1000)) / 1000)
            };
        }
        return {days: 0, hours: 0, minutes: 0, seconds: 0};
    };

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const updateTime = () => {
            setTimeLeft(calculateTimeLeft());
        };

        // Обновляем время сразу после монтирования на клиенте
        updateTime();

        // Запускаем таймер
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {days, hours, minutes, seconds} = timeLeft;

    return (
        <Flex
            vertical
            style={{
                width: "100vw",
                color: "white",
                height: "99vh",
                maxHeight: "1100px",
                maxWidth: "450px",
                alignItems: "center",
                padding: "0 5px 5px 5px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: 'url("/milena.JPG")',
                justifyContent: "space-between"
            }}
        >
            <Text className="ArmCoronetU"
                  style={{
                      padding: 5,
                      color: "black",
                      fontSize: '4rem',
                      paddingTop: "30px",
                  }}>
                Հովո և Միլենա
            </Text>

            <Flex vertical align="center" gap={6}>
                <Text className="GHEAMariamReg" style={{color: "white", fontSize: 20, color: 'black'}}>
                    Հարսանիքին մնացել է
                </Text>

                <Flex gap={15} justify="flex-start">
                    <TimeBlock value={isClient ? days : 0} label="օր"/>
                    <Colon/>
                    <TimeBlock value={isClient ? hours : 0} label="ժամ"/>
                    <Colon/>
                    <TimeBlock value={isClient ? minutes : 0} label="րոպե"/>
                    <Colon/>
                    <TimeBlock value={isClient ? seconds : 0} label="վայրկյան"/>
                </Flex>

                <Flex style={{fontSize: 70, paddingTop: 10, color: 'black'}}>
                    <CaretDownOutlined
                        className="pulse-arrow"
                        onClick={() => setIsButtonClicked(true)}
                    />
                </Flex>
            </Flex>
        </Flex>

    );
}