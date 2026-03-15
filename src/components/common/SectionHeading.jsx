import React from 'react';
import { cn } from '../../utils/cn';

export default function SectionHeading({ title, icon: Icon, className }) {
  return (
    <div className={cn("flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 transition-colors duration-500 ease-in-out", className)}>
      {Icon && <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />}
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-500 ease-in-out">{title}</h3>
    </div>
  );
}