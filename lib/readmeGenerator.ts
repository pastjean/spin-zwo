// lib/readmeGenerator.ts

import * as fs from "node:fs";
import * as path from "node:path";
import type { ProgramStructure } from "./types.js";

export function generateREADME(program: ProgramStructure): void {
  const lines: string[] = [];

  // Header
  lines.push(
    `# ${program.programName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())}`
  );
  lines.push("");

  // Overview
  lines.push("## Overview");
  lines.push("");
  lines.push(`- **Total Weeks:** ${program.stats.totalWeeks}`);
  lines.push(`- **Total Workouts:** ${program.stats.totalWorkouts}`);
  lines.push(`- **Total TSS:** ${Math.round(program.stats.totalTSS)}`);
  lines.push(`- **Total Hours:** ${program.stats.totalHours.toFixed(1)}`);
  lines.push(
    `- **Average TSS/Week:** ${Math.round(program.stats.avgTSSPerWeek)}`
  );
  lines.push(
    `- **Average Hours/Week:** ${program.stats.avgHoursPerWeek.toFixed(1)}`
  );
  lines.push("");

  // Zone distribution
  lines.push("## Intensity Distribution");
  lines.push("");
  const dist = program.stats.intensityDistribution;
  lines.push(`- **Recovery (<60% FTP):** ${dist.recovery.toFixed(1)}%`);
  lines.push(`- **Endurance (60-75% FTP):** ${dist.endurance.toFixed(1)}%`);
  lines.push(`- **Tempo (76-87% FTP):** ${dist.tempo.toFixed(1)}%`);
  lines.push(`- **Threshold (88-105% FTP):** ${dist.threshold.toFixed(1)}%`);
  lines.push(`- **VO2max (>105% FTP):** ${dist.vo2max.toFixed(1)}%`);
  lines.push("");

  // Calendar image
  lines.push("## Program Calendar");
  lines.push("");
  lines.push("![Program Calendar](images/calendar.png)");
  lines.push("");

  // Weekly breakdown
  lines.push("## Weekly Breakdown");
  lines.push("");

  const weeks = Array.from(program.weeks.values()).sort(
    (a, b) => a.weekNumber - b.weekNumber
  );

  for (const week of weeks) {
    lines.push(`### Week ${week.weekNumber}`);
    lines.push("");
    lines.push(
      `**Weekly Total:** ${Math.round(week.totalTSS)} TSS, ${(
        week.totalDuration / 3600
      ).toFixed(1)} hours`
    );
    lines.push("");

    const days = Array.from(week.days.entries()).sort((a, b) => a[0] - b[0]);

    // Table header
    lines.push("| Day | Workout | Details |");
    lines.push("| --- | ------- | ------- |");

    for (const [_day, workout] of days) {
      const mins = Math.round(workout.duration / 60);
      const imageFilename = workout.filename.replace(".zwo", ".png");

      // Format workout name with image
      const workoutCell = `**${workout.workoutName}**<br/><img src="images/individual/${imageFilename}" width="300">`;

      // Format details
      const detailsLines = [
        `• ${mins} min · ${Math.round(
          workout.tss
        )} TSS · IF ${workout.intensityFactor.toFixed(2)}`,
      ];

      const detailsCell = detailsLines.join("<br/>");

      lines.push(`| **${workout.day}** | ${workoutCell} | ${detailsCell} |`);
    }

    lines.push("");
  }

  // Usage section
  lines.push("## Usage");
  lines.push("");
  lines.push("### Import ZWO Files");
  lines.push("");
  lines.push(
    "The `.zwo` files in the `zwo_files/` directory can be imported into:"
  );
  lines.push("");
  lines.push("- **Zwift** - Import custom workouts");
  lines.push("- **MyWhoosh** - Import workout files");
  lines.push("- **TrainingPeaks** - Upload ZWO files");
  lines.push("- Any other platform that supports the ZWO format");
  lines.push("");

  // Interactive viewer
  lines.push("### Interactive Viewer");
  lines.push("");
  lines.push(
    "Open `docs/index.html` in your browser for an interactive workout calendar and statistics dashboard."
  );
  lines.push("");

  // Save to file
  const outputPath = path.join(program.programPath, "README.md");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");

  console.log(`Generated README: ${outputPath}`);
}
