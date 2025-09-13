'use client';

import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-12 h-12">
        {/* Dot 3 - Largest circle */}
        <div 
          className="absolute w-12 h-12 rounded-full shadow-lg z-10 loading-dot-3 bg-gray-600 dark:bg-[#991b1b]"
        />
        
        {/* Dot 2 - Medium circle */}
        <div 
          className="absolute w-8 h-8 rounded-full shadow-md z-20 loading-dot-2 bg-gray-400 dark:bg-[#ff6100]"
          style={{
            top: '8px',
            left: '8px'
          }}
        />
        
        {/* Dot 1 - Small circle */}
        <div 
          className="absolute w-4 h-4 rounded-full shadow-sm z-30 loading-dot-1 bg-gray-200 dark:bg-[#f3f4f6]"
          style={{
            top: '16px',
            left: '16px'
          }}
        />
      </div>
    </div>
  );
}