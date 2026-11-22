"use client";
import { useEffect, useRef } from "react";
import { consumeDirty, story, type StoryState } from "./story-state";

type THREE_NS = typeof import("three");

// Shared shape function. Every vertex (dot or line) is a point on a unit sphere that the
// story state bends: spherical waves, voice ripples, customer clusters, flowing bands, and
// finally a tangled scatter (chaos). One shape function means the whole story is one object.
const SHAPE = /* glsl */ `
uniform float uTime, uChaos, uWave, uRipple, uCluster, uFlow;
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 clusterCenter(float g){
  if (g < 0.5) return vec3(-0.75, 0.45, 0.0);
  if (g < 1.5) return vec3( 0.75, 0.45, 0.0);
  if (g < 2.5) return vec3(-0.75,-0.55, 0.0);
  return vec3(0.75,-0.55, 0.0);
}
vec3 shapeAt(vec3 p, vec3 seed, float g){
  float a = acos(clamp(p.y, -1.0, 1.0));
  float t = atan(p.z, p.x);
  float w = sin(a * 11.0 - uTime * 0.9) * 0.62 + sin(t * 3.0 + a * 4.0 + uTime * 0.55) * 0.38;
  float r = 1.0 + w * 0.05 * uWave;
  r += sin(a * 20.0 - uTime * 3.4) * 0.075 * uRipple * smoothstep(3.1, 0.3, a);
  vec3 q = p * r;
  float spin = uFlow * (sin(a * 2.0) * 1.2 + uTime * 0.6);
  q.xz = rot(spin) * q.xz;
  vec3 cp = clusterCenter(g) * 1.05 + normalize(seed + 0.0001) * 0.32 * pow(length(seed), 0.6);
  q = mix(q, cp, uCluster);
  vec3 s = seed * 1.9;
  s += 0.22 * vec3(sin(uTime * 0.7 + seed.y * 5.0), cos(uTime * 0.6 + seed.z * 5.0), sin(uTime * 0.8 + seed.x * 5.0));
  float tw = length(s.xy) * 1.6 + uTime * 0.12;
  s.xy = rot(tw) * s.xy;
  return mix(q, s, uChaos);
}
`;

const POINT_VERT = /* glsl */ `
${SHAPE}
attribute vec3 aSeed;
attribute float aGroup;
uniform float uReveal, uPixel, uSize, uAccent;
varying float vAccent;
void main(){
  vec3 q = shapeAt(position, aSeed, aGroup) * mix(0.5, 1.0, uReveal);
  vec4 mv = modelViewMatrix * vec4(q, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixel * (6.0 / -mv.z);
  float h = fract(sin(aGroup * 91.7 + dot(aSeed, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  vAccent = step(h, uAccent * 0.55);
}
`;
const POINT_FRAG = /* glsl */ `
uniform vec3 uInk, uGreen;
uniform float uAlpha, uReveal;
varying float vAccent;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.28, d);
  vec3 green = mix(uGreen, uInk, smoothstep(0.22, 0.5, d) * 0.6);
  gl_FragColor = vec4(mix(uInk, green, vAccent), a * uAlpha * uReveal);
}
`;
const LINE_VERT = /* glsl */ `
${SHAPE}
attribute vec3 aSeed;
attribute float aGroup;
attribute float aKind;
uniform float uReveal, uLink;
varying float vA;
void main(){
  vec3 q = shapeAt(position, aSeed, aGroup) * mix(0.5, 1.0, uReveal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(q, 1.0);
  vA = aKind < 0.5 ? 1.0 : uLink;
}
`;
const LINE_FRAG = /* glsl */ `
uniform vec3 uInk;
uniform float uAlpha, uReveal;
varying float vA;
void main(){ gl_FragColor = vec4(uInk, 0.2 * vA * uAlpha * uReveal); }
`;

const rnd = Math.random;
function ballPoint(): [number, number, number] {
  for (;;) {
    const x = rnd() * 2 - 1, y = rnd() * 2 - 1, z = rnd() * 2 - 1;
    if (x * x + y * y + z * z <= 1) return [x, y, z];
  }
}

