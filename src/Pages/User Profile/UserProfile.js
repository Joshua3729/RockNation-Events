import React, { Component, Fragment } from "react";
import classes from "./UserProfile.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";

class UserProfile extends Component {
  render() {
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
        </div>
        <Footer />
      </Fragment>
    );
  }
}
export default UserProfile;
