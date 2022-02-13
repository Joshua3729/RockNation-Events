import React from "react";
import classes from "./Button.css";

const button = (props) => {
  return <button className={classes.button}>{props.label}</button>;
};

export default button;
