import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.ConeGeometry(0.25, 1, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const cyrusTexture = new THREE.TextureLoader().load('cyrus.jpeg');

const cyrus = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cyrusTexture }));

scene.add(cyrus);

// Sun

const sunTexture = new THREE.TextureLoader().load('sun.png');
const normTexture = new THREE.TextureLoader().load('normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(4.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normTexture,
  })
);

scene.add(sun);

// Earth

const moonTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 20;
earth.position.setX(-10);

sun.position.z = 30;
sun.position.setX(-10);

cyrus.position.z = -5;
cyrus.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.005;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.005;

  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  cyrus.rotation.y += 0.01;
  cyrus.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sun.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
