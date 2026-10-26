import { useEffect, useRef, useState } from 'react';
import { exercises } from '../shared/exercises.mjs';
import { ExerciseCard } from './ExerciseLibrary.jsx';
import { Icon } from './Icons.jsx';
import { displayDate, emptyPatientRecord, localDate, patientStorageKey, progressSummary, readPatientRecord, reportExercises, serviceGuides, timeLabel } from './patientSpace.js';

const tabs = [
  ['report', 'My health report', 'medical'],
  ['guides', 'Exercise guides', 'movement'],
  ['progress', 'Daily progress', 'calendar'],
];

function ProfileField({ name, label, profile, onChange, multiline = false, required = false, ...props }) {
  const Input = multiline ? 'textarea' : 'input';
  return <div className="field">
    <label htmlFor={`patient-${name}`}>{label}{required && <span> *</span>}</label>
    <Input id={`patient-${name}`} name={name} value={profile[name]} onChange={(event) => onChange(name, event.target.value)} required={required} maxLength={multiline ? 2000 : 120} {...props} />
  </div>;
}

function HealthReport({ record, update, download, busy, preparedReport, downloadNotice }) {
  const [message, setMessage] = useState('');
  const profile = record.profile;
  const guide = serviceGuides[profile.service];
  const selectedExercises = reportExercises(profile);
  const formRef = useRef(null);
  function change(name, value) {
    update((previous) => ({ ...previous, profile: { ...previous.profile, [name]: value } }));
    setMessage('');
  }
  function validate() {
    const form = formRef.current;
    const name = form.elements.fullName;
    const phone = form.elements.phone;
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter the patient’s full name.');
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(/^\+?[\d\s().-]+$/.test(phone.value.trim()) && digits.length >= 7 && digits.length <= 15 ? '' : 'Please enter a valid phone number.');
    for (const field of ['complaint', 'duration', 'impact', 'goal']) {
      const input = form.elements[field];
      input.setCustomValidity(input.value.trim() ? '' : 'Please complete this field.');
    }
    return form.reportValidity();
  }
  return <div className="patient-report-layout">
    <form ref={formRef} className="portal-form patient-report-form" onInput={(event) => event.target.setCustomValidity?.('')} onSubmit={(event) => {
      event.preventDefault();
      if (!validate()) return;
      update((previous) => ({ ...previous, reportUpdatedAt: new Date().toISOString() }));
      setMessage('Your report is ready. Review the summary and download your PDF.');
    }}>
      <div className="portal-panel-heading"><span className="patient-kicker">01 / TELL YOUR STORY</span><h3>Let’s understand your day.</h3><p>Describe your symptoms in your own words. Your report brings this information together for a conversation with your physiotherapist.</p></div>
      <div className="portal-field-grid">
        <ProfileField name="fullName" label="Patient full name" profile={profile} onChange={change} required autoComplete="name" placeholder="First name, middle name and last name" />
        <ProfileField name="phone" label="Patient phone number" profile={profile} onChange={change} required type="tel" autoComplete="tel" maxLength={30} placeholder="e.g. 08000000000" />
        <ProfileField name="age" label="Patient age (optional)" profile={profile} onChange={change} type="number" min="0" max="120" />
        <div className="field"><label htmlFor="patient-service">Service for your concern <span>*</span></label><select id="patient-service" value={profile.service} onChange={(event) => change('service', event.target.value)} required><option value="">Choose a service</option>{Object.keys(serviceGuides).map((name) => <option key={name}>{name}</option>)}</select></div>
      </div>
      <ProfileField name="complaint" label="Your main complaint" profile={profile} onChange={change} multiline required placeholder={guide?.prompt || 'Tell us what is troubling you and where you feel it.'} rows={4} />
      <div className="portal-field-grid">
        <ProfileField name="duration" label="When did it start?" profile={profile} onChange={change} required placeholder="e.g. Two weeks ago, after lifting" />
        <div className="field"><label htmlFor="patient-pain">Current pain level: {profile.pain}/10</label><input id="patient-pain" type="range" min="0" max="10" value={profile.pain} onChange={(event) => change('pain', event.target.value)} /><p className="field-hint">0 = no pain · 10 = worst pain</p></div>
      </div>
      <ProfileField name="impact" label="How does it affect daily life?" profile={profile} onChange={change} multiline required rows={3} placeholder="e.g. Walking, sleep, school, work or getting dressed" />
      <ProfileField name="history" label="Relevant health history and restrictions (optional)" profile={profile} onChange={change} multiline rows={3} placeholder="Conditions, surgery, medicines, falls or advice already given by your care team" />
      <ProfileField name="goal" label="What would you like to do more easily?" profile={profile} onChange={change} multiline required rows={2} placeholder="Your personal movement or daily activity goal" />
      <ProfileField name="clinicianPlan" label="Instructions from your physiotherapist (optional)" profile={profile} onChange={change} multiline rows={3} placeholder="Record exercises, repetitions, hold times, frequency and restrictions already agreed with your physiotherapist." />
      <p className="field-hint">For a child, a parent or guardian should complete these details and arrange individual advice.</p>
      <div className="patient-actions"><button className="button button-primary" type="submit">{record.reportUpdatedAt ? 'Update my report' : 'Prepare my report'}<Icon name="arrow" size={17} /></button></div>
      {message && <p className="portal-success" role="status">{message}</p>}
    </form>
    <aside className="patient-report-preview" aria-label="Health report preview">
      <div className="patient-preview-top"><Icon name="medical" size={25} /><span>YOUR PERSONAL REPORT</span></div>
      <h3>{profile.fullName.trim() || 'Your story, in one place.'}</h3>
      <p className="patient-report-type">Patient-entered health summary</p>
      <dl className="patient-summary-list"><div><dt>Phone</dt><dd>{profile.phone || 'Add your phone number'}</dd></div><div><dt>Service</dt><dd>{profile.service || 'Choose your service'}</dd></div><div><dt>Current pain</dt><dd>{profile.pain}/10</dd></div><div><dt>Check-ins</dt><dd>{record.checkIns.length} recorded</dd></div><div><dt>Exercise sessions</dt><dd>{record.sessions.length} recorded</dd></div></dl>
      {profile.complaint && <div className="patient-preview-text"><strong>Your main complaint</strong><p>{profile.complaint}</p></div>}
      {profile.goal && <div className="patient-preview-text"><strong>Your goal</strong><p>{profile.goal}</p></div>}
      {guide && <div className="patient-guidance"><strong>For your conversation</strong><p>{guide.advice}</p></div>}
      <ul className="patient-report-contents"><li><Icon name="check" size={16} /> Your details and health summary</li><li><Icon name="check" size={16} /> {selectedExercises.length ? `${selectedExercises.length} related exercise ${selectedExercises.length === 1 ? 'guide' : 'guides'}` : 'Individual exercise guidance from your physiotherapist'}</li><li><Icon name="check" size={16} /> Session log and daily progress</li></ul>
      <button type="button" className="button button-primary" disabled={busy || !record.reportUpdatedAt} onClick={() => { if (validate()) download(); }}><Icon name="download" size={18} />{busy ? 'Preparing PDF…' : 'Download my PDF report'}</button>
      {downloadNotice && <p className="field-hint" role="status">{downloadNotice}</p>}
      {preparedReport?.record === record && <div className="patient-actions"><a className="button button-outline" href={preparedReport.url} download={preparedReport.filename}>Save PDF</a><a className="button button-outline" href={preparedReport.url} target="_blank" rel="noopener noreferrer">Open PDF</a></div>}
      <p className="field-hint">{record.reportUpdatedAt ? 'The PDF uses your current details and progress. Share it yourself with your physiotherapist.' : 'Complete the required details and prepare your report first.'}</p>
      <p className="field-hint">This is your own account of symptoms, not a diagnosis or a clinician-approved prescription.</p>
    </aside>
  </div>;
}

