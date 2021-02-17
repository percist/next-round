export function timeDifference(inputTimeThen) {
  const dateThen = new Date(inputTimeThen);
  const dateNow = new Date();

  let diffInSeconds = Math.abs(dateThen - dateNow) / 1000;

  if (diffInSeconds >= 86400) {
    // calculate days
    const days = Math.floor(diffInSeconds / 86400);
    diffInSeconds -= days * 86400;

    return `${days}d`;

  } else if (diffInSeconds >= 3600) {
    // calculate hours
    const hours = Math.floor(diffInSeconds / 3600) % 24;
    diffInSeconds -= hours * 3600;

    return `${hours}h`;

  } else if (diffInSeconds >= 60) {
    // calculate minutes
    const minutes = Math.floor(diffInSeconds / 60) % 60;
    diffInSeconds -= minutes * 60;

    return `${minutes}m`

  } else return 'Just now'

}