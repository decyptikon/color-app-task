import { Component, ChangeEvent } from "react";
import "./Checkbox.scss";
import { Filter } from "../../types/filter";

interface Props {
  label: string;
  filterName: Filter;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

class Checkbox extends Component<Props> {
  render() {
    const { label, filterName, onChange } = this.props;
    return (
      <label htmlFor={filterName}>
        <input
          id={filterName}
          type="checkbox"
          value={filterName}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    );
  }
}

export default Checkbox;
