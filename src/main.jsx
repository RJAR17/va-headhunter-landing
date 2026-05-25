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

gsap.registerPlugin(ScrollTrigger);

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const FALLBACK_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'rob@rjar.us';

const offers = [
  {
    name: 'Free Ecommerce Hiring Audit',
    price: 'Audit-first',
    stage: 'Start here',
    description: 'Show us the role or applicant pile. We identify the hiring leaks, weak-fit risks, and best next move before you spend on a full search.',
    bullets: ['Role clarity review', 'Applicant/process risk notes', 'Best-fit offer recommendation', 'No bloated consulting call'],
    cta: 'Get my audit',
  },
  {
    name: 'Applicant Pile Cleanup',
    price: 'Scoped after audit',
    stage: 'Already posted',
    description: 'Send the pile. We rank the candidates worth interviewing, flag the obvious risks, and tell you if the whole pool is too weak to trust.',
    bullets: ['Review up to 50 applicants', 'Rank top candidates', 'Flag red flags', 'Interview order', 'Role-specific questions'],
    cta: 'Clean up my applicants',
  },
  {
    name: 'Top 3 Remote Ops Shortlist',
    price: 'Scoped after audit',
    stage: 'Need candidates',
    description: 'We define the role, source and screen candidates, and deliver three ecommerce remote ops candidates worth interviewing.',
    bullets: ['One role success profile', 'Sourcing and first-pass screening', 'Top 3 candidate packet', 'Interview questions', 'Selection support'],
    cta: 'Start a shortlist search',
  },
  {
    name: 'Ecommerce Ops Hire-in-30',
    price: 'Fixed-scope recommendation',
    stage: 'Flagship',
    description: 'Define the role, source and screen candidates, deliver a top-three shortlist, and install the onboarding rhythm so the hire does not become another person to babysit.',
    bullets: ['Founder bottleneck audit', 'Role success profile', 'Sourcing and screening', 'Top 3 shortlist packet', 'Interview and test-task support', '30-day onboarding system'],
    cta: 'Install my first remote ops hire',
    featured: true,
  },
];

const roles = [
  {
    icon: Headset,
    title: 'Customer support assistant',
    copy: 'Tickets, returns, tracking questions, customer follow-up, and reply quality that protects trust.',
    criteria: 'Writing quality, empathy, accuracy, escalation judgment.',
    proof: 'Screen: delayed order reply plus refund boundary check.',
    className: 'wide',
  },
  {
    icon: Package,
    title: 'Order processing and vendor follow-up',
    copy: 'Purchase orders, supplier updates, fulfillment checks, and exception handling for stores that cannot afford dropped balls.',
    criteria: 'Detail orientation, urgency, follow-through, tool comfort.',
    proof: 'Screen: PO status chase plus vendor update summary.',
    className: 'wide lift',
  },
  {
    icon: ShoppingCart,
    title: 'Product upload and catalog support',
    copy: 'Listings, product data, Shopify updates, image checks, tagging, and repeatable catalog cleanup.',
    criteria: 'Accuracy, platform experience, QA habits.',
    proof: 'Screen: spot bad specs, mismatched images, and missing fields.',
    className: 'compact',
  },
  {
    icon: UserCircleCheck,
    title: 'Founder ops and admin assistant',
    copy: 'Founder inbox, admin tasks, research, scheduling, SOP follow-through, and loose operational edges.',
    criteria: 'Communication, discretion, prioritization, async reliability.',
    proof: 'Screen: prioritize mixed founder requests without hand-holding.',
    className: 'compact',
  },
  {
    icon: Truck,
    title: 'Fulfillment coordination assistant',
    copy: 'Tracking, shipping issue follow-up, warehouse communication, customer updates, and exception logs.',
    criteria: 'Follow-through, status accuracy, calm escalation, customer clarity.',
    proof: 'Screen: resolve a shipment exception and write the customer update.',
    className: 'compact',
  },
];

