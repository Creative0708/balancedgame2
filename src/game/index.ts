import React, { type Context } from "react";

export interface GameState {
  players: Player[];
}

export function initializeGame(): GameState {
  return {
    players: [
      {
        name: "Test Player",
        hp: 100,
      },
    ],
  };
}

export interface Player {
  name: string;

  hp: number;
  // TODO: add fields
}

export const GameContext: Context<GameState> = React.createContext(null as any);
