import * as THREE from "three";
import { BoxGeometry } from "three";
import { APP } from "../util/global";
import Logger from "./Logger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    this.logger.set("default", new Logger("sys", "green"));

    this.#setupScene();
    this.#setupCamera();
    this.#setupRenderer();

    this.logger.get("default")?.log("Game is loaded");
  }

  /* default initialize options */

  #setupScene() {
    const scene = new THREE.Scene();
    this.scene = scene;
  }

  #setupCamera() {
    const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    camera.position.z = 5;
    this.camera = camera;
  }

  #setupRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(INNER_WIDTH, INNER_HEIGHT);
    this.logger.get("default")?.log("renderer set size");
    APP.appendChild(renderer.domElement);
    this.logger.get("default")?.log("append renderer dom element");
    this.renderer = renderer;
  }

  /* util */

  addObject() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.objects.push(cube);
    this.scene.add(cube);
    this.logger.get("default")?.log("create object");
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
