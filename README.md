# Training Program Generator

Generate ZWO workout files for cycling training programs.

## Available Programs

- **[12 Weeks FTP Builder](programs/12_weeks_ftp_builder/12_weeks_ftp_builder.md)** - A complete 12-week program with 54 workouts including FTP tests, recovery rides, tempo intervals, sweet spot work, VO2max intervals, and endurance rides.

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
