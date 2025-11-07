// generate-all.ts

import { generateCalendarImage } from "./lib/calendarGenerator.js";
import { generateProgramWorkoutImages } from "./lib/imageGenerator.js";
import { scanProgram } from "./lib/programScanner.js";
import { generateProgressionCharts } from "./lib/progressionGenerator.js";
import { generateREADME } from "./lib/readmeGenerator.js";

async function generateProgramOutputs(
  programPath: string,
  generateReadme: boolean = false
) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Generating outputs for: ${programPath}`);
  console.log("=".repeat(60));

  try {
    // 1. Scan and parse ZWO files
    console.log("\n[1/6] Scanning ZWO files...");
    const program = await scanProgram(programPath);
    console.log(
      `Found ${program.workouts.length} workouts across ${program.weeks.size} weeks`
    );

    // 2. Generate all outputs
    console.log("\n[2/6] Generating individual workout images...");
    await generateProgramWorkoutImages(program);

    console.log("\n[3/6] Generating calendar grid...");
    await generateCalendarImage(program);

    console.log("\n[4/6] Generating progression charts...");
    await generateProgressionCharts(program);

    // 6. Generate README only if flag passed
    if (generateReadme) {
      console.log("\n[6/6] Generating detailed README...");
      await generateREADME(program);
    } else {
      console.log(
        "\n[6/6] Skipping README generation (use --detailed-readme flag)"
      );
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log(`✓ Complete: ${programPath}`);
    console.log("=".repeat(60));
  } catch (error) {
    console.error(`\n✗ Error processing ${programPath}:`, error);
    throw error;
  }
}

// Main execution - Parse CLI arguments
const args = process.argv.slice(2);
const generateReadme = args.includes("--detailed-readme");
const programPaths = args.filter((arg) => !arg.startsWith("--"));

// Default to all programs if none specified
if (programPaths.length === 0) {
  programPaths.push("programs/8_weeks_road_builder", "programs/recoveries");
}

console.log("ZWO to Image Generator");
console.log(
  `Processing ${programPaths.length} program(s)${
    generateReadme ? " with detailed READMEs" : ""
  }...\n`
);

for (const programPath of programPaths) {
  await generateProgramOutputs(programPath, generateReadme);
}

console.log("\n✓ All programs processed successfully!");
