import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  EnvelopeSimple,
  Funnel,
  Headset,
  MagnifyingGlass,
  Package,
  ShieldCheck,
  ShoppingCart,
  UserCircleCheck,
  WarningCircle,
} from '@phosphor-icons/react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const FALLBACK_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'rob@rjar.us';

const offers = [
  {
    name: 'VA Hiring Kit',
    price: '$149',
    stage: 'Before you post',
    description: 'Turn a vague need for help into a clean role post, scorecard, red-flag checklist, and first interview script.',
    bullets: ['Role description', 'Screening questions', 'Candidate scorecard', 'Interview script', 'Red flags checklist'],
    cta: 'Get the kit',
  },
  {
    name: 'Applicant Pile Cleanup',
    price: '$299',
    stage: 'Best first move',
    description: 'Already have applicants? Send the pile. We rank the people worth interviewing, flag the risky ones, and tell you who to skip.',
    bullets: ['Review up to 50 applicants', 'Rank top candidates', 'Flag red flags', 'Recommend interview order', 'Role-specific interview questions'],
    cta: 'Clean up my applicants',
    featured: true,
  },
  {
    name: 'Top 3 Shortlist Search',
    price: 'From $995',
    stage: 'When the pool is weak',
    description: 'We define the role, source candidates, screen for fit, and deliver three credible candidates worth your interview time.',
    bullets: ['Intake and success profile', 'Sourcing and screening', 'Top 3 candidate shortlist', 'Candidate notes', 'Final interview questions'],
    cta: 'Start a search',
  },
  {
    name: 'Search + Onboarding Support',
    price: 'From $2,500',
    stage: 'For higher-stakes roles',
    description: 'Full search support with sharper evaluation, final selection help, onboarding structure, and written replacement terms.',
    bullets: ['Full search', 'Scorecards and test task support', 'Final interview support', 'Onboarding checklist', 'Replacement support terms'],
    cta: 'Book a call',
  },
];

const roles = [
  {
    icon: Headset,
    title: 'Customer support rep',
    copy: 'Inbox, chat, returns, tracking questions, and customer follow-up without careless tone or sloppy answers.',
    criteria: 'Writing quality, empathy, accuracy, escalation judgment.',
    proof: 'Sample screen: delayed order reply + refund boundary check.',
    className: 'wide',
  },
  {
    icon: Package,
    title: 'Order processing and vendor follow-up',
    copy: 'Purchase orders, supplier updates, fulfillment checks, and exception handling for stores that cannot afford dropped balls.',
    criteria: 'Detail orientation, urgency, follow-through, tool comfort.',
    proof: 'Sample screen: PO status chase + vendor update summary.',
    className: 'wide lift',
  },
  {
    icon: ShoppingCart,
    title: 'Product upload and catalog support',
    copy: 'Listings, product data, Shopify updates, image checks, and repeatable catalog cleanup.',
    criteria: 'Accuracy, platform experience, QA habits.',
    proof: 'Sample screen: spot bad specs, mismatched images, and missing fields.',
    className: 'compact',
  },
  {
    icon: UserCircleCheck,
    title: 'Founder ops and admin assistant',
    copy: 'Founder inbox, admin tasks, research, scheduling, SOP follow-through, and loose operational edges.',
    criteria: 'Communication, discretion, prioritization, async reliability.',
    proof: 'Sample screen: prioritize mixed founder requests without hand-holding.',
    className: 'wide-last',
  },
];

const cleanupDeliverables = [
  ['Candidate ranking', 'A clear top-to-bottom list so you know who deserves the first interview slot.'],
  ['Skip reasons', 'Plain-English notes on weak applicants, risky patterns, and what not to waste time on.'],
  ['Interview plan', 'Role-specific questions tied to customer tone, order accuracy, catalog detail, or founder ops judgment.'],
  ['Next move', 'If the pile is weak, you get a practical recommendation: revise the post, change channel, or start a search.'],
];

