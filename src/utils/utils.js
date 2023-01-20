export const myNewUtil = () => {
  console.log("soy un util");
}

export const formatRunTime = (minutes) => {
  const mins = Number(minutes)
  var hour = Math.floor(mins / 60);
  hour = (hour < 10)? '' + hour : hour;
  var minute = Math.floor(((mins/60)-hour)*60);
  minute = (minute < 10)? '0' + minute : minute;
  return hour + 'h' +" " + minute + "m";
}
export const formatVoteAverage = (num) => {
  return Number(num).toFixed(1)
}