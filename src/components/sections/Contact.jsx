import React from 'react';
import { contactConfig } from '../../data/config';

export default function Contact() {
  return (
    <section id="contact" className="flex flex-col items-center pt-16">
      <div className="w-full max-w-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(59,130,246,0.05)] dark:shadow-[0_0_20px_rgba(59,130,246,0.1)] font-mono text-sm md:text-base">
        <div className="flex flex-col gap-4 text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-4">
            <span className="text-blue-500 dark:text-blue-400 font-bold shrink-0">$</span>
            <p className="break-all">
              mailto --recipient <a href={`mailto:${contactConfig.email}`} className="text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-300">{contactConfig.email}</a>
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-blue-500 dark:text-blue-400 font-bold shrink-0">$</span>
            <p className="break-all">
              remote --add linkedin <a href={contactConfig.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-300">{contactConfig.linkedin}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}