// lib/calendarGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { CanvasRenderingContext2D } from 'canvas';
import { createCanvas } from 'canvas';
import type { ParsedWorkout, ProgramStructure } from './types.js';

const CELL_WIDTH = 180;
const CELL_HEIGHT = 120;
const CELL_PADDING = 10;
const HEADER_HEIGHT = 40;
const LABEL_WIDTH = 80;

const DAY_NAMES = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Power zone colors
const POWER_COLORS = {
  recovery: '#B8C5D6',
  endurance: '#5DADE2',
  tempo: '#52C67A',
  threshold: '#E67E22',
  vo2max: '#E74C3C',
};

function getPowerColor(power: number): string {
  if (power < 0.6) return POWER_COLORS.recovery;
  if (power <= 0.75) return POWER_COLORS.endurance;
  if (power <= 0.87) return POWER_COLORS.tempo;
  if (power <= 1.05) return POWER_COLORS.threshold;
  return POWER_COLORS.vo2max;
}

function getDominantZoneColor(workout: ParsedWorkout): string {
  const timeInZone = {
    recovery: 0,
    endurance: 0,
    tempo: 0,
    threshold: 0,
    vo2max: 0,
  };

  for (const segment of workout.segments) {
    if (segment.type === 'intervals') {
      // For intervals, count ON and OFF periods separately
      const onDuration = segment.onDuration * segment.repeat;
      const offDuration = segment.offDuration * segment.repeat;

      if (segment.onPower < 0.6) timeInZone.recovery += onDuration;
      else if (segment.onPower <= 0.75) timeInZone.endurance += onDuration;
      else if (segment.onPower <= 0.87) timeInZone.tempo += onDuration;
      else if (segment.onPower <= 1.05) timeInZone.threshold += onDuration;
      else timeInZone.vo2max += onDuration;

      if (segment.offPower < 0.6) timeInZone.recovery += offDuration;
      else if (segment.offPower <= 0.75) timeInZone.endurance += offDuration;
      else if (segment.offPower <= 0.87) timeInZone.tempo += offDuration;
      else if (segment.offPower <= 1.05) timeInZone.threshold += offDuration;
      else timeInZone.vo2max += offDuration;
    } else {
      const duration = segment.duration;

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

      if (power < 0.6) timeInZone.recovery += duration;
      else if (power <= 0.75) timeInZone.endurance += duration;
      else if (power <= 0.87) timeInZone.tempo += duration;
      else if (power <= 1.05) timeInZone.threshold += duration;
      else timeInZone.vo2max += duration;
    }
  }

  // Find dominant zone
  let maxZone = 'recovery';
  let maxTime = timeInZone.recovery;

  for (const [zone, time] of Object.entries(timeInZone)) {
    if (time > maxTime) {
      maxTime = time;
      maxZone = zone;
    }
  }

  return POWER_COLORS[maxZone as keyof typeof POWER_COLORS];
}

export function generateCalendarImage(program: ProgramStructure): void {
  // Skip calendar generation if no structured weeks
  if (program.weeks.size === 0) {
    console.log('Skipping calendar generation (no structured weeks found)');
    return;
  }

  const maxWeek = Math.max(...Array.from(program.weeks.keys()));
  const rows = maxWeek;
  const cols = 7;

  const width = LABEL_WIDTH + cols * (CELL_WIDTH + CELL_PADDING) + CELL_PADDING;
  const height =
    HEADER_HEIGHT + rows * (CELL_HEIGHT + CELL_PADDING) + CELL_PADDING;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Draw day headers
  ctx.fillStyle = '#34495E';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';

  for (let day = 1; day <= 7; day++) {
    const x =
      LABEL_WIDTH +
      (day - 1) * (CELL_WIDTH + CELL_PADDING) +
      CELL_WIDTH / 2 +
      CELL_PADDING;
    ctx.fillText(DAY_NAMES[day], x, 25);
  }

  // Draw week labels and cells
  for (let week = 1; week <= maxWeek; week++) {
    const y =
      HEADER_HEIGHT + (week - 1) * (CELL_HEIGHT + CELL_PADDING) + CELL_PADDING;

    // Week label
    ctx.fillStyle = '#34495E';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Week ${week}`, LABEL_WIDTH - 10, y + CELL_HEIGHT / 2);

    // Draw cells for each day
    const weekData = program.weeks.get(week);

    for (let day = 1; day <= 7; day++) {
      const x =
        LABEL_WIDTH + (day - 1) * (CELL_WIDTH + CELL_PADDING) + CELL_PADDING;

      const workout = weekData?.days.get(day);

      if (workout) {
        // Draw mini workout profile
        drawMiniWorkout(ctx, workout, x, y, CELL_WIDTH, CELL_HEIGHT);
      } else {
        // Empty cell
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, CELL_WIDTH, CELL_HEIGHT);
      }
    }
  }

  // Save to file
  const outputPath = path.join(program.programPath, 'images', 'calendar.png');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Generated calendar: ${outputPath}`);
}

