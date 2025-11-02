import type { WorkoutDefinition } from "../../../lib/types.js";

export const week6Workouts: Record<string, WorkoutDefinition> = {
  "W06-D1-Tuesday-VO2max_LowCadence": {
    name: "W6-Tue: 4x4min Low Cadence",
    description: `Low cadence VO2max: 4 x 4min @ 110% @ 60rpm (3min recovery)

Neuromuscular + aerobic stress. Grind it out.

💡 Pre-load: Carbs 2-3hrs before
📊 ~70 TSS · IF 0.83`,
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
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W06-D2-Wednesday-Recovery_Easy": {
    name: "W6-Wed: Easy Recovery",
    description: `60min easy Z1 spin @ 50-60% FTP

Pure recovery ride.

📊 ~30 TSS · IF 0.54`,
    tags: ["Week 6", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 2700, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.5 },
    ],
  },

  "W06-D4-Friday-Threshold_ExtendedOU": {
    name: "W6-Fri: Extended Over/Unders",
    description: `Extended over/unders: 2 x (5min @ 92% / 3min @ 102% / 5min @ 92%)

Lactate clearance with longer efforts.

💡 Pre-load: Carbs 2-3hrs before
📊 ~78 TSS · IF 0.83`,
    tags: ["Week 6", "Threshold", "Over/Unders", "Lactate Clearance"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 300,
        power: 0.92,
        messages: [{ time: 10, text: "Interval 1/2 - Under @ 92%" }],
      },
      {
        type: "steady",
        duration: 180,
        power: 1.02,
        messages: [{ time: 10, text: "Over @ 102% - Push!" }],
      },
      {
        type: "steady",
        duration: 300,
        power: 0.92,
        messages: [{ time: 10, text: "Back under @ 92% - Clear lactate" }],
      },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 300,
        power: 0.92,
        messages: [{ time: 10, text: "Interval 2/2 - Under @ 92%" }],
      },
      {
        type: "steady",
        duration: 180,
        power: 1.02,
        messages: [{ time: 10, text: "Final over @ 102%!" }],
      },
      {
        type: "steady",
        duration: 300,
        power: 0.92,
        messages: [{ time: 10, text: "Final under - hold it together" }],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W06-D5-Saturday-Easy_Z2": {
    name: "W6-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP

📊 ~46 TSS · IF 0.68`,
    tags: ["Week 6", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.70 },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },

  "W06-D6-Sunday-Long_Endurance": {
    name: "W6-Sun: Long Endurance 135min",
    description: `135min long endurance @ 65-75% FTP

Volume building week. Stay patient.

💡 Consume 60g carbs/hr
📊 ~108 TSS · IF 0.70`,
    tags: ["Week 6", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 6900,
        power: 0.70,
        messages: [
          { time: 10, text: "Long steady Z2 - 135min today" },
          { time: 1800, text: "30min in" },
          { time: 3600, text: "1hr in - stay steady" },
          { time: 5400, text: "90min - final hour ahead" },
          { time: 6600, text: "Final 20min - stay consistent" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },
};
