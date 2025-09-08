import { useContext } from "react";
import {useState} from "react";
import { GameContext, type Player } from ".";

export function GameDisplay() {
  return (
    <div>
      <PlayerTable />
      <Admin />
    </div>
  );
}

function PlayerTable() {
  return (
    <table>
      <thead>
        <TableRow title="Name" value={(player) => player.name}/>
      </thead>
      <tbody>
        <TableRow title="✷ Ability Points" value={(player) => player.ap} titleClass="ap"/>
      </tbody>
      <tbody>
        <TableRow title="✷ Level" value={(player) => `${player.level} [${player.xp}/100]`} titleClass="lvl"/>
      </tbody>
      <tbody>
        <TableRow title="❤️ Health" value={(player) => player.stats.hp} titleClass="hp"/>
      </tbody>
      <tbody>
        <TableRow title="❣ Health Regen" value={(player) => player.stats.hpregen} titleClass="hpregen"/>
      </tbody>
      <tbody>
        <TableRow title="✷ Mana" value={(player) => player.stats.mana} titleClass="mana"/>
      </tbody>
      <tbody>
        <TableRow title="⸎ Mana Regen" value={(player) => player.stats.manaregen} titleClass="manarg"/>
      </tbody>
      <tbody>
        <TableRow title="🗲 Stamina" value={(player) => player.stats.stamina} titleClass="stamina"/>
      </tbody>
      <tbody>
        <TableRow title="◆ Stamina Regen" value={(player) => player.stats.staminaregen} titleClass="staminaregen"/>
      </tbody>
      <tbody>
        <TableRow title="✤ Strength" value={(player) => player.stats.elements[0]} titleClass="earth"/>
      </tbody>
      <tbody>
        <TableRow title="✦ Dexterity" value={(player) => player.stats.elements[1]} titleClass="thunder"/>
      </tbody>
      <tbody>
        <TableRow title="❉ Intelligence" value={(player) => player.stats.elements[2]} titleClass="water"/>
      </tbody>
      <tbody>
        <TableRow title="✹ Defence" value={(player) => player.stats.elements[3]} titleClass="fire"/>
      </tbody>
      <tbody>
        <TableRow title="❋ Agility" value={(player) => player.stats.elements[4]} titleClass="air"/>
      </tbody>
    </table>
  );
}

function TableRow(props: {
  title: string;
  value: (player: Player) => any;

  titleClass?: string;
}) {
  const game = useContext(GameContext);

  return (
    <tr>
      <td className={props.titleClass}>{props.title}</td>
      {game.players.map((player) => (
        <td>{props.value(player)}</td>
      ))}
    </tr>
  );
}

let curPlayer = null;

function Admin() {
  const [menu, setMenu] = useState("Character Selection");
  

  function changeMenu(newMenu: string) {
    setMenu(newMenu);
  }

  function doSomething(event: MouseEvent) {
      if (event.shiftKey)
          console.log('Shift-click detected!');
      else
          console.log('Regular click detected!');
  }

  function setPlayer (newPlayer: Player) {
    curPlayer = newPlayer;
  }
  
  if (menu === "Character Selection") {
    const game = useContext(GameContext);
    
    return (
      <>
        <h1>Character Selection</h1>
        {game.players.map((player: Player) => (<button key={player.name} onClick={() => {
          changeMenu("Main Menu");
          setPlayer(player);
        }}>{player.name}</button>))}
      </>
    );
  }
  if (menu === "Main Menu") {
    return (
      <>
        <h1>Welcome to the Admin Panel! You are {curPlayer.name}</h1>
        <button onClick={() => changeMenu("AP")}>AP</button>
        <button onClick={() => changeMenu("Map")}>Map</button>
        <button onClick={() => changeMenu("Crafting")}>Crafting</button>
        <button onClick={() => changeMenu("Shop")}>Shop</button>
        <button onClick={() => changeMenu("Game Info")}>Game Info</button>
      </>
    );
  }
  else if (menu === "AP") {
    return (
      <>
        <h1>Character Menu</h1>
        <h3>Select which one to allocate!</h3>
        <button onClick={() => doSomething(this)}>Strength</button>
        <button onClick={() => doSomething(this)}>Map</button>
        <button onClick={() => doSomething(this)}>Crafting</button>
        <button onClick={() => doSomething(this)}>Shop</button>
        <button onClick={() => doSomething(this)}>Game Info</button>
      </>
    );
  }
}