// programs/8_weeks_road_builder/program.config.ts
import type { ProgramConfig } from "../../lib/types.js";

export const config: ProgramConfig = {
  name: "8 Weeks Road Builder",
  description:
    "8-week polarized training program focusing on VO2max and threshold development",

  schedule: [
    // Week 1
    {
      week: 1,
      day: 2,
      zwoFile: "W01-D2-Tuesday-VO2max_30_30s.zwo",
    },
    {
      week: 1,
      day: 3,
      zwoFile: "W01-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 1,
      day: 5,
      zwoFile: "W01-D5-Friday-neuromuscular-power-surges-2.zwo",
    },
    {
      week: 1,
      day: 6,
      zwoFile: "W01-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 1,
      day: 7,
      zwoFile: "W01-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 2
    {
      week: 2,
      day: 2,
      zwoFile: "W02-D2-Tuesday-controlled-30-30-s-2.zwo",
    },
    {
      week: 2,
      day: 3,
      zwoFile: "W02-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 2,
      day: 5,
      zwoFile: "W02-D5-Friday-anaerobic-endurance-2.zwo",
    },
    {
      week: 2,
      day: 6,
      zwoFile: "W02-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 2,
      day: 7,
      zwoFile: "W02-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 3
    {
      week: 3,
      day: 2,
      zwoFile: "W03-D2-Tuesday-hiit-45sec-1.zwo",
    },
    {
      week: 3,
      day: 3,
      zwoFile: "W03-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 3,
      day: 5,
      zwoFile: "W03-D5-Friday-power-intervals-1.zwo",
    },
    {
      week: 3,
      day: 6,
      zwoFile: "W03-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 3,
      day: 7,
      zwoFile: "W03-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 4
    {
      week: 4,
      day: 2,
      zwoFile: "W04-D2-Tuesday-30-30-s-anaerobic-3.zwo",
    },
    {
      week: 4,
      day: 3,
      zwoFile: "W04-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 4,
      day: 5,
      zwoFile: "W04-D5-Friday-capacity-pyramid-2.zwo",
    },
    {
      week: 4,
      day: 6,
      zwoFile: "W04-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 4,
      day: 7,
      zwoFile: "W04-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 5
    {
      week: 5,
      day: 2,
      zwoFile: "W05-D2-Tuesday-intensive-capacity-2.zwo",
    },
    {
      week: 5,
      day: 3,
      zwoFile: "W05-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 5,
      day: 5,
      zwoFile: "W05-D5-Friday-40-20-s-2.zwo",
    },
    {
      week: 5,
      day: 6,
      zwoFile: "W05-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 5,
      day: 7,
      zwoFile: "W05-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 6
    {
      week: 6,
      day: 2,
      zwoFile: "W06-D2-Tuesday-12min-30-30-s-2.zwo",
    },
    {
      week: 6,
      day: 3,
      zwoFile: "W06-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 6,
      day: 5,
      zwoFile: "W06-D5-Friday-power-intervals-3.zwo",
    },
    {
      week: 6,
      day: 6,
      zwoFile: "W06-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 6,
      day: 7,
      zwoFile: "W06-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 7
    {
      week: 7,
      day: 2,
      zwoFile: "W07-D2-Tuesday-pace-is-the-trick.zwo",
    },
    {
      week: 7,
      day: 3,
      zwoFile: "W07-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 7,
      day: 5,
      zwoFile: "W07-D5-Friday-extensive-anaerobic-6-x-1min.zwo",
    },
    {
      week: 7,
      day: 6,
      zwoFile: "W07-D6-Saturday-Easy_Z2.zwo",
    },
    {
      week: 7,
      day: 7,
      zwoFile: "W07-D7-Sunday-Long_Endurance.zwo",
    },

    // Week 8
    {
      week: 8,
      day: 2,
      zwoFile: "W08-D2-Tuesday-vo2max-climbing-1.zwo",
    },
    {
      week: 8,
      day: 3,
      zwoFile: "W08-D3-Wednesday-Recovery_Easy.zwo",
    },
    {
      week: 8,
      day: 5,
      zwoFile: "W08-D5-Friday-FTP_Test_20min.zwo",
    },
    {
      week: 8,
      day: 7,
      zwoFile: "W08-D7-Sunday-Long_Endurance.zwo",
    },
  ],

  tags: ["polarized", "vo2max", "road-racing"],
  targetAudience: "intermediate-advanced cyclists",
};
