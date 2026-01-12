
const API_URL = 'http://localhost:8080/api/v1';

// Admin Credentials
const EMAIL = 'admin@navigant.in';
const PASSWORD = 'password123'; // Trying default or 'password'

const caseStudiesData = [
    {
        title: 'Transforming Customer Support Operations',
        description: 'How Navigant helped a leading e-commerce platform reduce customer support costs by 40% while improving response times and customer satisfaction scores through our comprehensive BPO solutions.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
        category: 'BPO Services',
        alt: 'Customer Support Transformation Case Study',
        fullContent: `<h2>Challenge</h2><p>A leading e-commerce platform was struggling with escalating customer support costs and declining satisfaction scores. With over 50,000 daily customer inquiries across multiple channels, their in-house support team was overwhelmed, leading to delayed responses and frustrated customers.</p>
<h2>Solution</h2><p>Navigant Technologies implemented a comprehensive BPO solution that transformed their customer support operations:</p>
<ul>
<li><strong>Multi-channel Support:</strong> Integrated phone, email, chat, and social media support into a unified system</li>
<li><strong>AI-Powered Triage:</strong> Deployed intelligent routing to categorize and prioritize inquiries automatically</li>
<li><strong>24/7 Coverage:</strong> Established round-the-clock support with our global team of trained professionals</li>
<li><strong>Quality Assurance:</strong> Implemented rigorous QA processes with real-time monitoring and feedback loops</li>
<li><strong>Performance Analytics:</strong> Set up comprehensive dashboards for tracking KPIs and continuous improvement</li>
</ul>
<h2>Results</h2><p>The transformation delivered remarkable results:</p>
<ul>
<li><strong>40% Reduction in Support Costs:</strong> Streamlined operations and optimized resource allocation</li>
<li><strong>60% Faster Response Times:</strong> Average response time reduced from 4 hours to 1.5 hours</li>
<li><strong>25% Improvement in Customer Satisfaction:</strong> CSAT scores increased from 3.2 to 4.0 out of 5</li>
<li><strong>95% First Contact Resolution:</strong> Enhanced training and knowledge base improved issue resolution</li>
<li><strong>Scalability:</strong> Successfully handled peak seasons with 3x inquiry volume without quality degradation</li>
</ul>
<h2>Key Technologies Used</h2>
<ul>
<li>CRM Integration (Salesforce, Zendesk)</li>
<li>AI Chatbots for initial triage</li>
<li>Knowledge Management Systems</li>
<li>Real-time Analytics Dashboards</li>
<li>Quality Monitoring Tools</li>
</ul>
<p>The client continues to partner with Navigant for ongoing support excellence and expansion into new markets.</p>`,
        order: 1,
        publishDate: new Date().toISOString()
    },
    {
        title: 'Digital Transformation Success Story',
        description: 'A Fortune 500 company achieved 60% operational efficiency improvement by implementing Navigant\'s digital worker solutions, automating repetitive tasks and freeing up resources for strategic initiatives.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
        category: 'Digital Workers',
        alt: 'Digital Transformation Case Study',
        fullContent: `<h2>Challenge</h2><p>A Fortune 500 manufacturing company was spending 70% of their workforce time on repetitive, manual tasks like data entry, invoice processing, and report generation. This limited their ability to focus on strategic initiatives and innovation.</p>
<h2>Solution</h2><p>Navigant Technologies deployed a comprehensive Digital Worker solution that automated critical business processes:</p>
<ul>
<li><strong>Intelligent Document Processing:</strong> Automated invoice processing, purchase orders, and contract management</li>
<li><strong>Data Entry Automation:</strong> Eliminated manual data entry across ERP and CRM systems</li>
<li><strong>Report Generation:</strong> Automated daily, weekly, and monthly reporting processes</li>
<li><strong>Email Management:</strong> Automated email categorization, routing, and response generation</li>
<li><strong>Workflow Automation:</strong> Streamlined approval processes and task assignments</li>
</ul>
<h2>Implementation Approach</h2>
<ul>
<li>Phase 1: Process Analysis and Mapping (2 weeks)</li>
<li>Phase 2: Digital Worker Development (4 weeks)</li>
<li>Phase 3: Testing and Optimization (2 weeks)</li>
<li>Phase 4: Deployment and Training (2 weeks)</li>
<li>Phase 5: Continuous Improvement (Ongoing)</li>
</ul>
<h2>Results</h2><p>The digital transformation delivered exceptional outcomes:</p>
<ul>
<li><strong>60% Operational Efficiency Improvement:</strong> Reduced processing time from days to hours</li>
<li><strong>80% Reduction in Manual Errors:</strong> Automated validation and quality checks</li>
<li><strong>$2.5M Annual Cost Savings:</strong> Reduced labor costs and improved productivity</li>
<li><strong>50% Faster Processing Times:</strong> Invoice processing reduced from 5 days to 2.5 days</li>
<li><strong>Enhanced Employee Satisfaction:</strong> Staff freed up for strategic, value-added work</li>
</ul>
<h2>ROI Analysis</h2>
<ul>
<li>Initial Investment: $450,000</li>
<li>Annual Savings: $2,500,000</li>
<li>Payback Period: 2.2 months</li>
<li>3-Year ROI: 556%</li>
</ul>
<p>The company has expanded the digital worker program to additional departments and processes, creating a culture of continuous automation and innovation.</p>`,
        order: 2,
        publishDate: new Date().toISOString()
    },
    {
        title: 'Healthcare BPO Excellence',
        description: 'A major healthcare provider streamlined their medical billing and patient support operations with Navigant, resulting in 50% faster claim processing and 95% accuracy rates in medical coding.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80',
        category: 'Healthcare Services',
        alt: 'Healthcare BPO Case Study',
        fullContent: `<h2>Challenge</h2><p>A major healthcare network with 15 facilities was experiencing significant challenges in medical billing and patient support:</p>
<ul>
<li>High claim rejection rates (35%) due to coding errors</li>
<li>Slow claim processing times (average 45 days)</li>
<li>Patient support backlog with 2-week response times</li>
<li>Compliance concerns with HIPAA and healthcare regulations</li>
<li>Staff burnout from high workload</li>
</ul>
<h2>Solution</h2><p>Navigant Technologies implemented a specialized Healthcare BPO solution with certified professionals:</p>
<ul>
<li><strong>Medical Coding Excellence:</strong> Deployed certified coders (CPC, CCS) with specialized training</li>
<li><strong>Claims Processing:</strong> Streamlined submission, tracking, and follow-up processes</li>
<li><strong>Patient Support:</strong> Established dedicated healthcare support team with medical terminology expertise</li>
<li><strong>Compliance Management:</strong> Implemented HIPAA-compliant processes and regular audits</li>
<li><strong>Revenue Cycle Management:</strong> End-to-end management from patient registration to payment collection</li>
</ul>
<h2>Specialized Services</h2>
<ul>
<li>Medical Billing and Coding (ICD-10, CPT, HCPCS)</li>
<li>Prior Authorization Management</li>
<li>Claims Denial Management and Appeals</li>
<li>Patient Eligibility Verification</li>
<li>Accounts Receivable Management</li>
<li>Patient Communication and Support</li>
</ul>
<h2>Results</h2><p>The healthcare BPO solution delivered outstanding results:</p>
<ul>
<li><strong>50% Faster Claim Processing:</strong> Reduced from 45 days to 22.5 days average</li>
<li><strong>95% Coding Accuracy:</strong> Reduced errors from 35% to 5% rejection rate</li>
<li><strong>40% Increase in Revenue:</strong> Improved claim acceptance and faster collections</li>
<li><strong>80% Reduction in Patient Support Response Time:</strong> From 2 weeks to 2-3 days</li>
<li><strong>100% HIPAA Compliance:</strong> Zero compliance violations in 3 years</li>
<li><strong>Enhanced Patient Satisfaction:</strong> Improved communication and faster issue resolution</li>
</ul>
<h2>Quality Metrics</h2>
<ul>
<li>First Pass Acceptance Rate: 95%</li>
<li>Denial Rate: Reduced from 35% to 5%</li>
<li>Average Days in A/R: Reduced from 65 to 32 days</li>
<li>Patient Satisfaction Score: 4.6/5.0</li>
</ul>
<p>The healthcare provider has expanded the partnership to include additional facilities and services, making Navigant a trusted partner in their operational excellence journey.</p>`,
        order: 3,
        publishDate: new Date().toISOString()
    }
];

async function seed() {
    try {
        console.log('Logging in...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
        });

        if (!loginRes.ok) {
            const error = await loginRes.text();
            console.error('Login failed:', loginRes.status, error);
            console.log('Please verify admin credentials.');
            return;
        }

        const cookie = loginRes.headers.get('set-cookie');
        console.log('Login successful. Cookie acquired.');

        for (const caseStudy of caseStudiesData) {
            console.log(`Creating case study: ${caseStudy.title}`);
            const res = await fetch(`${API_URL}/admin/case-studies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookie,
                },
                body: JSON.stringify(caseStudy),
            });

            if (!res.ok) {
                const error = await res.text();
                console.error(`Failed to create ${caseStudy.title}:`, res.status, error);
            } else {
                console.log(`Successfully created: ${caseStudy.title}`);
            }
        }

        console.log('Seeding complete.');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

seed();
