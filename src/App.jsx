import { useCallback, useEffect, useRef, useState } from 'react';
import { BrandMark, Icon } from './Icons.jsx';
import Entrance from './Entrance.jsx';
import FAQs from './FAQs.jsx';
import ExerciseLibrary from './ExerciseLibrary.jsx';
import PatientPortal from './PatientPortal.jsx';
import Testimonials from './Testimonials.jsx';
import {
  clinicName,
  clinicTagline,
  consultationFees,
  defaultTheme,
  logoUrl,
  themeStorageKey,
} from './branding.js';

const whatsapp = 'https://wa.me/2349033764645';
const homeServiceName = 'Home-Based Physiotherapy';
const teleServiceName = 'Telerehabilitation';
const directChat = `${whatsapp}?text=${encodeURIComponent(`Hello ${clinicName}, I would like to book a physiotherapy appointment.\nPlease confirm availability.`)}`;
const themes = [
  {
    id: 'gold',
    name: 'Heimric Gold',
    note: 'Signature gold & charcoal',
    colour: '#dfbf66',
    themeColor: '#221e1f',
  },
];
const services = [
  {
    name: homeServiceName,
    image: 'home-based-physiotherapy.jpg',
    imageAlt:
      'Physiotherapist guiding an older patient through a gentle leg exercise on her sofa during a home visit',
    icon: 'home',
    featured: true,
    label: 'OUR PRIORITY · CARE AT HOME',
    description:
      'Personalised physiotherapy in the comfort of your home, with assessment, guided exercises, and a recovery plan built around your daily routine.',
  },
  {
    name: teleServiceName,
    image: 'telerehabilitation.jpg',
    imageAlt:
      'Patient following a physiotherapist’s gentle movement guidance over a video call from home',
    icon: 'video',
    label: 'PERSONALISED CARE, ONLINE',
    description:
      'Online physiotherapy consultations, guided movement, and follow-up support from the comfort of your home.',
  },
  {
    name: 'Stroke Rehabilitation',
    image: 'stroke-rehabilitation.jpg',
    imageAlt:
      'Physiotherapist guiding an older patient through supported walking between parallel bars after a stroke',
    icon: 'brain',
    label: 'REBUILD INDEPENDENCE',
    description:
      'Step-by-step support for movement, balance, and everyday function after a stroke.',
  },
  {
    name: 'Back Pain Treatment',
    image: 'back-pain-treatment.jpg',
    imageAlt:
      "Physiotherapist assessing a seated patient's lower back during a back pain consultation",
    icon: 'spine',
    label: 'FIND YOUR COMFORT',
    description:
      'A thoughtful assessment and targeted therapy built around your back and movement needs.',
  },
  {
    name: 'Sports Injury Rehab',
    image: 'sports-injury-rehab.jpg',
    imageAlt:
      'Physiotherapist coaching an athlete through a controlled resistance-band exercise for sports injury rehabilitation',
    icon: 'movement',
    label: 'RETURN WITH CONFIDENCE',
    description:
      'Progressive rehabilitation to support your return to the activities you enjoy.',
  },
  {
    name: 'Post-Surgical Rehab',
    image: 'post-surgical-rehab.jpg',
    imageAlt:
      'Physiotherapist supporting a patient wearing a knee brace during gentle rehabilitation after surgery',
    icon: 'medical',
    label: 'SUPPORT YOUR RECOVERY',
    description:
      'Guided movement and a personalised plan for the next stage of your recovery after surgery.',
  },
  {
    name: 'Neck & Shoulder Pain',
    image: 'neck-shoulder-pain.jpg',
    imageAlt:
      "Physiotherapist gently assessing a seated patient's shoulder movement during a neck and shoulder consultation",
    icon: 'spine',
    label: 'MOVE WITH GREATER EASE',
    description:
      'Targeted assessment, gentle exercises, and practical advice for neck and shoulder discomfort.',
  },
  {
    name: 'Arthritis & Joint Care',
    image: 'arthritis-joint-care.jpg',
    imageAlt:
      'Physiotherapist guiding an older patient through a gentle hand exercise with a soft therapy ball',
    icon: 'medical',
    label: 'KEEP EVERYDAY WITHIN REACH',
    description:
      'Personalised movement and strengthening to support joint comfort and everyday activities.',
  },
  {
    name: 'Paediatric Physiotherapy',
    image: 'paediatric-physiotherapy.jpg',
    imageAlt:
      'Physiotherapist helping a child practise balance and coordination on low colourful stepping pads',
    icon: 'heart',
    label: 'SMALL STEPS. GROWING CONFIDENCE.',
    description:
      'Play-based movement sessions to help children develop strength, coordination, and confidence.',
  },
  {
    name: 'Balance & Mobility Training',
    image: 'balance-mobility-training.jpg',
    imageAlt:
      'Physiotherapist supporting an older patient practising a standing balance exercise on a low foam pad',
    icon: 'movement',
    label: 'FEEL STEADIER ON YOUR FEET',
    description:
      'Guided balance and walking exercises to build stability and confidence in everyday movement.',
  },
  {
    name: 'Neuro-Oncology Rehabilitation',
    image: 'neuro-oncology-rehabilitation.jpg',
    imageAlt:
      'Physiotherapist guiding a seated patient through a gentle reaching and coordination exercise during neuro-oncology rehabilitation',
    icon: 'brain',
    label: 'SUPPORT FOR EVERYDAY MOVEMENT',
    description:
      'Personalised support for movement, balance, and strength during and after treatment for brain or spinal cord tumours.',
  },
];

