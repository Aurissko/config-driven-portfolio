import React from 'react';
import { tickerStats } from '../../data/config';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 dark:border-slate-800 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-xl py-4 overflow-hidden relative z-10 mt-auto">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {tickerStats.map((stat, i) => (
          <span key={i} className="mx-8 text-sm font-mono text-slate-500 dark:text-slate-400 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{stat}
          </span>
        ))}
        {tickerStats.map((stat, i) => (
          <span key={`dup-${i}`} className="mx-8 text-sm font-mono text-slate-500 dark:text-slate-400 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{stat}
          </span>
        ))}
      </div>
    </footer>
  );
}