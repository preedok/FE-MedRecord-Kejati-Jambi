import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
    icon: Icon = null,
    className = ''
}) => {
    const baseStyles = 'font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
        success: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
        outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed',
        ghost: 'text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    );
};

export default Button;