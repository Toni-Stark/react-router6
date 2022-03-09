import React, { useEffect } from "react";
import * as THREE from "three";
import styles from "./index.module.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Props {}

export const ColorScreen = (props: Partial<Props>) => {
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

  // const image = new Image();
  // const texture = new THREE.Texture(image);
  //
  // image.onload = () => {
  //   texture.needsUpdate = true
  // }
  //
  // image.src = require('../../static/myworld/grassland.jpg').default;

  // const loadingManager = new THREE.LoadingManager();
  //
  // loadingManager.onStart = () => {
  //   console.log("onStart");
  // };
  // loadingManager.onLoad = () => {
  //   console.log("onLoaded");
  // };
  // loadingManager.onProgress = () => {
  //   console.log("onProgress");
  // };
  // loadingManager
  const textureLoader = new THREE.TextureLoader();
  // Reserved API load  progress  error "callback"
  const grassSurfaceTexture = textureLoader.load(require('../../static/myworld/grassSurface.jpg').default)
  const grasslandLeftTexture = textureLoader.load(require('../../static/myworld/grassland.jpg').default)
  const grasslandRightTexture = textureLoader.load(require('../../static/myworld/grassland.jpg').default)
  const grasslandBeforeTexture = textureLoader.load(require('../../static/myworld/grassland.jpg').default)
  const grasslandAfterTexture = textureLoader.load(require('../../static/myworld/grassland.jpg').default)
  const earthTexture = textureLoader.load(require('../../static/myworld/earth.jpg').default)

  // grassSurfaceTexture.repeat.x = 8;
  // grassSurfaceTexture.repeat.y = 8;

  // grassSurfaceTexture.wrapS = THREE.MirroredRepeatWrapping;
  // grassSurfaceTexture.wrapT = THREE.MirroredRepeatWrapping;

  // grassSurfaceTexture.offset.x = 0.5;
  // grassSurfaceTexture.offset.y = 0.5;

  // grassSurfaceTexture.rotation = Math.PI / 4;
  // grassSurfaceTexture.center.x = 0.5;
  // grassSurfaceTexture.center.y = 0.5;

  // grassSurfaceTexture.minFilter = THREE.NearestFilter;
  grassSurfaceTexture.magFilter = THREE.NearestFilter;

  const init = () => {
        // 创建场景
    const scene = new THREE.Scene();
    camera.position.z = 4;
    scene.add(camera);

    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial({
      map: grassSurfaceTexture,
      // wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.lookAt(mesh.position);
    const clock = new THREE.Clock();
    canvas = document
      .getElementById("three-box")
      ?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, canvas);
    // controls.enabled = false;
    controls.enableDamping = true;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  };
  return <div id="three-box" className={styles.colorScreen} />;
};
