import React from "react";
import classes from "./NavLink.css";

const navLink = (props) => {
  return <a className={classes.NavLink}>{props.children}</a>;
};

export default navLink;
