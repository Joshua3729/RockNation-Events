import React, { Component } from "react";
import classes from "./SearchSuggestions.module.css";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import VenueInfo from "../VenueInfo/VenueInfo";
import EventInfo from "../EventInfo/EventInfo";
import Spinner from "../UI/Spinner/Spinner";

const searchSuggestion = (props) => {
  let searchSuggestion_items = (
    <div className={classes.spinnerWrapper}>
      <Spinner />
    </div>
  );
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
    props.resultsLengthArtists != null &&
    props.resultsLengthEvents != null &&
    props.resultsLengthVenues != null
  ) {
    events =
      props.searchresultEvents.length > 0 ? (
        props.searchresultEvents.map((event, i) => {
          return (
            <EventInfo
              key={i}
              event={event}
              viewEntity={props.viewEntity}
              searchSuggestion={true}
            />
          );
        })
      ) : (
        <div className={classes.empty}>Not Found</div>
      );
    artists =
      props.searchresultArtists.length > 0 ? (
        props.searchresultArtists.map((event, i) => {
          return (
            <ArtistInfo
              key={i}
              event={event}
              viewEntity={props.viewEntity}
              searchSuggestion={true}
            />
          );
        })
      ) : (
        <div className={classes.empty}>Not Found</div>
      );
    venues =
      props.searchresultVenues.length > 0 ? (
        props.searchresultVenues.map((event, i) => {
          return (
            <VenueInfo
              key={i}
              event={event}
              viewEntity={props.viewEntity}
              searchSuggestion={true}
            />
          );
        })
      ) : (
        <div className={classes.empty}>Not Found</div>
      );
    searchSuggestion_items = (
      <div className={classes.searchSuggestion_items}>
        <div className={classes.searchSuggestion_item}>
          <p className={classes.header2}>Events</p>
          {events}
        </div>
        <div className={classes.searchSuggestion_item}>
          <p className={classes.header2}>Artists</p>
          {artists}
        </div>
        <div className={classes.searchSuggestion_item}>
          <p className={classes.header2}>venues</p>
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
