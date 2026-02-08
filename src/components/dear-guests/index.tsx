import React from "react";
import Image from "next/image";
import {Flex, Typography} from "antd";
import image1 from "@/components/timetable/saveDate.jpg";

const {Text} = Typography;

export default function DearGuests() {

    return (
        <Flex vertical gap={32} align='center'>
            <Flex vertical gap={12} align='center'>
                <Text className="ArmCoronetU" style={{fontSize: '4rem', textAlign: 'center'}}>
                    Սիրելի՛ հյուրեր
                </Text>
                <Text className="GHEAMariamReg"
                      style={{fontSize: 18, textAlign: 'center', paddingLeft: 50, paddingRight: 50}}>
                    Սրտանց հրավիրում ենք Ձեզ մեզ հետ միասին տոնելու մեր կյանքի ամենակարևոր և գեղեցիկ օրը:
                </Text>
            </Flex>
            <Flex vertical>
                <Flex className="containerImage">
                    <Image
                        src={image1}
                        height={0}
                        alt="HELLO"
                        width={0}
                        style={{height: 'auto', display: 'block', maxWidth: "430px"}}
                        className="containerOuerImage"
                        priority={true}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}

