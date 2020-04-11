"use strict";
import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", init);

function init() {
  createIntersectionObserver();
  if (window.innerWidth < 600) {
    prepareProjectsSmallScreen();
  } else {
    prepareProjectsLargeScreen();
  }
}

function createIntersectionObserver() {
  let options = {
    root: document.querySelector("#bio-container"),
    threshold: [1, 0],
  };

  let observer = new IntersectionObserver(handleIntersect, options);

  let targets = document.querySelectorAll(".project");
  targets.forEach((oneTarget) => {
    observer.observe(oneTarget);
  });

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio <= 0) {
        entry.target.classList.add("out-of-view");
      } else {
        entry.target.classList.remove("out-of-view");
      }
    });
  }
}

function prepareProjectsLargeScreen() {
  let projectContainers = document.querySelectorAll(".project");
  projectContainers.forEach(prepareScroll);

  function prepareScroll(container) {
    let project = container.getAttribute("id");
    let scrollLength = container.scrollWidth - container.clientHeight / 2;
    let scrollDiv = document.querySelector(`#${project} .project-scroll`);
    scrollDiv.style.setProperty("--scrollHeight", scrollLength);

    activateExploreButton(project, container);
  }

  function activateExploreButton(project, container) {
    const button = document.querySelector(
      `#${project} .explore-button.large-screen`
    );

    let counter = 0;
    button.addEventListener("click", () => {
      if (counter === 0) {
        activateScroll(container);
        changeText(button, "done exploring");
        counter++;
      } else {
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
}

function prepareProjectsSmallScreen() {
  prepareExploreButtons();

  function prepareExploreButtons() {
    let buttons = document.querySelectorAll(".project");
    buttons.forEach((project) => {
      project
        .querySelector(".explore-button.small-screen")
        .addEventListener("click", () => activateProject(project));
    });
  }

  function activateProject(project) {
    console.log("clisk");
    let button = project.querySelector(".explore-button.small-screen");

    hideExploreButton();

    function hideExploreButton() {
      let tl = gsap.timeline({
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
          onComplete: changeDone,
        })
        .to(button, {
          opacity: 0,
          pointerEvents: "none",
        })
        .to(button.lastElementChild, {
          x: 0,
          y: 0,
          backgroundColor: "rgb(var(--font-color)",
          width: "1.5rem",
          height: 2,
        });
    }

    function changeDone() {
      project.classList.add("active");
    }
    project
      .querySelector(".return-button")
      .addEventListener("click", deactivateProject);

    function deactivateProject() {
      console.log("click");
      project
        .querySelector(".return-button")
        .removeEventListener("click", deactivateProject);
      if (project.scrollTop === 0) {
        showExploreButton();
      } else {
        project.scrollTop = 0;

        let isScrolling;
        project.addEventListener("scroll", doneScrolling);
        function doneScrolling() {
          window.clearTimeout(isScrolling);
          isScrolling = setTimeout(function () {
            showExploreButton();
          }, 66);
        }
      }
      function showExploreButton() {
        project.classList.remove("active");
        gsap.to(button, {
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          pointerEvents: "auto",
        });
      }
    }
  }
}
