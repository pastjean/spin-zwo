import type { WorkoutDefinition } from "../../../lib/types.js";

export const week4Workouts: Record<string, WorkoutDefinition> = {
  "W04-D1-Tuesday-VO2max_Recovery": {
    name: "W4-Tue: 30/30s Recovery Volume",
    description: `Reduced volume micro-intervals: 2 sets of 8x30sec @ 120% / 30sec @ 50%

Recovery week - same intensity, less volume.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 4", "VO2max", "Recovery", "Micro-Intervals"],
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
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Set 1: 8x30/30
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [
          { time: 5, text: "Set 1/2 - Recovery week, quality over quantity" },
        ],
      },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval of set 1" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      // Recovery between sets
      { type: "steady", duration: 240, power: 0.5 },
      // Set 2: 8x30/30
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Set 2/2 - Final set" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval - done!" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.3,
        powerLow: 0.5,
        messages: [{ time: 10, text: "Recovery week complete" }],
      },
    ],
  },

  "W04-D2-Wednesday-Recovery_Easy": {
    name: "W4-Wed: Easy Recovery",
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.`,
    tags: ["Week 4", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 2700, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.55 },
    ],
  },

  "W04-D4-Friday-Threshold_SweetSpot": {
    name: "W4-Fri: Sweet Spot 2x12min",
    description: `Sweet spot intervals: 2 x 12min @ 88% (4min recovery)

Recovery week threshold work at moderate intensity.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 4", "Threshold", "Sweet Spot", "Recovery"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 720,
        power: 0.88,
        messages: [
          { time: 10, text: "Interval 1/2 @ 88% Sweet Spot" },
          { time: 360, text: "Halfway - steady effort" },
        ],
      },
      { type: "steady", duration: 240, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 720,
        power: 0.88,
        messages: [
          { time: 10, text: "Interval 2/2 - Final interval" },
          { time: 360, text: "Halfway" },
          { time: 690, text: "30sec - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.4, powerLow: 0.6 },
    ],
  },

  "W04-D5-Saturday-Easy_Z2": {
    name: "W4-Sat: Easy Z2 Ride (Reduced)",
    description: `45min easy endurance @ 65-75% FTP

Reduced volume for recovery week.`,
    tags: ["Week 4", "Endurance", "Zone 2", "Recovery"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 1500, power: 0.7 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },

  "W04-D6-Sunday-Long_Endurance": {
    name: "W4-Sun: Long Endurance 90min (Reduced)",
    description: `90min long endurance @ 65-75% FTP

Recovery week - reduced from 120min.

💡 Consume 60g carbs/hr`,
    tags: ["Week 4", "Endurance", "Zone 2", "Recovery"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 4200,
        power: 0.7,
        messages: [
          { time: 10, text: "Recovery week - enjoy the lighter load" },
          { time: 2100, text: "Halfway!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },
};
