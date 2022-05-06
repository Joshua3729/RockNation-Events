import React, { Component, Fragment } from "react";
import classes from "./UserProfile.module.css";
import Navigation from "../../Components/Navigation/Navigation";

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
          <h1>User Profile</h1>
        </div>
      </Fragment>
    );
  }
}
export default UserProfile;
