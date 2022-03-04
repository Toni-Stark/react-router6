import React from "react";
import * as THREE from "three";
interface Props {}

export const UpdateRender = (props: Partial<Props>) => {
  // 创建场景
  const scene = new THREE.Scene();
  // 创建相机 （远近参数，视角尺寸，最近距离，最远距离）
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    10
  );
  // 创建网格（）
  const mesh = new THREE.Mesh(
    // BoxGeometry (宽，高，厚度)
    new THREE.BoxGeometry(3, 3, 3),
    // SphereGeometry (视角远近， 左边顶点数，右边顶点数)
    // new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  );
  scene.add(mesh);
  // camera.position.set 设置相机位置(视角远近， 视角向下俯视，视角向左侧视)
  camera.position.set(6, 0, 0);
  // camera.lookAt ---> THREE.Vector3 超微距 （近距离查看,x,y,z）
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  animate();
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
  }

  return <div className="home-body"></div>;
};
