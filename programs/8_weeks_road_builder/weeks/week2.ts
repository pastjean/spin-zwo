import type { WorkoutDefinition } from '../../../lib/types.js';

export const week2Workouts: Record<string, WorkoutDefinition> = {
  'W02-D1-Tuesday-VO2max_40_20s': {
    name: 'W2-Tue: 40/20s',
    description: `Extended micro-intervals: 4 sets of 10x40sec @ 120% / 20sec @ 50%

Tabata-inspired protocol with longer work periods.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ['Week 2', 'VO2max', 'High Intensity', '40/20s'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
      },
      {
        type: 'warmup',
        duration: 300,
        powerLow: 0.65,
        powerHigh: 0.75,
      },
      { type: 'steady', duration: 180, power: 0.6 },
      // Set 1: 10x40/20
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 1/4 - 40/20s!' }],
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
        messages: [{ time: 5, text: 'Final interval of set 1!' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 240, power: 0.5 },
      // Set 2: 10x40/20
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 2/4' }],
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
      { type: 'steady', duration: 40, power: 1.2 },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 240, power: 0.5 },
      // Set 3: 10x40/20
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 3/4' }],
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
        messages: [{ time: 5, text: 'Final interval of set 3!' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'steady', duration: 240, power: 0.5 },
      // Set 4: 10x40/20
      {
        type: 'steady',
        duration: 40,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 4/4 - Final set!' }],
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
        messages: [{ time: 5, text: 'Final interval - finish strong!' }],
      },
      { type: 'steady', duration: 20, power: 0.5 },
      { type: 'cooldown', duration: 600, powerHigh: 0.3, powerLow: 0.5 },
    ],
  },

  'W02-D2-Wednesday-Recovery_Easy': {
    name: 'W2-Wed: Easy Recovery',
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.`,
    tags: ['Week 2', 'Recovery', 'Zone 1'],
    segments: [
      { type: 'warmup', duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: 'steady', duration: 2700, power: 0.55 },
      { type: 'cooldown', duration: 600, powerHigh: 0.5, powerLow: 0.55 },
    ],
  },

  'W02-D4-Friday-VO2max_Mixed': {
    name: 'W2-Fri: Mixed VO2max Protocol',
    description: `Mixed VO2max: 3 x (2min @ 108% + 30sec @ 130% sprint) + 2min recovery, then 2x2min @ 115% (3min recovery)

Combines sustained VO2max with explosive efforts. Total ~10min Zone 3 work.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ['Week 2', 'VO2max', 'High Intensity', 'Polarized', 'Mixed'],
    segments: [
      { type: 'warmup', duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: 'warmup', duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: 'steady', duration: 180, power: 0.6 },
      // Block 1: 2min @ 108% + 30sec @ 130%
      {
        type: 'steady',
        duration: 120,
        power: 1.08,
        messages: [{ time: 10, text: 'Interval 1/3 - 2min @ 108%' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 1.3,
        messages: [{ time: 5, text: 'SPRINT! 30sec @ 130%' }],
      },
      { type: 'steady', duration: 120, power: 0.6 },
      // Block 2: 2min @ 108% + 30sec @ 130%
      {
        type: 'steady',
        duration: 120,
        power: 1.08,
        messages: [{ time: 10, text: 'Interval 2/3 - 2min @ 108%' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 1.3,
        messages: [{ time: 5, text: 'SPRINT! @ 130%' }],
      },
      { type: 'steady', duration: 120, power: 0.6 },
      // Block 3: 2min @ 108% + 30sec @ 130%
      {
        type: 'steady',
        duration: 120,
        power: 1.08,
        messages: [{ time: 10, text: 'Interval 3/3 - 2min @ 108%' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 1.3,
        messages: [{ time: 5, text: 'Final SPRINT! @ 130%' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: 'Recovery before hard efforts' }],
      },
      // Hard Block 1: 2min @ 115%
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [
          { time: 10, text: 'Hard effort 1/2 - 2min @ 115%' },
          { time: 60, text: 'Halfway - hold on!' },
        ],
      },
      { type: 'steady', duration: 180, power: 0.6 },
      // Hard Block 2: 2min @ 115%
      {
        type: 'steady',
        duration: 120,
        power: 1.15,
        messages: [
          { time: 10, text: 'Final effort 2/2 - 2min @ 115%' },
          { time: 60, text: 'Halfway - finish strong!' },
          { time: 105, text: '15sec - empty the tank!' },
        ],
      },
      { type: 'cooldown', duration: 600, powerHigh: 0.4, powerLow: 0.6 },
    ],
  },

  'W02-D5-Saturday-Easy_Z2': {
    name: 'W2-Sat: Easy Z2 Ride',
    description: `60min easy endurance @ 65-75% FTP`,
    tags: ['Week 2', 'Endurance', 'Zone 2'],
    segments: [
      { type: 'warmup', duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: 'steady', duration: 2400, power: 0.7 },
      { type: 'cooldown', duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },

  'W02-D6-Sunday-Long_Endurance': {
    name: 'W2-Sun: Long Endurance 105min',
    description: `105min long endurance @ 65-75% FTP

Volume increase week.

💡 Consume 60g carbs/hr`,
    tags: ['Week 2', 'Endurance', 'Zone 2', 'Long Ride'],
    segments: [
      { type: 'warmup', duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: 'steady',
        duration: 5100,
        power: 0.7,
        messages: [
          { time: 10, text: 'Long steady Z2' },
          { time: 2550, text: 'Halfway!' },
        ],
      },
      { type: 'cooldown', duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },
};
