import { useState } from "react";
import { GameContext, initializeGame } from "./game";
import { GameDisplay } from "./game/GameDisplay";
import { Background } from "./comp/Background";
import { AdminPanel } from "./admin/AdminPanel";

export default function App() {
  const [game, setGame] = useState(initializeGame);

  const [dummy, setDummy] = useState(0);
  game.update = () => setDummy(dummy ^ 1);

  return (
    <GameContext.Provider value={game}>
      <Background />
      <GameDisplay />

      <AdminPanel />
    </GameContext.Provider>
  );
}