const steps = [
  ['Define the role', 'Responsibilities, hours, tools, deal-breakers, pay range, and what good looks like.'],
  ['Screen for the traits that matter', 'Candidates are filtered against role-specific criteria instead of resume noise and gut feel.'],
  ['Shortlist candidates worth interviewing', 'You get ranked recommendations, red flags, interview questions, and next-step guidance.'],
  ['Support the final decision', 'For search packages, we help compare finalists and reduce avoidable bad-hire risk.'],
];

const faqs = [
  ['Is this a VA agency?', 'No. VA Headhunter is a sourcing and screening service. We help you define, screen, and shortlist remote operations candidates.'],
  ['Do you employ the candidates?', 'No. You hire and manage the candidate directly unless a future package says otherwise. That keeps the model lean and transparent.'],
  ['What roles do you focus on?', 'Ecommerce operations roles: customer support, order processing, vendor follow-up, product upload/catalog support, and founder ops/admin.'],
  ['Can you review applicants I already have?', 'Yes. Applicant Pile Cleanup is built for exactly that. Send the applicant pool and we rank the best interview options.'],
  ['What if none of my applicants are good?', 'We will tell you directly, explain why, and recommend whether to revise the role, change the channel, or upgrade to a shortlist search.'],
  ['Do you offer a guarantee?', 'Search packages can include clearly defined replacement support terms. Starter offers are scoped deliverables, not unlimited recruiting.'],
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
          <a href="#roles">Roles</a>
          <a href="#packages">Packages</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="button button-small" onClick={scrollToForm}>Get a hiring audit</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" id="main-content">
          <p className="kicker">Remote ops hiring for ecommerce operators</p>
          <h1>Hire Better Remote Ops Help Without Sorting Through 100 Bad Applicants</h1>
          <p className="hero-subhead">
            VA Headhunter helps ecommerce owners define the role, screen the applicant pile, and shortlist reliable remote candidates for customer support, order processing, product uploads, and founder admin.
          </p>
          <div className="hero-actions">
            <button className="button" onClick={scrollToForm}>Get a hiring audit <ArrowRight weight="bold" /></button>
            <button className="button button-secondary" onClick={scrollToPackages}>View packages</button>
          </div>
          <div className="hero-offer-note" aria-label="Recommended first offer">
            <strong>Already have applicants?</strong>
            <span>$299 Applicant Pile Cleanup ranks up to 50 candidates, flags red flags, and gives you the interview order.</span>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Candidate screening preview">
          <div className="panel-image" role="img" aria-label="A focused ecommerce operator reviewing candidate notes on a laptop" />
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

      <section className="section cleanup-spotlight reveal" aria-label="Applicant Pile Cleanup details">
        <div className="cleanup-intro">
          <p className="kicker">Recommended first move</p>
          <h2>Turn the applicant mess into a short, sane interview list.</h2>
          <p>If you already posted the role, this is the fastest way to stop guessing. Send the applicant pile and get the next hiring decision organized.</p>
          <button className="button" onClick={scrollToForm}>Clean up my applicants <ArrowRight weight="bold" /></button>
        </div>
        <div className="cleanup-panel">
          <div className="cleanup-price">
            <span>Applicant Pile Cleanup</span>
            <strong>$299</strong>
            <small>Review up to 50 applicants</small>
          </div>
          <div className="cleanup-list">
            {cleanupDeliverables.map(([title, copy]) => (
              <article key={title}>
                <CheckCircle weight="fill" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <div className="cleanup-warning"><WarningCircle weight="duotone" /> If none of the applicants are worth interviewing, you will get that answer directly instead of a forced shortlist.</div>
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

      <section className="section packages" id="packages">
        <div className="section-heading align-left reveal">
          <p className="kicker">Offer ladder</p>
          <h2>Start with the smallest fix that removes hiring noise.</h2>
          <p>Applicant Pile Cleanup is the no-brainer first build because it targets owners who already have applicants and already feel the pain.</p>
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

      <section className="section process" id="process">
        <div className="section-heading align-left reveal">
          <p className="kicker">How it works</p>
          <h2>A cleaner way to decide who deserves an interview.</h2>
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

      <section className="section comparison reveal">
        <div className="comparison-copy">
          <p className="kicker">Why it feels different</p>
          <h2>Not a job board. Not a cheap VA marketplace.</h2>
          <p>VA Headhunter combines role clarity, structured screening, active sourcing when needed, referral-driven discovery, and practical operator judgment.</p>
        </div>
        <div className="comparison-table" role="table" aria-label="Hiring options comparison">
          <div className="row header" role="row"><span></span><strong>DIY post</strong><strong>VA marketplace</strong><strong>VA Headhunter</strong></div>
          {[
            ['Role clarity', 'Often vague', 'Template-driven', 'Success profile before screening'],
            ['Applicant screening', 'Manual', 'Resume filters', 'Role-specific criteria and red flags'],
            ['Candidate notes', 'Scattered', 'Limited', 'Shortlist packet with recommendations'],
            ['Ecommerce ops focus', 'Owner-dependent', 'Broad VA pool', 'Customer, orders, catalog, founder ops'],
            ['Interview support', 'Owner figures it out', 'Generic', 'Questions tied to risks and must-haves'],
          ].map(([label, diy, market, vh]) => (
            <div className="row" role="row" key={label}><strong>{label}</strong><span>{diy}</span><span>{market}</span><span>{vh}</span></div>
          ))}
        </div>
      </section>

      <section className="section packet reveal">
        <div className="packet-copy">
          <p className="kicker">Candidate packet</p>
          <h2>Know who is actually worth interviewing.</h2>
          <p>Instead of dumping resumes in your lap, we organize the evidence so you can make a faster, calmer hiring decision.</p>
          <button className="button" onClick={scrollToForm}>Get a hiring audit <ArrowRight weight="bold" /></button>
        </div>
        <div className="packet-card">
          <div className="packet-header"><ClipboardText weight="duotone" /> Sample screening packet</div>
          <dl>
            <div><dt>Fit score</dt><dd>89 / 100</dd></div>
            <div><dt>Compensation expectation</dt><dd>$7 to $9/hr depending on hours</dd></div>
            <div><dt>Communication notes</dt><dd>Clear async writing, concise customer tone, asks good clarifying questions.</dd></div>
            <div><dt>Strengths</dt><dd>Order follow-up, Shopify admin, customer response accuracy.</dd></div>
            <div><dt>Risks</dt><dd>Needs validation on vendor escalation and edge-case judgment.</dd></div>
            <div><dt>Recommended question</dt><dd>Walk me through a delayed order with an upset customer.</dd></div>
          </dl>
        </div>
      </section>

      <section className="section reversal reveal">
        <ShieldCheck weight="duotone" />
        <div>
          <p className="kicker">Risk reversal</p>
          <h2>Start with a small hiring fix or hand us the whole search.</h2>
          <p>Not every owner needs a full recruiting search. Start with a hiring kit or applicant cleanup. If you want us to source and shortlist candidates, upgrade to a search package. Replacement support is available only with clear written terms, not vague unlimited promises.</p>
        </div>
      </section>

      <section className="section lead-form" id="hiring-audit">
        <div className="form-copy reveal">
          <p className="kicker">Start with clarity</p>
          <h2>Get a hiring audit.</h2>
          <p>Tell us where hiring is stuck. We will point you toward the smallest practical next step: kit, cleanup, shortlist search, or full support.</p>
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
              <label>Business type<input name="businessType" type="text" placeholder="Shopify store, agency, marketplace seller" /></label>
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
          <p className="kicker">Ready to stop guessing on remote hires?</p>
          <h2>Clean up the applicant pile, or let VA Headhunter build the shortlist.</h2>
        </div>
        <div className="hero-actions centered">
          <button className="button button-light" onClick={scrollToForm}>Get a hiring audit <ArrowRight weight="bold" /></button>
          <button className="button button-secondary dark" onClick={scrollToPackages}>View packages</button>
        </div>
      </section>

      <footer>
        <span>VA Headhunter</span>
        <span>Remote operations hiring for ecommerce operators.</span>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
