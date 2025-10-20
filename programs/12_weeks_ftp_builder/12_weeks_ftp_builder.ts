// FTP Builder Complete 12-Week ZWO File Generator (TypeScript)
// Generates all workouts for the complete 12-week FTP builder plan
// For local Node.js execution only - saves ZWO files to local filesystem

import { saveZWOFilesToDisk } from "../../lib/fileGenerator.js";
import type { WorkoutDefinition } from "../../lib/types.js";

// Define all workouts for 12 weeks
export const workouts: Record<string, WorkoutDefinition> = {
  // ============ WEEK 1 ============
  "W01-D2-Tuesday-FTP_Test": {
    name: "W1-T: FTP Test",
    description:
      "Initial FTP assessment test. Warm up progressively, then give maximum sustainable effort for 20 minutes. Your average power × 0.95 = your FTP.",
    tags: ["Week 1", "FTP Test", "Assessment"],
    segments: [
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.5,
        powerHigh: 0.6,
        messages: [{ time: 10, text: "Start easy and gradually build" }],
      },
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.75,
        messages: [{ time: 60, text: "Continue building intensity" }],
      },
      {
        type: "steady",
        duration: 300,
        power: 0.5,
        messages: [{ time: 10, text: "Easy spinning to prepare for openers" }],
      },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Opener 1/3 - Hard but controlled" }],
      },
      { type: "steady", duration: 120, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Opener 2/3 - Same intensity" }],
      },
      { type: "steady", duration: 120, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Opener 3/3 - Prepare for test" }],
      },
      {
        type: "steady",
        duration: 300,
        power: 0.5,
        messages: [
          { time: 10, text: "Final recovery - prepare mentally" },
          { time: 240, text: "Get ready for 20-min FTP test!" },
        ],
      },
      {
        type: "steady",
        duration: 1200,
        power: 1.0,
        messages: [
          {
            time: 10,
            text: "FTP TEST! Maximum sustainable effort for 20 minutes",
          },
          { time: 300, text: "5 min down - settle into rhythm" },
          { time: 600, text: "Halfway! Stay strong and steady" },
          { time: 900, text: "5 min to go - dig deep!" },
          { time: 1080, text: "Final 2 minutes - everything you have!" },
        ],
      },
      {
        type: "cooldown",
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [
          { time: 10, text: "Great job! Cool down easy" },
          { time: 300, text: "Calculate: 20-min avg power × 0.95 = FTP" },
        ],
      },
    ],
  },

  "W01-D3-Wednesday-Recovery": {
    name: "W1-W: Active Recovery",
    description:
      "Easy recovery spin. Very light effort to promote blood flow and recovery.",
    tags: ["Week 1", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.6,
        messages: [
          { time: 10, text: "Easy recovery pace - completely conversational" },
          { time: 1350, text: "Halfway - stay relaxed" },
          { time: 2400, text: "Almost done - enjoy the easy ride" },
        ],
      },
    ],
  },

  "W01-D4-Thursday-Tempo": {
    name: "W1-Th: Tempo Building",
    description:
      "3 x 10-minute tempo intervals at 85% FTP. Focus on smooth, sustainable power.",
    tags: ["Week 1", "Tempo", "Zone 3"],
    segments: [
      {
        type: "warmup",
        duration: 900,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [
          { time: 10, text: "Gradual warmup to prepare for tempo work" },
          { time: 600, text: "Feeling loose and ready" },
        ],
      },
      {
        type: "steady",
        duration: 600,
        power: 0.85,
        messages: [
          { time: 10, text: "Tempo 1/3 - Comfortably hard effort" },
          { time: 300, text: "Halfway through - stay smooth" },
          { time: 540, text: "Final minute - maintain form" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 600,
        power: 0.85,
        messages: [
          { time: 10, text: "Tempo 2/3 - Same steady effort" },
          { time: 300, text: "Halfway - focus on breathing" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 600,
        power: 0.85,
        messages: [
          { time: 10, text: "Final tempo 3/3 - finish strong" },
          { time: 300, text: "Halfway through final interval" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W01-D6-Saturday-Endurance": {
    name: "W1-S: Base Endurance",
    description:
      "90-minute endurance ride with short accelerations to build aerobic base.",
    tags: ["Week 1", "Endurance", "Zone 2"],
    segments: [
      {
        type: "steady",
        duration: 1200,
        power: 0.7,
        messages: [{ time: 10, text: "Settle into steady endurance pace" }],
      },
      {
        type: "steady",
        duration: 30,
        power: 0.9,
        messages: [{ time: 5, text: "Acceleration 1/6" }],
      },
      { type: "steady", duration: 1170, power: 0.7 },
      {
        type: "steady",
        duration: 30,
        power: 0.9,
        messages: [{ time: 5, text: "Acceleration 2/6" }],
      },
      { type: "steady", duration: 1170, power: 0.7 },
      {
        type: "steady",
        duration: 30,
        power: 0.9,
        messages: [{ time: 5, text: "Acceleration 3/6" }],
      },
      { type: "steady", duration: 1170, power: 0.7 },
      {
        type: "steady",
        duration: 30,
        power: 0.9,
        messages: [{ time: 5, text: "Acceleration 4/6" }],
      },
      { type: "steady", duration: 1170, power: 0.7 },
      {
        type: "steady",
        duration: 30,
        power: 0.9,
        messages: [{ time: 5, text: "Acceleration 5/6" }],
      },
      { type: "steady", duration: 1170, power: 0.7 },
      {
        type: "steady",
        duration: 30,
        power: 0.9,
        messages: [{ time: 5, text: "Final acceleration 6/6" }],
      },
      {
        type: "steady",
        duration: 600,
        power: 0.7,
        messages: [{ time: 300, text: "Final minutes - well done" }],
      },
    ],
  },

  "W01-D7-Sunday-Recovery": {
    name: "W1-Su: Active Recovery",
    description: "Optional 30-45 minute easy recovery spin.",
    tags: ["Week 1", "Recovery", "Zone 1-2", "Optional"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.6,
        messages: [
          { time: 10, text: "Very easy optional recovery - Zone 1-2" },
          { time: 1350, text: "Halfway - stay relaxed" },
          { time: 2400, text: "Almost done - enjoy the easy ride" },
        ],
      },
    ],
  },

  // ============ WEEK 2 ============
  "W02-D2-Tuesday-Sweet_Spot": {
    name: "W2-T: Sweet Spot",
    description:
      "2 x 15-minute sweet spot intervals at 90% FTP. Build aerobic power.",
    tags: ["Week 2", "Sweet Spot", "Zone 4"],
    segments: [
      {
        type: "warmup",
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [
          { time: 10, text: "Progressive warmup for sweet spot work" },
          { time: 1080, text: "Almost ready for sweet spot efforts" },
        ],
      },
      {
        type: "steady",
        duration: 900,
        power: 0.9,
        messages: [
          {
            time: 10,
            text: "Sweet Spot 1/2 - Moderately hard but sustainable",
          },
          { time: 450, text: "Halfway through first interval" },
          { time: 840, text: "Final minute - stay focused" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 900,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 2/2 - Same strong effort" },
          { time: 450, text: "Halfway - you've got this" },
          { time: 840, text: "Last minute - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W02-D3-Wednesday-Recovery": {
    name: "W2-W: Recovery Spin",
    description: "Easy 45-minute recovery with short accelerations.",
    tags: ["Week 2", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 420,
        power: 0.6,
        messages: [{ time: 10, text: "Easy recovery pace" }],
      },
      {
        type: "steady",
        duration: 15,
        power: 0.8,
        messages: [{ time: 5, text: "Short acceleration 1/6" }],
      },
      { type: "steady", duration: 405, power: 0.6 },
      {
        type: "steady",
        duration: 15,
        power: 0.8,
        messages: [{ time: 5, text: "Short acceleration 2/6" }],
      },
      { type: "steady", duration: 405, power: 0.6 },
      {
        type: "steady",
        duration: 15,
        power: 0.8,
        messages: [{ time: 5, text: "Short acceleration 3/6" }],
      },
      { type: "steady", duration: 405, power: 0.6 },
      {
        type: "steady",
        duration: 15,
        power: 0.8,
        messages: [{ time: 5, text: "Short acceleration 4/6" }],
      },
      { type: "steady", duration: 405, power: 0.6 },
      {
        type: "steady",
        duration: 15,
        power: 0.8,
        messages: [{ time: 5, text: "Short acceleration 5/6" }],
      },
      { type: "steady", duration: 405, power: 0.6 },
      {
        type: "steady",
        duration: 15,
        power: 0.8,
        messages: [{ time: 5, text: "Final acceleration 6/6" }],
      },
      { type: "steady", duration: 195, power: 0.6 },
    ],
  },

  "W02-D4-Thursday-FTP_Intervals": {
    name: "W2-Th: FTP Intervals 4x8",
    description:
      "4 x 8-minute FTP intervals at 100% FTP. Direct threshold training.",
    tags: ["Week 2", "FTP", "Threshold", "Zone 4"],
    segments: [
      {
        type: "warmup",
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 900, text: "Preparing for threshold efforts" }],
      },
      {
        type: "steady",
        duration: 480,
        power: 1,
        messages: [
          { time: 10, text: "FTP 1/4 - Threshold power" },
          { time: 240, text: "Halfway - stay steady" },
        ],
      },
      { type: "steady", duration: 240, power: 0.55 },
      {
        type: "steady",
        duration: 480,
        power: 1,
        messages: [
          { time: 10, text: "FTP 2/4 - Maintain same power" },
          { time: 240, text: "Halfway through second" },
        ],
      },
      { type: "steady", duration: 240, power: 0.55 },
      {
        type: "steady",
        duration: 480,
        power: 1,
        messages: [
          { time: 10, text: "FTP 3/4 - Two more to go" },
          { time: 240, text: "Halfway - you're doing great" },
        ],
      },
      { type: "steady", duration: 240, power: 0.55 },
      {
        type: "steady",
        duration: 480,
        power: 1,
        messages: [
          { time: 10, text: "Final FTP 4/4 - dig deep!" },
          { time: 240, text: "Halfway through final interval" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W02-D6-Saturday-Tempo_Endurance": {
    name: "W2-S: Tempo Endurance",
    description: "3 x 15-minute tempo intervals. Extended tempo work.",
    tags: ["Week 2", "Tempo", "Zone 3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 900,
        power: 0.85,
        messages: [
          { time: 10, text: "Tempo 1/3 - 15 minutes steady" },
          { time: 450, text: "Halfway through first" },
        ],
      },
      { type: "steady", duration: 120, power: 0.6 },
      {
        type: "steady",
        duration: 900,
        power: 0.85,
        messages: [
          { time: 10, text: "Tempo 2/3 - Same effort" },
          { time: 450, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 120, power: 0.6 },
      {
        type: "steady",
        duration: 900,
        power: 0.85,
        messages: [
          { time: 10, text: "Final tempo 3/3" },
          { time: 450, text: "Halfway - finish strong" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W02-D7-Sunday-Long_Endurance": {
    name: "W2-Su: Long Endurance",
    description: "2-hour steady endurance ride. Build aerobic capacity.",
    tags: ["Week 2", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      {
        type: "steady",
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 10, text: "Long steady ride - stay comfortable" },
          { time: 1800, text: "30 min - settle in for the long haul" },
          { time: 3600, text: "Halfway! Keep it steady" },
          { time: 5400, text: "90 min - final 30 minutes" },
          { time: 6900, text: "Almost done - strong finish" },
        ],
      },
    ],
  },

  // ============ WEEK 3 ============
  "W03-D2-Tuesday-Over_Unders": {
    name: "W3-T: Over/Unders",
    description:
      "3 x (4min@95% + 4min@105%) Over/Under intervals. Teaches lactate clearance.",
    tags: ["Week 3", "Over/Under", "Lactate Clearance", "Zone 4-5"],
    segments: [
      {
        type: "warmup",
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: "Get ready for challenging efforts" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Block 1: Under phase - 95% FTP" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Block 1: Over phase - 105% FTP" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Block 2: Under phase" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Block 2: Over phase" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Final block: Under phase" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Final over phase - dig deep!" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W03-D3-Wednesday-Recovery": {
    name: "W3-W: Active Recovery",
    description: "Easy 45-minute recovery spin.",
    tags: ["Week 3", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.6,
        messages: [
          { time: 10, text: "Easy recovery pace" },
          { time: 1350, text: "Halfway - stay relaxed" },
        ],
      },
    ],
  },

  "W03-D4-Thursday-Extended_Threshold": {
    name: "W3-Th: Extended Threshold",
    description: "2 x 20-minute FTP intervals. Building threshold endurance.",
    tags: ["Week 3", "FTP", "Threshold", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 1200,
        power: 1,
        messages: [
          { time: 10, text: "FTP 1/2 - 20 minutes at threshold" },
          { time: 600, text: "Halfway through first interval" },
          { time: 1140, text: "Final minute - stay strong" },
        ],
      },
      { type: "steady", duration: 600, power: 0.55 },
      {
        type: "steady",
        duration: 1200,
        power: 1,
        messages: [
          { time: 10, text: "FTP 2/2 - Final 20 minutes" },
          { time: 600, text: "Halfway - dig deep" },
          { time: 1140, text: "Last minute - everything you have!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W03-D6-Saturday-Sweet_Spot_Progression": {
    name: "W3-S: Sweet Spot 3x20",
    description:
      "3 x 20-minute sweet spot intervals. Extended sweet spot work.",
    tags: ["Week 3", "Sweet Spot", "Zone 4"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 1/3 - 20 minutes" },
          { time: 600, text: "Halfway through first" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 2/3" },
          { time: 600, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: "Final Sweet Spot 3/3" },
          { time: 600, text: "Halfway - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W03-D7-Sunday-Endurance_Tempo": {
    name: "W3-Su: Endurance with Tempo",
    description: "90-minute endurance ride with embedded tempo efforts.",
    tags: ["Week 3", "Endurance", "Tempo", "Zone 2-3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 720,
        power: 0.7,
        messages: [{ time: 10, text: "Steady endurance pace" }],
      },
      {
        type: "steady",
        duration: 180,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 1/4" }],
      },
      { type: "steady", duration: 720, power: 0.7 },
      {
        type: "steady",
        duration: 180,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 2/4" }],
      },
      { type: "steady", duration: 720, power: 0.7 },
      {
        type: "steady",
        duration: 180,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 3/4" }],
      },
      { type: "steady", duration: 720, power: 0.7 },
      {
        type: "steady",
        duration: 180,
        power: 0.85,
        messages: [{ time: 10, text: "Final tempo burst 4/4" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  // ============ WEEK 4 (RECOVERY) ============
  "W04-D2-Tuesday-Recovery_Cadence": {
    name: "W4-T: Recovery Cadence",
    description:
      "Easy 60-minute recovery with cadence drills. Focus on technique.",
    tags: ["Week 4", "Recovery", "Cadence", "Zone 1-2"],
    segments: [
      {
        type: "steady",
        duration: 600,
        power: 0.65,
        messages: [
          { time: 10, text: "Easy recovery pace - focus on smooth pedaling" },
          { time: 540, text: "Prepare for first cadence drill" },
        ],
      },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 1/5 - aim for 100+ RPM" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 2/5 - high RPM, smooth" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 3/5 - stay relaxed" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [
          { time: 10, text: "Cadence drill 4/5 - efficient pedaling" },
        ],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Final cadence drill 5/5" }],
      },
      {
        type: "steady",
        duration: 1095,
        power: 0.65,
        messages: [{ time: 900, text: "Recovery ride complete" }],
      },
    ],
  },

  "W04-D4-Thursday-Light_Tempo": {
    name: "W4-Th: Light Tempo",
    description: "Easy 50-minute ride with light tempo effort.",
    tags: ["Week 4", "Recovery", "Easy Tempo", "Zone 2-3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.65 },
      {
        type: "steady",
        duration: 1200,
        power: 0.8,
        messages: [{ time: 10, text: "Light tempo - not too hard" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W04-D6-Saturday-Easy_Endurance": {
    name: "W4-S: Relaxed Endurance",
    description: "75-minute easy endurance ride. No structure, just enjoy.",
    tags: ["Week 4", "Recovery", "Endurance", "Zone 2"],
    segments: [
      {
        type: "steady",
        duration: 4500,
        power: 0.68,
        messages: [
          { time: 10, text: "Easy endurance - no structured intervals" },
          { time: 2250, text: "Halfway - keep it relaxed" },
          { time: 4200, text: "Almost done - enjoy the ride" },
        ],
      },
    ],
  },

  "W04-D7-Sunday-Recovery": {
    name: "W4-Su: Active Recovery",
    description: "Optional 30-45 minute rest or very easy spin.",
    tags: ["Week 4", "Recovery", "Zone 1", "Optional"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: "Optional rest day - very easy if riding" },
          { time: 1350, text: "Halfway - recovery week, stay easy" },
          { time: 2400, text: "Almost done - great recovery week!" },
        ],
      },
    ],
  },

  // ============ WEEK 5 ============
  "W05-D2-Tuesday-Extended_Sweet_Spot": {
    name: "W5-T: Extended Sweet Spot",
    description: "2 x 20-minute sweet spot intervals at 90% FTP.",
    tags: ["Week 5", "Sweet Spot", "Extended", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 1/2 - 20 minutes strong" },
          { time: 600, text: "Halfway through first interval" },
          { time: 1140, text: "Final minute of first" },
        ],
      },
      { type: "steady", duration: 480, power: 0.55 },
      {
        type: "steady",
        duration: 1200,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 2/2 - final 20 minutes" },
          { time: 600, text: "Halfway through final interval" },
          { time: 1140, text: "Last minute - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 720, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W05-D3-Wednesday-Recovery": {
    name: "W5-W: Recovery Spin",
    description: "Easy 45-minute recovery.",
    tags: ["Week 5", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.6,
        messages: [
          { time: 10, text: "Easy recovery pace" },
          { time: 1350, text: "Halfway - stay easy" },
        ],
      },
    ],
  },

  "W05-D4-Thursday-Progressive_Threshold": {
    name: "W5-Th: Progressive Threshold",
    description: "3 x 12-minute FTP intervals at 100% FTP.",
    tags: ["Week 5", "FTP", "Progressive", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 720,
        power: 1,
        messages: [
          { time: 10, text: "FTP 1/3 - 12 minutes at threshold" },
          { time: 360, text: "Halfway through first" },
        ],
      },
      { type: "steady", duration: 360, power: 0.55 },
      {
        type: "steady",
        duration: 720,
        power: 1,
        messages: [
          { time: 10, text: "FTP 2/3 - maintain that power" },
          { time: 360, text: "Halfway through second" },
        ],
      },
      { type: "steady", duration: 360, power: 0.55 },
      {
        type: "steady",
        duration: 720,
        power: 1,
        messages: [
          { time: 10, text: "Final FTP 3/3 - 12 minutes to glory" },
          { time: 360, text: "Halfway through final interval" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W05-D6-Saturday-Tempo_Endurance_Long": {
    name: "W5-S: Extended Tempo Endurance",
    description: "100-minute ride with 3 x 18-minute tempo intervals.",
    tags: ["Week 5", "Tempo", "Endurance", "Zone 3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: "Tempo 1/3 - 18 minutes" },
          { time: 540, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 240, power: 0.6 },
      {
        type: "steady",
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: "Tempo 2/3" },
          { time: 540, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 240, power: 0.6 },
      {
        type: "steady",
        duration: 1080,
        power: 0.85,
        messages: [
          { time: 10, text: "Final tempo 3/3" },
          { time: 540, text: "Halfway - strong finish!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W05-D7-Sunday-Long_Endurance": {
    name: "W5-Su: Long Endurance",
    description: "2-hour steady endurance ride.",
    tags: ["Week 5", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      {
        type: "steady",
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 1800, text: "30 min in" },
          { time: 3600, text: "Halfway!" },
          { time: 5400, text: "90 min - final 30 minutes" },
        ],
      },
    ],
  },

  // ============ WEEK 6 ============
  "W06-D2-Tuesday-Over_Unders_Extended": {
    name: "W6-T: Extended Over/Unders",
    description:
      "4 x (4min@95% + 4min@105%) Over/Under intervals. More volume than Week 3.",
    tags: ["Week 6", "Over/Under", "Zone 4-5"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Block 1: Under phase" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Block 1: Over phase" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Block 2: Under phase" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Block 2: Over phase" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Block 3: Under phase" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Block 3: Over phase" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 240,
        power: 0.95,
        messages: [{ time: 10, text: "Block 4: Final under phase" }],
      },
      {
        type: "steady",
        duration: 240,
        power: 1.05,
        messages: [{ time: 10, text: "Block 4: Final over - dig deep!" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W06-D3-Wednesday-Recovery": {
    name: "W6-W: Recovery Spin",
    description: "Easy 45-minute recovery.",
    tags: ["Week 6", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.6,
        messages: [{ time: 1350, text: "Halfway - stay relaxed" }],
      },
    ],
  },

  "W06-D4-Thursday-FTP_25_20": {
    name: "W6-Th: FTP 25+20",
    description:
      "25-minute + 20-minute FTP intervals. Building threshold endurance.",
    tags: ["Week 6", "FTP", "Threshold", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 1500,
        power: 1,
        messages: [
          { time: 10, text: "FTP 1: 25 minutes at threshold" },
          { time: 750, text: "Halfway through 25-min effort" },
          { time: 1440, text: "Final minute - stay strong" },
        ],
      },
      {
        type: "steady",
        duration: 600,
        power: 0.55,
        messages: [{ time: 10, text: "Good recovery before final interval" }],
      },
      {
        type: "steady",
        duration: 1200,
        power: 1,
        messages: [
          { time: 10, text: "FTP 2: 20 minutes - dig deep" },
          { time: 600, text: "Halfway through final interval" },
          { time: 1140, text: "Last minute - everything you have!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W06-D6-Saturday-Sweet_Spot_3x22": {
    name: "W6-S: Sweet Spot 3x22",
    description: "3 x 22-minute sweet spot intervals. Extended progression.",
    tags: ["Week 6", "Sweet Spot", "Zone 4"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 1/3 - 22 minutes" },
          { time: 660, text: "Halfway through first" },
          { time: 1260, text: "Final minute" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 2/3" },
          { time: 660, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: "Final Sweet Spot 3/3" },
          { time: 660, text: "Halfway - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W06-D7-Sunday-Long_Endurance": {
    name: "W6-Su: Long Endurance",
    description: "2.5-hour steady endurance ride.",
    tags: ["Week 6", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      {
        type: "steady",
        duration: 9000,
        power: 0.7,
        messages: [
          { time: 1800, text: "30 min in" },
          { time: 3600, text: "1 hour down" },
          { time: 4500, text: "Halfway!" },
          { time: 7200, text: "2 hours - final 30 minutes" },
          { time: 8700, text: "Almost done!" },
        ],
      },
    ],
  },

  // ============ WEEK 7 ============
  "W07-D2-Tuesday-VO2max_Intro": {
    name: "W7-T: VO2max Introduction",
    description:
      "5 x 3-minute VO2max intervals at 110% FTP. High intensity work.",
    tags: ["Week 7", "VO2max", "Zone 5"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 1/5 - hard but controlled" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 2/5" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 3/5 - halfway done" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 4/5" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "Final VO2max 5/5 - dig deep!" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W07-D3-Wednesday-Recovery": {
    name: "W7-W: Recovery Spin",
    description: "Easy 45-minute recovery.",
    tags: ["Week 7", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.6,
        messages: [{ time: 1350, text: "Halfway - stay easy" }],
      },
    ],
  },

  "W07-D4-Thursday-FTP_30min": {
    name: "W7-Th: Continuous Threshold 30min",
    description: "30-minute continuous FTP effort. Peak threshold endurance.",
    tags: ["Week 7", "FTP", "Threshold", "Zone 4"],
    segments: [
      {
        type: "warmup",
        duration: 1200,
        powerLow: 0.5,
        powerHigh: 0.75,
        messages: [{ time: 1080, text: "Get ready for 30-min threshold" }],
      },
      {
        type: "steady",
        duration: 1800,
        power: 1,
        messages: [
          { time: 10, text: "30 minutes at FTP - stay steady" },
          { time: 600, text: "10 min - settle into rhythm" },
          { time: 900, text: "15 min - halfway!" },
          { time: 1200, text: "20 min - two-thirds done" },
          { time: 1500, text: "25 min - final 5 minutes!" },
          { time: 1740, text: "Last minute - finish strong!" },
        ],
      },
      {
        type: "cooldown",
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: "Outstanding 30-min threshold!" }],
      },
    ],
  },

  "W07-D6-Saturday-Sweet_Spot_3x25": {
    name: "W7-S: Sweet Spot 3x25",
    description: "3 x 25-minute sweet spot intervals. Peak sweet spot volume.",
    tags: ["Week 7", "Sweet Spot", "Zone 4"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 1/3 - 25 minutes" },
          { time: 750, text: "Halfway through first" },
          { time: 1440, text: "Final minute of first" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 2/3 - stay strong" },
          { time: 750, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1500,
        power: 0.9,
        messages: [
          { time: 10, text: "Final Sweet Spot 3/3" },
          { time: 750, text: "Halfway - dig deep!" },
          { time: 1440, text: "Final minute - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W07-D7-Sunday-Endurance_Tempo": {
    name: "W7-Su: Endurance with Tempo",
    description: "2-hour ride with embedded tempo efforts.",
    tags: ["Week 7", "Endurance", "Tempo", "Zone 2-3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      { type: "steady", duration: 900, power: 0.7 },
      {
        type: "steady",
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 1/5" }],
      },
      { type: "steady", duration: 900, power: 0.7 },
      {
        type: "steady",
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 2/5" }],
      },
      { type: "steady", duration: 900, power: 0.7 },
      {
        type: "steady",
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 3/5" }],
      },
      { type: "steady", duration: 900, power: 0.7 },
      {
        type: "steady",
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo burst 4/5" }],
      },
      { type: "steady", duration: 900, power: 0.7 },
      {
        type: "steady",
        duration: 300,
        power: 0.85,
        messages: [{ time: 10, text: "Final tempo burst 5/5" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  // ============ WEEK 8 (RECOVERY) ============
  "W08-D2-Tuesday-Recovery_Cadence": {
    name: "W8-T: Recovery Cadence",
    description: "Easy 60-minute recovery with cadence drills.",
    tags: ["Week 8", "Recovery", "Cadence", "Zone 1-2"],
    segments: [
      {
        type: "steady",
        duration: 600,
        power: 0.65,
        messages: [{ time: 540, text: "Prepare for first cadence drill" }],
      },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 1/5 - aim for 100+ RPM" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 2/5" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 3/5" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Cadence drill 4/5" }],
      },
      { type: "steady", duration: 180, power: 0.65 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Final cadence drill 5/5" }],
      },
      { type: "steady", duration: 1095, power: 0.65 },
    ],
  },

  "W08-D4-Thursday-Light_Tempo": {
    name: "W8-Th: Light Tempo",
    description: "Easy 50-minute ride with light tempo.",
    tags: ["Week 8", "Recovery", "Easy Tempo", "Zone 2-3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.65 },
      { type: "steady", duration: 1200, power: 0.8 },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W08-D6-Saturday-Easy_Endurance": {
    name: "W8-S: Relaxed Endurance",
    description: "75-minute easy endurance ride.",
    tags: ["Week 8", "Recovery", "Endurance", "Zone 2"],
    segments: [
      {
        type: "steady",
        duration: 4500,
        power: 0.68,
        messages: [
          { time: 2250, text: "Halfway - keep it relaxed" },
          { time: 4200, text: "Almost done" },
        ],
      },
    ],
  },

  "W08-D7-Sunday-Recovery": {
    name: "W8-Su: Active Recovery",
    description: "Optional 30-45 minute rest or very easy spin.",
    tags: ["Week 8", "Recovery", "Zone 1", "Optional"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: "Optional rest - recovery week" },
          { time: 1350, text: "Halfway - stay easy" },
          { time: 2400, text: "Good recovery - ready for final block!" },
        ],
      },
    ],
  },

  // ============ WEEK 9 ============
  "W09-D2-Tuesday-Sweet_Spot_2x22": {
    name: "W9-T: Sweet Spot 2x22",
    description: "2 x 22-minute sweet spot intervals.",
    tags: ["Week 9", "Sweet Spot", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 1/2 - 22 minutes" },
          { time: 660, text: "Halfway through first" },
        ],
      },
      { type: "steady", duration: 480, power: 0.55 },
      {
        type: "steady",
        duration: 1320,
        power: 0.9,
        messages: [
          { time: 10, text: "Sweet Spot 2/2 - final 22 minutes" },
          { time: 660, text: "Halfway through final interval" },
        ],
      },
      { type: "cooldown", duration: 720, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W09-D3-Wednesday-Recovery": {
    name: "W9-W: Recovery Spin",
    description: "Easy 45-minute recovery.",
    tags: ["Week 9", "Recovery", "Zone 1"],
    segments: [{ type: "steady", duration: 2700, power: 0.6 }],
  },

  "W09-D4-Thursday-FTP_3x15": {
    name: "W9-Th: FTP Intervals 3x15",
    description: "3 x 15-minute FTP intervals.",
    tags: ["Week 9", "FTP", "Threshold", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 900,
        power: 1,
        messages: [
          { time: 10, text: "FTP 1/3 - 15 minutes at threshold" },
          { time: 450, text: "Halfway through first" },
        ],
      },
      { type: "steady", duration: 360, power: 0.55 },
      {
        type: "steady",
        duration: 900,
        power: 1,
        messages: [
          { time: 10, text: "FTP 2/3" },
          { time: 450, text: "Halfway" },
        ],
      },
      { type: "steady", duration: 360, power: 0.55 },
      {
        type: "steady",
        duration: 900,
        power: 1,
        messages: [
          { time: 10, text: "Final FTP 3/3" },
          { time: 450, text: "Halfway - finish strong!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W09-D6-Saturday-Tempo_Endurance": {
    name: "W9-S: Tempo Endurance",
    description: "100-minute ride with 3 x 18-minute tempo intervals.",
    tags: ["Week 9", "Tempo", "Endurance", "Zone 3"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 1080,
        power: 0.85,
        messages: [{ time: 540, text: "Halfway" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      {
        type: "steady",
        duration: 1080,
        power: 0.85,
        messages: [{ time: 540, text: "Halfway" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      {
        type: "steady",
        duration: 1080,
        power: 0.85,
        messages: [{ time: 540, text: "Halfway - strong finish!" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W09-D7-Sunday-Long_Endurance": {
    name: "W9-Su: Long Endurance",
    description: "2-hour steady endurance ride.",
    tags: ["Week 9", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      {
        type: "steady",
        duration: 7200,
        power: 0.7,
        messages: [
          { time: 3600, text: "Halfway!" },
          { time: 5400, text: "90 min - final stretch" },
        ],
      },
    ],
  },

  // ============ WEEK 10 ============
  "W10-D2-Tuesday-Over_Unders_4x": {
    name: "W10-T: Over/Unders 4x",
    description: "4 x (4min@95% + 4min@105%) Over/Under intervals.",
    tags: ["Week 10", "Over/Under", "Zone 4-5"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      { type: "steady", duration: 240, power: 0.95 },
      { type: "steady", duration: 240, power: 1.05 },
      { type: "steady", duration: 300, power: 0.55 },
      { type: "steady", duration: 240, power: 0.95 },
      { type: "steady", duration: 240, power: 1.05 },
      { type: "steady", duration: 300, power: 0.55 },
      { type: "steady", duration: 240, power: 0.95 },
      { type: "steady", duration: 240, power: 1.05 },
      { type: "steady", duration: 300, power: 0.55 },
      { type: "steady", duration: 240, power: 0.95 },
      { type: "steady", duration: 240, power: 1.05 },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W10-D3-Wednesday-Recovery": {
    name: "W10-W: Recovery Spin",
    description: "Easy 45-minute recovery.",
    tags: ["Week 10", "Recovery", "Zone 1"],
    segments: [{ type: "steady", duration: 2700, power: 0.6 }],
  },

  "W10-D4-Thursday-FTP_2x25": {
    name: "W10-Th: FTP 2x25",
    description: "2 x 25-minute FTP intervals. Peak threshold work.",
    tags: ["Week 10", "FTP", "Threshold", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 1500,
        power: 1,
        messages: [
          { time: 10, text: "FTP 1/2 - 25 minutes at threshold" },
          { time: 750, text: "Halfway through first" },
          { time: 1440, text: "Final minute" },
        ],
      },
      { type: "steady", duration: 600, power: 0.55 },
      {
        type: "steady",
        duration: 1500,
        power: 1,
        messages: [
          { time: 10, text: "FTP 2/2 - final 25 minutes" },
          { time: 750, text: "Halfway - dig deep!" },
          { time: 1440, text: "Last minute - everything you have!" },
        ],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W10-D6-Saturday-Sweet_Spot_3x25": {
    name: "W10-S: Sweet Spot 3x25",
    description:
      "3 x 25-minute sweet spot intervals. Maximum sweet spot volume.",
    tags: ["Week 10", "Sweet Spot", "Zone 4"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 1500,
        power: 0.9,
        messages: [{ time: 750, text: "Halfway through first" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1500,
        power: 0.9,
        messages: [{ time: 750, text: "Halfway" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 1500,
        power: 0.9,
        messages: [{ time: 750, text: "Halfway - finish strong!" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W10-D7-Sunday-Long_Endurance": {
    name: "W10-Su: Long Endurance",
    description: "2.5-hour steady endurance ride.",
    tags: ["Week 10", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      {
        type: "steady",
        duration: 9000,
        power: 0.7,
        messages: [
          { time: 3600, text: "1 hour down" },
          { time: 4500, text: "Halfway!" },
          { time: 7200, text: "2 hours - final 30 minutes" },
        ],
      },
    ],
  },

  // ============ WEEK 11 ============
  "W11-D2-Tuesday-VO2max_6x3": {
    name: "W11-T: VO2max 6x3",
    description: "6 x 3-minute VO2max intervals at 110% FTP.",
    tags: ["Week 11", "VO2max", "Zone 5"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 1/6" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 2/6" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 3/6" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 4/6" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "VO2max 5/6" }],
      },
      { type: "steady", duration: 180, power: 0.55 },
      {
        type: "steady",
        duration: 180,
        power: 1.1,
        messages: [{ time: 10, text: "Final VO2max 6/6 - dig deep!" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W11-D3-Wednesday-Recovery": {
    name: "W11-W: Recovery Spin",
    description: "Easy 45-minute recovery.",
    tags: ["Week 11", "Recovery", "Zone 1"],
    segments: [{ type: "steady", duration: 2700, power: 0.6 }],
  },

  "W11-D4-Thursday-FTP_35min": {
    name: "W11-Th: Continuous Threshold 35min",
    description:
      "35-minute continuous FTP effort. Maximum threshold endurance.",
    tags: ["Week 11", "FTP", "Threshold", "Zone 4"],
    segments: [
      { type: "warmup", duration: 1200, powerLow: 0.5, powerHigh: 0.75 },
      {
        type: "steady",
        duration: 2100,
        power: 1,
        messages: [
          { time: 10, text: "35 minutes at FTP - your longest threshold!" },
          { time: 600, text: "10 min in" },
          { time: 1050, text: "Halfway!" },
          { time: 1500, text: "25 min - 10 to go!" },
          { time: 1800, text: "30 min - final 5 minutes!" },
          { time: 2040, text: "Last minute - finish strong!" },
        ],
      },
      {
        type: "cooldown",
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: "AMAZING 35-min threshold!" }],
      },
    ],
  },

  "W11-D6-Saturday-Mixed_Intervals": {
    name: "W11-S: Mixed Intensity",
    description: "90-minute ride with mixed tempo and threshold efforts.",
    tags: ["Week 11", "Mixed", "Zone 3-4"],
    segments: [
      { type: "warmup", duration: 900, powerLow: 0.5, powerHigh: 0.7 },
      {
        type: "steady",
        duration: 600,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo 1" }],
      },
      { type: "steady", duration: 180, power: 0.6 },
      {
        type: "steady",
        duration: 480,
        power: 1,
        messages: [{ time: 10, text: "Threshold 1" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      {
        type: "steady",
        duration: 600,
        power: 0.85,
        messages: [{ time: 10, text: "Tempo 2" }],
      },
      { type: "steady", duration: 180, power: 0.6 },
      {
        type: "steady",
        duration: 480,
        power: 1,
        messages: [{ time: 10, text: "Threshold 2" }],
      },
      { type: "steady", duration: 240, power: 0.6 },
      {
        type: "steady",
        duration: 600,
        power: 0.85,
        messages: [{ time: 10, text: "Final tempo" }],
      },
      { type: "cooldown", duration: 900, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W11-D7-Sunday-Endurance": {
    name: "W11-Su: Steady Endurance",
    description: "2-hour steady endurance ride.",
    tags: ["Week 11", "Endurance", "Zone 2"],
    segments: [
      {
        type: "steady",
        duration: 7200,
        power: 0.7,
        messages: [{ time: 3600, text: "Halfway!" }],
      },
    ],
  },

  // ============ WEEK 12 (FINAL TEST & TAPER) ============
  "W12-D2-Tuesday-Final_FTP_Test": {
    name: "W12-T: Final FTP Test",
    description:
      "Final FTP test to measure your improvement. Compare to Week 1!",
    tags: ["Week 12", "FTP Test", "Final Assessment"],
    segments: [
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.5,
        powerHigh: 0.6,
        messages: [{ time: 10, text: "Final FTP test warmup" }],
      },
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.75 },
      { type: "steady", duration: 300, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Opener 1/3 - feeling strong!" }],
      },
      { type: "steady", duration: 120, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Opener 2/3" }],
      },
      { type: "steady", duration: 120, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 1.1,
        messages: [{ time: 10, text: "Final opener - show your improvement!" }],
      },
      {
        type: "steady",
        duration: 300,
        power: 0.5,
        messages: [{ time: 240, text: "Time to see your gains!" }],
      },
      {
        type: "steady",
        duration: 1200,
        power: 1,
        messages: [
          { time: 10, text: "FINAL FTP TEST! Show what you've built!" },
          { time: 300, text: "5 min - settle in strong" },
          { time: 600, text: "Halfway - how does this feel vs Week 1?" },
          { time: 900, text: "5 min left - time to prove your fitness!" },
          { time: 1080, text: "Final 2 min - everything you've gained!" },
          { time: 1170, text: "30 seconds - FINISH STRONG!" },
        ],
      },
      {
        type: "cooldown",
        duration: 900,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [
          { time: 10, text: "CONGRATULATIONS! 12 weeks complete!" },
          { time: 300, text: "Compare to Week 1 - celebrate your progress!" },
        ],
      },
    ],
  },

  "W12-D3-Wednesday-Easy_Spin": {
    name: "W12-W: Easy Recovery",
    description: "Very easy 30-minute spin. Recovery from test.",
    tags: ["Week 12", "Recovery", "Zone 1"],
    segments: [
      {
        type: "steady",
        duration: 1800,
        power: 0.55,
        messages: [
          {
            time: 10,
            text: "Very easy recovery - let the test results sink in",
          },
        ],
      },
    ],
  },

  "W12-D4-Thursday-Victory_Lap": {
    name: "W12-Th: Victory Lap",
    description:
      "60-minute relaxed ride at your new FTP zones. Celebrate your gains!",
    tags: ["Week 12", "Celebration", "Zone 2"],
    segments: [
      {
        type: "steady",
        duration: 3600,
        power: 0.7,
        messages: [
          { time: 10, text: "Victory lap at your NEW improved zones!" },
          { time: 1800, text: "Halfway - feel how much stronger you are" },
          { time: 3300, text: "You did it - 12 weeks of hard work paid off!" },
        ],
      },
    ],
  },

  "W12-D6-Saturday-Celebration_Ride": {
    name: "W12-S: Celebration Endurance",
    description: "90-minute easy celebration ride. Enjoy your fitness!",
    tags: ["Week 12", "Celebration", "Endurance", "Zone 2"],
    segments: [
      {
        type: "steady",
        duration: 5400,
        power: 0.68,
        messages: [
          { time: 10, text: "Celebrate your 12-week journey!" },
          { time: 2700, text: "Halfway - reflect on your progress" },
          { time: 5100, text: "You're a stronger cyclist now!" },
        ],
      },
    ],
  },

  "W12-D7-Sunday-Recovery": {
    name: "W12-Su: Reflection & Planning",
    description: "Optional 30-45 minute easy spin. Reflect on your journey and plan what's next!",
    tags: ["Week 12", "Recovery", "Zone 1", "Optional", "Final"],
    segments: [
      {
        type: "steady",
        duration: 2700,
        power: 0.55,
        messages: [
          { time: 10, text: "Final ride of the program - reflect on your journey" },
          { time: 1350, text: "Halfway - what will you tackle next?" },
          { time: 2400, text: "Congratulations on completing 12 weeks!" },
        ],
      },
    ],
  },
};

// If running directly with Node.js
if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = new URL("./zwo_files", import.meta.url).pathname;
  saveZWOFilesToDisk(outputDir, workouts);
}
