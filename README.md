# Training Program Generator

Generate ZWO workout files for cycling training programs.

## Available Programs

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

### Option 2: Generate Files Yourself

```bash
# Install dependencies
npm install

# Generate workout files
npm start
```

## Requirements

- Node.js
