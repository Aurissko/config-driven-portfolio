import { useState, useMemo } from 'react';
import { projects } from '../data/projects';
import { skillsConfig } from '../data/projectData';

export const useProjectFilter = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = useMemo(() => ['All', ...new Set(projects.flatMap(p => p.categories))], []);

  const isEmployerFilter = activeFilter.startsWith('Employer: ');
  const isSkillGroupFilter = activeFilter.startsWith('SkillGroup: ');
  
  const displayedProjects = useMemo(() => {
    return projects.filter(p => {
      if (activeFilter === 'All') return true;
      if (isEmployerFilter) return p.employerId === activeFilter.replace('Employer: ', '');
      if (isSkillGroupFilter) {
        const groupKey = activeFilter.replace('SkillGroup: ', '');
        const skills = skillsConfig[groupKey] || [];
        return p.tags.some(tag => skills.includes(tag));
      }
      return p.categories.includes(activeFilter) || p.tags.includes(activeFilter);
    });
  }, [activeFilter, isEmployerFilter, isSkillGroupFilter]);

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
    isSkillGroupFilter,
    displayedProjects,
    handleFilterClick
  };
};