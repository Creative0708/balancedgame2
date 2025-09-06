import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../game";
import "./background/background.css";

import spring from "./background/spring.jpg";

export function Background() {
  // TODO: integrate seasons with background
  const game = useContext(GameContext);
  const [imageUrl, setImageUrl] = useState(spring);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1000,
      easing: "cubic-bezier(.22,1,.58,1)",
    });
  }, [imageUrl]);
  return (
    <div className="background-container" ref={ref}>
      <div
        className="background"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    </div>
  );
}
