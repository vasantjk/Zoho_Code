import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export const Searchfield = ({ PlaceHolder, searchValue }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        border: "1.5px solid black",
        display: "flex",
        borderRadius: "20px",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          flexGrow: 0.5,
          margin: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <input
        type="text"
        style={{
          border: "none",
          outline: "none",
          width: "90%",
          borderRadius: "20px",
          background: "transparent",
          padding: "10px",
        }}
        onChange={(e) => searchValue(e.target.value)}
        placeholder={PlaceHolder}
      ></input>
    </div>
  );
};
