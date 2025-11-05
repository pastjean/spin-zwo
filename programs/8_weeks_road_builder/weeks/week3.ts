import type { WorkoutDefinition } from "../../../lib/types.js";

export const week3Workouts: Record<string, WorkoutDefinition> = {
  "W03-D1-Tuesday-VO2max_4x4min": {
    name: "W3-Tue: 4x4min Seiler Protocol",
    description: `Classic VO2max intervals: 4 x 4min @ 110% (3min recovery)

Seiler protocol - sustained VO2max efforts.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 3", "VO2max", "High Intensity", "Seiler Protocol"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
        messages: [{ time: 10, text: "Easy warmup" }],
      },
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.65,
        powerHigh: 0.75,
        messages: [{ time: 10, text: "Building intensity" }],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        messages: [
          { time: 10, text: "Interval 1/4 @ 110% - Settle in" },
          { time: 120, text: "Halfway through interval 1" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        messages: [
          { time: 10, text: "Interval 2/4 - Stay controlled" },
          { time: 120, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        messages: [
          { time: 10, text: "Interval 3/4 - Keep pushing" },
          { time: 120, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        messages: [
          { time: 10, text: "Final interval 4/4!" },
          { time: 120, text: "Halfway - finish strong!" },
          { time: 210, text: "30sec - push through!" },
        ],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.4,
        powerLow: 0.6,
        messages: [{ time: 10, text: "Excellent work! Cool down" }],
      },
    ],
  },

  "W03-D2-Wednesday-Recovery_Easy": {
    name: "W3-Wed: Easy Recovery",
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.`,
    tags: ["Week 3", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 2700, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.55 },
    ],
  },

  "W03-D4-Friday-VO2max_40_20s": {
    name: "W3-Fri: VO2max 40/20s",
    description: `VO2max micro-intervals: 3 sets x 10x40sec @ 115% / 20sec @ 50%

Contrasts with Tuesday's sustained efforts. Total 20min Zone 3 work.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 3", "VO2max", "High Intensity", "Polarized", "Micro-Intervals"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Set 1: 10x40/20
      {
        type: "steady",
        duration: 40,
        power: 1.15,
        messages: [{ time: 5, text: "Set 1/3 - 40/20s" }],
      },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      {
        type: "steady",
        duration: 40,
        power: 1.15,
        messages: [{ time: 5, text: "Final interval of set 1" }],
      },
      { type: "steady", duration: 20, power: 0.5 },
      // Recovery
      {
        type: "steady",
        duration: 240,
        power: 0.5,
        messages: [{ time: 10, text: "Set 1 complete - recovery" }],
      },
      // Set 2: 10x40/20
      {
        type: "steady",
        duration: 40,
        power: 1.15,
        messages: [{ time: 5, text: "Set 2/3" }],
      },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      {
        type: "steady",
        duration: 40,
        power: 1.15,
        messages: [{ time: 5, text: "Final interval of set 2" }],
      },
      { type: "steady", duration: 20, power: 0.5 },
      // Recovery
      {
        type: "steady",
        duration: 240,
        power: 0.5,
        messages: [{ time: 10, text: "Set 2 complete - one more!" }],
      },
      // Set 3: 10x40/20
      {
        type: "steady",
        duration: 40,
        power: 1.15,
        messages: [{ time: 5, text: "Set 3/3 - Final set!" }],
      },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.15 },
      { type: "steady", duration: 20, power: 0.5 },
      {
        type: "steady",
        duration: 40,
        power: 1.15,
        messages: [{ time: 5, text: "Final interval - done!" }],
      },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "cooldown", duration: 600, powerHigh: 0.4, powerLow: 0.6 },
    ],
  },

  "W03-D5-Saturday-Easy_Z2": {
    name: "W3-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP`,
    tags: ["Week 3", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.7 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },

  "W03-D6-Sunday-Long_Endurance": {
    name: "W3-Sun: Long Endurance 120min",
    description: `120min long endurance @ 65-75% FTP

Building volume. Zone 2 steady state.

💡 Consume 60g carbs/hr`,
    tags: ["Week 3", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 6000,
        power: 0.7,
        messages: [
          { time: 10, text: "Long steady Z2 - settle in" },
          { time: 1800, text: "30min in - find your rhythm" },
          { time: 3600, text: "Halfway! Looking good" },
          { time: 5400, text: "Final 30min - stay consistent" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },
};
