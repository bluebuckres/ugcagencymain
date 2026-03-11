import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'text';
    href?: string;
    className?: string;
    children: React.ReactNode;
}

export function Button({ variant = 'primary', href, className = '', children, ...props }: ButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center transition-standard active:scale-[0.97] outline-none';

    const variants = {
        primary: 'bg-[--color-tan] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#b8956f]',
        secondary: 'border border-[--color-tan] text-[--color-tan] px-6 py-3 rounded-full text-sm font-medium hover:bg-[--color-tan]/10',
        ghost: 'border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10',
        text: 'text-[--color-sage] underline-offset-4 hover:underline text-sm font-medium',
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
