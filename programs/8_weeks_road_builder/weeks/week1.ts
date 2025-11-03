import type { WorkoutDefinition } from '../../../lib/types.js';

export const week1Workouts: Record<string, WorkoutDefinition> = {
  'W01-D1-Tuesday-VO2max_30_30s': {
    name: 'W1-Tue: 30/30s Introduction',
    description: `Micro-intervals: 4 sets of 8x30sec @ 120% / 30sec @ 50%

VO2max introduction using Billat protocol. Short bursts with equal recovery.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ['Week 1', 'VO2max', 'High Intensity', 'Micro-Intervals'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
        messages: [{ time: 10, text: 'Easy warmup - gradually building' }],
      },
      {
        type: 'warmup',
        duration: 300,
        powerLow: 0.65,
        powerHigh: 0.75,
        messages: [
          { time: 10, text: 'Continue building toward work intensity' },
        ],
      },
      {
        type: 'steady',
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: 'Easy spin before first set' }],
      },
      // Set 1: 8x30/30
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 1/3 - Interval 1/8 @ 120%' }],
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
        messages: [{ time: 5, text: 'Final interval of set 1' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: 'Set 1 complete - recovery' }],
      },
      // Recovery between sets
      { type: 'steady', duration: 240, power: 0.5 },
      // Set 2: 8x30/30
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 2/3 - Stay controlled' }],
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
        messages: [{ time: 5, text: 'Final interval of set 2' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: 'Set 2 complete - two more sets!' }],
      },
      // Recovery between sets
      { type: 'steady', duration: 240, power: 0.5 },
      // Set 3: 8x30/30
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 3/4 - Stay strong!' }],
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
        messages: [{ time: 5, text: 'Final interval of set 3' }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: 'Set 3 complete - one more set!' }],
      },
      // Recovery between sets
      { type: 'steady', duration: 240, power: 0.5 },
      // Set 4: 8x30/30
      {
        type: 'steady',
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: 'Set 4/4 - Final set, finish strong!' }],
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
        messages: [{ time: 5, text: "Final interval - you've got this!" }],
      },
      {
        type: 'steady',
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: 'All sets complete - great work!' }],
      },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.3,
        powerLow: 0.5,
        messages: [
          { time: 10, text: 'Easy cooldown - let the adaptation begin' },
        ],
      },
    ],
  },

  'W01-D2-Wednesday-Recovery_Easy': {
    name: 'W1-Wed: Easy Recovery',
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride. Conversational pace, very easy effort.`,
    tags: ['Week 1', 'Recovery', 'Zone 1', 'Easy'],
    segments: [
      {
        type: 'warmup',
        duration: 300,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: 'Very easy warmup' }],
      },
      {
        type: 'steady',
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: 'Easy recovery pace - stay relaxed' },
          { time: 1350, text: 'Halfway - keep it easy' },
        ],
      },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.5,
        powerLow: 0.55,
        messages: [{ time: 10, text: 'Easy finish' }],
      },
    ],
  },

  'W01-D4-Friday-Threshold_Cruise': {
    name: 'W1-Fri: Cruise Intervals 5x8min',
    description: `Threshold introduction: 5 x 8min @ 95% FTP (3min recovery)

Moderate threshold blocks to introduce sustained power work.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ['Week 1', 'Threshold', 'FTP', 'Cruise Intervals'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [{ time: 10, text: 'Progressive warmup' }],
      },
      {
        type: 'warmup',
        duration: 300,
        powerLow: 0.7,
        powerHigh: 0.85,
        messages: [{ time: 10, text: 'Building toward threshold' }],
      },
      {
        type: 'steady',
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: 'Easy spin before intervals' }],
      },
      // Interval 1
      {
        type: 'steady',
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: 'Interval 1/5 @ 95% - Settle in' },
          { time: 240, text: 'Halfway - smooth and steady' },
        ],
      },
      { type: 'steady', duration: 180, power: 0.6 },
      // Interval 2
      {
        type: 'steady',
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: 'Interval 2/5 - Same effort' },
          { time: 240, text: 'Halfway through interval 2' },
        ],
      },
      { type: 'steady', duration: 180, power: 0.6 },
      // Interval 3
      {
        type: 'steady',
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: 'Interval 3/5 - Stay focused' },
          { time: 240, text: 'Halfway - keep it steady' },
        ],
      },
      { type: 'steady', duration: 180, power: 0.6 },
      // Interval 4
      {
        type: 'steady',
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: 'Interval 4/5 - Two to go!' },
          { time: 240, text: "Halfway - you've got this!" },
        ],
      },
      { type: 'steady', duration: 180, power: 0.6 },
      // Interval 5
      {
        type: 'steady',
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: 'Final interval 5/5 - Finish strong!' },
          { time: 240, text: 'Halfway - push through!' },
          { time: 420, text: '1min left - give it everything!' },
        ],
      },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.4,
        powerLow: 0.6,
        messages: [{ time: 10, text: 'Great work! Easy cooldown' }],
      },
    ],
  },

  'W01-D5-Saturday-Easy_Z2': {
    name: 'W1-Sat: Easy Z2 Ride',
    description: `60min easy endurance @ 65-75% FTP

Zone 2 aerobic base building. Conversational pace.

💡 Consume 30g carbs/hr`,
    tags: ['Week 1', 'Endurance', 'Zone 2', 'Easy'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.68,
        messages: [{ time: 10, text: 'Easy warmup into Z2' }],
      },
      {
        type: 'steady',
        duration: 2400,
        power: 0.7,
        messages: [
          { time: 10, text: 'Zone 2 endurance - stay conversational' },
          { time: 1200, text: 'Halfway - feeling good' },
        ],
      },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.68,
        messages: [{ time: 10, text: 'Easy finish' }],
      },
    ],
  },

  'W01-D6-Sunday-Long_Endurance': {
    name: 'W1-Sun: Long Endurance 90min',
    description: `90min long endurance @ 65-75% FTP

Aerobic base development. Zone 2 steady ride.

💡 Consume 60g carbs/hr`,
    tags: ['Week 1', 'Endurance', 'Zone 2', 'Long Ride'],
    segments: [
      {
        type: 'warmup',
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.68,
        messages: [{ time: 10, text: 'Easy warmup into long ride' }],
      },
      {
        type: 'steady',
        duration: 4200,
        power: 0.7,
        messages: [
          { time: 10, text: 'Long steady Z2 - find your rhythm' },
          { time: 1200, text: '20min in - settle into the effort' },
          { time: 2400, text: 'Halfway! Keep it steady' },
          { time: 3600, text: 'Final 30min - stay consistent' },
        ],
      },
      {
        type: 'cooldown',
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.68,
        messages: [{ time: 10, text: 'Great endurance work!' }],
      },
    ],
  },
};
