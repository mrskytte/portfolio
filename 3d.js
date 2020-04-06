var THREE = require("three");
("use strict");

window.addEventListener("DOMContentLoaded", init);

function init() {
  renderCanvas();
}

function renderCanvas() {
  let container = document.querySelector("#threed-container");
  let renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas-3d"),
    antialias: true,
  });
  renderer.setClearColor(0xfefefe);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);

  let camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    3000
  );

  let scene = new THREE.Scene();

  let light = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(light);

  light = new THREE.PointLight(0xffffff, 0.5);

  scene.add(light);

  let geometry = new THREE.BoxGeometry(100, 100, 100);
  let material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
  let mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //   const fontSettings = {
  //     size: 150,
  //     height: 30,
  //   };

  //   let loader = new THREE.FontLoader();
  //   let font = loader.parse(fontJSON);
  //   let c = new THREE.TextGeometry("c", {
  //     font: font,
  //     size: fontSettings.size,
  //     height: fontSettings.height,
  //     bevelEnabled: true,
  //     bevelThickness: 2,
  //   });
  //   let h = new THREE.TextGeometry("h", {
  //     font: font,
  //     size: fontSettings.size,
  //     height: fontSettings.height,
  //     bevelEnabled: true,
  //     bevelThickness: 2,
  //   });
  //   let r = new THREE.TextGeometry("r", {
  //     font: font,
  //     size: fontSettings.size,
  //     height: fontSettings.height,

  //     bevelEnabled: true,
  //     bevelThickness: 2,
  //   });
  //   let i = new THREE.TextGeometry("i", {
  //     font: font,
  //     size: fontSettings.size,
  //     height: fontSettings.height,
  //     bevelEnabled: true,
  //     bevelThickness: 2,
  //   });
  //   let s = new THREE.TextGeometry("s", {
  //     font: font,
  //     size: fontSettings.size,
  //     height: fontSettings.height,
  //     bevelEnabled: true,
  //     bevelThickness: 2,
  //   });

  //   let letterPosition = -300;
  //   let material = new THREE.MeshLambertMaterial({
  //     color: 0xffffff,
  //   });
  //   let cMesh = new THREE.Mesh(c, material);
  //   let hMesh = new THREE.Mesh(h, material);
  //   let rMesh = new THREE.Mesh(r, material);
  //   let iMesh = new THREE.Mesh(i, material);
  //   let sMesh = new THREE.Mesh(s, material);
  //   const name = [cMesh, hMesh, rMesh, iMesh, sMesh];
  //   name.forEach(drawLetters);
  //   function drawLetters(mesh) {
  //     mesh.position.set(letterPosition, 10, -1000);
  //     letterPosition += 150;
  //     scene.add(mesh);
  //   }

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  this.tl = new TimelineMax().delay(0.3);
  //   this.tl.to();
}
