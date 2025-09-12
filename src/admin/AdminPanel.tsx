import { createContext, useContext, useRef, useState } from "react";
import "./admin.css";
import { GameContext, type GameState, type Player } from "../game";
import NumberButton from "../comp/NumberButton";

export interface AdminPanelState {
  changeMenu(menu: Panel): void;

  playerIdx: number;
  player: Player;
  setPlayerIdx(p: number): void;
}

export const AdminContext = createContext<AdminPanelState>(null as any);

enum Panel {
  CharacterSelection,
  MainMenu,
  AP,
}

export function AdminPanel() {
  const game = useContext(GameContext);
  const [menu, setMenu] = useState(Panel.CharacterSelection);

  const [playerIdx, setPlayerIdx] = useState(0);

  const admin: AdminPanelState = {
    changeMenu: setMenu,

    playerIdx,
    player: game.players[playerIdx],
    setPlayerIdx,
  };

  let screen;
  switch (menu) {
    case Panel.CharacterSelection:
      screen = <CharacterSelection />;
      break;
    case Panel.MainMenu:
      screen = <MainMenu />;
      break;
    case Panel.AP:
      screen = <AP />;
      break;
  }

  return (
    <AdminContext value={admin}>
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        {screen}
      </div>
    </AdminContext>
  );
}

function CharacterSelection() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  return (
    <>
      <h1>Character Selection</h1>
      {game.players.map((player: Player, playerId: number) => (
        <button
          key={player.name}
          onClick={() => {
            admin.changeMenu(Panel.MainMenu);
            admin.setPlayerIdx(playerId);
          }}
        >
          {player.name}
        </button>
      ))}
    </>
  );
}

function MainMenu() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  return (
    <>
      <h1>Welcome to the Admin Panel! You are {admin.player.name}</h1>
      <button onClick={() => admin.changeMenu(Panel.AP)}>AP</button>
      <button onClick={() => {}}>Map</button>
      <button onClick={() => {}}>Crafting</button>
      <button onClick={() => {}}>Shop</button>
      <button onClick={() => {}}>Game Info</button>
      <br></br>
      <button onClick={() => admin.changeMenu(Panel.CharacterSelection)}>
        Back
      </button>
    </>
  );
}

function AP() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  const [apAdd, setApAdd] = useState(null);

  return (
    <>
      <h1>AP menu</h1>
      <NumberButton min={0} defaultValue={1} onChange={setApAdd} /> <br />
      You are about to add {apAdd} AP.
      <button
        onClick={() => {
          admin.player.ap += apAdd;
          game.update();
        }}
      >
        Apply
      </button>
      <button onClick={() => admin.changeMenu(Panel.MainMenu)}>Back</button>
    </>
  );
}
