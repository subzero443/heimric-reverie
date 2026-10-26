import { exercises } from '../shared/exercises.mjs';

export const patientStorageKey = 'heimric-patient-space-v1';
export const localDate = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const displayDate = (value) => new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
export const timeLabel = (seconds) => {
  const total = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

const allIds = exercises.map((exercise) => exercise.id);
export const serviceGuides = {
  'Home-Based Physiotherapy': { prompt: 'Tell us about movement at home, stairs, support and access needs.', ids: allIds, advice: 'Discuss your home environment, mobility aids and any help needed with your physiotherapist before practising.' },
  Telerehabilitation: { prompt: 'Describe your movement concern and what you would like help with online.', ids: allIds, advice: 'Arrange a safe space for your online assessment and agree suitable movements, support and exercise dose with your physiotherapist.' },
  'Stroke Rehabilitation': { prompt: 'Describe the affected side, daily activities and support you currently need.', ids: ['stroke-seated-arm', 'stroke-seated-reach'], advice: 'A physiotherapist must assess movement and balance after a stroke. Use trained assistance when advised; never pull on a weak arm.' },
  'Back Pain Treatment': { prompt: 'Where is the discomfort, when did it start, and which activities affect it?', ids: ['pelvic-tilt'], advice: 'Describe what changes your symptoms and ask which movements are appropriate. Keep any agreed movement comfortable.' },
  'Sports Injury Rehab': { prompt: 'Which activity and body area are affected? Describe the injury and your return-to-sport goal.', ids: ['ankle-pump', 'ankle-circle'], advice: 'These ankle guides apply only if suitable for your particular injury. Agree restrictions and return-to-sport progression after assessment.' },
  'Post-Surgical Rehab': { prompt: 'What surgery did you have, when was it, and what restrictions were you given?', ids: ['knee-heel-slide', 'knee-quad'], advice: 'The knee examples apply only to suitable knee rehabilitation. Your operation-specific instructions and surgeon’s restrictions take priority.' },
  'Neck & Shoulder Pain': { prompt: 'Describe the neck or shoulder symptoms and activities that make them better or worse.', ids: ['neck-rotation'], advice: 'The neck guide is an example to discuss with your physiotherapist; shoulder symptoms may need a different individual programme.' },
  'Arthritis & Joint Care': { prompt: 'Which joints are affected, and how do stiffness or discomfort affect your day?', ids: ['knee-heel-slide', 'knee-quad'], advice: 'The knee examples may not suit other joints. Ask for a plan matched to the affected joint, symptoms and current function.' },
  'Paediatric Physiotherapy': { prompt: 'A parent or guardian can describe the child’s age, movement concerns and goals.', ids: [], advice: 'These adult exercise examples are not a children’s programme. A paediatric physiotherapist should assess the child and agree age-appropriate activities with their parent or guardian.' },
  'Balance & Mobility Training': { prompt: 'Describe walking, balance, falls or near-falls, and any walking aids you use.', ids: ['balance-sit-stand', 'balance-heel-raise'], advice: 'Ask for a balance assessment and agree the support or supervision you need before practising standing exercises.' },
  'Neuro-Oncology Rehabilitation': { prompt: 'Describe movement or fatigue concerns, current treatment and your care team’s restrictions.', ids: [], advice: 'Your oncology and rehabilitation team should agree suitable activities, fatigue management and supervision. This library does not provide a tumour-specific exercise programme.' },
};

// Match existing learning guides to the selected service and the main complaint.
// Health-history text is excluded so an unrelated past condition cannot add a guide.
export function reportExercises(profile) {
  if (['Paediatric Physiotherapy', 'Neuro-Oncology Rehabilitation'].includes(profile.service)) return [];
  if (profile.age !== '' && Number(profile.age) >= 0 && Number(profile.age) < 18) return [];
  const complaint = profile.complaint.toLowerCase();
  const regions = [
    { pattern: /\b(?:neck|cervical)\b/, ids: ['neck-rotation'] },
    { pattern: /\b(?:back|lumbar|pelvic|pelvis)\b/, ids: ['pelvic-tilt'] },
    { pattern: /\b(?:knee|knees|thigh|quadriceps)\b/, ids: ['knee-heel-slide', 'knee-quad'] },
    { pattern: /\b(?:ankle|ankles)\b/, ids: ['ankle-pump', 'ankle-circle'] },
  ];
  const matched = regions.filter(({ pattern }) => pattern.test(complaint)).flatMap(({ ids }) => ids);
  let ids = [];
  if (profile.service === 'Stroke Rehabilitation') ids = serviceGuides[profile.service].ids;
  else if (profile.service === 'Balance & Mobility Training') ids = serviceGuides[profile.service].ids;
  else if (profile.service === 'Back Pain Treatment') ids = matched.length ? matched.filter((id) => id === 'pelvic-tilt') : /\b(?:shoulder|arm|hand|hip|foot|feet)\b/.test(complaint) ? [] : ['pelvic-tilt'];
  else if (profile.service === 'Neck & Shoulder Pain') ids = matched.length ? matched.filter((id) => id === 'neck-rotation') : /\b(?:shoulder|arm|hand)\b/.test(complaint) ? [] : ['neck-rotation'];
  else if (Object.hasOwn(serviceGuides, profile.service)) {
    ids = matched;
    if (!ids.length && /\bstroke\b/.test(complaint)) ids = ['stroke-seated-arm', 'stroke-seated-reach'];
    if (!ids.length && /\b(?:balance|unsteady|mobility)\b/.test(complaint)) ids = ['balance-sit-stand', 'balance-heel-raise'];
  }
  return [...new Set(ids)].slice(0, 3).map((id) => exercises.find((exercise) => exercise.id === id)).filter(Boolean);
}

export function emptyPatientRecord() {
  return { version: 1, profile: { fullName: '', phone: '', age: '', service: '', complaint: '', duration: '', pain: '3', impact: '', history: '', goal: '', clinicianPlan: '' }, reportUpdatedAt: '', checkIns: [], sessions: [] };
}

export function readPatientRecord() {
  try {
    const stored = localStorage.getItem(patientStorageKey);
    if (!stored) return { record: emptyPatientRecord(), remembered: false };
    const value = JSON.parse(stored);
    if (value.version !== 1 || !value.profile || !Array.isArray(value.checkIns) || !Array.isArray(value.sessions)) throw new Error('Invalid patient record');
    const base = emptyPatientRecord();
    for (const key of Object.keys(base.profile)) {
      if (typeof value.profile[key] === 'string') base.profile[key] = value.profile[key].slice(0, 4000);
    }
    if (!(base.profile.service in serviceGuides)) base.profile.service = '';
    const validDate = (date) => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(`${date}T12:00:00`).getTime()) && date <= localDate();
    base.reportUpdatedAt = typeof value.reportUpdatedAt === 'string' ? value.reportUpdatedAt : '';
    base.checkIns = value.checkIns.filter((entry) => validDate(entry.date) && [entry.pain, entry.function, entry.energy].every((score) => Number.isInteger(score) && score >= 0 && score <= 10) && typeof entry.notes === 'string').map((entry) => ({ date: entry.date, pain: entry.pain, function: entry.function, energy: entry.energy, notes: entry.notes.slice(0, 2000) }));
    base.sessions = value.sessions.filter((session) => validDate(session.date) && typeof session.id === 'string' && Number.isFinite(session.seconds) && session.seconds > 0 && session.seconds <= 86400 && Array.isArray(session.exerciseIds)).map((session) => ({ ...session, exerciseIds: session.exerciseIds.filter((id) => allIds.includes(id)) }));
    return { record: base, remembered: true };
  } catch {
    return { record: emptyPatientRecord(), remembered: false, notice: 'Saved data could not be opened. You can still use this space for this visit.' };
  }
}

export function progressSummary(record, today = localDate()) {
  const weekStart = new Date(`${today}T12:00:00`);
  weekStart.setDate(weekStart.getDate() - 6);
  const week = localDate(weekStart);
  const checkIns = [...record.checkIns].sort((a, b) => a.date.localeCompare(b.date));
  let streak = 0;
  const cursor = new Date(`${today}T12:00:00`);
  const dates = new Set(checkIns.map((entry) => entry.date));
  if (!dates.has(today)) cursor.setDate(cursor.getDate() - 1);
  while (dates.has(localDate(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return {
    weekSeconds: record.sessions.filter((session) => session.date >= week && session.date <= today).reduce((sum, session) => sum + session.seconds, 0),
    weekCheckIns: checkIns.filter((entry) => entry.date >= week && entry.date <= today).length,
    streak,
    painChange: checkIns.length >= 2 ? checkIns.at(-1).pain - checkIns[0].pain : null,
    checkIns,
  };
}
