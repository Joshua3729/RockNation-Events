import React, { Component, Fragment } from "react";
import classes from "./Sell.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import Footer from "../../Components/Footer/Footer";

class SellPage extends Component {
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
        <div className={classes.SellPage}></div>
        <Footer />
      </Fragment>
    );
  }
}
export default SellPage;
