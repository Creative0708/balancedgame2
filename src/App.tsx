import { useState } from "react";
import { GameContext, initializeGame } from "./game";
import { GameDisplay } from "./game/GameDisplay";
import { Background } from "./comp/Background";

function App() {
  const [game, setGame] = useState(initializeGame());
  return (
    <GameContext.Provider value={game}>
      <Background />
      <GameDisplay />
    </GameContext.Provider>
  );
}

export default App;
