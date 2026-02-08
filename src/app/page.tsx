'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Flex} from 'antd';
import Informs from "@/components/informs";
import Timetable from "@/components/timetable";
import ImageTimer from "../components/image-timer";
import DearGuests from "@/components/dear-guests";
import Questionnaire from "@/components/questionnaire";

export default function Home() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

    useEffect(() => {
        if (isButtonClicked && contentRef.current) {
            setTimeout(() => {
                contentRef.current?.scrollIntoView({behavior: 'smooth'});
            }, 100);
        }
    }, [isButtonClicked]);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.log('Автозапуск заблокирован браузером:', error);
                });
            }
        };

        const handleFirstClick = () => {
            playAudio();
            document.removeEventListener('click', handleFirstClick);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                playAudio();
            } else {
                audioRef.current?.pause();
            }
        };

        document.addEventListener('click', handleFirstClick);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        playAudio();

        return () => {
            document.removeEventListener('click', handleFirstClick);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <Flex vertical align='center' justify='center' style={{maxWidth: '450px'}}>
            <audio
                ref={audioRef}
                loop
                preload="auto"
                style={{display: 'none'}}
            >
                <source src="/music/wedding-song.mp3" type="audio/mpeg"/>
            </audio>

            <ImageTimer setIsButtonClicked={setIsButtonClicked}/>

            {
                isButtonClicked && (
                    <div ref={contentRef}>
                        <DearGuests/>
                        <Informs/>
                        <Timetable/>
                        <Questionnaire/>
                    </div>
                )
            }
        </Flex>
    );
}
