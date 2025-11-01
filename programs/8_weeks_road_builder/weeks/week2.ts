import type { WorkoutDefinition } from "../../../lib/types.js";

export const week2Workouts: Record<string, WorkoutDefinition> = {
  "W02-D1-Tuesday-VO2max_40_20s": {
    name: "W2-Tue: 40/20s",
    description: `Extended micro-intervals: 3 sets of 10x40sec @ 120% / 20sec @ 50%

Tabata-inspired protocol with longer work periods.

💡 Pre-load: Carbs 2-3hrs before
📊 ~72 TSS · IF 0.84`,
    tags: ["Week 2", "VO2max", "High Intensity", "40/20s"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
      },
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.65,
        powerHigh: 0.75,
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Set 1: 10x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 1/3 - 40/20s!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Final interval of set 1!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 240, power: 0.5 },
      // Set 2: 10x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 2/3" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 240, power: 0.5 },
      // Set 3: 10x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 3/3 - Final set!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Final interval - finish strong!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W02-D2-Wednesday-Recovery_Easy": {
    name: "W2-Wed: Easy Recovery",
    description: `45min easy Z1 spin @ 50-60% FTP

Pure recovery ride.

📊 ~22 TSS · IF 0.55`,
    tags: ["Week 2", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 1800, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.5 },
    ],
  },

  "W02-D4-Friday-Threshold_OverUnders": {
    name: "W2-Fri: Over/Unders",
    description: `Sweet Spot Over/Unders: 3 x (3min @ 95% / 2min @ 105% / 3min @ 95%)

Lactate clearance training with oscillating intensity.

💡 Pre-load: Carbs 2-3hrs before
📊 ~75 TSS · IF 0.82`,
    tags: ["Week 2", "Threshold", "Over/Unders", "Lactate Clearance"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Interval 1/3 - Under @ 95%" }] },
      { type: "steady", duration: 120, power: 1.05, messages: [{ time: 10, text: "Over @ 105% - push!" }] },
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Back under @ 95%" }] },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 2
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Interval 2/3" }] },
      { type: "steady", duration: 120, power: 1.05 },
      { type: "steady", duration: 180, power: 0.95 },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 3
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Interval 3/3 - Final one!" }] },
      { type: "steady", duration: 120, power: 1.05, messages: [{ time: 10, text: "Final over - push hard!" }] },
      { type: "steady", duration: 180, power: 0.95 },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W02-D5-Saturday-Easy_Z2": {
    name: "W2-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP

📊 ~46 TSS · IF 0.68`,
    tags: ["Week 2", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.70 },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },

  "W02-D6-Sunday-Long_Endurance": {
    name: "W2-Sun: Long Endurance 105min",
    description: `105min long endurance @ 65-75% FTP

Volume increase week.

💡 Consume 60g carbs/hr
📊 ~85 TSS · IF 0.70`,
    tags: ["Week 2", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 5100, power: 0.70, messages: [
        { time: 10, text: "Long steady Z2" },
        { time: 2550, text: "Halfway!" },
      ] },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },
};
