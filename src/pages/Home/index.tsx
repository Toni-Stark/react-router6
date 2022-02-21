import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import * as THREE from "three";
import { TilesRenderer } from "3d-tiles-renderer";
import "./index.scss";
interface Props {}

export const Home = (props: Partial<Props>): React.ReactElement => {
  const navigator = useNavigate();

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  function animation(time: number) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
  }

  return (
    <div className="home-body">
      {/*<h1>Home</h1>*/}
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    navigator("/store");*/}
      {/*  }}*/}
      {/*  type="link"*/}
      {/*>*/}
      {/*  跳转*/}
      {/*</Button>*/}
    </div>
  );
};
