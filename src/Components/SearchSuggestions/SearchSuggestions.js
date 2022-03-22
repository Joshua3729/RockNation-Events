import React, { Component } from "react";
import classes from "./SearchSuggestions.module.css";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import VenueInfo from "../VenueInfo/VenueInfo";

const searchSuggestion = (props) => {
  let searchSuggestion_items = null;
  if (props.searchSuggestionData) {
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
  return (
    <div className={classes.searchSuggestion}>
      <h3>Recently viewed</h3>
      {searchSuggestion_items}
    </div>
  );
};

export default searchSuggestion;
