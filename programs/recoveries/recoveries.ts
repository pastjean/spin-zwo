import { saveZWOFilesToDisk } from "../../lib/fileGenerator.js";
import { generateAllWorkoutImages } from "../../lib/imageGenerator.js";
import type { WorkoutDefinition } from "../../lib/types.js";

// Define all workouts for 12 weeks
export const workouts: Record<string, WorkoutDefinition> = {
  "BONUS-Recovery_Variation_A": {
    name: "BONUS: Short Bursts Recovery",
    description:
      "Active recovery with short varied intensity bursts. Use this as an alternative to any Wednesday recovery ride.",
    tags: ["Bonus", "Recovery", "Active Recovery", "Zone 1", "Variation A"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: "Bonus recovery workout - short bursts" }],
      },
      { type: "steady", duration: 180, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Light burst 1/6" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Burst 2/6" }],
      },
      { type: "steady", duration: 180, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.8,
        messages: [{ time: 10, text: "Burst 3/6 - moderate" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.8,
        messages: [{ time: 10, text: "Burst 4/6" }],
      },
      { type: "steady", duration: 180, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Burst 5/6 - easing down" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Final burst 6/6" }],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.45,
        messages: [{ time: 10, text: "Great active recovery!" }],
      },
    ],
  },

  "BONUS-Recovery_Variation_B": {
    name: "BONUS: Pyramid Recovery",
    description:
      "Recovery ride with pyramid structure. Builds up and down in intensity. Alternative recovery workout.",
    tags: ["Bonus", "Recovery", "Active Recovery", "Zone 1", "Variation B"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: "Bonus recovery - pyramid structure" }],
      },
      { type: "steady", duration: 120, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Pyramid up - level 1" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.75,
        messages: [{ time: 10, text: "Level 2" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.8,
        messages: [{ time: 10, text: "Peak - level 3" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.75,
        messages: [{ time: 10, text: "Pyramid down - level 2" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Level 1" }],
      },
      { type: "steady", duration: 120, power: 0.5 },
      // Second pyramid
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Second pyramid - level 1" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.75,
        messages: [{ time: 10, text: "Level 2" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.8,
        messages: [{ time: 10, text: "Peak again" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.75,
        messages: [{ time: 10, text: "Coming down" }],
      },
      { type: "steady", duration: 60, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Final level" }],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.45,
        messages: [{ time: 10, text: "Pyramid complete - well done!" }],
      },
    ],
  },

  "BONUS-Recovery_Variation_C": {
    name: "BONUS: High Cadence Recovery",
    description:
      "Recovery focused on high cadence technique. Perfect for developing smooth pedaling. Alternative recovery workout.",
    tags: [
      "Bonus",
      "Recovery",
      "Cadence",
      "Technique",
      "Zone 1",
      "Variation C",
    ],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: "Bonus recovery - cadence focus" }],
      },
      { type: "steady", duration: 300, power: 0.55 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [
          { time: 10, text: "High cadence 1/5 - 100+ RPM, light gear" },
        ],
      },
      { type: "steady", duration: 120, power: 0.55 },
      {
        type: "steady",
        duration: 120,
        power: 0.75,
        messages: [{ time: 10, text: "High cadence 2/5 - 95-100 RPM" }],
      },
      { type: "steady", duration: 120, power: 0.55 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "High cadence 3/5 - 100+ RPM" }],
      },
      { type: "steady", duration: 120, power: 0.55 },
      {
        type: "steady",
        duration: 120,
        power: 0.75,
        messages: [{ time: 10, text: "High cadence 4/5 - stay smooth" }],
      },
      { type: "steady", duration: 120, power: 0.55 },
      {
        type: "steady",
        duration: 120,
        power: 0.7,
        messages: [{ time: 10, text: "Final cadence 5/5 - perfect circles" }],
      },
      {
        type: "cooldown",
        duration: 900,
        powerHigh: 0.55,
        powerLow: 0.45,
        messages: [{ time: 10, text: "Excellent technique work!" }],
      },
    ],
  },

  "BONUS-Recovery_Variation_D": {
    name: "BONUS: Fun Recovery Ride",
    description:
      "Playful recovery with random bursts. Keeps recovery interesting and engaging. Alternative recovery workout.",
    tags: ["Bonus", "Recovery", "Active Recovery", "Zone 1", "Variation D"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: "Bonus recovery - fun and playful!" }],
      },
      { type: "steady", duration: 240, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 0.8,
        messages: [{ time: 5, text: "Quick burst!" }],
      },
      { type: "steady", duration: 270, power: 0.5 },
      {
        type: "steady",
        duration: 45,
        power: 0.75,
        messages: [{ time: 5, text: "Medium burst" }],
      },
      { type: "steady", duration: 315, power: 0.5 },
      {
        type: "steady",
        duration: 20,
        power: 0.85,
        messages: [{ time: 5, text: "Short punch!" }],
      },
      { type: "steady", duration: 280, power: 0.5 },
      {
        type: "steady",
        duration: 60,
        power: 0.7,
        messages: [{ time: 10, text: "Longer easy burst" }],
      },
      { type: "steady", duration: 240, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 0.8,
        messages: [{ time: 5, text: "Another quick one!" }],
      },
      { type: "steady", duration: 270, power: 0.5 },
      {
        type: "steady",
        duration: 40,
        power: 0.75,
        messages: [{ time: 5, text: "Mix it up" }],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.45,
        messages: [{ time: 10, text: "Fun recovery complete!" }],
      },
    ],
  },
};

// If running directly with Node.js
if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = new URL("./zwo_files", import.meta.url).pathname;
  const imageDir = new URL("./images", import.meta.url).pathname;

  saveZWOFilesToDisk(outputDir, workouts);
  generateAllWorkoutImages(workouts, imageDir, 200); // Using 200W as reference FTP for visualization
}
