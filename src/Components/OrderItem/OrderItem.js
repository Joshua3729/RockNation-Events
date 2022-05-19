import React from "react";
import classes from "./OrderItem.module.css";

const orderItem = (props) => {
  const order_item = props.order_item;
  return (
    <div className={classes.OrderItem}>
      <div className={classes.order_subItem}>{order_item._id}</div>
      <div className={classes.order_subItem}>12 June 2022</div>
      <div className={classes.order_subItem}>{order_item.event.name}</div>
      <div className={classes.order_subItem}>
        {order_item.delivered ? (
          <p className={classes.fulfillied}>Fulfillied</p>
        ) : (
          <p className={classes.pending}>Pending Receipt</p>
        )}
      </div>
      <div className={classes.order_subItem}>${order_item.totalPrice}</div>
      <div className={classes.order_subItem}>20 June 2022</div>
      <div className={classes.order_subItem}>
        <p className={classes.fulfillied}>Paid</p>
      </div>
    </div>
  );
};

export default orderItem;
