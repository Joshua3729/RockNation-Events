import React, { Component } from "react";
import ComingSoon from "../../Components/Coming Soon/ComingSoon";
import Hero from "../../Components/HeroSection/Hero";
import TopSelling from "../../Components/TopSelling/TopSelling";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Amax from "../../Components/Amax/Amax";
import ExclusiveEvents from "../../Components/ExclusiveEvents/ExclusiveEvents";
import Navigation from "../../Components/Navigation/Navigation";
import Categories from "../../Components/Categories/Categories";
// import LoadingModal from "../../Components/Loading Modal/LoadingModal";

class Home extends Component {
  state = {
    concerts: null,
  };

  getConcerts = () => {
    componentDidMount = () => {
      fetch("http://localhost:5000/feed/events/concerts")
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to fetch concerts.");
          }

          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          this.setState({
            concerts: resData.events,
            eventsLoading: false,
          });
        })
        .catch((err) => console.log(err));
    };
  };
  render() {
    return (
      <Aux>
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
        <TopSelling concerts={this.state.concerts} />
        <Amax />
        <ExclusiveEvents />
      </Aux>
    );
  }
}
export default Home;
