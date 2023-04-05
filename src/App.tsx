import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import "./App.scss";
import ColorForm from "./components/ColorForm/ColorForm";
import FilterAdjuster from "./components/FilterAdjuster/FilterAdjuster";
import ColorList from "./components/ColorList/ColorList";
import { Data } from "./components/types/data";
import { Filter } from "./components/types/filter";

export const storeData = (data: Data[]) =>
  window.localStorage.setItem("data", JSON.stringify(data));

const getStoredData = (): Data[] => {
  const storedData = window.localStorage.getItem("data");
  return storedData !== null ? JSON.parse(storedData) : [];
};

const compareFn = (d1: Data, d2: Data) => {
  if (d2.r - d1.r) return d2.r - d1.r;
  if (d2.g - d1.g) return d2.g - d1.g;
  return d2.b - d1.b;
};

const initialData = [
  {
    id: 1,
    hex: "#f95633",
    r: 249,
    g: 86,
    b: 51,
    saturation: 94.3,
    isAddedByUser: false,
  },
  {
    id: 2,
    hex: "#e84a5f",
    r: 232,
    g: 74,
    b: 95,
    saturation: 77.5,
    isAddedByUser: false,
  },
  {
    id: 3,
    hex: "#00f9ff",
    r: 0,
    g: 249,
    b: 255,
    saturation: 100,
    isAddedByUser: false,
  },
  ...getStoredData(),
];

interface DataContext {
  data: Data[];
  setData: Dispatch<SetStateAction<Data[]>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}

export const Context = createContext<DataContext>({
  data: [],
  setData: () => {},
  filters: [],
  setFilters: () => {},
});

const App = () => {
  const [data, setData] = useState<Data[]>(initialData);
  const [filters, setFilters] = useState<Filter[]>([]);

  const readyData = [...data]
    .sort(compareFn)
    .filter(({ r, g, b, saturation }) => {
      const conditionR = filters.includes(Filter.redBiggerThan50)
        ? r > 127
        : true;
      const conditionG = filters.includes(Filter.greenBiggerThan50)
        ? g > 127
        : true;
      const conditionB = filters.includes(Filter.blueBiggerThan50)
        ? b > 127
        : true;
      const conditionS = filters.includes(Filter.saturationBiggerThan50)
        ? saturation > 50
        : true;
      return conditionR && conditionG && conditionB && conditionS;
    });

  useEffect(() => {
    storeData(data.filter(({ isAddedByUser }) => isAddedByUser));
  }, [data]);

  return (
    <Context.Provider
      value={{
        data,
        setData,
        filters,
        setFilters,
      }}
    >
      <div className="container">
        <ColorForm />
        <FilterAdjuster />
        <ColorList data={readyData} />
      </div>
    </Context.Provider>
  );
};

export default App;
