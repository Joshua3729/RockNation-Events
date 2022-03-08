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

class Home extends Component {
  state = {
    concerts: null,
    sports: null,
    artsandtheater: null,
    concertsLoading: true,
    sportsLoading: true,
    artsAndTheaterLoading: true,
  };
  getConcerts = () => {
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
  };
  getSports = () => {
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
  };
  getArtsAndTheater = () => {
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
  };
  render() {
    const loading =
      this.state.artsAndTheaterLoading ||
      this.state.concertsLoading ||
      this.state.sportsLoading;
    return (
      <Fragment>
        {loading && <LoadingModal />}
        <Navigation
          scrollEffect={true}
          searchBar={false}
          isAuth={this.props.isAuth}
          logout={this.props.logout}
          login={this.props.loginModal}
          fullname={this.props.fullname}
          userImage={this.props.userImage}
        />
        <Hero />
        <ComingSoon />
        <Categories />
        <TopSelling
          concerts={this.state.concerts}
          getConcerts={this.state.getConcerts}
          sports={this.state.sports}
          getSports={this.state.getSports}
          artsandtheater={this.state.artsandtheater}
          getArtsAndTheater={this.state.getArtsAndTheater}
        />
        <Amax />
        <ExclusiveEvents />)
      </Fragment>
    );
  }
}
export default Home;
