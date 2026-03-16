import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Sun, Moon, Menu, X } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';
import { profileData, contactConfig } from '../../utils/dataLoader';

export default function Header() {
  const { theme, toggleTheme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBgClass = isScrolled ? 'bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800' : 'bg-transparent border-b border-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${navBgClass}`}>
      <nav className="max-w-4xl mx-auto px-6 flex justify-between items-center h-20">
        <a href="#" className="text-lg font-bold text-slate-900 dark:text-white font-mono">{profileData.name}</a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#projects" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Projects</a>
          <a href={profileData.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Github className="w-5 h-5" /></a>
          <a href={contactConfig.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
          <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-100 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-slate-600 dark:text-slate-300">Projects</a>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-4">
                <a href={profileData.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400"><Github className="w-6 h-6" /></a>
                <a href={contactConfig.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400"><Linkedin className="w-6 h-6" /></a>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}