const goodFit = [
  'You run a Shopify or ecommerce business.',
  'You are still doing recurring ops work yourself.',
  'You need support, order follow-up, catalog, admin, fulfillment, or vendor coordination help.',
  'You can pay fair remote talent and respond quickly during the search.',
  'You want a structured hiring process, not a cheap resume pile.',
];

const badFit = [
  'You only want the lowest possible hourly rate.',
  'You want unlimited replacements or a guaranteed perfect hire.',
  'You expect VA Headhunter to handle payroll, compliance, or permanent management.',
  'You cannot define the role, give feedback, or onboard the person you hire.',
];

const hireIn30Stack = [
  ['Founder Ops Bottleneck Audit', 'Find the recurring work that should come off your plate first.'],
  ['Role Success Profile', 'Turn vague help into responsibilities, tools, hours, pay range, and 30-day success criteria.'],
  ['Candidate Sourcing + Screening', 'Filter for communication, reliability, ecommerce fit, and role-specific judgment.'],
  ['Top 3 Candidate Shortlist', 'Review ranked candidates with strengths, risks, compensation notes, and recommended next step.'],
  ['Final Interview Kit', 'Use questions, a comparison matrix, and a practical test task tied to the role.'],
  ['30-Day Onboarding System', 'Start with first tasks, daily async updates, weekly check-ins, and performance review structure.'],
];

const steps = [
  ['Diagnose the bottleneck', 'We identify the role that creates the most immediate operational relief.'],
  ['Define the role', 'Responsibilities, hours, tools, deal-breakers, pay range, and what good looks like in 30 days.'],
  ['Source and screen', 'Candidates are filtered against role-specific criteria instead of resume noise and gut feel.'],
  ['Deliver the shortlist', 'You get ranked recommendations, red flags, interview questions, and next-step guidance.'],
  ['Install the rhythm', 'The selected hire starts with task clarity, async updates, and a simple accountability cadence.'],
];

