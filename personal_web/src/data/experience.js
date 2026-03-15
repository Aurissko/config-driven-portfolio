// Professional Experience timeline data
export const experienceData = [
  { 
    id: 'barclays', company: 'Barclays', role: 'Senior Network Automation Developer', 
    techStack: ['Golang', 'NextJS', 'Nautobot', 'OpenShift', 'Ansible'], 
    points: ['Legacy Modernization: Orchestrated the architectural shift from monolithic legacy systems to a high-concurrency Golang microservices backend and NextJS frontend for infrastructure management.', 'Dynamic Source of Truth: Centralized the global network inventory into Nautobot (SSoT), building automated pipelines to feed dynamic Ansible inventories for 100% configuration consistency.', 'Cloud-Native Orchestration: Developed secure network automation workflows within OpenShift, ensuring high-performance connectivity and policy compliance for containerized enterprise workloads.'] 
  },
  { 
    id: 'caci', company: 'CACI International Inc', role: 'Senior Network Security Engineer', 
    techStack: ['AWS', 'Python', 'Lambda', 'Palo Alto', 'Cisco Firepower', 'F5 BIG-IP'], 
    points: ['Security Automation: Led the development of AWS security enforcement tools using Python/Lambda, ensuring real-time compliance and automated infrastructure scaling.', 'Multi-Vendor Firewalling: Designed and deployed large-scale security perimeters utilizing Palo Alto (NGFW), Cisco Firepower, and ASA across diverse client environments.', 'Application Delivery: Architected high-availability ingress solutions using F5 BIG-IP (LTM/APM) and intelligent DNS steering to support mission-critical web services.'] 
  },
  { 
    id: 'easyjet', company: 'easyJet', role: 'Senior Network Automation Engineer (Contract)', 
    techStack: ['Terraform', 'GitHub Actions', 'ServiceNow', 'AWS TGW', 'Palo Alto'], 
    points: ['GitOps Orchestration: Engineered an event-driven "Click-to-Deploy" framework integrating ServiceNow with GitHub Actions, enabling zero-touch, audited provisioning of global cloud infrastructure.', 'Cloud Fabric Engineering: Developed an enterprise-grade Terraform module library for AWS, managing complex Transit Gateway architectures and global VPC routing at scale.', 'Security as Code: Automated the lifecycle of Palo Alto VM-Series deployments and security policies, transitioning firewall management into a version-controlled CI/CD workflow.'] 
  },
  { 
    id: 'santander', company: 'Santander UK', role: 'Technical Expert (Network Automation)', 
    techStack: ['Python', 'Ansible', 'Cisco ACI', 'F5 BIG-IP', 'Security Auditing'], 
    points: ['Lifecycle Engineering: Architected Python and Ansible frameworks to automate the end-to-end deployment and decommissioning of global enterprise network assets.', 'Automated Governance: Engineered custom security auditing engines that significantly reduced the organizational attack surface through automated vulnerability detection and remediation.', 'Reliability & Scale: Served as a Tier-3 escalation lead, maintaining 99.9% uptime for business-critical banking infrastructure through advanced traffic engineering.'] 
  }
];