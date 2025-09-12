import { useContext, useEffect, useState, type MouseEvent } from "react";

/** A button that you can click/right click to increment/decrement. */
export default function NumberButton({
  min,
  max,
  defaultValue,

  onChange,
}: {
  min?: number;
  max?: number;
  defaultValue?: number;

  onChange(val: number): void;
}) {
  const [value, setValue] = useState(defaultValue ?? 0);

  useEffect(() => onChange(defaultValue), []);

  function onClick(e: MouseEvent) {
    e.preventDefault();

    let change = e.button === 2 ? -1 : 1;
    if (e.shiftKey) change *= 5;

    let newValue = value + change;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    setValue(newValue);
    onChange(newValue);
  }

  return (
    <button onClick={onClick} onContextMenu={onClick} className="number-button">
      {value}
    </button>
  );
}
