import type { WorkoutDefinition } from "../../../lib/types.js";

export const week8Workouts: Record<string, WorkoutDefinition> = {
  "W08-D1-Tuesday-VO2max_Taper": {
    name: "W8-Tue: 30/30s Taper",
    description: `Taper volume micro-intervals: 2 sets of 6x30sec @ 120% / 30sec @ 50%

Taper week - reduced volume, maintain intensity.

💡 Pre-load: Carbs 2-3hrs before
📊 ~42 TSS · IF 0.76`,
    tags: ["Week 8", "VO2max", "Taper", "Micro-Intervals"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
        messages: [{ time: 10, text: "Easy warmup - taper week" }],
      },
      { type: "warmup", duration: 300, powerLow: 0.65, powerHigh: 0.75 },
      { type: "steady", duration: 180, power: 0.6 },
      // Set 1: 6x30/30
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Set 1/2 - Quality over quantity" }],
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
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval of set 1" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      // Recovery between sets
      { type: "steady", duration: 240, power: 0.5 },
      // Set 2: 6x30/30
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
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval - well done!" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W08-D2-Wednesday-Recovery_Easy": {
    name: "W8-Wed: Easy Recovery",
    description: `45min easy Z1 spin @ 50-60% FTP

Pure recovery ride.

📊 ~22 TSS · IF 0.55`,
    tags: ["Week 8", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 1800, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.5 },
    ],
  },

  "W08-D4-Friday-FTP_Test_20min": {
    name: "W8-Fri: FTP Test 20min",
    description: `FTP Test: 1 x 20min @ 100% (all-out effort)

Give everything you have. Your new FTP = avg power × 0.95

💡 Pre-load: Carbs 2-3hrs before
💡 Fully rested, well-fueled
📊 ~68 TSS · IF 0.95`,
    tags: ["Week 8", "FTP Test", "Testing", "Threshold"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [{ time: 10, text: "Progressive warmup for FTP test" }],
      },
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.7,
        powerHigh: 0.85,
      },
      {
        type: "steady",
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: "Easy spin - prepare mentally" }],
      },
      // Short opener
      {
        type: "steady",
        duration: 60,
        power: 1.0,
        messages: [{ time: 10, text: "1min opener - clear the legs" }],
      },
      {
        type: "steady",
        duration: 300,
        power: 0.6,
        messages: [{ time: 10, text: "Final recovery before test" }],
      },
      // 20min FTP Test
      {
        type: "steady",
        duration: 1200,
        power: 1.0,
        messages: [
          { time: 10, text: "FTP TEST - 20min ALL OUT! Start controlled" },
          { time: 300, text: "5min - settle into sustainable pace" },
          { time: 600, text: "10min - halfway! Hold steady" },
          { time: 900, text: "15min - final 5min, dig deep!" },
          { time: 1080, text: "2min - give everything!" },
          { time: 1170, text: "30sec - EMPTY THE TANK!" },
        ],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.6,
        powerLow: 0.4,
        messages: [{ time: 10, text: "Test complete! Record your average power" }],
      },
    ],
  },

  "W08-D4-Friday-FTP_Test_2x15min": {
    name: "W8-Fri: FTP Test 2x15min (Alternative)",
    description: `Alternative FTP Test: 2 x 15min @ 98% (2min recovery)

Less psychological stress. Average both intervals for FTP estimate.

💡 Pre-load: Carbs 2-3hrs before
📊 ~70 TSS · IF 0.92`,
    tags: ["Week 8", "FTP Test", "Testing", "Threshold", "Alternative"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      {
        type: "steady",
        duration: 60,
        power: 1.0,
        messages: [{ time: 10, text: "1min opener" }],
      },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 1
      {
        type: "steady",
        duration: 900,
        power: 0.98,
        messages: [
          { time: 10, text: "Test 1/2 - 15min @ 98%" },
          { time: 450, text: "Halfway through test 1" },
          { time: 870, text: "30sec - finish strong!" },
        ],
      },
      { type: "steady", duration: 120, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 900,
        power: 0.98,
        messages: [
          { time: 10, text: "Test 2/2 - Final 15min!" },
          { time: 450, text: "Halfway through test 2" },
          { time: 870, text: "30sec - empty the tank!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W08-D6-Sunday-Long_Endurance": {
    name: "W8-Sun: Long Endurance 105min",
    description: `105min long endurance @ 65-75% FTP

Taper week - reduced volume endurance ride.

💡 Consume 60g carbs/hr
📊 ~85 TSS · IF 0.70`,
    tags: ["Week 8", "Endurance", "Zone 2", "Taper"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      {
        type: "steady",
        duration: 5100,
        power: 0.70,
        messages: [
          { time: 10, text: "Easy endurance - taper week" },
          { time: 2550, text: "Halfway!" },
        ],
      },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },
};