const faqs = [
  ['Is this a VA marketplace?', 'No. VA Headhunter is an operator-led hiring system for ecommerce remote ops roles. We help define, source, screen, shortlist, and support onboarding.'],
  ['Do you employ the candidates?', 'No. You hire and manage the candidate directly. Clients handle payroll, agreements, classification, and legal compliance.'],
  ['What roles do you focus on?', 'Customer support, order processing, vendor follow-up, product upload/catalog support, fulfillment coordination, and founder ops/admin.'],
  ['What if I already have applicants?', 'Use Applicant Pile Cleanup. We rank the strongest candidates, flag red flags, and tell you who is worth interviewing.'],
  ['What does it cost?', 'Pricing depends on the hiring path. Some clients only need applicant cleanup. Others need a sourced shortlist or full Hire-in-30 support. Start with the free ecommerce hiring audit and we will recommend the smallest practical next step.'],
  ['What if the candidates are not good enough?', 'If we cannot deliver three candidates who match the agreed role criteria, we keep sourcing at no additional search fee until we do.'],
  ['Do you guarantee the hire stays forever?', 'No. Premium packages can include one defined replacement shortlist attempt under written terms. There are no vague unlimited replacement promises.'],
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
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
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
          { autoAlpha: 0, y: 64, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%' },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => document.getElementById('hiring-audit')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToPackages = () => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFlagship = () => document.getElementById('hire-in-30')?.scrollIntoView({ behavior: 'smooth' });

  const buildPayload = (form) => {
    const data = new FormData(form);
    return {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      businessType: String(data.get('businessType') || '').trim(),
      role: String(data.get('role') || '').trim(),
      stage: String(data.get('stage') || '').trim(),
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
          `Business type: ${payload.businessType || 'Not provided'}`,
          `Role: ${payload.role || 'Not provided'}`,
          `Stage: ${payload.stage || 'Not provided'}`,
          '',
          payload.notes || 'No notes provided.',
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
          <a href="#hire-in-30">Hire-in-30</a>
          <a href="#roles">Roles</a>
          <a href="#packages">Offers</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="button button-small" onClick={scrollToForm}>Get a hiring audit</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" id="main-content">
          <p className="kicker">Shopify ops hiring for ecommerce owners</p>
          <h1>Hire a reliable remote ecommerce ops assistant without sorting through 100 bad applicants.</h1>
          <p className="hero-subhead">
            VA Headhunter helps Shopify and ecommerce founders define the right role, screen candidates, deliver a trusted shortlist, and onboard remote ops help without turning the hire into another management problem.
          </p>
          <div className="hero-actions">
            <button className="button" onClick={scrollToForm}>Get my free hiring audit <ArrowRight weight="bold" /></button>
            <button className="button button-secondary" onClick={scrollToFlagship}>See Hire-in-30</button>
          </div>
          <div className="hero-offer-note" aria-label="Flagship offer">
            <strong>Flagship offer:</strong>
            <span>Start with a free ecommerce hiring audit. If there is a fit, we will recommend the right path: applicant cleanup, candidate shortlist, or full Hire-in-30 support.</span>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Candidate screening preview">
          <div className="panel-image" role="img" aria-label="An ecommerce operator reviewing candidate notes on a laptop" />
          <div className="shortlist-card">
            <div className="card-topline">
              <span>Candidate shortlist</span>
              <strong>Order ops assistant</strong>
            </div>
            {[
              ['Mara Villarin', '92', 'Shopify support, vendor follow-up', 'Confirm async writing sample'],
              ['Jonel Prado', '87', 'Order processing, PO tracking', 'Probe escalation judgment'],
              ['Ana Roces', '81', 'Catalog cleanup, product uploads', 'Test detail accuracy'],
            ].map(([name, score, strength, next]) => (
              <div className="candidate" key={name}>
                <div>
                  <strong>{name}</strong>
                  <p>{strength}</p>
                  <small>{next}</small>
                </div>
                <span className="score">{score}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="pain section-tight reveal">
        <div>
          <p className="kicker">The bottleneck</p>
          <h2>Most owners do not need more applicants. They need fewer bad ones.</h2>
        </div>
        <div className="pain-grid">
          {['Job posts attract weak-fit candidates', 'Good applicants get buried', 'Screening burns founder hours', 'Bad hires cost customer trust', 'Vague remote roles fail early'].map((item) => (
            <div className="pain-item" key={item}><CheckCircle weight="fill" /> {item}</div>
          ))}
        </div>
      </section>

      <section className="section comparison reveal">
        <div className="comparison-copy">
          <p className="kicker">Category clarity</p>
          <h2>Not a job board. Not a cheap VA marketplace.</h2>
          <p>VA Headhunter is built for founder-led ecommerce teams that need reliable remote operations help, not another resume pile, lowest-cost labor marketplace, generic recruiter, or do-nothing delay.</p>
        </div>
        <div className="comparison-table" role="table" aria-label="Hiring options comparison">
          <div className="row header" role="row"><span></span><strong>DIY post</strong><strong>VA marketplace</strong><strong>VA Headhunter</strong></div>
          {[
            ['Role clarity', 'Often vague', 'Template-driven', 'Role success profile before screening'],
            ['Applicant screening', 'Manual', 'Resume filters', 'Role-specific criteria and red flags'],
            ['Decision support', 'Scattered notes', 'Limited', 'Shortlist packet with recommendations'],
            ['Ecommerce ops focus', 'Owner-dependent', 'Broad VA pool', 'Customer, orders, catalog, founder ops'],
            ['Onboarding support', 'Owner figures it out', 'Generic', 'First tasks, updates, and accountability cadence'],
          ].map(([label, diy, market, vh]) => (
            <div className="row" role="row" key={label}><strong>{label}</strong><span>{diy}</span><span>{market}</span><span>{vh}</span></div>
          ))}
        </div>
      </section>

      <section className="section cleanup-spotlight flagship" id="hire-in-30" aria-label="Ecommerce Ops Hire-in-30 details">
        <div className="cleanup-intro">
          <p className="kicker">Flagship offer</p>
          <h2>Ecommerce Ops Hire-in-30</h2>
          <p>Get a reliable remote ecommerce ops hire installed in 30 days without sorting through 100 bad applicants or guessing how to manage them.</p>
          <button className="button" onClick={scrollToForm}>Install my first remote ops hire <ArrowRight weight="bold" /></button>
        </div>
        <div className="cleanup-panel">
          <div className="cleanup-price">
            <span>Start with the audit</span>
            <strong>Fixed scope</strong>
            <small>We recommend the smallest practical path based on your role, applicant pool, urgency, and onboarding needs.</small>
          </div>
          <div className="cleanup-list">
            {hireIn30Stack.map(([title, copy]) => (
              <article key={title}>
                <CheckCircle weight="fill" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <div className="cleanup-warning"><ShieldCheck weight="duotone" /> If we cannot deliver three candidates who match the agreed role criteria, we keep sourcing at no additional search fee.</div>
        </div>
      </section>

      <section className="section roles-section" id="roles">
        <div className="section-heading reveal">
          <p className="kicker">Role focus</p>
          <h2>Built for the repeatable work that keeps ecommerce stores moving.</h2>
          <p>Start narrow, screen consistently, and hire for operational judgment instead of resume polish.</p>
        </div>
        <div className="role-grid">
          {roles.map(({ icon: Icon, title, copy, criteria, proof, className }) => (
            <article className={`role-card stack-card ${className}`} key={title}>
              <div>
                <div className="icon-wrap"><Icon weight="duotone" /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <div>
                <small>{criteria}</small>
                <div className="proof-strip"><MagnifyingGlass weight="bold" /> {proof}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section packet reveal">
        <div className="packet-copy">
          <p className="kicker">Decision packet</p>
          <h2>You do not get a resume dump.</h2>
          <p>Each shortlist turns candidate evidence into a calm hiring decision: fit score, strengths, risks, compensation expectations, communication notes, and the recommended interview path.</p>
          <button className="button" onClick={scrollToForm}>See if my role is a fit <ArrowRight weight="bold" /></button>
        </div>
        <div className="packet-card">
          <div className="packet-header"><ClipboardText weight="duotone" /> Sample screening packet</div>
          <dl>
            <div><dt>Fit score</dt><dd>89 / 100</dd></div>
            <div><dt>Compensation expectation</dt><dd>$7 to $9/hr depending on hours and scope</dd></div>
            <div><dt>Communication notes</dt><dd>Clear async writing, concise customer tone, asks good clarifying questions.</dd></div>
            <div><dt>Strengths</dt><dd>Order follow-up, Shopify admin, customer response accuracy.</dd></div>
            <div><dt>Risks</dt><dd>Needs validation on vendor escalation and edge-case judgment.</dd></div>
            <div><dt>Recommended question</dt><dd>Walk me through a delayed order with an upset customer.</dd></div>
          </dl>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading align-left reveal">
          <p className="kicker">How it works</p>
          <h2>A cleaner way to install remote ops help.</h2>
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

      <section className="section packages" id="packages">
        <div className="section-heading align-left reveal">
          <p className="kicker">Offer ladder</p>
          <h2>Start with the smallest fix that matches your hiring stage.</h2>
          <p>The audit routes you to the right next move: free diagnosis, applicant cleanup, a sourced shortlist, or full Hire-in-30 support. Pricing follows the scope after we understand the role.</p>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className={`offer-card stack-card ${offer.featured ? 'featured' : ''}`} key={offer.name}>
              <div className="offer-stage">{offer.stage}</div>
              <div className="offer-title-row">
                <h3>{offer.name}</h3>
                <div className="price">{offer.price}</div>
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

      <section className="section authority reveal">
        <div>
          <p className="kicker">Why VA Headhunter</p>
          <h2>Built by an ecommerce operator, not a generic staffing shop.</h2>
          <p>VA Headhunter is led by a Shopify store owner who understands customer support backlog, order issues, product updates, vendor follow-up, fulfillment coordination, and founder admin.</p>
        </div>
        <div className="authority-grid">
          {['Shopify/ecommerce operator', 'MBA', 'PMP', 'Retired USMCR Sergeant Major', 'n8n, Hermes, and AI workflow leverage'].map((item) => (
            <div className="authority-pill" key={item}><CheckCircle weight="fill" /> {item}</div>
          ))}
        </div>
      </section>

      <section className="section reversal reveal">
        <ShieldCheck weight="duotone" />
        <div>
          <p className="kicker">Risk reversal with boundaries</p>
          <h2>Structured enough to reduce risk. Scoped enough to stay sane.</h2>
          <p>If we cannot deliver three candidates who match the agreed role criteria, we keep sourcing at no additional search fee. Premium packages can include one replacement shortlist attempt under defined terms. VA Headhunter does not handle payroll, legal compliance, employer-of-record services, or unlimited replacements.</p>
        </div>
      </section>

      <section className="section qualification reveal" aria-label="Founder qualification">
        <div className="section-heading align-left">
          <p className="kicker">Fit filter</p>
          <h2>Is VA Headhunter right for you?</h2>
          <p>The best clients want operator-grade help and are willing to run a clean process. The wrong clients are shopping for the cheapest possible resume pile.</p>
        </div>
        <div className="qualification-grid">
          <article className="qualification-card good">
            <h3>Good fit if</h3>
            <ul>{goodFit.map((item) => <li key={item}><CheckCircle weight="fill" /> {item}</li>)}</ul>
          </article>
          <article className="qualification-card bad">
            <h3>Not a fit if</h3>
            <ul>{badFit.map((item) => <li key={item}><WarningCircle weight="fill" /> {item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section lead-form" id="hiring-audit">
        <div className="form-copy reveal">
          <p className="kicker">Start with clarity</p>
          <h2>Get a free ecommerce hiring audit.</h2>
          <p>Tell us where hiring is stuck. We will point you toward the smallest practical next step: audit, applicant cleanup, shortlist search, or full Hire-in-30 support.</p>
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
              <p>{fallbackUsed ? 'Your email app should open with the request details. Send it from there and we will reply with the best next step.' : 'We will review the details and reply with the best next step.'}</p>
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
              <label>Name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" required aria-describedby={error ? 'form-error' : undefined} /></label>
              <label>Business type<input name="businessType" type="text" placeholder="Shopify store, marketplace seller, ecommerce brand" /></label>
              <label>Role you are hiring for<input name="role" type="text" placeholder="Customer support, order ops, catalog admin" /></label>
              <label>Current hiring stage<select name="stage" defaultValue=""><option value="" disabled>Select one</option><option>Thinking about posting a role</option><option>Already have applicants</option><option>Need candidates sourced</option><option>Trying to replace a weak hire</option></select></label>
              <label>Notes<textarea name="notes" rows="4" placeholder="What is stuck, tools they need to know, hours, timezone, budget, or deal-breakers." /></label>
              {error && <p className="form-error" id="form-error">{error}</p>}
              <button className="button" type="submit">Request hiring audit <ArrowRight weight="bold" /></button>
            </>
          )}
        </form>
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
          <h2>Define the role, screen smarter, and install remote ops help without guessing.</h2>
        </div>
        <div className="hero-actions centered">
          <button className="button button-light" onClick={scrollToForm}>Get my free hiring audit <ArrowRight weight="bold" /></button>
          <button className="button button-secondary dark" onClick={scrollToFlagship}>See Hire-in-30</button>
        </div>
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
