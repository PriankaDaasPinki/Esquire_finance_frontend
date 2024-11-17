// dateUtils.js
import { format } from 'date-fns';

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = format(date, 'dd-M-yyyy');

  return `${formattedDate} `;
};
