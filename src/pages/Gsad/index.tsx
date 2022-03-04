import React from "react";
import * as THREE from "three";
import gsad from "gsap";
interface Props {}

console.log(gsad);

export const Gsad = (props: Partial<Props>) => {
  const cursor = {
    x: 0,
    y: 0,
  };
  const sizes = {
    x: 500,
    y: 500,
  };
  // 创建场景
  const scene = new THREE.Scene();

  const group = new THREE.Group();
  scene.add(group);
  // 创建相机 （远近参数，视角尺寸，最近距离，最远距离）
  const camera = new THREE.PerspectiveCamera(70, sizes.x / sizes.y, 0.1, 10);

  window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX / sizes.x - 0.5;
    cursor.y = e.clientY / sizes.y - 0.5;
  });

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  );
  group.add(cube1);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.x, sizes.y);
  document.body.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    camera.position.y = cursor.y * 5;
    camera.lookAt(cube1.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  return <div className="home-body"></div>;
};
