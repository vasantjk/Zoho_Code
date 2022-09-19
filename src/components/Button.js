import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Button = ({
  BtnName,
  Icon,
  IconName,
  BgColor = "",
  TxtColor,
  Styles,
  HoverColor,
  OnClick = () => null,
}) => {
  const [hover, setHover] = React.useState(false);
  const [shadow, setShadow] = React.useState(false);
  const getIcon = () => {
    let Icon = require("@fortawesome/free-solid-svg-icons");
    return Icon[IconName];
  };
  return (
    <div
      className="button-box"
      style={{
        backgroundColor:
          BgColor.length !== 0 ? (hover ? "#d6eaff" : BgColor) : "grey",
        borderRadius: "5px",
        border: hover ? "1px solid #2677cd" : "1px solid lightgray",
        color: TxtColor ? TxtColor : "black",
        cursor: "pointer",
        // width: "18%",
        ...Styles,
        padding: "5px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: !hover ? shadow && " 0 0 0 0 white" : "2px 2px 3px grey",
        transition: " 0.3s",
      }}
      onClick={() => {
        OnClick();
        setShadow(true);
        setTimeout(() => setShadow((pre) => !pre), 100);
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {Icon && (
        <div style={{ margin: "auto" }}>
          <FontAwesomeIcon icon={getIcon()} />
        </div>
      )}
      <button
        style={{
          width: Icon ? "90%" : "100%",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        {BtnName}
      </button>
    </div>
  );
};
