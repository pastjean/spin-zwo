# 8-Week Road Builder Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete 8-week polarized road cycling training program with TypeScript workout definitions, auto-generated ZWO files, workout images, and comprehensive README documentation.

**Architecture:** Split workouts into 8 separate week files (one per week) to reduce file size and improve maintainability. Main aggregator file combines all weeks, generates ZWO files, images, and README. Follow existing pattern from `programs/12_weeks_ftp_builder/`.

**Tech Stack:** TypeScript, Bun runtime, existing `lib/` utilities (types, fileGenerator, imageGenerator, metrics)

---

## Task 1: Create Directory Structure

**Files:**
- Create: `programs/8_weeks_road_builder/` (directory)
- Create: `programs/8_weeks_road_builder/weeks/` (directory)
- Create: `programs/8_weeks_road_builder/images/` (directory)
- Create: `programs/8_weeks_road_builder/zwo_files/` (directory)

**Step 1: Create main program directory**

```bash
mkdir -p programs/8_weeks_road_builder
```

**Step 2: Create subdirectories**

```bash
mkdir -p programs/8_weeks_road_builder/weeks
mkdir -p programs/8_weeks_road_builder/images
mkdir -p programs/8_weeks_road_builder/zwo_files
```

**Step 3: Verify directory structure**

Run: `ls -R programs/8_weeks_road_builder/`
Expected: Shows weeks/, images/, zwo_files/ subdirectories

**Step 4: Commit**

```bash
git add programs/8_weeks_road_builder/
git commit -m "feat: create 8-week road builder directory structure"
```

---

## Task 2: Create Week 1 Workouts File

**Files:**
- Create: `programs/8_weeks_road_builder/weeks/week1.ts`

**Step 1: Create week1.ts with imports and type definition**

```typescript
import type { WorkoutDefinition } from "../../../lib/types.js";

export const week1Workouts: Record<string, WorkoutDefinition> = {
  // Workouts will be added here
};
```

**Step 2: Add Tuesday VO2max workout (30/30s)**

```typescript
  "W01-D1-Tuesday-VO2max_30_30s": {
    name: "W1-Tue: 30/30s Introduction",
    description: `Micro-intervals: 3 sets of 8x30sec @ 120% / 30sec @ 50%

VO2max introduction using Billat protocol. Short bursts with equal recovery.

💡 Pre-load: Carbs 2-3hrs before
📊 ~65 TSS · IF 0.82`,
    tags: ["Week 1", "VO2max", "High Intensity", "Micro-Intervals"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
        messages: [{ time: 10, text: "Easy warmup - gradually building" }],
      },
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.65,
        powerHigh: 0.75,
        messages: [{ time: 10, text: "Continue building toward work intensity" }],
      },
      {
        type: "steady",
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: "Easy spin before first set" }],
      },
      // Set 1: 8x30/30
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Set 1/3 - Interval 1/8 @ 120%" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval of set 1" }],
      },
      {
        type: "steady",
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: "Set 1 complete - recovery" }],
      },
      // Recovery between sets
      { type: "steady", duration: 240, power: 0.5 },
      // Set 2: 8x30/30
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Set 2/3 - Stay controlled" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval of set 2" }],
      },
      {
        type: "steady",
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: "Set 2 complete - one more set!" }],
      },
      // Recovery between sets
      { type: "steady", duration: 240, power: 0.5 },
      // Set 3: 8x30/30
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Set 3/3 - Final set, stay strong!" }],
      },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      { type: "steady", duration: 30, power: 1.2 },
      { type: "steady", duration: 30, power: 0.5 },
      {
        type: "steady",
        duration: 30,
        power: 1.2,
        messages: [{ time: 5, text: "Final interval - finish strong!" }],
      },
      {
        type: "steady",
        duration: 30,
        power: 0.5,
        messages: [{ time: 10, text: "All sets complete - great work!" }],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.5,
        powerLow: 0.3,
        messages: [{ time: 10, text: "Easy cooldown - let the adaptation begin" }],
      },
    ],
  },
```

