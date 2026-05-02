import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F00] disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-[#FF4F00] text-white hover:bg-[#E64600] shadow-[0_4px_14px_0_rgba(255,79,0,0.39)] font-bold': variant === 'default' || variant === 'accent',
            'border border-slate-200 bg-white hover:bg-slate-50 text-[#0F172A] font-semibold': variant === 'outline',
            'hover:text-[#FF4F00] text-slate-600 font-semibold': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600 font-medium': variant === 'destructive',
            'bg-slate-100 text-slate-900 hover:bg-slate-200 font-medium': variant === 'secondary',
            'h-9 px-4 py-2': size === 'md',
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-11 px-5 py-2.5': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
