import React from "react";

export const Select = ({
  Options,
  DefaultValue,
  Styles,
  OnChange,
  Value,
  Name,
}) => {
  const handleChange = (e) => {
    OnChange(e);
  };
  return (
    <div style={{ ...Styles }}>
      <select
        name={Name}
        value={Value}
        style={{
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          cursor: "pointer",
          backgroundColor: "#EFF2F9",
          border: "none",
        }}
        onChange={(e) => handleChange(e)}
      >
        <option value={""} selected disabled hidden>
          {DefaultValue}
        </option>
        {Options.map((opt, optIndex) => (
          <option key={opt + optIndex} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
