import React, { useState, useMemo } from 'react';
import { Briefcase, MoveRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import TechPill from '../common/TechPill';
import ExpandableBullet from '../common/ExpandableBullet';
import Card from '../common/Card';
import { experienceData, projects } from '../../utils/dataLoader';

export default function Experience({ onSkillClick, onViewProjects }) {
  const [activeExperience, setActiveExperience] = useState(experienceData?.[0]?.id || null);
  const [expandedBullets, setExpandedBullets] = useState({});
  const activeJob = useMemo(() => experienceData.find(j => j.id === activeExperience), [activeExperience]);

  const toggleBullet = (jobId, pointIndex) => setExpandedBullets(prev => ({ ...prev, [`${jobId}-${pointIndex}`]: !prev[`${jobId}-${pointIndex}`] }));

  const renderJobContent = (job) => {
    const employerProjects = projects.filter(p => p.employerId === job.id);
    return (
      <div className="animate-fade-in-up">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h4>
          <p className="font-medium text-blue-600 dark:text-blue-400 mt-1">{job.company}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
        {(job.techStack || []).map(tech => <TechPill key={tech} tech={tech} onClick={onSkillClick} />)}
        </div>
        <ul className="space-y-4 text-slate-600 dark:text-slate-300">
        {(job.points || []).map((point, idx) => {
            const pointText = typeof point === 'string' ? point : String(point || '');
            const [strong, ...rest] = pointText.split(':');
            return <ExpandableBullet key={idx} strong={strong} detail={rest.join(':')} isExpanded={expandedBullets[`${job.id}-${idx}`]} onToggle={() => toggleBullet(job.id, idx)} />;
          })}
        </ul>
        {employerProjects.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button onClick={() => onViewProjects(`Employer: ${job.id}`)} className="group flex items-center gap-2 font-medium transition-all text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              View Featured Projects <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        )}
      </div>
    );
  };

  if (!experienceData || experienceData.length === 0) return null;

  return (
    <section>
      <SectionHeading title="Experience" icon={Briefcase} />
      <div className="flex flex-col md:flex-row md:gap-10">
        <div className="flex mb-6 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:mb-0 md:pb-0 md:flex-col md:w-1/4 scrollbar-hide">
          {experienceData.map(job => (
            <button key={job.id} onClick={() => setActiveExperience(job.id)} className={`flex-shrink-0 whitespace-nowrap md:whitespace-normal text-left p-3 md:p-4 rounded-md transition-all duration-200 flex justify-between items-center mr-2 md:mr-0 md:mb-2 ${activeExperience === job.id ? 'bg-blue-50 dark:bg-slate-800/50 border-b-2 md:border-b-0 md:border-l-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 shadow-sm' : 'border-b-2 md:border-b-0 md:border-l-2 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200'}`}>
              <span className="font-medium">{job.company}</span>
            </button>
          ))}
        </div>
        <Card className="md:w-3/4 p-6 md:p-8">{activeJob && renderJobContent(activeJob)}</Card>
      </div>
    </section>
  );
}