**Step 3: Add Wednesday Recovery workout (Easy Z1)**

```typescript
  "W01-D2-Wednesday-Recovery_Easy": {
    name: "W1-Wed: Easy Recovery",
    description: `45min easy Z1 spin @ 50-60% FTP

Pure recovery ride. Conversational pace, very easy effort.

📊 ~22 TSS · IF 0.55`,
    tags: ["Week 1", "Recovery", "Zone 1", "Easy"],
    segments: [
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.5,
        powerHigh: 0.55,
        messages: [{ time: 10, text: "Very easy warmup" }],
      },
      {
        type: "steady",
        duration: 1800,
        power: 0.55,
        messages: [
          { time: 10, text: "Easy recovery pace - stay relaxed" },
          { time: 900, text: "Halfway - keep it easy" },
        ],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.55,
        powerLow: 0.5,
        messages: [{ time: 10, text: "Easy finish" }],
      },
    ],
  },
```

**Step 4: Add Friday Threshold workout (Cruise Intervals)**

```typescript
  "W01-D4-Friday-Threshold_Cruise": {
    name: "W1-Fri: Cruise Intervals 4x6min",
    description: `Threshold introduction: 4 x 6min @ 95% FTP (3min recovery)

Moderate threshold blocks to introduce sustained power work.

💡 Pre-load: Carbs 2-3hrs before
📊 ~70 TSS · IF 0.80`,
    tags: ["Week 1", "Threshold", "FTP", "Cruise Intervals"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.7,
        messages: [{ time: 10, text: "Progressive warmup" }],
      },
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.7,
        powerHigh: 0.85,
        messages: [{ time: 10, text: "Building toward threshold" }],
      },
      {
        type: "steady",
        duration: 180,
        power: 0.6,
        messages: [{ time: 10, text: "Easy spin before intervals" }],
      },
      // Interval 1
      {
        type: "steady",
        duration: 360,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 1/4 @ 95% - Settle in" },
          { time: 180, text: "Halfway - smooth and steady" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 2
      {
        type: "steady",
        duration: 360,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 2/4 - Same effort" },
          { time: 180, text: "Halfway through interval 2" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 3
      {
        type: "steady",
        duration: 360,
        power: 0.95,
        messages: [
          { time: 10, text: "Interval 3/4 - Stay focused" },
          { time: 180, text: "Halfway - keep it steady" },
        ],
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 4
      {
        type: "steady",
        duration: 360,
        power: 0.95,
        messages: [
          { time: 10, text: "Final interval 4/4 - Finish strong!" },
          { time: 180, text: "Halfway - you've got this!" },
          { time: 330, text: "30sec - push through!" },
        ],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.6,
        powerLow: 0.4,
        messages: [{ time: 10, text: "Great work! Easy cooldown" }],
      },
    ],
  },
```

**Step 5: Add Saturday Easy Z2 workout**

```typescript
  "W01-D5-Saturday-Easy_Z2": {
    name: "W1-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP

Zone 2 aerobic base building. Conversational pace.

💡 Consume 30g carbs/hr
📊 ~46 TSS · IF 0.68`,
    tags: ["Week 1", "Endurance", "Zone 2", "Easy"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.68,
        messages: [{ time: 10, text: "Easy warmup into Z2" }],
      },
      {
        type: "steady",
        duration: 2400,
        power: 0.70,
        messages: [
          { time: 10, text: "Zone 2 endurance - stay conversational" },
          { time: 1200, text: "Halfway - feeling good" },
        ],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.68,
        powerLow: 0.55,
        messages: [{ time: 10, text: "Easy finish" }],
      },
    ],
  },
