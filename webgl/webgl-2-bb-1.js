import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Standard_Camera } from "./camera/Custom_Camera";

const canvas = document.getElementsByClassName('drum_canvas_1')[0];
const scene = new THREE.Scene()
const camera = Standard_Camera(canvas, 0, 0, 5);

// Lights
const spotLight1 = new THREE.SpotLight(0xffffff, 100);
spotLight1.position.set(0, 0, 7)
scene.add(spotLight1)

const spotLight2 = new THREE.SpotLight(0xffffff, 100);
spotLight2.position.set(0, 0, -7);
scene.add(spotLight2)

const spotLight3 = new THREE.SpotLight(0xffffff, 40);
spotLight3.position.set(0, 5, 0);
scene.add(spotLight3);

const spotLight4 = new THREE.SpotLight(0xffffff, 40);
spotLight4.position.set(0, -5, 0);
scene.add(spotLight4);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
renderer.render(scene, camera)
renderer.shadowMap.enabled = true
renderer.setClearColor(0xffffff, 0)
canvas.appendChild(renderer.domElement)

// Re-Size event handler
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  camera.aspect = canvas.clientWidth / canvas.clientHeight
  camera.updateProjectionMatrix();
  render()
}


// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableRotate = true
controls.enableZoom = false
controls.enablePan = false


// FBXLoader 
const fbxLoader = new FBXLoader()
fbxLoader.load(
  'bb.fbx',
  (object) => {
    object.scale.set(.4, .4, .4)
    object.position.set(-4, -2, 0)
    scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

function render() {
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  render()
}
animate()