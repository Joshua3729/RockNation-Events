import React, { Component } from "react";
import HorizontalScroll from "react-scroll-horizontal";

class ScrollingHorizontally extends Component {
  render() {
    const child = { width: `30em`, height: `100%`, color: "white" };
    const parent = { width: `60em`, height: `100px`, backGroundColor: "red" };
    return (
      <div style={parent}>
        <HorizontalScroll>
          <div style={child} />
          <div style={child} />
          <div style={child} />
          <p>Hello Wolrd</p>
        </HorizontalScroll>
      </div>
    );
  }
}

export default ScrollingHorizontally;
