// scripts/migrate-to-config.ts
/**
 * Migration script to generate program.config.ts from existing W##-D# filenames
 *
 * Usage: bun run scripts/migrate-to-config.ts programs/12_weeks_ftp_builder
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

interface FilenameMetadata {
  week: number;
  day: number;
  dayName: string;
  filename: string;
}

function parseFilename(filename: string): FilenameMetadata | null {
  // Pattern: W(\d+)-D(\d+)-(\w+)-(.+).zwo
  const pattern = /^W(\d+)-D(\d+)-(\w+)-(.+)\.zwo$/;
  const match = filename.match(pattern);

  if (!match) {
    return null;
  }

  return {
    week: parseInt(match[1], 10),
    day: parseInt(match[2], 10),
    dayName: match[3],
    filename: filename,
  };
}

async function generateConfigForProgram(programPath: string): Promise<void> {
  const zwoDir = path.join(programPath, 'zwo_files');

  if (!fs.existsSync(zwoDir)) {
    throw new Error(`ZWO directory not found: ${zwoDir}`);
  }

  // Scan ZWO files
  const files = fs
    .readdirSync(zwoDir)
    .filter((f) => f.endsWith('.zwo'))
    .map(parseFilename)
    .filter((f): f is FilenameMetadata => f !== null)
    .sort((a, b) => {
      if (a.week !== b.week) return a.week - b.week;
      return a.day - b.day;
    });

  if (files.length === 0) {
    throw new Error(`No W##-D# pattern files found in ${zwoDir}`);
  }

  console.log(`Found ${files.length} workouts`);

  // Generate config content
  const programName = path
    .basename(programPath)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const scheduleEntries = files
    .map((f) => {
      return `    { week: ${f.week}, day: ${f.day}, dayName: '${f.dayName}', zwoFile: '${f.filename}' },`;
    })
    .join('\n');

  const configContent = `// ${path.basename(programPath)}/program.config.ts
import type { ProgramConfig } from '../../lib/types.js';

export const config: ProgramConfig = {
  name: '${programName}',
  description: 'TODO: Add program description',

  schedule: [
${scheduleEntries}
  ],

  tags: ['TODO'],
  targetAudience: 'TODO: Define target audience',
};
`;

  // Write config file
  const configPath = path.join(programPath, 'program.config.ts');

  if (fs.existsSync(configPath)) {
    console.warn(
      `⚠️  Config already exists: ${configPath}\nDelete it first to regenerate.`,
    );
    return;
  }

  fs.writeFileSync(configPath, configContent, 'utf-8');
  console.log(`✓ Generated config: ${configPath}`);
  console.log(`\nNext steps:`);
  console.log(
    `1. Edit ${configPath} to add description, tags, and target audience`,
  );
  console.log(`2. Test with: bun run generate-all.ts ${programPath}`);
}

// Main
const programPath = process.argv[2];

if (!programPath) {
  console.error('Usage: bun run scripts/migrate-to-config.ts <program-path>');
  console.error(
    'Example: bun run scripts/migrate-to-config.ts programs/12_weeks_ftp_builder',
  );
  process.exit(1);
}

try {
  await generateConfigForProgram(programPath);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
