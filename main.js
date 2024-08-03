import * as THREE from 'three'
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import "./style.css"

const canvas = document.getElementById('webgl');
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 4

// Lights
const light = new THREE.PointLight(0xFFFFFF,100)
light.position.set(0, 3, 5)
light.castShadow = true
scene.add(light)

const light2 = new THREE.PointLight(0xFFA6A6,100)
light2.position.set(0, 3, -5)
light2.castShadow = true
scene.add(light2)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance"})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
renderer.render(scene,camera)
renderer.shadowMap.enabled = true
renderer.setClearColor(0xffffff,0)
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
const controls = new ArcballControls(camera, renderer.domElement)
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
        object.position.set(0,-2, 0)
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