/** Dots arranged in concentric latitude rings, so viewed from the pole they read as ripples. */
function buildPoints(THREE: THREE_NS, narrow: boolean) {
  const rings = narrow ? 44 : 64;
  const density = narrow ? 100 : 150;
  const pos: number[] = [], seed: number[] = [], grp: number[] = [];
  for (let k = 0; k < rings; k++) {
    const a = ((k + 0.5) / rings) * Math.PI;
    const n = Math.max(6, Math.round(Math.sin(a) * density));
    const off = k * 0.37;
    for (let j = 0; j < n; j++) {
      const t = (j / n) * Math.PI * 2 + off;
      pos.push(Math.sin(a) * Math.cos(t), Math.cos(a), Math.sin(a) * Math.sin(t));
      seed.push(...ballPoint());
      grp.push(Math.floor(rnd() * 4));
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 3));
  g.setAttribute("aGroup", new THREE.Float32BufferAttribute(grp, 1));
  return g;
}

/** Fine rings (always on) and meridians (fade in for the "connected" moment). */
function buildLines(THREE: THREE_NS, narrow: boolean) {
  const pos: number[] = [], seed: number[] = [], grp: number[] = [], kind: number[] = [];
  const seg = narrow ? 72 : 120;

  const loop = (kindVal: number, point: (u: number) => [number, number, number], steps: number, closed: boolean) => {
    // chaos shape for this line: a tilted random circle somewhere in the scatter
    const c = ballPoint();
    const u = ballPoint(), v = ballPoint();
    const g = Math.floor(rnd() * 4);
    const seedAt = (t: number): [number, number, number] => [
      c[0] * 0.5 + 0.7 * (Math.cos(t) * u[0] + Math.sin(t) * v[0]),
      c[1] * 0.5 + 0.7 * (Math.cos(t) * u[1] + Math.sin(t) * v[1]),
      c[2] * 0.5 + 0.7 * (Math.cos(t) * u[2] + Math.sin(t) * v[2]),
    ];
    const n = closed ? steps : steps;
    for (let i = 0; i < n; i++) {
      for (const f of [i / steps, (i + 1) / steps]) {
        pos.push(...point(f));
        seed.push(...seedAt(f * Math.PI * 2));
        grp.push(g);
        kind.push(kindVal);
      }
    }
  };

  for (let k = 3; k < 64; k += 4) {
    const a = ((k + 0.5) / 64) * Math.PI;
    loop(0, (f) => [Math.sin(a) * Math.cos(f * Math.PI * 2), Math.cos(a), Math.sin(a) * Math.sin(f * Math.PI * 2)], seg, true);
  }
  const meridians = narrow ? 10 : 16;
  for (let m = 0; m < meridians; m++) {
    const phi = (m / meridians) * Math.PI * 2;
    loop(1, (f) => [Math.sin(f * Math.PI) * Math.cos(phi), Math.cos(f * Math.PI), Math.sin(f * Math.PI) * Math.sin(phi)], seg / 2, false);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 3));
  g.setAttribute("aGroup", new THREE.Float32BufferAttribute(grp, 1));
  g.setAttribute("aKind", new THREE.Float32BufferAttribute(kind, 1));
  return g;
}

