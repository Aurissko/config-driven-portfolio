import React from 'react';

const experienceData = {
  title: "Global Multi-Account Network Fabric & Security Core",
  description: "Core member of a two-person engineering team responsible for the end-to-end architecture, migration, and 24/7 operational support of a global hybrid cloud environment.",
  sections: [
    {
      title: "Network Evolution & Large-Scale Migration",
      items: [
        {
          name: "VPC Migration at Scale",
          detail: "Orchestrated the architectural transition of hundreds of Spoke VPCs from legacy DMVPN overlays and peering meshes into a centralized AWS Transit Gateway (TGW) hub-and-spoke fabric, significantly reducing routing complexity across the organization."
        },
        {
          name: "Direct Connect (DX) & Hybrid Edge",
          detail: "Bridged the AWS backbone with global data centers via AWS Direct Connect, utilizing Cisco CSR 1000v routers. Engineered complex BGP policies to manage traffic symmetry and deterministic failover between DX, DMVPN, and the TGW fabric to ensure high availability."
        },
        {
          name: "Advanced Path Control",
          detail: "Utilized BGP attributes and TGW route tables to enforce optimal path selection and isolation between production, development, and shared service environments."
        }
      ]
    },
    {
      title: "Stateful Security & Incident Response",
      items: [
        {
          name: "L7 Inspection Fabric",
          detail: "Deployed a centralized security suite utilizing Palo Alto VM-Series firewalls (managed via Panorama) to enforce strict IPS/IDS and Layer 7 filtering requirements for all East-West and North-South traffic."
        },
        {
          name: "Security Incident Lead",
          detail: "Acted as a primary technical responder during major security incidents. Performed real-time traffic analysis, implemented emergency isolation via TGW route manipulation, and conducted forensic reviews of network and system logs."
        },
        {
          name: "Resilient Security Design",
          detail: "Developed custom high-availability logic to maintain stateful inspection across Availability Zones, ensuring zero-downtime security enforcement during appliance failures."
        }
      ]
    },
    {
      title: "Enterprise Observability (Elasticsearch)",
      items: [
        {
          name: "Unified Monitoring Solution",
          detail: "Architected and implemented a comprehensive Elasticsearch (ELK) stack to provide visibility across the entire network and systems infrastructure."
        },
        {
          name: "Log Aggregation & Analysis",
          detail: "Built data pipelines to ingest and normalize Syslogs, Netflow, and Traffic Logs from Windows/Linux servers, Cisco routers, Palo Alto firewalls, and F5 appliances, enabling real-time alerting and deep-dive troubleshooting."
        }
      ]
    },
    {
      title: "Global Application Delivery & Ingress",
      items: [
        {
          name: "F5 BIG-IP GTM/DNS",
          detail: "Implemented F5 GTM for global site resiliency, leveraging intelligent health monitoring to orchestrate traffic across disparate data centers and AWS regions."
        },
        {
          name: "ADC Orchestration",
          detail: "Deployed F5 BIG-IP LTM clusters for advanced ingress control, developing custom iRules for granular header manipulation, SSL offloading, and intelligent traffic steering."
        },
        {
          name: "On-Premise Synergy",
          detail: "Spearheaded numerous on-premise hardware refreshes, ensuring seamless integration between physical switching/routing stacks and cloud-native endpoints."
        }
      ]
    }
  ]
};

export default function GlobalNetworkFabric() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
      <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"></div>
      <div className="p-5 sm:p-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">AWS TGW</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Palo Alto</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">F5 BIG-IP</span>
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs font-medium rounded-full">Elasticsearch</span>
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