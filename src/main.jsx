import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  EnvelopeSimple,
  Headset,
  MagnifyingGlass,
  Package,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserCircleCheck,
  WarningCircle,
} from '@phosphor-icons/react';
import './styles.css';
import heroOpsImage from './assets/media/va-headhunter-hero-ops-overload.jpg';
import hireSprintImage from './assets/media/va-headhunter-hire-in-30-sprint.jpg';
import candidatePacketImage from './assets/media/va-headhunter-candidate-packet.jpg';
import roleCollageImage from './assets/media/va-headhunter-role-collage.jpg';
import founderCredibilityImage from './assets/media/va-headhunter-founder-credibility.jpg';

gsap.registerPlugin(ScrollTrigger);

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const FALLBACK_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'rob@rjar.us';

const auditSnapshot = [
  ['Role clarity', 'Needs tightening'],
  ['Applicant risk', 'High noise / low signal'],
  ['Best next move', 'Define ops role first'],
  ['Recommended path', 'Shortlist or Hire-in-30'],
];

const painPoints = [
  ['You post a role and get flooded', 'Dozens or hundreds of applicants show up, but most are generic, underqualified, or impossible to compare.'],
  ['You are not sure what to screen for', 'Reliability, communication, judgment, ecommerce context, and follow-through are hard to judge from a resume.'],
  ['The wrong hire creates more work', 'A weak remote hire does not remove work from your plate. They add messages, mistakes, confusion, and follow-up.'],
  ['Ops work keeps coming back to you', 'Customer questions, order updates, product uploads, vendor emails, returns, inbox admin, and fulfillment issues still land on the founder.'],
  ['You need a role, not just a person', '“I need a VA” is usually too vague. The first win is defining the exact ops seat that should come off your plate.'],
];

const comparisonRows = [
  ['DIY job post', 'You get volume, but still have to screen, compare, interview, and decide.'],
  ['Cheap VA marketplace', 'You may find labor, but role fit and reliability are still on you.'],
  ['Generic recruiter', 'They may understand hiring, but not the day-to-day mess of ecommerce ops.'],
  ['Doing nothing', 'The founder stays trapped in recurring low-value work.'],
  ['VA Headhunter', 'We clarify the role, screen for fit, produce a focused shortlist, and support onboarding.'],
];

const roles = [
  {
    icon: Headset,
    title: 'Customer Support Assistant',
    copy: 'For tickets, order questions, returns, FAQs, review follow-up, and customer updates.',
    className: 'wide',
  },
  {
    icon: Package,
    title: 'Order Processing / Vendor Follow-Up Assistant',
    copy: 'For supplier coordination, order status checks, vendor emails, purchase order follow-up, and admin tracking.',
    className: 'wide lift',
  },
  {
    icon: ShoppingCart,
    title: 'Product Upload / Catalog Assistant',
    copy: 'For product listings, descriptions, images, specs, tags, collections, and catalog cleanup.',
    className: 'compact',
  },
  {
    icon: UserCircleCheck,
    title: 'Founder Ops / Admin Assistant',
    copy: 'For inbox support, reports, research, task follow-up, recurring admin, and founder delegation.',
    className: 'compact',
  },
  {
    icon: Truck,
    title: 'Fulfillment Coordination Assistant',
    copy: 'For shipment tracking, delivery issues, warehouse communication, fulfillment updates, and customer follow-up.',
    className: 'compact',
  },
];

const hireIn30Stack = [
  ['Founder Ops Bottleneck Audit', 'We identify which recurring tasks should come off your plate first.'],
  ['Role Success Profile', 'We turn “I need help” into a specific role with responsibilities, must-haves, tools, schedule, pay expectations, and success criteria.'],
  ['Candidate Sourcing + Screening', 'We source, review, and screen candidates for communication, reliability, role fit, ecommerce context, and red flags.'],
  ['Top 3 Candidate Shortlist', 'You get a focused decision packet, not a resume dump.'],
  ['Final Interview Kit', 'Interview questions, comparison notes, red flags, and decision support.'],
  ['Ecommerce-Specific Test Task', 'A practical task tied to the actual role, not generic interview theater.'],
  ['30-Day Onboarding System', 'First tasks, daily update structure, weekly check-in rhythm, and early performance expectations.'],
  ['Search Refresh Terms', 'If we cannot deliver three candidates who match the agreed role criteria, we keep sourcing at no additional search fee until we do.'],
];

