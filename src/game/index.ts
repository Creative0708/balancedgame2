import React, { type Context } from "react";

export interface GameState {
  players: Player[];
}

export function initializeGame(): GameState {
  return {
    players: [
      {
        name: "Player1",
        ap: 0,
        level: 0,
        xp: 0,
        stats: {
          hp: 100,
          hpregen: 5,
          mana: 100,
          manaregen: 1,
          stamina: 100,
          staminaregen: 5,
          meleedmg: 0,
          rangeddmg: 0,
          elementaldmg: 0,
          elements: [0,0,0,0,0],
          elementsdmg: [0,0,0,0,0],
          elementsdef: [0,0,0,0,0],
        },
        inventory: [],
      },
      {
        name: "Player2",
        ap: 0,
        level: 0,
        xp: 0,
        stats: {
          hp: 100,
          hpregen: 5,
          mana: 100,
          manaregen: 1,
          stamina: 100,
          staminaregen: 5,
          meleedmg: 0,
          rangeddmg: 0,
          elementaldmg: 0,
          elements: [0,0,0,0,0],
          elementsdmg: [0,0,0,0,0],
          elementsdef: [0,0,0,0,0],
        },
        inventory: [],
      },
      {
        name: "Player3",
        ap: 0,
        level: 0,
        xp: 0,
        stats: {
          hp: 100,
          hpregen: 5,
          mana: 100,
          manaregen: 1,
          stamina: 100,
          staminaregen: 5,
          meleedmg: 0,
          rangeddmg: 0,
          elementaldmg: 0,
          elements: [0,0,0,0,0],
          elementsdmg: [0,0,0,0,0],
          elementsdef: [0,0,0,0,0],
        },
        inventory: [],
      },
    ],
  };
}

export interface Player {
  name: string;
  ap: 0;
  level: 0;
  xp: 0;
  stats: PlayerStats;
  inventory: Item[];
}

export interface Item {
  name: string;
  modifiers: Modifier[];
}

export interface Modifier {
  stat: keyof PlayerStats;
  type: "percentage" | "flat";
  value: number;
}

export interface PlayerStats {
  hp: number;

  hpregen: number;

  mana: number;

  manaregen: number;

  stamina: number;

  staminaregen: number;

  meleedmg: number;

  rangeddmg: number;

  elementaldmg: number;

  elements: [number,number,number,number,number];

  elementsdmg: [number,number,number,number,number];

  elementsdef: [number,number,number,number,number];
}

export const GameContext: Context<GameState> = React.createContext(null as any);
