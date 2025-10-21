// Add this to your file or create a new utils file

import { WorkoutDefinition } from "./types";

interface Segment {
  type: "warmup" | "cooldown" | "steady" | "ramp";
  duration: number;
  power?: number;
  powerLow?: number;
  powerHigh?: number;
}

interface WorkoutMetrics {
  tss: number;
  if: number;
  duration: number;
  np: number; // Normalized Power
}

/**
 * Calculate Normalized Power (NP) for a workout
 * NP is calculated as the fourth root of the average of the fourth power of power values
 */
function calculateNormalizedPower(segments: Segment[]): number {
  let totalPower4Sum = 0;
  let totalDuration = 0;

  for (const segment of segments) {
    let avgPower: number;

    if (segment.type === "warmup" || segment.type === "cooldown") {
      // For ramps, take average of low and high
      avgPower = ((segment.powerLow || 0) + (segment.powerHigh || 0)) / 2;
    } else {
      // For steady segments
      avgPower = segment.power || 0;
    }

    // Add to running totals (power^4 * duration)
    totalPower4Sum += Math.pow(avgPower, 4) * segment.duration;
    totalDuration += segment.duration;
  }

  // NP = fourth root of (sum of power^4 * duration / total duration)
  const np = Math.pow(totalPower4Sum / totalDuration, 0.25);
  return np;
}

/**
 * Calculate Intensity Factor (IF)
 * IF = NP / FTP
 */
function calculateIF(np: number, ftp: number = 1.0): number {
  return np / ftp;
}

/**
 * Calculate Training Stress Score (TSS)
 * TSS = (duration_hours × NP × IF) / FTP × 100
 * Since we're using normalized values (power as % of FTP), FTP = 1.0
 */
function calculateTSS(
  duration: number,
  np: number,
  intensityFactor: number
): number {
  const durationHours = duration / 3600;
  const tss = durationHours * np * intensityFactor * 100;
  return Math.round(tss);
}

/**
 * Calculate workout metrics (TSS, IF, NP, duration)
 */
export function calculateWorkoutMetrics(segments: Segment[]): WorkoutMetrics {
  const totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);
  const np = calculateNormalizedPower(segments);
  const intensityFactor = calculateIF(np);
  const tss = calculateTSS(totalDuration, np, intensityFactor);

  return {
    tss,
    if: Math.round(intensityFactor * 100) / 100, // Round to 2 decimal places
    duration: totalDuration,
    np: Math.round(np * 100) / 100,
  };
}

/**
 * Format metrics for display in workout description
 */
export function formatMetricsForDescription(segments: Segment[]): string {
  const metrics = calculateWorkoutMetrics(segments);
  const durationMin = Math.round(metrics.duration / 60);
  return `📊 ${metrics.tss} TSS · IF ${metrics.if.toFixed(
    2
  )} · ${durationMin} min`;
}

/**
 * Validate and update all workout descriptions with calculated metrics
 */
export function addMetricsToWorkouts(
  workouts: Record<string, WorkoutDefinition>
): void {
  for (const [_key, workout] of Object.entries(workouts)) {
    const metrics = calculateWorkoutMetrics(workout.segments);
    console.log(
      `${workout.name}: TSS=${metrics.tss}, IF=${metrics.if.toFixed(
        2
      )}, Duration=${Math.round(metrics.duration / 60)}min`
    );
  }
}
