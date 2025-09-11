'use client';

import React from 'react';

export function LoadingSpinner({ size = 'md' }) {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-8 h-8',
      dot1: 'w-3 h-3',
      dot2: 'w-5 h-5', 
      dot3: 'w-8 h-8',
      dot2Offset: '6px',
      dot1Offset: '10px',
      padding: 'p-2'
    },
    md: {
      container: 'w-12 h-12',
      dot1: 'w-4 h-4',
      dot2: 'w-8 h-8',
      dot3: 'w-12 h-12', 
      dot2Offset: '8px',
      dot1Offset: '16px',
      padding: 'p-4'
    },
    lg: {
      container: 'w-24 h-24',
      dot1: 'w-8 h-8',
      dot2: 'w-16 h-16',
      dot3: 'w-24 h-24',
      dot2Offset: '16px', 
      dot1Offset: '32px',
      padding: 'p-8'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center justify-center ${config.padding}`}>
      <div className={`relative ${config.container}`}>
        {/* Dot 3 - Largest circle */}
        <div 
          className={`absolute ${config.dot3} rounded-full shadow-lg z-10 loading-dot-3 bg-gray-600 dark:bg-[#991b1b]`}
        />
        
        {/* Dot 2 - Medium circle */}
        <div 
          className={`absolute ${config.dot2} rounded-full shadow-md z-20 loading-dot-2 bg-gray-400 dark:bg-[#ff6100]`}
          style={{
            top: config.dot2Offset,
            left: config.dot2Offset
          }}
        />
        
        {/* Dot 1 - Small circle */}
        <div 
          className={`absolute ${config.dot1} rounded-full shadow-sm z-30 loading-dot-1 bg-gray-200 dark:bg-[#f3f4f6]`}
          style={{
            top: config.dot1Offset,
            left: config.dot1Offset
          }}
        />
      </div>
    </div>
  );
}