```

**Step 6: Add Sunday Long Endurance workout**

```typescript
  "W01-D6-Sunday-Long_Endurance": {
    name: "W1-Sun: Long Endurance 90min",
    description: `90min long endurance @ 65-75% FTP

Aerobic base development. Zone 2 steady ride.

💡 Consume 60g carbs/hr
📊 ~72 TSS · IF 0.70`,
    tags: ["Week 1", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.6,
        powerHigh: 0.68,
        messages: [{ time: 10, text: "Easy warmup into long ride" }],
      },
      {
        type: "steady",
        duration: 4200,
        power: 0.70,
        messages: [
          { time: 10, text: "Long steady Z2 - find your rhythm" },
          { time: 1200, text: "20min in - settle into the effort" },
          { time: 2400, text: "Halfway! Keep it steady" },
          { time: 3600, text: "Final 30min - stay consistent" },
        ],
      },
      {
        type: "cooldown",
        duration: 600,
        powerHigh: 0.68,
        powerLow: 0.55,
        messages: [{ time: 10, text: "Great endurance work!" }],
      },
    ],
  },
};
```

**Step 7: Verify TypeScript compiles**

Run: `bun run programs/8_weeks_road_builder/weeks/week1.ts`
Expected: No compilation errors

**Step 8: Commit**

```bash
git add programs/8_weeks_road_builder/weeks/week1.ts
git commit -m "feat: add Week 1 workouts (30/30s, recovery, cruise intervals, endurance)"
```

---

## Task 3: Create Week 2 Workouts File

**Files:**
- Create: `programs/8_weeks_road_builder/weeks/week2.ts`

**Step 1: Create week2.ts structure**

```typescript
import type { WorkoutDefinition } from "../../../lib/types.js";

