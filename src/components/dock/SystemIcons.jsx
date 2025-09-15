'use client'
import { useState, useEffect } from 'react'
import { useLanguage } from "../../contexts/LanguageContext";
import { useWindowsSound } from "../../hooks/useWindowsSound";

export function LanguageIcon({ language, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      className={`
        relative w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 text-xs font-semibold
        ${language === 'en' 
          ? 'bg-blue-500/80 text-white hover:bg-blue-600/90' 
          : 'bg-red-500/80 text-white hover:bg-red-600/90'
        }
        shadow-sm hover:shadow-md
      `}
    >
      {language === 'en' ? 'E' : 'V'}
    </div>
  )
}

export function WiFiIcon() {
  return (
    <div className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer flex items-center justify-center min-h-[32px]">
      <div className="scale-130 flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-700 dark:text-gray-300">
          {/* Innermost circle (device) */}
          <circle cx="12" cy="18" r="1" fill="currentColor"/>
          
          {/* First arc */}
          <path d="M9.5 15.5C10.4 14.6 11.1 14.1 12 14.1S13.6 14.6 14.5 15.5" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          
          {/* Second arc */}
          <path d="M7 13C8.9 11.1 10.4 10.2 12 10.2S15.1 11.1 17 13" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          
          {/* Third arc */}
          <path d="M4.5 10.5C7.4 7.6 9.6 6.3 12 6.3S16.6 7.6 19.5 10.5" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
    </div>
  )
}

export function VolumeIcon() {
  const { isEnabled, toggleSound } = useWindowsSound();

  const getVolumeIcon = () => {
    if (!isEnabled) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3z"/>
          <path d="M6.5 12L12 6.5 17.5 12 12 17.5 6.5 12z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      )
    }
  }

  return (
    <div 
      onClick={toggleSound}
      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer flex items-center justify-center min-h-[32px]"
      title={isEnabled ? "Disable Windows Sound" : "Enable Windows Sound"}
    >
      <div className="text-gray-700 dark:text-gray-300 scale-130 flex items-center justify-center">
        {getVolumeIcon()}
      </div>
    </div>
  )
}

export function BatteryIcon() {
  const [batteryLevel, setBatteryLevel] = useState(82)
  const [isCharging, setIsCharging] = useState(false)

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100))
        setIsCharging(battery.charging)
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
        
        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging)
        })
      })
    } else {
      const interval = setInterval(() => {
        setBatteryLevel(prev => {
          const change = isCharging ? 1 : -0.5
          return Math.max(15, Math.min(100, prev + change))
        })
        
        if (Math.random() < 0.05) {
          setIsCharging(prev => !prev)
        }
      }, 15000)
      return () => clearInterval(interval)
    }
  }, [isCharging])

  const getBatteryColor = () => {
    if (isCharging) return 'text-green-400'
    if (batteryLevel < 20) return 'text-red-400'
    if (batteryLevel < 50) return 'text-orange-400'
    return 'text-green-400'
  }

  return (
    <div className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer flex items-center justify-center min-h-[32px]">
      <div className={`relative scale-130 flex items-center justify-center ${getBatteryColor()}`}>
        {/* Battery Body */}
        <div className="relative w-5 h-3 border border-current rounded-sm">
          {/* Battery Tip */}
          <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-current rounded-r-sm"></div>
          
          {/* Battery Fill */}
          <div className="absolute inset-0.5 bg-gray-700 rounded-sm overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                isCharging ? 'bg-green-400' : 
                batteryLevel < 20 ? 'bg-red-400' : 
                batteryLevel < 50 ? 'bg-orange-400' : 'bg-green-400'
              }`}
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
          
          {/* Charging Icon */}
          {isCharging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11,20L6.5,14H10V4L14,10H11V20Z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function CalendarIcon() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  }).replace(' ', ''); // Remove space between time and AM/PM
  const date = now.toLocaleDateString('en-GB');

  return (
    <div className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer flex items-center justify-center">
      <div className="flex flex-col items-start justify-center text-xs text-gray-700 dark:text-gray-300 font-medium">
        <div className="text-[14px] leading-none mb-1 whitespace-nowrap">{time}</div>
        <div className="text-[14px] leading-none whitespace-nowrap">{date}</div>
      </div>
    </div>
  )
}

// Main SystemIcons component that groups all icons
export default function SystemIcons() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <LanguageIcon language={language} onToggle={toggleLanguage} />
      <WiFiIcon />
      <VolumeIcon />
      <BatteryIcon />
      <div className="ml-1">
        <CalendarIcon />
      </div>
    </div>
  );
}   