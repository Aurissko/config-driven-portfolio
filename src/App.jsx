import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import Competencies from './components/sections/Competencies';
import ProjectsSection from './components/sections/ProjectsSection';
import Contact from './components/sections/Contact';
import References from './components/sections/References';
import ProjectModal from './components/common/ProjectModal';
import { useProjectFilter } from './hooks/useProjectFilter';

export default function App() {
  const filterHooks = useProjectFilter();
  const [selectedProject, setSelectedProject] = useState(null);

  // Apply background styles & prevent horizontal bounce on the root HTML/Body for iOS Safari
  useEffect(() => {
    document.documentElement.classList.add('overflow-x-hidden');
    document.body.classList.add('bg-slate-100', 'dark:bg-slate-950', 'transition-colors', 'duration-500', 'overflow-x-hidden');
  }, []);

  return (
    <div className={`min-h-screen font-sans bg-slate-100 dark:bg-slate-950 transition-colors duration-500 ease-in-out flex flex-col relative overflow-x-hidden ${selectedProject ? 'overflow-hidden' : ''}`}>
      <div className="fixed inset-0 pointer-events-none bg-grid-light dark:bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] transition-opacity duration-500 ease-in-out z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 space-y-20 sm:space-y-32 pb-24 sm:pb-32 flex-grow">
          <Hero />
          <Competencies onSkillClick={filterHooks.handleFilterClick} />
          <Experience 
            onSkillClick={filterHooks.handleFilterClick} 
            onViewProjects={filterHooks.handleFilterClick} 
          />
          <ProjectsSection 
            activeFilter={filterHooks.activeFilter}
            setActiveFilter={filterHooks.setActiveFilter}
            filters={filterHooks.filters}
            isEmployerFilter={filterHooks.isEmployerFilter}
            isSkillGroupFilter={filterHooks.isSkillGroupFilter}
            displayedProjects={filterHooks.displayedProjects}
            onProjectClick={setSelectedProject}
          />
          <References />
          <Contact />
        </main>
        <Footer />
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}