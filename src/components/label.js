import React from "react";
import { Required } from "./Required";
export const Label = ({ LabelText, RequiredField, Styles }) => {
  return (
    <div style={{ ...Styles }}>
      <label>
        {LabelText}
        {RequiredField && <Required Color="red"></Required>}
      </label>
    </div>
  );
};
