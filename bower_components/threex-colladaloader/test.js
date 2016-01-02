/**
 * Created by ELatA on 2014/4/14.
 */

require(["three","threex-defaultworld","ColladaLoader"],function(THREE,DefaultWorld,ColladaLoader){
        var world = new DefaultWorld();
        //world.enableRotateCube = true;
        world.run();

        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load( 'assets/monster.dae', function ( collada ) {

            dae = collada.scene;
            skin = collada.skins[ 0 ];

            dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
            dae.updateMatrix();

            world.add(dae);
     /*       init();
            animate();*/

        } );

        // Grid
        var size = 14, step = 1;

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { color: 0x303030 } );

        for ( var i = - size; i <= size; i += step ) {

            geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
            geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

            geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
            geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

        }

        var line = new THREE.Line( geometry, material, THREE.LinePieces );
        world.add( line );


        // Lights
        particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
        //world.add( particleLight );
        world.add( new THREE.AmbientLight( 0xcccccc ) );
            var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
            directionalLight.position.x = Math.random() - 0.5;
            directionalLight.position.y = Math.random() - 0.5;
            directionalLight.position.z = Math.random() - 0.5;
            directionalLight.position.normalize();
        world.add( directionalLight );

            pointLight = new THREE.PointLight( 0xffffff, 4 );
            pointLight.position = particleLight.position;
        world.add( pointLight );


})