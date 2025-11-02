import type { WorkoutDefinition } from "../../../lib/types.js";

export const week7Workouts: Record<string, WorkoutDefinition> = {
  "W07-D1-Tuesday-VO2max_Mixed": {
    name: "W7-Tue: Mixed VO2max Protocol",
    description: `Mixed protocol: 2 x (8x40/20 @ 120% + 3min @ 110%)

Combines micro-intervals with sustained VO2max.

💡 Pre-load: Carbs 2-3hrs before
📊 ~78 TSS · IF 0.86`,
    tags: ["Week 7", "VO2max", "High Intensity", "Mixed Protocol"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
        messages: [{ time: 10, text: "Easy warmup" }],
      },
      { type: "warmup", duration: 300, powerLow: 0.65, powerHigh: 0.75 },
      { type: "steady", duration: 180, power: 0.6 },
      // Set 1: 8x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 1 - 40/20s" }] },
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
      // 3min sustained @ 110%
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [
          { time: 10, text: "Now 3min sustained @ 110%" },
          { time: 90, text: "Halfway through sustained effort" },
        ],
      },
      { type: "steady", duration: 300, power: 0.5 },
      // Set 2: 8x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 2 - Final 40/20s" }] },
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
      // Final 3min sustained @ 110%
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [
          { time: 10, text: "Final 3min sustained @ 110%!" },
          { time: 90, text: "Halfway" },
          { time: 150, text: "30sec - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W07-D2-Wednesday-Recovery_Easy": {
    name: "W7-Wed: Easy Recovery",
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.

📊 ~30 TSS · IF 0.54`,
    tags: ["Week 7", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 2700, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.5 },
    ],
  },

  "W07-D4-Friday-Threshold_LowCadence": {
    name: "W7-Fri: 2x20min Low Cadence (PEAK)",
    description: `PEAK workout: 2 x 20min @ 88% @ 65rpm (5min recovery)

Low cadence threshold - maximum durability stress.

💡 Pre-load: Carbs 2-3hrs before
📊 ~85 TSS · IF 0.82`,
    tags: ["Week 7", "Threshold", "Low Cadence", "PEAK", "Durability"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 1200,
        power: 0.88,
        cadence: 65,
        messages: [
          { time: 10, text: "Interval 1/2 - 20min @ 88% @ 65rpm" },
          { time: 300, text: "5min in - settle into the grind" },
          { time: 600, text: "Halfway through interval 1" },
          { time: 900, text: "15min done - 5min to go" },
        ],
      },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 1200,
        power: 0.88,
        cadence: 65,
        messages: [
          { time: 10, text: "Interval 2/2 - Final 20min!" },
          { time: 300, text: "5min in - stay strong" },
          { time: 600, text: "Halfway - you've got this" },
          { time: 900, text: "15min done - final 5min!" },
          { time: 1170, text: "30sec - finish!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W07-D5-Saturday-Easy_Z2": {
    name: "W7-Sat: Easy Z2 Ride (Extended)",
    description: `75min easy endurance @ 65-75% FTP

Extended Saturday ride - peak week volume.

💡 Consume 30g carbs/hr
📊 ~58 TSS · IF 0.68`,
    tags: ["Week 7", "Endurance", "Zone 2", "PEAK"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 3300, power: 0.70, messages: [{ time: 1650, text: "Halfway!" }] },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },

  "W07-D6-Sunday-Long_Endurance": {
    name: "W7-Sun: Long Endurance 150min (PEAK)",
    description: `150min long endurance @ 65-75% FTP - PEAK VOLUME

Maximum aerobic stress. Take nutrition seriously.

💡 Consume 60g carbs/hr
📊 ~120 TSS · IF 0.70`,
    tags: ["Week 7", "Endurance", "Zone 2", "Long Ride", "PEAK"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 7800,
        power: 0.70,
        messages: [
          { time: 10, text: "150min peak ride - stay patient" },
          { time: 1800, text: "30min - settle in for the long haul" },
          { time: 3600, text: "1hr - fuel regularly" },
          { time: 5400, text: "90min - halfway done!" },
          { time: 7200, text: "2hrs - final 30min ahead" },
          { time: 7500, text: "Final 20min - you've got this!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },
};
