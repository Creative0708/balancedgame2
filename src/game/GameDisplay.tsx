import { useContext } from "react";
import { useState } from "react";
import { GameContext, type Player } from ".";
import { AdminPanel } from "../admin/AdminPanel";
import { Clock } from "../comp/Clock";

export function GameDisplay() {
  return (
    <div>
      <PlayerTable />
      <Clock />
    </div>
  );
}

function PlayerTable() {
  return (
    <table>
      <thead>
        <TableRow title="Name" value={(player) => player.name} />
      </thead>
      <tbody>
        <TableRow
          title="✷ Ability Points"
          value={(player) => player.ap}
          className="ap"
        />
      </tbody>
      <tbody>
        <TableRow
          title="✷ Level"
          value={(player) => `${player.combatlevel} [${player.combatxp}/100]`}
          className="lvl"
        />
      </tbody>
      <tbody>
        <TableRow
          title="❤️ Health"
          value={(player) =>
            `${Math.round(player.stats.hp)}/${player.stats.maxhp}`
          }
          className="hp"
        />
      </tbody>
      <tbody>
        <TableRow
          title="❣ Health Regen"
          value={(player) => player.stats.hpregen}
          className="hpregen"
        />
      </tbody>
      <tbody>
        <TableRow
          title="✷ Mana"
          value={(player) => `${player.stats.mana}/${player.stats.maxmana}`}
          className="mana"
        />
      </tbody>
      <tbody>
        <TableRow
          title="⸎ Mana Regen"
          value={(player) => player.stats.manaregen}
          className="manarg"
        />
      </tbody>
      <tbody>
        <TableRow
          title="🗲 Stamina"
          value={(player) => player.stats.stamina}
          className="stamina"
        />
      </tbody>
      <tbody>
        <TableRow
          title="◆ Stamina Regen"
          value={(player) => player.stats.staminaregen}
          className="staminaregen"
        />
      </tbody>
      <tbody>
        <TableRow
          title="✤ Strength"
          value={(player) => player.stats.elements.earth}
          className="earth"
        />
      </tbody>
      <tbody>
        <TableRow
          title="✦ Dexterity"
          value={(player) => player.stats.elements.thunder}
          className="thunder"
        />
      </tbody>
      <tbody>
        <TableRow
          title="❉ Intelligence"
          value={(player) => player.stats.elements.water}
          className="water"
        />
      </tbody>
      <tbody>
        <TableRow
          title="✹ Defence"
          value={(player) => player.stats.elements.fire}
          className="fire"
        />
      </tbody>
      <tbody>
        <TableRow
          title="❋ Agility"
          value={(player) => player.stats.elements.air}
          className="air"
        />
      </tbody>
    </table>
  );
}

function TableRow(props: {
  title: string;
  value: (player: Player) => any;

  className?: string;
}) {
  const game = useContext(GameContext);

  return (
    <tr className={props.className}>
      <td>{props.title}</td>
      {game.players.map((player) => (
        <td>{props.value(player)}</td>
      ))}
    </tr>
  );
}
