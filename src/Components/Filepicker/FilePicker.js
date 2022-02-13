import React from "react";
import classes from "./FilePicker.module.css";

const filePicker = (props) => (
  <div className={classes.FilePicker}>
    <label htmlFor={props.id}>{props.label}</label>
    <input
      className={[
        !props.valid ? "invalid" : "valid",
        props.touched ? "touched" : "untouched",
      ].join(" ")}
      type="file"
      id={props.id}
      onChange={(e) => props.onChange(props.id, e.target.value, e.target.files)}
      onBlur={props.onBlur}
    />
  </div>
);

export default filePicker;
