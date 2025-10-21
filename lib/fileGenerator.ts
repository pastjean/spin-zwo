// ZWO File Generation Module

import { createZWOString, type WorkoutDefinition } from "./types.js";
import { formatMetricsForDescription } from "./metrics.js";
import * as fs from "node:fs";
import * as path from "node:path";

// Function to generate all ZWO files
export function generateAllZWOFiles(
  workouts: Record<string, WorkoutDefinition>
): Record<string, string> {
  const files: Record<string, string> = {};

  Object.keys(workouts).forEach((workoutKey) => {
    const workout = workouts[workoutKey];
    const zwoContent = createZWOString(
      workout.name,
      `workout.description, ${formatMetricsForDescription(workout.segments)}`,
      workout.tags,
      workout.segments
    );

    files[`${workoutKey}.zwo`] = zwoContent;
  });

  return files;
}

// Function to save ZWO files to local filesystem
export function saveZWOFilesToDisk(
  outputDir: string,
  workouts: Record<string, WorkoutDefinition>
): Record<string, string> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const files = generateAllZWOFiles(workouts);

  Object.keys(files).forEach((filename) => {
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, files[filename], "utf8");
    console.log(`Created: ${filepath}`);
  });

  console.log(
    `\nGenerated ${Object.keys(files).length} ZWO files in ${outputDir}/`
  );
  return files;
}
