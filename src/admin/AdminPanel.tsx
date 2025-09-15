import { createContext, useContext, useRef, useState } from "react";
import "./admin.css";
import { GameContext, type GameState, type Item, type Player } from "../game";
import NumberButton from "../comp/NumberButton";
export interface AdminPanelState {
  changeMenu(menu: Panel): void;

  playerIdx: number;
  player: Player;
  setPlayerIdx(p: number): void;

  /**
   * Placeholder location for certain variables and functions
   */
  victim: Player | null;
  victimIdx: number;
  setVictim(p: Player): void;
  setVictimIdx(p: number): void;
  weapon: Item;
  setWeapon(p: Item): void;
}

export const AdminContext = createContext<AdminPanelState>(null as any);

enum Panel {
  CharacterSelection,
  MainMenu,
  AP,
  Map,
  Attack,
  Shop,
  WeaponSelector,
  DamageCalculator,
}

export function AdminPanel() {
  const game = useContext(GameContext);
  const [menu, setMenu] = useState(Panel.CharacterSelection);

  const [playerIdx, setPlayerIdx] = useState(0);
  const [victim, setVictim] = useState(null);
  const [victimIdx, setVictimIdx] = useState(-1);
  const [weapon, setWeapon] = useState(null);

  const admin: AdminPanelState = {
    changeMenu: setMenu,

    playerIdx,
    player: game.players[playerIdx],
    setPlayerIdx,
    victim,
    victimIdx,
    setVictim,
    setVictimIdx,
    weapon,
    setWeapon,
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
    case Panel.Map:
      screen = <Map />;
      break;
    case Panel.Attack:
      screen = <Attack />;
      break;
    case Panel.WeaponSelector:
      screen = <WeaponSelector />;
      break;
    case Panel.DamageCalculator:
      screen = <DamageCalculator />;
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
      <button onClick={() => admin.changeMenu(Panel.Map)}>Map</button>
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

  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [int, setInt] = useState(0);
  const [def, setDef] = useState(0);
  const [agi, setAgi] = useState(0);

  let elementSum = str + dex + int + def + agi;

  return (
    <>
      <h1>AP menu</h1>
      <NumberButton min={0} max={admin.player.ap-elementSum+str} baseValue={admin.player.stats.elements.earth} css={"earth"} onChange={setStr} />
      <NumberButton min={0} max={admin.player.ap-elementSum+dex} baseValue={admin.player.stats.elements.thunder} css={"thunder"} onChange={setDex} />
      <NumberButton min={0} max={admin.player.ap-elementSum+int} baseValue={admin.player.stats.elements.water} css={"water"} onChange={setInt} />
      <NumberButton min={0} max={admin.player.ap-elementSum+def} baseValue={admin.player.stats.elements.fire} css={"fire"} onChange={setDef} />
      <NumberButton min={0} max={admin.player.ap-elementSum+agi} baseValue={admin.player.stats.elements.air} css={"air"} onChange={setAgi} />
      <button
        onClick={() => {
          admin.player.stats.elements.earth += str;
          admin.player.stats.elements.thunder += dex;
          admin.player.stats.elements.water += int;
          admin.player.stats.elements.fire += def;
          admin.player.stats.elements.air += agi;
          admin.player.ap -= (elementSum);
          game.update();
          admin.changeMenu(Panel.MainMenu);
        }}
      >
        Apply
      </button>
      <button onClick={() => admin.changeMenu(Panel.MainMenu)}>Back</button>
    </>
  );
}

function Map() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  return (
    <>
      <h1>Placeholder</h1>
      <button onClick={() => admin.changeMenu(Panel.Attack)}>Attack</button>
      <br></br>
      <button onClick={() => admin.changeMenu(Panel.MainMenu)}>
        Back
      </button>
    </>
  );
}

function Attack() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  return (
    <>
      {game.players.filter((player) => player !== admin.player).map((player: Player, playerId: number) => (
        <button
          key={player.name}
          onClick={() => {
            admin.setVictim(player);
            admin.setVictimIdx(game.players.indexOf(player));
            admin.changeMenu(Panel.WeaponSelector);
          }}
        >
          {player.name}
        </button>
      ))}
      <button onClick={() => admin.changeMenu(Panel.MainMenu)}>
      Back
      </button>
    </>
  );
}

function WeaponSelector() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  return (
    <>
      <h2>Select a weapon.</h2>
      {admin.player.inventory.filter((item) => item.type === "weapon").map((item: Item, itemId: number) => (
        <button
          key={item.name}
          onClick={() => {
            admin.setWeapon(item);
            admin.changeMenu(Panel.DamageCalculator);
          }}
        >{item.name}</button>
      ))}
      <button onClick={() => admin.changeMenu(Panel.Attack)}>
      Back
      </button>
    </>
  );
}

function DamageCalculator() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  
  for (const modifier of admin.weapon.modifiers) {
    if (modifier.type === "flat") {
      // @ts-ignore
      admin.player.stats[modifier.stat] += modifier.value;
    }
    else if (modifier.type === "percentage") {
      // @ts-ignore
      admin.player.stats[modifier.stat] *= (1 + modifier.value / 100);
    }
    
  }

  admin.victim.stats.hp -= admin.player.stats.neutraldmg;

  return (
    <>
      <button onClick={() => {
        admin.changeMenu(Panel.MainMenu);
        game.update();
      }}>
        Back
      </button>
    </>
  );
}