export const week2Workouts: Record<string, WorkoutDefinition> = {
  "W02-D1-Tuesday-VO2max_40_20s": {
    name: "W2-Tue: 40/20s",
    description: `Extended micro-intervals: 3 sets of 10x40sec @ 120% / 20sec @ 50%

Tabata-inspired protocol with longer work periods.

💡 Pre-load: Carbs 2-3hrs before
📊 ~72 TSS · IF 0.84`,
    tags: ["Week 2", "VO2max", "High Intensity", "40/20s"],
    segments: [
      {
        type: "warmup",
        duration: 600,
        powerLow: 0.5,
        powerHigh: 0.65,
      },
      {
        type: "warmup",
        duration: 300,
        powerLow: 0.65,
        powerHigh: 0.75,
      },
      { type: "steady", duration: 180, power: 0.6 },
      // Set 1: 10x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 1/3 - 40/20s!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Final interval of set 1!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 240, power: 0.5 },
      // Set 2: 10x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 2/3" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 240, power: 0.5 },
      // Set 3: 10x40/20
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Set 3/3 - Final set!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2 },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "steady", duration: 40, power: 1.2, messages: [{ time: 5, text: "Final interval - finish strong!" }] },
      { type: "steady", duration: 20, power: 0.5 },
      { type: "cooldown", duration: 600, powerHigh: 0.5, powerLow: 0.3 },
    ],
  },

  "W02-D2-Wednesday-Recovery_Easy": {
    name: "W2-Wed: Easy Recovery",
    description: `45min easy Z1 spin @ 50-60% FTP

Pure recovery ride.

📊 ~22 TSS · IF 0.55`,
    tags: ["Week 2", "Recovery", "Zone 1"],
    segments: [
      { type: "warmup", duration: 300, powerLow: 0.5, powerHigh: 0.55 },
      { type: "steady", duration: 1800, power: 0.55 },
      { type: "cooldown", duration: 600, powerHigh: 0.55, powerLow: 0.5 },
    ],
  },

  "W02-D4-Friday-Threshold_OverUnders": {
    name: "W2-Fri: Over/Unders",
    description: `Sweet Spot Over/Unders: 3 x (3min @ 95% / 2min @ 105% / 3min @ 95%)

Lactate clearance training with oscillating intensity.

💡 Pre-load: Carbs 2-3hrs before
📊 ~75 TSS · IF 0.82`,
    tags: ["Week 2", "Threshold", "Over/Unders", "Lactate Clearance"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.5, powerHigh: 0.7 },
      { type: "warmup", duration: 300, powerLow: 0.7, powerHigh: 0.85 },
      { type: "steady", duration: 180, power: 0.6 },
      // Interval 1
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Interval 1/3 - Under @ 95%" }] },
      { type: "steady", duration: 120, power: 1.05, messages: [{ time: 10, text: "Over @ 105% - push!" }] },
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Back under @ 95%" }] },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 2
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Interval 2/3" }] },
      { type: "steady", duration: 120, power: 1.05 },
      { type: "steady", duration: 180, power: 0.95 },
      { type: "steady", duration: 300, power: 0.6 },
      // Interval 3
      { type: "steady", duration: 180, power: 0.95, messages: [{ time: 10, text: "Interval 3/3 - Final one!" }] },
      { type: "steady", duration: 120, power: 1.05, messages: [{ time: 10, text: "Final over - push hard!" }] },
      { type: "steady", duration: 180, power: 0.95 },
      { type: "cooldown", duration: 600, powerHigh: 0.6, powerLow: 0.4 },
    ],
  },

  "W02-D5-Saturday-Easy_Z2": {
    name: "W2-Sat: Easy Z2 Ride",
    description: `60min easy endurance @ 65-75% FTP

📊 ~46 TSS · IF 0.68`,
    tags: ["Week 2", "Endurance", "Zone 2"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 2400, power: 0.70 },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },

  "W02-D6-Sunday-Long_Endurance": {
    name: "W2-Sun: Long Endurance 105min",
    description: `105min long endurance @ 65-75% FTP

Volume increase week.

💡 Consume 60g carbs/hr
📊 ~85 TSS · IF 0.70`,
    tags: ["Week 2", "Endurance", "Zone 2", "Long Ride"],
    segments: [
      { type: "warmup", duration: 600, powerLow: 0.6, powerHigh: 0.68 },
      { type: "steady", duration: 5100, power: 0.70, messages: [
        { time: 10, text: "Long steady Z2" },
        { time: 2550, text: "Halfway!" },
      ] },
      { type: "cooldown", duration: 600, powerHigh: 0.68, powerLow: 0.55 },
    ],
  },
};
```

**Step 2: Commit**

```bash
git add programs/8_weeks_road_builder/weeks/week2.ts
git commit -m "feat: add Week 2 workouts (40/20s, over/unders, 105min endurance)"
```

---

## Task 4: Create Weeks 3-8 Workout Files

**Note:** Follow same pattern as Week 1 and 2. Each week file exports `weekNWorkouts` object with 5 workouts (Tue, Wed, Fri, Sat, Sun).

**Files to create:**
- `programs/8_weeks_road_builder/weeks/week3.ts`
- `programs/8_weeks_road_builder/weeks/week4.ts`
- `programs/8_weeks_road_builder/weeks/week5.ts`
- `programs/8_weeks_road_builder/weeks/week6.ts`
- `programs/8_weeks_road_builder/weeks/week7.ts`
- `programs/8_weeks_road_builder/weeks/week8.ts`

**Week 3 Key Workouts:**
- Tuesday: 4x4min @ 110% (Seiler protocol)
- Friday: 3x10min Progressive Build (90% → 98%)
- Sunday: 120min endurance

**Week 4 (Recovery Week) Key Workouts:**
- Tuesday: 2x(8x30/30) @ 120% (reduced volume)
- Friday: 2x12min @ 88% Sweet Spot
- Saturday: 45min (reduced from 60min)
- Sunday: 90min (reduced from 120min)

**Week 5 Key Workouts:**
- Tuesday: 5x8min @ 95%
- Friday: 4x(8min @ 95% + 1min @ 110%) - Threshold + Surges
- Sunday: 120min

**Week 6 Key Workouts:**
- Tuesday: 4x4min @ 110% @ 60rpm (low cadence)
- Friday: 2x(5min @ 92% / 3min @ 102% / 5min @ 92%) - Extended Over/Unders
- Sunday: 135min

**Week 7 Key Workouts:**
- Tuesday: 2x(8x40/20 @ 120% + 3min @ 110%) - Mixed protocol
- Friday: 2x20min @ 88% @ 65rpm - Low cadence threshold (PEAK)
- Saturday: 75min
- Sunday: 150min (PEAK)

**Week 8 (Taper Week) Key Workouts:**
- Tuesday: 2x(6x30/30) @ 120% (reduced volume)
- Friday: FTP Test - 1x20min @ 100% OR 2x15min @ 98%
- Sunday: 105min

**Step 1: Create week3.ts**

```bash
# Copy week2.ts as template
cp programs/8_weeks_road_builder/weeks/week2.ts programs/8_weeks_road_builder/weeks/week3.ts
```

**Step 2: Edit week3.ts with Week 3 workouts**

Modify exported const name and workout keys/content for Week 3.

**Step 3: Repeat for weeks 4-8**

Create each week file following the same pattern.

**Step 4: Commit each week separately**

```bash
git add programs/8_weeks_road_builder/weeks/week3.ts
git commit -m "feat: add Week 3 workouts (4x4min, progressive build, 120min endurance)"

