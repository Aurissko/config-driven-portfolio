import React from 'react';

const experienceData = {
  title: "Edge Engineering, Data Center Automation & Compliance",
  description: "Architected and delivered automated compliance frameworks, data center fabric solutions, and high-stakes edge routing for a service provider environment.",
  sections: [
    {
      title: "Automation & Compliance Frameworks",
      items: [
        {
          name: "Custom Compliance Engine",
          detail: "Developed a robust compliance and auditing tool leveraging Ansible and Elasticsearch. This solution automated the validation of global network configurations against security baselines, ensuring continuous adherence to organizational standards."
        },
        {
          name: "Migration & BAU Automation",
          detail: "Engineered specialized Python scripts to facilitate complex data center migrations and automate repetitive BAU (Business-As-Usual) tasks, significantly increasing operational velocity and reducing human error."
        },
        {
          name: "Cisco ACI Automation",
          detail: "Automated fabric management and policy deployment within Cisco ACI, streamlining the creation of tenants, bridge domains, and endpoint groups (EPGs) to support a rapid application delivery lifecycle."
        }
      ]
    },
    {
      title: "Edge Routing & IXP Traffic Engineering",
      items: [
        {
          name: "Manual BGP Orchestration",
          detail: "Executed complex, high-visibility BGP configuration changes manually on edge routers located at major Internet Exchanges (IX). Managed peering relationships and optimized traffic ingress/egress through precise control of routing attributes and global propagation."
        },
        {
          name: "IXP Traffic Management",
          detail: "Responsible for the hands-on execution of peering policy changes, ensuring optimal path selection and network stability during high-traffic maintenance windows."
        }
      ]
    },
    {
      title: "Data Center Fabric & Security Engineering",
      items: [
        {
          name: "EVPN Fabric Implementation",
          detail: "Contributed to the design and deployment of an EVPN-VXLAN fabric, managing the integration of the overlay and underlay to provide scalable Layer 2 and Layer 3 segmentation."
        },
        {
          name: "Automated Threat Mitigation",
          detail: "Implemented a Route-Based Filtering solution for rapid threat response. Developed a workflow that automatically propagates \"null route\" updates to core routers to blackhole malicious IP subnets based on security team requirements."
        },
        {
          name: "Encrypted Hybrid Transit",
          detail: "Engineered a secure transport layer by establishing multiple IPsec tunnels over AWS Direct Connect (DX). This ensured end-to-end encryption for sensitive cloud workloads while maintaining the dedicated bandwidth and low latency of a physical DX connection."
        }
      ]
    }
  ]
};

export default function EdgeEngineering() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
      <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"></div>
      <div className="p-5 sm:p-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Ansible</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Cisco ACI</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">BGP</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">EVPN-VXLAN</span>
        </div>
        
        <h4 className="text-2xl font-bold text-white mb-3">{experienceData.title}</h4>
        <p className="text-slate-400 mb-8 leading-relaxed">{experienceData.description}</p>
        
        <div className="space-y-8">
          {experienceData.sections.map((section, idx) => (
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