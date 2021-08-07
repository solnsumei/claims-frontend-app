import moment from 'moment';


export const toDateString = (dateString) => {
  try {
    const date = moment(dateString);
    return date.format("DD MMM, YYYY");
  } catch (_) {
    return;
  }
}

export const toDateTimeString = (dateString) => {
  try {
    const date = moment(dateString);
    return date.format("DD MMM, YYYY, hh:mm a");
  } catch (_) {
    return;
  }
}

export const toServerDate = (dateString) => {
  try {
    const date = moment(dateString);
    return date.format("YYYY-MM-DD");;
  } catch (_) {
    return;
  }
}


export const minDate = () => {
  return moment().subtract(2, 'years').format();
}

export const maxDate = () => {
  return moment().add(2, 'years').format();
}

export const defaultDateValue = () => {
  return moment().format("YYYY-MM-DD");
}

export const startOfMonthValue = () => moment().startOf('month').format('YYYY-MM-DD');
