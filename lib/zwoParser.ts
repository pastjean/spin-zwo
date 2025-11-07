// lib/zwoParser.ts

import * as fs from "node:fs";
import * as path from "node:path";
import { promisify } from "node:util";
import { parseString } from "xml2js";
import { calculateWorkoutMetrics } from "./metrics.js";
import type {
  CooldownSegment,
  IntervalsSegment,
  ParsedWorkout,
  RampSegment,
  Segment,
  SteadyStateSegment,
  WarmupSegment,
  WorkoutTextEvent,
} from "./types.js";

const parseXML = promisify(parseString);

// Type definitions for parsed XML structure
interface XMLSegmentData {
  $?: Record<string, string>;
  textevent?: Array<{
    $: {
      timeoffset: string;
      message: string;
    };
  }>;
}

interface XMLWorkout {
  [key: string]: XMLSegmentData[] | undefined;
  $?: Record<string, string>;
}

/**
 * Parse a single ZWO XML file
 */
export async function parseZWOFile(filepath: string): Promise<ParsedWorkout> {
  const content = fs.readFileSync(filepath, "utf-8");
  const filename = path.basename(filepath);

  // Parse XML with options to preserve element order
  const result = await parseXML(content, {
    explicitChildren: true,
    preserveChildrenOrder: true,
    charsAsChildren: true,
  });
  const workoutFile = result.workout_file;

  // Extract basic metadata
  const name = workoutFile.n?.[0] || "";
  const description = workoutFile.description?.[0] || "";
  const author = workoutFile.author?.[0] || "";
  const tags =
    workoutFile.tags?.[0]?.tag?.map((t: { $: { name: string } }) => t.$.name) ||
    [];

  // Extract segments
  const segments = extractSegments(workoutFile.workout[0]);

  // Calculate metrics
  const metrics = calculateWorkoutMetrics(segments);

  return {
    name,
    description,
    author,
    tags,
    segments,
    week: undefined,
    day: undefined,
    workoutName: name || path.basename(filepath, ".zwo"),
    duration: metrics.duration,
    tss: metrics.tss,
    intensityFactor: metrics.intensityFactor,
    normalizedPower: metrics.normalizedPower,
    filepath,
    filename,
  };
}

/**
 * Extract workout segments from parsed XML
 */
function extractSegments(workout: XMLWorkout): Segment[] {
  const segments: Segment[] = [];

  // Use $$ property to get children in order (when preserveChildrenOrder is enabled)
  const orderedChildren = (workout as any).$$;

  if (orderedChildren && Array.isArray(orderedChildren)) {
    // Process children in the order they appear in the XML
    for (const child of orderedChildren) {
      const type = child["#name"];
      const segment = parseSegment(type, child);
      if (segment) {
        segments.push(segment);
      }
    }
  } else {
    // Fallback to old method if $$ is not available
    const elements = Object.keys(workout).flatMap((key) => {
      if (key === "$" || key === "$$") return []; // Skip attributes and ordered children
      const items = workout[key];
      if (!items) return [];
      return items.map((elem: XMLSegmentData) => ({ type: key, data: elem }));
    });

    for (const elem of elements) {
      const segment = parseSegment(elem.type, elem.data);
      if (segment) {
        segments.push(segment);
      }
    }
  }

  return segments;
}

/**
 * Parse individual segment based on type
 */
function parseSegment(type: string, data: XMLSegmentData): Segment | null {
  const attrs = data.$ || {};
  const messages = extractTextEvents(data);

  switch (type) {
    case "Warmup": {
      const seg: WarmupSegment = {
        type: "warmup",
        duration: parseFloat(attrs.Duration),
        powerLow: parseFloat(attrs.PowerLow),
        powerHigh: parseFloat(attrs.PowerHigh),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case "Cooldown": {
      const seg: CooldownSegment = {
        type: "cooldown",
        duration: parseFloat(attrs.Duration),
        powerHigh: parseFloat(attrs.PowerHigh),
        powerLow: parseFloat(attrs.PowerLow),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case "SteadyState": {
      const seg: SteadyStateSegment = {
        type: "steady",
        duration: parseFloat(attrs.Duration),
        power: parseFloat(attrs.Power),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case "Ramp": {
      const seg: RampSegment = {
        type: "ramp",
        duration: parseFloat(attrs.Duration),
        powerLow: parseFloat(attrs.PowerLow),
        powerHigh: parseFloat(attrs.PowerHigh),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    case "IntervalsT": {
      const seg: IntervalsSegment = {
        type: "intervals",
        repeat: parseInt(attrs.Repeat, 10),
        onDuration: parseFloat(attrs.OnDuration),
        onPower: parseFloat(attrs.OnPower),
        offDuration: parseFloat(attrs.OffDuration),
        offPower: parseFloat(attrs.OffPower),
      };
      if (attrs.Cadence) seg.cadence = parseInt(attrs.Cadence, 10);
      if (messages.length > 0) seg.messages = messages;
      return seg;
    }

    default:
      return null;
  }
}

/**
 * Extract text events from segment
 */
function extractTextEvents(data: XMLSegmentData): WorkoutTextEvent[] {
  if (!data.textevent) return [];

  return data.textevent.map((evt) => ({
    time: parseInt(evt.$.timeoffset, 10),
    text: evt.$.message,
  }));
}
