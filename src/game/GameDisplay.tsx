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
        <TableRow title="Name" field="name" />
      </thead>
      <tbody>
        <TableRow title="❤️ Health" field="hp" titleClass="hp" />
      </tbody>
    </table>
  );
}

function TableRow(props: {
  title: string;
  field: keyof Player;
  titleClass?: string;
}) {
  const game = useContext(GameContext);

  return (
    <tr>
      <td className={props.titleClass}>{props.title}</td>
      {game.players.map((player) => (
        <td>{player[props.field]}</td>
      ))}
    </tr>
  );
}
