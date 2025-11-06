# Flexible Program Configuration & LLM-Driven README Design

## Overview

This design replaces filename-based workout scheduling with explicit TypeScript configuration files and introduces optional LLM-powered README generation with comprehensive training context.

## Current System

**Filename Parsing:**
- `lib/filenameParser.ts` extracts week/day from filenames like `W01-D2-Tuesday-VO2max_30_30s.zwo`
- Rigid naming convention - renaming breaks structure
- Week/day info embedded in filenames

**README Generation:**
- `lib/readmeGenerator.ts` creates basic stats-only README
- Always runs during generation
- Minimal content: stats, tables, usage instructions

## New Architecture

### 1. Per-Program Configuration Files

Each program gets a `program.config.ts` file explicitly mapping workouts to schedule positions.

**Location:** `programs/[program_name]/program.config.ts`

**Structure:**
```typescript
// programs/8_weeks_road_builder/program.config.ts
import type { ProgramConfig } from '../../lib/types.js';

export const config: ProgramConfig = {
  name: "8 Weeks Road Builder",
  description: "8-week polarized training program focusing on VO2max and threshold development",

  schedule: [
    // Explicit workout mappings
    { week: 1, day: 2, dayName: "Tuesday", zwoFile: "VO2max_30_30s.zwo" },
    { week: 1, day: 3, dayName: "Wednesday", zwoFile: "Recovery_Easy.zwo" },
    { week: 1, day: 5, dayName: "Friday", zwoFile: "neuromuscular-power-surges-2.zwo" },
    { week: 1, day: 6, dayName: "Saturday", zwoFile: "Easy_Z2.zwo" },
    { week: 1, day: 7, dayName: "Sunday", zwoFile: "Long_Endurance_90min.zwo" },
    // ... rest of schedule
  ],

  // Optional metadata for LLM analysis
  tags: ["polarized", "vo2max", "road-racing"],
  targetAudience: "intermediate-advanced cyclists",
};
```

**Benefits:**
- Filenames can be descriptive without encoding structure
- Easy reordering/reorganization
- Single source of truth for program structure
- Metadata for future tooling

### 2. Type Definitions

**New types in `lib/types.ts`:**

```typescript
export interface ProgramConfig {
  name: string;
  description: string;
  schedule: WorkoutScheduleEntry[];
  tags?: string[];
  targetAudience?: string;
}

export interface WorkoutScheduleEntry {
  week: number;
  day: number;
  dayName: string;
  zwoFile: string;
}
```

**Updated ParsedWorkout:**
```typescript
export interface ParsedWorkout {
  // From ZWO file
  name: string;
  description: string;  // ← Use for LLM summaries
  author: string;
  tags: string[];
  segments: Segment[];

  // From config (not filename)
  week: number;
  day: number;
  dayName: string;
  workoutName: string;  // Derived from zwoFile or ZWO name

  // Calculated metrics
  duration: number;
  tss: number;
  intensityFactor: number;
  normalizedPower: number;

  // File metadata
  filepath: string;
  filename: string;
}
```

### 3. System Changes

**Files to Delete:**
- `lib/filenameParser.ts` - No fallback, clean break

**New File:**
- `lib/configLoader.ts` - Loads and validates program configs

```typescript
// lib/configLoader.ts
export async function loadProgramConfig(programPath: string): Promise<ProgramConfig> {
  const configPath = path.join(programPath, 'program.config.ts');

  if (!fs.existsSync(configPath)) {
    throw new Error(`Missing program.config.ts in ${programPath}`);
  }

  const module = await import(configPath);
  return module.config;
}

export function validateProgramConfig(config: ProgramConfig): void {
  // Validate required fields
  // Check for duplicate week/day entries
  // Ensure all referenced ZWO files exist
}
```

**Modified Files:**

**`lib/programScanner.ts`:**
```typescript
export async function scanProgram(programPath: string): Promise<ProgramStructure> {
  // 1. Load program config
  const config = await loadProgramConfig(programPath);
  validateProgramConfig(config);

  // 2. Parse ZWO files based on config schedule
  const zwoFilesDir = path.join(programPath, 'zwo_files');
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

  // 4. Calculate stats
  const stats = calculateProgramStats(workouts, weeks);

  return {
    programName: config.name,
    programPath,
    config,  // Include config in structure
    weeks,
    workouts,
    stats,
  };
}
```

