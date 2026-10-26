import { jsPDF } from 'jspdf';
import { exercises } from '../shared/exercises.mjs';
import { clinicName } from './branding.js';
import { displayDate, progressSummary, reportExercises, serviceGuides, timeLabel } from './patientSpace.js';
import bodyFontData from './assets/report-fonts/NotoSans-Regular.ttf?inline';
import signatureFontData from './assets/report-fonts/Allura-Regular.ttf?inline';

const fontBase64 = (data) => data.slice(data.indexOf(',') + 1);

async function reportPhoto(exercise) {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}images/${exercise.image}`, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    // Static hosts may return the HTML page with status 200 for a missing JPEG.
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff ? bytes : null;
  } catch {
    // Written steps and precautions remain useful when a photo cannot load.
    return null;
  }
}

export async function createPatientReport(record) {
  // The document is assembled from text and local JPEGs; patient text is never interpreted as HTML.
  const selectedExercises = reportExercises(record.profile);
  const photos = await Promise.all(selectedExercises.map(reportPhoto));
  const doc = new jsPDF({ unit: 'mm', format: 'a4', putOnlyUsedFonts: true, compress: true });
  doc.addFileToVFS('NotoSans-Regular.ttf', fontBase64(bodyFontData));
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFileToVFS('Allura-Regular.ttf', fontBase64(signatureFontData));
  doc.addFont('Allura-Regular.ttf', 'Allura', 'normal');
  doc.setFont('NotoSans');
  doc.setProperties({ title: 'Patient health report and exercise guides', subject: 'Patient-entered summary for discussion with a physiotherapist', creator: clinicName });
  const margin = 18;
  const width = 174;
  const bottom = 272;
  let y = 30;
  function newPage() { doc.addPage(); y = 30; }
  function room(height) { if (y + height > bottom) newPage(); }
  function text(value, size = 10, color = [55, 55, 55]) {
    doc.setFontSize(size); doc.setTextColor(...color);
    const clean = String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '');
    const lines = doc.splitTextToSize(clean || 'Not provided', width);
    const lineHeight = size * 0.48;
    for (const line of lines) { room(lineHeight); doc.text(line, margin, y); y += lineHeight; }
    y += 3;
  }
  function heading(value) { room(18); y += 3; text(value, 15, [117, 87, 22]); }
  function field(label, value) { room(15); text(label, 9, [110, 89, 44]); text(value || 'Not provided'); }
  const profile = record.profile;
  text('YOUR PATIENT HEALTH REPORT', 20, [38, 34, 31]);
  text(`Created ${new Date().toLocaleString()} · ${Intl.DateTimeFormat().resolvedOptions().timeZone}`, 9);
  heading('Patient details');
  field('Full name', profile.fullName.trim());
  field('Phone number', profile.phone.trim());
  if (profile.age) field('Age', profile.age);
  field('Service', profile.service);
  heading('Your health summary');
  for (const [label, value] of [
    ['Main complaint', profile.complaint], ['When it started', profile.duration], ['Current pain', `${profile.pain}/10 (0 = no pain, 10 = worst pain)`], ['Effect on daily activities', profile.impact], ['Health history and restrictions', profile.history], ['Personal goal', profile.goal], ['Instructions recorded from your physiotherapist', profile.clinicianPlan],
  ]) field(label, value);
  heading('Discuss with your physiotherapist');
  text(serviceGuides[profile.service]?.advice || 'Discuss your symptoms and exercise suitability with your physiotherapist.');
  text('Agree which exercises are suitable, how many repetitions to do, hold times, frequency, support and restrictions. This report does not assign exercise doses or establish a diagnosis.');
  text('Stop exercise if symptoms worsen or you feel dizzy or unwell. Seek urgent medical help for chest pain, severe breathlessness or sudden new weakness.');

  newPage();
  heading('Your progress');
  const summary = progressSummary(record);
  text(`Last 7 days: ${timeLabel(summary.weekSeconds)} active practice · ${summary.weekCheckIns} daily check-ins. Current check-in streak: ${summary.streak} days.`);
  text(summary.painChange === null ? 'Record at least two daily check-ins to compare pain scores.' : `Latest pain minus first recorded pain: ${summary.painChange > 0 ? '+' : ''}${summary.painChange}/10. These are self-reported scores, not a clinical recovery measure.`);
  heading('Daily check-in history');
  text('Pain: 0 = no pain, 10 = worst pain. Ability: 0 = unable, 10 = usual ability. Energy: 0 = none, 10 = full energy.', 9);
  if (!summary.checkIns.length) text('No daily check-ins recorded.');
  for (const entry of [...summary.checkIns].reverse()) {
    room(20);
    text(`${displayDate(entry.date)} · Pain ${entry.pain}/10 · Ability ${entry.function}/10 · Energy ${entry.energy}/10`, 10, [38, 34, 31]);
    if (entry.notes) text(`Notes: ${entry.notes}`, 9);
  }
  heading('Exercise session history');
  if (!record.sessions.length) text('No completed exercise sessions recorded.');
  for (const session of [...record.sessions].reverse()) {
    const titles = session.exerciseIds.map((id) => exercises.find((exercise) => exercise.id === id)?.title).filter(Boolean).join(', ');
    text(`${displayDate(session.date)} · ${titles} · Active practice ${timeLabel(session.seconds)}`);
  }

  if (!selectedExercises.length) {
    heading('Exercise guidance');
    text('No matching exercise guide is available for this concern. Discuss an individual exercise plan with your physiotherapist.');
  }
  for (const [index, exercise] of selectedExercises.entries()) {
    newPage();
    heading(`Exercise guide ${index + 1} of ${selectedExercises.length}`);
    text(exercise.title, 18, [38, 34, 31]);
    text(`${exercise.category} · ${exercise.position}`, 10);
    text('Use this guide with the exercise dose, support and restrictions agreed with your physiotherapist.', 9);
    if (photos[index]) {
      try {
        room(92);
        doc.addImage(photos[index], 'JPEG', margin, y, 108, 81, exercise.id, 'FAST');
        y += 87;
      } catch {
        // A damaged photo must not prevent the health report from downloading.
      }
    }
    for (const [step, instruction] of exercise.steps.entries()) text(`${step + 1}. ${instruction}`, 11);
    field('Take care', exercise.safety);
    text('Repetitions, hold times, frequency and progression: follow your individual physiotherapy plan.', 9);
    text(`Guidance: ${exercise.provider}`, 8);
    doc.setFontSize(8);
    const sourceLines = doc.splitTextToSize(exercise.source, width);
    for (const line of sourceLines) { room(5); doc.textWithLink(line, margin, y, { url: exercise.source }); y += 4; }
  }
  room(43);
  y += 20;
  doc.setTextColor(117, 74, 42);
  doc.setFont('Allura');
  doc.setFontSize(44);
  doc.text('HR', margin + 7, y - 2);
  doc.setDrawColor(117, 74, 42);
  doc.line(margin, y, 109, y);
  doc.line(143, y, 192, y);
  doc.setFont('NotoSans');
  doc.setFontSize(10);
  doc.setTextColor(117, 74, 42);
  doc.text('Professional signature', margin, y + 7);
  doc.text('Date', 143, y + 7);
  const count = doc.getNumberOfPages();
  for (let page = 1; page <= count; page++) {
    doc.setPage(page); doc.setFont('NotoSans'); doc.setFontSize(8); doc.setTextColor(105, 88, 50);
    doc.text('PATIENT HEALTH REPORT', margin, 13);
    doc.setFont('times', 'italic'); doc.setFontSize(22); doc.setTextColor(117, 74, 42);
    doc.text(clinicName, 192, 13, { align: 'right' });
    doc.setFont('NotoSans'); doc.setFontSize(8); doc.setTextColor(105, 88, 50);
    doc.setDrawColor(218, 199, 152); doc.line(margin, 18, 192, 18);
    doc.text('Personal health information · Keep private', margin, 287);
    doc.text(`${page} / ${count}`, 192, 287, { align: 'right' });
  }
  return doc;
}

export async function downloadPatientReport(record) {
  const doc = await createPatientReport(record);
  // Keep personal identifiers out of the download filename and PDF metadata.
  const filename = 'heimric-patient-health-report.pdf';
  const url = URL.createObjectURL(doc.output('blob'));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.append(link);
  try { link.click(); }
  catch { /* The visible Save PDF link provides a fresh user-initiated download. */ }
  finally { link.remove(); }
  return { url, filename };
}
