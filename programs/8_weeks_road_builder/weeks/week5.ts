import type { WorkoutDefinition } from "../../../lib/types.js";

export const week5Workouts: Record<string, WorkoutDefinition> = {
  "W05-D1-Tuesday-VO2max_5x5min": {
    name: "W5-Tue: Max Aerobic Power 5x5min",
    description: `Extended Max Aerobic Power: 5 x 5min @ 108% (3min recovery)

Building VO2max endurance with extended efforts. Total 25min Zone 3 work.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 5", "VO2max", "High Intensity", "Polarized", "Endurance"],
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
        duration: 300,
        power: 1.08,
        messages: [
          { time: 10, text: "Interval 1/5 @ 108%" },
          { time: 150, text: "Halfway through interval 1" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 300,
        power: 1.08,
        messages: [
          { time: 10, text: "Interval 2/5" },
          { time: 150, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 300,
        power: 1.08,
        messages: [
          { time: 10, text: "Interval 3/5 - Stay controlled" },
          { time: 150, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 300,
        power: 1.08,
        messages: [
          { time: 10, text: "Interval 4/5 - Keep pushing" },
          { time: 150, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 5
      {
        type: "steady",
        duration: 300,
        power: 1.08,
        messages: [
          { time: 10, text: "Final interval 5/5!" },
          { time: 150, text: "Halfway - finish strong" },
          { time: 270, text: "30sec - you've got this!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.4, powerLow: 0.6 },
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
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.55 },
    ],
  },

  "W05-D4-Friday-VO2max_Surges": {
    name: "W5-Fri: VO2max + Surges",
    description: `VO2max with surges: 4 x (6min @ 106% + 1min @ 120%)

Trains sustained VO2max power with surge response. Total 24min Zone 3 work.

💡 Pre-load: Carbs 2-3hrs before`,
    tags: ["Week 5", "VO2max", "High Intensity", "Polarized", "Surges", "Race Simulation"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 360,
        power: 1.06,
        messages: [
          { time: 10, text: "Interval 1/4 @ 106% - Prepare for surge" },
          { time: 180, text: "Halfway - surge coming" },
        ],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.2,
        messages: [{ time: 10, text: "SURGE! 1min @ 120%" }],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 360,
        power: 1.06,
        messages: [
          { time: 10, text: "Interval 2/4 @ 106%" },
          { time: 180, text: "Halfway" },
        ],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.2,
        messages: [{ time: 10, text: "SURGE! @ 120%" }],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 360,
        power: 1.06,
        messages: [
          { time: 10, text: "Interval 3/4 @ 106%" },
          { time: 180, text: "Halfway" },
        ],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.2,
        messages: [{ time: 10, text: "SURGE! @ 120%" }],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 360,
        power: 1.06,
        messages: [
          { time: 10, text: "Final interval 4/4 @ 106%" },
          { time: 180, text: "Halfway - final surge coming!" },
        ],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.2,
        messages: [{ time: 10, text: "Final SURGE! - Give it everything!" }],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.4, powerLow: 0.6 },
    ],
  },

  "W05-D5-Saturday-Easy_Z2": {
    name: "W5-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP`,
    tags: ["Week 5", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.7 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
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
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },
};
