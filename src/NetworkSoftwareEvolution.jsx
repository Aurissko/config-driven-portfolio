import React from 'react';

const projectData = {
  title: "Network Software Evolution & Portal Modernization",
  description: "Architected the migration of legacy network management tools to a modern software stack, centralizing the Source of Truth and automating containerized compliance and security workflows.",
  sections: [
    {
      title: "Full-Stack Development & Migration",
      items: [
        {
          name: "Monolith Decomposition",
          detail: "Orchestrated the architectural migration of a legacy Django monolith into a distributed, project-based model. This involved breaking down monolithic services into specialized, isolated units deployed within OpenShift to improve scalability and fault isolation for network orchestration."
        },
        {
          name: "Backend Architecture Evolution",
          detail: "Developed high-performance backend services using Golang for high-throughput automation tasks while maintaining specialized Django-based micro-deployments for complex administrative logic."
        },
        {
          name: "Modern Self-Service & Compliance Portal",
          detail: "Replaced the legacy Django reporting and self-service interface with NextJS. This modernized the entry point for internal users to access network self-service automation and real-time compliance auditing reports."
        },
        {
          name: "Legacy Portal Support",
          detail: "Provided ongoing support and maintenance for the original Django network automation portal, ensuring uninterrupted service for BAU tasks while progressively decommissioning features in favor of the modern stack."
        }
      ]
    },
    {
      title: "Source of Truth & Security Automation",
      items: [
        {
          name: "Nautobot Integration (SSoT)",
          detail: "Integrated Nautobot as the centralized Source of Truth (SSoT) for the global network estate. Developed the logic to dynamically feed Ansible inventories, ensuring 100% of network configurations were derived from a validated, single source."
        },
        {
          name: "Fortinet Self-Service Orchestration",
          detail: "Engineered Day 0, Day 1, and Day 2 self-service automations by plugging FortiManager automation features into the central portal. This enabled automated provisioning, policy updates, and operational maintenance for the Fortinet security fabric directly via user requests."
        },
        {
          name: "Multi-Stack Compliance",
          detail: "Engineered automated compliance and auditing modules using Ansible integrated with both the legacy framework and the modern Golang/Django micro-deployments to perform automated configuration verification against security baselines."
        }
      ]
    },
    {
      title: "Enterprise Backup & Containerized Orchestration",
      items: [
        {
          name: "Multi-Vendor Backup Solution",
          detail: "Core member of the team responsible for designing and maintaining a custom backup solution for a massive infrastructure with a high variety of network appliance vendors. This system ensured automated configuration backups, version control, and rapid recovery capabilities across the entire global estate."
        },
        {
          name: "OpenShift Workflow Orchestration",
          detail: "Orchestrated complex automation workflows within OpenShift, leveraging containerized workers to execute network tasks. This ensured that all automation scripts, including the backup and compliance engines, ran in a consistent, secure, and compliant environment."
        },
        {
          name: "Security & Container Governance",
          detail: "Managed the lifecycle of network automation tools within a containerized ecosystem, ensuring strict security compliance for all containerized workloads and scripts used in the deployment process."
        }
      ]
    }
  ]
};

export default function NetworkSoftwareEvolution() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
      <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"></div>
      <div className="p-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Golang</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">NextJS</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Nautobot</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">OpenShift</span>
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