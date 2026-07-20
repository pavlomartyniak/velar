"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type ModelViewerSceneProps = {
  /** Шлях до .glb у public/. */
  modelUrl: string;
  /** Викликається, щойно модель розміщена в сцені й готова до першого кадру. */
  onReady?: () => void;
};

/** Цільовий розмір найбільшої сторони моделі після нормалізації масштабу. */
const TARGET_SIZE = 4.2;
const FINAL_CAMERA_POSITION: [number, number, number] = [4, 3.8, 4.6];
const INTRO_DURATION = 1.6;

function FittedModel({
  url,
  onFitted,
}: {
  url: string;
  onFitted: (centerY: number) => void;
}) {
  const { scene } = useGLTF(url);

  const { model, centerY } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = TARGET_SIZE / maxDim;

    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    return { model: clone, centerY: (size.y * scale) / 2 };
  }, [scene]);

  useEffect(() => {
    onFitted(centerY);
  }, [centerY, onFitted]);

  return <primitive object={model} />;
}

/**
 * Коротка "інтро"-анімація: камера заходить здалеку під іншим кутом і
 * плавно займає фінальну позицію — щоб було очевидно, що це жива 3D-модель,
 * а не статичне зображення. Після завершення керування переходить до
 * OrbitControls.
 */
function IntroRig({
  target,
  onDone,
}: {
  target: [number, number, number];
  onDone: () => void;
}) {
  const { camera } = useThree();
  const progress = useRef(0);
  const done = useRef(false);

  const targetVec = useMemo(() => new THREE.Vector3(...target), [target]);
  const finalSpherical = useMemo(() => {
    const offset = new THREE.Vector3(...FINAL_CAMERA_POSITION).sub(targetVec);
    return new THREE.Spherical().setFromVector3(offset);
  }, [targetVec]);

  useFrame((_, delta) => {
    if (done.current) return;
    progress.current = Math.min(progress.current + delta / INTRO_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress.current, 3);

    const spherical = new THREE.Spherical(
      finalSpherical.radius * (0.72 + 0.28 * eased),
      finalSpherical.phi,
      finalSpherical.theta - (1 - eased) * 0.9,
    );
    const offset = new THREE.Vector3().setFromSpherical(spherical);
    camera.position.copy(targetVec).add(offset);
    camera.lookAt(targetVec);

    if (progress.current >= 1) {
      done.current = true;
      onDone();
    }
  });

  return null;
}

export default function ModelViewerScene({ modelUrl, onReady }: ModelViewerSceneProps) {
  const [targetY, setTargetY] = useState<number | null>(null);
  const [introActive, setIntroActive] = useState(true);

  const handleFitted = (centerY: number) => {
    setTargetY(centerY);
    onReady?.();
  };

  return (
    <Canvas
      shadows
      camera={{ position: FINAL_CAMERA_POSITION, fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "low-power", toneMappingExposure: 1.35 }}
    >
      <ambientLight intensity={1.9} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-4, 3, -5]} intensity={1.5} />
      <directionalLight position={[0, 4, -6]} intensity={1} />
      <directionalLight position={[0, -2, 5]} intensity={0.6} />
      <hemisphereLight args={["#ffffff", "#8a8f94", 1.3]} />

      <Suspense fallback={null}>
        <FittedModel url={modelUrl} onFitted={handleFitted} />
      </Suspense>

      {targetY !== null && introActive && (
        <IntroRig target={[0, targetY, 0]} onDone={() => setIntroActive(false)} />
      )}

      <OrbitControls
        enabled={targetY !== null && !introActive}
        enablePan={false}
        target={[0, targetY ?? 1.05, 0]}
        minDistance={3.4}
        maxDistance={9}
        maxPolarAngle={Math.PI / 2 - 0.03}
        makeDefault
      />
    </Canvas>
  );
}
