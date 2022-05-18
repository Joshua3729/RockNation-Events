import React, { Component, Fragment } from "react";
import classes from "./UserProfile.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";
import loading from "../../Components/UI/loading/loading";
import OrderItem from "../../Components/OrderItem/OrderItem";

class UserProfile extends Component {
  state = {
    ticket_orders: null,
    numberOfOrders: null,
    loading: true,
  };
  componentDidMount() {
    console.log("below");
    if (this.props.isAuth) {
      fetch("http://localhost:5000/feed/ticket-orders", {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to get ticket orders.");
          }

          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          this.setState({
            ticket_orders: resData.ticket_orders,
            numberOfOrders: resData.ticket_orders.length,
            loading: false,
          });
        })
        .catch((err) => console.log(err));
    }
  }
  render() {
    let orders = <p>Loading</p>;
    if (this.state.numberOfOrders === 0 && !this.state.loading) {
      orders = (
        <div className={classes.inner_orders_wrapper}>
          <p className={classes.orders_header}>Looking for your tickets?</p>
          <p className={classes.orders_cta}>
            You need to verify your email to view transfers and gifts.
          </p>
          <button className={classes.verify_email_btn}>
            Verify your email
          </button>
          <div className={classes.emptyState_wrapper}>
            <div className={classes.emptyState}>
              <svg viewBox="0 0 144 144">
                <g fill="none" fill-rule="evenodd">
                  <g>
                    <path d="M0 0h144v144H0z"></path>
                    <path
                      d="M27 84v-.6c0-4.5 4.05-8.25 8.85-8.25 4.95 0 9.15 4.2 9.15 8.55v.3h3V42h42c.6 4.35 4.2 7.5 8.85 7.5 4.65 0 8.25-3.15 8.85-7.5h7.8v51h-7.8c-.6-4.35-4.2-7.5-8.85-7.5-4.65 0-8.25 3.15-8.85 7.5H35.85c-4.95 0-8.7-3-8.85-9z"
                      fill="#D2D6DF"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      fill="#363A43"
                      fill-rule="nonzero"
                      d="M81 103h6v3h-6zM99 103h6v3h-6zM107 103h6v3h-6zM72 103h6v3h-6zM90 103h6v3h-6zM63 103h6v3h-6zM54 102.9h6v3h-6zM45 102.9h6v3h-6zM36 102.9h6v3h-6zM36 94h3v6h-3zM110 94h3v6h-3z"
                    ></path>
                    <path
                      d="M24 84.45c0 6.6 5.25 11.7 11.85 11.7H93v-1.5c0-3.45 2.55-6 6-6s6 2.55 6 6v1.5h13.5v-57H105v1.5c0 3.45-2.55 6-6 6s-6-2.55-6-6v-1.5H47.7c-1.05-5.7-5.85-9.9-11.7-9.9-6.75 0-12 5.4-12 12.15v43.05zM45 41.4v35.4c-3-2.7-5.55-4.35-9.15-4.35-3.6 0-7.35 1.65-8.85 4.05V41.25c0-5.1 3.9-9.15 9-9.15s9 4.2 9 9.3zM27 84v-.6c0-4.5 4.05-8.25 8.85-8.25 4.95 0 9.15 4.2 9.15 8.55v.3h3V42h42c.6 4.35 4.2 7.5 8.85 7.5 4.65 0 8.25-3.15 8.85-7.5h7.8v51h-7.8c-.6-4.35-4.2-7.5-8.85-7.5-4.65 0-8.25 3.15-8.85 7.5H35.85c-4.95 0-8.7-3-8.85-9z"
                      fill="#363A43"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      d="M45 41.4v35.4c-3-2.7-5.55-4.35-9.15-4.35-3.6 0-7.35 1.65-8.85 4.05V41.25c0-5.1 3.9-9.15 9-9.15s9 4.2 9 9.3z"
                      fill="#FFF"
                      fill-rule="nonzero"
                    ></path>
                    <path
                      fill="#363A43"
                      fill-rule="nonzero"
                      d="M97.35 70.8h3v3h-3zM97.35 64.8h3v3h-3zM97.35 76.8h3v3h-3zM97.35 58.8h3v3h-3zM97.35 52.8h3v3h-3z"
                    ></path>
                    <path
                      fill="#3A3A3A"
                      fill-rule="nonzero"
                      d="M54 58.8h37.5v3H54zM54 64.8h15v3H54z"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <p className={classes.emptyState_text}>No upcoming orders</p>
        </div>
      );
    } else if (this.state.numberOfOrders > 0) {
      orders = this.state.ticket_orders.map((order) => {
        return <OrderItem order_item={order} />;
      });
    }
    return (
      <Fragment>
        <Navigation
          scrollEffect={false}
          searchBar={true}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
          home={this.props.goToHome}
          search={this.props.search}
        />
        <div className={classes.UserProfile}>
          <div className={classes.innerWrapper}>
            <div className={classes.userDetails_wrapper}>
              <div className={classes.userDetails_background}>
                <div className={classes.userDetails_background_image}></div>
              </div>
              <div className={classes.inner_userDetails_wrapper}>
                <img
                  className={classes.profile_img}
                  src={"http://localhost:5000/" + this.props.userImage}
                />
                <div className={classes.userDetails_item_wrapper}>
                  <p className={classes.username}>{this.props.fullname}</p>
                  <div className={classes.stats_wrapper}>
                    <p className={classes.stats_items}>0 orders </p>
                    <span className={classes.seperator}>•</span>
                    <p className={classes.stats_items}>0 likes</p>
                    <span className={classes.seperator}>•</span>
                    <p className={classes.stats_items}>0 follows</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.dashboard_wrapper}>
              <div className={classes.orders_wrapper}>
                <h4 className={classes.section_header}>Orders</h4>
                <div className={classes.tableHeader}>
                  <div className={classes.tableHeader_item}>Order ID</div>
                  <div className={classes.tableHeader_item}>Created Date</div>
                  <div className={classes.tableHeader_item}>Name</div>
                  <div className={classes.tableHeader_item}>Fulfillment</div>
                  <div className={classes.tableHeader_item}>Price</div>
                  <div className={classes.tableHeader_item}>Status</div>
                </div>
                {orders}
              </div>
              <div className={classes.intrests_wrapper}>
                <div className={classes.intrests_links}>
                  <h4 className={classes.section_header}>
                    Intrests<i className="fa fa-solid fa-chevron-right"></i>
                  </h4>
                </div>
              </div>
              <div className={classes.intrests_wrapper}>
                <div className={classes.intrests_links}>
                  <h4 className={classes.section_header}>
                    Collections<i className="fa fa-solid fa-chevron-right"></i>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
export default UserProfile;
