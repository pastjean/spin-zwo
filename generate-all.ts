// generate-all.ts

import { scanProgram } from './lib/programScanner.js';
import { generateProgramWorkoutImages } from './lib/imageGenerator.js';
import { generateCalendarImage } from './lib/calendarGenerator.js';
import { generateProgressionCharts } from './lib/progressionGenerator.js';
import { generateHTML } from './lib/htmlGenerator.js';
import { generateREADME } from './lib/readmeGenerator.js';

async function generateProgramOutputs(programPath: string) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Generating outputs for: ${programPath}`);
  console.log('='.repeat(60));

  try {
    // 1. Scan and parse ZWO files
    console.log('\n[1/6] Scanning ZWO files...');
    const program = await scanProgram(programPath);
    console.log(`Found ${program.workouts.length} workouts across ${program.weeks.size} weeks`);

    // 2. Generate all outputs in parallel
    console.log('\n[2/6] Generating individual workout images...');
    await generateProgramWorkoutImages(program);

    console.log('\n[3/6] Generating calendar grid...');
    await generateCalendarImage(program);

    console.log('\n[4/6] Generating progression charts...');
    await generateProgressionCharts(program);

    console.log('\n[5/6] Generating HTML viewer...');
    await generateHTML(program);

    console.log('\n[6/6] Generating README...');
    await generateREADME(program);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✓ Complete: ${programPath}`);
    console.log('='.repeat(60));
  } catch (error) {
    console.error(`\n✗ Error processing ${programPath}:`, error);
    throw error;
  }
}

// Main execution
const programPaths =
  process.argv.length > 2
    ? [process.argv[2]]
    : [
        'programs/12_weeks_ftp_builder',
        'programs/8_weeks_road_builder',
        'programs/recoveries',
      ];

console.log('ZWO to Image Generator');
console.log(`Processing ${programPaths.length} program(s)...\n`);

for (const programPath of programPaths) {
  await generateProgramOutputs(programPath);
}

console.log('\n✓ All programs processed successfully!');
