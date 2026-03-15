import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Card from './Card';
import TechPill from './TechPill';

export default function ProjectCard({ project, onProjectClick, index = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Card 
      ref={cardRef}
      style={{ animationDelay: `${(index % 4) * 150}ms` }}
      className={`overflow-hidden group cursor-pointer ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
      onClick={() => onProjectClick(project)}
    >
      <div className="h-48 w-full bg-cover bg-center opacity-80 dark:opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
          {project.title}
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
        </h4>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm">{project.impactStatement}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => <TechPill key={i} tech={tag} />)}
        </div>
      </div>
    </Card>
  );
}