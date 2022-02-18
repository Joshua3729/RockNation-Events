import React from "react";
import classes from "./NavLink/NavLink.module.css";

const navLink = (props) => {
  return <a className={classes.NavLink}>{props.children}</a>;
};

export default navLink;
