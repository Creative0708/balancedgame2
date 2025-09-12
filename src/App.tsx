import { useState } from "react";
import { GameContext, initializeGame } from "./game";
import { GameDisplay } from "./game/GameDisplay";
import { Background } from "./comp/Background";
import { AdminPanel } from "./admin/AdminPanel";

export default function App() {
  const [game, setGame] = useState(initializeGame());
  const [dummy, dummyUpdate] = useState(0);
  return (
    <GameContext.Provider
      value={{
        ...game,
        update: () => dummyUpdate(dummy + 1),
      }}
    >
      <Background />
      <GameDisplay />

      <AdminPanel />
    </GameContext.Provider>
  );
}
