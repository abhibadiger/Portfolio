import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const canvas = document.getElementsByClassName('lamp_canvas')[0];
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5

// Lights
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
  '3.fbx',
  (object) => {
    object.scale.set(.25, .25, .25)
    object.position.set(0, -2, 0)
    scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

// Model
const material = new THREE.MeshPhysicalMaterial({ color: 0x007571, roughness: 0.4, metalness: 0.6, reflectivity: 1})
fbxLoader.load(
  '3.fbx',
  (object) => {
    object.scale.set(.25, .25, .25)
    object.position.set(-3, -2, 0)
    object.children[2].material = material
    object.traverse(function (child) {
      if ((child).isMesh) {
        (child).material = material
      }
    })
    scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

// WIREFRAME
const wire_material = new THREE.MeshPhongMaterial({color: 0xA7A7A7,wireframe: true})
fbxLoader.load(
  '3.fbx',
  (object) => {
    object.scale.set(.25, .25, .25)
    object.position.set(3, -2, 0)
    object.children[2].material = wire_material
    object.traverse(function (child) {
      if ((child).isMesh) {
        (child).material = wire_material
      }
    })
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