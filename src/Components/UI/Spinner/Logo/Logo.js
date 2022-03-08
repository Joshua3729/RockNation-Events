import React from "react";
import classes from "./Logo.module.css";
const logo = (props) => {
  return (
    <div className={classes.Logo} onClick={props.goToHome}>
      <p style={{ color: props.scroll ? "#27374d" : "white" }}>rocknation</p>
    </div>
  );
};

export default logo;
