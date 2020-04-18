"use strict";

window.addEventListener("load", init);

function init() {
  createIntersectionObserver();
}

function createIntersectionObserver() {
  let options = {
    root: document.querySelector("#bio-container"),
    threshold: [1],
  };

  let skillsObserver = new IntersectionObserver(handleIntersect, options);

  let targets = document.querySelectorAll(".skills-list .skill");
  targets.forEach((oneTarget) => {
    skillsObserver.observe(oneTarget);
  });

  function handleIntersect(entries, observer) {
    console.log(entries[0].intersectionRatio);
    if (entries[0].intersectionRatio <= 0) {
      console.log("outside");
      entries.forEach((entry) => {
        let skill = entry.target.children[1];
        setPercentage(skill, "0%");
      });
    } else {
      console.log("inside");
      entries.forEach((entry) => {
        let skill = entry.target.children[1];
        setPercentage(skill, skill.dataset.percentage);
      });
    }
  }
}

function setPercentage(skill, percentage) {
  console.log("called");
  skill.style.setProperty("--skill-percentage", percentage);
}
