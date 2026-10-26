import { Icon } from './Icons.jsx';
import { clinicName } from './branding.js';

export default function Testimonials() {
  const reviews = [];
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="wrap">
        <div className="resource-heading">
          <div>
            <span className="eyebrow">Patient experiences</span>
            <h2>
              Every recovery has <em>a story.</em>
            </h2>
          </div>
          <p>
            Feedback about care, communication and the rehabilitation journey,
            shared with each patient’s permission.
          </p>
        </div>
        {reviews.length ? (
          <div className="review-grid">
            {reviews.map((r) => (
              <figure className="patient-review" key={r.id}>
                <div
                  className="review-rating"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {'★'.repeat(r.rating)}
                  <span aria-hidden="true">{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <blockquote>{r.message}</blockquote>
                <figcaption>
                  {r.publicName}
                  <span>Patient feedback · shared with permission</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="empty-state review-empty">
            <Icon name="chat" size={30} />
            <h3>
              Your experience can help someone take their first step.
            </h3>
            <p>
              No patient stories have been published here yet. Have you received care from us? Share your experience directly with the clinic.
            </p>
          </div>
        )}
        <a href={`https://wa.me/2349033764645?text=${encodeURIComponent(`Hello ${clinicName}, I would like to share feedback about my care.`)}`} target="_blank" rel="noopener noreferrer" className="button button-outline">
          Share your experience <Icon name="arrow" size={17} />
        </a>
      </div>
    </section>
  );
}
