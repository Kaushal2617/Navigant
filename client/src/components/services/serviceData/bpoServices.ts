import type { ServiceData } from '../serviceTypes';

export const bpoServicesData: ServiceData = {
  id: 'bpo-services',
  slug: 'bpo-services',
  name: 'BPO Services',
  title: 'Navigant BPO Services',
  subtitle: 'Let your team offload creative work to an outsourced creative company, increasing day-to-day efficiency for your business.',
  description: 'Comprehensive Business Process Outsourcing services to help you focus on core business activities and increase operational efficiency.',
  
  // Hero Slides (Tata Tele Business pattern)
  heroSlides: [
    {
      id: 1,
      title: 'Outbound Services: Drive Your Sales Forward',
      subtitle: 'Customized outbound services to maximize your business profitability',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
      imageAlt: 'Outbound Services',
    },
    {
      id: 2,
      title: 'Inbound Customer Service: We\'re Ready to Answer',
      subtitle: 'Operational excellence with deep industrial knowledge',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
      imageAlt: 'Inbound Customer Service',
    },
    {
      id: 3,
      title: 'Lead Generation: Quality Leads for Your Business',
      subtitle: 'Perfect marketing tools to qualify and convert prospects',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      imageAlt: 'Lead Generation',
    },
    {
      id: 4,
      title: 'Customer Support: Knowledge Intensive Solutions',
      subtitle: 'High quality, scalable and cost-effective support services',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
      imageAlt: 'Customer Support',
    },
  ],

  // About Section (Tata Tele Business pattern)
  aboutSection: {
    title: 'Transforming Businesses through Digitalization',
    content: 'Navigant Technologies, a global outsourcing firm headquartered in New Delhi, India, was founded in 2003 with a mission to deliver high-quality BPO services. We offer comprehensive solutions including customer service, technical support, lead generation, telemarketing, and back-office support across various industries. With an unwavering focus on customer-centricity and innovation, Navigant continues to be a trusted partner for businesses worldwide.',
  },

  // Industries (Tata Tele Business pattern)
  industries: [
    {
      id: 'bfsi',
      name: 'BFSI',
      description: 'Secure digital capabilities to make your customer experience smart, secure, and efficient - anytime, anywhere.',
      iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-2.9-2.303-2.9-4.182a2.4 2.4 0 014.8 0c0 .738.405 1.376 1.037 1.836 1.172.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182a2.4 2.4 0 00-4.8 0c0 .738-.405 1.376-1.037 1.836',
    },
    {
      id: 'it-ites',
      name: 'IT/ITeS',
      description: 'Rethink operations for seamless & secure collaboration in the right technology to pivot to a future-ready digital workplace.',
      iconPath: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V6.75a3 3 0 013-3h13.5a3 3 0 013 3v4.5a3 3 0 01-3 3m-16.5 0a3 3 0 00-3 3v4.5a3 3 0 003 3h13.5a3 3 0 003-3v-4.5a3 3 0 00-3-3M5.25 14.25h13.5',
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Improve communication with customers, collaboration across the value-chain and gain better visibility into supply chains.',
      iconPath: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 8.25c-.621.53-.672 1.582-.672 2.357V19.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19.5v-8.893c0-.775-.051-1.827-.672-2.357M10 11.25h4M10 11.25v-4.5M10 11.25v-4.5m0 0h4m-4 0H8.625',
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Leverage best-in-class connectivity & marketing solutions to garner customer loyalty to reach new heights.',
      iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Digitalise education with intuitive collaboration tools, web conferencing apps, robust cybersecurity systems and more.',
      iconPath: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443a55.381 55.381 0 015.25 2.882V15',
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Adopt from a range of digital solutions to manage patient engagement and access in a secure and reliable way.',
      iconPath: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    },
    {
      id: 'telecom-media',
      name: 'Telecom, Media & Entertainment',
      description: 'Ensure always-on availability, effortless scaling-up, and elevate user experience with innovative solutions.',
      iconPath: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 18.75h3',
    },
    {
      id: 'retail',
      name: 'Retail',
      description: 'Drive seamless omni-channel retail with secure connectivity and intelligent cloud-based solutions.',
      iconPath: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    },
  ],

  // Why Choose Us (Tata Tele Business pattern)
  highlights: [
    {
      id: 'years-experience',
      title: 'Years of Experience',
      description: 'Over 23+ years of experience in delivering and delighting enterprises with pioneering BPO products and solutions.',
      icon: '📅',
    },
    {
      id: 'comprehensive-portfolio',
      title: 'Comprehensive Portfolio',
      description: 'One of the most comprehensive portfolio of BPO solutions for enterprises spanning customer service, technical support, lead generation, and more.',
      icon: '📋',
    },
    {
      id: 'operations-india',
      title: 'Operations in India',
      description: 'Operations in multiple cities in India with state-of-the-art call centers and support facilities.',
      icon: '🇮🇳',
    },
    {
      id: '100-trusted',
      title: '100% Trusted',
      description: 'One of the widest reach in enterprise segment, through trusted partners across geographies.',
      icon: '✅',
    },
  ],

  // Detailed Service Sections (Original BPO page pattern - NO DUPLICATES)
  // These are the main services with full detailed descriptions
  detailSections: [
    {
      id: 'outbound-services-detail',
      title: 'Outbound Services',
      content: 'We at Navigant provide the customized outbound services that includes direct telemarketing, order processing, up-selling/cross-selling, surveys & polling, enquiry management & fulfilment, lead generation, co-branding & affinity programs. Customized telemarketing services extend beyond answering customer questions. In addition to assisting the Client with their businesses, our dedicated telemarketer\'s group will also track, report, and identify any ongoing operational problems, update user guides etc. Whether it is mass or target marketing, cost-effectively depends on the ability of telesales representatives (TSR) to make more calls, more sales and convert more enquiries faster and with fewer busy lines. The database and call management network allows us to build telemarketing scripts, store prospect information, place outbound calls and recall the results of each call. Predictive dialling selects prospective clients list and directs only those calls answered by live voices to our TSR\'S. Others are rescheduled for later call-backs.',
      image: '/bpo/Outboundservices.jpg',
      imageAlt: 'Outbound Services',
    },
    {
      id: 'b2b-b2c-telemarketing-detail',
      title: 'B2B/B2C Telemarketing',
      content: 'Telemarketing is the systematic, integrated use of the telephone and trained staff to communicate with existing and potential customers to maximize business profitability. Our telemarketing services can provide you with excellent return on investment. "B2B" is a call centre term for "Business-to-Business" whereas "B2C" refers to "Business-to-Consumer". Navigant\'s expertise in B2B telemarketing enables organizations to target companies and wholesales customers. This service is for those organizations interested in sheer volume of business and reduced customer service costs. We help you improve sales performance by delivering cost effective quality solutions, in any business area, across every continent, in any language.',
      image: '/bpo/B2BB2Ctelemarketing.png',
      imageAlt: 'B2B/B2C Telemarketing',
      features: [
        'IT & Telecoms',
        'Logistics & Materials Handling',
        'AMC Services',
        'Professional & Business Services',
        'Specialist B2B and SME',
      ],
    },
    {
      id: 'inbound-customer-service-detail',
      title: 'Inbound Customer Service',
      content: 'We\'re ready to answer your calls!! By getting together operational excellence and deep industrial and functional knowledge to critical business processes, our Clients always get more value than anywhere else. We provide high-quality execution of Client customer care processes, monitor these against multiple performance metrics, and seek to improve them on an ongoing basis. Navigant offers end-to-end outsourcing solutions. Our customizable offerings are aligned as per different markets and special needs. To ensure accurate process monitoring and optimum service delivery, Navigant has deployed the latest call centre technology which enables advanced call routing; generate reports such as ACD (Automatic Call Distribution), ACW (After Call Work), Agent Performance Analytics, AHT (Average Handling Time) and several other features. Navigant provides integrated customer service solutions through our tried and tested industry best practices.',
      image: '/bpo/Inboundcustomerservice.png',
      imageAlt: 'Inbound Customer Service',
    },
    {
      id: 'lead-generation-detail',
      title: 'B2B/B2C Lead Generation',
      content: 'Navigant Lead Generation programs are the perfect marketing tools to properly qualify/sell to your prospects so your highly skilled, highly paid salespeople and officers are not wasting their valuable time. We provide Lead Generation in the fields of AMC, Mortgage, Insurance, Refinance, Day Cash Loans, Debt Consolidation, Information Technology and travel among others. Navigant supplements the standard way of generating leads by telemarketing with several other forms such as email blasts, web search, data profiling, validating online customer enquiries, etc. You can trust our expertise in this domain and will be happy to see the results we generate for you!!',
      image: '/bpo/B2BB2Cleadgeneration.png',
      imageAlt: 'B2B/B2C Lead Generation',
    },
    {
      id: 'customer-support-detail',
      title: 'Customer Support',
      content: 'Navigant Technologies focuses on providing knowledge intensive support solutions that can be delivered remotely. We provide high quality, scalable and cost-effective services for outsourcing the technical and IT help desk functions. From our multiple technical service centers equipped with latest call center technology, the technology help desk group provides total support solutions for ISPs, OEMs, software companies and IT needs of companies. The support provided is comprehensive and covers all major operating systems, desktop applications that run the office environment. Our support services allow the client to reduce their support cost by 30-50%. Majority of our staff members are engineers with all necessary technical certifications and have gone through extensive training in soft skills required for customer support.',
      image: '/bpo/Customersupport.png',
      imageAlt: 'Customer Support',
    },
    {
      id: 'pre-post-sales-detail',
      title: 'Pre/Post Sales',
      content: 'Adding customers to your sales basket and further retaining them is not an easy task. Navigant can staff well trained and experienced staff to ensure that your prospects not only get the right information when they call your Company\'s toll free number but also are well-informed about the benefits of choosing you over your competitors. Once a "Prospect" becomes a "Customer" we staff Customer Service Agents with the right kind of soft skills, customer service etiquettes and call handling techniques, armored with suitable access to customer information, to make your Customers\' interaction a delight every time they call you and a reason to stay with you forever. Increase of 25% in average order size on all checks through cross-sell and up-sell promotions.',
      image: '/bpo/Prepostsales.png',
      imageAlt: 'Pre/Post Sales',
    },
  ],

  // Service Categories - REMOVED to avoid duplication with detailSections
  // The detailed sections above already cover all main services
  serviceCategories: [],

  // Additional Services (Original BPO page pattern) - These are unique, not in detailSections
  additionalServices: [
    {
      id: 'order-entry',
      title: 'Order Entry On Incoming Calls',
      content: 'It is very important to tap every business opportunity that comes knocking at your doorstep. Our qualified Trainers ensure that the call answering staff is suitably trained to greet the customer to a Professional Company and register Customers\' orders on the Order Tracking System. Callers wanting to book orders are identified uniquely and placed on a separate call queue by our EPBX system to be answered as quickly as possible.',
    },
    {
      id: 'customer-retention',
      title: 'Customer Retention',
      content: 'Companies are always trying new means to attract customers from competitors. This leaves many worried by thinking if they are even able to recover the cost of acquiring each customer. How can this "preying" be stopped?? The answer is simple…… If you provide your Customers with poor after-sales service, they will leave you. If you provide them with an average experience, they are open to being attracted to leave you. But if you provide them with a great experience, your competitors will be unable to bear the cost of acquiring them from you…… and this is what you would want.',
    },
    {
      id: 'order-tracking',
      title: 'Order Tracking',
      content: 'Our qualified Trainers ensure that the call answering staff is suitably trained to greet the customer to a Professional Company and register Customers\' orders on the Order Tracking System. Callers wanting to book an order are identified uniquely and placed on a separate call queue by our EPBX system to be answered as quickly as possible. Tracking the delivery of Customer orders with logistics can be a nightmare at times!! Navigant can staff suitably qualified personnel to coordinate with several departments and ensure that your Customers receive their orders as per your commitments.',
    },
    {
      id: 'refund-processing',
      title: 'Refund Processing',
      content: 'Navigant can answer incoming calls of your customers calling in for a refund. These calls are generally from irate customers and have to be dealt with a sense of maturity as the customer can sometimes be very compelling and demand a disproportionate refund wherein the customer service agent has to explain logically what the refund value is going to be and process the same accordingly as per pre-defined policies.',
    },
    {
      id: 'out-of-hours-support',
      title: 'Out of Hours Support',
      content: 'If you are looking for a call centre to answer your incoming calls only during non-business hours, Navigant can do that for you. Generally, the cost of hiring in-house staff during off-days and non-business hours is very high. You can outsource this responsibility to us and be rest assured that neither will we charge you a fortune and also allow your customers to feel that they are doing business with a truly global Organization, caring for its Customers round the clock.',
    },
    {
      id: 'brand-advertising',
      title: 'Brand Advertising',
      content: 'When you have a targeted customer base and would like to educate them about your latest products and service offerings, Navigant can help you with this. Importance of spreading awareness of your products and services by word of mouth is equally as important as media ads and other marketing techniques. Navigant has helped several companies in the telecom, medical, manufacturing and many other domains, launch their offerings with great success in the market.',
    },
    {
      id: 'mail-followup',
      title: 'Mail Followup',
      content: 'If you have executed a mailer campaign and want someone to follow up with personalized calls, Navigant can do this for you. When a customer/prospect receives a mailer with some new product/service information, he might be interested and might have a few questions. It\'s just due to lack of time that he is unable to call you and book an order. Following up with a telephonic call to such mailer campaigns will help approach such prospects head-on and generate sales leads right away.',
    },
  ],

  // Legacy features (for backward compatibility)
  features: [],

  // Testimonials
  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Frank Goodman',
      role: 'COO',
      content: 'Navigant Technologies runs our customer service, technical support and field support services including installation of GPS devices and provides us with an excellent service.',
    },
    {
      id: 'testimonial-2',
      name: 'Deepak',
      role: 'Client',
      company: 'Gurugram',
      content: 'Navigant Technologies converts our Web leads into sales. Also manages our back office support. Navigant has a track record for meeting the targets accurately and never missed the targets. We are very happy with their Call Center / BPO services. Excellent Job done Navigant Team !',
    },
  ],

  // CTA Section
  cta: {
    title: 'Ask for the Best Deals from Navigant BPO Services',
    description: 'We\'d love to answer any questions you may have. Contact us and discuss your business objectives & we will let you know how we can help along.',
    primaryButton: {
      text: 'Let\'s Talk',
      href: '/contact',
    },
    showForm: true,
  },
};
