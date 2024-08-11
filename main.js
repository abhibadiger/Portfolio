import gsap from 'gsap'
import './webgl/webgl-1'
import './webgl/webgl-2'
import './webgl/webgl-3'

gsap.fromTo(".top-name, .tower_image", {opacity: 0}, {opacity:1, x:0, duration: 1, ease: 'none'})