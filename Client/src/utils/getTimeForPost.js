const getTimeForPost = (datePosted) => {
  const date = new Date(datePosted);
  const dateInMilliseconds = date.getTime();
  const currentTime = Date.now();
  const timeDiff = Math.round((currentTime - dateInMilliseconds)/(1000*60));
  let time = "1s";
  let postedTime = "";

  if (timeDiff < 60) {
    time = Math.round(timeDiff) + "m";
  }
  else if (timeDiff < 60*24) {
    time = Math.round(timeDiff/60) + "h";
  }
  else if (timeDiff < 60*24*7) {
    time = Math.round(timeDiff/(60*24)) + "d";
  }
  else {
    let day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    if (day && month && year) postedTime = day + " " + month + " " + year;
    else postedTime = " ";
  }

  const timeForOwnerInfo = postedTime ? undefined : time;
  const timeForReactBox = postedTime ? postedTime : undefined;
  return {timeForOwnerInfo, timeForReactBox};
}

export { getTimeForPost };