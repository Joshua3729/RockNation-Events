import React from "react";
import classes from "./OrderItem.module.css";

const orderItem = (props) => {
  const order_item = props.order_item;
  return (
    <div className={classes.OrderItem}>
      <div className={classes.order_subItem}>{order_item._id}</div>
      <div className={classes.order_subItem}>12 June 2022</div>
      <div className={classes.order_subItem}>{order_item.event.name}</div>
      <div className={classes.order_subItem}>{order_item.delivered}</div>
      <div className={classes.order_subItem}>{order_item.price}</div>
      <div className={classes.order_subItem}>Paid</div>
    </div>
  );
};

export default orderItem;
