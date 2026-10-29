import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    className = '', 
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'font-medium transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
    
    const variants = {
      primary: 'bg-blue-900 text-white hover:bg-blue-950 shadow-md hover:shadow-xl focus:ring-blue-700',
      secondary: 'bg-yellow-500 text-blue-900 hover:bg-yellow-600 shadow-md hover:shadow-xl focus:ring-yellow-500 font-bold',
      outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-900/10 hover:border-blue-950 shadow-md hover:shadow-xl focus:ring-blue-700',
      ghost: 'text-blue-900 hover:bg-blue-900/5 focus:ring-blue-700',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
