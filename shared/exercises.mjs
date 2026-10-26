export const exerciseCategories = [
  'Stroke rehabilitation',
  'Back and neck pain',
  'Knee rehabilitation',
  'Balance and mobility',
  'Sports injuries',
];

const sgh =
  'https://www.healthxchange.sg/how-to-manage/stroke/exercises-wellness-guide-stroke-patients';
const cuhKnee =
  'https://www.cuh.nhs.uk/our-services/physiotherapy-outpatients/outpatient-physio-resources/resources/knee/early-knee-exercises/';
const lancs = 'https://www.lancsteachinghospitals.nhs.uk/trauma-exercises';
const balance = 'https://www.nhs.uk/live-well/exercise/strength-exercises/';

// Educational summaries, not a prescribed programme. Doses belong in the patient's clinic plan.
export const exercises = [
  {
    id: 'stroke-seated-arm',
    image: 'exercise-stroke-seated-arm.jpg',
    imageAlt:
      'A seated adult sliding a supported forearm forward on a table, with a physiotherapist beside them.',
    category: exerciseCategories[0],
    title: 'Supported seated arm movement',
    position: 'Seated · support as advised',
    steps: [
      'Sit securely with your feet supported and your forearm resting on a table.',
      'Practise the supported arm movement your physiotherapist has shown you, keeping your shoulder comfortable.',
      'Return slowly. Use the range and assistance agreed in your plan.',
    ],
    safety:
      'Have a trained helper if advised. Never pull on a weak arm or force a painful shoulder.',
    provider: 'SingHealth · SGH / NHCS Physiotherapy',
    source: sgh,
  },
  {
    id: 'stroke-seated-reach',
    image: 'exercise-stroke-seated-reach.jpg',
    imageAlt:
      'An adult reaching a short distance forward from a stable chair, with both feet supported and a physiotherapist nearby.',
    category: exerciseCategories[0],
    title: 'Seated forward reach',
    position: 'Seated · supervised if needed',
    steps: [
      'Use a stable chair with your feet supported.',
      'With the support taught by your physiotherapist, reach a short distance forward.',
      'Return to upright sitting slowly, staying within your safe balance range.',
    ],
    safety:
      'Only practise after your physiotherapist checks your sitting balance. A trained helper may be needed.',
    provider: 'SingHealth · SGH / NHCS Physiotherapy',
    source: sgh,
  },
  {
    id: 'neck-rotation',
    image: 'exercise-neck-rotation.jpg',
    imageAlt:
      'An adult sitting upright in a firm chair and gently turning their head to one side, with relaxed shoulders.',
    category: exerciseCategories[1],
    title: 'Gentle neck rotation',
    position: 'Seated · comfortable movement',
    steps: [
      'Sit tall in a firm chair with your shoulders relaxed.',
      'Slowly turn your head to one side within a comfortable range.',
      'Return to the centre, then gently turn to the other side.',
    ],
    safety:
      'Do not force the movement. Stop if you develop dizziness, new arm symptoms or worsening pain.',
    provider: 'Cambridge University Hospitals NHS',
    source:
      'https://www.cuh.nhs.uk/our-services/physiotherapy-outpatients/outpatient-physio-resources/resources/shoulder/seated-stretches/',
  },
  {
    id: 'pelvic-tilt',
    image: 'exercise-pelvic-tilt.jpg',
    imageAlt:
      'An adult lying on a treatment plinth with knees bent and feet flat while practising a small pelvic tilt.',
    category: exerciseCategories[1],
    title: 'Gentle pelvic tilt',
    position: 'Lying · knees bent',
    steps: [
      'Lie comfortably on your back with your knees bent and feet supported.',
      'Gently rock your pelvis to ease your lower back towards the surface.',
      'Relax back to your starting position without holding your breath.',
    ],
    safety:
      'Keep the movement small and comfortable. Ask for advice if lying down or getting up is difficult.',
    provider: 'Lancashire Teaching Hospitals NHS',
    source: lancs,
  },
  {
    id: 'knee-heel-slide',
    image: 'exercise-knee-heel-slide.jpg',
    imageAlt:
      'An adult lying on a treatment plinth, sliding one heel toward the body with the opposite leg extended.',
    category: exerciseCategories[2],
    title: 'Heel slide',
    position: 'Lying · supported leg',
    steps: [
      'Lie on a firm, comfortable surface with your leg supported.',
      'Slide your heel towards you to bend your knee gently.',
      'Slide it away to straighten again, following your prescribed movement limits.',
    ],
    safety:
      'After surgery, follow your surgeon’s restrictions. Stop if pain or swelling increases.',
    provider: 'Cambridge University Hospitals NHS',
    source: cuhKnee,
  },
  {
    id: 'knee-quad',
    image: 'exercise-knee-quad.jpg',
    imageAlt:
      'An adult resting with a straight supported leg and tightening the front thigh muscle toward a small towel beneath the knee.',
    category: exerciseCategories[2],
    title: 'Thigh muscle tightening',
    position: 'Lying · leg supported',
    steps: [
      'Rest with your leg comfortably supported and straight, as advised.',
      'Gently tighten the muscle at the front of your thigh, easing the back of your knee towards the surface.',
      'Relax fully between efforts. Use the hold time from your plan.',
    ],
    safety:
      'Keep breathing. Do not force your knee straight or work through increasing pain.',
    provider: 'Cambridge University Hospitals NHS',
    source: cuhKnee,
  },
  {
    id: 'balance-sit-stand',
    image: 'exercise-balance-sit-stand.jpg',
    imageAlt:
      'An older adult rising from a firm chair using the armrests, with a physiotherapist nearby for support.',
    category: exerciseCategories[3],
    title: 'Supported sit to stand',
    position: 'Stable chair · support nearby',
    steps: [
      'Use a firm chair that cannot slide, with your feet resting on the floor.',
      'Lean forward and stand slowly, using your hands or support as your physiotherapist advises.',
      'Sit down in a controlled way.',
    ],
    safety:
      'If you are unsteady, practise only with the assistance your physiotherapist recommends. Do not use a chair with wheels.',
    provider: 'NHS · Strength exercises',
    source: balance,
  },
  {
    id: 'balance-heel-raise',
    image: 'exercise-balance-heel-raise.jpg',
    imageAlt:
      'An adult holding a stable kitchen worktop while raising both heels, with the toes and forefeet on the floor.',
    category: exerciseCategories[3],
    title: 'Supported heel raise',
    position: 'Standing · firm hand support',
    steps: [
      'Stand facing a stable worktop or chair back and hold it securely.',
      'Slowly rise onto your toes, keeping your body upright.',
      'Lower your heels gently back to the floor.',
    ],
    safety:
      'Keep your support within reach throughout. Ask for supervision if you have fallen or feel unsteady.',
    provider: 'NHS · Strength exercises',
    source: balance,
  },
  {
    id: 'ankle-pump',
    image: 'exercise-ankle-pump.jpg',
    imageAlt:
      'A supported lower leg with the ankle flexed and toes drawn gently toward the shin during ankle pumps.',
    category: exerciseCategories[4],
    title: 'Gentle ankle pumps',
    position: 'Seated or lying · leg supported',
    steps: [
      'Rest your leg on a comfortable support.',
      'Slowly point your foot away, then bring your toes back towards you.',
      'Move within the comfortable range agreed with your physiotherapist.',
    ],
    safety:
      'After an injury or operation, first check your movement restrictions. Do not force a stiff or painful ankle.',
    provider: 'Lancashire Teaching Hospitals NHS',
    source: lancs,
  },
  {
    id: 'ankle-circle',
    image: 'exercise-ankle-circle.jpg',
    imageAlt:
      'An adult sitting with one lower leg supported and the foot free to move in a small ankle circle.',
    category: exerciseCategories[4],
    title: 'Gentle ankle circles',
    position: 'Seated or lying · leg supported',
    steps: [
      'Support your leg so your foot can move freely.',
      'Make a small, slow circle with your ankle.',
      'Change direction, keeping the movement comfortable.',
    ],
    safety:
      'Check injury or surgery restrictions first. Stop if symptoms increase.',
    provider: 'Lancashire Teaching Hospitals NHS',
    source: lancs,
  },
];

export const exerciseIds = new Set(exercises.map(({ id }) => id));
