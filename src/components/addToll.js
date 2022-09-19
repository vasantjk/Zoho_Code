import React from "react";
import { Input } from "./Input";
import { Select } from "./select";
const ArrayOfData = [
  {
    vehicleType: "",
    up: "",
    down: "",
  },
  {
    vehicleType: "",
    up: "",
    down: "",
  },
  {
    vehicleType: "",
    up: "",
    down: "",
  },
  {
    vehicleType: "",
    up: "",
    down: "",
  },
];
const opt = ["Car/Jeep/Van", "LCV", "Truck/Bus", "Heavy_Vehicle"];
export const AddToll = ({ returnValue, ClearState, Styles }) => {
  const [tollDetails, setTollDetails] = React.useState(ArrayOfData);
  const handleChange = (e, index) => {
    let Data = [...tollDetails];
    Data[index][e.target.name] =
      e.target.name === "up" || e.target.name === "down"
        ? e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
        : e.target.value;

    setTollDetails(Data);
    returnValue(Data);
  };
  React.useEffect(() => {
    setTollDetails(ArrayOfData);
  }, [ClearState]);
  return (
    <>
      {tollDetails.map((toll, index) => {
        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplate: "auto auto auto",
              gridTemplateColumns: " repeat(3, 1fr)",
              gridTemplateRows: "0.5fr",
              gap: 15,
              columnGap: 15,
              ...Styles,
            }}
          >
            <Select
              Value={toll.vehicleType.length === 0 ? "" : toll.vehicleType}
              Name="vehicleType"
              OnChange={(e) => handleChange(e, index)}
              Options={opt}
              DefaultValue={"Select Vehicle Type"}
            />
            <Input
              Name="up"
              Value={toll.up}
              OnChange={(e) => handleChange(e, index)}
              Placeholder="Single Journey"
            />
            <Input
              Name="down"
              Value={toll.down}
              OnChange={(e) => handleChange(e, index)}
              Placeholder="Return Journey"
            />
          </div>
        );
      })}
    </>
  );
};
