// Centralized configuration for Core Competencies
export const skillsConfig = {
  automationAndIac: ["Python", "Golang", "Ansible", "Terraform", "CloudFormation", "Bash"],
  netDevOps: ["GitOps", "GitHub Actions", "GitLab CI", "Nautobot", "ServiceNow", "Django", "NextJS"],
  cloudAndVirtualization: ["AWS", "AWS TGW", "VMWare NSX-T", "OpenShift", "Kubernetes", "Docker", "Elasticsearch"],
  coreRoutingAndVendors: ["BGP", "OSPF", "EVPN-VXLAN", "Cisco ACI", "Arista", "Palo Alto", "F5 BIG-IP", "Fortinet"]
};

export const projects = [
  {
    id: 'gitops',
    employerId: 'easyjet',
    title: "GitOps & ServiceNow Infrastructure Pipeline",
    impactStatement: "Built a complete GitOps lifecycle that converts ServiceNow requests into validated, audited Terraform code via event-driven GitHub workflows.",
    kpi: ["ServiceNow to Terraform", "Event-Driven Fulfillment"],
    // Removed GitLab/CloudFormation as they aren't in the text; added AWS as it's the target.
    tags: ["GitOps", "GitHub Actions", "Terraform", "ServiceNow", "AWS", "Bash"], 
    categories: ["GitOps", "Cloud Networking", "ITSM Automation"],
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop',
    description: "Engineered an end-to-end GitOps framework to manage cloud network infrastructure, integrating enterprise ITSM requirements with event-driven delivery pipelines.",
    sections: [
      {
        title: "Integrated Infrastructure Lifecycle",
        items: [
          { name: "ServiceNow Audit & Orchestration", detail: "Utilized ServiceNow as the primary interface for fulfilling organizational auditing and compliance requirements. Requests were funneled directly into GitHub to initiate the provisioning lifecycle, ensuring all infrastructure changes were captured in a version-controlled environment from inception." },
          { name: "Automated Code Generation & Validation", detail: "Developed GitHub Actions workflows to programmatically validate user inputs and generate Terraform code. This ensured that all generated manifests adhered to security policies and architectural standards prior to any manual review." },
          { name: "Event-Driven Deployment", detail: "Implemented an event-driven execution model where GitHub webhooks triggered deployment workflows only after successful peer review and Pull Request (PR) approval. This ensured a strict \"four-eyes\" check before changes reached the environment." },
          { name: "Closed-Loop Fulfillment", detail: "Engineered a feedback mechanism that updated and closed the original ServiceNow tickets based on the outcome of the Terraform execution, maintaining a complete and accurate audit trail of all infrastructure changes." }
        ]
      },
      {
        title: "Automation & State Management",
        items: [
          { name: "CI/CD Security Logic", detail: "Integrated automated linting and security scanning within the pipeline to intercept malformed code or policy violations during the generation phase." },
          { name: "Terraform State Orchestration", detail: "Managed backend state and locking for a large-scale network fabric, ensuring concurrent updates remained consistent across a multi-account cloud organization." }
        ]
      }
    ]
  },
  {
    id: 'global-fabric',
    employerId: 'caci',
    title: "Global AWS Transit Hub & Security Core",
    impactStatement: "Architected a centralized Hub-and-Spoke network for a global cloud estate using AWS TGW, Palo Alto, and F5 BIG-IP with full ELK observability.",
    kpi: ["20Gbps Hybrid Throughput", "100% Centralized L7 Inspection"],
    tags: ["AWS", "AWS TGW", "Palo Alto", "F5 BIG-IP", "Elasticsearch", "BGP", "OSPF"],
    categories: ["Hybrid Cloud", "Network Security", "Observability"],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    description: "Core member of a two-person engineering team responsible for the end-to-end architecture, migration, and 24/7 operational support of a global hybrid cloud environment.",
    sections: [
      {
        title: "Network Evolution & Large-Scale Migration",
        items: [
          { name: "VPC Migration at Scale", detail: "Orchestrated the architectural transition of hundreds of Spoke VPCs from legacy DMVPN overlays and peering meshes into a centralized AWS Transit Gateway (TGW) hub-and-spoke fabric, significantly reducing routing complexity across the organization." },
          { name: "Direct Connect (DX) & Hybrid Edge", detail: "Bridged the AWS backbone with global data centers via AWS Direct Connect, utilizing Cisco CSR 1000v routers. Engineered complex BGP policies to manage traffic symmetry and deterministic failover between DX, DMVPN, and the TGW fabric to ensure high availability." },
          { name: "Advanced Path Control", detail: "Utilized BGP attributes and TGW route tables to enforce optimal path selection and isolation between production, development, and shared service environments." }
        ]
      },
      {
        title: "Stateful Security & Incident Response",
        items: [
          { name: "L7 Inspection Fabric", detail: "Deployed a centralized security suite utilizing Palo Alto VM-Series firewalls (managed via Panorama) to enforce strict IPS/IDS and Layer 7 filtering requirements for all East-West and North-South traffic." },
          { name: "Security Incident Lead", detail: "Acted as a primary technical responder during major security incidents. Performed real-time traffic analysis, implemented emergency isolation via TGW route manipulation, and conducted forensic reviews of network and system logs." },
          { name: "Resilient Security Design", detail: "Developed custom high-availability logic to maintain stateful inspection across Availability Zones, ensuring zero-downtime security enforcement during appliance failures." }
        ]
      },
      {
        title: "Enterprise Observability (Elasticsearch)",
        items: [
          { name: "Unified Monitoring Solution", detail: "Architected and implemented a comprehensive Elasticsearch (ELK) stack to provide visibility across the entire network and systems infrastructure." },
          { name: "Log Aggregation & Analysis", detail: "Built data pipelines to ingest and normalize Syslogs, Netflow, and Traffic Logs from Windows/Linux servers, Cisco routers, Palo Alto firewalls, and F5 appliances, enabling real-time alerting and deep-dive troubleshooting." }
        ]
      },
      {
        title: "Global Application Delivery & Ingress",
        items: [
          { name: "F5 BIG-IP GTM/DNS", detail: "Implemented F5 GTM for global site resiliency, leveraging intelligent health monitoring to orchestrate traffic across disparate data centers and AWS regions." },
          { name: "ADC Orchestration", detail: "Deployed F5 BIG-IP LTM clusters for advanced ingress control, developing custom iRules for granular header manipulation, SSL offloading, and intelligent traffic steering." },
          { name: "On-Premise Synergy", detail: "Spearheaded numerous on-premise hardware refreshes, ensuring seamless integration between physical switching/routing stacks and cloud-native endpoints." }
        ]
      }
    ]
  },
  {
    id: 'edge-engineering',
    employerId: 'santander',
    title: "Edge Engineering & DC Fabric Automation",
    impactStatement: "Managed BGP peering at Internet Exchanges and automated compliance for Cisco ACI and EVPN-VXLAN fabrics with automated threat mitigation.",
    kpi: ["Automated Threat Null-Routing", "IXP Traffic Engineering"],
    // Added Elasticsearch as it powers the "Custom Compliance Engine" mentioned in the text.
    tags: ["Python", "Ansible", "Cisco ACI", "BGP", "EVPN-VXLAN", "Elasticsearch"], 
    categories: ["Data Center", "Edge Routing", "Compliance Automation"],
    imageUrl: 'https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop',
    description: "Architected and delivered automated compliance frameworks, data center fabric solutions, and high-stakes edge routing for a service provider environment.",
    sections: [
      {
        title: "Automation & Compliance Frameworks",
        items: [
          { name: "Custom Compliance Engine", detail: "Developed a robust compliance and auditing tool leveraging Ansible and Elasticsearch. This solution automated the validation of global network configurations against security baselines, ensuring continuous adherence to organizational standards." },
          { name: "Migration & BAU Automation", detail: "Engineered specialized Python scripts to facilitate complex data center migrations and automate repetitive BAU (Business-As-Usual) tasks, significantly increasing operational velocity and reducing human error." },
          { name: "Cisco ACI Automation", detail: "Automated fabric management and policy deployment within Cisco ACI, streamlining the creation of tenants, bridge domains, and endpoint groups (EPGs) to support a rapid application delivery lifecycle." }
        ]
      },
      {
        title: "Edge Routing & IXP Traffic Engineering",
        items: [
          { name: "Manual BGP Orchestration", detail: "Executed complex, high-visibility BGP configuration changes manually on edge routers located at major Internet Exchanges (IX). Managed peering relationships and optimized traffic ingress/egress through precise control of routing attributes and global propagation." },
          { name: "IXP Traffic Management", detail: "Responsible for the hands-on execution of peering policy changes, ensuring optimal path selection and network stability during high-traffic maintenance windows." }
        ]
      },
      {
        title: "Data Center Fabric & Security Engineering",
        items: [
          { name: "EVPN Fabric Implementation", detail: "Contributed to the design and deployment of an EVPN-VXLAN fabric, managing the integration of the overlay and underlay to provide scalable Layer 2 and Layer 3 segmentation." },
          { name: "Automated Threat Mitigation", detail: "Implemented a Route-Based Filtering solution for rapid threat response. Developed a workflow that automatically propagates \"null route\" updates to core routers to blackhole malicious IP subnets based on security team requirements." },
          { name: "Encrypted Hybrid Transit", detail: "Engineered a secure transport layer by establishing multiple IPsec tunnels over AWS Direct Connect (DX). This ensured end-to-end encryption for sensitive cloud workloads while maintaining the dedicated bandwidth and low latency of a physical DX connection." }
        ]
      }
    ]
  },
  {
    id: 'software-evolution',
    employerId: 'barclays',
    title: "Network Portal & SSoT Modernization",
    impactStatement: "Migrated legacy Django portals to a Golang/NextJS microservices architecture, integrating Nautobot as the SSoT for automated security workflows.",
    kpi: ["100% Config Accuracy (Nautobot)", "Microservices Migration"],
    // Added Ansible as it's the consumer of the Nautobot inventories mentioned.
    tags: ["Golang", "Python", "Django", "NextJS", "Nautobot", "OpenShift", "Kubernetes", "Docker", "Fortinet", "Ansible"],
    categories: ["NetDevOps", "Software Engineering", "Security Orchestration"],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    description: "Architected the migration of legacy network management tools to a modern software stack, centralizing the Source of Truth and automating containerized compliance and security workflows.",
    sections: [
      {
        title: "Full-Stack Development & Migration",
        items: [
          { name: "Monolith Decomposition", detail: "Orchestrated the architectural migration of a legacy Django monolith into a distributed, project-based model. This involved breaking down monolithic services into specialized, isolated units deployed within OpenShift to improve scalability and fault isolation for network orchestration." },
          { name: "Backend Architecture Evolution", detail: "Developed high-performance backend services using Golang for high-throughput automation tasks while maintaining specialized Django-based micro-deployments for complex administrative logic." },
          { name: "Modern Self-Service & Compliance Portal", detail: "Replaced the legacy Django reporting and self-service interface with NextJS. This modernized the entry point for internal users to access network self-service automation and real-time compliance auditing reports." },
          { name: "Legacy Portal Support", detail: "Provided ongoing support and maintenance for the original Django network automation portal, ensuring uninterrupted service for BAU tasks while progressively decommissioning features in favor of the modern stack." }
        ]
      },
      {
        title: "Source of Truth & Security Automation",
        items: [
          { name: "Nautobot Integration (SSoT)", detail: "Integrated Nautobot as the centralized Source of Truth (SSoT) for the global network estate. Developed the logic to dynamically feed Ansible inventories, ensuring 100% of network configurations were derived from a validated, single source." },
          { name: "Fortinet Self-Service Orchestration", detail: "Engineered Day 0, Day 1, and Day 2 self-service automations by plugging FortiManager automation features into the central portal. This enabled automated provisioning, policy updates, and operational maintenance for the Fortinet security fabric directly via user requests." },
          { name: "Multi-Stack Compliance", detail: "Engineered automated compliance and auditing modules using Ansible integrated with both the legacy framework and the modern Golang/Django micro-deployments to perform automated configuration verification against security baselines." }
        ]
      },
      {
        title: "Enterprise Backup & Containerized Orchestration",
        items: [
          { name: "Multi-Vendor Backup Solution", detail: "Core member of the team responsible for designing and maintaining a custom backup solution for a massive infrastructure with a high variety of network appliance vendors. This system ensured automated configuration backups, version control, and rapid recovery capabilities across the entire global estate." },
          { name: "OpenShift Workflow Orchestration", detail: "Orchestrated complex automation workflows within OpenShift, leveraging containerized workers to execute network tasks. This ensured that all automation scripts, including the backup and compliance engines, ran in a consistent, secure, and compliant environment." },
          { name: "Security & Container Governance", detail: "Managed the lifecycle of network automation tools within a containerized ecosystem, ensuring strict security compliance for all containerized workloads and scripts used in the deployment process." }
        ]
      }
    ]
  }
];