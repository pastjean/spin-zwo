# ZWO-to-Image Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the codebase from TypeScript-based workout generation to ZWO-file-based parsing with comprehensive visual outputs (images, calendar, charts, HTML viewer, auto-generated docs).

**Architecture:** Parse existing ZWO XML files → Extract workout segments and metadata → Generate multiple outputs in parallel (individual images, calendar grid, progression charts, HTML viewer, README). ZWO files become the single source of truth.

**Tech Stack:** Bun/TypeScript, xml2js (XML parsing), canvas (image generation), Node.js built-in fs/path

---

## Task 1: Add XML Parsing Dependency

**Files:**
- Modify: `package.json`

**Step 1: Add xml2js dependency**

```bash
bun add xml2js
bun add -d @types/xml2js
```

Expected: Dependencies added to package.json

**Step 2: Verify installation**

```bash
bun install
```

Expected: xml2js installed successfully

**Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "deps: add xml2js for ZWO parsing"
```

---

## Task 2: Extend Type Definitions

**Files:**
- Modify: `lib/types.ts`

**Step 1: Add new interfaces to types.ts**

Add after existing interfaces:

```typescript
export interface ParsedWorkout {
  // From ZWO file
  name: string;
  description: string;
  author: string;
  tags: string[];
  segments: Segment[];

  // From filename
  week?: number;
  day?: number;
  dayName?: string;
  workoutName?: string;

  // Calculated metrics
  duration: number;         // Total seconds
  tss: number;             // Training Stress Score
  intensityFactor: number; // IF
  normalizedPower: number; // NP

  // File metadata
  filepath: string;
  filename: string;
}

export interface ProgramStructure {
  programName: string;
  programPath: string;
  weeks: Map<number, WeekStructure>;
  workouts: ParsedWorkout[];
  stats: ProgramStats;
}

export interface WeekStructure {
  weekNumber: number;
  days: Map<number, ParsedWorkout>;
  totalTSS: number;
  totalDuration: number;
}

export interface ProgramStats {
  totalWorkouts: number;
  totalWeeks: number;
  totalTSS: number;
  totalHours: number;
  avgTSSPerWeek: number;
  avgHoursPerWeek: number;
  intensityDistribution: {
    recovery: number;    // % of time < 0.6 FTP
    endurance: number;   // % of time 0.6-0.75
    tempo: number;       // % of time 0.76-0.87
    threshold: number;   // % of time 0.88-1.05
    vo2max: number;      // % of time > 1.05
  };
}
```

**Step 2: Verify no TypeScript errors**

```bash
bun run check:ci
```

Expected: No errors

**Step 3: Commit**

```bash
git add lib/types.ts
git commit -m "types: add ParsedWorkout and ProgramStructure interfaces"
```

---

## Task 3: Create Filename Parser

**Files:**
- Create: `lib/filenameParser.ts`

**Step 1: Create filename parser module**

```typescript
// lib/filenameParser.ts

export interface FilenameMetadata {
  week: number;
  day: number;
  dayName: string;
  workoutName: string;
}

/**
 * Parse structured filename: W##-D#-DayName-WorkoutName.zwo
 * Example: W07-D6-Saturday-Sweet_Spot_3x25.zwo
 */
export function parseFilename(filename: string): FilenameMetadata | null {
  // Remove .zwo extension
  const nameWithoutExt = filename.replace(/\.zwo$/, '');

  // Pattern: W(\d+)-D(\d+)-(\w+)-(.+)
  const pattern = /^W(\d+)-D(\d+)-(\w+)-(.+)$/;
  const match = nameWithoutExt.match(pattern);

  if (!match) {
    return null;
  }

  return {
    week: parseInt(match[1], 10),
    day: parseInt(match[2], 10),
    dayName: match[3],
    workoutName: match[4].replace(/_/g, ' '),
  };
}
```

**Step 2: Test manually**

```bash
bun run -e "
import { parseFilename } from './lib/filenameParser.js';
console.log(parseFilename('W07-D6-Saturday-Sweet_Spot_3x25.zwo'));
console.log(parseFilename('invalid.zwo'));
"
```

Expected: First shows parsed object, second shows null

**Step 3: Commit**

```bash
git add lib/filenameParser.ts
git commit -m "feat: add filename parser for ZWO files"
```

---

## Task 4: Create ZWO Parser Module

**Files:**
- Create: `lib/zwoParser.ts`

**Step 1: Create ZWO parser with segment extraction**

```typescript
// lib/zwoParser.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseString } from 'xml2js';
import { promisify } from 'node:util';
import type {
  Segment,
  WarmupSegment,
  CooldownSegment,
  SteadyStateSegment,
  RampSegment,
  ParsedWorkout,
  WorkoutTextEvent,
} from './types.js';
import { parseFilename } from './filenameParser.js';
import { calculateWorkoutMetrics } from './metrics.js';

const parseXML = promisify(parseString);

/**
 * Parse a single ZWO XML file
 */
