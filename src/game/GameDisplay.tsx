import { useContext } from "react";
import { GameContext, type Player } from ".";

export function GameDisplay() {
  return (
    <div>
      <PlayerTable />
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
        <TableRow title="✤ Strength" value={(player) => player.stats.strength} titleClass="earth"/>
      </tbody>
      <tbody>
        <TableRow title="✦ Dexterity" value={(player) => player.stats.dexterity} titleClass="thunder"/>
      </tbody>
      <tbody>
        <TableRow title="❉ Intelligence" value={(player) => player.stats.intelligence} titleClass="water"/>
      </tbody>
      <tbody>
        <TableRow title="✹ Defence" value={(player) => player.stats.defence} titleClass="fire"/>
      </tbody>
      <tbody>
        <TableRow title="❋ Agility" value={(player) => player.stats.agility} titleClass="air"/>
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
