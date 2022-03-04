import React, { useEffect } from "react";
import * as THREE from "three";
import styles from "./index.module.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Props {}

export const ThreeBox = (props: Partial<Props>) => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera = new THREE.PerspectiveCamera(
    70,
    sizes.width / sizes.height,
    0.1,
    10
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
  const init = () => {
    // 创建场景
    const scene = new THREE.Scene();

    camera.position.z = 4;
    scene.add(camera);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
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
  return <div id="three-box" className={styles.threeBox} />;
};
