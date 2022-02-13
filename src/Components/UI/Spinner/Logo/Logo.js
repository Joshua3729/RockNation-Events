import React from "react";
import classes from "./Logo.css";
import Logo from "../../../../Assets/images/Logo1.png";
const logo = () => {
  return (
    <div className={classes.Logo}>
      <p>
        <span className={classes.logoSpan}>POWERBRAINS</span> EVENTS
      </p>
    </div>
  );
};

export default logo;