function GuidePanel({ service }) {
  const [relatedOnly, setRelatedOnly] = useState(false);
  const guide = serviceGuides[service];
  const ids = guide?.ids || [];
  const list = relatedOnly ? exercises.filter((exercise) => ids.includes(exercise.id)) : exercises;
  return <div>
    <div className="portal-panel-heading"><span className="patient-kicker">02 / LEARN THE MOVEMENT</span><h3>A little guidance, at your pace.</h3><p>Ten illustrated demonstrations with steps, precautions and provider guidance. Ask your physiotherapist which exercises and dose fit your needs.</p></div>
    {guide && <div className="patient-guidance"><strong>{service}</strong><p>{guide.advice}</p></div>}
    <div className="category-filters patient-guide-filters" role="group" aria-label="Patient exercise guides"><button type="button" aria-pressed={!relatedOnly} onClick={() => setRelatedOnly(false)}>All 10 guides</button><button type="button" aria-pressed={relatedOnly} onClick={() => setRelatedOnly(true)}>Related to my service ({ids.length})</button></div>
    {relatedOnly && !ids.length && <p className="empty-state">{service ? 'This library has no programme specific to this service. Ask your physiotherapist for individual guidance; the full library remains available for learning.' : 'Choose a service in My health report to see related learning guides.'}</p>}
    <div className="exercise-grid patient-exercise-grid">{list.map((exercise) => <ExerciseCard exercise={exercise} key={exercise.id} />)}</div>
    <p className="exercise-photo-note">Photos show fictional AI-generated exercise models. A related guide is a learning example; it does not establish that an exercise is suitable for you.</p>
  </div>;
}

