import type { WorkoutDefinition } from "../../../lib/types.js";

export const week5Workouts: Record<string, WorkoutDefinition> = {
  "W05-D1-Tuesday-Threshold_5x8min": {
    name: "W5-Tue: Sub-Threshold 5x8min",
    description: `Extended threshold intervals: 5 x 8min @ 95% (3min recovery)

Building threshold durability with longer intervals.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 5", "Threshold", "FTP", "Durability"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [{ time: 10, text: "Progressive warmup" }],
      },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 1/5 @ 95%" },
          { time: 240, text: "Halfway through interval 1" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 2/5" },
          { time: 240, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 3/5 - Stay steady" },
          { time: 240, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 4/5 - Keep pushing" },
          { time: 240, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 5
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: "Final interval 5/5!" },
          { time: 240, text: "Halfway - finish strong" },
          { time: 450, text: "30sec - you've got this!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W05-D2-Wednesday-Recovery_Easy": {
    name: "W5-Wed: Easy Recovery",
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.`,
    tags: ["Week 5", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 2700, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.5 },
    ],
  },

  "W05-D4-Friday-Threshold_Surges": {
    name: "W5-Fri: Threshold + Surges",
    description: `Threshold with surges: 4 x (8min @ 95% + 1min @ 110%)

Trains sustained power with surge response.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 5", "Threshold", "Surges", "Race Simulation"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 1/4 @ 95% - Prepare for surge" },
        ],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "SURGE! 1min @ 110%" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [{ time: 10, text: "Interval 2/4 @ 95%" }],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "SURGE! @ 110%" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [{ time: 10, text: "Interval 3/4 @ 95%" }],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "SURGE! @ 110%" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 480,
        power: 0.95,
        messages: [{ time: 10, text: "Final interval 4/4 @ 95%" }],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Final SURGE! - Give it everything!" }],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W05-D5-Saturday-Easy_Z2": {
    name: "W5-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP`,
    tags: ["Week 5", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.7 },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },

  "W05-D6-Sunday-Long_Endurance": {
    name: "W5-Sun: Long Endurance 120min",
    description: `120min long endurance @ 65-75% FTP

Building aerobic base.

💡 Consume 60g carbs/hr`,
    tags: ["Week 5", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 6000,
        power: 0.7,
        messages: [
          { time: 10, text: "Long steady Z2" },
          { time: 1800, text: "30min in" },
          { time: 3600, text: "Halfway!" },
          { time: 5400, text: "Final 30min" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },
};
