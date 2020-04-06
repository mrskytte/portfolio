"use strict";
import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", init);

function init() {
  prepareProjects();
}

function prepareProjects() {
  let projectContainers = document.querySelectorAll(".project");
  projectContainers.forEach(prepareScroll);
}
function prepareScroll(container) {
  let project = container.getAttribute("id");
  let scrollLength = container.scrollWidth - container.clientHeight / 2;
  let scrollDiv = document.querySelector(`#${project} .project-scroll`);
  scrollDiv.style.setProperty("--scrollHeight", scrollLength);

  activateExploreButton(project, container);
}

function activateExploreButton(project, container) {
  const button = document.querySelector(`#${project} .explore-button`);
  let counter = 0;
  button.addEventListener("click", () => {
    if (counter === 0) {
      console.log("on");
      activateScroll(container);
      changeText(button, "done exploring");
      counter++;
    } else {
      console.log("off");
      deactivateScroll(container);
      changeText(button, "explore this project");
      counter = 0;
    }
  });
}

function changeText(button, text) {
  let tl = gsap.timeline({
    onComplete: textChangeDone,
    defaults: { duration: 0.3 },
  });
  tl.to(button.lastElementChild, {
    x: -145,
    width: 140,
    backgroundColor: "rgb(247, 247, 247)",
  })
    .to(button.lastElementChild, {
      height: 17,
      y: -5,
    })
    .to(button.firstElementChild, {
      textContent: text,
    })
    .to(button.lastElementChild, {
      height: 2,
      y: 0,
    })
    .to(button.lastElementChild, {
      x: 0,
      width: "1.5rem",
      backgroundColor: "black",
    });
  function textChangeDone() {
    button.lastElementChild.removeAttribute("style");
  }
}
function deactivateScroll(container) {
  if (container.scrollTop === 0) {
    container.classList.remove("active");
    document.querySelector("main").classList.remove("noscroll");
  } else {
    container.scrollTop = 0;

    let isScrolling;
    container.addEventListener("scroll", doneScrolling);
    function doneScrolling() {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function () {
        container.classList.remove("active");
        document.querySelector("main").classList.remove("noscroll");
        container.removeEventListener("scroll", doneScrolling);
      }, 66);
    }
  }
}

function activateScroll(container) {
  document.querySelector("main").classList.add("noscroll");
  container.classList.add("active");
  container.addEventListener("scroll", () => {
    let scrollPosition = container.scrollTop;
    container.style.setProperty("--scrollPos", scrollPosition);
  });
}
// calculate width of content container

// set height of scroll container

// add eventlistener to explore button

// change explore button text

// calculate scroll percentage

// move content element to the left using translateX
