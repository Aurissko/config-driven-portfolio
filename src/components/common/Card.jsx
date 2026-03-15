import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Card = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-2xl transition-all duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;