export async function parseZWOFile(filepath: string): Promise<ParsedWorkout> {
  const content = fs.readFileSync(filepath, 'utf-8');
  const filename = path.basename(filepath);

  // Parse XML
  const result = await parseXML(content);
  const workoutFile = result.workout_file;

  // Extract basic metadata
  const name = workoutFile.n?.[0] || '';
  const description = workoutFile.description?.[0] || '';
  const author = workoutFile.author?.[0] || '';
  const tags = workoutFile.tags?.[0]?.tag?.map((t: any) => t.$.name) || [];

  // Extract segments
  const segments = extractSegments(workoutFile.workout[0]);

  // Parse filename metadata
  const filenameData = parseFilename(filename);

  // Calculate metrics
  const metrics = calculateWorkoutMetrics(segments);

  return {
    name,
    description,
    author,
    tags,
    segments,
    week: filenameData?.week,
    day: filenameData?.day,
    dayName: filenameData?.dayName,
    workoutName: filenameData?.workoutName,
    duration: metrics.duration,
    tss: metrics.tss,
    intensityFactor: metrics.intensityFactor,
    normalizedPower: metrics.normalizedPower,
    filepath,
    filename,
  };
}

/**
 * Extract workout segments from parsed XML
 */
function extractSegments(workout: any): Segment[] {
  const segments: Segment[] = [];

  // Get all child elements in order
  const elements = Object.keys(workout).flatMap((key) => {
    if (key === '$') return []; // Skip attributes
    return workout[key].map((elem: any) => ({ type: key, data: elem }));
  });

  for (const elem of elements) {
    const segment = parseSegment(elem.type, elem.data);
    if (segment) {
      segments.push(segment);
    }
  }

  return segments;
}

/**
 * Parse individual segment based on type
 */
