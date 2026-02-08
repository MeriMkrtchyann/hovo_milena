import React from "react";
import './global_css.css';
import type {Metadata} from 'next';
import {AntdRegistry} from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
    title: 'Edgar & Tatev',
    description: 'Հաստատեք Ձեր ներկայությունը մեր հարսանիքին',
    icons: {
        icon: '/wedding.png',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="arm">
        <body>
        <AntdRegistry>
            {children}
        </AntdRegistry>
        </body>
        </html>
    );
}