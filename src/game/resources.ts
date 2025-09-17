import type { Modifier, Rarity } from ".";

export const RESOURCES = {
  "Copper Ingot": {
    rarity: "common",
    type: "material",
    modifiers: [{ stat: "neutraldmg", type: "flat", value: 1 }],
  },
  "Tree Bark": {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [{ stat: "elementsdmg.fire", type: "percentage", value: 50 }],
  },
  "Divine Orb": {
    rarity: "mythic",
    type: "ingredient",
    modifiers: [{ stat: "elements.earth", type: "flat", value: 5 }],
  },
  "Teleport Spell Scroll": {
    rarity: "uncommon",
    type: "scroll",
  },
  "Burst Spell Scroll": {
    rarity: "epic",
    type: "scroll",
  },
  "Heal Spell Scroll": {
    rarity: "rare",
    type: "scroll",
  },
  "Ultimate Spell Scroll": {
    rarity: "legendary",
    type: "scroll",
  },
} satisfies {
  [key: string]: {
    type: string;
    rarity: Rarity;
    modifiers?: Modifier[];
    shopexclusive?: boolean;
    value?: number;
  };
};
