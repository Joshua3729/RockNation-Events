import React from "react";
import classes from "./SolidButton.module.css";

const solidButton = (props) => {
  return (
    <a className={classes.SolidButton} href={props.link}>
      {props.children}
    </a>
  );
};

export default solidButton;
