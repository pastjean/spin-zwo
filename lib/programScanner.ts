// lib/programScanner.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import { loadProgramConfig, validateProgramConfig } from './configLoader.js';
import type {
  ParsedWorkout,
  ProgramStats,
  ProgramStructure,
  WeekStructure,
} from './types.js';
import { parseZWOFile } from './zwoParser.js';

/**
 * Scan a program directory using its config file
 */
export async function scanProgram(
  programPath: string,
): Promise<ProgramStructure> {
  // 1. Load and validate program config
  const config = await loadProgramConfig(programPath);
  validateProgramConfig(config, programPath);

  const zwoFilesDir = path.join(programPath, 'zwo_files');

  if (!fs.existsSync(zwoFilesDir)) {
    throw new Error(`ZWO files directory not found: ${zwoFilesDir}`);
  }

  // 2. Parse ZWO files based on config schedule
  const workouts: ParsedWorkout[] = [];

  for (const entry of config.schedule) {
    const zwoPath = path.join(zwoFilesDir, entry.zwoFile);
    const workout = await parseZWOFile(zwoPath);

    // Attach schedule metadata from config
    workout.week = entry.week;
    workout.day = entry.day;
    workout.dayName = entry.dayName;
    workout.workoutName = workout.name || entry.zwoFile.replace('.zwo', '');

    workouts.push(workout);
  }

  // 3. Build week structure
  const weeks = buildWeekStructure(workouts);

  // 4. Calculate program stats
  const stats = calculateProgramStats(workouts, weeks);

  return {
    programName: config.name,
    programPath,
    config,
    weeks,
    workouts,
    stats,
  };
}

/**
 * Build week structure from workouts
 */
function buildWeekStructure(
  workouts: ParsedWorkout[],
): Map<number, WeekStructure> {
  const weeks = new Map<number, WeekStructure>();

  for (const workout of workouts) {
    if (workout.week === undefined || workout.day === undefined) {
      continue; // Skip workouts without week/day info
    }

    if (!weeks.has(workout.week)) {
      weeks.set(workout.week, {
        weekNumber: workout.week,
        days: new Map(),
        totalTSS: 0,
        totalDuration: 0,
      });
    }

    const week = weeks.get(workout.week);
    if (!week) continue; // Should never happen due to check above
    week.days.set(workout.day, workout);
    week.totalTSS += workout.tss;
    week.totalDuration += workout.duration;
  }

  return weeks;
}

/**
 * Calculate program statistics
 */
function calculateProgramStats(
  workouts: ParsedWorkout[],
  weeks: Map<number, WeekStructure>,
): ProgramStats {
  const totalTSS = workouts.reduce((sum, w) => sum + w.tss, 0);
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalHours = totalDuration / 3600;

  const totalWeeks = weeks.size;
  const avgTSSPerWeek = totalWeeks > 0 ? totalTSS / totalWeeks : 0;
  const avgHoursPerWeek = totalWeeks > 0 ? totalHours / totalWeeks : 0;

  // Calculate intensity distribution
  const distribution = calculateIntensityDistribution(workouts);

  return {
    totalWorkouts: workouts.length,
    totalWeeks,
    totalTSS,
    totalHours,
    avgTSSPerWeek,
    avgHoursPerWeek,
    intensityDistribution: distribution,
  };
}

/**
 * Calculate time-in-zone distribution
 */
function calculateIntensityDistribution(workouts: ParsedWorkout[]) {
  let totalTime = 0;
  const timeInZone = {
    recovery: 0,
    endurance: 0,
    tempo: 0,
    threshold: 0,
    vo2max: 0,
  };

  for (const workout of workouts) {
    for (const segment of workout.segments) {
      const duration = segment.duration;
      totalTime += duration;

      // Get average power for segment
      let power: number;
      if (
        segment.type === 'warmup' ||
        segment.type === 'cooldown' ||
        segment.type === 'ramp'
      ) {
        power = (segment.powerLow + segment.powerHigh) / 2;
      } else {
        power = segment.power;
      }

      // Classify into zone
      if (power < 0.6) timeInZone.recovery += duration;
      else if (power < 0.76) timeInZone.endurance += duration;
      else if (power < 0.88) timeInZone.tempo += duration;
      else if (power <= 1.05) timeInZone.threshold += duration;
      else timeInZone.vo2max += duration;
    }
  }

  // Convert to percentages
  return {
    recovery: totalTime > 0 ? (timeInZone.recovery / totalTime) * 100 : 0,
    endurance: totalTime > 0 ? (timeInZone.endurance / totalTime) * 100 : 0,
    tempo: totalTime > 0 ? (timeInZone.tempo / totalTime) * 100 : 0,
    threshold: totalTime > 0 ? (timeInZone.threshold / totalTime) * 100 : 0,
    vo2max: totalTime > 0 ? (timeInZone.vo2max / totalTime) * 100 : 0,
  };
}
