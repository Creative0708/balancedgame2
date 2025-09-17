import { useContext, useEffect, useRef, useState } from "react";
import "./clock.css";
import { GameContext } from "../game";

const GAME_START = new Date("Mon Sep 15 2025 00:00:00 GMT-0400");
const SECONDS_RTA_PER_DAY_IGT = 3600;

export function Clock() {
  const game = useContext(GameContext);

  const timeout = useRef(null);

  const day = game.days;
  const integerDay = Math.floor(day);
  const hour = (day - integerDay) * 24;
  const minute = (((day - integerDay) * 24) % 1) * 60;

  function updateClock() {
    const now = new Date();
    const milliseconds = now.getTime() - GAME_START.getTime();
    game.days = milliseconds / 1000 / SECONDS_RTA_PER_DAY_IGT;
    game.update();

    timeout.current = setTimeout(updateClock, 1000 - (now.getTime() % 1000));
  }

  useEffect(() => {
    updateClock();
    return () => timeout.current && clearTimeout(timeout.current);
  }, []);

  return (
    <div id="clock-container">
      <div>
        <h1>Day {integerDay}</h1>
        <p className="time-display">
          {Math.floor(hour).toString().padStart(2, "0")}
          <span className="blink">:</span>
          {Math.floor(minute).toString().padStart(2, "0")}
        </p>
        <div className="clock-display">
          <div
            className="hour-hand"
            style={{ rotate: (hour / 12) * 360 + "deg" }}
          ></div>
          <div
            className="minute-hand"
            style={{ rotate: (minute / 60) * 360 + "deg" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
