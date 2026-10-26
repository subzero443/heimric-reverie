import { Icon } from './Icons.jsx';

const questions = [
  {
    question: 'What does a physiotherapist do?',
    answer:
      'A physiotherapist helps you manage pain, improve movement, restore strength, and recover from injuries or medical conditions.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions depends on your condition, severity, and recovery progress. Your physiotherapist will recommend a personalized treatment plan.',
  },
  {
    question: 'Is physiotherapy painful?',
    answer:
      'Physiotherapy is generally safe and should not cause excessive pain. You may experience mild discomfort during certain exercises, but treatment is adjusted to your comfort level.',
  },
  {
    question: 'Do you offer home visits?',
    answer:
      'Yes! We offer home physiotherapy services for individuals who prefer treatment in the comfort of their homes or have difficulty travelling.',
  },
  {
    question: 'What should I bring for my first session?',
    answer:
      'Bring your medical reports, scan results, relevant prescriptions, comfortable clothing, and any assistive device you currently use.',
  },
  {
    question: 'Do I need a doctor’s referral?',
    answer:
      'A referral may not always be necessary. However, medical reports or a doctor’s recommendation can help us understand your condition better.',
  },
  {
    question: 'What conditions do you treat?',
    answer:
      'We provide physiotherapy for stroke, back pain, neck pain, arthritis, sports injuries, neurological conditions, mobility difficulties, and post-surgical rehabilitation.',
  },
  {
    question: 'How long does a physiotherapy session last?',
    answer:
      'A typical session lasts between 30 and 60 minutes, depending on your condition and treatment needs.',
  },
  {
    question: 'Can physiotherapy help me recover after a stroke?',
    answer:
      'Yes! Physiotherapy helps improve strength, balance, coordination, mobility, and independence following a stroke.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'Contact us through our phone number or WhatsApp to schedule your physiotherapy assessment and treatment session.',
  },
];

export default function FAQs({ chatUrl }) {
  return (
    <section className="section faq-section" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <span className="eyebrow">BEFORE YOUR FIRST VISIT</span>
          <h2>Frequently asked questions</h2>
          <p>A little clarity before the next step in your recovery.</p>
          <a
            href={chatUrl}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask us on WhatsApp <Icon name="diagonal" size={17} />
          </a>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }, index) => (
            <details className="faq-item" key={question}>
              <summary>
                <span className="faq-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{question}</span>
                <Icon name="down" size={18} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
