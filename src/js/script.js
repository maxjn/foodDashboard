// *====================== Nav Menu Toggle =========================
const menu = document.querySelector(".dashboard__menu");
const icon = document.querySelector(".dashboard__icon");

icon.addEventListener("click", () => {
  menu.classList.toggle("active");
});
