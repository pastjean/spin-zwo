# Training Program Generator

Generate ZWO workout files for cycling training programs.

## Available Programs

- **[8 Weeks Road Builder](programs/8_weeks_road_builder/)** - An 8-week polarized training program (80/20) with 40 workouts including:
  - **Polarized Training** - 80% low intensity (Z1-Z2), 15-20% high intensity (Z4-Z5)
  - **VO2max Protocols** - 30/30s, 40/20s, 4x4min, mixed intervals
  - **Threshold Development** - Cruise intervals, over/unders, progressive builds, threshold + surges
  - **Long Endurance** - Progressive volume building (90-150min)
  - **Recovery Weeks** - Weeks 4 & 8 with 35% volume reduction
  - **FTP Testing** - Final week includes 20min and 2x15min test protocols
  - **MyWhoosh Alternatives** - Every workout includes platform alternatives
  - **Weekly Hours** - 6-8.5 hours (5-5.5 hours during recovery weeks)
- **[12 Weeks FTP Builder](programs/12_weeks_ftp_builder/)** - A complete 12-week program with 58 workouts including:
  - **FTP Tests** - Baseline and final assessment
  - **Recovery Rides** - Active recovery, easy spins, and recovery cadence drills
  - **Tempo Intervals** - Extended tempo efforts at 83-87% FTP
  - **Sweet Spot Work** - Sustained efforts at 88-93% FTP
  - **Threshold Intervals** - FTP intervals and over/unders
  - **VO2max Intervals** - High-intensity 30/30s, 40/20s, and mixed intervals
  - **Pyramid Intervals** - Progressive pyramids for mental toughness
  - **Endurance Rides** - Long aerobic base building rides
  - **Specialty Workouts** - Push & Pull (cadence work), Race Simulation
- **[Bonus recovery rides](programs/recoveries/)**

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

# Generate all outputs (images, calendar, charts, HTML viewer)
# NOTE: This skips README generation by default
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

**To generate comprehensive READMEs** (requires program.config.ts):

```bash
# Generate with detailed README
bun run start -- --detailed-readme

# Or for specific program
bun run generate:8weeks -- --detailed-readme
```

### Program Configuration

Each program requires a `program.config.ts` file that maps ZWO files to the training schedule:

```typescript
// programs/8_weeks_road_builder/program.config.ts
import type { ProgramConfig } from '../../lib/types.js';

export const config: ProgramConfig = {
  name: "8 Weeks Road Builder",
  description: "8-week polarized training program",

  schedule: [
    { week: 1, day: 2, dayName: "Tuesday", zwoFile: "VO2max_30_30s.zwo" },
    { week: 1, day: 3, dayName: "Wednesday", zwoFile: "Recovery_Easy.zwo" },
    // ... rest of schedule
  ],

  tags: ["polarized", "vo2max"],
  targetAudience: "intermediate-advanced cyclists",
};
```

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