const offers = [
  {
    name: 'Free Ecommerce Hiring Audit',
    stage: 'Start here',
    description: 'Show us the role or applicant pile. We will identify hiring leaks, weak-fit risks, and the best next step.',
    bullets: ['Role clarity review', 'Hiring-stage diagnosis', 'Applicant/process risk notes', 'Recommended path', 'Fit / not-fit guidance'],
    cta: 'Get My Free Hiring Audit',
  },
  {
    name: 'Applicant Pile Cleanup',
    stage: 'Already posted',
    description: 'Already have applicants? We rank the candidates worth interviewing, flag obvious risks, and tell you if the pool is strong enough to continue.',
    bullets: ['Candidate ranking', 'Red flag notes', 'Interview order', 'Role-specific questions', 'Pool quality assessment'],
    cta: 'Clean Up My Applicant Pile',
  },
  {
    name: 'Top 3 Remote Ops Shortlist',
    stage: 'Need candidates',
    description: 'We define the role, source and screen candidates, and deliver three ecommerce remote ops candidates worth interviewing.',
    bullets: ['Role success profile', 'Sourcing and screening', 'Top 3 candidate packet', 'Interview questions', 'Selection support'],
    cta: 'Start a Shortlist Search',
  },
  {
    name: 'Ecommerce Ops Hire-in-30',
    stage: 'Full support',
    description: 'For owners who want role clarity, sourcing, screening, shortlist support, and an onboarding rhythm in one structured process.',
    bullets: ['Bottleneck audit', 'Role success profile', 'Sourcing and screening', 'Top 3 shortlist', 'Interview/test task support', '30-day onboarding system'],
    cta: 'Install My First Remote Ops Hire',
    featured: true,
  },
];

const steps = [
  ['Diagnose the bottleneck', 'We identify what work should come off your plate first and whether a remote ops hire is the right next move.'],
  ['Define the role', 'We turn a vague need into a clear success profile with tasks, tools, expectations, schedule, and screening criteria.'],
  ['Source and screen', 'We look for candidates who fit the role, communicate clearly, and show the reliability signals ecommerce owners need.'],
  ['Deliver the shortlist', 'You get a small number of candidates worth interviewing, with notes on strengths, risks, compensation expectations, and next steps.'],
  ['Help you onboard', 'We give you the first tasks, check-in cadence, and accountability structure so the hire can become useful quickly.'],
];

const packetItems = [
  ['Candidate summary', 'Concise role-fit snapshot and recommended next step.'],
  ['Relevant experience', 'Evidence tied to ecommerce operations, not generic resume polish.'],
  ['Communication notes', 'Async writing, customer tone, response quality, and follow-through.'],
  ['Strengths and risks', 'What looks strong, what needs probing, and where onboarding must be clear.'],
  ['Interview questions', 'Role-specific prompts that reveal judgment before the hire.'],
];

const whyUsPoints = [
  ['Role clarity before sourcing', 'We define what the hire should own, what tools they need to use, what success looks like, and what should stay with the founder.'],
  ['Screening for the signals that matter', 'We look for clear communication, reliability, task ownership, ecommerce context, and signs that the candidate can follow through without constant chasing.'],
  ['Candidate packets, not resume piles', 'You get a focused shortlist with strengths, risks, compensation expectations, interview questions, and recommended next steps.'],
  ['Onboarding structure from day one', 'A good hire still needs direction. We help you start with first tasks, daily updates, weekly check-ins, and clear expectations.'],
  ['Founder-led, system-backed', 'VA Headhunter is founder-led, which means early clients get senior judgment on role design, screening, and candidate fit. Behind that judgment is a repeatable process for audits, scorecards, candidate packets, and onboarding structure.'],
];

const goodFit = [
  'You run a Shopify or ecommerce business.',
  'You are still doing recurring ops work yourself.',
  'You need customer support, order follow-up, catalog, admin, vendor, or fulfillment help.',
  'You want a structured hiring process.',
  'You can pay fair remote talent.',
  'You will provide timely feedback during the search.',
];

const badFit = [
  'You only want the cheapest possible VA.',
  'You want someone to “do everything” without defining the role.',
  'You expect unlimited candidates or unlimited replacements.',
  'You want VA Headhunter to be the employer of record.',
  'You need legal, payroll, or HR compliance advice.',
  'You are unwilling to onboard or manage the hire.',
];

