import moment from 'moment';


export const toDateString = (dateString) => {
  try {
    const date = moment(dateString);
    return date.format("DD MMM, YYYY");
  } catch (_) {
    return;
  }
}


export const minDate = () => {
  return moment().add(3, 'days').format();
}

export const defaultDateValue = () => {
  return moment().format("YYYY-MM-DD");
}
