import React from "react";
import { Link } from "react-router-dom";
import classes from "./PageGutter.module.css";

const pageGutter = (props) => {
  console.log(props.links);
  return (
    <div className={classes.PageGutter}>
      <div className={classes.breadCrumbsWrapper}>
        <ul className={classes.breadCrumbs}>
          {props.links &&
            props.links.map((link) => (
              <li className={classes.navigation_item}>
                <Link
                  to={link.to}
                  className={link.active ? classes.active : null}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <h2>{props.name}</h2>
    </div>
  );
};
export default pageGutter;
