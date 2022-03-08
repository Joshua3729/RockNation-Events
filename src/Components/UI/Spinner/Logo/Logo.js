import React from "react";
import classes from "./Logo.module.css";
const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <p style={{ color: props.scroll ? "#27374d" : "white" }}>rocknation</p>
    </div>
  );
};

export default logo;
