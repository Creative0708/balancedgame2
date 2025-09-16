import { createContext, useContext, useRef, useState } from "react";
import "./admin.css";
import {
  ALL_ELEMENTS,
  type ElementMap,
  GameContext,
  getModifiedStat,
  type GameState,
  type Item,
  type Player,
} from "../game";
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
  Map,
  Attack,
  Shop,
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
    case Panel.Map:
      screen = <Map />;
      break;
    case Panel.Attack:
      screen = <Attack />;
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

  const [elements, setElements] = useState<ElementMap<number>>({
    earth: 0,
    thunder: 0,
    water: 0,
    fire: 0,
    air: 0,
  });

  let elementSum = Object.values(elements).reduce((a, b) => a + b, 0);

  return (
    <>
      <h1>AP menu</h1>

      <p>Remaning AP: {admin.player.ap - elementSum}</p>

      {ALL_ELEMENTS.map((element) => (
        <NumberButton
          min={0}
          max={admin.player.ap - elementSum + elements[element]}
          baseValue={admin.player.stats.elements[element]}
          css={element}
          onChange={(val) => {
            setElements({ ...elements, [element]: val });
          }}
        />
      ))}
      <button
        onClick={() => {
          ALL_ELEMENTS.forEach((element) => {
            admin.player.stats.elements[element] += elements[element];
          });
          admin.player.ap -= elementSum;
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
      <button onClick={() => admin.changeMenu(Panel.MainMenu)}>Back</button>
    </>
  );
}

function Attack() {
  const game = useContext(GameContext);
  const admin = useContext(AdminContext);

  const [victim, setVictim] = useState<Player>(null);
  const [weapon, setWeapon] = useState<Item>(null);

  function attack() {
    let strength = Math.min(70, admin.player.stats.elements.earth / 2);
    let dexterity = Math.min(70, admin.player.stats.elements.thunder / 2);
    let defence = Math.min(70, victim.stats.elements.fire / 2);
    let agility = Math.min(70, victim.stats.elements.air / 2);

    let totalDamage = 0;

    let neutralDamage =
      getModifiedStat(admin.player, "neutraldmg", weapon.modifiers) +
      (weapon.type === "melee"
        ? getModifiedStat(admin.player, "meleedmg", weapon.modifiers)
        : getModifiedStat(admin.player, "rangeddmg", weapon.modifiers));

    alert(neutralDamage);

    totalDamage += Math.max(0, neutralDamage);

    for (const element of ALL_ELEMENTS) {
      let elementalDamage =
        getModifiedStat(
          admin.player,
          `elementsdmg.${element}`,
          weapon.modifiers
        ) -
        getModifiedStat(victim, `elementsdef.${element}`, weapon.modifiers) +
        (weapon.type === "melee"
          ? getModifiedStat(admin.player, "meleedmg", weapon.modifiers)
          : getModifiedStat(admin.player, "rangeddmg", weapon.modifiers));

      totalDamage += Math.max(0, elementalDamage);
    }
    let rng = Math.random() * 100 + 1;
    totalDamage *=
      (1 + (strength - defence) / 100) *
      (rng < dexterity ? 2 : 1) *
      (rng < agility ? 0.1 : 1);

    victim.stats.hp -= totalDamage;
    game.update();
  }

  return (
    <>
      {game.players
        .filter((player) => player !== admin.player)
        .map((player) => (
          <button key={player.name} onClick={() => setVictim(player)}>
            {player.name}
          </button>
        ))}

      <p>Currently selected player: {victim ? victim.name : "N/A"}</p>

      {!victim ? null : (
        <div>
          <h2>Select a weapon.</h2>
          {admin.player.inventory
            .filter((item) => item.type === "sword" || item.type === "bow")
            .map((item: Item) => (
              <button key={item.name} onClick={() => setWeapon(item)}>
                {item.name}
              </button>
            ))}
        </div>
      )}
      {!weapon ? null : (
        <div>
          <button
            onClick={() => {
              attack();
              admin.changeMenu(Panel.MainMenu);
            }}
          >
            Attack!
          </button>
        </div>
      )}
      <button onClick={() => admin.changeMenu(Panel.MainMenu)}>Back</button>
    </>
  );
}
