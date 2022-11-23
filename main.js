//오늘 날짜.
export const date = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
}); //"Tuesday, Nov 22, 2022"
const today = window.querySelector(".date");
today.innertext = date;
