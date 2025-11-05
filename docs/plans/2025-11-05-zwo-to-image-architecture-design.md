# ZWO-to-Image Architecture Design

**Date:** 2025-11-05
**Status:** Approved
**Author:** Claude Code

## Overview

Complete architectural redesign to reverse the program generation flow. Instead of TypeScript definitions generating ZWO files and images, the system will parse existing ZWO files to generate comprehensive visual outputs including individual workout images, program calendars, progression charts, HTML viewer, and auto-generated documentation.

## Current vs. New Architecture

### Current Flow (Being Replaced)
```
TypeScript Workout Definitions
    ↓
Generate ZWO Files + Images
```

### New Flow
```
ZWO Files (XML) [Input - Source of Truth]
    ↓
[ZWO Parser] → Extract segments + metadata
    ↓
[Workout Data Model] → Structured representation
    ↓
[Multiple Generators] → Images, HTML, Stats, README
    ↓
Output: images/, docs/, index.html
```

## Design Decisions

### Input/Output Structure
- **Input:** Existing ZWO files in `programs/*/zwo_files/`
- **Filename Pattern:** `W(\d+)-D(\d+)-(\w+)-(.+)\.zwo` (e.g., `W07-D6-Saturday-Sweet_Spot_3x25.zwo`)
- **Output Directory Structure:**
  ```
  programs/
    {program_name}/
      zwo_files/           # Input (existing ZWO files)
      images/              # Generated output
        individual/        # Individual workout profiles
        calendar.png       # Week × Day grid visualization
        progression.png    # TSS/IF charts over time
      docs/
        index.html         # Interactive workout viewer
        stats.json         # Program statistics
      README.md            # Auto-generated program documentation
  ```

### Scope
- **Replace entirely:** Remove all TypeScript workout definition files
- **Full suite output:** Individual images + calendar + HTML + statistics + README generation

## Core Components

### 1. ZWO Parser Module (`lib/zwoParser.ts`)

**Responsibilities:**
- Parse ZWO XML files using lightweight XML parser (xml2js or Node built-in)
- Extract workout metadata: name, description, tags, author
- Parse workout segments and map to existing types:
  - `<Warmup Duration PowerLow PowerHigh>` → `WarmupSegment`
  - `<Cooldown Duration PowerHigh PowerLow>` → `CooldownSegment`
  - `<SteadyState Duration Power>` → `SteadyStateSegment`
  - `<Ramp Duration PowerLow PowerHigh>` → `RampSegment`
  - `<textevent timeoffset message>` → `messages[]`
- Handle optional attributes: cadence, text events

**Key Functions:**
```typescript
async function parseZWOFile(filepath: string): Promise<ParsedWorkout>
function extractSegments(workoutXML: any): Segment[]
function extractMetadata(workoutXML: any): WorkoutMetadata
```

### 2. Filename Parser (`lib/filenameParser.ts`)

**Responsibilities:**
- Parse structured filename pattern: `W##-D#-DayName-WorkoutName.zwo`
- Extract week number, day number, day name, workout name
- Handle edge cases (files without standard pattern)

**Pattern:** `W(\d+)-D(\d+)-(\w+)-(.+)\.zwo`

**Key Functions:**
```typescript
function parseFilename(filename: string): FilenameMetadata | null
interface FilenameMetadata {
  week: number;
  day: number;
  dayName: string;
  workoutName: string;
}
```

### 3. Program Scanner (`lib/programScanner.ts`)

**Responsibilities:**
- Recursively scan `programs/*/zwo_files/` directories
- Load and parse all ZWO files
- Build program structure with week/day organization
- Calculate program-level statistics

**Key Functions:**
```typescript
async function scanProgram(programPath: string): Promise<ProgramStructure>
function buildWeekStructure(workouts: ParsedWorkout[]): Map<number, WeekStructure>
function calculateProgramStats(program: ProgramStructure): ProgramStats
```

### 4. Image Generators

#### 4a. Individual Workout Images (adapt existing `lib/imageGenerator.ts`)
- Reuse existing visualization code
- Adapt to work with parsed ZWO data instead of TypeScript definitions
- Output to `programs/{program}/images/individual/`

#### 4b. Calendar Grid Generator (`lib/calendarGenerator.ts`)
**Features:**
- Matrix layout: Weeks (rows) × Days (columns, 1-7)
- Each cell contains mini workout profile
- Color-coded by dominant intensity zone
- TSS overlay on each cell
- Week totals on right margin
- Output: `programs/{program}/images/calendar.png`

**Visual Design:**
- Cell size: ~180×120 pixels
- Grid spacing: 10px
- Headers: Week numbers (left), Day names (top)
- Legend: Zone colors + TSS scale

#### 4c. Progression Charts Generator (`lib/progressionGenerator.ts`)
**Charts:**
1. TSS over time (line chart)
2. Intensity Factor over time (line chart)
3. Hours per week (bar chart)
4. Zone distribution per week (stacked bar chart)

**Output:** `programs/{program}/images/progression.png`

**Chart Library:** Canvas-based (reuse existing canvas dependency)

### 5. HTML Generator (`lib/htmlGenerator.ts`)

**Responsibilities:**
- Generate interactive workout viewer
- Embed workout images
- Create statistics dashboard
- Enable filtering and navigation

**Features:**
- Calendar view with clickable workout cells
- Modal popup with workout details + image
- Statistics dashboard (total TSS, hours, zone distribution)
- Filter by week, day, workout type
- Responsive design for desktop viewing

