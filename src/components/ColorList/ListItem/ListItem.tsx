import { useContext, useRef, useEffect } from "react";
import "./ListItem.scss";
import { Context } from "../../../App";
import { Data } from "../../types/data";

interface Props {
  data: Data;
}

const ListItem = ({ data: { id, hex, isAddedByUser } }: Props) => {
  const { data, setData } = useContext(Context);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => setData(data.filter((item) => item.id !== id));

  useEffect(() => {
    ref.current?.style.setProperty("background-color", hex);
  }, [hex]);

  return (
    <li className="list-item">
      <div className="box">
        <div ref={ref} className="hex-color" />
        <div className="text">{hex}</div>
      </div>
      {isAddedByUser && <button onClick={handleClick}>x</button>}
    </li>
  );
};

export default ListItem;
