import type { ServiceData } from '../serviceTypes';

export const healthcareServicesData: ServiceData = {
  id: 'healthcare-services',
  slug: 'healthcare-services',
  name: 'Healthcare Services',
  title: 'Healthcare BPO & Patient Experience',
  subtitle: 'Clinical-grade support for payers, providers, and health-tech with compliance at the core.',
  description:
    'Specialized healthcare process outsourcing that improves patient experience, accelerates revenue cycles, and keeps compliance airtight across every interaction.',

  heroSlides: [
    {
      id: 1,
      title: 'Healthcare Services',
      subtitle: 'Specialized healthcare process outsourcing that improves patient experience, accelerates revenue cycles, and keeps compliance airtight across every interaction.',
      image: '/servicebanner/healthcare.jpg',
      imageAlt: 'Healthcare Services',
    },
  ],

  aboutSection: {
    title: 'Navigant Healthcare Services',
    content:
      'Healthcare providers often feel bogged down with the administrative element of their profession. Navigant, a HIPAA compliant Healthcare BPO services provider, offers customized healthcare services and healthcare support services which boosts financial performance & effectiveness of healthcare providers while also enhancing patient satisfaction. Our services for this industry are broadly divided as below:',
  },

  industries: [
    {
      id: 'medical-billing-coding',
      name: 'Medical Billing & Coding Services',
      description:
        'Healthcare providers agree that submitting medical bills on time and getting claims reimbursed by payers is critical to healthy cash flow.',
      icon: '🏥',
    },
    {
      id: 'medical-transcription',
      name: 'Medical Transcription Services',
      description:
        'A wide variety of global clients—from individual physicians to hospitals—have leveraged our trained medical transcriptionists to improve their overall healthcare delivery.',
      icon: '💳',
    },
    {
      id: 'healthcare-software-development',
      name: 'Healthcare Software Development',
      description: 'Today technology plays a major role in delivery of healthcare services. Deploying correct technologies increases productivity of a firm.',
      icon: '💻',
    },
    {
      id: 'pharmacy-business-service',
      name: 'Pharmacy Business Service',
      description: 'The Pharmacy business market is highly competitive and fragmented. At Navigant, we provide innovative medical business services.',
      icon: '🧪',
    },
  ],

  highlights: [
    {
      id: 'hipaa-ready',
      title: 'HIPAA-Ready Ops',
      description: 'PHI-safe processes, access controls, and audit trails baked into every workflow.',
      icon: '🔐',
    },
    {
      id: 'clinical-training',
      title: 'Clinically Trained Teams',
      description: 'Healthcare specialists with domain training on payer/provider protocols.',
      icon: '🩺',
    },
    {
      id: 'quality-first',
      title: 'Quality First',
      description: 'Structured QA, call scoring, and compliance checklists to reduce rework.',
      icon: '✅',
    },
    {
      id: 'seamless-integration',
      title: 'Seamless Integration',
      description: 'Connects with your EMR, CRM, and billing stacks to keep data flowing securely.',
      icon: '🔗',
    },
  ],

  detailSections: [
    {
      id: 'medical-billing-coding-detail',
      title: 'Medical Billing & Coding Services',
      content:
        'Timely medical billing and accurate reimbursement are critical to effective revenue cycle management. Navigant helps healthcare providers reduce administrative burden through reliable medical billing and coding services for global clients.',
      image: '/healthcare/Medicalbilling&codingservices.jpg',
      imageAlt: 'Medical Billing & Coding Services',
      features: [
        'Medical Billing Services – Accurate, timely submission with multi-level quality checks to minimize delays and denials.',
        'Medical Coding Services – Certified coders ensure regulatory compliance and daily coding of securely uploaded patient records.',
        'Medical Claims Processing – Electronic and paper claims submitted securely with two levels of QA to reduce errors and rejections.',
        'Accounts Receivable Management – Insurer follow-ups, payment posting, denial analysis, and resubmissions to improve cash flow.',
      ],
    },
    {
      id: 'medical-transcription-detail',
      title: 'Medical Transcription Services',
      content:
        'A wide variety of global clients—from individual physicians to hospitals—leverage our trained medical transcriptionists. We capture dictations, transcribe, and deliver reports in required formats, tailoring to your dictation systems and HIS. We handle ER reports, discharge and clinical summaries, rehab reports, surgery and operative notes, and more. Dedicated teams learn physician styles and accents, with account managers, transcriptionists, proofreaders, and QA experts delivering defect-free reports in under 24 hours, fully HIPAA compliant.',
      image: '/healthcare/Medicaltranscriptionservices.png',
      imageAlt: 'Medical Transcription Services',
      features: [
        'End-to-end transcription: dictation capture, transcription, and delivery in required formats',
        'Broad report coverage: ER reports, discharge/clinical summaries, rehab, surgery and operative notes',
        'Dedicated team per account to master physician styles and accents (manager, transcriptionist, proofreader, QA)',
        'Fast turnaround (<24 hours) with rigorous QA and 100% HIPAA compliance',
      ],
    },
    {
      id: 'pharmacy-business-service-detail',
      title: 'Pharmacy Business Service',
      content:
        'Pharmacy billing, mail order fulfillment, document management, and full-service pharmacy operations supported by specialists fluent in tools like CoverMyMeds, DocuTrack, and leading Pharmacy Information Systems—designed to improve cash flow and customer experience.',
      image: '/healthcare/Pharmacybusinessservice.png',
      imageAlt: 'Pharmacy Business Service',
      features: [
        'Pharmacy Billing Services – Customized billing to accelerate processing and cash flow with CPT expertise and compliance audits.',
        'Mail Order Services – Refill handling, authorizations, and billing for online pharmacy orders.',
        'Document Management – Automated handling for pharmacy, radiology, and related healthcare records.',
        'Pharmacy Management Services – New pharmacy setup, facility operations, and end-to-end management.',
        'Tooling expertise – Experienced with CoverMyMeds, DocuTrack, and major Pharmacy Information Systems.',
      ],
    },
    {
      id: 'teleradiology-services-detail',
      title: 'Teleradiology Services',
      content:
        'Teleradiology enables secure transmission of medical images for remote interpretation, bridging radiologist gaps worldwide. Navigant provides timely, accurate reads with certified radiologists across all non-invasive imaging, ensuring regulatory compliance and cost efficiency—delivering emergency turnaround as fast as 20 minutes and transcribed reports within 10–12 hours.',
      image: '/healthcare/Teleradiologyservices.png',
      imageAlt: 'Teleradiology Services',
      features: [
        '3D Image Processing – MR/CT angiography, MPR/MIP, and advanced reconstructions.',
        'Medical Imaging Interpretation – X-ray, MRI, Ultrasound, PET, Echocardiography, and more.',
        'Certified Reporting – US Board, UK-FRCR, Australian, Canadian, and Indian MD-certified radiologists.',
        'Preliminary Reporting – Rapid initial reads followed by expert review and final sign-off.',
        'Additional Expertise – MRIs, whole-body CTs, MSK/abdominal ultrasounds, thoracic imaging, nuclear medicine, cardiology, coronary CTA, and clinical trials.',
        '24/7 Coverage – Emergency TAT ~20 minutes; transcribed reports within 10–12 hours.',
      ],
    },
  ],

//   additionalServices: [
//     {
//       id: 'data-ops',
//       title: 'Clinical Data Ops',
//       content: 'Abstraction, data validation, and registry submissions with double-blind QA.',
//     },
//     {
//       id: 'compliance',
//       title: 'Compliance & QA',
//       content: 'Process audits, call scoring, and compliance documentation to maintain readiness.',
//     },
//     {
//       id: 'workforce',
//       title: 'Workforce Management',
//       content: '24/7 coverage models with forecasting, staffing, and performance dashboards.',
//     },
//   ],

  features: [
    {
      id: 'secure-infra',
      title: 'Secure Infrastructure',
      shortDescription: 'Access controls, encryption, and logging tailored for PHI.',
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      shortDescription: 'SLAs, QA scores, and denial metrics to drive continuous improvement.',
    },
    {
      id: 'scalable',
      title: 'Scalable Teams',
      shortDescription: 'Rapid ramp-up with healthcare-trained agents and supervisors.',
    },
  ],

  testimonials: [],

  cta: {
    title: 'Talk to Our Team',
    description: 'Contact us for the detailed discussion on our Healthcare Services.',
    primaryButton: {
      text: 'Schedule a Call',
      href: '/contact',
    },
    showForm: true,
  },
};

