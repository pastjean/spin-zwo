import type { WorkoutDefinition } from "../../../lib/types.js";

export const week6Workouts: Record<string, WorkoutDefinition> = {
  "W06-D1-Tuesday-VO2max_LowCadence": {
    name: "W6-Tue: 4x4min Low Cadence",
    description: `Low cadence VO2max: 4 x 4min @ 110% @ 60rpm (3min recovery)

Neuromuscular + aerobic stress. Grind it out.

💡 Pre-load: Carbs 2-3hrs before`,

    tags: ["Week 6", "VO2max", "Low Cadence", "Strength"],
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
      // Interval 1
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        cadence: 60,
        messages: [
          { time: 10, text: "Interval 1/4 @ 110% @ 60rpm - Low cadence grind" },
          { time: 120, text: "Halfway - maintain cadence" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        cadence: 60,
        messages: [
          { time: 10, text: "Interval 2/4 @ 60rpm" },
          { time: 120, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        cadence: 60,
        messages: [
          { time: 10, text: "Interval 3/4 @ 60rpm - Stay strong" },
          { time: 120, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        cadence: 60,
        messages: [
          { time: 10, text: "Final interval 4/4 @ 60rpm!" },
          { time: 120, text: "Halfway - push through" },
          { time: 210, text: "30sec - finish!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.4, powerLow: 0.6 },
    ],
  },

  "W06-D2-Wednesday-Recovery_Easy": {
    name: "W6-Wed: Easy Recovery",
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.`,

    tags: ["Week 6", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 2700, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.55 },
    ],
  },

  "W06-D4-Friday-VO2max_Progressive_Mixed": {
    name: "W6-Fri: Progressive VO2max + Sprints",
    description: `Mixed VO2max: 3min @ 110% + 4min @ 110% + 5min @ 110% (3min recovery) + 2x1min @ 135% (2min recovery)

Peak week variety - sustained VO2max followed by explosive efforts. Total 14min Zone 3.

💡 Pre-load: Carbs 2-3hrs before`,

    tags: ["Week 6", "VO2max", "High Intensity", "Polarized", "Progressive", "Sprints"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Progressive intervals
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [
          { time: 10, text: "Interval 1/3 - 3min @ 110%" },
          { time: 90, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      {
        type: "steady",
        duration: 240,
        power: 1.1,
        messages: [
          { time: 10, text: "Interval 2/3 - 4min @ 110%" },
          { time: 120, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      {
        type: "steady",
        duration: 300,
        power: 1.1,
        messages: [
          { time: 10, text: "Interval 3/3 - 5min @ 110%" },
          { time: 150, text: "Halfway" },
          { time: 270, text: "30sec - finish strong!" },
        ],
      },
      {
        type: "steady",
        duration: 240,
        power: 0.6,
        messages: [{ time: 10, text: "Recovery - sprints coming!" }],
      },
      // Sprint efforts
      {
        type: "steady",
        duration: 60,
        power: 1.35,
        messages: [{ time: 5, text: "SPRINT! 1/2 - 1min @ 135%" }],
      },
      { type: "steady", duration: 120, power: 0.6 },
      {
        type: "steady",
        duration: 60,
        power: 1.35,
        messages: [{ time: 5, text: "Final SPRINT 2/2 - EXPLODE!" }],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.4, powerLow: 0.6 },
    ],
  },

  "W06-D5-Saturday-Easy_Z2": {
    name: "W6-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP`,
    tags: ["Week 6", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.7 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },

  "W06-D6-Sunday-Long_Endurance": {
    name: "W6-Sun: Long Endurance 135min",
    description: `135min long endurance @ 65-75% FTP

Volume building week. Stay patient.

💡 Consume 60g carbs/hr`,
    tags: ["Week 6", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 6900,
        power: 0.7,
        messages: [
          { time: 10, text: "Long steady Z2 - 135min today" },
          { time: 1800, text: "30min in" },
          { time: 3600, text: "1hr in - stay steady" },
          { time: 5400, text: "90min - final hour ahead" },
          { time: 6600, text: "Final 20min - stay consistent" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.68 },
    ],
  },
};
