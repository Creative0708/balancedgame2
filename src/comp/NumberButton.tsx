import { useContext, useEffect, useState, type MouseEvent } from "react";

/** A button that you can click/right click to increment/decrement. */
export default function NumberButton({
  min,
  max,
  defaultValue,
  baseValue,
  css,

  onChange,
}: {
  min?: number;
  max?: number;
  defaultValue?: number;
  baseValue: number;
  css: string;

  onChange(val: number): void;
}) {
  const [value, setValue] = useState(defaultValue ?? 0);

  useEffect(() => onChange(0), []);

  function onClick(e: MouseEvent) {
    e.preventDefault();

    let change = e.button === 2 ? -1 : 1;
    if (e.shiftKey) change *= 5;

    let newValue = value + change;
    if (newValue+baseValue < min) newValue = min-baseValue;
    if (newValue > max) newValue = max;

    setValue(newValue);
    onChange(newValue);
  }

  return (
    <button onClick={onClick} onContextMenu={onClick} className={css}>
      {baseValue+value}
    </button>
  );
}
