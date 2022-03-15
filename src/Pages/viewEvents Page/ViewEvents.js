import React, { Component, Fragment } from "react";
import classes from "./ViewEvents.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import EventInfo from "../../Components/EventInfo/EventInfo";
import { withRouter } from "react-router-dom";

class ViewEvents extends Component {
  state = {
    artistDetails: [],
  };

  componentDidMount = () => {
    const name = this.props.match?.params.name;
    fetch(
      `http://localhost:5000/feed/artist?name=${name.split(" ").join("%20")}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to search.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          artistDetails: resData,
        });
      })
      .catch((err) => console.log(err));
  };
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
            <div className={classes.bannerText}>
              <div className={classes.breadcrumbs}>
                Home / concerts/ Justin Beiber / tickets
              </div>
              <p className={classes.name}>
                {this.state.artistDetails[0]?.name} <span>Tickets</span>
              </p>
            </div>
            <div className={classes.artistWrapper}>
              <img
                className={classes.artist}
                src={this.state.artistDetails[0]?.big_img}
                alt=""
              />
            </div>
          </div>
          <div className={classes.mainContent}>{events}</div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ViewEvents);
