import React, { Component } from "react";
import classes from "./SearchSuggestions.module.css";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import VenueInfo from "../VenueInfo/VenueInfo";

const searchSuggestion = (props) => {
  let searchSuggestion_items = null;
  let artists = null;
  let venues = null;
  let events = null;

  if (props.searchSuggestionData && props.showRecentlyViewed) {
    searchSuggestion_items = props.searchSuggestionData.map((entity, i) => {
      let searchSuggestion_item = null;
      if (entity.type == "artist")
        searchSuggestion_item = (
          <ArtistInfo
            key={i}
            event={entity}
            viewEntity={props.viewEntity}
            searchSuggestion={true}
          />
        );
      else
        searchSuggestion_item = (
          <VenueInfo
            key={i}
            event={entity}
            viewEntity={props.viewEntity}
            searchSuggestion={true}
          />
        );
      return searchSuggestion_item;
    });
  }
  if (
    this.state.resultsLengthArtists != null &&
    this.state.resultsLengthEvents != null &&
    this.state.resultsLengthVenues != null
  ) {
    artists = searchSuggestion_items = (
      <div className={classes.searchSuggestion_items}>
        <div className={classes.searchSuggestion_item}>
          <p className={classes.header2}>Events</p>
          {events}
        </div>
        <div className={classes.searchSuggestion_item}>
          <p className={classes.header2}>Events</p>
          {artists}
        </div>
        <div className={classes.searchSuggestion_item}>
          <p className={classes.header2}>Events</p>
          {venues}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.searchSuggestion}>
      <h3 className={classes.header}>Recently viewed</h3>
      {searchSuggestion_items}
    </div>
  );
};

export default searchSuggestion;
