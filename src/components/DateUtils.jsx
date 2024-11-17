// dateUtils.js
import { format } from 'date-fns';
 
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
 
  const formattedDate = format(date, 'dd-M-yyyy');
 
  const hours = date.getHours();
  const minutes = date.getMinutes();
 
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
 
  const formattedTime = `${formattedHours}:${minutes} ${amOrPm}`;
 
  return `${formattedDate} | ${formattedTime}`;
};