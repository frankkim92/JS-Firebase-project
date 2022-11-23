let date = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
}); //"Tuesday, Nov 22, 2022"
console.log(date);
const a = document.querySelector(".date");
a.innerHTML = date;
