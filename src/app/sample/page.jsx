"use client";

import { useState, useEffect } from 'react';

export default function SamplePage() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const now = new Date();
    
    // Test different timezone methods
    const vietNamTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);

    const localTime = now.toLocaleTimeString();
    const utcTime = now.toUTCString();

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Timezone Testing</h1>
            <div className="space-y-2">
                <p><strong>Local Time:</strong> {localTime}</p>
                <p><strong>UTC Time:</strong> {utcTime}</p>
                <p><strong>Vietnam Time (Intl):</strong> {vietNamTime}</p>
                <p><strong>Raw Vietnam Time:</strong> {time.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
            </div>
        </div>
    )
}