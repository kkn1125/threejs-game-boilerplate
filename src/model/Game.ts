import * as THREE from "three";
import { BoxGeometry } from "three";
import { APP } from "../util/global";
import Logger from "./Logger";

const INNER_WIDTH = window.innerWidth;
const INNER_HEIGHT = window.innerHeight;

const FOV = 75;
const ASPECT = INNER_WIDTH / INNER_HEIGHT;
const NEAR = 0.1;
const FAR = 1000;

export default class Game {
  logger: Map<string, Logger> = new Map();
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.Renderer;

  objects: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[] = [];

  constructor() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    const renderer = new THREE.WebGLRenderer();
    this.logger.set("default", new Logger("sys"));

    /* camera setting */
    camera.position.z = 5;

    renderer.setSize(INNER_WIDTH, INNER_HEIGHT);
    this.logger.get("default")?.log("renderer set size");
    APP.appendChild(renderer.domElement);
    this.logger.get("default")?.log("append renderer dom element");

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.logger.get("default")?.log("Game is loaded");
  }

  createObject() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.objects.push(cube);
    this.scene.add(cube);
  }

  render() {
    const animate = (time?: number) => {
      // this.logger.get("default")?.log(time);

      this.objects.forEach((item) => {
        item.rotation.x += 0.01;
        item.rotation.y += 0.01;
      });

      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}
