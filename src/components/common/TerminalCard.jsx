import React from 'react';
import Card from './Card';
import { cn } from '../../utils/cn';

export default function TerminalCard({ title, count, onCountClick, children, className = '' }) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]", className)}>
      <div className="flex items-center justify-between px-4 h-10 border-b border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 transition-colors duration-500 ease-in-out">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          {title && (
            <p className="text-sm text-slate-500 dark:text-slate-400 font-mono ml-2 transition-colors duration-500 ease-in-out">{title}</p>
          )}
        </div>
        {count !== undefined && (
          <button onClick={onCountClick} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-200/50 hover:bg-blue-100 dark:bg-slate-700/50 dark:hover:bg-blue-900/50 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer focus:outline-none">
            {count} Project{count !== 1 ? 's' : ''}
          </button>
        )}
      </div>
      <div className="p-4">{children}</div>
    </Card>
  );
}