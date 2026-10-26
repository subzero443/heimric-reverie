import { useState } from 'react';
import { exercises, exerciseCategories } from '../shared/exercises.mjs';
import { Icon } from './Icons.jsx';

export function ExerciseCard({ exercise }) {
  const [step, setStep] = useState(0);
  return (
    <article className="exercise-card">
      <img
        className="exercise-photo"
        src={`${import.meta.env.BASE_URL}images/${exercise.image}`}
        alt={exercise.imageAlt}
        width={960}
        height={720}
        loading="lazy"
        decoding="async"
      />
      <div className="exercise-card-body">
        <span className="service-label">{exercise.category}</span>
        <h3>{exercise.title}</h3>
        <p className="exercise-position">{exercise.position}</p>
        <details>
          <summary>
            Instructions & safety <Icon name="down" size={16} />
          </summary>
          <p className="exercise-demo-label">Illustrated demonstration · Step {step + 1} of {exercise.steps.length}</p>
          <div className="exercise-step-controls" role="group" aria-label={`${exercise.title} demonstration steps`}>
            {exercise.steps.map((instruction, index) => <button type="button" key={instruction} aria-pressed={step === index} aria-label={`Show step ${index + 1}`} onClick={() => setStep(index)}>{index + 1}</button>)}
          </div>
          <ol>
            {exercise.steps.map((instruction, index) => (
              <li key={instruction} className={step === index ? 'exercise-active-step' : ''}>{instruction}</li>
            ))}
          </ol>
          <p className="exercise-safety">
            <strong>Take care:</strong> {exercise.safety}
          </p>
          <p className="field-hint">
            Your physiotherapist sets the repetitions, hold times and frequency
            for you. Follow the exercise instructions and dose agreed with your
            physiotherapist.
          </p>
          <p className="exercise-source">
            Guidance: {exercise.provider}.{' '}
            <a href={exercise.source} target="_blank" rel="noreferrer">
              Provider’s guidance
            </a>
          </p>
        </details>
      </div>
    </article>
  );
}

export default function ExerciseLibrary() {
  const [category, setCategory] = useState('All exercises');
  const [query, setQuery] = useState('');
  const filtered = exercises.filter(
    (e) =>
      (category === 'All exercises' || e.category === category) &&
      `${e.title} ${e.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="section exercise-section" id="exercise-library">
      <div className="wrap">
        <div className="resource-heading">
          <div>
            <span className="eyebrow">Learn. Practise. Move forward.</span>
            <h2>
              Your movement <em>library.</em>
            </h2>
          </div>
          <p>
            Simple guides to support the work you do with your physiotherapist.
            Explore the photos, read the steps and follow the safety guidance.
          </p>
        </div>
        <aside className="exercise-safety-note">
          <Icon name="shield" size={24} />
          <div>
            <strong>Start with advice that is right for you.</strong>
            <p>
              These guides support an individual treatment plan. Ask your
              physiotherapist which exercises are suitable, especially after a
              stroke, injury or surgery. Use recommended support. Stop if you
              feel dizzy, unwell or symptoms worsen; seek urgent medical help
              for chest pain, severe breathlessness or sudden new weakness.
            </p>
          </div>
        </aside>
        <div className="library-tools">
          <div
            className="category-filters"
            role="group"
            aria-label="Exercise categories"
          >
            {['All exercises', ...exerciseCategories].map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="field library-search">
            <label htmlFor="exercise-search">Find an exercise</label>
            <input
              id="exercise-search"
              type="search"
              placeholder="Try knee, balance or ankle…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <p className="library-count" role="status">
          {filtered.length} {filtered.length === 1 ? 'exercise' : 'exercises'}{' '}
          to explore
        </p>
        <div className="exercise-grid">
          {filtered.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
        {!filtered.length && (
          <p className="empty-state">
            No exercises match. Try a different search or category.
          </p>
        )}
        <p className="exercise-photo-note">
          Photo-style images are AI-generated examples with fictional exercise
          models.
        </p>
        <p className="library-footer">
          Keep your learning and progress together.{' '}
          <a href="#patient-portal">
            Open your patient space for reports and daily tracking{' '}
            <Icon name="arrow" size={16} />
          </a>
        </p>
      </div>
    </section>
  );
}
