/**************************************************
 * Three.js Intro *  🪄 🧙🏼‍♂️ 🪄                      *
 * ************************************************/
// ! What is Three.js?
// Three.js is a powerful Javascript Library for
// creating 3D Graphics within the Web Browser.
// Created by Ricardo Cabello aka Mr. Doob using
// WebGL.
// ? Link to Mr.Doobs Github(Nirvana)⬇
// https://github.com/mrdoob
//
// WebGL Stands for Web Graphics Library. WebGL
// is a Javascript API that allows the browser
// to 'Render' 3D Graphics without the use of any
// plug-ins. WebGL also allows GPU (Graphics
// Processing Unit) accelerated rendering.
// What does this mean? it is lean, mean and one
// delicious little thing.
//
// ! Why should we be interested in using Three.js?
// In a world where technology continually grows
// and embeds itself in everday life, In a world
// where users are constantly seeking immersive
// experiences, the onus is on us as Devs to turn
// dreams in to reality. I am of the opinion that
// the biggest illusion we've ever been fed is
// that code is black and white. Code is every
// single color you could ever fathom.

/**************************************************
 * Three.js Documentation [Docs]                  *
 * ************************************************
 * https://threejs.org/docs/                      *
 * ************************************************
 * Demo Examples for Visualization                *
 * ************************************************
 * 1. https://github.com/home                     *
 * 2. http://globe.chromeexperiments.com/         *
 * 3. https://github.com/dataarts/webgl-globe     *
 * 4. https://www.m-trust.co.jp/                  *
 ****************************************************/

// ! Definitions and Set up
// Lets take a tour! to the Vasa Museum!, Niagra Falls and the Roman Colloseum!
// ? <Demo>
// Begin Lesson.
// Skybox / Cubemap = https://jonaszeitler.se/cubemap-toastmap-generator/
// ---
// Everytime we use Three.js we need to Invoke the Trinity.
// Scene - Think of this as a world.
// Camera - Think of this as a compass without it how can we navigate our world?
// Renderer - Think of this as the Oxygen to our world without it, life is Null.

// Geometry: The shape of our object made up of vertices / points and a face / plane.
// Material: What our object is made up of, think of a cupcake recipe geometry is the shape,
// material are the ingredients sugar, flour, eggs I think? or in this case color and how light interacts with our object.
// Mesh: Mesh is a combo/combination of both our geometry and material it is the fully baked cupcake ready to be devoured.

// let's begin:
let scene, camera, renderer;
function init() {
	scene = new THREE.Scene();
	// Our Camera of choice will be 'perspective' there are 4 default cameras (refer to docs)
	// But we will go with 'perspective' as it mimics the human eye.. and that's cool.
	// This function has to take in 4 parameters/arguments:
	// FOV: Field of View, this defines the width of the camera perspective.
	// Aspect Ratio: if we divide width by height, like an 80inch flatscreen, we will be just fine.
  // Near Clipping Plane: Elements closer than this will not show up, anything behind our cameras vision will not show up. 
  // Far Clipping Plane - Elements further away from this won't render,
	// ! if the value you provide for FCP is too high it will cause preformance issues.

	camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		5000
	);
	camera.position.set(0, 400, 1000);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	// Don't forget to slap our world on to the page :)
	document.body.appendChild(renderer.domElement);

	// Handle resize on window resize.
	window.addEventListener('resize', () => {
		let width = window.innerWidth;
		let height = window.innerHeight;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		// Update for our real time changes to take effect.
		camera.updateProjectionMatrix();
	});

	let controls = new THREE.OrbitControls(camera, renderer.domElement);
	// Here we remove zoom so that our world cannot be escapable.
	controls.enableZoom = false;

	let urls = [
		'./assets/vasa/posx.jpg',
		'./assets/vasa/negx.jpg',
		'./assets/vasa/posy.jpg',
		'./assets/vasa/negy.jpg',
		'./assets/vasa/posz.jpg',
		'./assets/vasa/negz.jpg',
	];

	let loader = new THREE.CubeTextureLoader();
	scene.background = loader.load(urls);

	sphereCamera = new THREE.CubeCamera(1, 1000, 500);
	sphereCamera.position.set(0, 100, 0);
	scene.add(sphereCamera);

	let sphereMaterial = new THREE.MeshBasicMaterial({
		envMap: sphereCamera.renderTarget,
	});
	let sphereGeometry = new THREE.SphereGeometry(400, 50, 50);

	let mirrorSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	mirrorSphere.position.set(0, 100, 0);
	scene.add(mirrorSphere);

	render();
}

function render() {
	renderer.render(scene, camera);
	sphereCamera.updateCubeMap(renderer, scene);
	requestAnimationFrame(render);
}

init();
