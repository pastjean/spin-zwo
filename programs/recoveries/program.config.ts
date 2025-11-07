// programs/recoveries/program.config.ts
import type { ProgramConfig } from "../../lib/types.js";

export const config: ProgramConfig = {
  name: "Recoveries",
  description:
    "Collection of recovery ride variations for active recovery days",

  schedule: [
    {
      week: 1,
      day: 1,
      zwoFile: "BONUS-Recovery_Variation_A.zwo",
    },
    {
      week: 1,
      day: 2,
      zwoFile: "BONUS-Recovery_Variation_B.zwo",
    },
    {
      week: 1,
      day: 3,
      zwoFile: "BONUS-Recovery_Variation_C.zwo",
    },
    {
      week: 1,
      day: 4,
      zwoFile: "BONUS-Recovery_Variation_D.zwo",
    },
  ],

  tags: ["recovery", "easy", "z1"],
  targetAudience: "all cyclists",
};
