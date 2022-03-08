import React, { useEffect } from "react";
import * as THREE from "three";
import styles from "./index.module.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';

interface Props {}

export const Store = (props: Partial<Props>) => {
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
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8);
    // const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
    // const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);

    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute("position", positionAttribute);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const clock = new THREE.Clock();

    scene.add(camera);
    scene.add(mesh);
    camera.position.z = 4;
    camera.lookAt(mesh.position);
    canvas = document
      .getElementById("three-box")
      ?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const tick = () => {
      clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  };
  return <div id="three-box" className={styles.threeBox} />;
};
