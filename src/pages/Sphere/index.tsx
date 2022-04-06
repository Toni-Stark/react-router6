import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Props {}

export const Sphere = (props: Partial<Props>) => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera = new THREE.PerspectiveCamera(
    90,
    sizes.width / sizes.height,
    0.1,
    20
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  let canvas: HTMLElement | undefined;
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Updata renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  useEffect(() => {
    init();
  }, []);

  const textureLoader = new THREE.TextureLoader();
  // Reserved API load  progress  error "callback"
  const grassSurfaceTexture = textureLoader.load(require('../../static/myworld/grassSurface.jpg').default)
  const doorColorTexture =  textureLoader.load(require("../../static/god/where.jpg").default);
  const doorAlphaTexture =  textureLoader.load(require("../../static/myworld/grassland.jpg").default);
  const doorAmbientOcclusionTexture =  textureLoader.load(require("../../static/myworld/grassSurface.jpg").default);
  const doorHeightTexture =  textureLoader.load(require("../../static/myworld/earth.jpg").default);
  const doorNormalTexture =  textureLoader.load(require("../../static/god/paimeng.jpg").default);
  const doorMetalnessTexture =  textureLoader.load(require("../../static/god/youla.jpeg").default);
  const doorRoughnessTexture =  textureLoader.load(require("../../static/god/where.jpg").default);
  const matcapTexture = textureLoader.load(require("../../static/god/paimeng.jpg").default);

  const init = () => {
    // 创建场景
    const scene = new THREE.Scene();
    camera.position.z = 4;
    scene.add(camera);

    // const material = new THREE.MeshBasicMaterial({
    //   map: doorNormalTexture,
    // });

    // material.color = new THREE.Color('#ff00ff');
    // material.wireframe = true;
    // material.opacity = 0.5;
    // material.transparent = true;
    // material.alphaMap = doorNormalTexture;
    // material.side = THREE.DoubleSide;

    const material = new THREE.MeshNormalMaterial();

    const sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.5, 16, 16), material
    );

    sphere.position.x = -1.5;

    console.log(sphere.geometry.attributes);

    const plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1),
      material
    );

    const torus = new THREE.Mesh(
      new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32), material
    );

    torus.position.x = 1.5

    scene.add(sphere, plane, torus);
    const clock = new THREE.Clock();
    canvas = document
      .getElementById("three-box")
      ?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, canvas);
    // controls.enabled = false;
    controls.enableDamping = true;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      sphere.rotation.y = 0.1 * elapsedTime;
      plane.rotation.y = 0.1 * elapsedTime;
      torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      plane.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;


      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  };
  return <div id="three-box" />;
};
