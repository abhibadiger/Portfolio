import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import "./style.css"

const canvas = document.getElementsByClassName('gun_canvas')[0];
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = -6

// Lights
const spotLight1 = new THREE.SpotLight(0xffffff, 100);
spotLight1.castShadow = true
spotLight1.position.set(0, -2, 7)
scene.add(spotLight1)

const spotLight2 = new THREE.SpotLight(0xffffff, 100);
spotLight2.castShadow = true
spotLight2.position.set(0, 2, -7);
scene.add(spotLight2)


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
  'mar1.fbx',
  (object) => {
    object.scale.set(.5, .5, .5)
    object.position.set(-2, -1.5, 0)
    object.rotateY(2 * Math.PI)
    object.rotateY(1)
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