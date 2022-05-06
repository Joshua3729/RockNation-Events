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
          <div className={classes.userDetails_wrapper}>
            <img className={classes.profile_img} src={this.props.userImage} />
            <h4 className={classes.username}>{this.props.fullname}</h4>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
export default UserProfile;
