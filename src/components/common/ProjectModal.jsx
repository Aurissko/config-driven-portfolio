import React from 'react';
import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-start z-50 p-4 pt-16 md:pt-24"
      onClick={onClose}
    >
      <div 
        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{project.description}</p>
          
          <div className="space-y-8">
            {(project.sections || []).map((section, idx) => (
              <div key={idx}>
                <h5 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 font-mono">{section.title}</h5>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-2">
                  {(section.items || []).map((item, itemIdx) => (
                    <li key={itemIdx} className="leading-relaxed">
                      <strong className="text-slate-800 dark:text-slate-200">{item.name}: </strong>
                      {item.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}