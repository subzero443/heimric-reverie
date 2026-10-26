# Heimric Reverie Physioyard
# Live Link: https://heimric-reverie.pages.dev/
---
# Screenshots
<img src="Screenshot 2026-10-24 170428.png">
<img src="Screenshot 2026-10-24 122801.png">
<img src="Screenshot 2026-10-24 133743.png">
<img src="Screenshot 2026-10-24 132200.png">
<img src="Screenshot 2026-10-25 191716.png">
<img src="Screenshot 2026-10-24 155715.png">
<img src="Screenshot 2026-10-24 153912.png">
<img src="Screenshot 2026-10-24 153807.png">
<img src="Screenshot 2026-10-24 124414.png">
<img src="Screenshot 2026-10-24 143945.png">
<img src="Screenshot 2026-10-24 154319.png">
<img src="Screenshot 2026-10-25 192127.png">
<img src="Screenshot 2026-10-26 093429.png">
<img src="Screenshot 2026-10-26 093600.png">

A responsive physiotherapy website built with React, Vite, and Tailwind CSS. Includes eleven service cards, FAQs, ten illustrated exercise guides and a browser-only patient portal with complaint forms, downloadable PDF health reports, an exercise timer and daily progress tracking. No account, API, database or application server is required. WhatsApp handles appointment requests.

Home-Based Physiotherapy is the priority service: it appears first in a featured card, leads the homepage introduction and main booking link, and is the default appointment choice. Home visits are available by appointment in Ibadan and Lagos. Telerehabilitation has a separate booking path for patients requesting online care, with city/country, preferred time and time zone included in the WhatsApp draft. All requests are confirmed by the clinic.

The visual styling follows the local FUTA Homes reference: Plus Jakarta Sans throughout, bold headings, rounded panels, and generous form controls. The default Heimric Gold theme uses gold accents, charcoal surfaces, translucent panels, and a softly blurred logo backdrop with the supplied physiotherapy pattern as a faint gold shadow. This decorative background stays fixed while the main page scrolls. The supplied gold logo is also used in the header and footer. Earlier colour themes remain available in the theme menu.

## Run locally

Use Node.js 24.19 or newer within 24.x.

