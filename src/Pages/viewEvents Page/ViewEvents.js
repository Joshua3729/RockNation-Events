import React, { Component, Fragment } from "react";
import classes from "./ViewEvents.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import { withRouter } from "react-router-dom";

class ViewEvents extends Component {
  state = {};

  componentDidMount = () => {};
  render() {
    return (
      <Fragment>
        <Navigation
          scrollEffect={true}
          searchBar={true}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
          home={this.props.goToHome}
          search={this.props.search}
        />
        <section className={classes.ViewEvents}>
          <div className={classes.banner}>
            <img
              className={classes.artist}
              src="https://media.gq.com/photos/606f6dcf3a4bbf3820d3a7d6/16:9/w_1999,h_1124,c_limit/justin-bieber-cover-gq-may-2021-01.jpg"
              alt=""
            />
          </div>
          <div className={classes.mainContent}></div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ViewEvents);
