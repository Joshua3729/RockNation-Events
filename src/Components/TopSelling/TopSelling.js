import React, { Component } from "react";
import classes from "./TopSelling.module.css";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import LoadingModal from "../Loading Modal/LoadingModal";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Link } from "react-router-dom";
import EventCard from "../EventCard/EventCard";

class topSelling extends Component {
  state = {
    loading: false,
    artist: null,
    ArtsAndTheater: null,
    sports: null,
    //remove this when done
    artsAndTheater: [
      {
        image:
          "https://www.rockettes.com/wp-content/uploads/2019/07/site-main-image.jpg",
        name: "Rockettes ",
        events: 50,
      },
      {
        image:
          "https://4d6ab1ae1m81qn73x25fcrb1-wpengine.netdna-ssl.com/wp-content/uploads/2015/09/jimgaffiganshow-300x254.jpg",
        name: "Jim Gaffigan",
        events: 50,
      },
      {
        image:
          "https://static.billboard.com/files/2021/05/Sebastian-Maniscalco-cr-Peggy-Sirota-2021-billboard-1548-1620654112-compressed.jpg",
        name: "Sebastian Maliscasco",
        events: 50,
      },
      {
        image:
          "https://decider.com/wp-content/uploads/2019/06/jo-koy-comin-in-hot.jpg?quality=80&strip=all&w=646&h=431&crop=1",
        name: "Jo Koy",
        events: 50,
      },
      {
        image:
          "https://ntvb.tmsimg.com/assets/p8665621_b_h8_aq.jpg?w=1280&h=720",
        name: "Impractical Jokers",
        events: 50,
      },
      {
        image:
          "https://static.onecms.io/wp-content/uploads/sites/6/2020/01/martin-lawrence-2000.jpg",
        name: "Martin Lawrence",
        events: 50,
      },
      {
        image:
          "https://2l7g9kgsh281akevs49v281d-wpengine.netdna-ssl.com/wp-content/uploads/2021/08/9ad987c8-c952-4930-bf5f-9aa8eef98706_996041_TABLET_LANDSCAPE_LARGE_16_9.jpeg",
        name: "Gabriel Iglesias",
        events: 50,
      },
      {
        image:
          "https://cdn.vox-cdn.com/thumbor/kiME7VKE2PfDpmIXx0jM8sQ8YfQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22036755/1191453020.jpg",
        name: "Hassan Minhaj",
        events: 50,
      },
    ],
    Family: [
      {
        image:
          "https://media.npr.org/assets/img/2021/07/30/ap21209227085893-2f21232dfb9d6cc4892782447363097da7e3c860.jpg",
        name: "Simon Biles tour ",
        events: 50,
      },
      {
        image:
          "https://www.ustimesnow.com/wp-content/uploads/2021/06/walt-disney-world-50th-anniversary-tickets.jpg",
        name: "Disney",
        events: 50,
      },
      {
        image:
          "https://yt3.ggpht.com/ytc/AKedOLR15_nczOMdBPB3iZSFuXgwFDnfeL_UiWk5clbY=s900-c-k-c0x00ffffff-no-rj",
        name: "Rodeo show",
        events: 50,
      },
      {
        image:
          "https://www.disneyonice.com/sites/default/files/2020-09/Disney-On-Ice-presents-Dream-Big.jpg",
        name: "Disney on Ice",
        events: 50,
      },
      {
        image:
          "http://www.joytroupe.com/wp-content/uploads/2013/10/Color-Show-Logo_D30-1024x472.jpg",
        name: "Disney on Ice",
        events: 50,
      },
      {
        image:
          "https://i1.wp.com/artsvark.co.za/wp-content/uploads/2019/10/Disney-Mickey-2019-1.jpg?fit=774%2C516&ssl=1",
        name: "Mickey and Friends",
        events: 50,
      },
      {
        image:
          "https://2l7g9kgsh281akevs49v281d-wpengine.netdna-ssl.com/wp-content/uploads/2021/08/9ad987c8-c952-4930-bf5f-9aa8eef98706_996041_TABLET_LANDSCAPE_LARGE_16_9.jpeg",
        name: "Gabriel Iglesias",
        events: 50,
      },
      {
        image:
          "https://media.cntraveler.com/photos/5c7d5fd9d3d43f7c5196ea48/master/w_4000,h_2666,c_limit/Oruro,-Bolivia_GettyImages-528261974.jpg",
        name: "Hassan Minhaj",
        events: 50,
      },
    ],
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios("https://m-dab-events-default-rtdb.firebaseio.com/Data.json")
      .then((response) =>
        this.setState({ loading: false, artist: response.data })
      )
      .catch((error) => this.setState({ loading: false }));
    axios("https://m-dab-events-default-rtdb.firebaseio.com/Data.json")
      .then((response) =>
        this.setState({ loading: false, events: response.data })
      )
      .catch((error) => this.setState({ loading: false }));
    fetch("https://powerbrains-events.herokuapp.com/feed/events/artsandtheater")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch events.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          ArtsAndTheater: resData.events,
          eventsLoading: false,
        });
      })
      .catch((err) => console.log(err));
    fetch("https://powerbrains-events.herokuapp.com/feed/events/sports")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch events.");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          sports: resData.events,
          eventsLoading: false,
        });
      })
      .catch((err) => console.log(err));
    this.props.getConcerts();
  }
  render() {
    let loading = null;
    let cards = null;
    let EventsArtsAndTheater = null;
    let Sports = null;
    let EventsFamily = null;
    if (
      !this.state.loading &&
      this.props.concerts &&
      this.state.events &&
      this.state.ArtsAndTheater &&
      this.state.sports
    ) {
      console.log(this.props.concerts);
      cards = this.props.concerts.map((event, i) => {
        return (
          // <Link key={i} to={`/eventmanager/${card.name}`}>
          <EventCard event={event} />
          // </Link>
        );
      });
      EventsArtsAndTheater = this.state.ArtsAndTheater.map((event, i) => {
        if (i < 8) {
          return (
            // <Link key={i} to={`/artsandtheater/${event._id}`}>
            <EventCard key={i} event={event} />
            //</Link>
          );
        }
      });
      EventsFamily = this.state.Family.map((event, i) => {
        return <EventCard key={i} event={event} />;
      });
      Sports = this.state.sports.map((event, i) => {
        if (i < 8) {
          return (
            // <Link key={i} to={`/comedy/${event._id}`}>
            <EventCard
              img={event.banner}
              Name={event.name}
              events={event.events}
            />
            // </Link>
          );
        }
      });
    } else {
      loading = <LoadingModal />;
    }
    return (
      <Aux>
        {loading}
        <section className={classes.TopSelling}>
          <div className={classes.sectionDescription}>Top selling</div>
          <div className={classes.ConcertsWrapper}>
            <div className={classes.sectionDescription2}>Concerts</div>
            <div className={classes.grid}>{cards}</div>
          </div>
          <div className={classes.ArtsAndTheaterWrapper}>
            <div className={classes.sectionDescription2}>Sports</div>
            <div className={classes.grid}>{Sports}</div>
          </div>
          <div className={classes.ArtsAndTheaterWrapper}>
            <div className={classes.sectionDescription2}>Arts And Theater</div>
            <div className={classes.grid}>{EventsArtsAndTheater}</div>
          </div>

          <div className={classes.Family}>
            <div className={classes.sectionDescription2}>Family</div>
            <div className={classes.grid}>{EventsFamily}</div>
          </div>
        </section>
      </Aux>
    );
  }
}
export default topSelling;
