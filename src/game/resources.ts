import type { Modifier, Rarity } from ".";

export const RESOURCES = {
  oak_plank: {
    rarity: "common",
    modifiers: [{ stat: "neutraldmg", type: "flat", value: 1 }],
  },
  blaze_rod: {
    rarity: "rare",
    modifiers: [{ stat: "elementsdmg.fire", type: "percentage", value: 50 }],
  },
} satisfies {
  [key: string]: {
    rarity: Rarity;
    modifiers: Modifier[];
  };
};