git add programs/8_weeks_road_builder/weeks/week4.ts
git commit -m "feat: add Week 4 recovery workouts (reduced volume, sweet spot)"

# ... continue for weeks 5-8
```

---

## Task 5: Create Main Aggregator File

**Files:**
- Create: `programs/8_weeks_road_builder/8_weeks_road_builder.ts`

**Step 1: Create main file with imports**

```typescript
// 8-Week Road Builder - Polarized Training Program
// Progressive threshold loading + varied VO2max protocols

import { saveZWOFilesToDisk } from "../../lib/fileGenerator.js";
import { generateAllWorkoutImages } from "../../lib/imageGenerator.js";
import type { WorkoutDefinition } from "../../lib/types.js";

// Import all week modules
import { week1Workouts } from "./weeks/week1.js";
import { week2Workouts } from "./weeks/week2.js";
import { week3Workouts } from "./weeks/week3.js";
import { week4Workouts } from "./weeks/week4.js";
import { week5Workouts } from "./weeks/week5.js";
import { week6Workouts } from "./weeks/week6.js";
import { week7Workouts } from "./weeks/week7.js";
import { week8Workouts } from "./weeks/week8.js";

// Combine all workouts
export const workouts: Record<string, WorkoutDefinition> = {
  ...week1Workouts,
  ...week2Workouts,
  ...week3Workouts,
  ...week4Workouts,
  ...week5Workouts,
  ...week6Workouts,
  ...week7Workouts,
  ...week8Workouts,
};

// Generate ZWO files
console.log("Generating ZWO files for 8-Week Road Builder...");
await saveZWOFilesToDisk(
  workouts,
  "programs/8_weeks_road_builder/zwo_files"
);

// Generate workout images
console.log("Generating workout images...");
await generateAllWorkoutImages(
  workouts,
  "programs/8_weeks_road_builder/images"
);

console.log("✅ 8-Week Road Builder generation complete!");
console.log(`📁 ZWO files: programs/8_weeks_road_builder/zwo_files/`);
console.log(`🖼️  Images: programs/8_weeks_road_builder/images/`);
```

**Step 2: Verify TypeScript compiles**

Run: `bun run programs/8_weeks_road_builder/8_weeks_road_builder.ts`
Expected: Compiles without errors (may not generate files yet if week files incomplete)

**Step 3: Commit**

```bash
git add programs/8_weeks_road_builder/8_weeks_road_builder.ts
git commit -m "feat: add main aggregator file for 8-week road builder"
```

---

## Task 6: Generate ZWO Files and Images

**Files:**
- Modify: `programs/8_weeks_road_builder/8_weeks_road_builder.ts` (if needed)

**Step 1: Verify all week files are complete**

Ensure weeks 1-8 are all created with proper TypeScript.

**Step 2: Run generator**

```bash
bun run programs/8_weeks_road_builder/8_weeks_road_builder.ts
```

Expected output:
```
Generating ZWO files for 8-Week Road Builder...
Generating workout images...
✅ 8-Week Road Builder generation complete!
```

**Step 3: Verify generated files**

```bash
ls programs/8_weeks_road_builder/zwo_files/ | wc -l
ls programs/8_weeks_road_builder/images/ | wc -l
```

Expected: ~40 ZWO files, ~40 PNG images (5 workouts × 8 weeks)

**Step 4: Commit generated files**

```bash
git add programs/8_weeks_road_builder/zwo_files/
git add programs/8_weeks_road_builder/images/
git commit -m "feat: generate ZWO files and workout images for 8-week program"
```

---

## Task 7: Create README.md Documentation

**Files:**
- Create: `programs/8_weeks_road_builder/README.md`

**Step 1: Create README header**

```markdown
# 8-Week Road Builder Program v1.0

