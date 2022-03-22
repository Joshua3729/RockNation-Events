import React, { Component } from "react";
import classes from "./SearchSuggestions.module.css";
import ArtistInfo from "../ArtistInfo/ArtistInfo";

class SearchSuggestion extends Component {
  render() {
    return (
      <div className={classes.searchSuggestion}>
        <h3>Recently viewed</h3>
      </div>
    );
  }
}

export default SearchSuggestion;
