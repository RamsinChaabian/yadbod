/**
 * پس‌زمینه ستاره‌ای با Three.js
 * - ۵۰۰ نقطه، سایز قابل مشاهده
 * - با prefers-reduced-motion خاموش می‌شود
 * - در visibility change متوقف می‌شود
 */
import * as THREE from 'three';
import { prefersReducedMotion } from '../../utils/motion';

const PARTICLE_COUNT = 500;
const COLOR_GOLD = 0xb8915a;
const COLOR_IVORY = 0xf5efe0;

export function initThreeBackground(canvas: HTMLCanvasElement): () => void {
  if (prefersReducedMotion()) {
    canvas.style.display = 'none';
    return () => {};
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
    stencil: false,
    depth: false,
  });

  const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 6;

  // ---------- ذرات ----------
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  const cGold = new THREE.Color(COLOR_GOLD);
  const cIvory = new THREE.Color(COLOR_IVORY);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 16;
    positions[i3 + 1] = (Math.random() - 0.5) * 16;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;

    const t = Math.random();
    // ۳۵٪ طلایی، ۶۵٪ عاجی (طلایی برجسته‌تر)
    const color = t < 0.35 ? cGold : cIvory;
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // ✅ متریال ساده، سایز بزرگ، بدون additive blending
  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // ---------- Resize ----------
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // ---------- Animation Loop ----------
  let rafId: number | null = null;
  let running = false;

  function tick() {
    if (!running) return;
    points.rotation.y += 0.0004;
    points.rotation.x += 0.00015;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (!running) {
      running = true;
      tick();
    }
  }

  function stop() {
    running = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  start();

  // ---------- Page Visibility ----------
  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }
  document.addEventListener('visibilitychange', onVisibility);

  // ---------- Cleanup ----------
  return () => {
    stop();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}