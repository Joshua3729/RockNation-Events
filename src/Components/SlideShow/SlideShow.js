import React from "react";
import classes from "./SlideShow.module.css";
import TN from "../Image/trevornoah.png";

const SlideShow = (props) => {
  const images = [
    {
      imageUrl:
        "https://media.pitchfork.com/photos/6154b21a3b9f1fd7dc4b168a/2:1/w_2560%2Cc_limit/Dave%2520Chappelle.png",
      description1: "GET TICKETS TO COMEDY SHOWS",
      description2: "FROM INTERNATIONAL COMEDIANS",
      name: "Dave Chappelle",
    },
    {
      imageUrl:
        "https://i.pinimg.com/736x/d0/4a/df/d04adf70d7c5499ab26f1eff32b0bce0.jpg",
      name: "Trevor Noah",
    },
    {
      imageUrl:
        "https://occ-0-1068-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABQ-ROQc7T66Tb-Yt8fgCB3lhmxaWdY9X4EwhH1LV5O2lKqvlFQ74H0nHDND-UihVqsJd_daCJ4myu2Vq1pEvEAAS-QJW.jpg?r=152",
      name: "Kevin Hart",
    },
    {
      imageUrl:
        "https://static01.nyt.com/images/2018/02/14/arts/14chrisrock1/merlin_118130753_6fd43ad7-143a-4123-a0d3-97491bd741e4-superJumbo.jpg",
      name: "Chris Rock",
    },
    {
      imageUrl:
        "https://i0.wp.com/media.whatsonincapetown.com/2014/08/MAX_8421_large-750x400.jpg",
      description1: "GET TICKETS TO COMEDY SHOWS",
      description2: "FROM SOUTH AFRICAN COMEDIANS",
      name: "Loyiso Gola",
    },
    {
      imageUrl:
        "https://content.computicket.com/site/mobile.computicket.com/03b2e83d-ea9e-4d6e-ac5d-c905720732fe.jpeg",
      name: "Sikhumba",
    },
  ];
  const delay = 5000;

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  let slides = props.images.map((slide, index) => (
    <div
      className={classes.slide}
      key={index}
      style={{
        background: "#373b44" /* fallback for old browsers */,
        background: `-webkit-linear-gradient(to right,${slide.color1},${slide.color2})`,
        background: `linear-gradient(to right,${slide.color1},${slide.color2})`,
      }}
    >
      <div className={classes.backDrop}></div>
      <div className={classes.imageWrapper}>
        <img src={slide.image} alt="" />
      </div>
      <div className={classes.slideDescription}>
        <h1>{slide.eventName && slide.eventName[0]}:</h1>
        <h2>{slide.eventName && slide.eventName[1]}</h2>
        <p className={classes.buyTicket}>COMING SOON</p>
      </div>
    </div>
  ));
  if (props.parent == "musicConcerts") {
    slides = props.images.map((slide, index) => (
      <div
        className={classes.slide2}
        style={{ backgroundImage: `url(${slide.img})` }}
      >
        <div className={classes.eventInfo}>
          <h2 className={classes.eventName}>Justin Beiber: Lights Tour</h2>
          <p className={classes.date}>Sun, 30 Aug 2021</p>
          <p className={classes.city}>Gauteng</p>
          <button className={classes.getTickets}>Get Tickets</button>
        </div>
      </div>
    ));
  }

  return (
    <div className={classes.slideshow}>
      <div
        className={classes.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides}
      </div>
      <div className={classes.slideshowDots}>
        {props.images.map((_, idx) => (
          <div
            key={idx}
            className={
              index === idx
                ? [classes.slideshowDotactive, classes.slideshowDot].join(" ")
                : classes.slideshowDot
            }
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
