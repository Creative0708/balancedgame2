import type { Modifier, Rarity } from ".";

export const RESOURCES = {
  Stone: {
    rarity: "common",
    type: "material",
    value: 1,
  },
  "Copper Bar": {
    rarity: "common",
    type: "material",
    value: 2,
  },
  "Zinc Bar": {
    rarity: "uncommon",
    type: "material",
    value: 4,
  },
  "Nickel Bar": {
    rarity: "uncommon",
    type: "material",
    value: 6,
  },
  "Cobalt Bar": {
    rarity: "rare",
    type: "material",
    value: 9,
  },
  "Silicon Bar": {
    rarity: "rare",
    type: "material",
    value: 12,
  },
  "Iron Bar": {
    rarity: "epic",
    type: "material",
    value: 16,
  },
  "Steel Bar": {
    rarity: "epic",
    type: "material",
    value: 20,
  },
  "Titanium Bar": {
    rarity: "legendary",
    type: "material",
    value: 25,
  },
  "Tungsten Bar": {
    rarity: "legendary",
    type: "material",
    value: 30,
  },
  "Uranium Bar": {
    rarity: "mythic",
    type: "material",
    value: 36,
  },

  "Tree Bark": {
    rarity: "common",
    type: "ingredient",
    modifiers: [{ stat: "elementsdmg.earth", type: "percentage", value: 5 }],
  },
  Leaves: {
    rarity: "common",
    type: "ingredient",
    modifiers: [{ stat: "elementsdmg.earth", type: "flat", value: 3 }],
  },
  Grass: {
    rarity: "common",
    type: "ingredient",
    modifiers: [{ stat: "elementsdef.earth", type: "flat", value: 4 }],
  },
  Mud: {
    rarity: "common",
    type: "ingredient",
    modifiers: [
      { stat: "elements.earth", type: "flat", value: 3 },
      { stat: "staminaregen", type: "flat", value: -1 },
    ],
  },
  Vine: {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [
      { stat: "elementsdmg.earth", type: "flat", value: 5 },
      { stat: "elementsdef.fire", type: "flat", value: -2 },
    ],
  },
  "Giant Mushroom": {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [{ stat: "elementsdef.earth", type: "flat", value: 8 }],
  },
  Moss: {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [{ stat: "elementsdmg.earth", type: "percentage", value: 10 }],
  },
  Sand: {
    rarity: "common",
    type: "ingredient",
    modifiers: [{ stat: "elements.fire", type: "flat", value: 1 }],
  },
  Cactus: {
    rarity: "rare",
    type: "ingredient",
    modifiers: [
      { stat: "elementsdmg.fire", type: "flat", value: 7 },
      { stat: "elementsdef.earth", type: "flat", value: 11 },
    ],
  },
  Terracotta: {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [
      { stat: "elementsdef.fire", type: "flat", value: 5 },
      { stat: "elementsdmg.earth", type: "percentage", value: 18 },
      { stat: "elements.water", type: "flat", value: -2 },
    ],
  },
  Bush: {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [
      { stat: "elements.earth", type: "flat", value: 2 },
      { stat: "elements.water", type: "flat", value: 1 },
      { stat: "elements.fire", type: "flat", value: -1 },
    ],
  },
  Wool: {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [
      { stat: "elements.thunder", type: "flat", value: 2 },
      { stat: "elementsdmg.thunder", type: "flat", value: 4 },
    ],
  },
  "Ram Horn": {
    rarity: "rare",
    type: "ingredient",
    modifiers: [
      { stat: "elements.thunder", type: "flat", value: 4 },
      { stat: "elementsdef.thunder", type: "flat", value: 5 },
      { stat: "elementsdef.water", type: "flat", value: 1 },
    ],
  },
  "Metal Chip": {
    rarity: "uncommon",
    type: "ingredient",
    modifiers: [
      { stat: "elementsdmg.thunder", type: "percentage", value: 10 },
      { stat: "elements.thunder", type: "flat", value: 3 },
      { stat: "elementsdef.water", type: "flat", value: -6 },
    ],
  },
  "Metal Sheet": {
    rarity: "rare",
    type: "ingredient",
    modifiers: [
      { stat: "elements.thunder", type: "flat", value: 7 },
      { stat: "elementsdef.fire", type: "flat", value: 6 },
      { stat: "elements.water", type: "flat", value: -4 },
    ],
  },
  "Satellite Dish": {
    rarity: "legendary",
    type: "ingredient",
    modifiers: [
      { stat: "elements.thunder", type: "flat", value: 8 },
      { stat: "elementsdmg.thunder", type: "percentage", value: 50 },
      { stat: "elementsdmg.water", type: "flat", value: -20 },
    ],
  },
  Gravel: {
    rarity: "common",
    type: "ingredient",
    modifiers: [{ stat: "elements.water", type: "flat", value: 1 }],
  },
  Coral: {
    rarity: "rare",
    type: "ingredient",
    modifiers: [
      { stat: "elementsdmg.water", type: "flat", value: 8 },
      { stat: "elementsdef.water", type: "flat", value: 4 },
      { stat: "elementsdef.air", type: "flat", value: -6 },
      { stat: "elements.fire", type: "flat", value: -3 },
    ],
  },
  "Divine Orb": {
    rarity: "mythic",
    type: "ingredient",
    modifiers: [{ stat: "elements.earth", type: "flat", value: 5 }],
  },
  "Teleport Spell Scroll": {
    rarity: "uncommon",
    type: "scroll",
    value: 20,
  },
  "Burst Spell Scroll": {
    rarity: "epic",
    type: "scroll",
    value: 50,
  },
  "Heal Spell Scroll": {
    rarity: "rare",
    type: "scroll",
    value: 30,
  },
  "Ultimate Spell Scroll": {
    rarity: "legendary",
    type: "scroll",
    value: 100,
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
