import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from '../common/ProjectCard';
import { experienceData } from '../../data/experience';

export default function ProjectsSection({ activeFilter, setActiveFilter, filters, isEmployerFilter, isSkillGroupFilter, displayedProjects, onProjectClick }) {
  const getSkillGroupName = (filterString) => {
    const key = filterString.replace('SkillGroup: ', '');
    const names = {
      automationAndIac: "Automation & IaC",
      netDevOps: "NetDevOps & CI/CD",
      cloudAndVirtualization: "Cloud & Virtualization",
      coreRoutingAndVendors: "Core Routing & Vendors"
    };
    return names[key] || "Selected Competency";
  };

  return (
    <section id="projects">
      <SectionHeading title="Featured Projects" />
      
      {isEmployerFilter || isSkillGroupFilter ? (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-slate-800 dark:text-slate-200 font-medium">
            {isEmployerFilter ? (
              <>Showing projects from <span className="font-bold text-blue-600 dark:text-blue-400">{experienceData.find(e => e.id === activeFilter.replace('Employer: ', ''))?.company}</span></>
            ) : (
              <>Showing projects for <span className="font-bold text-blue-600 dark:text-blue-400">{getSkillGroupName(activeFilter)}</span></>
            )}
          </p>
          <button onClick={() => setActiveFilter('All')} className="text-sm px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 transition-colors shadow-sm whitespace-nowrap">
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="flex gap-2 mb-8 flex-wrap">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors font-mono ${
                activeFilter === filter 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
          {!filters.includes(activeFilter) && (
            <button onClick={() => setActiveFilter(activeFilter)} className="px-4 py-2 text-sm font-medium rounded-full transition-colors bg-blue-500 text-white font-mono">
              {activeFilter}
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onProjectClick={onProjectClick} />
        ))}
      </div>
    </section>
  );
}