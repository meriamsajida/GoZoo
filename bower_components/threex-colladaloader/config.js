require.config({
  shim: {
    three: {
      exports: "THREE"
    },
    "threex-controls": {
      deps: [
        "three"
      ]
    },
    "ColladaLoader":{
        deps:[
            "three"
        ]
    }
  },
  paths: {
    three: "bower_components/three.js/three.min",
    ColladaLoader:"ColladaLoader",
    requirejs: "bower_components/requirejs/require",
    "threex-controls": "bower_components/threex-controls/controls/OrbitControls",
    "threejs-stats": "bower_components/threejs-stats/Stats",
    "threex-defaultworld": "bower_components/threex-defaultworld/defaultworld"
  }
});
