import React, { Component, Fragment } from "react";
import ComingSoon from "../../Components/Coming Soon/ComingSoon";
import Hero from "../../Components/HeroSection/Hero";
import TopSelling from "../../Components/TopSelling/TopSelling";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Amax from "../../Components/Amax/Amax";
import ExclusiveEvents from "../../Components/ExclusiveEvents/ExclusiveEvents";
import Navigation from "../../Components/Navigation/Navigation";
import Categories from "../../Components/Categories/Categories";
import LoadingModal from "../../Components/Loading Modal/LoadingModal";
import classes from "./Home.module.css";

class Home extends Component {
  state = {
    family: null,
    familyLoading: true,
    concerts: null,
    sports: null,
    artsandtheater: null,
    concertsLoading: true,
    sportsLoading: true,
    artsAndTheaterLoading: true,
  };
  componentDidMount() {
    fetch("http://localhost:5000/feed/events/concerts")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch concerts.");
        }

        return res.json();
      })
      .then((resData) => {
        this.setState({
          concerts: resData.events,
          concertsLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ concertsLoading: false });
        console.log(err);
      });

    fetch("http://localhost:5000/feed/events/sports")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch events.");
        }

        return res.json();
      })
      .then((resData) => {
        this.setState({
          sports: resData.events,
          sportsLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ sportsLoading: false });
        console.log(err);
      });

    fetch("http://localhost:5000/feed/events/artsandtheater")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch events.");
        }

        return res.json();
      })
      .then((resData) => {
        this.setState({
          artsandtheater: resData.events,
          artsAndTheaterLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ artsAndTheaterLoading: false });
        console.log(err);
      });
    fetch("http://localhost:5000/feed/events/family")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch family.");
        }

        return res.json();
      })
      .then((resData) => {
        this.setState({
          family: resData.events,
          familyLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ familyLoading: false });
        console.log(err);
      });
  }
  render() {
    const loading =
      this.state.artsAndTheaterLoading ||
      this.state.concertsLoading ||
      this.state.sportsLoading ||
      this.state.familyLoading;
    let page = <LoadingModal />;
    if (!loading)
      page = (
        <Fragment>
          <Navigation
            scrollEffect={true}
            searchBar={false}
            isAuth={this.props.isAuth}
            logout={this.props.logout}
            login={this.props.loginModal}
            fullname={this.props.fullname}
            userImage={this.props.userImage}
            search={this.props.search}
            home={this.props.goToHome}
          />
          <Hero />
          <ComingSoon />
          <Categories />
          <TopSelling
            concerts={this.state.concerts}
            sports={this.state.sports}
            artsandtheater={this.state.artsandtheater}
            family={this.state.family}
          />
          <Amax />
          <ExclusiveEvents />
        </Fragment>
      );
    return page;
  }
}
export default Home;
