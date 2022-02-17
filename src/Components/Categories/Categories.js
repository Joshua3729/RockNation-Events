import React from "react";
import classes from "./Categories.module.css";
import { Link } from "react-router-dom";

const categories = (props) => {
  return (
    <div className={classes.categories}>
      <p className={classes.categoriesText}>Categories</p>
      <div className={classes.categories_grid}>
        <div className={classes.grid_item}>
          <Link to="/musicevents">
            <img
              src="https://www.rollingstone.com/wp-content/uploads/2020/09/black-promoters-collective.jpg?resize=1800,1200&w=450"
              alt=""
            />
            <div className={classes.EventLabel}>Music Concerts</div>
          </Link>
        </div>
        <div className={classes.grid_item}>
          <Link to="/comedy">
            <img
              src="https://seedworld.com/site/wp-content/uploads/2019/11/Standup-Comedy-1-696x464.jpg"
              alt=""
            />
            <div className={classes.EventLabel}>Stand Up Comedy</div>
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
          <img
            src="https://cdn.shopify.com/s/files/1/0468/4270/8124/articles/2559491272_17552143_28c0213a-8e3b-45e9-95cd-89cce2ee313b_3000x.jpg?v=1608226189"
            alt=""
          />
          <div className={classes.EventLabel}>Kids Events</div>
        </div>
      </div>
    </div>
  );
};

export default categories;