**Output:** `programs/{program}/docs/index.html`

**Dependencies:** Self-contained HTML (no external CDN dependencies)

### 6. README Generator (`lib/readmeGenerator.ts`)

**Responsibilities:**
- Auto-generate program README.md
- Weekly breakdown with workout summaries
- Include key statistics (TSS, duration, intensity)
- Link to images and HTML viewer

**Structure:**
```markdown
# {Program Name}

## Overview
- Total Weeks: X
- Total Workouts: X
- Total TSS: X
- Average Hours/Week: X

## Weekly Breakdown

### Week 1
- **Day 2 (Tuesday):** FTP Test - 80 TSS, 75 min
- **Day 3 (Wednesday):** Recovery - 23 TSS, 40 min
...

## Zone Distribution
- Recovery (<60%): X%
- Endurance (60-75%): X%
...
```

**Output:** `programs/{program}/README.md`

## Data Model

### Extended Type Definitions

```typescript
// Extend lib/types.ts

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

## Main Entry Point

### Updated `package.json` scripts

```json
{
  "scripts": {
    "start": "bun run generate-all.ts",
    "generate": "bun run generate-all.ts",
    "generate:12weeks": "bun run generate-all.ts programs/12_weeks_ftp_builder",
    "generate:8weeks": "bun run generate-all.ts programs/8_weeks_road_builder",
    "generate:recoveries": "bun run generate-all.ts programs/recoveries"
  }
}
```

### Main Generator (`generate-all.ts`)

```typescript
import { scanProgram } from './lib/programScanner.js';
import { generateIndividualImages } from './lib/imageGenerator.js';
import { generateCalendarImage } from './lib/calendarGenerator.js';
import { generateProgressionCharts } from './lib/progressionGenerator.js';
import { generateHTML } from './lib/htmlGenerator.js';
import { generateREADME } from './lib/readmeGenerator.js';

async function generateProgramOutputs(programPath: string) {
  console.log(`Generating outputs for: ${programPath}`);

  // 1. Scan and parse ZWO files
  const program = await scanProgram(programPath);
  console.log(`Found ${program.workouts.length} workouts`);

  // 2. Generate all outputs in parallel
  await Promise.all([
    generateIndividualImages(program),
    generateCalendarImage(program),
    generateProgressionCharts(program),
    generateHTML(program),
    generateREADME(program),
  ]);

  console.log(`✓ Complete: ${programPath}`);
}

// Main execution
const programPaths = process.argv.length > 2
  ? [process.argv[2]]
  : [
      'programs/12_weeks_ftp_builder',
      'programs/8_weeks_road_builder',
      'programs/recoveries',
    ];

for (const path of programPaths) {
  await generateProgramOutputs(path);
}
```

## Dependencies

### Keep Existing
- `canvas` - Image generation (already installed)
- `@types/node` - TypeScript types

### Add New
- `xml2js` - XML parsing (lightweight, well-maintained)
- `@types/xml2js` - TypeScript types for xml2js

```json
{
  "dependencies": {
    "canvas": "^3.2.0",
    "xml2js": "^0.6.2"
  },
  "devDependencies": {
    "@biomejs/biome": "^2.2.5",
    "@types/node": "^24.7.1",
    "@types/xml2js": "^0.4.14",
    "bun": "^1.2.4"
  }
}
```

## Files to Remove

After implementation is complete and verified:
- `programs/12_weeks_ftp_builder/12_weeks_ftp_builder.ts`
- `programs/8_weeks_road_builder/8_weeks_road_builder.ts`
- `programs/recoveries/recoveries.ts`
- `lib/fileGenerator.ts` (ZWO generation no longer needed)

**Keep:**
- `lib/types.ts` (extend with new interfaces)
- `lib/metrics.ts` (reuse for calculations)
- `lib/imageGenerator.ts` (adapt for individual images)

## Implementation Phases

### Phase 1: Core Parsing
1. Implement ZWO parser
2. Implement filename parser
3. Implement program scanner
4. Add tests for parsing logic

### Phase 2: Image Generation
1. Adapt existing image generator for parsed data
2. Implement calendar grid generator
3. Implement progression charts generator
4. Test with existing ZWO files

### Phase 3: Documentation Generation
1. Implement HTML generator
2. Implement README generator
3. Export statistics JSON

### Phase 4: Integration & Testing
1. Create main entry point (`generate-all.ts`)
2. Update package.json scripts
3. Test with all programs
4. Verify output quality

### Phase 5: Cleanup
1. Remove TypeScript workout definition files
2. Remove unused ZWO generation code
3. Update main README
4. Final testing

## Success Criteria

- [ ] All existing ZWO files successfully parsed
- [ ] Individual workout images generated correctly
- [ ] Calendar grid shows all weeks × days properly
- [ ] Progression charts display TSS/IF trends
- [ ] HTML viewer is functional and responsive
- [ ] Auto-generated READMEs are accurate and complete
- [ ] Program statistics calculated correctly
- [ ] All three programs (12 weeks, 8 weeks, recoveries) work
- [ ] No TypeScript workout definitions remain
- [ ] Documentation updated

## Notes

- ZWO files remain the single source of truth
- External ZWO generators can be used and dropped into `zwo_files/` directories
- Filename pattern must be followed for week/day organization
- System is agnostic to how ZWO files are created
