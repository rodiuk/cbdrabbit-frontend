/**
 *  Format date to dd.mm.yyyy, hh:mm
 * @param date Date
 * @returns string in format dd.mm.yyyy, hh:mm
 */
export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedYear = year < 10 ? "0" + year : year;
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return (
    formattedDay +
    "." +
    formattedMonth +
    "." +
    formattedYear +
    ", " +
    formattedHours +
    ":" +
    formattedMinutes
  );
}
