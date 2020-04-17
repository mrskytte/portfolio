"use strict";
import barba from "@barba/core";
import gsap from "gsap";
import { bioInit } from "./static/assets/js/bio.js";
import { projectsInit } from "./static/assets/js/projects.js";

window.addEventListener("load", () => {
  initBarba();
  begin();
});
function initBarba() {
  barba.init({
    transitions: [
      {
        leave(data) {
          console.log("leave");

          data.trigger.parentElement.parentElement
            .querySelector("li a.active")
            .classList.remove("active");

          data.trigger.classList.add("active");
          return gsap.to("ul.transition li", {
            scaleY: 1,
            transformOrigin: "left bottom",
            stagger: 0.2,
            onComplete: () => {
              data.current.container.style.display = "none";
            },
          });
        },
        enter(data) {
          console.log("enter");
          let done = this.async();
          return gsap.to("ul.transition li", {
            scaleY: 0,
            stagger: 0.2,
            onComplete: () => {
              done();
              begin();
            },
          });
        },
        once(data) {
          console.log("once");
          let done = this.async();
          return gsap.from("ul.transition li", {
            scaleY: 1,
            stagger: 0.2,
            transformOrigin: "left bottom",
            onComplete: done,
          });
        },
      },
    ],
  });
}

function begin() {
  bioInit();
  projectsInit();
}
