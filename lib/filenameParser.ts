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
