"use strict";

window.addEventListener("load", init);

function init() {
  const links = document.querySelectorAll(".index-point a");

  links.forEach((link) => {
    link.addEventListener("touchstart", () => {
      event.target.nextElementSibling.style.webkitAnimationPlayState = "paused";
    });
    link.addEventListener("touchend", () => {
      event.target.nextElementSibling.style.webkitAnimationPlayState =
        "running";
    });
  });
}
