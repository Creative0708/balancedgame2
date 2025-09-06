import { useState } from "react";
import { GameContext, initializeGame } from "./game";
import { GameDisplay } from "./game/GameDisplay";

function App() {
  const [game, setGame] = useState(initializeGame());
  return (
    <GameContext.Provider value={game}>
      <GameDisplay />
    </GameContext.Provider>
  );
}

export default App;