**`generate-all.ts`:**
```typescript
async function generateProgramOutputs(programPath: string, generateReadme: boolean = false) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Generating outputs for: ${programPath}`);
  console.log('='.repeat(60));

  try {
    // 1. Scan and parse ZWO files
    console.log('\n[1/6] Scanning ZWO files...');
    const program = await scanProgram(programPath);

    // 2-4. Generate images, calendar, progression
    console.log('\n[2/6] Generating individual workout images...');
    await generateProgramWorkoutImages(program);

    console.log('\n[3/6] Generating calendar grid...');
    await generateCalendarImage(program);

    console.log('\n[4/6] Generating progression charts...');
    await generateProgressionCharts(program);

    console.log('\n[5/6] Generating HTML viewer...');
    await generateHTML(program);

    // 6. Generate README only if flag passed
    if (generateReadme) {
      console.log('\n[6/6] Generating detailed README with LLM analysis...');
      await generateDetailedREADME(program);
    } else {
      console.log('\n[6/6] Skipping README generation (use --detailed-readme flag)');
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✓ Complete: ${programPath}`);
    console.log('='.repeat(60));
  } catch (error) {
    console.error(`\n✗ Error processing ${programPath}:`, error);
    throw error;
  }
}

// CLI parsing
const args = process.argv.slice(2);
const generateReadme = args.includes('--detailed-readme');
const programPaths = args.filter(arg => !arg.startsWith('--'));

// Default to all programs if none specified
if (programPaths.length === 0) {
  programPaths.push(
    'programs/12_weeks_ftp_builder',
    'programs/8_weeks_road_builder',
    'programs/recoveries'
  );
}

for (const programPath of programPaths) {
  await generateProgramOutputs(programPath, generateReadme);
}
```

### 4. README Generation

**Only runs with `--detailed-readme` flag**

**New file: `lib/detailedReadmeGenerator.ts`**

```typescript
export async function generateDetailedREADME(program: ProgramStructure): Promise<void> {
  // 1. Build structured data for LLM
  const promptData = buildLLMPromptData(program);

  // 2. Generate README content via LLM
  const readmeContent = await generateReadmeWithLLM(promptData);

  // 3. Write to file
  const outputPath = path.join(program.programPath, 'README.md');
  fs.writeFileSync(outputPath, readmeContent, 'utf-8');

  console.log(`Generated detailed README: ${outputPath}`);
}

function buildLLMPromptData(program: ProgramStructure): object {
  return {
    programName: program.programName,
    description: program.config.description,
    stats: program.stats,
    weeks: Array.from(program.weeks.values()).map(week => ({
      weekNumber: week.weekNumber,
      totalTSS: week.totalTSS,
      totalHours: week.totalDuration / 3600,
      workouts: Array.from(week.days.values()).map(w => ({
        day: w.day,
        dayName: w.dayName,
        name: w.name,
        description: w.description,  // ← Key for understanding workout intent
        duration: w.duration,
        tss: w.tss,
        intensityFactor: w.intensityFactor,
      })),
    })),
    tags: program.config.tags,
    targetAudience: program.config.targetAudience,
  };
}
```

### 5. README Structure Template

**Generated README format:**

```markdown
# [Program Name]

## Training Plan Overview
- **Duration:** X weeks
- **Weekly Hours:** Y-Z hours (A-B hours during recovery weeks)
- **Structure:** [Core methodology - e.g., Polarized Training]
- **Key Sessions:** [Breakdown of main workout types]
- **Weekly TSS:** [Range across build/recovery weeks]
- **Rest Days:** [Schedule]

---

## Training Philosophy

**[Core Methodology Name]**

[Explanation of training approach based on workout analysis]

- Zone distribution and rationale
- Intensity balance
- Recovery integration
- Progression strategy

---

## Weekly Schedule

| Day | Session Type | Purpose |
|-----|--------------|---------|
| **[Day 1]** | [Type] | [Purpose from workout descriptions] |
| **[Day 2]** | [Type] | [Purpose] |
...

---

## Program Calendar

| Week | Mon | Tue | Wed | Thu | Fri | Sat | Sun | TSS |
|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1    | 🔴  | VO2 | REC | 🔴  | THR | Z2  | END | 326 |
| 2    | 🔴  | VO2 | REC | 🔴  | VO2 | Z2  | END | 343 |
| 3    | 🔴  | VO2 | REC | 🔴  | THR | Z2  | END | 299 |
| 4    | 🔴  | VO2 | REC | 🔴  | VO2 | Z2  | END | 233 |
...

**Legend:**
- 🔴 Rest day
- VO2: VO2max intervals
- REC: Recovery ride
- THR: Threshold work
- Z2: Easy zone 2
- END: Long endurance

---

## BLOCK 1: [Block Name] (Weeks X-Y)

### Week N · X.X hours · XXX TSS

| Day | Workout | Details | Alternative (MyWhoosh) |
| --- | ------- | ------- | ---------------------- |
| **Tuesday** | **[Workout Name]**<br/><img src="images/individual/[file].png" width="300"> | • [Duration] min · [TSS] TSS · IF [X.XX]<br/>• [Workout description summary]<br/>• 💡 [Optional: Pre-load carbs 2-3hrs before for high intensity] | [Link 1](url)<br/>[Link 2](url) |

---

## Training Zones

[Zone model used by program - e.g., Seiler 3-Zone or Traditional 5-Zone]

| Zone | Name | % FTP | RPE | Purpose | Usage in Program |
|------|------|-------|-----|---------|------------------|
| **Zone 1** | [Name] | XX-XX% | X-X | [Purpose] | XX% of training time |
...

---

## Expected Outcomes

**Physiological Adaptations:**
- [Adaptation 1 based on program structure]
- [Adaptation 2]
...

**Performance Improvements:**
- [Improvement 1]
- [Improvement 2]
...

**Compare your Week 1 and Week [Final] performance to measure gains!**

---

## Research References

[Methodology sources and protocol citations based on workout types and structure]

---
```

**Calendar Table Format:**
- Abbreviations for workout types (derived from descriptions/names)
- Rest days marked with 🔴
- Weekly TSS column
- Legend explaining abbreviations

**Workout Description Usage:**
The LLM will analyze ZWO `<description>` fields to:
- Identify training methodology references (Billat, Seiler, Tabata)
- Understand workout intent (VO2max development, threshold maintenance, recovery)
- Generate contextual explanations
- Recognize progression patterns
- Create appropriate block names and structure

### 6. LLM Integration Approach

**Recommended: Structured prompt with local execution**

Create a prompt template that:
1. Takes the structured JSON data from `buildLLMPromptData()`
2. References the manual README as a style guide
3. Outputs markdown following the template structure

**Implementation options:**
- **Option A:** Shell out to `claude` CLI with structured prompt
- **Option B:** Create reusable prompt template file, manual execution
- **Option C:** Direct Anthropic API integration (requires API key)

Given you're already running this tool with Claude Code, **Option A (Claude CLI)** is most seamless.

## Migration Path

**For existing programs:**

1. Create `program.config.ts` for each program
2. Map existing W##-D# filenames to schedule entries
3. Optionally rename ZWO files to be more descriptive
4. Run generation to verify config works
5. Run with `--detailed-readme` to generate comprehensive documentation

**Example migration script:**
```typescript
// scripts/migrate-to-config.ts
// Scans existing ZWO files with W##-D# pattern
// Generates initial program.config.ts
// Human reviews and refines
```

## Implementation Considerations

**Error Handling:**
- Missing `program.config.ts` → Clear error message
- Invalid config structure → Validation errors with line numbers
- Referenced ZWO file not found → List missing files
- Duplicate week/day entries → Conflict detection

**Backward Compatibility:**
- None - this is a breaking change
- Requires config file creation for all programs
- Old filenames can be kept or renamed

**Testing:**
- Unit tests for config loader and validator
- Integration test with sample program
- Verify generated output matches expectations

**Documentation:**
- Update main README with new workflow
- Add config file documentation
- Provide migration guide

## Summary

**Key Changes:**
1. ✅ Per-program TypeScript config files replace filename parsing
2. ✅ Delete `lib/filenameParser.ts` - no fallback
3. ✅ README generation only with `--detailed-readme` flag
4. ✅ LLM analyzes ZWO descriptions for comprehensive documentation
5. ✅ Markdown table calendar (no version numbers)
6. ✅ Refined README structure (skip nutrition/recovery - moved to shared docs)

**Benefits:**
- Flexible workout organization independent of filenames
- Rich documentation generated from workout analysis
- Single source of truth for program structure
- Extensible metadata for future features
