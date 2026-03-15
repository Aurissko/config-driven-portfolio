import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { User, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { references } from '../../data/portfolioData';

export default function References() {
  return (
    <section>
      <SectionHeading title="Peer Feedback" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {references.map((ref, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {/* GitHub-style PR Comment Header */}
            <div className="flex items-start sm:items-center justify-between px-4 py-3 bg-slate-100/60 dark:bg-slate-800/50 border-b border-black/5 dark:border-white/10 flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white dark:bg-slate-700 rounded-full shadow-sm border border-slate-200 dark:border-slate-600 flex-shrink-0">
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="font-mono text-sm tracking-tight">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                    {ref.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {ref.role} @ {ref.company}
                  </div>
                </div>
              </div>
              
              {ref.linkedInUrl && (
                <a href={ref.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm w-full sm:w-auto flex-shrink-0">
                  <ExternalLink className="w-3 h-3" />
                  <span>View LinkedIn</span>
                </a>
              )}
            </div>
            
            {/* GitHub-style PR Comment Body */}
            <div className="p-5 font-sans text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative flex-grow bg-white/20 dark:bg-slate-900/20">
              <MessageSquare className="absolute top-4 left-4 w-8 h-8 text-slate-200 dark:text-slate-700 opacity-30 z-0 pointer-events-none" />
              <p className="relative z-10 italic">"{ref.comment}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}