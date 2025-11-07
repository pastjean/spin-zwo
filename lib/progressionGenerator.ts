// lib/progressionGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { CanvasRenderingContext2D } from 'canvas';
import { createCanvas } from 'canvas';
import type { ProgramStructure } from './types.js';

const CHART_WIDTH = 1200;
const CHART_HEIGHT = 800;
const PADDING = 80;
const CHART_PADDING = 60;

export function generateProgressionCharts(program: ProgramStructure): void {
  // Skip progression charts if no structured weeks
  if (program.weeks.size === 0) {
    console.log('Skipping progression charts (no structured weeks found)');
    return;
  }

  const canvas = createCanvas(CHART_WIDTH, CHART_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, CHART_WIDTH, CHART_HEIGHT);

  // Title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(
    `${program.programName} - Progression Analysis`,
    CHART_WIDTH / 2,
    40,
  );

  // Draw 4 charts in 2x2 grid
  const chartWidth = (CHART_WIDTH - 3 * PADDING) / 2;
  const chartHeight = (CHART_HEIGHT - 3 * PADDING - 40) / 2;

  // Chart 1: TSS over time (top-left)
  drawTSSChart(ctx, program, PADDING, PADDING + 40, chartWidth, chartHeight);

  // Chart 2: IF over time (top-right)
  drawIFChart(
    ctx,
    program,
    2 * PADDING + chartWidth,
    PADDING + 40,
    chartWidth,
    chartHeight,
  );

  // Chart 3: Hours per week (bottom-left)
  drawHoursPerWeekChart(
    ctx,
    program,
    PADDING,
    2 * PADDING + chartHeight + 40,
    chartWidth,
    chartHeight,
  );

  // Chart 4: Zone distribution (bottom-right)
  drawZoneDistributionChart(
    ctx,
    program,
    2 * PADDING + chartWidth,
    2 * PADDING + chartHeight + 40,
    chartWidth,
    chartHeight,
  );

  // Save to file
  const outputPath = path.join(
    program.programPath,
    'images',
    'progression.png',
  );
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Generated progression charts: ${outputPath}`);
}

function drawTSSChart(
  ctx: CanvasRenderingContext2D,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const weeks = Array.from(program.weeks.values()).sort(
    (a, b) => a.weekNumber - b.weekNumber,
  );
  const maxTSS = Math.max(...weeks.map((w) => w.totalTSS));

  // Draw title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Weekly TSS', x, y - 10);

  // Draw axes
  ctx.strokeStyle = '#BDC3C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + CHART_PADDING, y + height - CHART_PADDING);
  ctx.lineTo(x + width - CHART_PADDING, y + height - CHART_PADDING);
  ctx.lineTo(x + width - CHART_PADDING, y + CHART_PADDING);
  ctx.stroke();

  // Draw line chart
  const chartWidth = width - 2 * CHART_PADDING;
  const chartHeight = height - 2 * CHART_PADDING;

  ctx.strokeStyle = '#3498DB';
  ctx.lineWidth = 3;
  ctx.beginPath();

  weeks.forEach((week, index) => {
    const chartX =
      x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    const chartY =
      y + CHART_PADDING + chartHeight - (week.totalTSS / maxTSS) * chartHeight;

    if (index === 0) {
      ctx.moveTo(chartX, chartY);
    } else {
      ctx.lineTo(chartX, chartY);
    }
  });

  ctx.stroke();

  // Draw data points
  weeks.forEach((week, index) => {
    const chartX =
      x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    const chartY =
      y + CHART_PADDING + chartHeight - (week.totalTSS / maxTSS) * chartHeight;

    ctx.fillStyle = '#3498DB';
    ctx.beginPath();
    ctx.arc(chartX, chartY, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Labels
  ctx.fillStyle = '#7F8C8D';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';

  weeks.forEach((week, index) => {
    const chartX =
      x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    ctx.fillText(
      `W${week.weekNumber}`,
      chartX,
      y + height - CHART_PADDING + 20,
    );
  });
}

function drawIFChart(
  ctx: CanvasRenderingContext2D,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const weeks = Array.from(program.weeks.values()).sort(
    (a, b) => a.weekNumber - b.weekNumber,
  );

  // Calculate avg IF per week
  const weekIFs = weeks.map((week) => {
    const workouts = Array.from(week.days.values());
    const avgIF =
      workouts.reduce((sum, w) => sum + w.intensityFactor, 0) / workouts.length;
    return avgIF;
  });

  const maxIF = Math.max(...weekIFs);

  // Draw title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Average Intensity Factor (IF)', x, y - 10);

  // Draw axes
  ctx.strokeStyle = '#BDC3C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + CHART_PADDING, y + height - CHART_PADDING);
  ctx.lineTo(x + width - CHART_PADDING, y + height - CHART_PADDING);
  ctx.lineTo(x + width - CHART_PADDING, y + CHART_PADDING);
  ctx.stroke();

  // Draw line chart
  const chartWidth = width - 2 * CHART_PADDING;
  const chartHeight = height - 2 * CHART_PADDING;

  ctx.strokeStyle = '#E74C3C';
  ctx.lineWidth = 3;
  ctx.beginPath();

  weekIFs.forEach((ifValue, index) => {
    const chartX =
      x + CHART_PADDING + (index / (weekIFs.length - 1)) * chartWidth;
    const chartY =
      y + CHART_PADDING + chartHeight - (ifValue / maxIF) * chartHeight;

    if (index === 0) {
      ctx.moveTo(chartX, chartY);
    } else {
      ctx.lineTo(chartX, chartY);
    }
  });

  ctx.stroke();

  // Draw data points
  weekIFs.forEach((ifValue, index) => {
    const chartX =
      x + CHART_PADDING + (index / (weekIFs.length - 1)) * chartWidth;
    const chartY =
      y + CHART_PADDING + chartHeight - (ifValue / maxIF) * chartHeight;

    ctx.fillStyle = '#E74C3C';
    ctx.beginPath();
    ctx.arc(chartX, chartY, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Labels
  ctx.fillStyle = '#7F8C8D';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';

  weeks.forEach((week, index) => {
    const chartX =
      x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    ctx.fillText(
      `W${week.weekNumber}`,
      chartX,
      y + height - CHART_PADDING + 20,
    );
  });
}

function drawHoursPerWeekChart(
  ctx: CanvasRenderingContext2D,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const weeks = Array.from(program.weeks.values()).sort(
    (a, b) => a.weekNumber - b.weekNumber,
  );
  const weekHours = weeks.map((w) => w.totalDuration / 3600);
  const maxHours = Math.max(...weekHours);

  // Draw title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Training Hours per Week', x, y - 10);

  // Draw axes
  ctx.strokeStyle = '#BDC3C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + CHART_PADDING, y + height - CHART_PADDING);
  ctx.lineTo(x + width - CHART_PADDING, y + height - CHART_PADDING);
  ctx.stroke();

  // Draw bar chart
  const chartWidth = width - 2 * CHART_PADDING;
  const chartHeight = height - 2 * CHART_PADDING;
  const barWidth = (chartWidth / weeks.length) * 0.8;

  weekHours.forEach((hours, index) => {
    const barX = x + CHART_PADDING + (index / weeks.length) * chartWidth;
    const barHeight = (hours / maxHours) * chartHeight;
    const barY = y + height - CHART_PADDING - barHeight;

    ctx.fillStyle = '#52C67A';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Value label
    ctx.fillStyle = '#2C3E50';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(hours.toFixed(1), barX + barWidth / 2, barY - 5);
  });

  // Week labels
  ctx.fillStyle = '#7F8C8D';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';

  weeks.forEach((week, index) => {
    const barX = x + CHART_PADDING + (index / weeks.length) * chartWidth;
    ctx.fillText(
      `W${week.weekNumber}`,
      barX + barWidth / 2,
      y + height - CHART_PADDING + 20,
    );
  });
}

function drawZoneDistributionChart(
  ctx: CanvasRenderingContext2D,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const dist = program.stats.intensityDistribution;

  // Draw title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Overall Intensity Distribution', x, y - 10);

  // Draw pie chart
  const centerX = x + width / 2;
  const centerY = y + height / 2 + 10;
  const radius = Math.min(width, height) / 3;

  const zones = [
    { name: 'Recovery', value: dist.recovery, color: '#B8C5D6' },
    { name: 'Endurance', value: dist.endurance, color: '#5DADE2' },
    { name: 'Tempo', value: dist.tempo, color: '#52C67A' },
    { name: 'Threshold', value: dist.threshold, color: '#E67E22' },
    { name: 'VO2max', value: dist.vo2max, color: '#E74C3C' },
  ];

  let startAngle = -Math.PI / 2;

  for (const zone of zones) {
    const sliceAngle = (zone.value / 100) * 2 * Math.PI;

    ctx.fillStyle = zone.color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    // Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    startAngle += sliceAngle;
  }

  // Legend
  let legendY = y + height - 100;

  zones.forEach((zone) => {
    // Color box
    ctx.fillStyle = zone.color;
    ctx.fillRect(x + 20, legendY, 15, 15);

    // Label
    ctx.fillStyle = '#2C3E50';
    ctx.font = '11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(
      `${zone.name}: ${zone.value.toFixed(1)}%`,
      x + 40,
      legendY + 12,
    );

    legendY += 20;
  });
}
