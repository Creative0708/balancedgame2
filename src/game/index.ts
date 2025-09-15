import React, { type Context } from "react";

export interface GameState {
  players: Player[];
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

export interface Modifier {
  stat: keyof PlayerStats;
  type: "percentage" | "flat";
  value: number;
}

export interface ElementMap<Value> {
  earth: Value;
  thunder: Value;
  water: Value;
  fire: Value;
  air: Value;
}
export type Element = keyof ElementMap<unknown>;

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

export const GameContext = React.createContext<GameState & { update(): void }>(
  null as any,
);