function SessionTimer({ onSave }) {
  const [selected, setSelected] = useState('');
  const [approved, setApproved] = useState(false);
  const [target, setTarget] = useState('');
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [message, setMessage] = useState('');
  const clock = useRef({ start: null, accumulated: 0, date: '', startedAt: '' });
  const limit = target ? Number(target) * 60 : Infinity;
  const active = elapsed > 0 || running || clock.current.start !== null || Boolean(clock.current.startedAt);
  function sample() {
    return Math.min(limit, clock.current.accumulated + (clock.current.start === null ? 0 : Math.max(0, Date.now() - clock.current.start)) / 1000);
  }
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const seconds = sample();
      setElapsed(seconds);
      if (seconds >= limit) {
        clock.current.accumulated = limit;
        clock.current.start = null;
        setRunning(false);
        setMessage('Your chosen time is complete. Save this session when you are ready.');
      }
    };
    tick();
    const interval = setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', tick); };
  }, [running, limit]);
  useEffect(() => {
    if (!active) return;
    const warn = (event) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [active]);
  function reset() {
    clock.current = { start: null, accumulated: 0, date: '', startedAt: '' };
    setElapsed(0); setRunning(false);
  }
  const exercise = exercises.find((item) => item.id === selected);
  return <div className="patient-timer-panel">
    <div className="patient-card-heading"><Icon name="clock" size={22} /><div><h4>Your exercise session</h4><p>Track active practice time. Pause whenever you rest.</p></div></div>
    <div className="portal-field-grid"><div className="field"><label htmlFor="session-exercise">Exercise to practise</label><select id="session-exercise" value={selected} disabled={active} onChange={(event) => { setSelected(event.target.value); setApproved(false); setMessage(''); }}><option value="">Choose an agreed exercise</option>{exercises.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div><div className="field"><label htmlFor="session-target">Agreed duration in minutes (optional)</label><input id="session-target" type="number" min="1" max="180" step="1" disabled={active} value={target} onChange={(event) => setTarget(event.target.value)} placeholder="Leave empty for stopwatch" /></div></div>
    {exercise && <p className="field-hint">{exercise.safety}</p>}
    <label className="check-label patient-plan-check"><input type="checkbox" checked={approved} disabled={active} onChange={(event) => setApproved(event.target.checked)} /><span>My physiotherapist has confirmed this exercise and the support, dose and restrictions I should follow.</span></label>
    <div className="patient-clock"><span>{target ? 'ACTIVE TIME / YOUR CHOSEN DURATION' : 'ACTIVE PRACTICE TIME'}</span><output aria-label="Exercise elapsed time">{timeLabel(elapsed)}</output>{target && <small>of {target}:00 · {timeLabel(Math.max(0, limit - elapsed))} remaining</small>}<p>{running ? 'Session in progress' : elapsed > 0 ? 'Session paused' : 'Ready when you are'}</p></div>
    <div className="patient-actions">
      <button type="button" className="button button-primary" disabled={!selected || !approved || (target !== '' && (!Number.isInteger(Number(target)) || Number(target) < 1 || Number(target) > 180)) || elapsed >= limit} onClick={() => {
        if (running) { clock.current.accumulated = sample(); clock.current.start = null; setElapsed(clock.current.accumulated); setRunning(false); }
        else { if (!clock.current.startedAt) { clock.current.startedAt = new Date().toISOString(); clock.current.date = localDate(); } clock.current.start = Date.now(); setRunning(true); }
        setMessage('');
      }}><Icon name={running ? 'pause' : 'play'} size={17} />{running ? 'Pause session' : active ? 'Resume session' : 'Start session'}</button>
      <button type="button" className="button button-outline" disabled={elapsed < 1} onClick={() => {
        const seconds = Math.floor(sample());
        if (seconds < 1) return;
        onSave({ id: crypto.randomUUID(), date: clock.current.date, startedAt: clock.current.startedAt, endedAt: new Date().toISOString(), seconds, exerciseIds: [selected] });
        reset(); setMessage('Exercise session saved to your progress.');
      }}>Finish & save session</button>
      <button type="button" className="patient-text-button" disabled={!active} onClick={() => { reset(); setMessage('Unsaved session discarded.'); }}>Discard session</button>
    </div>
    <p className="field-hint">The timer measures time, not repetitions or recovery. Save before reloading or leaving; unfinished sessions are not restored.</p>
    {message && <p className="portal-success" role="status">{message}</p>}
  </div>;
}

function DailyCheckIn({ record, update, today }) {
  const [date, setDate] = useState(today);
  const [message, setMessage] = useState('');
  const entry = record.checkIns.find((item) => item.date === date);
  return <form className="patient-checkin-panel portal-form" onInput={() => setMessage('')} onSubmit={(event) => {
    event.preventDefault();
    if (date > localDate()) return;
    const fields = new FormData(event.currentTarget);
    const saved = { date, pain: Number(fields.get('pain')), function: Number(fields.get('function')), energy: Number(fields.get('energy')), notes: String(fields.get('notes')).trim() };
    update((previous) => ({ ...previous, checkIns: [...previous.checkIns.filter((item) => item.date !== date), saved].sort((a, b) => a.date.localeCompare(b.date)) }));
    setMessage('Daily check-in saved.');
  }}>
    <div className="patient-card-heading"><Icon name="heart" size={22} /><div><h4>How are you feeling today?</h4><p>A small daily check-in helps you see changes over time.</p></div></div>
    <div className="field"><label htmlFor="checkin-date">Check-in date</label><input id="checkin-date" name="date" type="date" required max={today} value={date} onChange={(event) => { setDate(event.target.value); setMessage(''); }} /></div>
    <div key={`${date}-${entry ? 'saved' : 'new'}`} className="patient-checkin-fields">
      {[
        ['pain', 'Pain level', '0 = no pain · 10 = worst pain'],
        ['function', 'Daily activity ability', '0 = unable · 10 = usual ability'],
        ['energy', 'Energy level', '0 = no energy · 10 = full energy'],
      ].map(([name, label, hint]) => <div className="field" key={name}><label htmlFor={`checkin-${name}`}>{label}</label><select id={`checkin-${name}`} name={name} required defaultValue={entry?.[name] ?? ''}><option value="">Choose a score</option>{Array.from({ length: 11 }, (_, index) => <option key={index} value={index}>{index} / 10</option>)}</select><p className="field-hint">{hint}</p></div>)}
      <div className="field"><label htmlFor="checkin-notes">Daily notes (optional)</label><textarea id="checkin-notes" name="notes" maxLength={2000} rows={3} defaultValue={entry?.notes || ''} placeholder="What felt easier, what was difficult, or anything to discuss?" /></div>
    </div>
    <button className="button button-primary" type="submit">{entry ? 'Update daily check-in' : 'Save daily check-in'}<Icon name="check" size={17} /></button>
    {message && <p className="portal-success" role="status">{message}</p>}
  </form>;
}

function ProgressChart({ entries }) {
  const visible = entries.slice(-14);
  const x = (index) => visible.length === 1 ? 300 : 38 + index * (524 / (visible.length - 1));
  const y = (score) => 168 - score * 14;
  return <div className="patient-trend"><div className="patient-card-heading"><Icon name="chart" size={22} /><div><h4>Your recent trend</h4><p>Up to 14 check-ins. Scores reflect your own reports.</p></div></div>{visible.length ? <>
    <div className="patient-chart-key"><span>Pain</span><span>Daily activity ability</span></div>
    <svg className="patient-progress-chart" viewBox="0 0 600 210" role="img" aria-label="Pain and daily activity scores over recorded check-ins. Exact scores are in the progress table.">
      {[0, 5, 10].map((score) => <g key={score}><line x1="38" x2="562" y1={y(score)} y2={y(score)} className="patient-chart-grid" /><text x="10" y={y(score) + 4}>{score}</text></g>)}
      {['pain', 'function'].map((metric) => <g key={metric} className={`patient-chart-${metric}`}><polyline points={visible.map((entry, index) => `${x(index)},${y(entry[metric])}`).join(' ')} />{visible.map((entry, index) => <circle key={entry.date} cx={x(index)} cy={y(entry[metric])} r="4"><title>{displayDate(entry.date)}: {metric === 'pain' ? 'pain' : 'daily activity ability'} {entry[metric]}/10</title></circle>)}</g>)}
      <text x="38" y="198">{displayDate(visible[0].date)}</text>{visible.length > 1 && <text x="562" y="198" textAnchor="end">{displayDate(visible.at(-1).date)}</text>}
    </svg>
  </> : <p className="empty-state">Your first daily check-in will start your chart.</p>}</div>;
}

function ProgressPanel({ record, update, today }) {
  const summary = progressSummary(record, today);
  return <div>
    <div className="portal-panel-heading"><span className="patient-kicker">03 / MAKE ROOM FOR PROGRESS</span><h3>Every little step counts.</h3><p>Record the time you practise and how you feel. Your history helps you and your physiotherapist discuss what is changing.</p></div>
    <div className="patient-stats"><div><Icon name="clock" size={21} /><strong>{Math.floor(summary.weekSeconds / 60)}<small> min</small></strong><span>Practice in the last 7 days</span></div><div><Icon name="calendar" size={21} /><strong>{summary.weekCheckIns}<small> / 7</small></strong><span>Check-ins in the last 7 days</span></div><div><Icon name="movement" size={21} /><strong>{summary.streak}<small> days</small></strong><span>Current check-in streak</span></div><div><Icon name="chart" size={21} /><strong>{summary.painChange === null ? '—' : `${summary.painChange > 0 ? '+' : ''}${summary.painChange}`}<small>{summary.painChange === null ? '' : ' / 10'}</small></strong><span>{summary.painChange === null ? 'Add two check-ins for pain change' : 'Pain change since first check-in'}</span></div></div>
    <p className="field-hint patient-stats-note">A streak counts check-ins, not exercise targets. Rest days are part of care; scores do not measure clinical recovery.</p>
    <div className="patient-progress-grid"><SessionTimer onSave={(session) => update((previous) => ({ ...previous, sessions: [...previous.sessions, session] }))} /><DailyCheckIn record={record} update={update} today={today} /></div>
    <ProgressChart entries={summary.checkIns} />
    <div className="patient-history"><h4>Daily check-in history</h4>{summary.checkIns.length ? <div className="patient-table-scroll"><table className="progress-table"><caption>Self-reported scores, newest first</caption><thead><tr><th scope="col">Date</th><th scope="col">Pain</th><th scope="col">Ability</th><th scope="col">Energy</th><th scope="col">Notes</th></tr></thead><tbody>{[...summary.checkIns].reverse().map((entry) => <tr key={entry.date}><th scope="row">{displayDate(entry.date)}</th><td>{entry.pain}/10</td><td>{entry.function}/10</td><td>{entry.energy}/10</td><td>{entry.notes || '—'}</td></tr>)}</tbody></table></div> : <p className="field-hint">No daily check-ins yet.</p>}</div>
    <div className="patient-history"><h4>Exercise session history</h4>{record.sessions.length ? <ul className="patient-session-list">{[...record.sessions].reverse().map((session) => <li key={session.id}><Icon name="check" size={18} /><div><strong>{session.exerciseIds.map((id) => exercises.find((exercise) => exercise.id === id)?.title).filter(Boolean).join(', ')}</strong><span>{displayDate(session.date)} · {timeLabel(session.seconds)} active practice</span></div></li>)}</ul> : <p className="field-hint">Finish and save a timed session to see it here.</p>}</div>
  </div>;
}

export default function PatientPortal() {
  const [initial] = useState(readPatientRecord);
  const [record, setRecord] = useState(initial.record);
  const [remember, setRemember] = useState(initial.remembered);
  const [notice, setNotice] = useState(initial.notice || '');
  const [tab, setTab] = useState('report');
  const [busy, setBusy] = useState(false);
  const [preparedReport, setPreparedReport] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState('');
  const [clearPending, setClearPending] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [today, setToday] = useState(localDate);
  useEffect(() => () => {
    if (preparedReport) URL.revokeObjectURL(preparedReport.url);
  }, [preparedReport]);
  useEffect(() => { setPreparedReport(null); setDownloadNotice(''); }, [record]);
  // Panels stay mounted, so switching tabs does not interrupt a timed session.
  useEffect(() => {
    if (!remember) return;
    try { localStorage.setItem(patientStorageKey, JSON.stringify(record)); }
    catch { setNotice('This browser could not save your details. Your information is available for this visit; download your PDF before leaving.'); }
  }, [record, remember]);
  useEffect(() => {
    const tick = () => setToday(localDate());
    const interval = setInterval(tick, 15000);
    window.addEventListener('focus', tick);
    return () => { clearInterval(interval); window.removeEventListener('focus', tick); };
  }, []);
  async function download() {
    if (busy) return;
    setBusy(true); setDownloadNotice(''); setPreparedReport(null);
    try {
      const { downloadPatientReport } = await import('./patientReport.js');
      const result = await downloadPatientReport(record);
      setPreparedReport({ ...result, record });
      setDownloadNotice('Your PDF is ready. If the download did not start, choose Save PDF or Open PDF below.');
    } catch (error) {
      const loadingError = /fetch|network|module|chunk|import/i.test(error.message || '');
      setDownloadNotice(loadingError ? 'The report tools could not be loaded. Check your connection and try again. Your details are still here.' : 'The PDF could not be created. Your details are still here. Please try again.');
    }
    finally { setBusy(false); }
  }
  function changeRemember(event) {
    const checked = event.target.checked;
    try {
      if (checked) localStorage.setItem(patientStorageKey, JSON.stringify(record));
      else localStorage.removeItem(patientStorageKey);
      setRemember(checked);
      setNotice(checked ? 'Your patient details and history will be remembered in this browser.' : 'Saved details were removed from this browser. You can keep working for this visit.');
    } catch { setNotice('This browser could not change saved storage. Use your own device and download a PDF before leaving.'); }
  }
  function clearData() {
    try { localStorage.removeItem(patientStorageKey); }
    catch { setNotice('This browser could not remove saved storage. Clear this site’s data in your browser settings.'); return; }
    setRemember(false); setRecord(emptyPatientRecord()); setGeneration((value) => value + 1); setClearPending(false); setTab('report'); setNotice('Your patient details, check-ins and sessions have been cleared from this browser. Previously downloaded PDFs must be deleted separately.');
  }
  return <section className="section patient-section" id="patient-portal"><div className="wrap">
    <div className="resource-heading"><div><span className="eyebrow">YOUR CARE. YOUR PACE.</span><h2>Your patient <em>space.</em></h2></div><p>Tell your story, learn the movements and follow your progress. Create a report to bring to your next appointment.</p></div>
    <div className="patient-welcome"><div><span className="patient-local-badge"><span /> NO SIGN-IN NEEDED</span><h3>A space for your next step.</h3><p>Your details stay in this browser. Nothing you enter here is sent to the clinic. You choose when to download and share your report.</p></div><div className="patient-welcome-mark"><Icon name="heart" size={48} /><span>Learn. Practise.<br />Notice your progress.</span></div></div>
    <div className="patient-storage"><div><label className="check-label"><input type="checkbox" checked={remember} onChange={changeRemember} /><span>Remember my details and progress on this device</span></label><p className="field-hint">{remember ? 'Saved in this browser, without a password or account. Anyone using this browser may be able to view it. Clearing browser data removes it; it will not sync to another device.' : 'Off by default. Details disappear when you reload or leave. Choose this only on your own device to keep daily history.'}</p></div><button type="button" className="patient-text-button" onClick={() => setClearPending(true)}>Clear my patient data</button></div>
    {clearPending && <div className="patient-clear-confirm" role="alert"><p>Clear your details, saved check-ins and sessions from this browser?</p><div className="patient-actions"><button type="button" className="button button-outline" onClick={clearData}>Yes, clear my data</button><button type="button" className="patient-text-button" onClick={() => setClearPending(false)}>Keep my data</button></div></div>}
    {notice && <p className="patient-notice" role="status">{notice}</p>}
    <div className="patient-workspace" key={generation}>
      <div className="patient-tabs" role="tablist" aria-label="Patient space sections" onKeyDown={(event) => {
        const index = tabs.findIndex(([id]) => id === tab);
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); setTab(tabs[next][0]); document.getElementById(`patient-tab-${tabs[next][0]}`)?.focus(); }
      }}>{tabs.map(([id, label, icon]) => <button key={id} id={`patient-tab-${id}`} type="button" role="tab" aria-selected={tab === id} tabIndex={tab === id ? 0 : -1} aria-controls={`patient-panel-${id}`} onClick={() => setTab(id)}><Icon name={icon} size={19} />{label}</button>)}</div>
      {tabs.map(([id]) => <div key={id} id={`patient-panel-${id}`} className="patient-tab-panel" role="tabpanel" aria-labelledby={`patient-tab-${id}`} hidden={tab !== id} tabIndex={0}>
        {id === 'report' && <HealthReport record={record} update={setRecord} download={download} busy={busy} preparedReport={preparedReport} downloadNotice={downloadNotice} />}
        {id === 'guides' && <GuidePanel service={record.profile.service} />}
        {id === 'progress' && <ProgressPanel record={record} update={setRecord} today={today} />}
      </div>)}
    </div>
    <aside className="exercise-safety-note patient-safety"><Icon name="shield" size={24} /><div><strong>Your care plan comes first.</strong><p>Use exercises and doses agreed with your physiotherapist, including any support or restrictions. Stop if symptoms worsen or you feel dizzy or unwell. Seek urgent medical help for chest pain, severe breathlessness or sudden new weakness. This space does not monitor you or alert a clinician.</p></div></aside>
  </div></section>;
}
