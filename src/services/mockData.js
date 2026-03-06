// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — matches ExerciseDB API response shape exactly.
// When you integrate the API, just replace these arrays with API responses.
// API shape: { id, name, bodyPart, equipment, target, secondaryMuscles, instructions, gifUrl }
// ─────────────────────────────────────────────────────────────────────────────

export const BODY_PARTS = [
  'all', 'back', 'cardio', 'chest', 'lower arms', 'lower legs',
  'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
]

export const EQUIPMENT_LIST = [
  'all', 'barbell', 'body weight', 'cable', 'dumbbell',
  'kettlebell', 'machine', 'resistance band'
]

export const TARGET_MUSCLES = [
  'all', 'abs', 'biceps', 'calves', 'delts', 'glutes',
  'hamstrings', 'lats', 'pectorals', 'quads', 'triceps', 'traps'
]

// Muscle → accent color map (used for badge colors on cards)
export const MUSCLE_COLORS = {
  abs:         '#ff6400',
  biceps:      '#f59e0b',
  calves:      '#10b981',
  delts:       '#3b82f6',
  glutes:      '#8b5cf6',
  hamstrings:  '#ec4899',
  lats:        '#06b6d4',
  pectorals:   '#ff6400',
  quads:       '#84cc16',
  triceps:     '#f97316',
  traps:       '#a78bfa',
  default:     '#6b7280',
}

