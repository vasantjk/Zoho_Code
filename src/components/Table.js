import React from "react";
import "./table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Select, Button, Dialog, Searchfield } from "../components";
export const Table = ({
  Heading,
  Data = [],
  Search,
  SearchFieldName,
  Delete,
  SearchPlaceholder,
  Store = "",
  Filter = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [showList, setShowList] = React.useState(Data);
  const [getIndex, setGetIndex] = React.useState("");
  const handleSearch = (val = "") => {
    if (val.length === 0 && sessionStorage.getItem(Store)) {
      setShowList(
        Store.length !== 0 ? JSON.parse(sessionStorage.getItem(Store)) : Data
      );
    } else {
      if (typeof SearchFieldName === Number) {
        SearchFieldName = SearchFieldName.toString();
      }
      let res = Data.filter((e) =>
        e[SearchFieldName].toLowerCase().includes(val)
      );
      setShowList(res);
    }
  };

  const handleDelete = (indexVal) => {
    setOpen(true);
    setGetIndex(indexVal);
  };
  const handleAgree = () => {
    let res = showList.filter((list, i) => i !== getIndex);
    sessionStorage.setItem("ViewToll", JSON.stringify(res));
    setShowList(res);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getOptions = () => {
    let NewOptions = ["All"];
    if (JSON.parse(sessionStorage.getItem("ViewToll"))) {
      JSON.parse(sessionStorage.getItem("ViewToll")).forEach((e) =>
        NewOptions.push(e.TollName)
      );
    }
    return NewOptions;
  };
  const FilterBy = (val) => {
    let res;
    if (val.target.value === "All" && sessionStorage.getItem("VehicleLog")) {
      setShowList(JSON.parse(sessionStorage.getItem("VehicleLog")));
    } else if (sessionStorage.getItem("VehicleLog")) {
      res = JSON.parse(sessionStorage.getItem("VehicleLog")).filter((e) =>
        e["TollName"].toLowerCase().includes(val.target.value.toLowerCase())
      );

      setShowList(res);
    }
  };
  return (
    <div>
      <div style={{ width: "50%", margin: "10px 0 10px auto" }}>
        {Search && (
          <div
            style={{
              display: "flex",
              justifyContent: Filter ? "space-between" : "flex-end",
            }}
          >
            {Filter && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px",
                }}
              >
                <Select
                  DefaultValue={"FILTER TOLLNAME"}
                  Options={getOptions()}
                  OnChange={FilterBy}
                />
              </div>
            )}
            <div style={{ width: "70%" }}>
              <abbr title="Search" style={{ textDecoration: "none" }}>
                <Searchfield
                  PlaceHolder={SearchPlaceholder}
                  searchValue={handleSearch}
                  compare="VehicleType"
                />
              </abbr>
            </div>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            {Heading.map((rowHead, index) => (
              <th key={rowHead + index} style={{ textAlign: "center" }}>
                {rowHead.toUpperCase()}
              </th>
            ))}
            {Delete && <th>DELETE</th>}
          </tr>
        </thead>
        <tbody>
          {showList !== null &&
            showList !== undefined &&
            showList.map((value, index) => (
              <tr key={`12${index}`}>
                {Heading.map((head, headIndex) =>
                  Object.entries(value).map(
                    (data, dataIndex) =>
                      data[0] === head && (
                        <td
                          key={data + head + dataIndex + headIndex}
                          style={{ textAlign: "center", fontWeight: "400" }}
                        >
                          {data[1]}
                        </td>
                      )
                  )
                )}
                {Delete && (
                  <td>
                    <div onClick={() => handleDelete(index)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </td>
                )}
                {/* {Object.entries(value).map((data, dataIndex) =>
              Heading.map(
                (head, headIndex) =>
                  data[0] === head && (
                    <td key={data + head + dataIndex + headIndex}>{data[1]}</td>
                  )
              )
            )} */}
              </tr>
            ))}
        </tbody>
      </table>
      {Search &&
        (showList.length === 0 ||
          showList === null ||
          showList === undefined) && (
          <div
            style={{
              boxSizing: "border-box",
              width: "100%",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>No Record Found</h1>
          </div>
        )}
      <Dialog open={open} PaperHeight="30vh">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80%",
            position: "relative",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <span style={{ fontWeight: "600" }}>
              DO YOU WANT TO DELETE THIS DATA ?
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              BtnName={"Cancel"}
              BgColor="white"
              TxtColor="black"
              Width={12}
              OnClick={() => handleClose()}
            />

            <Button
              BtnName={"Agree"}
              BgColor="white"
              TxtColor="black"
              Width={10}
              OnClick={() => handleAgree()}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
