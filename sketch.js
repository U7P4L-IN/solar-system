// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: 'A4',
  // dimensions: [,12],
  // pixelsPerInch: 70,
  // scaleToView: true,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
  camera.position.set(21, 2, -100);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  const ringGeometry = new THREE.RingGeometry(0.5, 0.7, 64);

  const loader = new THREE.TextureLoader();
  const textureEarth = loader.load('earth.jpg');
  const moonTexture = loader.load('moon.jpg');
  const sunTexture = loader.load('sun.jpg');
  const marsTexture = loader.load('mars.jpg');
  const jupiterTexture = loader.load('jupiter.jpg');
  const mercuryTexture = loader.load('mercury.jpg');
  const venusTexture = loader.load('venus.jpg');
  const saturnTexture = loader.load('saturn.jpg');
  const saturnRingTexture = loader.load('saturn_ring.png');

  const milkywayTexture = loader.load('milky_way.jpg');
  // milkywayTexture.wrapS = milkywayTexture.wrapT = THREE.RepeatWrapping;
  // milkywayTexture.repeat.set(1, 3);

  scene.background = milkywayTexture;

  // Setup a material
  const earthMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: textureEarth,
  });
  const earthGroup = new THREE.Group();

  const moonMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture,
  });
  const moonGroup = new THREE.Group();

  const sunMaterial = new THREE.MeshBasicMaterial({
    roughness: 1,
    metalness: 0,
    map: sunTexture,
  });
  const mercuryMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: mercuryTexture,
  });
  const mercuryGroup = new THREE.Group();

  const venusMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: venusTexture,
  });
  const venusGroup = new THREE.Group();

  const marsMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: marsTexture,
  });
  const marsGroup = new THREE.Group();

  const jupiterMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: jupiterTexture,
  });
  const jupiterGroup = new THREE.Group();

  const saturnMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: saturnTexture,
  });

  const saturnGroup = new THREE.Group();

  saturnRingTexture.wrapS = saturnRingTexture.wrapT = THREE.RepeatWrapping;
  saturnRingTexture.repeat.set(4, 3);
  const saturnRingMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: saturnRingTexture,
  });
  const saturnRingGroup = new THREE.Group();

  // Setup a mesh with geometry + material
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  earthMesh.position.set(35, 1, 0);
  earthGroup.add(earthMesh);
  // scene.add(earthMesh);

  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(1.4, 0.4, 0);
  moonMesh.scale.setScalar(0.25);
  moonGroup.add(moonMesh);
  earthMesh.add(moonGroup);

  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  marsMesh.position.set(49, 1.2, 0);
  marsGroup.add(marsMesh);

  const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  mercuryMesh.scale.setScalar(0.5);
  mercuryMesh.position.set(14, 1.2, 0);
  mercuryGroup.add(mercuryMesh);

  const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  venusMesh.position.set(26, 1.2, 0);
  venusGroup.add(venusMesh);

  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  jupiterMesh.position.set(70, -1, 0);
  jupiterMesh.scale.setScalar(3.5);
  jupiterGroup.add(jupiterMesh);

  const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
  saturnMesh.position.set(91, -1, 0);
  saturnMesh.scale.setScalar(2.8);
  saturnGroup.add(saturnMesh);

  const saturnRingMesh = new THREE.Mesh(ringGeometry, saturnRingMaterial);
  saturnRingMesh.material.side = THREE.DoubleSide;
  saturnRingMesh.position.set(0, 0, 0);
  saturnRingMesh.scale.setScalar(2.8);
  saturnRingMesh.rotation.x = Math.PI / 3;
  saturnRingGroup.add(saturnRingMesh);
  saturnMesh.add(saturnRingGroup);

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(7);

  scene.add(sunMesh);
  scene.add(earthGroup);
  scene.add(marsGroup);
  scene.add(jupiterGroup);
  scene.add(venusGroup);
  scene.add(mercuryGroup);
  // scene.add(saturnGroup);

  const light = new THREE.PointLight('white', 1);
  light.position.set(0, 0, 0);
  scene.add(light);

  // scene.add(new THREE.GridHelper(5, 50));
  // scene.add(new THREE.PointLightHelper(light, 0.1));

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      earthMesh.rotation.y = time * 0.7;
      earthGroup.rotation.y = time * 0.1;
      moonMesh.rotation.y = time * 0.2;
      moonGroup.rotation.y = time * 0.7;
      marsMesh.rotation.y = time * 0.4;
      marsGroup.rotation.y = time * 0.07;
      jupiterMesh.rotation.y = time * 0.7;
      jupiterGroup.rotation.y = time * 0.03;
      saturnMesh.rotation.y = time * 0.3;
      saturnGroup.rotation.y = time * 0.01;
      venusMesh.rotation.y = -time * 0.02;
      venusGroup.rotation.y = time * 0.15;
      mercuryMesh.rotation.y = time * 0.3;
      mercuryGroup.rotation.y = time * 0.4;
      sunMesh.rotation.y = time * 0.1;

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
