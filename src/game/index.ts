import React, { type Context } from "react";
import { RESOURCES } from "./resources";
export { RESOURCES };

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
export type Resource = keyof typeof RESOURCES;

export interface GameState {
  players: Player[];

  // IGT in days
  days: number;

  update(): void;
}

export function initializeGame(): GameState {
  function makeDummyPlayer(name: string, ap = 0): Player {
    return {
      name,
      ap,

      combatlevel: 0,
      combatxp: 0,
      resourcelevel: 0,
      resourcexp: 0,
      stats: {
        hp: 1000,
        maxhp: 1000,
        hpregen: 5,
        mana: 100,
        maxmana: 100,
        manaregen: 1,
        stamina: 100,
        staminaregen: 5,
        gatheringspeed: 1,
        meleedmg: 0,
        rangeddmg: 0,
        elementaldmg: 0,
        neutraldmg: 0,
        elements: { earth: 0, thunder: 0, water: 0, fire: 0, air: 0 },
        elementsdmg: { earth: 0, thunder: 0, water: 0, fire: 0, air: 0 },
        elementsdef: { earth: 0, thunder: 0, water: 0, fire: 0, air: 0 },
      },
      items: [
        {
          name: "Basic Sword",
          type: "weapon",
          modifiers: [{ stat: "neutraldmg", type: "flat", value: 1 }],
        },
      ],
      resources: {
        oak_plank: 32,
        blaze_rod: 2,
      },
      spells: [],
    };
  }

  const player1 = makeDummyPlayer("Player 1", 30);
  const player2 = makeDummyPlayer("Player 2", 20);
  const player3 = makeDummyPlayer("Player 3");

  return {
    players: [player1, player2, player3],

    days: null,

    update: () => {},
  };
}

export interface Player {
  name: string;
  ap: number;
  combatlevel: number;
  combatxp: number;
  resourcelevel: number;
  resourcexp: number;
  stats: PlayerStats;
  items: Item[];
  resources: { [key in Resource]?: number };
  spells: Spell[];
}

export interface Item {
  name: string;
  type: string;
  modifiers: Modifier[];
}

export interface ElementMap<Value> {
  earth: Value;
  thunder: Value;
  water: Value;
  fire: Value;
  air: Value;
}
export type Element = keyof ElementMap<unknown>;

export const ALL_ELEMENTS: Element[] = [
  "earth",
  "thunder",
  "water",
  "fire",
  "air",
];

export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type PlayerNumberStat = KeysOfType<PlayerStats, number>;
export type PlayerElementStat = KeysOfType<PlayerStats, ElementMap<any>>;

export type StatDescriptor =
  | PlayerNumberStat
  | `${PlayerElementStat}.${Element}`;

export type Modifier = {
  stat: StatDescriptor;
  type: "percentage" | "flat";
  value: number;
};

export function getModifiedStat(
  player: Player,
  stat: StatDescriptor,
  modifiers: Modifier[] = [],
): number {
  let value = getRawStat(player, stat);

  // modifiers = modifiers.concat(player.armor.modifiers) TODO: implement

  modifiers.sort((a, b) => {
    let valueA = a.type === "flat" ? 0 : 1;
    let valueB = b.type === "flat" ? 0 : 1;
    return valueA - valueB;
  });

  for (const modifier of modifiers) {
    if (modifier.stat !== stat) continue;

    if (modifier.type === "flat") value += modifier.value;
    else if (modifier.type === "percentage") value *= 1 + modifier.value / 100;
  }

  return value;
}

function getRawStat(player: Player, desc: StatDescriptor): number {
  const [stat, element] = desc.split(".");
  let value = player.stats[stat];
  if (typeof value === "number") return value;
  else return value[element];
}
function setRawStat(player: Player, desc: StatDescriptor, value: number) {
  const [stat, element] = desc.split(".");
  if (typeof player.stats[stat] === "number") player.stats[stat] = value;
  else player.stats[stat][element] = value;
}

export interface PlayerStats {
  hp: number;

  maxhp: number;

  hpregen: number;

  mana: number;

  maxmana: number;

  manaregen: number;

  stamina: number;

  staminaregen: number;

  gatheringspeed: number;

  meleedmg: number;

  rangeddmg: number;

  elementaldmg: number;

  neutraldmg: number;

  elements: ElementMap<number>;

  elementsdmg: ElementMap<number>;

  elementsdef: ElementMap<number>;
}

export interface ItemStats {
  durability: number;

  modifiers: Modifier[];
}

export interface Spell {
  elementsdmg: ElementMap<number>;
}

export const GameContext = React.createContext<GameState>(null as any);
