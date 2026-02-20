export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'digital-marketing',
    question: 'Can Navigant assist with digital marketing and online growth strategies?',
    answer:
      'Yes. Navigant offers comprehensive digital marketing services — including SEO, social media management, and market research — to improve online visibility and help businesses expand their brand presence in markets like the US, UK, Canada, and India.',
  },
  {
    id: 'startups-enterprise',
    question: 'Does Navigant Technologies work with startups and enterprise clients?',
    answer:
      'Navigant serves a wide range of clients, from startups to large enterprises across verticals such as e-commerce, telecom, finance, healthcare, and utilities, providing customised BPO, telemarketing, and digital solutions to suit scalable business needs.',
  },
  {
    id: 'customer-support-sales',
    question: 'How can Navigant help improve customer support and sales for my company?',
    answer:
      "Navigant's contact centre and telemarketing solutions are designed to boost customer engagement, generate high-quality leads, enhance sales pipelines, and improve overall customer experience through omnichannel support (voice, chat, email).",
  },
  {
    id: 'services-globally',
    question: 'What services does Navigant Technologies offer to businesses globally?',
    answer:
      'Navigant Technologies is a full-service business process outsourcing (BPO) and digital solutions provider offering inbound/outbound contact centre services, telemarketing, AI-driven digital workers, market research, finance & accounting support, HR services, and digital marketing across India, US, UK, and Canada.',
  },
  {
    id: 'onboarding-bpo',
    question: 'How does Navigant onboard a new BPO or back-office process?',
    answer:
      'We follow a proven onboarding framework: discovery & SOP alignment → knowledge transfer → pilot run → SLA calibration → full-scale go-live. This minimizes transition risk and speeds up time-to-value.',
  },
  {
    id: 'transition-timeline',
    question: 'What is the typical transition timeline for outsourcing to Navigant?',
    answer:
      'Simple processes go live in 2–4 weeks; complex multi-step or regulated workflows typically need 6–10 weeks, depending on volume, tools access, and compliance reviews.',
  },
  {
    id: 'tools-systems',
    question: 'Can Navigant work on our tools and systems?',
    answer:
      'Yes. We integrate with client CRMs, ERPs, ticketing tools, dialers, RPA bots, and data platforms. We also provide secure VDI-based access where required.',
  },
];

/** Number of FAQs to show on the home page section */
export const HOME_FAQ_COUNT = 4;