```sh
cd "C:\Users\INVESTOR\Desktop\heimric-reverie"
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution is restricted. `npm run dev` starts Vite only. Open the local URL printed by Vite. The React source needs Vite; opening `index.html` directly or with Live Server will not run the app.

```sh
npm  run build   # Production files in dist/
npm run preview  # Preview the production build
npm start        # Preview dist/ on all network interfaces
npm run test:report # PDF exercise selection checks
npm test         # Browser smoke checks (requires installed Google Chrome)
```

## Editing

- `src/App.jsx`: sections, theme picker, loading animation, and appointment form.
- `src/FAQs.jsx`: the ten clinic-supplied questions and answers, shown in accessible expandable rows.
- `src/ExerciseLibrary.jsx` and `shared/exercises.mjs`: category filters, ten local AI-generated exercise photos, written instructions, safety guidance and provider source links.
- `src/PatientPortal.jsx`: browser-only health report form, exercise guides, practice timer, check-ins and progress chart.
- `src/patientSpace.js` and `src/patientReport.js`: local patient data, progress calculations and PDF export with up to three matching exercise guides, brown branding and a professional signature line.
- `src/assets/report-fonts/`: Noto Sans and Allura fonts and their open font licenses. Fonts are embedded in the report module, including support for names with accented characters.
- `src/Testimonials.jsx`: an empty state and a link for feedback sent directly to the clinic.
- `docs/patient-space.md`: patient workflow, local storage, PDF reports and timer behavior.
- `docs/hosting-render.md` and `render.yaml`: static hosting configuration.
- `docs/exercise-library.md`: provider guidance, video attribution and content review notes.
- `docs/exercise-photos.md`: the ten exercise photo assets and generation prompts.
- `src/Entrance.jsx`: gold logo entrance with a softly revealed physiotherapy-pattern shadow for the initial page load.
- `public/images/entrance-physiotherapy-pattern.jpg`: user-supplied physiotherapy pattern, centered to hide screenshot borders and blended into a faint gold watermark behind the entrance logo and across the main website background.
- `src/branding.js` and `shared/clinic.mjs`: clinic name, consultation fees, shared logo URL, and theme preference settings.
- `public/images/home-based-physiotherapy.jpg`: featured photo of physiotherapy during a home visit, showing treatment in a patient's living room.
- `public/images/telerehabilitation.jpg`: photo of a patient following physiotherapy guidance over a video call.
- `public/images/stroke-rehabilitation.jpg`, `back-pain-treatment.jpg`, `sports-injury-rehab.jpg`, and `post-surgical-rehab.jpg`: service photos showing the treatment described by each card.
- `public/images/neck-shoulder-pain.jpg`, `arthritis-joint-care.jpg`, `paediatric-physiotherapy.jpg`, and `balance-mobility-training.jpg`: photos for the four additional services.
- `public/images/neuro-oncology-rehabilitation.jpg`: photo of a gentle seated reaching and coordination session for neuro-oncology rehabilitation.
- `docs/service-images.md`: service image generation prompts and source details.
- `public/images/heimric-reverie-logo.png`: isolated logo asset prepared from the supplied reference.
- `public/images/physiotherapy-rehabilitation.jpg`: generated hero photo of assisted knee rehabilitation, compressed for the web.
- `docs/hero-image.md`: image generation prompt and source details.
- `src/ClinicArt.jsx`: original vector clinic illustration, retained as an unused alternative.
- `src/Icons.jsx`: shared icons and brand mark.
- `style.css`: Tailwind import, responsive styling, theme variables, and animations.
- `script.js`: React entry point.
- `index.html`: page metadata and saved-theme initialization.

The theme selector stores only the selected theme in browser local storage. The refreshed design starts with Heimric Gold and saves subsequent choices under a new preference key. The gold Heimric Reverie logo appears on a charcoal entrance with the supplied physiotherapy pattern as a softly revealed gold shadow only when the page first loads. The pattern is decorative and shares the reduced-motion setting and entrance fade. Internal section links (including Home, About us, Our services, and Our process) immediately scroll to and focus the selected section with a 260 ms fade and slide reveal. Browser Back and Forward also work without replaying the logo. The initial entrance is shortened and the section reveal is skipped for visitors who prefer reduced motion. Theme changes do not replay the entrance. If the logo cannot load, a branded text fallback appears.

Appointments are requests, confirmed by the clinic's reply. The public WhatsApp form validates the preferred date and opens a prepared message; the visitor sends it themselves. If the new tab is blocked, a direct WhatsApp link appears below the form. Home visits are arranged through this same WhatsApp flow.

The consultation prices are NGN 15,000 or USD 15. Both are displayed above the booking button; patients choose their consultation currency to see the selected price in the form. Consultation fees are omitted from appointment messages and direct-chat links. These are fixed clinic prices, not a live exchange-rate conversion. Update `consultationFees` in `shared/clinic.mjs` to change them.

The full-name field describes first name, middle name (if any), and last name. Home-visit requests collect the chosen city and area, with optional mobility/access needs, a short main concern, and preferred time. These fields are included only in the WhatsApp draft, which the patient reviews and sends. Changing services removes fields that do not apply and clears any previously prepared message.

The Patient portal is highlighted in the header, with a persistent shortcut on mobile. Patients enter their name, phone, service, complaint, health history, daily impact, goal and any existing physiotherapy instructions. A PDF includes their health summary, daily check-ins, timed sessions and up to three exercise guides matched to their service and main complaint, with photos, instructions, precautions and source links. A brown Heimric Reverie Physioyard wordmark appears at the top right of each page, with a handwritten-style HR mark above the Professional signature line at the end. The report does not diagnose or prescribe treatment.

Patient information stays in memory by default and disappears on reload. Patients may explicitly enable **Remember my details and progress on this device** to save in browser local storage. This is not password protected, does not sync, and is removed when browser data is cleared. Patients can clear saved data from the portal; already downloaded PDFs are separate files. Nothing entered in the portal is transmitted to the clinic. See [patient space](docs/patient-space.md).

The exercise timer measures active practice with pause/resume, an optional patient-entered duration and an explicit finish/save action. Daily check-ins record pain, activity ability, energy and notes; editing a date replaces that date's entry. Charts, recent totals and check-in streaks reflect self-reported history, not a clinical recovery score. No patient feedback is fabricated or automatically published.

Contact details and practitioner information are retained from the original site. The map can switch between Ibadan and Lagos; it shows city areas, not exact clinic addresses. The hero and service photos were generated with AI and depict fictional therapy sessions. Google Fonts and Google Maps require an internet connection; system fonts and the contact details remain available if those services cannot load.

To publish, build and upload `dist/` to a static HTTPS host. The supplied `render.yaml` configures a new static site. No server secrets, database or private disk are needed. The project contains only the frontend application and its build/test tooling. Any old `.clinic-data/` or `.clinic-backups/` folders are kept private and ignored; the application does not use them, and they do not belong in a website upload.
