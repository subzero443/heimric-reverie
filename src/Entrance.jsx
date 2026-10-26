import { useEffect, useRef, useState } from 'react';
import { BrandMark } from './Icons.jsx';
import { clinicName, logoUrl } from './branding.js';

const patternUrl = `${import.meta.env.BASE_URL}images/entrance-physiotherapy-pattern.jpg`;

export default function Entrance({ onCovered, onComplete }) {
  const image = useRef(null);
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const [ready, setReady] = useState(reducedMotion);
  const [failed, setFailed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const hold = reducedMotion ? 50 : 1650;
  const fade = reducedMotion ? 50 : 450;

  useEffect(() => {
    if (image.current?.complete) {
      if (!image.current.naturalWidth) setFailed(true);
      setReady(true);
    }
    const timeout = window.setTimeout(() => {
      if (!image.current?.naturalWidth) setFailed(true);
      setReady(true);
    }, 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const exit = window.setTimeout(() => {
      onCovered();
      setLeaving(true);
    }, hold);
    const finish = window.setTimeout(onComplete, hold + fade);
    return () => {
      window.clearTimeout(exit);
      window.clearTimeout(finish);
    };
  }, [ready, hold, fade, onCovered, onComplete]);

  return (
    <div
      className={`entrance ${leaving ? 'entrance-leaving' : ''}`}
      role="status"
      aria-label={`Loading ${clinicName}`}
      data-ready={ready}
      style={{ '--entrance-hold': `${hold}ms`, '--entrance-fade': `${fade}ms` }}
    >
      <div
        className="entrance-pattern"
        aria-hidden="true"
        style={{ backgroundImage: `url("${patternUrl}")` }}
      />
      <div className="entrance-content">
        <div className="entrance-artwork">
          {failed ? (
            <div className="entrance-fallback" aria-hidden="true">
              <BrandMark />
              <strong>HEIMRIC</strong>
              <span>REVERIE</span>
              <span>PHYSIOYARD</span>
            </div>
          ) : (
            <img
              ref={image}
              className="entrance-logo"
              src={logoUrl}
              alt={`${clinicName} gold logo`}
              width="1536"
              height="1024"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setReady(true)}
              onError={() => {
                setFailed(true);
                setReady(true);
              }}
            />
          )}
        </div>
        <span className="entrance-name">{clinicName}</span>
        <p className="entrance-caption">Care that moves you forward</p>
        <div className="entrance-track" aria-hidden="true">
          <span />
        </div>
      </div>
      <span className="entrance-foot">IBADAN · LAGOS · ONLINE CARE</span>
    </div>
  );
}