## Training Plan Overview

- **Duration:** 8 weeks
- **Weekly Hours:** 6-8.5 hours (5-5.5 hours during recovery weeks)
- **Structure:** Polarized training (80/20 split)
- **Key Sessions:** Tuesday (VO2max), Friday (Threshold), Sunday (Long Endurance)
- **Weekly TSS:** 240-360 TSS (build weeks), 200-220 TSS (recovery weeks)
- **Rest Days:** Thursday + Monday (full rest)

---

## Training Philosophy

**Polarized Training (80/20)**
- 80% training time at low intensity (Z1-Z2)
- 15-20% at high intensity (Z4-Z5)
- <5% moderate intensity (Z3)

**Progressive Threshold Loading**
- Build sustained power from 24min → 40min time-at-threshold
- Targets punchers/explosive riders who need durability

**Varied VO2max Protocols**
- Different protocol each week (30/30s, 40/20s, 4x4, 5x8, etc.)
- Based on 2020-2024 research

**Recovery Integration**
- Week 4 & 8: Recovery weeks (35% volume reduction)
- 8 Wednesday recovery options (choose based on feel)

---

## Weekly Schedule

| Day | Session Type | Purpose |
|-----|-------------|---------|
| **Tuesday (D1)** | VO2max Intervals | High intensity - max aerobic capacity |
| **Wednesday (D2)** | Recovery Ride (8 options) | Active recovery - choose based on feel |
| **Thursday (D3)** | Rest | Complete rest |
| **Friday (D4)** | Threshold Intervals | High intensity - FTP development |
| **Saturday (D5)** | Easy Z2 Ride | Low intensity - aerobic base |
| **Sunday (D6)** | Long Endurance | Low intensity - volume/duration |
| **Monday (D7)** | Rest | Complete rest |

---
```

**Step 2: Add Block 1 (Weeks 1-3) breakdown**

```markdown
## BLOCK 1: Foundation Build (Weeks 1-3)

### Week 1 · 6.0 hours · 240 TSS

| Day | Workout | Details |
|-----|---------|---------|
| **Tuesday** | **30/30s Introduction**<br/><img src="images/W01-D1-Tuesday-VO2max_30_30s.png" width="300"> | • 60 min · 65 TSS · IF 0.82<br/>• 3 x (8 x 30sec @ 120% / 30sec @ 50%)<br/>• Billat protocol micro-intervals<br/>• 💡 Pre-load: Carbs 2-3hrs before |
| **Wednesday** | **Easy Recovery**<br/><img src="images/W01-D2-Wednesday-Recovery_Easy.png" width="300"> | • 45 min · 22 TSS · IF 0.55<br/>• Zone 1 easy spin |
| **Thursday** | REST | - |
| **Friday** | **Cruise Intervals 4x6min**<br/><img src="images/W01-D4-Friday-Threshold_Cruise.png" width="300"> | • 65 min · 70 TSS · IF 0.80<br/>• 4 x 6min @ 95% (3min recovery)<br/>• Threshold introduction<br/>• 💡 Pre-load: Carbs 2-3hrs before |
| **Saturday** | **Easy Z2 Ride**<br/><img src="images/W01-D5-Saturday-Easy_Z2.png" width="300"> | • 60 min · 46 TSS · IF 0.68<br/>• Zone 2 aerobic base<br/>• 💡 Consume 30g carbs/hr |
| **Sunday** | **Long Endurance 90min**<br/><img src="images/W01-D6-Sunday-Long_Endurance.png" width="300"> | • 90 min · 72 TSS · IF 0.70<br/>• Zone 2 steady<br/>• 💡 Consume 60g carbs/hr |
| **Monday** | REST | - |

