// lib/configLoader.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ProgramConfig } from './types.js';

/**
 * Load program configuration file
 */
export async function loadProgramConfig(
  programPath: string,
): Promise<ProgramConfig> {
  const configPath = path.join(programPath, 'program.config.ts');

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Missing program.config.ts in ${programPath}. Config file is required.`,
    );
  }

  try {
    // Import the config module
    const configUrl = `file://${path.resolve(configPath)}`;
    const module = await import(configUrl);

    if (!module.config) {
      throw new Error(
        `program.config.ts must export a 'config' object in ${programPath}`,
      );
    }

    return module.config as ProgramConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to load config from ${configPath}: ${error.message}`,
      );
    }
    throw error;
  }
}

/**
 * Validate program configuration
 */
export function validateProgramConfig(
  config: ProgramConfig,
  programPath: string,
): void {
  // Check required fields
  if (!config.name || config.name.trim() === '') {
    throw new Error('Config must have a non-empty "name" field');
  }

  if (!config.description || config.description.trim() === '') {
    throw new Error('Config must have a non-empty "description" field');
  }

  if (!Array.isArray(config.schedule) || config.schedule.length === 0) {
    throw new Error('Config must have a non-empty "schedule" array');
  }

  // Check for duplicate week/day entries
  const weekDayKeys = new Set<string>();
  for (const entry of config.schedule) {
    const key = `W${entry.week}-D${entry.day}`;
    if (weekDayKeys.has(key)) {
      throw new Error(
        `Duplicate schedule entry for week ${entry.week}, day ${entry.day}`,
      );
    }
    weekDayKeys.add(key);
  }

  // Verify all referenced ZWO files exist
  const zwoDir = path.join(programPath, 'zwo_files');
  const missingFiles: string[] = [];

  for (const entry of config.schedule) {
    const zwoPath = path.join(zwoDir, entry.zwoFile);
    if (!fs.existsSync(zwoPath)) {
      missingFiles.push(entry.zwoFile);
    }
  }

  if (missingFiles.length > 0) {
    throw new Error(
      `Missing ZWO files referenced in config:\n${missingFiles.map((f) => `  - ${f}`).join('\n')}`,
    );
  }
}
