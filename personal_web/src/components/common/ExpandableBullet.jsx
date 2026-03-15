import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ExpandableBullet({ strong, detail, isExpanded, onToggle }) {
  return (
    <li className="flex items-start flex-col border-l-2 border-slate-200 dark:border-slate-800 ml-2 pl-4 relative">
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-slate-100 dark:bg-slate-950 rounded-full flex items-center justify-center transition-colors duration-500">
         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
      </div>
      <button
        onClick={onToggle}
        className="flex items-start text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none w-full group"
      >
        <strong className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
          {strong}
          <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </strong>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{detail}</p>
      </div>
    </li>
  );
}