---
```

**Step 3: Add Weeks 2-8 breakdown**

Follow same table format for each week with:
- Week header with hours and TSS
- Table with workout images, durations, TSS, IF, descriptions
- Nutrition tips where relevant

**Step 4: Add training zones reference**

```markdown
## Training Zones

| Zone | Name | % FTP | RPE | Purpose |
|------|------|-------|-----|---------|
| **Z1** | Active Recovery | <55% | 1-2 | Recovery, warmup |
| **Z2** | Endurance | 56-75% | 3-4 | Aerobic base, fat oxidation |
| **Z3** | Tempo | 76-87% | 5-6 | Muscular endurance (minimal use) |
| **Z4** | Threshold | 88-105% | 7-8 | FTP development |
| **Z5** | VO2max | 106-120% | 9-10 | Max aerobic capacity |

**FTP Calculation:** 20-min test average power × 0.95

---
```

**Step 5: Add nutrition guidelines**

```markdown
## Nutrition Guidelines

**High-Intensity Sessions (>85% FTP)**
💡 Pre-load: 1-2g carbs/kg body weight 2-3 hours before

**Long Rides (>90 min)**
💡 During: 60-90g carbs/hour via sports drinks, gels, bars

**Moderate Sessions (60-90 min, <85% FTP)**
💡 During: 30-60g carbs/hour

**Recovery Weeks (Week 4 & 8)**
🍖 Increase protein (1.6-2.2g/kg/day), maintain carbs, prioritize sleep

**General**
- Hydration: 500-750ml/hr
- Post-workout: 20-40g protein + carbs within 60 min

---
```

**Step 6: Add recovery and fatigue management**

```markdown
## Recovery & Fatigue Management

**Fatigue Warning Signs:**
- Elevated resting heart rate (+5-10 bpm)
- Difficulty hitting power targets on easy rides
- Poor sleep quality 2+ consecutive nights
- Persistent muscle soreness beyond 48 hours
- Mood changes (irritability, low motivation)

**Fatigue Protocol:**
- **Minor:** Skip Wednesday recovery ride, extend Thursday rest
- **Moderate:** Convert Friday threshold to easy Z2 ride
- **Significant:** Take 2-3 complete rest days, resume with easy week

**Recovery Week Strategy (Weeks 4 & 8):**
- Volume reduced by 35-40%
- Intensity maintained (intervals shorter, not easier)
- Extra focus on sleep (9+ hours), nutrition, stress management

---
```

**Step 7: Add Wednesday recovery options section**

```markdown
## Wednesday Recovery Options

Choose based on fatigue level and preference:

**Option A: Easy Z1** - 45min @ 50-60% FTP (pure recovery)
**Option B: With Sprints** - 45min @ 55-65% + 5x10sec sprints (neuromuscular maintenance)
**Option C: High Cadence** - 45min @ 100-110rpm @ 60% (leg speed)
**Option D: Low Cadence** - 45min @ 60-70rpm @ 65% (muscular endurance)
**Option E: Cadence Mix** - Alternate 5min high/low @ 60% (varied stimulus)
**Option F: Micro-bursts** - 45min @ 55% + 8x(30sec @ 75% / 90sec @ 55%)
**Option G: Rest** - Skip if fatigued (optional day)
**Option H: Easy + Stretch** - 30min @ 55% + 15min mobility

---
```

**Step 8: Add expected outcomes**

```markdown
## Expected Outcomes

By Week 8, you should experience:

**Physiological Adaptations:**
- 5-15% FTP increase (varies by training history)
- Improved VO2max (2-5% increase typical)
- Enhanced threshold durability (24min → 40min sustained power)
- Greater aerobic efficiency
- Improved lactate clearance

**Performance Improvements:**
- Better pacing and power management
- Stronger finishing efforts
- Reduced fatigue on long rides
- Faster recovery between hard efforts

