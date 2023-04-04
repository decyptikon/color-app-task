import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { Context } from "../../App";
import "./ColorForm.scss";

const getSaturation = (red: number, green: number, blue: number) => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return (
    100 * (max - min === 0 ? 0 : (max - min) / (1 - Math.abs(max + min - 1)))
  );
};

const getDecimalColor = (hex: string, fromIndex: number, toIndex: number) => {
  const singleHexColor = hex.slice(fromIndex, toIndex);
  return parseInt(singleHexColor, 16);
};

const ColorForm = () => {
  const [hex, setHex] = useState("");
  const { data, setData } = useContext(Context);

  const isCorrectlyFilled = /^#[0-9a-f]{6}$/.test(hex);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (/^#[0-9a-f]{0,6}$/.test(value) || value === "") {
      setHex(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = getDecimalColor(hex, 1, 3);
    const g = getDecimalColor(hex, 3, 5);
    const b = getDecimalColor(hex, 5, 7);
    setData([
      ...data,
      {
        id: Math.max(...data.map(({ id }) => id)) + 1,
        hex,
        r,
        g,
        b,
        saturation: getSaturation(r, g, b),
        isAddedByUser: true,
      },
    ]);
    setHex("");
  };

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a color"
        value={hex}
        onChange={handleChange}
      />
      <button type="submit" disabled={!isCorrectlyFilled}>
        +
      </button>
    </form>
  );
};

export default ColorForm;
