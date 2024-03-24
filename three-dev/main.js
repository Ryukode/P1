import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

// load a texture, set wrap mode to repeat 
const loader = new THREE.TextureLoader()

const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const sunTexture = loader.load( "sun.jpg" )
const material = new THREE.MeshPhongMaterial( { map: sunTexture} )
const sun = new THREE.Mesh( geometry, material )
scene.add( sun )

const geometry2 = new THREE.SphereGeometry()
const earthTexture = loader.load( "earth.jpg" )
const material2 = new THREE.MeshPhongMaterial( { map: earthTexture} )
const earth = new THREE.Mesh( geometry2, material2 )
earth.position.set(4, 0, 0)
scene.add( earth )

const geometry3 = new THREE.SphereGeometry(0.2)
const moonTexture = new THREE.TextureLoader().load( "moon.jpg" )
const material3 = new THREE.MeshPhongMaterial( { map: moonTexture} )
const moon = new THREE.Mesh( geometry3, material3 )
moon.position.set(6, 0, 0)
scene.add( moon )

const axesHelper = new THREE.AxesHelper( 5 )
scene.add( axesHelper )

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 )
scene.add(directionalLight)
const light = new THREE.AmbientLight( 0x404040 )
scene.add( light )

camera.position.set(2, 2, 10)
camera.lookAt(new THREE.Vector3(0, 0, 0))

const controls = new OrbitControls( camera, renderer.domElement )

const list = [sun, earth, moon]

sun.attach(earth)

earth.attach(moon)

function animate() {
	requestAnimationFrame( animate )

    list.forEach(element => {
        element.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.01)
    })

	renderer.render( scene, camera )
}
animate()