**Compare your Week 1 and Week 8 performance to measure gains!**

---
```

**Step 9: Add research references**

```markdown
## Research References (2020-2024)

**Polarized Training:**
- Systematic review (2023): Training periodization and intensity distribution in trained cyclists
- Meta-analysis (2024): Polarized vs non-polarized training yield comparable VO2max gains

**VO2max Protocols:**
- 2024 research: Higher fraction of VO2max during intervals = greater performance gains (R² = 0.54)
- 2024 study: Low cadence (50-70 RPM) high-intensity shows superior aerobic improvements
- 2021: Self-paced 4x4 and 4x8min protocols effective for VO2max development

**Threshold & Durability:**
- 2022 review: Power-duration relationship and durability critical for endurance performance
- 2024: Lactate threshold modeling emphasizes sustainable power development
- 2020: Over/under protocols with active recovery improve lactate clearance

---
```

**Step 10: Verify README formatting**

Run: `cat programs/8_weeks_road_builder/README.md | head -50`
Expected: Properly formatted markdown with tables

**Step 11: Commit**

```bash
git add programs/8_weeks_road_builder/README.md
git commit -m "docs: add comprehensive README for 8-week road builder program"
```

---

## Task 8: Update Package Scripts

**Files:**
- Modify: `package.json`

**Step 1: Read current package.json**

```bash
cat package.json
```

**Step 2: Add 8-week road builder to start script**

Modify the "start" script to include the new program:

```json
{
  "scripts": {
    "start": "bun run programs/12_weeks_ftp_builder/12_weeks_ftp_builder.ts && bun run programs/recoveries/recoveries.ts && bun run programs/8_weeks_road_builder/8_weeks_road_builder.ts",
    "format": "biome format --write .",
    "format:check": "biome format ."
  }
}
```

**Step 3: Test script**

```bash
npm run start
```

Expected: Runs all programs successfully, generates files

**Step 4: Commit**

```bash
git add package.json
git commit -m "chore: add 8-week road builder to start script"
```

---

## Task 9: Final Verification

**Step 1: Clean build test**

```bash
# Remove generated files
rm -rf programs/8_weeks_road_builder/zwo_files/*
rm -rf programs/8_weeks_road_builder/images/*

# Regenerate
bun run programs/8_weeks_road_builder/8_weeks_road_builder.ts
```

Expected: All files regenerate successfully

**Step 2: Verify file counts**

```bash
echo "ZWO files:"
ls programs/8_weeks_road_builder/zwo_files/ | wc -l

echo "Image files:"
ls programs/8_weeks_road_builder/images/ | wc -l

echo "Week files:"
ls programs/8_weeks_road_builder/weeks/ | wc -l
```

Expected:
- ZWO files: ~40
- Image files: ~40
- Week files: 8

**Step 3: Check README images render**

Open README.md in browser/markdown viewer to verify all workout images display correctly.

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete 8-week road builder program with all workouts, images, and docs"
```

---

## Implementation Complete!

**Summary of what was built:**
- ✅ 8 week modules (week1.ts → week8.ts) with 5 workouts each
- ✅ 40 workout definitions following polarized training
- ✅ Main aggregator file combining all weeks
- ✅ Auto-generated ZWO files (Zwift-compatible)
- ✅ Auto-generated workout profile images
- ✅ Comprehensive README with nutrition, recovery, research references
- ✅ Integration with existing build system

**File structure:**
```
programs/8_weeks_road_builder/
├── 8_weeks_road_builder.ts (main aggregator)
├── README.md (comprehensive docs)
├── weeks/
│   ├── week1.ts
│   ├── week2.ts
│   ├── week3.ts
│   ├── week4.ts
│   ├── week5.ts
│   ├── week6.ts
│   ├── week7.ts
│   └── week8.ts
├── images/ (40 PNG files)
└── zwo_files/ (40 ZWO files)
```

**Next steps:**
- Test workouts in Zwift/MyWhoosh
- Adjust intensities based on athlete feedback
- Consider adding alternative workouts for each week

---
