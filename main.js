import gsap from 'gsap'
import './webgl/webgl-1'
import './webgl/webgl-2'
import './webgl/webgl-3'

gsap.fromTo(".first-box ", {opacity: 0}, {opacity:1, x:0, duration: 1, ease: 'elastic.in'})