function drawMiniWorkout(
  ctx: CanvasRenderingContext2D,
  workout: ParsedWorkout,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const chartPadding = 5;
  const chartWidth = width - 2 * chartPadding;
  const chartHeight = height - 30; // Leave space for TSS label

  const totalDuration = workout.duration;

  // Find max power
  const powerLevels = workout.segments.flatMap((seg) => {
    if (seg.type === 'warmup' || seg.type === 'cooldown' || seg.type === 'ramp')
      return [seg.powerLow, seg.powerHigh];
    if (seg.type === 'intervals') return [seg.onPower, seg.offPower];
    return [seg.power];
  });
  const maxPower = Math.max(...powerLevels) * 1.1;

  // Draw border with dominant zone color
  const dominantColor = getDominantZoneColor(workout);
  ctx.strokeStyle = dominantColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);

  // Draw segments
  let currentTime = 0;

  for (const segment of workout.segments) {
    const segX = x + chartPadding + (currentTime / totalDuration) * chartWidth;
    const segmentDuration =
      segment.type === 'intervals'
        ? (segment.onDuration + segment.offDuration) * segment.repeat
        : segment.duration;
    const segWidth = (segmentDuration / totalDuration) * chartWidth;

    if (segment.type === 'steady') {
      const power = segment.power;
      const segHeight = (power / maxPower) * chartHeight;
      const segY = y + chartPadding + chartHeight - segHeight;

      ctx.fillStyle = getPowerColor(power);
      ctx.fillRect(segX, segY, segWidth, segHeight);
    } else if (segment.type === 'intervals') {
      // Draw intervals as alternating blocks
      const intervalDuration = segment.onDuration + segment.offDuration;
      const intervalWidth = (intervalDuration / totalDuration) * chartWidth;

      for (let i = 0; i < segment.repeat; i++) {
        const intervalX = segX + i * intervalWidth;

        // Draw ON phase
        const onWidth = (segment.onDuration / totalDuration) * chartWidth;
        const onHeight = (segment.onPower / maxPower) * chartHeight;
        const onY = y + chartPadding + chartHeight - onHeight;

        ctx.fillStyle = getPowerColor(segment.onPower);
        ctx.fillRect(intervalX, onY, onWidth, onHeight);

        // Draw OFF phase
        const offX = intervalX + onWidth;
        const offWidth = (segment.offDuration / totalDuration) * chartWidth;
        const offHeight = (segment.offPower / maxPower) * chartHeight;
        const offY = y + chartPadding + chartHeight - offHeight;

        ctx.fillStyle = getPowerColor(segment.offPower);
        ctx.fillRect(offX, offY, offWidth, offHeight);
      }
    } else {
      // Warmup, cooldown, ramp
      const powerLow = segment.powerLow;
      const powerHigh = segment.powerHigh;

      const yLow =
        y + chartPadding + chartHeight - (powerLow / maxPower) * chartHeight;
      const yHigh =
        y + chartPadding + chartHeight - (powerHigh / maxPower) * chartHeight;

      ctx.fillStyle = getPowerColor((powerLow + powerHigh) / 2);
      ctx.beginPath();
      ctx.moveTo(segX, y + chartPadding + chartHeight);
      ctx.lineTo(segX, yLow);
      ctx.lineTo(segX + segWidth, yHigh);
      ctx.lineTo(segX + segWidth, y + chartPadding + chartHeight);
      ctx.closePath();
      ctx.fill();
    }

    currentTime += segmentDuration;
  }

  // Draw workout info label
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center';

  const mins = Math.round(workout.duration / 60);
  const infoText = `${mins}min · ${Math.round(workout.tss)} TSS · IF ${workout.intensityFactor.toFixed(2)}`;
  ctx.fillText(infoText, x + width / 2, y + height - 8);
}
