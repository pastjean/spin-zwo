// 8-Week Road Builder - Polarized Training Program
// Progressive threshold loading + varied VO2max protocols

import { saveZWOFilesToDisk } from "../../lib/fileGenerator.js";
import { generateAllWorkoutImages } from "../../lib/imageGenerator.js";
import type { WorkoutDefinition } from "../../lib/types.js";

// Import all week modules
import { week1Workouts } from "./weeks/week1.js";
import { week2Workouts } from "./weeks/week2.js";
import { week3Workouts } from "./weeks/week3.js";
import { week4Workouts } from "./weeks/week4.js";
import { week5Workouts } from "./weeks/week5.js";
import { week6Workouts } from "./weeks/week6.js";
import { week7Workouts } from "./weeks/week7.js";
import { week8Workouts } from "./weeks/week8.js";

// Combine all workouts
export const workouts: Record<string, WorkoutDefinition> = {
  ...week1Workouts,
  ...week2Workouts,
  ...week3Workouts,
  ...week4Workouts,
  ...week5Workouts,
  ...week6Workouts,
  ...week7Workouts,
  ...week8Workouts,
};

// Generate ZWO files
console.log("Generating ZWO files for 8-Week Road Builder...");
await saveZWOFilesToDisk(
  "programs/8_weeks_road_builder/zwo_files",
  workouts
);

// Generate workout images
console.log("Generating workout images...");
await generateAllWorkoutImages(
  workouts,
  "programs/8_weeks_road_builder/images"
);

console.log("✅ 8-Week Road Builder generation complete!");
console.log(`📁 ZWO files: programs/8_weeks_road_builder/zwo_files/`);
console.log(`🖼️  Images: programs/8_weeks_road_builder/images/`);