function Brand({ footer = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      className={`brand ${footer ? 'brand-footer' : ''}`}
      href="#home"
      aria-label={`${clinicName} home`}
    >
      {failed ? (
        <span className="brand-wordmark">
          Heimric <span>Reverie</span>
          <small>Physioyard</small>
        </span>
      ) : (
        <span className="brand-logo-frame">
          <img
            className="brand-logo-image"
            src={logoUrl}
            alt={clinicName}
            width="1536"
            height="1024"
            loading={footer ? 'lazy' : 'eager'}
            decoding="async"
            fetchPriority={footer ? 'auto' : 'high'}
            onError={() => setFailed(true)}
          />
          <span className="brand-name-extension">Physioyard</span>
        </span>
      )}
    </a>
  );
}

function ThemePicker() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || defaultTheme,
  );
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const outside = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  function choose(value) {
    document.documentElement.dataset.theme = value;
    document.querySelector('meta[name="theme-color"]').content = themes.find(
      (option) => option.id === value,
    ).themeColor;
    setTheme(value);
    try {
      localStorage.setItem(themeStorageKey, value);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }
  return (
    <div className="theme-picker" ref={container}>
      <button
        ref={toggle}
        className="theme-toggle"
        type="button"
        aria-label="Choose colour theme"
        aria-expanded={open}
        aria-controls="theme-options"
        onClick={() => setOpen(!open)}
      >
        <Icon name="palette" />
        <span>Theme</span>
        <Icon name="down" size={13} />
      </button>
      {open && (
        <fieldset id="theme-options" className="theme-options">
          <legend className="sr-only">Choose a colour theme</legend>
          <p className="theme-heading">A little change of scenery</p>
          {themes.map((option) => (
            <label className="theme-option" key={option.id}>
              <input
                type="radio"
                name="theme"
                value={option.id}
                checked={theme === option.id}
                onChange={() => choose(option.id)}
              />
              <span
                className="theme-swatch"
                style={{ background: option.colour }}
              />
              <span>
                <strong>{option.name}</strong>
                <small>{option.note}</small>
              </span>
              {theme === option.id && <Icon name="check" size={17} />}
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    const wideScreen = window.matchMedia('(min-width: 1024px)');
    const closeOnResize = () => {
      if (wideScreen.matches) setMenuOpen(false);
    };
    document.addEventListener('keydown', escape);
    wideScreen.addEventListener('change', closeOnResize);
    return () => {
      document.removeEventListener('keydown', escape);
      wideScreen.removeEventListener('change', closeOnResize);
    };
  }, [menuOpen]);
  const links = [
    ['Home', 'home'],
    ['About us', 'about'],
    ['Our services', 'services'],
    ['Our process', 'process'],
    ['Exercises', 'exercise-library'],
    ['FAQs', 'faq'],
    ['Patient portal', 'patient-portal'],
  ];
  return (
    <>
      <div className="topbar">
        <div className="wrap flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <Icon name="pin" size={13} />
            Ibadan & Lagos · Online care
          </span>
          <a href="tel:+2349033764645" className="flex items-center gap-2">
            <Icon name="phone" size={13} />
            <span>+234 903 376 4645</span>
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap nav-inner">
          <Brand />
          <nav
            id="main-navigation"
            className={`nav-links ${menuOpen ? 'nav-open' : ''}`}
            aria-label="Main navigation"
          >
            {links.map(([text, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {text}
              </a>
            ))}
            <a
              href="#contact"
              className="mobile-contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact us
            </a>
            <a
              href="#booking"
              className="button button-primary mobile-book"
              onClick={() => setMenuOpen(false)}
            >
              Book a visit <Icon name="arrow" size={16} />
            </a>
          </nav>
          <div className="nav-actions">
            <a href="#patient-portal" className="patient-nav-link" aria-label="Patient portal" title="Patient portal" onClick={() => setMenuOpen(false)}><Icon name="medical" size={18} /><span>Patient portal</span></a>
            <ThemePicker />
            <a href="#booking" className="button button-primary desktop-book">
              Book a visit <Icon name="arrow" size={16} />
            </a>
            <button
              ref={toggle}
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={23} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero({ onSelect }) {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" />HOME VISITS IN IBADAN & LAGOS
          </span>
          <h1>
            Move better.
            <br />
            Feel stronger.
            <br />
            <span className="hero-highlight">Live fully.</span>
          </h1>
          <p className="hero-description">
            Personalised physiotherapy at home in Ibadan and Lagos, with online
            consultations through telerehabilitation. Care built around{' '}
            <strong>you and your everyday.</strong>
          </p>
          <div className="flex flex-wrap items-center gap-3 hero-buttons">
            <a
              href="#booking"
              className="button button-primary"
              onClick={() => onSelect(homeServiceName)}
            >
              Book a home visit <Icon name="arrow" size={18} />
            </a>
            <a
              href="#booking"
              className="button button-outline"
              onClick={() => onSelect(teleServiceName)}
            >
              <Icon name="video" size={18} />
              Book online care
            </a>
          </div>
          <div className="hero-assurance">
            <span className="assurance-icon">
              <Icon name="shield" size={19} />
            </span>
            <span>
              Individualised care.
              <br />
              <strong>Every step of the way.</strong>
            </span>
            <span className="assurance-divider" />
            <span className="assurance-location">
              <Icon name="pin" size={17} />
              Ibadan & Lagos
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-photo"
            src={`${import.meta.env.BASE_URL}images/physiotherapy-rehabilitation.jpg`}
            alt="Physiotherapist supporting a patient's knee during muscle and joint rehabilitation"
            width="1122"
            height="1402"
            fetchPriority="high"
            decoding="async"
          />
          <div className="care-note">
            <span className="care-note-icon">
              <Icon name="heart" size={24} />
            </span>
            <div>
              <strong>Your pace. Your progress.</strong>
              <span>A recovery plan, made for you.</span>
            </div>
            <span className="care-note-plus" aria-hidden="true">
              +
            </span>
          </div>
          <div className="visual-caption">
            <span className="status-dot" />
            MOVEMENT · RECOVERY · WELLBEING
          </div>
        </div>
      </div>
      <div className="hero-bottom wrap">
        <span>Care you can feel. Progress you can build on.</span>
        <a href="#services">
          Explore our approach <Icon name="down" size={16} />
        </a>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: 'shield',
      name: 'Grounded in evidence',
      text: 'Thoughtful assessment. Informed treatment.',
    },
    {
      icon: 'movement',
      name: 'Designed around you',
      text: 'Your needs, your goals, your recovery plan.',
    },
    {
      icon: 'heart',
      name: 'Human, first and always',
      text: 'Time to listen. Space to ask questions.',
    },
  ];
  return (
    <section className="benefits" aria-label="Our approach to care">
      <div className="wrap grid gap-7 md:grid-cols-3">
        {benefits.map((item) => (
          <div className="benefit flex items-start gap-4" key={item.name}>
            <span className="benefit-icon">
              <Icon name={item.icon} size={25} />
            </span>
            <div>
              <h2>{item.name}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services({ onSelect }) {
  return (
    <section className="section services-section" id="services">
      <div className="wrap">
        <div className="section-heading flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">WHAT WE CAN HELP WITH</span>
            <h2>
              Small steps.
              <br />
              <span className="muted-heading">Meaningful progress.</span>
            </h2>
          </div>
          <p>
            Our priority is care that comes to you. Explore home-based
            physiotherapy and support for every stage of your recovery.
          </p>
        </div>
        <div className="service-grid grid sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              className={`service-card${service.featured ? ' service-card-featured' : ''}`}
              key={service.name}
            >
              <div className="service-media">
                <img
                  className="service-photo"
                  src={`${import.meta.env.BASE_URL}images/${service.image}`}
                  alt={service.imageAlt}
                  width="960"
                  height="720"
                  loading="lazy"
                  decoding="async"
                />
                <span className="service-icon">
                  <Icon name={service.icon} size={29} />
                </span>
                <span className="service-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="service-content">
                <span className="service-label">{service.label}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {service.featured && (
                  <p className="service-home-note">
                    Home visits in Ibadan and Lagos. Request a date and we’ll confirm
                    availability.
                  </p>
                )}
                <a
                  href="#booking"
                  className="service-link"
                  onClick={() => onSelect(service.name)}
                  aria-label={`Request ${service.name}`}
                >
                  {service.featured
                    ? 'Arrange a home visit'
                    : 'Let’s take the first step'}{' '}
                  <span>
                    <Icon name="arrow" size={18} />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="services-help">
          <Icon name="chat" size={18} />
          <p>
            Not sure where to start?{' '}
            <a href={directChat} target="_blank" rel="noopener noreferrer">
              Let’s work it out together <Icon name="diagonal" size={14} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="wrap about-grid grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="about-art">
          <span className="about-corner">THE PERSON BEHIND THE CARE</span>
          <div className="about-rings">
            <span />
            <span />
            <span />
          </div>
          <div className="about-seal">
            <BrandMark />
            <span>{clinicName.toUpperCase()}</span>
            <strong>
              Care with
              <br />
              purpose.
            </strong>
            <span>PHYSIOTHERAPY & WELLNESS</span>
          </div>
          <div className="about-art-footer">
            <span>
              Rooted in care.
              <br />
              <strong>Focused on you.</strong>
            </span>
            <Icon name="heart" size={32} />
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">MEET YOUR PHYSIOTHERAPIST</span>
          <h2>
            A listening ear.
            <br />A helping hand.
          </h2>
          <p className="about-intro">
            Your recovery should feel personal.
            <br />
            Because it is.
          </p>
          <h3>Ibitoye Henry Babatunde</h3>
          <span className="practitioner-title">
            Physiotherapist · {clinicName}
          </span>
          <p>
            With experience in musculoskeletal and neurological rehabilitation,
            Henry brings a patient-centred approach to helping you move forward.
          </p>
          <p>
            At {clinicName}, we take time to understand your everyday
            challenges and build a treatment plan around what matters to you.
          </p>
          <div className="about-tags flex flex-wrap gap-2">
            <span>Musculoskeletal rehabilitation</span>
            <span>Neurological rehabilitation</span>
          </div>
          <a href="#booking" className="text-link">
            Meet us. Start your journey. <Icon name="arrow" size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    [
      'Let’s connect',
      'Pick a preferred date and send your appointment request.',
    ],
    [
      'We listen & assess',
      'Talk through your needs, movement, and goals with your physiotherapist.',
    ],
    ['Make a plan', 'Work together on a rehabilitation plan tailored to you.'],
    ['Move forward', 'Build on your progress, with support along the way.'],
  ];
  return (
    <section className="section process-section" id="process">
      <div className="wrap">
        <div className="section-heading centered">
          <span className="eyebrow">NO GUESSWORK. JUST THE NEXT STEP.</span>
          <h2>A clearer path to feeling better.</h2>
          <p>From our first hello to your next milestone, we’re with you.</p>
        </div>
        <ol className="process-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([name, description], index) => (
            <li key={name}>
              <div className="step-top">
                <span className="step-number">0{index + 1}</span>
                <span className="step-line" />
              </div>
              <h3>{name}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function todayLocal() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function Booking({ service, onServiceChange }) {
  const [minimumDate, setMinimumDate] = useState(todayLocal);
  const [preparedUrl, setPreparedUrl] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const isHomeVisit = service === homeServiceName;
  const isRemote = service === teleServiceName;
  useEffect(() => {
    setPreparedUrl('');
  }, [service]);
  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.fullName;
    const phone = form.elements.phone;
    const date = form.elements.date;
    const minimum = todayLocal();
    setMinimumDate(minimum);
    name.setCustomValidity(
      name.value.trim() ? '' : 'Please enter your full name.',
    );
    const phoneDigits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(
      /^\+?[\d\s().-]+$/.test(phone.value.trim()) &&
        phoneDigits.length >= 7 &&
        phoneDigits.length <= 15
        ? ''
        : 'Please enter a valid phone number.',
    );
    date.setCustomValidity(
      date.value < minimum ? 'Please choose today or a future date.' : '',
    );
    for (const field of ['location', 'area', 'timeZone']) {
      const input = form.elements[field];
      if (input) {
        input.setCustomValidity(
          input.value.trim() ? '' : 'Please complete this field.',
        );
      }
    }
    if (!form.reportValidity()) return;
    const lines = [
      `Hello ${clinicName}, I would like to request an appointment.`,
      `Name: ${name.value.trim()}`,
      `Phone: ${phone.value.trim()}`,
      `Service: ${service}`,
      `Preferred date: ${date.value}`,
      `Location: ${form.elements.location.value.trim()}`,
    ];
    for (const [field, label] of [
      ['area', 'Area / neighbourhood'],
      ['mobility', 'Mobility / access needs'],
      ['concern', 'Main concern'],
      ['preferredTime', 'Preferred time'],
      ['timeZone', 'Time zone'],
    ]) {
      const value = form.elements[field]?.value.trim();
      if (value) lines.push(`${label}: ${value}`);
    }
    lines.push('Please confirm availability.');
    const message = lines.join('\n');
    const url = `${whatsapp}?text=${encodeURIComponent(message)}`;
    setPreparedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  function clearFeedback(event) {
    event.target.setCustomValidity?.('');
    setPreparedUrl('');
  }
  return (
    <section className="section booking-section" id="booking">
      <div className="wrap booking-grid grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="booking-copy">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>
            Let’s get you
            <br />
            moving again.
          </h2>
          <p>
            Request a home visit in Ibadan or Lagos, or choose telerehabilitation
            for an online consultation. Share your preferences and we’ll confirm
            availability and the next steps.
          </p>
          <div className="booking-detail">
            <span>
              <Icon name="calendar" size={23} />
            </span>
            <div>
              <strong>A time that works for you</strong>
              <p>Request a date. We’ll confirm availability.</p>
            </div>
          </div>
          <div className="booking-detail">
            <span>
              <Icon name="chat" size={23} />
            </span>
            <div>
              <strong>A real conversation</strong>
              <p>Your request goes straight to us on WhatsApp.</p>
            </div>
          </div>
          <a
            href={directChat}
            target="_blank"
            rel="noopener noreferrer"
            className="booking-direct"
          >
            Prefer to chat first? Say hello <Icon name="diagonal" size={16} />
          </a>
          <a href="#patient-portal" className="booking-private">Prepare your health report in your patient space <Icon name="arrow" size={16} /></a>
          <div className="booking-watermark" aria-hidden="true">
            HR.
          </div>
        </div>
        <form
          className="booking-form"
          onSubmit={submit}
          onInput={clearFeedback}
        >
          <div className="form-title">
            <div>
              <span className="eyebrow">LET’S MAKE A START</span>
              <h3>Request an appointment</h3>
            </div>
            <span className="form-title-icon">
              <Icon name="calendar" size={25} />
            </span>
          </div>
          <div className="form-fields grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <div className="field sm:col-span-2">
              <label htmlFor="full-name">
                Full name <span>*</span>
              </label>
              <input
                id="full-name"
                name="fullName"
                autoComplete="name"
                placeholder="First name, middle name and last name"
                aria-describedby="full-name-hint"
                maxLength={100}
                required
              />
              <p className="field-hint" id="full-name-hint">
                Use your first name, middle name (if any) and last name.
              </p>
            </div>
            <div className="field sm:col-span-2">
              <label htmlFor="phone">
                Phone number <span>*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. +234 903 376 4645"
                maxLength={25}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="service">How can we help?</label>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(event) => {
                  onServiceChange(event.target.value);
                  setPreparedUrl('');
                }}
              >
                {services.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
                <option>General consultation</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="date">
                Preferred date <span>*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                min={minimumDate}
                onFocus={() => setMinimumDate(todayLocal())}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="appointment-location">
                {isRemote ? 'City and country' : 'Appointment city'} <span>*</span>
              </label>
              {isRemote ? (
                <input
                  id="appointment-location"
                  name="location"
                  autoComplete="off"
                  placeholder="e.g. London, United Kingdom"
                  maxLength={120}
                  required
                />
              ) : (
                <select id="appointment-location" name="location" required defaultValue="">
                  <option value="" disabled>Choose a city</option>
                  <option>Ibadan</option>
                  <option>Lagos</option>
                </select>
              )}
            </div>
            <div className="field">
              <label htmlFor="consultation-currency">Consultation currency</label>
              <select
                id="consultation-currency"
                name="currency"
                value={currency}
                onChange={(event) => {
                  setCurrency(event.target.value);
                  setPreparedUrl('');
                }}
              >
                <option value="NGN">NGN — Nigerian naira</option>
                <option value="USD">USD — US dollar</option>
              </select>
            </div>
            {isHomeVisit && (
              <fieldset className="home-visit-fields grid gap-x-4 gap-y-5 sm:col-span-2 sm:grid-cols-2">
                <legend>Plan your home visit</legend>
                <div className="field">
                  <label htmlFor="home-area">Area / neighbourhood <span>*</span></label>
                  <input
                    id="home-area"
                    name="area"
                    placeholder="e.g. Bodija or Lekki"
                    maxLength={120}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="home-mobility">Mobility / access needs</label>
                  <select id="home-mobility" name="mobility" defaultValue="">
                    <option value="">Select if helpful</option>
                    <option>Walk independently</option>
                    <option>Need help with walking or transfers</option>
                    <option>Use a wheelchair or walking aid</option>
                    <option>Prefer to discuss with the physiotherapist</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="home-time">Preferred time (optional)</label>
                  <input id="home-time" name="preferredTime" type="time" />
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="home-concern">Main concern (optional)</label>
                  <textarea
                    id="home-concern"
                    name="concern"
                    rows={3}
                    maxLength={400}
                    placeholder="Briefly describe what you would like help with."
                    aria-describedby="home-request-hint"
                  />
                  <p className="field-hint" id="home-request-hint">
                    These details will be included in your WhatsApp draft for you
                    to review before sending. Keep detailed medical history for
                    your consultation.
                  </p>
                </div>
              </fieldset>
            )}
            {isRemote && (
              <>
                <div className="field">
                  <label htmlFor="online-time">Preferred time <span>*</span></label>
                  <input id="online-time" name="preferredTime" type="time" required />
                </div>
                <div className="field">
                  <label htmlFor="online-time-zone">Your time zone <span>*</span></label>
                  <input
                    id="online-time-zone"
                    name="timeZone"
                    defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
                    placeholder="e.g. Europe/London"
                    maxLength={80}
                    required
                  />
                  <p className="field-hint">Your preferred date and time are in this time zone.</p>
                </div>
              </>
            )}
          </div>
          <p className="consultation-fee">
            <span>Consultation fee</span>
            <strong>
              <span>{consultationFees[currency]}</span>
              <small>or {consultationFees[currency === 'NGN' ? 'USD' : 'NGN']}</small>
            </strong>
          </p>
          <button type="submit" className="button button-primary w-full">
            Continue to WhatsApp <Icon name="arrow" size={18} />
          </button>
          <p className="form-hint">
            <Icon name="shield" size={15} />
            <span>
              This opens WhatsApp for you to send your request. Your appointment
              is confirmed when we reply. Please keep medical details for your
              consultation.
            </span>
          </p>
          {preparedUrl && (
            <p role="status" className="form-feedback">
              Your message is ready.{' '}
              <a href={preparedUrl} target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>{' '}
              if a new tab didn’t open.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Contact() {
  const [mapCity, setMapCity] = useState('Ibadan');
  return (
    <section className="section contact-section" id="contact">
      <div className="wrap">
        <div className="section-heading flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">WE’RE CLOSER THAN YOU THINK</span>
            <h2>
              Good care starts
              <br />
              with a hello.
            </h2>
          </div>
          <p>
            Have a question before your first visit? We’re happy to help you
            find your next step.
          </p>
        </div>
        <div className="contact-grid grid gap-8 lg:grid-cols-2">
          <div className="contact-details">
            <a href="tel:+2349033764645" className="contact-row">
              <span className="contact-icon">
                <Icon name="phone" size={22} />
              </span>
              <span>
                <small>GIVE US A CALL</small>
                <strong>+234 903 376 4645</strong>
              </span>
              <Icon name="diagonal" size={18} />
            </a>
            <a href="mailto:HeimricReverie@gmail.com" className="contact-row">
              <span className="contact-icon">
                <Icon name="mail" size={22} />
              </span>
              <span>
                <small>DROP US A NOTE</small>
                <strong>HeimricReverie@gmail.com</strong>
              </span>
              <Icon name="diagonal" size={18} />
            </a>
            <div className="contact-row">
              <span className="contact-icon">
                <Icon name="pin" size={22} />
              </span>
              <span>
                <small>FIND US IN</small>
                <strong>Ibadan & Lagos</strong>
                <p>
                  <a
                    href={directChat}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with us on WhatsApp
                  </a>{' '}
                  to confirm appointment availability.
                </p>
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-icon">
                <Icon name="video" size={22} />
              </span>
              <span>
                <small>ONLINE CARE</small>
                <strong>Telerehabilitation</strong>
                <p>
                  Online consultations from your location. Contact us to confirm
                  suitability and appointment availability.
                </p>
              </span>
            </div>
          </div>
          <div className="map-panel">
            <div className="map-city-picker" role="group" aria-label="Choose map city">
              {['Ibadan', 'Lagos'].map((city) => (
                <button
                  key={city}
                  type="button"
                  aria-label={`Show ${city} map`}
                  aria-pressed={mapCity === city}
                  onClick={() => setMapCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
            <iframe
              title={`Map of ${mapCity}, Nigeria — city area, not the exact clinic address`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${mapCity}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
            />
            <span className="map-note">
              <Icon name="pin" size={16} />
              {mapCity} · Home visits by appointment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <Brand footer />
            <p>{clinicTagline}</p>
          </div>
          <a href="#booking" className="footer-cta">
            Here’s to your next step.{' '}
            <span>
              <Icon name="diagonal" size={21} />
            </span>
          </a>
        </div>
        <div className="footer-bottom flex flex-col justify-between gap-4 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {clinicName}.
          </p>
          <span>Made for movement. Built around you.</span>
          <a href="#home">
            Back to top <Icon name="arrow" size={14} className="-rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const sectionNames = {
  home: 'Home',
  about: 'About us',
  services: 'Our services',
  process: 'Our process',
  faq: 'FAQs',
  'exercise-library': 'Exercise library',
  'patient-portal': 'Patient portal',
  testimonials: 'Patient experiences',
  booking: 'Book a visit',
  contact: 'Contact us',
};

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [service, setService] = useState(homeServiceName);
  const sectionAnimation = useRef(null);

  const startSection = useCallback((id, updateHistory = true) => {
    const target = document.getElementById(id);
    if (!target || !sectionNames[id]) return;
    if (updateHistory && window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
    sectionAnimation.current?.cancel();
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sectionAnimation.current = target.animate(
        [
          { opacity: 0.7, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 260, easing: 'ease-out' },
      );
    }
  }, []);

  const revealInitialSection = useCallback(() => {
    const id = window.location.hash.slice(1);
    if (sectionNames[id]) {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    }
  }, []);

  const finishEntrance = useCallback(() => {
    setInitialLoading(false);
  }, []);

  function navigateSection(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target.closest?.('a[href^="#"]');
    if (!link || link.target === '_blank' || link.hasAttribute('download'))
      return;
    const id = link.getAttribute('href').slice(1);
    if (!sectionNames[id] || !document.getElementById(id)) return;
    event.preventDefault();
    startSection(id);
  }

  useEffect(() => {
    const onHashChange = () =>
      startSection(window.location.hash.slice(1) || 'home', false);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [startSection]);

  useEffect(() => () => sectionAnimation.current?.cancel(), []);

  return (
    <>
      {initialLoading && (
        <Entrance
          onCovered={revealInitialSection}
          onComplete={finishEntrance}
        />
      )}
      <div
        className={`site-shell ${initialLoading ? '' : 'is-ready'}`}
        inert={initialLoading ? true : undefined}
        onClick={navigateSection}
      >
        <div className="page-backdrop" aria-hidden="true">
          <div className="page-pattern" />
        </div>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero onSelect={setService} />
          <Benefits />
          <Services onSelect={setService} />
          <About />
          <Process />
          <FAQs chatUrl={directChat} />
          <ExerciseLibrary />
          <Testimonials />
          <PatientPortal />
          <Booking service={service} onServiceChange={setService} />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
