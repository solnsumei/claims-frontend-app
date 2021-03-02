import moment from 'moment';


export const toDateString = (dateString) => {
  try {
    const date = moment(dateString);
    return date.format("DD MMM, YYYY");
  } catch (_) {
    return;
  }
}