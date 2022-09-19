import React from "react";

export const Input = ({
  Name,
  OnChange = () => null,
  Value,
  Styles,
  Disabled,
  Placeholder = "",
}) => {
  return (
    <div>
      <input
        disabled={Disabled}
        name={Name}
        value={Value}
        onChange={(e) => OnChange(e)}
        placeholder={Placeholder}
        style={{
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          border: "none",
          outline: "none",
          boxSizing: "border-box",
          backgroundColor: "#EFF2F9",
          ...Styles,
        }}
      ></input>
    </div>
  );
};
