import { ChangeEvent, useContext } from "react";
import { Context } from "../../App";
import { Filter } from "../types/filter";
import "./FilterAdjuster.scss";
import Checkbox from "./Checkbox/Checkbox";

const FilterAdjuster = () => {
  const { filters, setFilters } = useContext(Context);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFilters([...filters, e.target.value as Filter]);
    } else {
      setFilters(filters.filter((tag: Filter) => tag !== e.target.value));
    }
  };

  return (
    <div className="filter-adjuster">
      <Checkbox
        label="Red > 50%"
        filterName={Filter.redBiggerThan50}
        onChange={handleChange}
      />
      <Checkbox
        label="Green > 50%"
        filterName={Filter.greenBiggerThan50}
        onChange={handleChange}
      />
      <Checkbox
        label="Blue > 50%"
        filterName={Filter.blueBiggerThan50}
        onChange={handleChange}
      />
      <Checkbox
        label="Saturation > 50%"
        filterName={Filter.saturationBiggerThan50}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterAdjuster;
