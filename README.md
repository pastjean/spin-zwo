# FTP Builder ZWO File Generator

A modular TypeScript application that generates 54 ZWO workout files for a complete 12-week FTP builder training program.

## Project Structure

```
├── types.ts                    # Type definitions and interfaces
├── fileGenerator.ts           # ZWO file generation logic
├── 12_weeks_ftp_builder.ts    # Main application with workout definitions
├── package.json               # Project configuration
└── zwo_files/                 # Generated ZWO files directory
```

## Modules

### `types.ts`

Contains all TypeScript interfaces and type definitions:

- `WorkoutTextEvent` - Text events for workout segments
- `WarmupSegment`, `CooldownSegment`, `SteadyStateSegment`, `RampSegment` - Segment types
- `Segment` - Union type for all segment types
- `WorkoutDefinition` - Complete workout structure
- `segmentToXML()` - Converts typed segments to XML
- `createZWOFile()` - Creates complete ZWO XML structure

### `fileGenerator.ts`

Handles ZWO file generation and filesystem operations:

- `generateAllZWOFiles()` - Generates all workout files
- `saveZWOFilesToDisk()` - Saves files to local filesystem

### `12_weeks_ftp_builder.ts`

Main application file containing:

- Complete 12-week training program definitions
- 54 individual workout configurations
- Main execution logic

## Usage

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Run the application
bun run 12_weeks_ftp_builder.ts

# Or use npm
npm start
```

## Output

The application generates 54 ZWO files in the `zwo_files/` directory:

- Week 1-12 training sessions
- FTP tests, recovery rides, tempo intervals, sweet spot work
- VO2max intervals, endurance rides, and celebration sessions

## Requirements

- Bun

## Installation

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

## Available Scripts

- `npm start` - Run the application with Bun
- `npm run format` - Format code with Biome
- `npm run lint` - Lint and fix code with Biome
- `npm run check` - Run both formatting and linting
