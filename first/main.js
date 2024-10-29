import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30,30);
orbit.update();

// Create axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Create a Plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// Add GridHelper
const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

// Create a sphere
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 , wireframe: true});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(10, 5, 10);
sphere.castShadow = true;
scene.add(sphere);

// Create a dat.gui
const gui = new dat.GUI();
const options = {
	color: '#ffff00',
	wireframe: true,
	speed: 0.01
};

// Add options to dat.gui
gui.addColor(options, 'color').onChange((value) => {
	sphereMaterial.color.set(value);
});

gui.add(options, 'wireframe').onChange((value) => {
	sphereMaterial.wireframe = value;
});

gui.add(options, 'speed', 0, 0.1);

// Create a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 20, 0);
scene.add(light);
light.castShadow = true;
gui.add(light, 'intensity', 0, 1);

// add a directional light helper
const lightHelper = new THREE.DirectionalLightHelper(light);
scene.add(lightHelper);

// lightshadowhelper
const dlightShadowHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(dlightShadowHelper);
light.shadow.camera.bottom = -12;

// Create a ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity', 0, 1);

const loader = new GLTFLoader();

loader.load( 'computer/scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
});

let step = 0;
// animation loop
function animate(time) {
	cube.rotation.x = time / 2000;
	cube.rotation.y = time / 1000;
	sphere.rotation.x = time / 2000;
	sphere.rotation.y = time / 1000;

	step += options.speed;
	sphere.position.x = 10 * Math.cos(step);
	sphere.position.z = 10 * Math.sin(step);
	sphere.position.y = 5 + 5 * Math.sin(step);

	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);