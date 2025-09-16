import React, { type Context } from "react";

export interface GameState {
  players: Player[];

  // IGT in days
  days: number,

  update(): void,
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
        hp: 100,
        hpregen: 5,
        mana: 100,
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
      inventory: [
        {
          name: "Basic Sword",
          type: "weapon",
          modifiers: [
            { stat: "neutraldmg", type: "flat", value: 1 },
          ],
        },
      ],
      spells: [],
    };
  }

  const player1 = makeDummyPlayer("Player 1", 30);
  const player2 = makeDummyPlayer("Player 2", 20);
  const player3 = makeDummyPlayer("Player 3");

  return {
    players: [player1, player2, player3],

    days: null,

    update: () => { },
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
  inventory: Item[];
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

export const ALL_ELEMENTS: Element[] = ["earth", "thunder", "water", "fire", "air"];

export type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

export type PlayerNumberStat = KeysOfType<PlayerStats, number>
export type PlayerElementStat = KeysOfType<PlayerStats, ElementMap<any>>

export type ObjectStatDescriptor = {
  stat: PlayerNumberStat
} | {
  stat: PlayerElementStat,
  element: Element,
}
export type StringStatDescriptor = PlayerNumberStat | `${PlayerElementStat}.${Element}`;

export type Modifier = ObjectStatDescriptor & {
  type: "percentage" | "flat";
  value: number;
}

function convertStatDescriptor(desc: StringStatDescriptor): ObjectStatDescriptor {
  let [stat, element] = desc.split(".");
  if(element) {
    // element stat; has a period
    return { stat: stat as PlayerElementStat, element: element as Element };
  } else {
    // number stat; no period
    return { stat: stat as PlayerNumberStat };
  }
}

export function getModifiedStat(player: Player, d: StringStatDescriptor, modifiers: Modifier[]): number {
  const desc = convertStatDescriptor(d);
  let stat = getRawStat(player, desc);

  // modifiers = modifiers.concat(player.armor.modifiers) TODO: implement

  modifiers.sort((a, b) => {
    let valueA = a.type === "flat" ? 0 : 1;
    let valueB = b.type === "flat" ? 0 : 1;
    return valueA - valueB;
  });

  for (const modifier of modifiers) {
    if(modifier.stat !== desc.stat || (modifier as any).element !== (desc as any).element)
      continue;

    if (modifier.type === "flat")
      stat += modifier.value;
    else if (modifier.type === "percentage")
      stat *= 1 + modifier.value / 100;
  }

  return stat;
}

function getRawStat(player: Player, desc: ObjectStatDescriptor): number {
  if ("element" in desc)
    return player.stats[desc.stat][desc.element];
  else
    return player.stats[desc.stat];
}
function setRawStat(player: Player, desc: ObjectStatDescriptor, value: number): number {
  if ("element" in desc)
    player.stats[desc.stat][desc.element] = value;
  else
    player.stats[desc.stat] = value;
}

export interface PlayerStats {
  hp: number;

  hpregen: number;

  mana: number;

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

export const GameContext = React.createContext<GameState>(
  null as any,
);