function init(THREE: THREE_NS, host: HTMLElement, reduce: boolean) {
  let renderer: InstanceType<THREE_NS["WebGLRenderer"]>;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    host.classList.add("zm-nogl"); // no WebGL: a soft CSS glow stands in for the sphere
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 6;
  const outer = new THREE.Group(); // tilt: pole toward the viewer so rings read as ripples
  const inner = new THREE.Group(); // spin about the pole
  outer.add(inner);
  scene.add(outer);

  const U = {
    uTime: { value: 0 }, uChaos: { value: 0 }, uWave: { value: 1 }, uRipple: { value: 0 }, uCluster: { value: 0 },
    uFlow: { value: 0 }, uLink: { value: 0 }, uAccent: { value: 0 }, uAlpha: { value: 1 }, uReveal: { value: 0 },
    uInk: { value: new THREE.Color("#8a5fd3") }, uGreen: { value: new THREE.Color("#B8D957") },
  };
  const pointMat = new THREE.ShaderMaterial({
    uniforms: { ...U, uPixel: { value: 1 }, uSize: { value: 2.7 } },
    vertexShader: POINT_VERT, fragmentShader: POINT_FRAG, transparent: true, depthTest: false, depthWrite: false,
  });
  const lineMat = new THREE.ShaderMaterial({
    uniforms: { ...U }, vertexShader: LINE_VERT, fragmentShader: LINE_FRAG, transparent: true, depthTest: false, depthWrite: false,
  });

  let narrow = false;
  let points: InstanceType<THREE_NS["Points"]>;
  let lines: InstanceType<THREE_NS["LineSegments"]>;
  const rebuild = () => {
    if (points) { inner.remove(points); points.geometry.dispose(); }
    if (lines) { inner.remove(lines); lines.geometry.dispose(); }
    points = new THREE.Points(buildPoints(THREE, narrow), pointMat);
    lines = new THREE.LineSegments(buildLines(THREE, narrow), lineMat);
    points.frustumCulled = false;
    lines.frustumCulled = false;
    inner.add(lines, points);
  };

  let w = 1, h = 1;
  const resize = () => {
    w = host.clientWidth || window.innerWidth;
    h = host.clientHeight || window.innerHeight;
    const nowNarrow = w < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, nowNarrow ? 1.5 : 2));
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    pointMat.uniforms.uPixel.value = renderer.getPixelRatio();
    if (nowNarrow !== narrow || !points) {
      narrow = nowNarrow;
      rebuild();
    }
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // gentle pointer parallax (fine pointers only)
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    ptr.tx = (e.clientX / window.innerWidth) * 2 - 1;
    ptr.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

  const cur: StoryState = { ...story };
  const keys = Object.keys(story) as (keyof StoryState)[];
  const vh = 2 * Math.tan((35 * Math.PI) / 360) * camera.position.z;
  let raf = 0;
  let last = performance.now();

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (document.hidden) { last = now; return; }
    if (reduce && !consumeDirty()) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const k = reduce ? 1 : 1 - Math.pow(0.0008, dt); // eased follow, frame-rate independent
    for (const key of keys) cur[key] += (story[key] - cur[key]) * k;

    const time = reduce ? 0 : now / 1000;
    U.uTime.value = time;
    U.uChaos.value = cur.chaos; U.uWave.value = cur.wave; U.uRipple.value = cur.ripple;
    U.uCluster.value = cur.cluster; U.uFlow.value = cur.flow; U.uLink.value = cur.link;
    U.uAccent.value = cur.accent; U.uAlpha.value = cur.alpha; U.uReveal.value = cur.reveal;

    const vw = vh * (w / h);
    const radius = Math.min(vw * 0.46, vh * 0.5) * cur.scale * (narrow ? 0.95 : 1);
    inner.parent!.scale.setScalar(radius);
    ptr.x += (ptr.tx - ptr.x) * 0.05;
    ptr.y += (ptr.ty - ptr.y) * 0.05;
    outer.rotation.x = 1.12 + ptr.y * 0.1;
    outer.rotation.y = ptr.x * 0.14;
    inner.rotation.y = time * 0.05 + cur.chaos * 0.6;
    outer.position.x = (cur.xBase + cur.xBias) * (vw / 2) * (narrow ? 0.25 : 1);
    outer.position.y = cur.y * (vh / 2) + (narrow ? vh * 0.2 : 0);

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("pointermove", onMove);
    points?.geometry.dispose();
    lines?.geometry.dispose();
    pointMat.dispose();
    lineMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}

/** The one visual that carries the whole story. Three.js is loaded lazily, after first paint. */
export default function SphereCanvas({ reduce }: { reduce: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    import("three").then((THREE) => {
      if (disposed || !host.current) return;
      cleanup = init(THREE, host.current, reduce);
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduce]);
  return <div ref={host} className="zm-canvas" aria-hidden />;
}
