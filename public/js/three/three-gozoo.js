// L'élément HTML conteneur du rendu 3D

var container;

// Les composants principaux de lavue 3D

var camera, scene, renderer;
var keyboard;

// Position de la souris

var mouseX = 0, mouseY = 0;

// Constantes

var cameraFar = 10000;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var wallSideWidth = 1000;
var wallWidth = 500, wallHeigth = 600;

var clock = new THREE.Clock();

var currentImageAnimal;

function init() {
  // L'élément HTML conteneur du rendu 3D
  container = $('#container3d')

  // Le configuration du rendu
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight - 200 );

  // Ajout du rendu sur la page
  container.append( renderer.domElement );
  //document.body.appendChild( renderer.domElement );

  // Le paramètrage de la caméra
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, cameraFar );
	camera.position.z = 1000;  // z:400 unités devant le centre
  camera.position.y = 100;

  // La scène
	scene = new THREE.Scene();

  //  Mur (PlaneGeometry)

  // La confirguration générale des murs
  var texturePlane = THREE.ImageUtils.loadTexture( 'content/images/textureMur.jpg' );
  materialPlane = new THREE.MeshBasicMaterial( {map: texturePlane, side: THREE.FrontSide} ); // Le mur a une seule face

  // Paramètrage des 3 murs (en face, à droite et à gauche)

  // Le mur en face
  var geometryPlaneSide = new THREE.PlaneGeometry( wallSideWidth, wallHeigth );
  geometryPlaneSide.translate( 0, 0, 0 ); // le mur en face, derrière le centre
  var meshPlaneSide = new THREE.Mesh( geometryPlaneSide, materialPlane );
  scene.add( meshPlaneSide );

  // Le mur à droite
  var geometryPlaneRight = new THREE.PlaneGeometry( wallWidth, wallHeigth );
  geometryPlaneRight.translate( (wallWidth / 2), 0, -(wallSideWidth / 2) ); // le mur à droite du centre
  geometryPlaneRight.rotateY(-1.57);
  var meshPlaneRight = new THREE.Mesh( geometryPlaneRight, materialPlane );
  scene.add( meshPlaneRight );

  // Le mur à gauche
  var geometryPlaneLeft = new THREE.PlaneGeometry( wallWidth, wallHeigth );
  geometryPlaneLeft.translate( -(wallWidth / 2), 0, -(wallSideWidth / 2) ); // le mur à gauche du centre
  geometryPlaneLeft.rotateY(1.57);
  var meshPlaneLeft = new THREE.Mesh( geometryPlaneLeft, materialPlane );
  scene.add( meshPlaneLeft );

  // Le sol
  var textureTerrain = THREE.ImageUtils.loadTexture( 'content/images/terrain1.jpg' );
  materialTerrain = new THREE.MeshBasicMaterial( {map: textureTerrain, side: THREE.FrontSide} );
  var geometryTerrain = new THREE.PlaneGeometry( cameraFar, cameraFar );
  geometryTerrain.rotateX(-1.57);
  geometryTerrain.translate( 0, -(wallHeigth / 2), 0 ); // le mur à droite du centre
  var meshTerrain = new THREE.Mesh( geometryTerrain, materialTerrain );
  scene.add( meshTerrain );

  // Animal
  var textureImage = THREE.ImageUtils.loadTexture( 'content/images/animals/' + currentImageAnimal );
  materialImage = new THREE.MeshBasicMaterial( {map: textureImage, side: THREE.FrontSide} ); // Le mur a une seule face
  var geometryImageSide = new THREE.PlaneGeometry( wallSideWidth - 50, wallHeigth - 50 );
  geometryImageSide.translate( 0, 0, 1 ); // le mur en face, derrière le centre
  var meshImageSide = new THREE.Mesh( geometryImageSide, materialImage );
  scene.add( meshImageSide );

  // Init events
  initEvents()
}

/*
function onWindowResize() {

	camera.aspect = (window.innerWidth - 200) / (window.innerHeight - 200);
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth - 200, window.innerHeight - 200 );

}
*/

function animate() {
	requestAnimationFrame( animate );

	//meshBox.rotation.x = meshBox.rotation.x + 0.01;
	//mesh.rotation.y += 0.01;

  //meshPlaneRight.rotation.y = 180;

  //camera.rotation.x = camera.rotation.x + 0.01;
	//renderer.render( scene, camera );

  render();
}

function initEvents() {
  keyboard = new THREEx.KeyboardState(renderer.domElement);
  renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();

  // only on keydown
  keyboard.domElement.addEventListener('keydown', function(event){
  	console.log('keydown event');
    event.preventDefault();
    /*
    if( keyboard.pressed('left') ){
		    camera.position.x += 5;
		}else if( keyboard.pressed('right') ){
		    camera.position.x -= 5;
		}
    */

    if ( keyboard.eventMatches(event, 'up') ){
      if( keyboard.pressed('shift') ){
        camera.position.z -= 10;
      }
      else {
        camera.position.z -= 5;
      }

    }

    if ( keyboard.eventMatches(event, 'down') ){
      if( keyboard.pressed('shift') ){
        camera.position.z += 10;
      }
      else {
        camera.position.z += 5;
      }
    }

    /*
		if( keyboard.pressed('shift+down') ){
		    camera.position.z += 5;
		}else if( keyboard.pressed('shift+up') ){
		    camera.position.z -= 5;
		}
    */


  })

  // only on keyup
  keyboard.domElement.addEventListener('keyup', function(event){
  	console.log('keyup event');
  })

	//window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

  var text = "event.clientX : " + event.clientX + "<br>"
            +"event.clientY : "+ event.clientY + "<br>"
            +"mouseX : " + mouseX + "<br>"
            +"mouseY : "+ mouseY + "<br>";

  $('#debug').html(text);

}

function render() {

	var delta = 0.75 * clock.getDelta();

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y = THREE.Math.clamp( camera.position.y + ( - mouseY - camera.position.y ) * .05, 0, 1000 );

	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}

function start3d(image) {

  currentImageAnimal = image;

  init();
  animate();
}
