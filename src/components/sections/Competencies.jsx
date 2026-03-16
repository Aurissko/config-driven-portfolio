import React from 'react';
import SectionHeading from '../common/SectionHeading';
import TerminalCard from '../common/TerminalCard';
import TechPill from '../common/TechPill';
import SkillsRadar from './SkillsRadar';
import { skillsConfig, projects } from '../../utils/dataLoader';
import { useThemeContext } from '../../context/ThemeContext';

export default function Competencies({ onSkillClick }) {
  const { theme } = useThemeContext();

  const getProjectCount = (skills) => {
    if (!Array.isArray(skills)) return 0;
    return projects.filter(p => (p.tags || []).some(tag => skills.includes(tag))).length;
  };

  const formatTerminalTitle = (key) => {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase() + '.sh';
  };

  return (
    <section>
      <SectionHeading title="Core Competencies" />
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsConfig || {}).map(([key, skills]) => (
            <TerminalCard key={key} title={formatTerminalTitle(key)} count={getProjectCount(skills)} onCountClick={() => onSkillClick(`SkillGroup: ${key}`)}>
              <div className="flex flex-wrap gap-2 font-mono">
                {(skills || []).map(skill => (
                  <TechPill key={skill} tech={skill} onClick={onSkillClick} />
                ))}
              </div>
            </TerminalCard>
          ))}
        </div>
        <div className="w-full max-w-2xl mx-auto flex flex-col justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden">
          <h4 className="text-center font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Skill Proficiency Analysis</h4>
          <SkillsRadar theme={theme} />
        </div>
      </div>
    </section>
  );
}