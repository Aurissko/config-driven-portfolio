import React from 'react';

const projectData = {
  title: "GitOps Infrastructure & ServiceNow Orchestration",
  description: "Engineered an end-to-end GitOps framework to manage cloud network infrastructure, integrating enterprise ITSM requirements with event-driven delivery pipelines.",
  sections: [
    {
      title: "Integrated Infrastructure Lifecycle",
      items: [
        {
          name: "ServiceNow Audit & Orchestration",
          detail: "Utilized ServiceNow as the primary interface for fulfilling organizational auditing and compliance requirements. Requests were funneled directly into GitHub to initiate the provisioning lifecycle, ensuring all infrastructure changes were captured in a version-controlled environment from inception."
        },
        {
          name: "Automated Code Generation & Validation",
          detail: "Developed GitHub Actions workflows to programmatically validate user inputs and generate Terraform code. This ensured that all generated manifests adhered to security policies and architectural standards prior to any manual review."
        },
        {
          name: "Event-Driven Deployment",
          detail: "Implemented an event-driven execution model where GitHub webhooks triggered deployment workflows only after successful peer review and Pull Request (PR) approval. This ensured a strict \"four-eyes\" check before changes reached the environment."
        },
        {
          name: "Closed-Loop Fulfillment",
          detail: "Engineered a feedback mechanism that updated and closed the original ServiceNow tickets based on the outcome of the Terraform execution, maintaining a complete and accurate audit trail of all infrastructure changes."
        }
      ]
    },
    {
      title: "Automation & State Management",
      items: [
        {
          name: "CI/CD Security Logic",
          detail: "Integrated automated linting and security scanning within the pipeline to intercept malformed code or policy violations during the generation phase."
        },
        {
          name: "Terraform State Orchestration",
          detail: "Managed backend state and locking for a large-scale network fabric, ensuring concurrent updates remained consistent across a multi-account cloud organization."
        }
      ]
    }
  ]
};

export default function GitOpsInfrastructure() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
      <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"></div>
      <div className="p-5 sm:p-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Terraform</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">GitHub Actions</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">ServiceNow</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">GitOps</span>
        </div>
        
        <h4 className="text-2xl font-bold text-white mb-3">{projectData.title}</h4>
        <p className="text-slate-400 mb-8 leading-relaxed">{projectData.description}</p>
        
        <div className="space-y-8">
          {projectData.sections.map((section, idx) => (
            <div key={idx}>
              <h5 className="text-lg font-semibold text-blue-400 mb-3">{section.title}</h5>
              <ul className="list-disc list-inside text-slate-400 space-y-2 ml-2">
                {section.items.map((item, itemIdx) => (
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