function parseSegment(type: string, data: any): Segment | null {
  const attrs = data.$ || {};
  const messages = extractTextEvents(data);

  switch (type) {
    case 'Warmup': {
      const seg: WarmupSegment = {
        type: 'warmup',
        duration: parseFloat(attrs.Duration),
        powerLow: parseFloat(attrs.PowerLow),
        powerHigh: parseFloat(attrs.PowerHigh),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case 'Cooldown': {
      const seg: CooldownSegment = {
        type: 'cooldown',
        duration: parseFloat(attrs.Duration),
        powerHigh: parseFloat(attrs.PowerHigh),
        powerLow: parseFloat(attrs.PowerLow),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case 'SteadyState': {
      const seg: SteadyStateSegment = {
        type: 'steady',
        duration: parseFloat(attrs.Duration),
        power: parseFloat(attrs.Power),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case 'Ramp': {
      const seg: RampSegment = {
        type: 'ramp',
        duration: parseFloat(attrs.Duration),
        powerLow: parseFloat(attrs.PowerLow),
        powerHigh: parseFloat(attrs.PowerHigh),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    default:
      return null;
  }
}

/**
 * Extract text events from segment
 */
function extractTextEvents(data: any): WorkoutTextEvent[] {
  if (!data.textevent) return [];

  return data.textevent.map((evt: any) => ({
    time: parseInt(evt.$.timeoffset, 10),
    text: evt.$.message,
  }));
}
```

**Step 2: Update metrics.ts to export calculateWorkoutMetrics**

Modify `lib/metrics.ts` - add export if not already exported:

```typescript
// At the end of lib/metrics.ts
export function calculateWorkoutMetrics(segments: Segment[]) {
  const duration = getTotalDuration(segments);
  const tss = calculateTSS(segments);
  const intensityFactor = calculateIF(segments);
  const normalizedPower = calculateNP(segments);

  return {
    duration,
    tss,
    intensityFactor,
    normalizedPower,
  };
}
```

**Step 3: Test with an existing ZWO file**

```bash
bun run -e "
import { parseZWOFile } from './lib/zwoParser.js';
const workout = await parseZWOFile('programs/12_weeks_ftp_builder/zwo_files/W01-D3-Wednesday-Recovery.zwo');
console.log('Name:', workout.name);
console.log('Week:', workout.week, 'Day:', workout.day);
console.log('Segments:', workout.segments.length);
console.log('Duration:', workout.duration, 'seconds');
"
```

Expected: Shows parsed workout details

**Step 4: Commit**

```bash
git add lib/zwoParser.ts lib/metrics.ts
git commit -m "feat: add ZWO XML parser with segment extraction"
```

---

## Task 5: Create Program Scanner

**Files:**
- Create: `lib/programScanner.ts`

**Step 1: Create program scanner module**

```typescript
// lib/programScanner.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseZWOFile } from './zwoParser.js';
import type { ParsedWorkout, ProgramStructure, WeekStructure, ProgramStats } from './types.js';

/**
 * Scan a program directory and parse all ZWO files
 */
export async function scanProgram(programPath: string): Promise<ProgramStructure> {
  const zwoFilesDir = path.join(programPath, 'zwo_files');

  if (!fs.existsSync(zwoFilesDir)) {
    throw new Error(`ZWO files directory not found: ${zwoFilesDir}`);
  }

  // Get all .zwo files
  const files = fs.readdirSync(zwoFilesDir)
    .filter(f => f.endsWith('.zwo'))
    .map(f => path.join(zwoFilesDir, f));

  // Parse all workouts in parallel
  const workouts = await Promise.all(files.map(parseZWOFile));

  // Build week structure
  const weeks = buildWeekStructure(workouts);

  // Calculate program stats
  const stats = calculateProgramStats(workouts, weeks);

  return {
    programName: path.basename(programPath),
    programPath,
    weeks,
    workouts,
    stats,
  };
}

/**
 * Build week structure from workouts
 */
function buildWeekStructure(workouts: ParsedWorkout[]): Map<number, WeekStructure> {
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

    const week = weeks.get(workout.week)!;
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
  weeks: Map<number, WeekStructure>
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
      if (segment.type === 'warmup' || segment.type === 'cooldown' || segment.type === 'ramp') {
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
```

**Step 2: Test scanner**

```bash
bun run -e "
import { scanProgram } from './lib/programScanner.js';
const program = await scanProgram('programs/12_weeks_ftp_builder');
console.log('Program:', program.programName);
console.log('Workouts:', program.workouts.length);
console.log('Weeks:', program.weeks.size);
console.log('Total TSS:', program.stats.totalTSS);
console.log('Zone distribution:', program.stats.intensityDistribution);
"
```

Expected: Shows program statistics

**Step 3: Commit**

```bash
git add lib/programScanner.ts
git commit -m "feat: add program scanner with week/day structure builder"
```

---

## Task 6: Adapt Individual Image Generator

**Files:**
- Modify: `lib/imageGenerator.ts`

**Step 1: Add function to generate from ParsedWorkout**

Add new function at the end of `lib/imageGenerator.ts`:

```typescript
// Add import at top
import type { ParsedWorkout, ProgramStructure } from './types.js';

// Add new function before existing generateAllWorkoutImages
export function generateWorkoutImageFromParsed(
  workout: ParsedWorkout,
  outputPath: string,
  ftp: number = 200
): void {
  generateWorkoutImage(
    {
      name: workout.name,
      description: workout.description,
      tags: workout.tags,
      segments: workout.segments,
    },
    outputPath,
    ftp
  );
}

// Add function to generate all individual images for a program
export function generateProgramWorkoutImages(
  program: ProgramStructure,
  ftp: number = 200
): void {
  const outputDir = path.join(program.programPath, 'images', 'individual');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let count = 0;
  for (const workout of program.workouts) {
    const filename = workout.filename.replace('.zwo', '.png');
    const outputPath = path.join(outputDir, filename);
    generateWorkoutImageFromParsed(workout, outputPath, ftp);
    console.log(`Generated: ${outputPath}`);
    count++;
  }

  console.log(`\nGenerated ${count} workout images in ${outputDir}/`);
}
```

**Step 2: Test individual image generation**

```bash
bun run -e "
import { scanProgram } from './lib/programScanner.js';
import { generateProgramWorkoutImages } from './lib/imageGenerator.js';
const program = await scanProgram('programs/12_weeks_ftp_builder');
generateProgramWorkoutImages(program);
"
```

Expected: Generates PNG files in `programs/12_weeks_ftp_builder/images/individual/`

**Step 3: Commit**

```bash
git add lib/imageGenerator.ts
git commit -m "feat: adapt image generator for ParsedWorkout"
```

---

## Task 7: Create Calendar Grid Generator

**Files:**
- Create: `lib/calendarGenerator.ts`

**Step 1: Create calendar grid generator**

```typescript
// lib/calendarGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createCanvas } from 'canvas';
import type { ProgramStructure, ParsedWorkout } from './types.js';

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
  sweetspot: '#F39C12',
  threshold: '#E67E22',
  vo2max: '#E74C3C',
};

function getPowerColor(power: number): string {
  if (power <= 0.6) return POWER_COLORS.recovery;
  if (power <= 0.75) return POWER_COLORS.endurance;
  if (power <= 0.87) return POWER_COLORS.tempo;
  if (power <= 0.93) return POWER_COLORS.sweetspot;
  if (power <= 1.05) return POWER_COLORS.threshold;
  return POWER_COLORS.vo2max;
}

function getDominantZoneColor(workout: ParsedWorkout): string {
  let totalTime = 0;
  const timeInZone = {
    recovery: 0,
    endurance: 0,
    tempo: 0,
    sweetspot: 0,
    threshold: 0,
    vo2max: 0,
  };

  for (const segment of workout.segments) {
    const duration = segment.duration;
    totalTime += duration;

    let power: number;
    if (segment.type === 'warmup' || segment.type === 'cooldown' || segment.type === 'ramp') {
      power = (segment.powerLow + segment.powerHigh) / 2;
    } else {
      power = segment.power;
    }

    if (power <= 0.6) timeInZone.recovery += duration;
    else if (power <= 0.75) timeInZone.endurance += duration;
    else if (power <= 0.87) timeInZone.tempo += duration;
    else if (power <= 0.93) timeInZone.sweetspot += duration;
    else if (power <= 1.05) timeInZone.threshold += duration;
    else timeInZone.vo2max += duration;
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
  const maxWeek = Math.max(...Array.from(program.weeks.keys()));
  const rows = maxWeek;
  const cols = 7;

  const width = LABEL_WIDTH + cols * (CELL_WIDTH + CELL_PADDING) + CELL_PADDING;
  const height = HEADER_HEIGHT + rows * (CELL_HEIGHT + CELL_PADDING) + CELL_PADDING;

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
    const x = LABEL_WIDTH + (day - 1) * (CELL_WIDTH + CELL_PADDING) + CELL_WIDTH / 2 + CELL_PADDING;
    ctx.fillText(DAY_NAMES[day], x, 25);
  }

  // Draw week labels and cells
  for (let week = 1; week <= maxWeek; week++) {
    const y = HEADER_HEIGHT + (week - 1) * (CELL_HEIGHT + CELL_PADDING) + CELL_PADDING;

    // Week label
    ctx.fillStyle = '#34495E';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Week ${week}`, LABEL_WIDTH - 10, y + CELL_HEIGHT / 2);

    // Draw cells for each day
    const weekData = program.weeks.get(week);

    for (let day = 1; day <= 7; day++) {
      const x = LABEL_WIDTH + (day - 1) * (CELL_WIDTH + CELL_PADDING) + CELL_PADDING;

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
  ctx: any,
  workout: ParsedWorkout,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const chartPadding = 5;
  const chartWidth = width - 2 * chartPadding;
  const chartHeight = height - 30; // Leave space for TSS label

  const totalDuration = workout.duration;

  // Find max power
  const powerLevels = workout.segments.flatMap((seg) => {
    if (seg.type === 'warmup' || seg.type === 'cooldown' || seg.type === 'ramp')
      return [seg.powerLow, seg.powerHigh];
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
    const segWidth = (segment.duration / totalDuration) * chartWidth;

    if (segment.type === 'steady') {
      const power = segment.power;
      const segHeight = (power / maxPower) * chartHeight;
      const segY = y + chartPadding + chartHeight - segHeight;

      ctx.fillStyle = getPowerColor(power);
      ctx.fillRect(segX, segY, segWidth, segHeight);
    } else {
      // Warmup, cooldown, ramp
      const powerLow = segment.powerLow;
      const powerHigh = segment.powerHigh;

      const yLow = y + chartPadding + chartHeight - (powerLow / maxPower) * chartHeight;
      const yHigh = y + chartPadding + chartHeight - (powerHigh / maxPower) * chartHeight;

      ctx.fillStyle = getPowerColor((powerLow + powerHigh) / 2);
      ctx.beginPath();
      ctx.moveTo(segX, y + chartPadding + chartHeight);
      ctx.lineTo(segX, segment.type === 'cooldown' ? yHigh : yLow);
      ctx.lineTo(segX + segWidth, segment.type === 'cooldown' ? yLow : yHigh);
      ctx.lineTo(segX + segWidth, y + chartPadding + chartHeight);
      ctx.closePath();
      ctx.fill();
    }

    currentTime += segment.duration;
  }

  // Draw TSS label
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 11px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round(workout.tss)} TSS`, x + width / 2, y + height - 8);
}
```

**Step 2: Test calendar generation**

```bash
bun run -e "
import { scanProgram } from './lib/programScanner.js';
import { generateCalendarImage } from './lib/calendarGenerator.js';
const program = await scanProgram('programs/12_weeks_ftp_builder');
generateCalendarImage(program);
"
```

Expected: Generates `programs/12_weeks_ftp_builder/images/calendar.png`

**Step 3: Commit**

```bash
git add lib/calendarGenerator.ts
git commit -m "feat: add calendar grid generator with mini workout profiles"
```

---

## Task 8: Create Progression Charts Generator

**Files:**
- Create: `lib/progressionGenerator.ts`

**Step 1: Create progression charts generator**

```typescript
// lib/progressionGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import { createCanvas } from 'canvas';
import type { ProgramStructure } from './types.js';

const CHART_WIDTH = 1200;
const CHART_HEIGHT = 800;
const PADDING = 80;
const CHART_PADDING = 60;

export function generateProgressionCharts(program: ProgramStructure): void {
  const canvas = createCanvas(CHART_WIDTH, CHART_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, CHART_WIDTH, CHART_HEIGHT);

  // Title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${program.programName} - Progression Analysis`, CHART_WIDTH / 2, 40);

  // Draw 4 charts in 2x2 grid
  const chartWidth = (CHART_WIDTH - 3 * PADDING) / 2;
  const chartHeight = (CHART_HEIGHT - 3 * PADDING - 40) / 2;

  // Chart 1: TSS over time (top-left)
  drawTSSChart(
    ctx,
    program,
    PADDING,
    PADDING + 40,
    chartWidth,
    chartHeight
  );

  // Chart 2: IF over time (top-right)
  drawIFChart(
    ctx,
    program,
    2 * PADDING + chartWidth,
    PADDING + 40,
    chartWidth,
    chartHeight
  );

  // Chart 3: Hours per week (bottom-left)
  drawHoursPerWeekChart(
    ctx,
    program,
    PADDING,
    2 * PADDING + chartHeight + 40,
    chartWidth,
    chartHeight
  );

  // Chart 4: Zone distribution (bottom-right)
  drawZoneDistributionChart(
    ctx,
    program,
    2 * PADDING + chartWidth,
    2 * PADDING + chartHeight + 40,
    chartWidth,
    chartHeight
  );

  // Save to file
  const outputPath = path.join(program.programPath, 'images', 'progression.png');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Generated progression charts: ${outputPath}`);
}

function drawTSSChart(
  ctx: any,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const weeks = Array.from(program.weeks.values()).sort((a, b) => a.weekNumber - b.weekNumber);
  const maxTSS = Math.max(...weeks.map(w => w.totalTSS));

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
    const chartX = x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    const chartY = y + CHART_PADDING + chartHeight - (week.totalTSS / maxTSS) * chartHeight;

    if (index === 0) {
      ctx.moveTo(chartX, chartY);
    } else {
      ctx.lineTo(chartX, chartY);
    }
  });

  ctx.stroke();

  // Draw data points
  weeks.forEach((week, index) => {
    const chartX = x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    const chartY = y + CHART_PADDING + chartHeight - (week.totalTSS / maxTSS) * chartHeight;

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
    const chartX = x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    ctx.fillText(`W${week.weekNumber}`, chartX, y + height - CHART_PADDING + 20);
  });
}

function drawIFChart(
  ctx: any,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const weeks = Array.from(program.weeks.values()).sort((a, b) => a.weekNumber - b.weekNumber);

  // Calculate avg IF per week
  const weekIFs = weeks.map(week => {
    const workouts = Array.from(week.days.values());
    const avgIF = workouts.reduce((sum, w) => sum + w.intensityFactor, 0) / workouts.length;
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
    const chartX = x + CHART_PADDING + (index / (weekIFs.length - 1)) * chartWidth;
    const chartY = y + CHART_PADDING + chartHeight - (ifValue / maxIF) * chartHeight;

    if (index === 0) {
      ctx.moveTo(chartX, chartY);
    } else {
      ctx.lineTo(chartX, chartY);
    }
  });

  ctx.stroke();

  // Draw data points
  weekIFs.forEach((ifValue, index) => {
    const chartX = x + CHART_PADDING + (index / (weekIFs.length - 1)) * chartWidth;
    const chartY = y + CHART_PADDING + chartHeight - (ifValue / maxIF) * chartHeight;

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
    const chartX = x + CHART_PADDING + (index / (weeks.length - 1)) * chartWidth;
    ctx.fillText(`W${week.weekNumber}`, chartX, y + height - CHART_PADDING + 20);
  });
}

function drawHoursPerWeekChart(
  ctx: any,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const weeks = Array.from(program.weeks.values()).sort((a, b) => a.weekNumber - b.weekNumber);
  const weekHours = weeks.map(w => w.totalDuration / 3600);
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
  const barWidth = chartWidth / weeks.length * 0.8;

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
    ctx.fillText(`W${week.weekNumber}`, barX + barWidth / 2, y + height - CHART_PADDING + 20);
  });
}

function drawZoneDistributionChart(
  ctx: any,
  program: ProgramStructure,
  x: number,
  y: number,
  width: number,
  height: number
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
    ctx.fillText(`${zone.name}: ${zone.value.toFixed(1)}%`, x + 40, legendY + 12);

    legendY += 20;
  });
}
```

**Step 2: Test progression charts**

```bash
bun run -e "
import { scanProgram } from './lib/programScanner.js';
import { generateProgressionCharts } from './lib/progressionGenerator.js';
const program = await scanProgram('programs/12_weeks_ftp_builder');
generateProgressionCharts(program);
"
```

Expected: Generates `programs/12_weeks_ftp_builder/images/progression.png`

**Step 3: Commit**

```bash
git add lib/progressionGenerator.ts
git commit -m "feat: add progression charts generator (TSS, IF, hours, zones)"
```

---

## Task 9: Create README Generator

**Files:**
- Create: `lib/readmeGenerator.ts`

**Step 1: Create README generator**

```typescript
// lib/readmeGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ProgramStructure } from './types.js';

export function generateREADME(program: ProgramStructure): void {
  const lines: string[] = [];

  // Header
  lines.push(`# ${program.programName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  lines.push('');

  // Overview
  lines.push('## Overview');
  lines.push('');
  lines.push(`- **Total Weeks:** ${program.stats.totalWeeks}`);
  lines.push(`- **Total Workouts:** ${program.stats.totalWorkouts}`);
  lines.push(`- **Total TSS:** ${Math.round(program.stats.totalTSS)}`);
  lines.push(`- **Total Hours:** ${program.stats.totalHours.toFixed(1)}`);
  lines.push(`- **Average TSS/Week:** ${Math.round(program.stats.avgTSSPerWeek)}`);
  lines.push(`- **Average Hours/Week:** ${program.stats.avgHoursPerWeek.toFixed(1)}`);
  lines.push('');

  // Zone distribution
  lines.push('## Intensity Distribution');
  lines.push('');
  const dist = program.stats.intensityDistribution;
  lines.push(`- **Recovery (<60% FTP):** ${dist.recovery.toFixed(1)}%`);
  lines.push(`- **Endurance (60-75% FTP):** ${dist.endurance.toFixed(1)}%`);
  lines.push(`- **Tempo (76-87% FTP):** ${dist.tempo.toFixed(1)}%`);
  lines.push(`- **Threshold (88-105% FTP):** ${dist.threshold.toFixed(1)}%`);
  lines.push(`- **VO2max (>105% FTP):** ${dist.vo2max.toFixed(1)}%`);
  lines.push('');

  // Calendar image
  lines.push('## Program Calendar');
  lines.push('');
  lines.push('![Program Calendar](images/calendar.png)');
  lines.push('');

  // Progression charts
  lines.push('## Progression Analysis');
  lines.push('');
  lines.push('![Progression Charts](images/progression.png)');
  lines.push('');

  // Weekly breakdown
  lines.push('## Weekly Breakdown');
  lines.push('');

  const weeks = Array.from(program.weeks.values()).sort((a, b) => a.weekNumber - b.weekNumber);

  for (const week of weeks) {
    lines.push(`### Week ${week.weekNumber}`);
    lines.push('');
    lines.push(`**Weekly Total:** ${Math.round(week.totalTSS)} TSS, ${(week.totalDuration / 3600).toFixed(1)} hours`);
    lines.push('');

    const days = Array.from(week.days.entries()).sort((a, b) => a[0] - b[0]);

    for (const [day, workout] of days) {
      const mins = Math.round(workout.duration / 60);
      lines.push(`- **Day ${day} (${workout.dayName}):** ${workout.workoutName} - ${Math.round(workout.tss)} TSS, ${mins} min`);

      // Link to image
      const imageFilename = workout.filename.replace('.zwo', '.png');
      lines.push(`  ![${workout.workoutName}](images/individual/${imageFilename})`);
      lines.push('');
    }

    lines.push('');
  }

  // Usage section
  lines.push('## Usage');
  lines.push('');
  lines.push('### Import ZWO Files');
  lines.push('');
  lines.push('The `.zwo` files in the `zwo_files/` directory can be imported into:');
  lines.push('');
  lines.push('- **Zwift** - Import custom workouts');
  lines.push('- **MyWhoosh** - Import workout files');
  lines.push('- **TrainingPeaks** - Upload ZWO files');
  lines.push('- Any other platform that supports the ZWO format');
  lines.push('');

  // Interactive viewer
  lines.push('### Interactive Viewer');
  lines.push('');
  lines.push('Open `docs/index.html` in your browser for an interactive workout calendar and statistics dashboard.');
  lines.push('');

  // Save to file
  const outputPath = path.join(program.programPath, 'README.md');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');

  console.log(`Generated README: ${outputPath}`);
}
```

**Step 2: Test README generation**

```bash
bun run -e "
import { scanProgram } from './lib/programScanner.js';
import { generateREADME } from './lib/readmeGenerator.js';
const program = await scanProgram('programs/12_weeks_ftp_builder');
generateREADME(program);
"
```

Expected: Generates `programs/12_weeks_ftp_builder/README.md`

**Step 3: Commit**

```bash
git add lib/readmeGenerator.ts
git commit -m "feat: add README generator with weekly breakdown and images"
```

---

## Task 10: Create HTML Generator

**Files:**
- Create: `lib/htmlGenerator.ts`

**Step 1: Create HTML generator with embedded viewer**

```typescript
// lib/htmlGenerator.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ProgramStructure } from './types.js';

export function generateHTML(program: ProgramStructure): void {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${program.programName} - Interactive Viewer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f6f7;
            color: #2c3e50;
            line-height: 1.6;
        }

        header {
            background: #2c3e50;
            color: white;
            padding: 2rem;
            text-align: center;
        }

        header h1 {
            margin-bottom: 0.5rem;
        }

        .container {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 2rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
            font-size: 0.875rem;
            color: #7f8c8d;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .stat-card .value {
            font-size: 2rem;
            font-weight: bold;
            color: #3498db;
        }

        .calendar-section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }

        .calendar-section h2 {
            margin-bottom: 1rem;
        }

        .calendar-table {
            width: 100%;
            border-collapse: collapse;
        }

        .calendar-table th {
            background: #ecf0f1;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
        }

        .calendar-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #ecf0f1;
        }

        .workout-link {
            color: #3498db;
            text-decoration: none;
            cursor: pointer;
        }

        .workout-link:hover {
            text-decoration: underline;
        }

        .tss-badge {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-left: 0.5rem;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 1000px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #7f8c8d;
        }

        .modal-close:hover {
            color: #2c3e50;
        }

        .workout-image {
            width: 100%;
            margin: 1rem 0;
        }

        .charts-section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .charts-section img {
            width: 100%;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>${program.programName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
        <p>Interactive Workout Calendar & Statistics</p>
    </header>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Weeks</h3>
                <div class="value">${program.stats.totalWeeks}</div>
            </div>
            <div class="stat-card">
                <h3>Total Workouts</h3>
                <div class="value">${program.stats.totalWorkouts}</div>
            </div>
            <div class="stat-card">
                <h3>Total TSS</h3>
                <div class="value">${Math.round(program.stats.totalTSS)}</div>
            </div>
            <div class="stat-card">
                <h3>Total Hours</h3>
                <div class="value">${program.stats.totalHours.toFixed(1)}</div>
            </div>
            <div class="stat-card">
                <h3>Avg TSS/Week</h3>
                <div class="value">${Math.round(program.stats.avgTSSPerWeek)}</div>
            </div>
            <div class="stat-card">
                <h3>Avg Hours/Week</h3>
                <div class="value">${program.stats.avgHoursPerWeek.toFixed(1)}</div>
            </div>
        </div>

        <div class="calendar-section">
            <h2>Workout Calendar</h2>
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Day</th>
                        <th>Workout</th>
                        <th>Duration</th>
                        <th>TSS</th>
                    </tr>
                </thead>
                <tbody>
${generateCalendarRows(program)}
                </tbody>
            </table>
        </div>

        <div class="charts-section">
            <h2>Progression Analysis</h2>
            <img src="../images/progression.png" alt="Progression Charts">
        </div>
    </div>

    <div class="modal" id="workoutModal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div id="modalBody"></div>
        </div>
    </div>

    <script>
        const workouts = ${JSON.stringify(generateWorkoutData(program))};

        function showWorkout(filename) {
            const workout = workouts[filename];
            if (!workout) return;

            const modal = document.getElementById('workoutModal');
            const body = document.getElementById('modalBody');

            const imageFilename = filename.replace('.zwo', '.png');

            body.innerHTML = \`
                <h2>\${workout.name}</h2>
                <p><strong>Week \${workout.week}, Day \${workout.day} (\${workout.dayName})</strong></p>
                <p>\${workout.description}</p>
                <img src="../images/individual/\${imageFilename}" alt="\${workout.name}" class="workout-image">
                <div style="margin-top: 1rem;">
                    <strong>Duration:</strong> \${Math.round(workout.duration / 60)} minutes<br>
                    <strong>TSS:</strong> \${Math.round(workout.tss)}<br>
                    <strong>IF:</strong> \${workout.intensityFactor.toFixed(2)}<br>
                    <strong>NP:</strong> \${Math.round(workout.normalizedPower)}W
                </div>
            \`;

            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('workoutModal').classList.remove('active');
        }

        document.getElementById('workoutModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>
</html>`;

  const outputPath = path.join(program.programPath, 'docs', 'index.html');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log(`Generated HTML viewer: ${outputPath}`);
}

function generateCalendarRows(program: ProgramStructure): string {
  const weeks = Array.from(program.weeks.values()).sort((a, b) => a.weekNumber - b.weekNumber);
  const rows: string[] = [];

  for (const week of weeks) {
    const days = Array.from(week.days.entries()).sort((a, b) => a[0] - b[0]);

    for (const [day, workout] of days) {
      const mins = Math.round(workout.duration / 60);
      rows.push(`                    <tr>
                        <td>${week.weekNumber}</td>
                        <td>${day} (${workout.dayName})</td>
                        <td>
                            <a class="workout-link" onclick="showWorkout('${workout.filename}')">${workout.workoutName}</a>
                        </td>
                        <td>${mins} min</td>
                        <td><span class="tss-badge">${Math.round(workout.tss)} TSS</span></td>
                    </tr>`);
    }
  }

  return rows.join('\n');
}

function generateWorkoutData(program: ProgramStructure): Record<string, any> {
  const data: Record<string, any> = {};

  for (const workout of program.workouts) {
    data[workout.filename] = {
      name: workout.name,
      description: workout.description,
      week: workout.week,
      day: workout.day,
      dayName: workout.dayName,
      duration: workout.duration,
      tss: workout.tss,
      intensityFactor: workout.intensityFactor,
      normalizedPower: workout.normalizedPower,
    };
  }

  return data;
}
```

**Step 2: Test HTML generation**

```bash
bun run -e "
import { scanProgram } from './lib/programScanner.js';
import { generateHTML } from './lib/htmlGenerator.js';
const program = await scanProgram('programs/12_weeks_ftp_builder');
generateHTML(program);
"
```

Expected: Generates `programs/12_weeks_ftp_builder/docs/index.html`

**Step 3: Verify HTML in browser**

```bash
open programs/12_weeks_ftp_builder/docs/index.html
```

Expected: Opens interactive viewer in browser

**Step 4: Commit**

```bash
git add lib/htmlGenerator.ts
git commit -m "feat: add HTML interactive viewer with modal workout details"
```

---

## Task 11: Create Main Entry Point

**Files:**
- Create: `generate-all.ts`

**Step 1: Create main generator script**

```typescript
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
```

**Step 2: Update package.json scripts**

Modify `package.json`:

```json
{
  "scripts": {
    "start": "bun run generate-all.ts",
    "generate": "bun run generate-all.ts",
    "generate:12weeks": "bun run generate-all.ts programs/12_weeks_ftp_builder",
    "generate:8weeks": "bun run generate-all.ts programs/8_weeks_road_builder",
    "generate:recoveries": "bun run generate-all.ts programs/recoveries",
    "format": "biome format --write .",
    "format:check": "biome format .",
    "lint": "biome lint --write .",
    "lint:check": "biome lint .",
    "check": "biome check --write .",
    "check:ci": "biome check .",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

**Step 3: Test main script**

```bash
bun run generate:12weeks
```

Expected: Generates all outputs for 12 weeks program

**Step 4: Commit**

```bash
git add generate-all.ts package.json
git commit -m "feat: add main entry point for ZWO-to-image generation"
```

---

## Task 12: Test All Programs

**Files:**
- None (testing only)

**Step 1: Run full generation for all programs**

```bash
bun run start
```

Expected: Generates outputs for all 3 programs

**Step 2: Verify outputs exist**

```bash
ls -R programs/*/images/
ls programs/*/docs/
ls programs/*/README.md
```

Expected: All directories contain generated files

**Step 3: Verify in browser**

```bash
open programs/12_weeks_ftp_builder/docs/index.html
open programs/8_weeks_road_builder/docs/index.html
```

Expected: HTML viewers work correctly

**Step 4: If all looks good, commit verification**

```bash
git add programs/
git commit -m "chore: generated outputs for all programs from ZWO files"
```

---

## Task 13: Remove Old TypeScript Workout Definitions

**Files:**
- Delete: `programs/12_weeks_ftp_builder/12_weeks_ftp_builder.ts`
- Delete: `programs/8_weeks_road_builder/8_weeks_road_builder.ts`
- Delete: `programs/recoveries/recoveries.ts`
- Delete: `lib/fileGenerator.ts`

**Step 1: Remove TypeScript workout files**

```bash
git rm programs/12_weeks_ftp_builder/12_weeks_ftp_builder.ts
git rm programs/8_weeks_road_builder/8_weeks_road_builder.ts
git rm programs/recoveries/recoveries.ts
```

Expected: Files staged for deletion

**Step 2: Remove ZWO file generator (no longer needed)**

```bash
git rm lib/fileGenerator.ts
```

Expected: File staged for deletion

**Step 3: Verify system still works without them**

```bash
bun run generate:12weeks
```

Expected: Still generates successfully

**Step 4: Commit cleanup**

```bash
git commit -m "chore: remove TypeScript workout definitions and ZWO generator

ZWO files are now the source of truth. TypeScript workout definitions
are no longer needed since we parse existing ZWO files."
```

---

## Task 14: Update Main README

**Files:**
- Modify: `README.md`

**Step 1: Update README to reflect new architecture**

Update the "Usage" section in root `README.md`:

```markdown
## Usage

### Option 1: Use Pre-Generated Files

The `.zwo` files in each program's `zwo_files/` directory can be directly imported into:

- **Zwift** - Import custom workouts
- **MyWhoosh** - Import workout files
- **TrainingPeaks** - Upload ZWO files
- Any other platform that supports the ZWO format

### Option 2: Generate Visualizations from ZWO Files

If you have your own ZWO files or want to regenerate the visualizations:

```bash
# Install dependencies
bun install

# Generate all outputs (images, calendar, charts, HTML viewer, README)
bun run start

# Or generate for a specific program
bun run generate:12weeks
bun run generate:8weeks
bun run generate:recoveries
```

This will generate:
- Individual workout profile images (`programs/*/images/individual/`)
- Program calendar grid (`programs/*/images/calendar.png`)
- Progression analysis charts (`programs/*/images/progression.png`)
- Interactive HTML viewer (`programs/*/docs/index.html`)
- Auto-generated README with weekly breakdown (`programs/*/README.md`)

### Interactive Viewers

Each program includes an interactive HTML viewer:
- `programs/12_weeks_ftp_builder/docs/index.html`
- `programs/8_weeks_road_builder/docs/index.html`
- `programs/recoveries/docs/index.html`

Open these files in your browser for:
- Clickable workout calendar
- Detailed workout visualizations
- Statistics dashboard
- Weekly progression charts

## Requirements

- Bun runtime (or Node.js with package.json adjustments)
```

**Step 2: Verify format**

```bash
bun run format:check
```

Expected: No format issues

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README for ZWO-to-image architecture"
```

---

## Task 15: Final Verification and Cleanup

**Files:**
- None (verification only)

**Step 1: Run full check**

```bash
bun run check:ci
```

Expected: No linting or formatting errors

**Step 2: Test complete workflow**

```bash
# Clean generated files
rm -rf programs/*/images programs/*/docs

# Regenerate everything
bun run start

# Verify outputs
ls -lh programs/12_weeks_ftp_builder/images/individual/ | wc -l
ls -lh programs/12_weeks_ftp_builder/images/
open programs/12_weeks_ftp_builder/docs/index.html
```

Expected: All files generated correctly, HTML viewer works

**Step 3: Final commit if any adjustments made**

```bash
git status
# If changes:
git add .
git commit -m "chore: final cleanup and verification"
```

---

## Execution Complete

**Summary:**
- ✓ ZWO parser created
- ✓ Program scanner with week/day structure
- ✓ Individual workout images generated
- ✓ Calendar grid visualization
- ✓ Progression charts (TSS, IF, hours, zones)
- ✓ Interactive HTML viewer
- ✓ Auto-generated READMEs
- ✓ Old TypeScript definitions removed
- ✓ Documentation updated

**Architecture:**
ZWO files → Parse → Generate Images + Calendar + Charts + HTML + README

The codebase has been successfully transformed from TypeScript-based generation to ZWO-based parsing with comprehensive visual outputs.
