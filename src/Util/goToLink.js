export const goToLink = (
  props,
  eventName,
  id,
  type,
  venueName,
  artistName,
  event_type
) => {
  this.props.history.push({
    pathname: `/tickets/${eventName}/${id}`,
    search: `?${type}=${artistName}&venue=${venueName}&event_type=${event_type}`,
  });
};

export const hello = () => {
  alert("hello & yep");
};
