"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  getSkillsData();
}

function getSkillsData() {
  let skillPercentages = document.querySelectorAll(".percentage");
  skillPercentages.forEach(setPercentage);

  function setPercentage(skill) {
    console.log(skill);
    skill.style.setProperty("--skill-percentage", skill.dataset.percentage);
  }
}
