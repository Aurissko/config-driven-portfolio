import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import Competencies from './components/sections/Competencies';
import ProjectsSection from './components/sections/ProjectsSection';
import Contact from './components/sections/Contact';
import ProjectModal from './components/common/ProjectModal';
import { useProjectFilter } from './hooks/useProjectFilter';

export default function App() {
  const filterHooks = useProjectFilter();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={`min-h-screen font-sans bg-slate-100 dark:bg-slate-950 transition-colors duration-500 ease-in-out flex flex-col relative ${selectedProject ? 'overflow-hidden' : ''}`}>
      <div className="fixed inset-0 pointer-events-none bg-grid-light dark:bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] transition-opacity duration-500 ease-in-out z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-6 pt-32 space-y-32 pb-32 flex-grow">
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
            displayedProjects={filterHooks.displayedProjects}
            onProjectClick={setSelectedProject}
          />
          <Contact />
        </main>
        <Footer />
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}