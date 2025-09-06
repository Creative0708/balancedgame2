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
          strength: 0,
          earthdmg: 0,
          earthdef: 0,
          dexterity: 0,
          thunderdmg: 0,
          thunderdef: 0,
          intelligence: 0,
          waterdmg: 0,
          waterdef: 0,
          defence: 0,
          firedmg: 0,
          firedef: 0,
          agility: 0,
          airdmg: 0,
          airdef: 0,
        }
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
          strength: 0,
          earthdmg: 0,
          earthdef: 0,
          dexterity: 0,
          thunderdmg: 0,
          thunderdef: 0,
          intelligence: 0,
          waterdmg: 0,
          waterdef: 0,
          defence: 0,
          firedmg: 0,
          firedef: 0,
          agility: 0,
          airdmg: 0,
          airdef: 0,
        }
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
          strength: 0,
          earthdmg: 0,
          earthdef: 0,
          dexterity: 0,
          thunderdmg: 0,
          thunderdef: 0,
          intelligence: 0,
          waterdmg: 0,
          waterdef: 0,
          defence: 0,
          firedmg: 0,
          firedef: 0,
          agility: 0,
          airdmg: 0,
          airdef: 0,
        }
      },
    ],
  };
}

export interface Player {
  name: string;
  ap: 0,
  level: 0,
  xp: 0,
  stats: PlayerStats;
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

  strength: number;

  earthdmg: number;

  earthdef: number;

  dexterity: number;

  thunderdmg: number;

  thunderdef: number;

  intelligence: number;

  waterdmg: number;

  waterdef: number;

  defence: number;

  firedmg: number;

  firedef: number;

  agility: number;

  airdmg: number;

  airdef: number;
}

export const GameContext: Context<GameState> = React.createContext(null as any);
