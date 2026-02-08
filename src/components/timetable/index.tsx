import React from "react";
import {Flex, Typography} from "antd";
import Image from "next/image";
import image1 from './1.jpg'
import image2 from './2.jpg'

const {Text} = Typography;

const VerticalLine = () => {
    return (
        <div
            style={{
                width: 2,
                height: 60,
                margin: "0 auto",
                backgroundColor: "black",
            }}
        />
    );
}


export default function Timetable() {

    return (
        <Flex vertical gap={24} align='center' style={{maxWidth: "450px"}}>
            <Text className="ArmCoronetU" style={{fontSize: '4rem', textAlign: 'center'}}>
                Ժամանակացույց
            </Text>
            <Flex vertical gap={5} align='center'>
                <Text className="GHEAMariamReg timetableTime"
                      style={{fontSize: 25, textAlign: 'center', paddingLeft: 15, paddingRight: 15, fontWeight: 600}}>
                    11։00
                </Text>
                <Text className="GHEAMariamReg informsText"
                      style={{fontSize: 20, textAlign: 'center', paddingLeft: 100, paddingRight: 100}}>
                    Փեսայի տուն
                </Text>
                <VerticalLine/>
                <Text className="GHEAMariamReg timetableTime"
                      style={{fontSize: 25, textAlign: 'center', paddingLeft: 15, paddingRight: 15, fontWeight: 600}}>
                    13։00
                </Text>
                <Text className="GHEAMariamReg informsText"
                      style={{fontSize: 20, textAlign: 'center', paddingLeft: 100, paddingRight: 100}}>
                    Հարսի տուն
                </Text>
                <VerticalLine/>
                <Text className="GHEAMariamReg timetableTime"
                      style={{fontSize: 25, textAlign: 'center', paddingLeft: 15, paddingRight: 15, fontWeight: 600}}>
                    15:00
                </Text>
                <Text className="GHEAMariamReg informsText"
                      style={{fontSize: 20, textAlign: 'center', paddingLeft: 100, paddingRight: 100}}>
                    Պսակադրության արարողություն
                </Text>
                <VerticalLine/>
                <Text className="GHEAMariamReg timetableTime"
                      style={{fontSize: 25, textAlign: 'center', paddingLeft: 15, paddingRight: 15, fontWeight: 600}}>
                    17:30
                </Text>
                <Text className="GHEAMariamReg informsText"
                      style={{fontSize: 20, textAlign: 'center', paddingLeft: 120, paddingRight: 120}}>
                    Հարսանեկան հանդիսություն
                </Text>
                <VerticalLine/>
                <Text className="GHEAMariamReg timetableTime"
                      style={{fontSize: 25, textAlign: 'center', paddingLeft: 15, paddingRight: 15, fontWeight: 600}}>
                    24:00
                </Text>
                <Text className="GHEAMariamReg informsText"
                      style={{fontSize: 20, textAlign: 'center', paddingLeft: 120, paddingRight: 120}}>
                    Միջոցառման ավարտ
                </Text>
            </Flex>
        </Flex>
    );
}


