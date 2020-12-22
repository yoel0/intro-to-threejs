/**************************************************
 * Three.js Intro * Cultivate Yakima  🪄 🧙🏼‍♂️ 🪄     *
 * ************************************************
 * What is Three.js?                              *
 * Three.js is a powerful Javascript Library for  *
 * creating 3D Graphics within the Web Browser.   *
 * Created by Ricardo Cabello aka Mr. Doob using  *
 * WebGL.                                         *
 * Link to Mr.Doobs Github(Nirvana)⬇             ❤️
 * https://github.com/mrdoob                      *
 *                                                *
 * WebGL Stands for Web Graphics Library. WebGL   *
 * is a Javascript API that allows the browser    *
 * to 'Render' 3D Graphics without the use of any *
 * plug-ins. WebGL also allows GPU (Graphics      *
 * Processing Unit) accelerated rendering.        *
 * What does this mean? it is lean, mean and one  *
 * delicious little thing.                        *
 *                                                *
 * Why should we be interested in using Three.js? *
 * In a world where technology continually grows  *
 * and embeds itself in everday life, In a world  *
 * where users are constantly seeking immersive   *
 * experiences, the onus is on us as Devs to turn *
 * dreams in to reality. I am of the opinion that *
 * the biggest illusion we've ever been fed is    *
 * that code is black and white. Code is every    *
 * single color you could ever fathom.            *
 * ************************************************
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

// Everytime we use Three.js we need to Invoke the Trinity.
// Scene - Think of this as a world.
// Camera - Think of this as a compass without it how can we navigate our world?
// Renderer - Think of this as the Oxygen to our world without it, life is Null.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	// Our Camera of choice will be 'perspective' there are 4 default cameras (refer to docs)
	// But we will go with 'perspective' as it mimics the human eye.. and that's cool.
	// This function has to take in 4 arguments:
	75, // FOV - Field of View, this defines the width of the camera perspective.
	window.innerWidth / window.innerHeight, // Aspect Ratio - if we divide width by height,
	                                        // like an 80inch flatscreen, we will be just fine.
  0.1, // Near Clipping Plane - Elements closer than this will not show up, anything behind our cameras vision will not show up. 
       // We just set this puppy to 0 or 0.1 if you are feeling Cheeky.
  1000 // Far Clipping Plane - Elements further away from this won't render,
       // ! if the value you provide is too high it will cause preformance issues.
);

const renderer = new THREE.WebGLRenderer({ antialias: true }); // Our renderer can take in an object of options (refer to docs)
                                                               // we will be using just antialias true for smoother edges 
                                                               // on our shapes.

renderer.setSize(window.innerWidth, window.innerHeight); // Here we set the size of the renderer to the size of our entire page,
                                                         // Our world is now one.
renderer.setClearColor('#121212');
document.body.appendChild(renderer.domElement); // Here we tell our world to append itself to our HTML Page.
camera.position.z = 5;

// Handle resize on window resize.
window.addEventListener('resize', () => {
	let width = window.innerWidth;
	let height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix(); // Is used for our changes to take effect.
});

// Now that set up is complete, we can finally draw in to our world and call the animation.
// But first we need to understand these 3 basic terms which will ring consistent:
// Geometry - The shape of our object made up of vertices / points and a face / plane.
// Material - What our object is made up of, think of a cupcake recipe geometry is the shape,
// Material are the ingridents sugar, flour, eggs I think? or in this case Color and how light interacts withour object. 
// Mesh - Mesh is a combo/combination of both our geometry and material it is the fully baked cupcake ready to be devoured.


// Basic Torus
var geometry = new THREE.TorusBufferGeometry(1, 0.4, 100, 100);
var material = new THREE.MeshStandardMaterial({
	color: 0xb300b3,
	flatShading: true,
	metalness: 0,
	roughness: 1,
});
var torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Wireframe TorusKnot
var geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8);
var material = new THREE.MeshBasicMaterial({
	color: '#39FF14',
	wireframe: true,
	transparent: true,
});
var wireframeTorusKnot = new THREE.Mesh(geometry, material);
scene.add(wireframeTorusKnot);

// Add Ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Add Point light
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

// This is the same as if we were to animate something in Javascript
// The only difference is we will call our renderer on every frame.
function animate() {
	requestAnimationFrame(animate);
	torus.rotation.x += 0.04;
	torus.rotation.y += 0.04;
	wireframeTorusKnot.rotation.x -= 0.01;
	wireframeTorusKnot.rotation.y -= 0.01;
	renderer.render(scene, camera);
}
animate();
