import React from 'react';

export default function TechPill({ tech, onClick }) {
  return (
    <button 
      onClick={() => onClick && onClick(tech)}
      className={`px-2 py-1 bg-blue-500/10 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 text-xs font-mono rounded-md transition-colors ${onClick ? 'hover:bg-blue-500/20 dark:hover:bg-blue-800/50 dark:hover:text-blue-300 cursor-pointer' : ''}`}
    >
      {tech}
    </button>
  );
}