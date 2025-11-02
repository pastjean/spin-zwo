// FTP Builder v2.0 - Dynamic 12-Week ZWO File Generator
// Incorporates MyWhoosh-inspired dynamic workout structures
// More frequent recovery, varied cadence work, and engaging progressions

import { saveZWOFilesToDisk } from '../../lib/fileGenerator.js';
import { generateAllWorkoutImages } from '../../lib/imageGenerator.js';
import type { WorkoutDefinition } from '../../lib/types.js';
import { formatMetricsForDescription } from '../../lib/metrics.js';

// Define all workouts for 12 weeks
export const workouts: Record<string, WorkoutDefinition> = {
  // ============ WEEK 1 ============
  'W01-D2-Tuesday-FTP_Test': {
    name: 'W1-T: FTP Test',
    description: `Initial FTP assessment. Warm up progressively, then maximum sustainable 20-min effort. Your average power × 0.95 = FTP.\n\n💡 Pre-load: Consume carbs 2-3hrs before`,
    tags: ['Week 1', 'FTP Test', 'Assessment'],
    segments: [
      {
        type: 'warmup',
        duration: 300,
        powerLow: 0.5,
        powerHigh: 0.6,
        messages: [{ time: 10, text: 'Easy start - gradually build' }],
      },
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.75,
        messages: [{ time: 300, text: 'Continuing build - feeling loose' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.5,
        messages: [{ time: 10, text: 'Easy spin before openers' }],
      },
      {
        type: 'steady',
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: 'Opener 1/3 - Wake up the legs' }],
      },
      { type: 'steady', duration: 120, power: 0.5 },
      {
        type: 'steady',
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: 'Opener 2/3 - Getting ready' }],
      },
      { type: 'steady', duration: 120, power: 0.5 },
      {
        type: 'steady',
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: 'Opener 3/3 - Dial it in' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.5,
        messages: [
          { time: 10, text: 'Final recovery - mental preparation' },
          { time: 240, text: 'Get ready for 20-min FTP test!' },
        ],
      },
      {
        type: 'steady',
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP TEST! Max sustainable 20 min' },
          { time: 300, text: '5 min - settle into your rhythm' },
          { time: 600, text: 'Halfway! Stay strong and steady' },
          { time: 900, text: '5 min left - time to dig!' },
          { time: 1080, text: 'Final 2 min - everything you have!' },
          { time: 1170, text: '30 sec - FINISH STRONG!' },
        ],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [
          { time: 10, text: 'Great job! Easy cooldown' },
          { time: 300, text: 'New FTP = 20-min avg × 0.95' },
        ],
      },
    ],
  },

  'W01-D3-Wednesday-Recovery': {
    name: 'W1-W: Active Recovery',
    description:
      'Light recovery with micro-bursts. Promotes blood flow while staying fresh.\n\n📊 23 TSS · IF 0.50',
    tags: ['Week 1', 'Recovery', 'Zone 1', 'Active'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: 'Very easy warmup - stay relaxed' }],
      },
      { type: 'steady', duration: 180, power: 0.5 },
      {
        type: 'steady',
        duration: 30,
        power: 0.7,
        messages: [{ time: 5, text: 'Micro-burst 1/8 - just a touch harder' }],
      },
      { type: 'steady', duration: 90, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.75 },
      { type: 'steady', duration: 90, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.7 },
      { type: 'steady', duration: 90, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.75 },
      { type: 'steady', duration: 180, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.7 },
      { type: 'steady', duration: 90, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.75 },
      { type: 'steady', duration: 90, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.7 },
      { type: 'steady', duration: 90, power: 0.5 },
      { type: 'steady', duration: 30, power: 0.75 },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.45,
        messages: [{ time: 10, text: 'Easy finish - recovery complete' }],
      },
    ],
  },

  'W01-D4-Thursday-Tempo': {
    name: 'W1-Th: Tempo Building',
    description:
      '3 x 10min tempo @ 85% with varied cadence. Building aerobic endurance.\n\n💡 Consume 30-40g carbs/hr\n📊 65 TSS · IF 0.82',
    tags: ['Week 1', 'Tempo', 'Zone 3', 'Cadence'],
    segments: [
      {
        type: 'warmup',
        duration: 900,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [
          { time: 10, text: 'Progressive warmup' },
          { time: 600, text: 'Building toward tempo intensity' },
        ],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.85,
        messages: [
          { time: 10, text: 'Tempo 1/3 - Comfortably hard, 85-95 rpm' },
          { time: 150, text: 'Halfway - stay smooth' },
        ],
      },
      {
        type: 'steady',
        duration: 150,
        power: 0.85,
        messages: [{ time: 10, text: 'High cadence - shift up, 95-105 rpm' }],
      },
      {
        type: 'steady',
        duration: 150,
        power: 0.85,
        messages: [{ time: 10, text: 'Low cadence - shift down, 70-80 rpm' }],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 600,
        power: 0.85,
        messages: [
          { time: 10, text: 'Tempo 2/3 - Same steady effort' },
          { time: 300, text: 'Halfway - focus on breathing' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 400,
        power: 0.85,
        messages: [{ time: 10, text: 'Final tempo 3/3' }],
      },
      {
        type: 'steady',
        duration: 200,
        power: 0.88,
        messages: [{ time: 10, text: 'Final 3 min - bump it up slightly' }],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W01-D6-Saturday-Endurance': {
    name: 'W1-S: Base Endurance with Accelerations',
    description:
      '90-min endurance with 6 accelerations. Building aerobic base.\n\n💡 Consume 60g carbs/hr\n📊 55 TSS · IF 0.65',
    tags: ['Week 1', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 1200,
        power: 0.7,
        messages: [{ time: 10, text: 'Settle into steady endurance pace' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 0.95,
        messages: [{ time: 5, text: 'Acceleration 1/6 - quick surge' }],
      },
      { type: 'steady', duration: 1170, power: 0.7 },
      { type: 'steady', duration: 30, power: 0.95 },
      { type: 'steady', duration: 1170, power: 0.7 },
      { type: 'steady', duration: 30, power: 0.95 },
      { type: 'steady', duration: 1170, power: 0.7 },
      { type: 'steady', duration: 30, power: 0.95 },
      {
        type: 'steady',
        duration: 600,
        power: 0.7,
        messages: [{ time: 300, text: 'Final stretch - well done' }],
      },
    ],
  },

  'W01-D7-Sunday-Recovery': {
    name: 'W1-Su: Optional Recovery',
    description: 'Optional 30-45min easy spin.\n\n📊 18 TSS · IF 0.45',
    tags: ['Week 1', 'Recovery', 'Zone 1', 'Optional'],
    segments: [
      {
        type: 'steady',
        duration: 2700,
        power: 0.6,
        messages: [
          { time: 10, text: 'Very easy optional recovery' },
          { time: 1350, text: 'Halfway - stay relaxed' },
        ],
      },
    ],
  },
  // ============ WEEK 2 ============
  'W02-D2-Tuesday-Sweet_Spot': {
    name: 'W2-T: Sweet Spot 2x15',
    description:
      '2 x 15min sweet spot @ 90%. Building power sustainably.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 68 TSS · IF 0.88',
    tags: ['Week 2', 'Sweet Spot', 'Zone 4'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Almost ready for sweet spot' }],
      },
      {
        type: 'steady',
        duration: 600,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 1/2 - Moderately hard but sustainable' },
        ],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.88,
        messages: [{ time: 10, text: 'Slight drop - 88% for 5 min' }],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 450,
        power: 0.9,
        messages: [{ time: 10, text: 'SS 2/2 - First 7.5 min steady' }],
      },
      {
        type: 'steady',
        duration: 450,
        power: 0.92,
        messages: [{ time: 10, text: 'Final 7.5 min - slight bump to 92%' }],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W02-D3-Wednesday-Easy_Spin': {
    name: 'W2-W: Easy Zone 2',
    description:
      '60min easy Zone 2 endurance. Building aerobic volume.\n\n💡 Consume 30g carbs/hr\n📊 46 TSS · IF 0.68',
    tags: ['Week 2', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 3600,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy Zone 2 - building volume' },
          { time: 1800, text: 'Halfway - steady and relaxed' },
          { time: 3300, text: 'Almost done - great aerobic work' },
        ],
      },
    ],
  },

  'W02-D4-Thursday-FTP_Intervals': {
    name: 'W2-Th: FTP Intervals 4x8',
    description:
      '4 x 8min @ 100% FTP. Direct threshold training.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 82 TSS · IF 0.95',
    tags: ['Week 2', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: 'steady',
        duration: 480,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 1/4 - Threshold power' },
          { time: 240, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 240, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 1.0,
        messages: [{ time: 10, text: 'FTP 2/4 - First 4 min' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.98,
        messages: [{ time: 10, text: 'Slight drop to 98% - finish strong' }],
      },
      { type: 'steady', duration: 240, power: 0.55 },
      {
        type: 'steady',
        duration: 480,
        power: 1.0,
        messages: [{ time: 10, text: 'FTP 3/4 - Hold steady' }],
      },
      { type: 'steady', duration: 240, power: 0.55 },
      {
        type: 'steady',
        duration: 300,
        power: 1.0,
        messages: [{ time: 10, text: 'Final FTP 4/4 - First 5 min' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 1.02,
        messages: [{ time: 10, text: 'Final 3 min - dig deep, 102%!' }],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W02-D6-Saturday-Tempo_Endurance': {
    name: 'W2-S: Tempo Endurance 3x15',
    description:
      '3 x 15min tempo intervals with progressive structure.\n\n💡 Consume 60g carbs/hr\n📊 72 TSS · IF 0.83',
    tags: ['Week 2', 'Tempo', 'Zone 3'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 900,
        power: 0.85,
        messages: [{ time: 10, text: 'Tempo 1/3 - Steady 85%' }],
      },
      { type: 'steady', duration: 120, power: 0.6 },
      {
        type: 'steady',
        duration: 600,
        power: 0.83,
        messages: [{ time: 10, text: 'Tempo 2/3 - Drop to 83%' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.87,
        messages: [{ time: 10, text: 'Final 5 min - bump to 87%' }],
      },
      { type: 'steady', duration: 120, power: 0.6 },
      {
        type: 'steady',
        duration: 600,
        power: 0.85,
        messages: [{ time: 10, text: 'Final tempo 3/3 - Start 85%' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 0.88,
        messages: [{ time: 10, text: 'Last 3 min - push to 88%' }],
      },
      {
        type: 'steady',
        duration: 120,
        power: 0.9,
        messages: [{ time: 10, text: 'Final 2 min - 90%!' }],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W02-D7-Sunday-Long_Endurance': {
    name: 'W2-Su: Long Endurance 2hr',
    description:
      '2-hour steady endurance with subtle variations.\n\n💡 Consume 60-90g carbs/hr\n📊 70 TSS · IF 0.65',
    tags: ['Week 2', 'Endurance', 'Zone 2', 'Long'],
    segments: [
      {
        type: 'steady',
        duration: 1800,
        power: 0.68,
        messages: [{ time: 10, text: 'Long steady - settle in' }],
      },
      { type: 'steady', duration: 1800, power: 0.7 },
      {
        type: 'steady',
        duration: 1800,
        power: 0.72,
        messages: [{ time: 900, text: 'Final 30 min - slight bump' }],
      },
      {
        type: 'steady',
        duration: 1800,
        power: 0.7,
        messages: [{ time: 900, text: 'Almost done!' }],
      },
    ],
  },

  // ============ WEEK 3 ============
  'W03-D2-Tuesday-Over_Unders': {
    name: 'W3-T: Over/Unders 3x8',
    description:
      '3 x (4min@95% + 4min@105%). Lactate clearance training.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 84 TSS · IF 0.92',
    tags: ['Week 3', 'Over/Under', 'Lactate', 'Zone 4-5'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for challenging efforts' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: 'Block 1: Under phase - 95%' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: 'Block 1: Over phase - 105%' }],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: 'Block 2: Under phase' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: 'Block 2: Over phase' }],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: 'Block 3: Final under phase' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: 'Block 3: Final over - dig deep!' }],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W03-D3-Wednesday-Recovery': {
    name: 'W3-W: Active Recovery',
    description: 'Easy recovery spin.\n\n📊 23 TSS · IF 0.50',
    tags: ['Week 3', 'Recovery', 'Zone 1'],
    segments: [
      {
        type: 'steady',
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: 'Easy Zone 1 recovery' },
          { time: 1350, text: 'Stay easy - recovery priority' },
        ],
      },
    ],
  },

  'W03-D4-Thursday-Extended_Threshold': {
    name: 'W3-Th: Extended Threshold 2x20',
    description:
      '2 x 20min @ FTP. Building threshold endurance.\n\n💡 Consume 60-90g carbs/hr\n📊 95 TSS · IF 1.00',
    tags: ['Week 3', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: 'steady',
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 1/2 - 20 min at threshold' },
          { time: 600, text: 'Halfway through first' },
          { time: 1140, text: 'Final minute - stay strong' },
        ],
      },
      { type: 'steady', duration: 600, power: 0.55 },
      {
        type: 'steady',
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 2/2 - Final 20 min' },
          { time: 600, text: 'Halfway - dig deep' },
          { time: 1140, text: 'Last minute - finish strong!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W03-D6-Saturday-Sweet_Spot_Progression': {
    name: 'W3-S: Sweet Spot 3x20',
    description:
      '3 x 20min sweet spot. Peak sweet spot work.\n\n💡 Consume 60-90g carbs/hr\n📊 92 TSS · IF 0.90',
    tags: ['Week 3', 'Sweet Spot', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 1/3 - 20 minutes' },
          { time: 600, text: 'Halfway through first' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 2/3' },
          { time: 600, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: 'Final SS 3/3' },
          { time: 600, text: 'Halfway - finish strong!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W03-D7-Sunday-Easy_Spin': {
    name: 'W3-Su: Easy Zone 1 Spin',
    description: '30min Zone 1 recovery priority.\n\n📊 12 TSS · IF 0.40',
    tags: ['Week 3', 'Recovery', 'Zone 1'],
    segments: [
      {
        type: 'steady',
        duration: 1800,
        power: 0.55,
        messages: [
          { time: 10, text: 'Very easy Zone 1 spin' },
          { time: 900, text: 'Halfway - keep it relaxed' },
        ],
      },
    ],
  },

  // ============ WEEK 4 (RECOVERY) ============
  'W04-D2-Tuesday-Recovery_Cadence': {
    name: 'W4-T: Recovery Cadence + Sprints',
    description:
      '60min recovery with cadence drills + 5x10sec sprints. Neuromuscular maintenance.\n\n🍖 Recovery nutrition focus\n📊 35 TSS · IF 0.58',
    tags: ['Week 4', 'Recovery', 'Cadence', 'Sprints'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.6,
        messages: [{ time: 10, text: 'Easy warmup - recovery week' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.65,
        messages: [{ time: 10, text: 'Low cadence drill 1/3 - 50-60 rpm' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.6,
        messages: [{ time: 10, text: 'High cadence drill 1/3 - 110-120 rpm' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.65,
        messages: [{ time: 10, text: 'Low cadence drill 2/3' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.6,
        messages: [{ time: 10, text: 'High cadence drill 2/3' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.65,
        messages: [{ time: 10, text: 'Low cadence drill 3/3' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.6,
        messages: [{ time: 10, text: 'High cadence drill 3/3' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.55,
        messages: [{ time: 10, text: 'Sprint prep - next: 10sec max efforts' }],
      },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 1/5 - MAX effort!' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 2/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 3/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 4/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Final sprint 5/5!' }],
      },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.6,
        powerLow: 0.5,
        messages: [
          { time: 10, text: 'Recovery week - neuromuscular work done' },
        ],
      },
    ],
  },

  'W04-D4-Thursday-Light_Tempo': {
    name: 'W4-Th: Light Tempo',
    description:
      '50min easy ride with light tempo.\n\n🍖 Recovery nutrition focus\n📊 38 TSS · IF 0.75',
    tags: ['Week 4', 'Recovery', 'Tempo'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.65 },
      {
        type: 'steady',
        duration: 1200,
        power: 0.8,
        messages: [
          { time: 10, text: 'Light tempo - not too hard' },
          { time: 600, text: 'Halfway - stay comfortable' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W04-D6-Saturday-Easy_Endurance': {
    name: 'W4-S: Relaxed Endurance',
    description:
      '120min easy endurance. Recovery intensity with added volume to maintain fitness.\n\n🍖 Recovery nutrition focus\n💡 Consume 60g carbs/hr\n📊 98 TSS · IF 0.70',
    tags: ['Week 4', 'Recovery', 'Endurance'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Easy endurance - no structure' },
          { time: 1800, text: '30 min - keep relaxed and steady' },
          { time: 3600, text: 'Halfway - recovery pace, building volume' },
          { time: 5400, text: '90 min - feeling good' },
          { time: 6900, text: 'Almost done - great recovery week' },
        ],
      },
    ],
  },

  'W04-D7-Sunday-Recovery': {
    name: 'W4-Su: Easy Endurance',
    description:
      '75min easy Zone 2 ride. Maintains training load while staying in recovery.\n\n🍖 Recovery nutrition focus\n💡 Consume 30-40g carbs/hr\n📊 58 TSS · IF 0.68',
    tags: ['Week 4', 'Recovery', 'Endurance'],
    segments: [
      {
        type: 'steady',
        duration: 4500,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy endurance - recovery pace' },
          { time: 2250, text: 'Halfway - feeling fresh' },
          { time: 4200, text: 'Recovery week complete - ready for Block 2!' },
        ],
      },
    ],
  },

  // ============ WEEK 5 ============
  'W05-D2-Tuesday-Pyramid_Intervals': {
    name: 'W5-T: Pyramid Intervals 3-5-7-5-3',
    description:
      'Pyramid intervals @ 100% FTP. Builds mental toughness and pacing.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 78 TSS · IF 0.90',
    tags: ['Week 5', 'Pyramid', 'FTP', 'Zone 4'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for pyramid intervals' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 1.0,
        messages: [{ time: 10, text: 'Pyramid: 3 min @ FTP' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 300,
        power: 1.0,
        messages: [{ time: 10, text: 'Pyramid: 5 min @ FTP' }],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 420,
        power: 1.0,
        messages: [
          { time: 10, text: 'Pyramid: 7 min @ FTP - Peak!' },
          { time: 210, text: 'Halfway through peak interval' },
          { time: 390, text: 'Final 30 sec - hold it!' },
        ],
      },
      {
        type: 'steady',
        duration: 420,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - coming back down pyramid' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 1.0,
        messages: [{ time: 10, text: 'Pyramid: 5 min @ FTP' }],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 180,
        power: 1.0,
        messages: [{ time: 10, text: 'Pyramid: Final 3 min @ FTP' }],
      },
      {
        type: 'cooldown',
        duration: 720,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Great pacing work - pyramid complete!' }],
      },
    ],
  },

  'W05-D3-Wednesday-Easy_Spin': {
    name: 'W5-W: Easy Zone 2',
    description:
      '60min easy Zone 2 endurance. Building aerobic volume.\n\n💡 Consume 30g carbs/hr\n📊 46 TSS · IF 0.68',
    tags: ['Week 5', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 3600,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy Zone 2 - building volume' },
          { time: 1800, text: 'Halfway - steady and relaxed' },
          { time: 3300, text: 'Almost done - great aerobic work' },
        ],
      },
    ],
  },

  'W05-D4-Thursday-Progressive_Threshold': {
    name: 'W5-Th: Progressive Threshold 3x12',
    description:
      '3 x 12min @ 100% FTP. Building duration.\n\n💡 Consume 60-90g carbs/hr\n📊 88 TSS · IF 0.95',
    tags: ['Week 5', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: 'steady',
        duration: 720,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 1/3 - 12 min at threshold' },
          { time: 360, text: 'Halfway through first' },
        ],
      },
      { type: 'steady', duration: 360, power: 0.55 },
      {
        type: 'steady',
        duration: 720,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 2/3 - maintain that power' },
          { time: 360, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 360, power: 0.55 },
      {
        type: 'steady',
        duration: 720,
        power: 1.0,
        messages: [
          { time: 10, text: 'Final FTP 3/3 - 12 min strong' },
          { time: 360, text: 'Halfway through final interval' },
          { time: 660, text: 'Final minute - dig deep!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W05-D6-Saturday-Tempo_Endurance_Long': {
    name: 'W5-S: Extended Tempo 3x18',
    description:
      '100-min ride with 3 x 18min tempo intervals.\n\n💡 Consume 60-90g carbs/hr\n📊 80 TSS · IF 0.83',
    tags: ['Week 5', 'Tempo', 'Endurance', 'Zone 3'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: 'Tempo 1/3 - 18 minutes' },
          { time: 540, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 240, power: 0.6 },
      {
        type: 'steady',
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: 'Tempo 2/3' },
          { time: 540, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 240, power: 0.6 },
      {
        type: 'steady',
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: 'Final tempo 3/3' },
          { time: 540, text: 'Halfway - strong finish!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W05-D7-Sunday-Long_Endurance': {
    name: 'W5-Su: Long Endurance 2hr',
    description:
      '2-hour steady endurance.\n\n💡 Consume 60-90g carbs/hr\n📊 70 TSS · IF 0.65',
    tags: ['Week 5', 'Endurance', 'Zone 2', 'Long'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Long steady ride - settle in' },
          { time: 1800, text: '30 min' },
          { time: 3600, text: 'Halfway!' },
          { time: 5400, text: '90 min - final stretch' },
          { time: 6900, text: 'Almost done' },
        ],
      },
    ],
  },

  // ============ WEEK 6 ============
  'W06-D2-Tuesday-Push_and_Pull': {
    name: 'W6-T: Push & Pull',
    description:
      '6 x (4min high cadence + 4min low cadence) @ 88%. Alternating muscle recruitment.\n\n💡 Consume 60g carbs/hr\n📊 75 TSS · IF 0.82',
    tags: ['Week 6', 'Push & Pull', 'Cadence', 'Zone 3-4'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for Push & Pull work' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Push 1/6: High cadence 100-110 rpm' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Pull 1/6: Low cadence 55-65 rpm' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Push 2/6: High cadence' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Pull 2/6: Low cadence' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Push 3/6: High cadence' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Pull 3/6: Low cadence' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Push 4/6: High cadence' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Pull 4/6: Low cadence' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Push 5/6: High cadence' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Pull 5/6: Low cadence' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Push 6/6: Final high cadence' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 0.88,
        messages: [{ time: 10, text: 'Pull 6/6: Final low cadence - done!' }],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Great neuromuscular work!' }],
      },
    ],
  },

  'W06-D3-Wednesday-Recovery': {
    name: 'W6-W: Active Recovery',
    description: 'Easy recovery spin.\n\n📊 23 TSS · IF 0.50',
    tags: ['Week 6', 'Recovery', 'Zone 1'],
    segments: [
      {
        type: 'steady',
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: 'Active recovery - Zone 1-2' },
          { time: 1350, text: 'Stay easy' },
        ],
      },
    ],
  },

  'W06-D4-Thursday-FTP_2x20': {
    name: 'W6-Th: FTP 2x20',
    description:
      '2 x 20min @ 100% FTP. Smooth progression from W5.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 88 TSS · IF 0.95',
    tags: ['Week 6', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: 'steady',
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 1/2 - 20 min at threshold' },
          { time: 600, text: 'Halfway through first' },
          { time: 1140, text: 'Final minute' },
        ],
      },
      {
        type: 'steady',
        duration: 600,
        power: 0.55,
        messages: [{ time: 10, text: 'Good recovery before final interval' }],
      },
      {
        type: 'steady',
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 2/2 - Final 20 min' },
          { time: 600, text: 'Halfway - dig deep!' },
          { time: 1140, text: 'Last minute - everything you have!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W06-D6-Saturday-Sweet_Spot_3x22': {
    name: 'W6-S: Sweet Spot 3x22',
    description:
      '3 x 22min sweet spot. Extended progression.\n\n💡 Consume 60-90g carbs/hr\n📊 98 TSS · IF 0.90',
    tags: ['Week 6', 'Sweet Spot', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 1/3 - 22 minutes' },
          { time: 660, text: 'Halfway through first' },
          { time: 1260, text: 'Final minute' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 2/3' },
          { time: 660, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: 'Final SS 3/3' },
          { time: 660, text: 'Halfway - finish strong!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W06-D7-Sunday-Endurance': {
    name: 'W6-Su: Endurance 2hr',
    description:
      '2-hour steady endurance. Reduced from 2.5hr.\n\n💡 Consume 60-90g carbs/hr\n📊 70 TSS · IF 0.65',
    tags: ['Week 6', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 1800, text: '30 min' },
          { time: 3600, text: 'Halfway!' },
          { time: 5400, text: '90 min - final stretch' },
        ],
      },
    ],
  },

  // ============ WEEK 7 ============
  'W07-D2-Tuesday-VO2max_30_30s': {
    name: 'W7-T: VO2max 30/30s',
    description:
      '3 x (8 x 30sec @ 120% / 30sec @ 50%). High-intensity neuromuscular work.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 72 TSS · IF 0.88',
    tags: ['Week 7', 'VO2max', 'Zone 5', '30/30s'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for VO2max 30/30s' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Block 1: 30sec ON 1/8' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 0.5,
        messages: [{ time: 5, text: '30sec OFF' }],
      },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Final 30sec of block 1' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - Block 1 complete' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Block 2: 30sec ON 1/8' }],
      },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Final 30sec of block 2' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - Block 2 complete' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Block 3: 30sec ON 1/8 - FINAL block!' }],
      },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      { type: 'steady', duration: 30, power: 1.2 },
      { type: 'steady', duration: 30, power: 0.5 },
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'FINAL 30sec - dig deep!' }],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Outstanding VO2max work!' }],
      },
    ],
  },

  'W07-D3-Wednesday-Easy_Spin': {
    name: 'W7-W: Easy Zone 2',
    description:
      '60min easy Zone 2 endurance. Building aerobic volume.\n\n💡 Consume 30g carbs/hr\n📊 46 TSS · IF 0.68',
    tags: ['Week 7', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 3600,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy Zone 2 - recovery after VO2max work' },
          { time: 1800, text: 'Halfway - steady and relaxed' },
          { time: 3300, text: 'Almost done - great aerobic work' },
        ],
      },
    ],
  },

  'W07-D4-Thursday-FTP_30min': {
    name: 'W7-Th: Continuous 30min Threshold',
    description:
      '30min continuous @ 100% FTP. Peak threshold endurance.\n\n💡 Consume 60g carbs/hr\n📊 85 TSS · IF 0.98',
    tags: ['Week 7', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [
          { time: 1080, text: 'Get ready for 30-min continuous threshold' },
        ],
      },
      {
        type: 'steady',
        duration: 1800,
        power: 1.0,
        messages: [
          { time: 10, text: '30 minutes @ FTP - stay steady' },
          { time: 600, text: '10 min - settle into rhythm' },
          { time: 900, text: '15 min - halfway!' },
          { time: 1200, text: '20 min - two-thirds done' },
          { time: 1500, text: '25 min - final 5 minutes!' },
          { time: 1740, text: 'Last minute - finish strong!' },
        ],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Outstanding 30-min threshold!' }],
      },
    ],
  },

  'W07-D6-Saturday-Sweet_Spot_3x25': {
    name: 'W7-S: Sweet Spot 3x25',
    description:
      '3 x 25min sweet spot. Peak volume.\n\n💡 Consume 60-90g carbs/hr\n📊 102 TSS · IF 0.90',
    tags: ['Week 7', 'Sweet Spot', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 1/3 - 25 minutes' },
          { time: 750, text: 'Halfway through first' },
          { time: 1440, text: 'Final minute' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 2/3 - stay strong' },
          { time: 750, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: 'Final SS 3/3' },
          { time: 750, text: 'Halfway - dig deep!' },
          { time: 1440, text: 'Final minute - finish strong!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W07-D7-Sunday-Endurance_Tempo': {
    name: 'W7-Su: Endurance with Tempo',
    description:
      '2hr ride with 5x5min tempo bursts.\n\n💡 Consume 60-90g carbs/hr\n📊 75 TSS · IF 0.70',
    tags: ['Week 7', 'Endurance', 'Tempo', 'Zone 2-3'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      { type: 'steady', duration: 900, power: 0.7 },
      {
        type: 'steady',
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: 'Tempo burst 1/5' }],
      },
      { type: 'steady', duration: 900, power: 0.7 },
      {
        type: 'steady',
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: 'Tempo burst 2/5' }],
      },
      { type: 'steady', duration: 900, power: 0.7 },
      {
        type: 'steady',
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: 'Tempo burst 3/5' }],
      },
      { type: 'steady', duration: 900, power: 0.7 },
      {
        type: 'steady',
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: 'Tempo burst 4/5' }],
      },
      { type: 'steady', duration: 900, power: 0.7 },
      {
        type: 'steady',
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: 'Final tempo burst 5/5' }],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  // ============ WEEK 8 (RECOVERY) ============
  'W08-D2-Tuesday-Recovery_Cadence': {
    name: 'W8-T: Recovery Cadence + Sprints',
    description:
      '60min recovery with cadence drills + 5x10sec sprints.\n\n🍖 Recovery nutrition focus\n📊 35 TSS · IF 0.58',
    tags: ['Week 8', 'Recovery', 'Cadence', 'Sprints'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.6,
        messages: [{ time: 10, text: 'Recovery week - easy warmup' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.65,
        messages: [{ time: 10, text: 'Low cadence 1/3 - 50-60 rpm' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.6,
        messages: [{ time: 10, text: 'High cadence 1/3 - 110-120 rpm' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.65,
        messages: [{ time: 10, text: 'Low cadence 2/3' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.6,
        messages: [{ time: 10, text: 'High cadence 2/3' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.65,
        messages: [{ time: 10, text: 'Low cadence 3/3' }],
      },
      { type: 'steady', duration: 180, power: 0.55 },
      {
        type: 'steady',
        duration: 60,
        power: 0.6,
        messages: [{ time: 10, text: 'High cadence 3/3' }],
      },
      { type: 'steady', duration: 240, power: 0.55 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 1/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 2/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 3/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Sprint 4/5' }],
      },
      { type: 'steady', duration: 230, power: 0.5 },
      {
        type: 'steady',
        duration: 10,
        power: 1.5,
        messages: [{ time: 2, text: 'Final sprint 5/5!' }],
      },
      { type: 'cooldown', duration: 600, powerHigh: 0.6, powerLow: 0.5 },
    ],
  },
  'W08-D4-Thursday-Light_Tempo': {
    name: 'W8-Th: Light Tempo',
    description:
      '50min easy with light tempo.\n\n🍖 Recovery nutrition focus\n📊 38 TSS · IF 0.75',
    tags: ['Week 8', 'Recovery', 'Tempo'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.65 },
      {
        type: 'steady',
        duration: 1200,
        power: 0.8,
        messages: [
          { time: 10, text: 'Light tempo - not too hard' },
          { time: 600, text: 'Halfway - stay comfortable' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W08-D6-Saturday-Easy_Endurance': {
    name: 'W8-S: Relaxed Endurance',
    description:
      '120min easy endurance. Recovery intensity with added volume to maintain fitness.\n\n🍖 Recovery nutrition focus\n💡 Consume 60g carbs/hr\n📊 98 TSS · IF 0.70',
    tags: ['Week 8', 'Recovery', 'Endurance'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Easy endurance - no structure' },
          { time: 1800, text: '30 min - keep relaxed and steady' },
          { time: 3600, text: 'Halfway - recovery pace, building volume' },
          { time: 5400, text: '90 min - feeling good' },
          { time: 6900, text: 'Almost done - recovery week complete' },
        ],
      },
    ],
  },

  'W08-D7-Sunday-Recovery': {
    name: 'W8-Su: Easy Endurance',
    description:
      '75min easy Zone 2 ride. Maintains training load while staying in recovery.\n\n🍖 Recovery nutrition focus\n💡 Consume 30-40g carbs/hr\n📊 58 TSS · IF 0.68',
    tags: ['Week 8', 'Recovery', 'Endurance'],
    segments: [
      {
        type: 'steady',
        duration: 4500,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy endurance - recovery pace' },
          { time: 2250, text: 'Halfway - feeling fresh' },
          { time: 4200, text: 'Recovery complete - ready for final block!' },
        ],
      },
    ],
  },
  // ============ WEEK 9 ============
  'W09-D2-Tuesday-Pyramid_Intervals': {
    name: 'W9-T: Pyramid Intervals 4-6-8-6-4',
    description:
      'Advanced pyramid @ 100% FTP. Mental toughness and pacing mastery.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 78 TSS · IF 0.90',
    tags: ['Week 9', 'Pyramid', 'FTP', 'Zone 4'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Advanced pyramid - get ready!' }],
      },
      {
        type: 'steady',
        duration: 240,
        power: 1.0,
        messages: [{ time: 10, text: 'Pyramid: 4 min @ FTP' }],
      },
      { type: 'steady', duration: 240, power: 0.55 },
      {
        type: 'steady',
        duration: 360,
        power: 1.0,
        messages: [
          { time: 10, text: 'Pyramid: 6 min @ FTP' },
          { time: 180, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 360, power: 0.55 },
      {
        type: 'steady',
        duration: 480,
        power: 1.0,
        messages: [
          { time: 10, text: 'Pyramid: 8 min @ FTP - PEAK!' },
          { time: 240, text: 'Halfway through peak' },
          { time: 420, text: 'Final minute!' },
        ],
      },
      {
        type: 'steady',
        duration: 480,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - descending pyramid' }],
      },
      {
        type: 'steady',
        duration: 360,
        power: 1.0,
        messages: [
          { time: 10, text: 'Pyramid: 6 min @ FTP' },
          { time: 180, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 360, power: 0.55 },
      {
        type: 'steady',
        duration: 240,
        power: 1.0,
        messages: [
          { time: 10, text: 'Pyramid: Final 4 min @ FTP' },
          { time: 180, text: 'Final minute - finish strong!' },
        ],
      },
      {
        type: 'cooldown',
        duration: 720,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Advanced pyramid complete!' }],
      },
    ],
  },

  'W09-D3-Wednesday-Easy_Spin': {
    name: 'W9-W: Easy Zone 2',
    description:
      '60min easy Zone 2 endurance. Building aerobic volume.\n\n💡 Consume 30g carbs/hr\n📊 46 TSS · IF 0.68',
    tags: ['Week 9', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 3600,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy Zone 2 - building volume' },
          { time: 1800, text: 'Halfway - steady and relaxed' },
          { time: 3300, text: 'Almost done - great aerobic work' },
        ],
      },
    ],
  },

  'W09-D4-Thursday-FTP_3x15': {
    name: 'W9-Th: FTP Intervals 3x15',
    description:
      '3 x 15min @ 100% FTP. Sustained threshold work.\n\n💡 Consume 60-90g carbs/hr\n📊 90 TSS · IF 0.98',
    tags: ['Week 9', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: 'steady',
        duration: 900,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 1/3 - 15 min at threshold' },
          { time: 450, text: 'Halfway through first' },
          { time: 840, text: 'Final minute' },
        ],
      },
      { type: 'steady', duration: 450, power: 0.55 },
      {
        type: 'steady',
        duration: 900,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 2/3 - maintain power' },
          { time: 450, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 450, power: 0.55 },
      {
        type: 'steady',
        duration: 900,
        power: 1.0,
        messages: [
          { time: 10, text: 'Final FTP 3/3 - dig deep!' },
          { time: 450, text: 'Halfway through final' },
          { time: 840, text: 'Last minute - finish strong!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W09-D6-Saturday-Tempo_Endurance': {
    name: 'W9-S: Tempo Endurance 3x18',
    description:
      '100min with 3 x 18min tempo.\n\n💡 Consume 60-90g carbs/hr\n📊 80 TSS · IF 0.83',
    tags: ['Week 9', 'Tempo', 'Endurance', 'Zone 3'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: 'Tempo 1/3 - 18 minutes' },
          { time: 540, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 240, power: 0.6 },
      {
        type: 'steady',
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: 'Tempo 2/3' },
          { time: 540, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 240, power: 0.6 },
      {
        type: 'steady',
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: 'Final tempo 3/3' },
          { time: 540, text: 'Halfway - strong finish!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W09-D7-Sunday-Long_Endurance': {
    name: 'W9-Su: Long Endurance 2hr',
    description:
      '2-hour steady endurance.\n\n💡 Consume 60-90g carbs/hr\n📊 70 TSS · IF 0.65',
    tags: ['Week 9', 'Endurance', 'Zone 2', 'Long'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Long steady ride' },
          { time: 1800, text: '30 min' },
          { time: 3600, text: 'Halfway!' },
          { time: 5400, text: '90 min - final stretch' },
          { time: 6900, text: 'Almost done!' },
        ],
      },
    ],
  },

  // ============ WEEK 10 ============
  'W10-D2-Tuesday-VO2max_40_20s': {
    name: 'W10-T: VO2max 40/20s',
    description:
      '3 x (10 x 40sec @ 120% / 20sec @ 50%). Classic Tabata-style intervals.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 85 TSS · IF 0.90',
    tags: ['Week 10', 'VO2max', 'Zone 5', '40/20s'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for VO2max 40/20s' }],
      },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Block 1: 40sec ON 1/10' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Final interval of block 1' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - Block 1 complete' }],
      },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Block 2: 40sec ON 1/10' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Final interval of block 2' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - Block 2 complete' }],
      },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Block 3: 40sec ON 1/10 - FINAL block!' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'FINAL interval - everything you have!' }],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Outstanding VO2max work!' }],
      },
    ],
  },

  'W10-D3-Wednesday-Recovery': {
    name: 'W10-W: Active Recovery',
    description: 'Easy recovery spin.\n\n📊 23 TSS · IF 0.50',
    tags: ['Week 10', 'Recovery', 'Zone 1'],
    segments: [
      {
        type: 'steady',
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: 'Active recovery - Zone 1-2' },
          { time: 1350, text: 'Peak training week - stay easy' },
        ],
      },
    ],
  },

  'W10-D4-Thursday-FTP_2x25': {
    name: 'W10-Th: FTP 2x25',
    description:
      '2 x 25min @ 100% FTP. Peak threshold work.\n\n💡 Consume 60-90g carbs/hr\n📊 98 TSS · IF 0.98',
    tags: ['Week 10', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: 'steady',
        duration: 1500,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 1/2 - 25 min at threshold' },
          { time: 750, text: 'Halfway through first' },
          { time: 1440, text: 'Final minute' },
        ],
      },
      {
        type: 'steady',
        duration: 600,
        power: 0.55,
        messages: [{ time: 10, text: 'Good recovery before final interval' }],
      },
      {
        type: 'steady',
        duration: 1500,
        power: 1.0,
        messages: [
          { time: 10, text: 'FTP 2/2 - final 25 min' },
          { time: 750, text: 'Halfway - dig deep!' },
          { time: 1440, text: 'Last minute - everything you have!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W10-D6-Saturday-Sweet_Spot_3x25': {
    name: 'W10-S: Sweet Spot 3x25',
    description:
      '3 x 25min sweet spot. Maximum volume.\n\n💡 Consume 60-90g carbs/hr\n📊 102 TSS · IF 0.90',
    tags: ['Week 10', 'Sweet Spot', 'Zone 4'],
    segments: [
      { type: 'warmup', duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: 'steady',
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 1/3 - 25 minutes' },
          { time: 750, text: 'Halfway through first' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: 'SS 2/3' },
          { time: 750, text: 'Halfway' },
        ],
      },
      { type: 'steady', duration: 300, power: 0.55 },
      {
        type: 'steady',
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: 'Final SS 3/3 - max volume!' },
          { time: 750, text: 'Halfway - finish strong!' },
        ],
      },
      { type: 'cooldown', duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  'W10-D7-Sunday-Endurance': {
    name: 'W10-Su: Endurance 2hr',
    description:
      '2-hour steady endurance. Reduced from 2.5hr.\n\n💡 Consume 60-90g carbs/hr\n📊 70 TSS · IF 0.65',
    tags: ['Week 10', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 1800, text: '30 min' },
          { time: 3600, text: 'Halfway!' },
          { time: 5400, text: '90 min - final 30 minutes' },
          { time: 6900, text: 'Almost done - peak week complete!' },
        ],
      },
    ],
  },

  // ============ WEEK 11 ============
  'W11-D2-Tuesday-VO2max_Mixed': {
    name: 'W11-T: VO2max Mixed',
    description:
      '5 x 2min @ 115% + 4 x (40sec @ 120% / 20sec @ 50%). Top-end power development.\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 80 TSS · IF 0.92',
    tags: ['Week 11', 'VO2max', 'Zone 5', 'Mixed'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for mixed VO2max work' }],
      },
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [{ time: 10, text: 'VO2max 1/5 - 2 min @ 115%' }],
      },
      { type: 'steady', duration: 120, power: 0.55 },
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [{ time: 10, text: 'VO2max 2/5' }],
      },
      { type: 'steady', duration: 120, power: 0.55 },
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [{ time: 10, text: 'VO2max 3/5 - halfway!' }],
      },
      { type: 'steady', duration: 120, power: 0.55 },
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [{ time: 10, text: 'VO2max 4/5' }],
      },
      { type: 'steady', duration: 120, power: 0.55 },
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [{ time: 10, text: 'Final 2-min 5/5' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.55,
        messages: [{ time: 10, text: 'Good rest - now 40/20s!' }],
      },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: '40/20 interval 1/4' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: '40/20 interval 2/4' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: '40/20 interval 3/4' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Final 40/20 - dig deep!' }],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Outstanding mixed VO2max work!' }],
      },
    ],
  },

  'W11-D3-Wednesday-Easy_Spin': {
    name: 'W11-W: Easy Zone 2',
    description:
      '60min easy Zone 2 endurance. Building aerobic volume.\n\n💡 Consume 30g carbs/hr\n📊 46 TSS · IF 0.68',
    tags: ['Week 11', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 3600,
        power: 0.68,
        messages: [
          { time: 10, text: 'Easy Zone 2 - final test next week!' },
          { time: 1800, text: 'Halfway - steady and relaxed' },
          { time: 3300, text: 'Almost done - great aerobic work' },
        ],
      },
    ],
  },

  'W11-D4-Thursday-FTP_35min': {
    name: 'W11-Th: Continuous 35min Threshold',
    description:
      '35min continuous @ 100% FTP. Maximum threshold endurance.\n\n💡 Consume 60-90g carbs/hr\n📊 92 TSS · IF 1.00',
    tags: ['Week 11', 'FTP', 'Threshold', 'Zone 4'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: 'Get ready for 35-min continuous FTP' }],
      },
      {
        type: 'steady',
        duration: 2100,
        power: 1.0,
        messages: [
          { time: 10, text: '35 minutes @ FTP - stay steady' },
          { time: 600, text: '10 min - settle in' },
          { time: 1050, text: 'Halfway - 17.5 min!' },
          { time: 1500, text: '25 min - final 10 minutes!' },
          { time: 1800, text: '30 min - final 5 minutes!' },
          { time: 2040, text: 'Final minute - finish strong!' },
        ],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Incredible 35-min threshold!' }],
      },
    ],
  },

  'W11-D6-Saturday-Race_Simulation': {
    name: 'W11-S: Race Simulation',
    description:
      '100min race simulation: 3 x (8min @ 92% + 2min @ 105% + 5min @ 75%). Mixed intensity.\n\n💡 Consume 60-90g carbs/hr\n📊 88 TSS · IF 0.85',
    tags: ['Week 11', 'Race Sim', 'Mixed', 'Zone 3-5'],
    segments: [
      {
        type: 'warmup',
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [
          { time: 1080, text: 'Race simulation - varied intensity ahead' },
        ],
      },
      {
        type: 'steady',
        duration: 480,
        power: 0.92,
        messages: [
          { time: 10, text: 'Block 1: Tempo pace 8 min' },
          { time: 240, text: 'Halfway through tempo' },
        ],
      },
      {
        type: 'steady',
        duration: 120,
        power: 1.05,
        messages: [{ time: 10, text: 'Block 1: Attack! 2 min @ 105%' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.75,
        messages: [{ time: 10, text: 'Block 1: Recovery 5 min' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: 'Easy spin between blocks' }],
      },
      {
        type: 'steady',
        duration: 480,
        power: 0.92,
        messages: [
          { time: 10, text: 'Block 2: Tempo pace 8 min' },
          { time: 240, text: 'Halfway' },
        ],
      },
      {
        type: 'steady',
        duration: 120,
        power: 1.05,
        messages: [{ time: 10, text: 'Block 2: Attack! 2 min @ 105%' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.75,
        messages: [{ time: 10, text: 'Block 2: Recovery 5 min' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: 'Easy spin before final block' }],
      },
      {
        type: 'steady',
        duration: 480,
        power: 0.92,
        messages: [
          { time: 10, text: 'Block 3: Final tempo 8 min' },
          { time: 240, text: 'Halfway' },
        ],
      },
      {
        type: 'steady',
        duration: 120,
        power: 1.05,
        messages: [{ time: 10, text: 'Block 3: Final attack! 2 min @ 105%' }],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.75,
        messages: [{ time: 10, text: 'Block 3: Recovery 5 min' }],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: 'Race simulation complete!' }],
      },
    ],
  },

  'W11-D7-Sunday-Endurance': {
    name: 'W11-Su: Steady Endurance 2hr',
    description:
      '2-hour steady endurance. Final volume ride.\n\n💡 Consume 60-90g carbs/hr\n📊 70 TSS · IF 0.65',
    tags: ['Week 11', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Final long ride before test week' },
          { time: 3600, text: 'Halfway!' },
          { time: 5400, text: '90 min - almost done' },
          { time: 6900, text: 'Final volume ride complete!' },
        ],
      },
    ],
  },

  // ============ WEEK 12 (FINAL TEST & TAPER) ============
  'W12-D2-Tuesday-Final_FTP_Test': {
    name: 'W12-T: Final FTP Test',
    description:
      'Final FTP test to measure your improvement. Compare to Week 1!\n\n💡 Pre-load: Carbs 2-3hrs before\n📊 60 TSS · IF 0.75',
    tags: ['Week 12', 'FTP Test', 'Final Assessment'],
    segments: [
      {
        type: 'warmup',
        duration: 300,
        powerLow: 0.5,
        powerHigh: 0.6,
        messages: [
          { time: 10, text: 'Final FTP test warmup - feeling strong!' },
        ],
      },
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.75,
        messages: [
          { time: 300, text: 'Building up - 12 weeks of work behind you' },
        ],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.5,
        messages: [{ time: 10, text: 'Easy spin before openers' }],
      },
      {
        type: 'steady',
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: 'Opener 1/3 - feel that strength!' }],
      },
      { type: 'steady', duration: 120, power: 0.5 },
      {
        type: 'steady',
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: 'Opener 2/3 - ready to show your gains' }],
      },
      { type: 'steady', duration: 120, power: 0.5 },
      {
        type: 'steady',
        duration: 60,
        power: 1.1,
        messages: [
          { time: 10, text: 'Final opener - time to prove your fitness!' },
        ],
      },
      {
        type: 'steady',
        duration: 300,
        power: 0.5,
        messages: [
          { time: 10, text: 'Final recovery - believe in your training' },
          { time: 240, text: 'Time to see your gains!' },
        ],
      },
      {
        type: 'steady',
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: "FINAL FTP TEST! Show what you've built!" },
          { time: 300, text: '5 min - settle in strong' },
          { time: 600, text: 'Halfway - how does this feel vs Week 1?' },
          { time: 900, text: '5 min left - time to prove your fitness!' },
          { time: 1080, text: "Final 2 min - everything you've gained!" },
          { time: 1170, text: '30 seconds - FINISH STRONG!' },
        ],
      },
      {
        type: 'cooldown',
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [
          { time: 10, text: 'CONGRATULATIONS! 12 weeks complete!' },
          { time: 300, text: 'Compare to Week 1 - celebrate your progress!' },
          { time: 600, text: 'New FTP = 20-min avg × 0.95' },
        ],
      },
    ],
  },

  'W12-D3-Wednesday-Easy_Spin': {
    name: 'W12-W: Easy Recovery',
    description:
      'Very easy 30-min spin. Recovery from test.\n\n📊 12 TSS · IF 0.40',
    tags: ['Week 12', 'Recovery', 'Zone 1'],
    segments: [
      {
        type: 'steady',
        duration: 1800,
        power: 0.55,
        messages: [
          { time: 10, text: 'Very easy recovery - let test results sink in' },
          { time: 900, text: 'Halfway - how much did you improve?' },
        ],
      },
    ],
  },

  'W12-D4-Thursday-Victory_Lap': {
    name: 'W12-Th: Victory Lap',
    description:
      '60min relaxed ride at your new FTP zones. Celebrate your gains!\n\n📊 50 TSS · IF 0.70',
    tags: ['Week 12', 'Celebration', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 3600,
        power: 0.7,
        messages: [
          { time: 10, text: 'Victory lap at your NEW improved zones!' },
          { time: 1800, text: 'Halfway - feel how much stronger you are' },
          { time: 3300, text: 'You did it - 12 weeks of hard work paid off!' },
        ],
      },
    ],
  },

  'W12-D6-Saturday-Celebration_Ride': {
    name: 'W12-S: Celebration Endurance',
    description:
      '120min easy celebration ride. Enjoy your fitness!\n\n💡 Consume 60-90g carbs/hr\n📊 98 TSS · IF 0.70',
    tags: ['Week 12', 'Celebration', 'Endurance', 'Zone 2'],
    segments: [
      {
        type: 'steady',
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Celebrate your 12-week journey!' },
          { time: 1800, text: '30 min - feeling strong' },
          { time: 3600, text: 'Halfway - reflect on your progress' },
          { time: 5400, text: "90 min - you're a stronger cyclist now!" },
          { time: 6900, text: 'Almost done - amazing work!' },
        ],
      },
    ],
  },

  'W12-D7-Sunday-Recovery': {
    name: 'W12-Su: Reflection & Planning',
    description:
      "Optional 30-45min easy spin. Reflect on your journey and plan what's next!\n\n🍖 Recovery nutrition focus\n📊 18 TSS · IF 0.45",
    tags: ['Week 12', 'Recovery', 'Zone 1', 'Optional', 'Final'],
    segments: [
      {
        type: 'steady',
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: 'Final ride - reflect on your journey' },
          { time: 1350, text: 'Halfway - what will you tackle next?' },
          { time: 2400, text: 'Congratulations on completing 12 weeks!' },
        ],
      },
    ],
  },
};

// If running directly with Node.js
if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = new URL('./zwo_files', import.meta.url).pathname;
  const imageDir = new URL('./images', import.meta.url).pathname;

  saveZWOFilesToDisk(outputDir, workouts);
  generateAllWorkoutImages(workouts, imageDir, 200);
}
