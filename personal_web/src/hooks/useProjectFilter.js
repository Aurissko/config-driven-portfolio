import { useState, useMemo } from 'react';
import { projects } from '../data/projects';

export const useProjectFilter = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = useMemo(() => ['All', ...new Set(projects.flatMap(p => p.categories))], []);

  const isEmployerFilter = activeFilter.startsWith('Employer: ');
  
  const displayedProjects = useMemo(() => {
    return projects.filter(p => {
      if (activeFilter === 'All') return true;
      if (isEmployerFilter) return p.employerId === activeFilter.replace('Employer: ', '');
      return p.categories.includes(activeFilter) || p.tags.includes(activeFilter);
    });
  }, [activeFilter, isEmployerFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    const section = document.getElementById('projects');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return {
    activeFilter,
    setActiveFilter,
    filters,
    isEmployerFilter,
    displayedProjects,
    handleFilterClick
  };
};