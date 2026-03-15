import React from 'react';
import { Activity, Github } from 'lucide-react';
import { contactConfig } from '../../data/config';

export default function Hero() {
  return (
    <section>
      <div className="inline-flex max-w-full items-start sm:items-center gap-2 px-3 py-2 sm:py-1.5 rounded-2xl sm:rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-xs sm:text-sm font-medium font-mono mb-6 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-colors duration-500">
        <Activity className="w-4 h-4 mt-0.5 sm:mt-0 flex-shrink-0 animate-pulse" />
        <span className="text-left whitespace-normal">Current Focus: Building Resilient, Code-Driven Network Architectures</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 transition-all duration-500 ease-in-out leading-tight sm:leading-tight md:leading-tight">
        Engineering Global Network Infrastructure with Code.
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed transition-colors duration-500 ease-in-out flex items-start gap-2">
        <span className="text-blue-500 dark:text-blue-400 font-mono mt-1 opacity-70">$_</span>
        <span>Senior Network & Automation Engineer bridging the gap between Core Routing and DevSecOps. Specializing in AWS Cloud Networking, BGP/EVPN fabrics, and Golang-powered orchestration to transform manual complexity into scalable, version-controlled systems.</span>
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <a href="#projects" className="relative w-full sm:w-auto overflow-hidden group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center">
          <span className="relative z-10">View Projects</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
        </a>
        <a href="https://github.com/skorupskas" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-lg border border-slate-300 dark:border-slate-700 transition-all duration-500 ease-in-out flex items-center justify-center gap-2">
          <Github className="w-5 h-5" />
          View GitHub
        </a>
      </div>
    </section>
  );
}