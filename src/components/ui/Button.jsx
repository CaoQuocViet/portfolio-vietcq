'use client'
import { forwardRef } from 'react'
import { useTheme } from 'next-themes'

const Button = forwardRef(({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    disabled = false,
    onClick,
    href,
    target,
    rel,
    ...props 
}, ref) => {
    const { theme } = useTheme()

    const baseStyles = `
        inline-flex items-center justify-center font-semibold rounded-full
        transition-all duration-300 ease-in-out transform
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        relative overflow-hidden
    `

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl'
    }

    const variantStyles = {
        primary: theme === 'dark' 
            ? `bg-gradient-to-r from-blue-600 to-purple-600 text-white
               hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl
               focus:ring-blue-500 shadow-lg shadow-blue-500/25
               before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500
               before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100`
            : `bg-gradient-to-r from-blue-600 to-purple-600 text-white
               hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl
               focus:ring-blue-600 shadow-lg shadow-blue-600/25
               before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:to-purple-700
               before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100`,
        
        secondary: theme === 'dark'
            ? `bg-gray-800 text-white border-2 border-gray-700
               hover:bg-gray-700 hover:border-blue-500 hover:scale-105 hover:shadow-lg
               focus:ring-gray-500`
            : `bg-white text-gray-900 border-2 border-gray-300
               hover:bg-gray-50 hover:border-blue-500 hover:scale-105 hover:shadow-lg
               focus:ring-blue-500`,
        
        outline: theme === 'dark'
            ? `bg-transparent text-blue-400 border-2 border-blue-400
               hover:bg-blue-400 hover:text-gray-900 hover:scale-105 hover:shadow-lg
               focus:ring-blue-400`
            : `bg-transparent text-blue-600 border-2 border-blue-600
               hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-lg
               focus:ring-blue-600`,
        
        ghost: theme === 'dark'
            ? `bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white
               hover:scale-105 focus:ring-gray-500`
            : `bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900
               hover:scale-105 focus:ring-gray-500`,
        
        gradient: `bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white
                  hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500
                  hover:scale-105 hover:shadow-xl focus:ring-blue-500
                  shadow-lg shadow-blue-500/25`,
        
        success: `bg-gradient-to-r from-green-500 to-emerald-600 text-white
                 hover:from-green-400 hover:to-emerald-500 hover:scale-105 hover:shadow-xl
                 focus:ring-green-500 shadow-lg shadow-green-500/25`,
        
        danger: `bg-gradient-to-r from-red-500 to-pink-600 text-white
                hover:from-red-400 hover:to-pink-500 hover:scale-105 hover:shadow-xl
                focus:ring-red-500 shadow-lg shadow-red-500/25`
    }

    const combinedClassName = `
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
    `.trim().replace(/\s+/g, ' ')

    const Component = href ? 'a' : 'button'

    return (
        <Component
            ref={ref}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
            href={href}
            target={target}
            rel={rel}
            {...props}
        >
            <span className="relative z-10">
                {children}
            </span>
        </Component>
    )
})

Button.displayName = 'Button'

export default Button
