// Image Generation Module for Workout Profiles
// Generates visual representations of workout power profiles

import { createCanvas } from 'canvas';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Segment, WorkoutDefinition } from './types.js';

// Constants for image generation
const IMAGE_WIDTH = 1400;
const IMAGE_HEIGHT = 600;
const PADDING = 80;
const CHART_WIDTH = IMAGE_WIDTH - 2 * PADDING;
const CHART_HEIGHT = IMAGE_HEIGHT - 2 * PADDING;

// FTP Zone thresholds
const ZONE_THRESHOLDS = [
  { level: 0.55, name: 'Z1/Z2' },
  { level: 0.75, name: 'Z2/Z3' },
  { level: 0.90, name: 'Z3/Z4' },
  { level: 1.05, name: 'Z4/Z5' },
  { level: 1.20, name: 'Z5/Z6' },
  { level: 1.50, name: 'Z6/Z7' },
];

// Power zone colors (matching the example images)
const POWER_COLORS = {
  recovery: '#B8C5D6', // Light gray-blue for <0.6 FTP
  endurance: '#5DADE2', // Blue for 0.6-0.75 FTP
  tempo: '#52C67A', // Green for 0.76-0.87 FTP
  sweetspot: '#F39C12', // Orange for 0.88-0.93 FTP
  threshold: '#E67E22', // Dark orange for 0.94-1.05 FTP
  vo2max: '#E74C3C', // Red for >1.05 FTP
};

// Get color based on power level
function getPowerColor(power: number): string {
  if (power <= 0.6) return POWER_COLORS.recovery;
  if (power <= 0.75) return POWER_COLORS.endurance;
  if (power <= 0.87) return POWER_COLORS.tempo;
  if (power <= 0.93) return POWER_COLORS.sweetspot;
  if (power <= 1.05) return POWER_COLORS.threshold;
  return POWER_COLORS.vo2max;
}

// Calculate total workout duration
function getTotalDuration(segments: Segment[]): number {
  return segments.reduce((total, segment) => total + segment.duration, 0);
}

// Get average power for a segment
function getSegmentPower(segment: Segment): number {
  switch (segment.type) {
    case 'warmup':
      return (segment.powerLow + segment.powerHigh) / 2;
    case 'cooldown':
      return (segment.powerLow + segment.powerHigh) / 2;
    case 'steady':
      return segment.power;
    case 'ramp':
      return (segment.powerLow + segment.powerHigh) / 2;
    default:
      return 0.5;
  }
}

// Generate workout profile image
export function generateWorkoutImage(
  workout: WorkoutDefinition,
  outputPath: string,
  ftp: number = 200, // Default FTP for display purposes
): void {
  const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#F5F6F7';
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

  // Calculate dimensions
  const totalDuration = getTotalDuration(workout.segments);

  // Find min and max power levels
  const powerLevels = workout.segments.flatMap((seg) => {
    if (seg.type === 'warmup' || seg.type === 'cooldown')
      return [seg.powerLow, seg.powerHigh];
    if (seg.type === 'ramp') return [seg.powerLow, seg.powerHigh];
    return [seg.power];
  });

  const minPower = Math.min(...powerLevels);
  const actualMaxPower = Math.max(...powerLevels);

  // Determine which zone thresholds to display
  // Include zones within range, plus one zone beyond the max
  const relevantThresholds = ZONE_THRESHOLDS.filter((zone) => {
    if (zone.level >= minPower && zone.level <= actualMaxPower) {
      return true; // Zone is within range
    }
    // Check if this is the first zone beyond max
    const zonesAboveMax = ZONE_THRESHOLDS.filter(z => z.level > actualMaxPower);
    return zonesAboveMax.length > 0 && zone.level === zonesAboveMax[0].level;
  });

  // Set chart max to the highest relevant threshold, or actual max if higher
  const highestThreshold = relevantThresholds.length > 0
    ? Math.max(...relevantThresholds.map(t => t.level))
    : actualMaxPower;
  const maxPower = Math.max(highestThreshold, actualMaxPower) * 1.05; // Add 5% headroom

  // Draw zone threshold lines and labels
  ctx.fillStyle = '#5D6D7E';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'right';
  ctx.strokeStyle = '#D5DBDB';
  ctx.lineWidth = 1;

  // Draw zone threshold lines
  for (const threshold of relevantThresholds) {
    const y = PADDING + CHART_HEIGHT - (threshold.level / maxPower) * CHART_HEIGHT;

    ctx.strokeStyle = '#BDC3C7';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(PADDING, y);
    ctx.lineTo(IMAGE_WIDTH - PADDING, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#7F8C8D';
    ctx.font = 'bold 11px Arial';
    ctx.fillText(`${Math.round(threshold.level * 100)}% ${threshold.name}`, PADDING - 10, y + 4);
  }

  // Draw baseline (0%)
  ctx.strokeStyle = '#34495E';
  ctx.lineWidth = 2;

  // Draw workout segments
  let currentTime = 0;

  for (const segment of workout.segments) {
    const x = PADDING + (currentTime / totalDuration) * CHART_WIDTH;
    const width = (segment.duration / totalDuration) * CHART_WIDTH;

    switch (segment.type) {
      case 'warmup':
      case 'cooldown':
      case 'ramp': {
        const powerLow =
          segment.type === 'cooldown' ? segment.powerLow : segment.powerLow;
        const powerHigh =
          segment.type === 'cooldown' ? segment.powerHigh : segment.powerHigh;

        // Draw gradient/ramp
        const yLow =
          PADDING + CHART_HEIGHT - (powerLow / maxPower) * CHART_HEIGHT;
        const yHigh =
          PADDING + CHART_HEIGHT - (powerHigh / maxPower) * CHART_HEIGHT;

        // Use path to draw trapezoid
        ctx.fillStyle = getPowerColor((powerLow + powerHigh) / 2);
        ctx.beginPath();
        ctx.moveTo(x, PADDING + CHART_HEIGHT);
        ctx.lineTo(x, segment.type === 'warmup' ? yLow : yHigh);
        ctx.lineTo(x + width, segment.type === 'warmup' ? yHigh : yLow);
        ctx.lineTo(x + width, PADDING + CHART_HEIGHT);
        ctx.closePath();
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = '#95A5A6';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        break;
      }

      case 'steady': {
        const power = segment.power;
        const height = (power / maxPower) * CHART_HEIGHT;
        const y = PADDING + CHART_HEIGHT - height;

        ctx.fillStyle = getPowerColor(power);
        ctx.fillRect(x, y, width, height);

        // Draw outline
        ctx.strokeStyle = '#95A5A6';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, width, height);
        break;
      }
    }

    currentTime += segment.duration;
  }

  // Draw baseline (0%)
  ctx.strokeStyle = '#34495E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PADDING, PADDING + CHART_HEIGHT);
  ctx.lineTo(IMAGE_WIDTH - PADDING, PADDING + CHART_HEIGHT);
  ctx.stroke();

  // Label baseline
  ctx.fillStyle = '#5D6D7E';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('0%', PADDING - 10, PADDING + CHART_HEIGHT + 5);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

// Generate images for all workouts
export function generateAllWorkoutImages(
  workouts: Record<string, WorkoutDefinition>,
  outputDir: string,
  ftp: number = 200,
): void {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let count = 0;
  for (const [key, workout] of Object.entries(workouts)) {
    const outputPath = path.join(outputDir, `${key}.png`);
    generateWorkoutImage(workout, outputPath, ftp);
    console.log(`Generated: ${outputPath}`);
    count++;
  }

  console.log(`\nGenerated ${count} workout images in ${outputDir}/`);
}
