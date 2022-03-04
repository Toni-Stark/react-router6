import React from "react";
import * as THREE from "three";
import gsad from "gsap";
interface Props {}

console.log(gsad);

export const AnimationBox = (props: Partial<Props>) => {
  // 创建场景
  const scene = new THREE.Scene();

  const group = new THREE.Group();
  scene.add(group);
  // 创建相机 （远近参数，视角尺寸，最近距离，最远距离）
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    10
  );

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  );
  group.add(cube1);
  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  );
  group.add(cube2);
  cube2.position.set(0, 0, 2);

  // camera.position.set 设置相机位置(视角远近， 视角向下俯视，视角向左侧视)
  camera.position.set(6, 0, 0);
  // camera.lookAt ---> THREE.Vector3 超微距 （近距离查看,x,y,z）
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // 创建渲染器,
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  gsad.to(cube1.position, { duration: 1, delay: 1, x: 2 });
  gsad.to(cube1.position, { duration: 1, delay: 2, x: 0 });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // cube1.position.z = Math.cos(elapsedTime);
    // cube1.position.x = Math.cos(elapsedTime);
    // cube1.rotation.x = Math.cos(elapsedTime);
    // cube1.rotation.y = Math.cos(elapsedTime);
    // cube1.rotation.z = Math.cos(elapsedTime);
    // cube1.scale.set(2, 2, 2);
    camera.position.z = Math.sin(elapsedTime);
    camera.position.y = Math.cos(elapsedTime);
    cube2.position.z = Math.cos(elapsedTime);
    cube2.position.y = Math.sin(elapsedTime);
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();

  return <div className="home-body"></div>;
};