export const MOCK_EXERCISES = [
  {
    id: '0001',
    name: 'Barbell Bench Press',
    bodyPart: 'chest',
    equipment: 'barbell',
    target: 'pectorals',
    secondaryMuscles: ['triceps', 'delts'],
    gifUrl: null,
    instructions: [
      'Lie flat on a bench with your feet planted firmly on the floor.',
      'Grip the barbell slightly wider than shoulder-width apart.',
      'Unrack the bar and hold it directly above your chest with arms fully extended.',
      'Lower the bar slowly to the middle of your chest, keeping your elbows at about 75 degrees.',
      'Press the bar back up to the starting position, exhaling as you push.',
      'Repeat for the desired number of reps.',
    ],
  },
  {
    id: '0002',
    name: 'Pull-Up',
    bodyPart: 'back',
    equipment: 'body weight',
    target: 'lats',
    secondaryMuscles: ['biceps', 'traps'],
    gifUrl: null,
    instructions: [
      'Hang from a pull-up bar with an overhand grip, hands shoulder-width apart.',
      'Engage your core and retract your shoulder blades.',
      'Pull your body upward until your chin clears the bar.',
      'Lower yourself back down with control until your arms are fully extended.',
      'Repeat for the desired number of reps.',
    ],
  },
  {
    id: '0003',
    name: 'Barbell Back Squat',
    bodyPart: 'upper legs',
    equipment: 'barbell',
    target: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings'],
    gifUrl: null,
    instructions: [
      'Position the barbell on your upper traps and step back from the rack.',
      'Stand with feet shoulder-width apart, toes slightly turned out.',
      'Brace your core and push your hips back as you lower down.',
      'Descend until your thighs are parallel to the floor or below.',
      'Drive through your heels to return to the starting position.',
    ],
  },
  {
    id: '0004',
    name: 'Dumbbell Shoulder Press',
    bodyPart: 'shoulders',
    equipment: 'dumbbell',
    target: 'delts',
    secondaryMuscles: ['triceps', 'traps'],
    gifUrl: null,
    instructions: [
      'Sit on a bench with back support, holding a dumbbell in each hand at shoulder height.',
      'Your palms should face forward and elbows should be at 90 degrees.',
      'Press the dumbbells upward until your arms are fully extended overhead.',
      'Lower the dumbbells back to shoulder height with control.',
      'Repeat for the desired number of reps.',
    ],
  },
  {
    id: '0005',
    name: 'Romanian Deadlift',
    bodyPart: 'upper legs',
    equipment: 'barbell',
    target: 'hamstrings',
    secondaryMuscles: ['glutes', 'lats'],
    gifUrl: null,
    instructions: [
      'Stand holding a barbell in front of your thighs with an overhand grip.',
      'Keep a slight bend in your knees and your back flat throughout.',
      'Hinge at the hips and push them back as you lower the bar toward the floor.',
      'Lower until you feel a deep stretch in your hamstrings.',
      'Drive your hips forward to return to standing position.',
    ],
  },
  {
    id: '0006',
    name: 'Cable Tricep Pushdown',
    bodyPart: 'upper arms',
    equipment: 'cable',
    target: 'triceps',
    secondaryMuscles: [],
    gifUrl: null,
    instructions: [
      'Attach a straight bar or rope to a high pulley cable machine.',
      'Stand facing the machine, grip the attachment with both hands.',
      'Keep your elbows pinned to your sides throughout the movement.',
      'Push the attachment downward until your arms are fully extended.',
      'Slowly return to the starting position with control.',
    ],
  },
  {
    id: '0007',
    name: 'Dumbbell Bicep Curl',
    bodyPart: 'upper arms',
    equipment: 'dumbbell',
    target: 'biceps',
    secondaryMuscles: ['brachialis'],
    gifUrl: null,
    instructions: [
      'Stand holding a dumbbell in each hand with arms fully extended.',
      'Keep your elbows close to your torso and palms facing forward.',
      'Curl the dumbbells upward while contracting your biceps.',
      'Continue until the dumbbells are at shoulder level.',
      'Lower back down slowly to the starting position.',
    ],
  },
  {
    id: '0008',
    name: 'Plank',
    bodyPart: 'waist',
    equipment: 'body weight',
    target: 'abs',
    secondaryMuscles: ['glutes', 'delts'],
    gifUrl: null,
    instructions: [
      'Start in a push-up position with your forearms on the ground.',
      'Keep your body in a straight line from head to heels.',
      'Engage your core and squeeze your glutes.',
      'Hold the position for the desired amount of time.',
      'Do not let your hips sag or rise.',
    ],
  },
  {
    id: '0009',
    name: 'Hip Thrust',
    bodyPart: 'upper legs',
    equipment: 'barbell',
    target: 'glutes',
    secondaryMuscles: ['hamstrings', 'abs'],
    gifUrl: null,
    instructions: [
      'Sit on the floor with your upper back against a bench and a barbell across your hips.',
      'Place your feet flat on the floor, hip-width apart.',
      'Drive through your heels and thrust your hips upward.',
      'Squeeze your glutes at the top until your body forms a straight line.',
      'Lower your hips back down with control and repeat.',
    ],
  },
  {
    id: '0010',
    name: 'Lat Pulldown',
    bodyPart: 'back',
    equipment: 'cable',
    target: 'lats',
    secondaryMuscles: ['biceps', 'traps'],
    gifUrl: null,
    instructions: [
      'Sit at a lat pulldown machine and grasp the bar with a wide overhand grip.',
      'Lean back slightly and retract your shoulder blades.',
      'Pull the bar down toward your upper chest.',
      'Squeeze your lats at the bottom of the movement.',
      'Slowly return the bar to the starting position with arms fully extended.',
    ],
  },
  {
    id: '0011',
    name: 'Kettlebell Swing',
    bodyPart: 'upper legs',
    equipment: 'kettlebell',
    target: 'glutes',
    secondaryMuscles: ['hamstrings', 'abs', 'delts'],
    gifUrl: null,
    instructions: [
      'Stand with feet shoulder-width apart, kettlebell on the floor in front of you.',
      'Hinge at the hips and grab the kettlebell with both hands.',
      'Swing the kettlebell back between your legs, then drive your hips forward explosively.',
      'Let the kettlebell swing up to chest height.',
      'Allow it to swing back down and repeat in a fluid motion.',
    ],
  },
  {
    id: '0012',
    name: 'Face Pull',
    bodyPart: 'shoulders',
    equipment: 'cable',
    target: 'delts',
    secondaryMuscles: ['traps', 'biceps'],
    gifUrl: null,
    instructions: [
      'Set a cable machine to upper-chest height with a rope attachment.',
      'Grip both ends of the rope and step back to create tension.',
      'Pull the rope toward your face, separating your hands as you pull.',
      'Aim to bring your hands to either side of your face with elbows high.',
      'Slowly return to the starting position and repeat.',
    ],
  },
]