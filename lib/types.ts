// Type definitions for FTP Builder ZWO File Generator

export interface WorkoutTextEvent {
  time: number;
  text: string;
}

// Typed segment interfaces
export interface WarmupSegment {
  type: 'warmup';
  duration: number;
  powerLow: number;
  powerHigh: number;
  cadence?: number;
  messages?: WorkoutTextEvent[];
}

export interface CooldownSegment {
  type: 'cooldown';
  duration: number;
  powerHigh: number;
  powerLow: number;
  cadence?: number;
  messages?: WorkoutTextEvent[];
}

export interface SteadyStateSegment {
  type: 'steady';
  duration: number;
  power: number;
  cadence?: number;
  messages?: WorkoutTextEvent[];
}

export interface RampSegment {
  type: 'ramp';
  duration: number;
  powerLow: number;
  powerHigh: number;
  cadence?: number;
  messages?: WorkoutTextEvent[];
}

export type Segment =
  | WarmupSegment
  | CooldownSegment
  | SteadyStateSegment
  | RampSegment;

export interface WorkoutDefinition {
  name: string;
  description: string;
  tags: string[];
  segments: Segment[];
}

// Conversion functions to transform typed segments to XML
export function segmentToXML(segment: Segment): string {
  let xml = '';

  switch (segment.type) {
    case 'warmup':
      xml = `        <Warmup Duration="${segment.duration}" PowerLow="${segment.powerLow}" PowerHigh="${segment.powerHigh}"${segment.cadence ? ` Cadence="${segment.cadence}"` : ''}>`;
      break;
    case 'cooldown':
      xml = `        <Cooldown Duration="${segment.duration}" PowerHigh="${segment.powerHigh}" PowerLow="${segment.powerLow}"${segment.cadence ? ` Cadence="${segment.cadence}"` : ''}>`;
      break;
    case 'steady':
      xml = `        <SteadyState Duration="${segment.duration}" Power="${segment.power}"${segment.cadence ? ` Cadence="${segment.cadence}"` : ''}>`;
      break;
    case 'ramp':
      xml = `        <Ramp Duration="${segment.duration}" PowerLow="${segment.powerLow}" PowerHigh="${segment.powerHigh}"${segment.cadence ? ` Cadence="${segment.cadence}"` : ''}>`;
      break;
  }

  // Add text events
  if (segment.messages) {
    segment.messages.forEach((msg) => {
      xml += `\n            <textevent timeoffset="${msg.time}" message="${msg.text}"/>`;
    });
  }

  // Add closing tag
  const closeTag =
    segment.type === 'warmup'
      ? 'Warmup'
      : segment.type === 'cooldown'
        ? 'Cooldown'
        : segment.type === 'ramp'
          ? 'Ramp'
          : 'SteadyState';
  xml += `\n        </${closeTag}>`;

  return xml;
}

// Utility function to create ZWO XML structure
export function createZWOString(
  name: string,
  description: string,
  tags: string[],
  segments: Segment[],
): string {
  const tagElements = tags
    .map((tag) => `        <tag name="${tag}"/>`)
    .join('\n');
  const workoutSegments = segments.map(segmentToXML).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <workout_file>
      <author>Pierre-Alexandre St-Jean</author>
      <n>${name}</n>
      <description>${description}</description>
      <sportType>bike</sportType>
      <tags>
  ${tagElements}
      </tags>
      <workout>
  ${workoutSegments}
      </workout>
  </workout_file>`;
}
