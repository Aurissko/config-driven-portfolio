import React from 'react';

// A component for rendering the technology tags
const Tag = ({ label }) => (
  <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">
    {label}
  </span>
);

export default function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
      <div 
        className="h-48 w-full bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ backgroundImage: `url('${project.imageUrl}')` }}
      ></div>
      <div className="p-5 sm:p-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          {(project.tags || []).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        
        <h4 className="text-2xl font-bold text-white mb-3">{project.title}</h4>
        <p className="text-slate-400 mb-8 leading-relaxed">{project.description}</p>
        
        <div className="space-y-8">
          {(project.sections || []).map((section, idx) => (
            <div key={idx}>
              <h5 className="text-lg font-semibold text-blue-400 mb-3">{section.title}</h5>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-2">
                {(section.items || []).map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    <strong className="text-slate-200">{item.name}: </strong>
                    {item.detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}