const faqs = [
  ['What types of businesses do you work with?', 'Founder-led Shopify and ecommerce businesses that need reliable remote operations support.'],
  ['What roles do you help hire?', 'Customer support, order processing, vendor follow-up, product upload/catalog, founder ops/admin, fulfillment coordination, and similar ecommerce operations roles.'],
  ['Do you provide the VA directly?', 'No. VA Headhunter helps define, source, screen, shortlist, and support the hiring process. You make the final hiring decision and manage the hire directly.'],
  ['Do you handle payroll or legal compliance?', 'No. Clients are responsible for payroll, contracts, classification, tax, legal, and HR compliance.'],
  ['What if I already have applicants?', 'Start with Applicant Pile Cleanup. We rank the strongest candidates, flag red flags, and tell you who is worth interviewing.'],
  ['What does it cost?', 'Pricing depends on the hiring path. Some clients only need applicant cleanup. Others need a sourced shortlist or full Hire-in-30 support. Start with the free ecommerce hiring audit and we will recommend the smallest practical next step.'],
  ['Why do you not show exact pricing?', 'Because scope depends on the role, applicant pool, sourcing complexity, urgency, and onboarding support needed. The audit helps us recommend the right path instead of forcing every owner into the same package.'],
  ['What if the candidates are not good enough?', 'If we cannot deliver three candidates who match the agreed role criteria, we keep sourcing at no additional search fee until we do.'],
  ['Do you guarantee the hire stays forever?', 'No. No recruiting process can guarantee that. Premium engagements may include defined replacement/search-refresh support under written terms.'],
  ['Can you help me figure out what role to hire first?', 'Yes. That is exactly what the Free Ecommerce Hiring Audit is designed to help with.'],
];

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42 },
          {
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 82%' },
          },
        );
      });

      gsap.utils.toArray('.stack-card').forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 34, scale: 0.98 },
          {
            y: 0,
            scale: 1,
            duration: 0.72,
            delay: index * 0.04,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%' },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => document.getElementById('hiring-audit')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFlagship = () => document.getElementById('hire-in-30')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToProcess = () => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });

  const buildPayload = (form) => {
    const data = new FormData(form);
    return {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      storeUrl: String(data.get('storeUrl') || '').trim(),
      roleType: String(data.get('roleType') || '').trim(),
      stage: String(data.get('stage') || '').trim(),
      stuck: String(data.get('stuck') || '').trim(),
      timeline: String(data.get('timeline') || '').trim(),
      notes: String(data.get('notes') || '').trim(),
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = buildPayload(event.currentTarget);

    if (!payload.name) {
      setError('Enter your name so we know who to reply to.');
      return;
    }

    if (!payload.email.includes('@') || !payload.email.includes('.')) {
      setError('Enter a valid email so we can reply to the audit request.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Lead form request failed');
      } else {
        const body = [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Store URL: ${payload.storeUrl || 'Not provided'}`,
          `Role type: ${payload.roleType || 'Not provided'}`,
          `Hiring stage: ${payload.stage || 'Not provided'}`,
          `Timeline: ${payload.timeline || 'Not provided'}`,
          '',
          `Currently stuck: ${payload.stuck || 'Not provided'}`,
          '',
          payload.notes || 'No additional notes provided.',
        ].join('\n');
        const mailto = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent('VA Headhunter hiring audit request')}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setFallbackUsed(true);
      }

      setSubmitted(true);
    } catch {
      setError('We could not send the request. Please email the details directly and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main ref={rootRef} className="page-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="VA Headhunter home">
          <span className="brand-mark">VH</span>
          <span>VA Headhunter</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#process">How It Works</a>
          <a href="#roles">Roles</a>
          <a href="#hire-in-30">Hire-in-30</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="button button-small" onClick={scrollToForm}>Get My Free Hiring Audit</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" id="main-content">
          <p className="kicker">For Shopify & ecommerce owners</p>
          <h1>Hire reliable remote ops help without sorting through 100 bad applicants.</h1>
          <p className="hero-subhead">
            VA Headhunter helps ecommerce owners define the right remote operations role, screen out weak-fit candidates, and get a shortlist worth interviewing, without turning hiring into another full-time job.
          </p>
          <div className="hero-actions">
            <button className="button" onClick={scrollToForm}>Get My Free Hiring Audit <ArrowRight weight="bold" /></button>
            <button className="button button-secondary" onClick={scrollToProcess}>See How It Works</button>
          </div>
          <div className="hero-offer-note" aria-label="Positioning note">
            <strong>Built by an ecommerce operator:</strong>
            <span>MBA, PMP, retired Marine Corps Sergeant Major background, and hands-on experience building lean ops systems.</span>
          </div>
          <p className="hero-qualifier">Not a cheap VA marketplace. Not a resume dump. Structured hiring support for ecommerce operators.</p>
        </div>

        <aside className="hero-panel" aria-label="Hiring audit snapshot">
          <div className="panel-image" aria-label="Ecommerce operator reviewing support tickets and order follow-up">
            <img src={heroOpsImage} alt="Ecommerce operator reviewing remote operations work, support tickets, and order follow-up" />
          </div>
          <div className="audit-card">
            <div className="audit-header">
              <ClipboardText weight="duotone" />
              <div>
                <span>Hiring Audit Snapshot</span>
                <strong>Remote ops role review</strong>
              </div>
            </div>
            <div className="audit-rows">
              {auditSnapshot.map(([label, value]) => (
                <div className="audit-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p>The goal is not more applicants. The goal is fewer bad ones.</p>
          </div>
        </aside>
      </section>

      <section className="pain section-tight reveal">
        <div>
          <p className="kicker">The real problem</p>
          <h2>Most ecommerce owners do not need more applicants. They need fewer bad ones.</h2>
          <p>Posting a remote role is easy. Finding someone reliable, clear, and actually useful inside an ecommerce operation is the hard part.</p>
        </div>
        <div className="pain-grid">
          {painPoints.map(([title, copy]) => (
            <article className="pain-item" key={title}>
              <CheckCircle weight="fill" />
              <div><strong>{title}</strong><span>{copy}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section comparison reveal">
        <div className="comparison-copy">
          <p className="kicker">Different by design</p>
          <h2>This is not a cheap VA marketplace.</h2>
          <p>VA Headhunter is built for ecommerce owners who need reliable remote operations support, not another pile of resumes to sort through.</p>
          <p>The point is not to find the cheapest assistant. The point is to reduce bad-hire risk and get the right recurring work off your plate.</p>
        </div>
        <div className="comparison-table simple" role="table" aria-label="Hiring options comparison">
          {comparisonRows.map(([option, outcome]) => (
            <div className={option === 'VA Headhunter' ? 'row highlight' : 'row'} role="row" key={option}>
              <strong>{option}</strong>
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section roles-section" id="roles">
        <div className="section-heading reveal">
          <p className="kicker">Remote ops roles</p>
          <h2>The first hire should remove real ecommerce work from your plate.</h2>
          <p>VA Headhunter focuses on remote roles that support the daily operations of Shopify and ecommerce businesses. If the role is vague, the audit helps define what should be delegated first.</p>
        </div>
        <div className="section-visual roles-visual reveal">
          <img src={roleCollageImage} alt="Four ecommerce operations role examples: customer support, order follow-up, catalog uploads, and fulfillment coordination" />
        </div>
        <div className="role-grid">
          {roles.map(({ icon: Icon, title, copy, className }) => (
            <article className={`role-card stack-card ${className}`} key={title}>
              <div>
                <div className="icon-wrap"><Icon weight="duotone" /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <div className="proof-strip"><MagnifyingGlass weight="bold" /> Screen for role fit, communication, reliability, and ecommerce judgment.</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section cleanup-spotlight flagship" id="hire-in-30" aria-label="Ecommerce Ops Hire-in-30 details">
        <div className="cleanup-intro reveal">
          <p className="kicker">Flagship path</p>
          <h2>Ecommerce Ops Hire-in-30</h2>
          <p>Define the role, source and screen candidates, deliver a focused shortlist, and install the onboarding rhythm so your new remote hire does not become another person to babysit.</p>
          <button className="button" onClick={scrollToForm}>Get My Free Hiring Audit <ArrowRight weight="bold" /></button>
        </div>
        <div className="cleanup-panel stack-card">
          <div className="cleanup-price">
            <span>Start with the audit</span>
            <strong>Fixed scope</strong>
            <small>We recommend the right path based on your role, applicant pool, urgency, and onboarding needs.</small>
          </div>
          <p className="promise-box">Get a reliable remote ecommerce ops candidate shortlist and onboarding plan in a 30-day operating window, without sorting through 100 weak applicants yourself.</p>
          <div className="process-visual">
            <img src={hireSprintImage} alt="Thirty day hiring sprint board for role clarity, screening, shortlist, interview kit, and onboarding" />
          </div>
          <div className="cleanup-list">
            {hireIn30Stack.map(([title, copy]) => (
              <article key={title}>
                <CheckCircle weight="fill" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section packages" id="packages">
        <div className="section-heading align-left reveal">
          <p className="kicker">Where to start</p>
          <h2>Start with the smallest fix that matches your hiring stage.</h2>
          <p>Some ecommerce owners already have applicants. Others need help defining the role first. Some need a full search and onboarding structure. The audit routes you to the right next move.</p>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className={`offer-card stack-card ${offer.featured ? 'featured' : ''}`} key={offer.name}>
              <div className="offer-stage">{offer.stage}</div>
              <div className="offer-title-row">
                <h3>{offer.name}</h3>
              </div>
              <p>{offer.description}</p>
              <ul>
                {offer.bullets.map((bullet) => <li key={bullet}><CheckCircle weight="fill" /> {bullet}</li>)}
              </ul>
              <button className={offer.featured ? 'button' : 'button button-secondary'} onClick={scrollToForm}>{offer.cta}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading align-left reveal">
          <p className="kicker">The process</p>
          <h2>A cleaner path from “I need help” to “this person can own the role.”</h2>
        </div>
        <div className="timeline">
          {steps.map(([title, copy], index) => (
            <article className="step stack-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section packet reveal">
        <div className="packet-copy">
          <p className="kicker">What you get</p>
          <h2>You do not get a resume dump. You get a decision packet.</h2>
          <p>The shortlist is designed to help you make a better hiring decision faster.</p>
          <button className="button" onClick={scrollToForm}>Request My Hiring Audit <ArrowRight weight="bold" /></button>
        </div>
        <div className="packet-stack">
          <div className="section-visual packet-visual">
            <img src={candidatePacketImage} alt="Anonymized ecommerce operations candidate shortlist packet with three candidate cards" />
          </div>
          <div className="packet-card">
            <div className="packet-header"><ClipboardText weight="duotone" /> Candidate packet preview</div>
          <dl>
            {packetItems.map(([label, copy]) => <div key={label}><dt>{label}</dt><dd>{copy}</dd></div>)}
          </dl>
          <div className="sample-candidates">
            <article><strong>Candidate A</strong><p>Strong customer support background. Clear written communication. Familiar with Shopify order lookup and refund workflows.</p></article>
            <article><strong>Candidate B</strong><p>Good admin and catalog experience. Strong attention to detail. Better fit for product uploads than customer-facing work.</p></article>
            <article><strong>Candidate C</strong><p>High ownership signals. Comfortable with inbox/admin and order follow-up. Needs clear SOPs and weekly priorities.</p></article>
          </div>
          </div>
        </div>
      </section>

      <section className="section authority reveal">
        <div>
          <p className="kicker">Why VA Headhunter</p>
          <h2>A better way to hire remote ecommerce ops help.</h2>
          <p>Most hiring services give you more candidates. VA Headhunter gives you a clearer role, stronger screening, and a shortlist built around the actual work inside your ecommerce business.</p>
          <p>We help founder-led ecommerce teams hire remote support for customer service, order follow-up, product uploads, vendor coordination, fulfillment issues, and recurring admin work. The goal is not to flood your inbox with resumes. The goal is to help you find someone reliable enough to take real work off your plate.</p>
        </div>
        <div className="authority-side">
          <div className="section-visual authority-media">
            <img src={founderCredibilityImage} alt="Operator-led ecommerce hiring review with candidate notes and remote interview screen" />
          </div>
          <div className="authority-grid why-us-grid">
            {whyUsPoints.map(([title, copy]) => (
            <article className="authority-pill why-us-card" key={title}>
              <CheckCircle weight="fill" />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reversal reveal">
        <ShieldCheck weight="duotone" />
        <div>
          <p className="kicker">Risk reversal</p>
          <h2>Structured enough to reduce risk. Scoped enough to stay sane.</h2>
          <p>If we cannot deliver three candidates who match the agreed role criteria, we keep sourcing at no additional search fee until we do.</p>
          <p>For premium Hire-in-30 engagements, replacement/search-refresh support can be included under defined terms if the selected candidate leaves or is terminated for performance within the initial window, provided the role, compensation, schedule, responsibilities, and onboarding expectations stayed materially aligned.</p>
        </div>
      </section>

      <section className="section qualification reveal" aria-label="Founder qualification">
        <div className="section-heading align-left">
          <p className="kicker">Fit check</p>
          <h2>VA Headhunter is for owners who want a better hiring process, not just cheaper labor.</h2>
        </div>
        <div className="qualification-grid">
          <article className="qualification-card good">
            <h3>You may be a good fit if</h3>
            <ul>{goodFit.map((item) => <li key={item}><CheckCircle weight="fill" /> {item}</li>)}</ul>
          </article>
          <article className="qualification-card bad">
            <h3>Probably not a fit if</h3>
            <ul>{badFit.map((item) => <li key={item}><WarningCircle weight="fill" /> {item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-heading align-left reveal">
          <p className="kicker">Questions</p>
          <h2>Clear scope before you start.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map(([question, answer]) => (
            <details className="stack-card" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta reveal">
        <div>
          <p className="kicker">Ready to get out of the ecommerce ops pile?</p>
          <h2>If recurring ops work is still sitting on your plate, start with the audit.</h2>
          <p>If there is a fit, we will recommend the smallest practical next step.</p>
        </div>
        <div className="hero-actions centered">
          <button className="button button-light" onClick={scrollToForm}>Get My Free Hiring Audit <ArrowRight weight="bold" /></button>
          <button className="button button-secondary dark" onClick={scrollToFlagship}>See How Hire-in-30 Works</button>
        </div>
      </section>

      <section className="section lead-form" id="hiring-audit">
        <div className="form-copy reveal">
          <p className="kicker">Start with clarity</p>
          <h2>Get your free ecommerce hiring audit.</h2>
          <p>Tell us what role you are trying to hire for, where you are stuck, and whether you already have applicants. We will review the situation and recommend the best next step.</p>
          <div className="credibility-card">
            <EnvelopeSimple weight="duotone" />
            <div><strong>Plain recommendations, not recruiter fog.</strong><span>If the applicant pile is weak, you will hear that directly. If a smaller fix is enough, we will not push a larger search.</span></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} aria-label="Hiring audit form" noValidate>
          {submitted ? (
            <div className="success-state">
              <ShieldCheck weight="duotone" />
              <h3>{fallbackUsed ? 'Email draft prepared.' : 'Audit request received.'}</h3>
              <p>{fallbackUsed ? 'Your email app should open with the request details. Send it from there and we will reply with the recommended next step.' : 'Thanks. We received your audit request. We will review your role/applicant situation and follow up with the recommended next step.'}</p>
            </div>
          ) : isLoading ? (
            <div className="loading-state" aria-live="polite">
              <div className="skeleton wide-line" />
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton tall" />
              <p>Preparing the request.</p>
            </div>
          ) : (
            <>
              <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required aria-describedby={error ? 'form-error' : undefined} /></label>
              <label>Store URL<input name="storeUrl" type="url" inputMode="url" placeholder="yourstore.com" /></label>
              <label>What kind of help are you trying to hire?
                <select name="roleType" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Customer support</option>
                  <option>Order processing / vendor follow-up</option>
                  <option>Product uploads / catalog support</option>
                  <option>Founder ops / admin</option>
                  <option>Fulfillment coordination</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>Where are you in the hiring process?
                <select name="stage" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>I have not posted the role yet</option>
                  <option>I already have applicants</option>
                  <option>I hired before and it did not work</option>
                  <option>I know I need help but the role is unclear</option>
                  <option>Other</option>
                </select>
              </label>
              <label>What is currently stuck on your plate?<textarea name="stuck" rows="4" placeholder="Example: customer emails, order follow-up, product uploads, supplier communication, inbox admin..." /></label>
              <label>How soon do you want this role filled?
                <select name="timeline" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>This week</option>
                  <option>This month</option>
                  <option>Next 60 days</option>
                  <option>Just exploring</option>
                </select>
              </label>
              <label>Anything else we should know?<textarea name="notes" rows="4" placeholder="Tell us what would make this hire successful." /></label>
              {error && <p className="form-error" id="form-error">{error}</p>}
              <button className="button" type="submit">Request My Hiring Audit <ArrowRight weight="bold" /></button>
            </>
          )}
        </form>
      </section>

      <footer>
        <span>VA Headhunter</span>
        <span>Operator-led remote ops hiring for ecommerce teams.</span>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
