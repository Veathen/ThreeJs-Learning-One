import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { CubeReflectionMapping } from "three";

//Load envMap
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/DivotNormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const sphereGeometry = new THREE.SphereBufferGeometry(0.2, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0xff0000);
material.roughness = 0.2;
material.wireframe = false;
material.metalness = 0.8;
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1, 10);

pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

const skylight = new THREE.RectAreaLight(0xff0000, 0.5, 5, 9);
skylight.position.x = -5.2;
skylight.position.y = 2.3;
skylight.position.z = 6.2;
skylight.intensity = 3.56;
skylight.width = 2.6;
skylight.height = 1.5;

scene.add(pointLight);
scene.add(skylight);

const skylightF = gui.addFolder("red skylight");

skylightF.add(skylight.position, "x").min(-5).max(10);
skylightF.add(skylight.position, "y").min(-6).max(10);
skylightF.add(skylight.position, "z").min(-5).max(10);
skylightF.add(skylight, "width").min(0).max(20);
skylightF.add(skylight, "height").min(0).max(20);
skylightF.add(skylight, "intensity").min(0).max(10);

const pointLight2 = new THREE.PointLight(0x300af0, 7.24, 5, 9);
pointLight2.position.set(-1, -1, 0);

const pointLight2F = gui.addFolder("pointlight");

pointLight2F.add(pointLight2.position, "x").min(-5).max(10);
pointLight2F.add(pointLight2.position, "y").min(-6).max(10);
pointLight2F.add(pointLight2.position, "z").min(-5).max(10);
pointLight2F.add(pointLight2, "intensity").min(0).max(10);

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.4);
scene.add(pointLightHelper);
scene.add(pointLight2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.x = 0.2 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
