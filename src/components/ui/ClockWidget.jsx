"use client";

import { useState, useEffect } from 'react';

const ClockWidget = ({ theme }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 100); // Update more frequently for smooth mechanical movement

        return () => clearInterval(timer);
    }, []);

    // Get current time in Vietnam using proper Intl.DateTimeFormat
    const now = time; // Use the state time instead of new Date()
    
    // Get Vietnam time formatted
    const vietNamTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);
    
    // Parse the formatted time string
    const [hoursStr, minutesStr, secondsStr] = vietNamTime.split(':');
    const hours24 = parseInt(hoursStr);
    const hours = hours24 % 12; // Convert to 12-hour format
    const minutes = parseInt(minutesStr);
    const seconds = parseInt(secondsStr);
    const milliseconds = now.getMilliseconds();
    
    // Calculate angles for mechanical clock hands
    const secondAngle = (seconds * 6) + (milliseconds * 0.006); 
    const minuteAngle = (minutes * 6) + (seconds * 0.1) + (milliseconds * 0.0001666); 
    const hourAngle = (hours * 30) + (minutes * 0.5) + (seconds * 0.008333);
    
    // US Eastern Time using proper timezone
    const usTimeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);
    
    const [usHoursStr, usMinutesStr, usSecondsStr] = usTimeString.split(':');
    const usHours24 = parseInt(usHoursStr);
    const usHours12 = usHours24 % 12;
    const usMinutes = parseInt(usMinutesStr);
    const usSeconds = parseInt(usSecondsStr);
    const usAngle = (usHours12 * 30) + (usMinutes * 0.5) + (usSeconds * 0.008333);

    return (
        <div className="fixed top-6 left-6 z-50">
            <div className={`relative w-20 h-20 md:w-40 md:h-40 rounded-full border-2 ${
                theme === 'dark' 
                    ? 'border-gray-700/50 bg-gray-900/80' 
                    : 'border-gray-300/50 bg-white/90'
            } backdrop-blur-lg shadow-lg`}>
                
                {/* Original SVG Clock Face Background */}
                <div 
                    className={`absolute inset-1 rounded-full ${
                        theme === 'dark' ? 'opacity-80' : 'opacity-90'
                    }`}
                    style={{
                        backgroundImage: 'url(/img/trong-dong-dong-son.svg)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Clock Hands SVG */}
                <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                >
                    {/* US EST Hand - Blue for US time */}
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="30"
                        stroke={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        transform={`rotate(${usAngle} 50 50)`}
                        style={{ transition: 'none' }}
                    />
                    
                    {/* Hour Hand - White for contrast */}
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="35"
                        stroke={theme === 'dark' ? '#ffffff' : '#000000'}
                        strokeWidth="3"
                        strokeLinecap="round"
                        transform={`rotate(${hourAngle} 50 50)`}
                        style={{ transition: 'none' }}
                    />
                    
                    {/* Minute Hand - White for contrast */}
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="25"
                        stroke={theme === 'dark' ? '#ffffff' : '#000000'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${minuteAngle} 50 50)`}
                        style={{ transition: 'none' }}
                    />
                    
                    {/* Second Hand - Bright red for visibility */}
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="20"
                        stroke={theme === 'dark' ? '#f87171' : '#dc2626'}
                        strokeWidth="1"
                        strokeLinecap="round"
                        transform={`rotate(${secondAngle} 50 50)`}
                        style={{ transition: 'none' }}
                    />
                    
                    {/* Center Dot - White for contrast */}
                    <circle
                        cx="50"
                        cy="50"
                        r="1.5"
                        fill={theme === 'dark' ? '#ffffff' : '#000000'}
                    />
                </svg>
            </div>
        </div>
    );
};

export default ClockWidget;
