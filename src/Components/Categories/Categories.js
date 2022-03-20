import React from "react";
import classes from "./Categories.module.css";
import { Link } from "react-router-dom";

const categories = (props) => {
  return (
    <div className={classes.categories}>
      <p className={classes.categoriesText}>Categories</p>
      <div className={classes.categories_grid}>
        <div className={classes.grid_item}>
          <Link to="/concerts">
            <img
              src="https://images.unsplash.com/photo-1566808907623-51b8fc382454?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
            />
            <div className={classes.EventLabel}>Music Concerts</div>
          </Link>
        </div>
        <div className={classes.grid_item}>
          <Link to="/sports">
            <img
              src="https://www.mural-wallpaper.com/wp-content/uploads/2020/11/S-SP25.jpg"
              alt=""
            />
            <div className={classes.EventLabel}>sports</div>
          </Link>
        </div>
        <div className={classes.grid_item}>
          <Link to="/artsandtheater">
            <img
              src="https://www.jpas.org/wp-content/uploads/bb-plugin/cache/FrozenJR_Nov2019-30-scaled-landscape.jpg"
              alt=""
            />

            <div className={classes.EventLabel}>Arts And Theater</div>
          </Link>
        </div>
        <div className={classes.grid_item}>
          <Link to="/family">
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
              alt=""
            />
            <div className={classes.EventLabel}>Kids Events</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default categories;
