import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(10))

const light = new THREE.PointLight(0xCCF6FF,100)
light.position.set(2, 4, 5)
light.castShadow = true
scene.add(light)

const light2 = new THREE.PointLight(0xCCFFE6,100)
light2.position.set(2, 4, -5)
light2.castShadow = true
scene.add(light2)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 3
camera.position.x = 2
camera.position.y = 2

const canvas = document.getElementsByTagName('canvas')[0];
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene,camera)
renderer.shadowMap.enabled = true
renderer.setClearColor(0x000000,0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enableRotate = true
controls.enableZoom = false
controls.enablePan = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

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

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  render()
}

function render() {
  renderer.render(scene, camera)
}

animate()