import { Data } from "../types/data";
import "./ColorList.scss";
import ListItem from "./ListItem/ListItem";

interface Props {
  data: Data[];
}

const ColorList = ({ data }: Props) => {
  return (
    <ul className="color-list">
      {data.map((item) => (
        <ListItem key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default ColorList;
