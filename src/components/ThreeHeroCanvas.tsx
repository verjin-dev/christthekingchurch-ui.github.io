import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. 3D Cross of Particles
    const crossParticlesCount = 500;
    const crossGeometry = new THREE.BufferGeometry();
    const crossPositions = new Float32Array(crossParticlesCount * 3);
    const crossOriginalPositions = new Float32Array(crossParticlesCount * 3);

    for (let i = 0; i < crossParticlesCount; i++) {
      const isVertical = Math.random() > 0.4;
      let x = 0, y = 0, z = 0;

      if (isVertical) {
        y = (Math.random() - 0.5) * 4.5;
        x = (Math.random() - 0.5) * 0.15;
        z = (Math.random() - 0.5) * 0.15;
      } else {
        x = (Math.random() - 0.5) * 3.0;
        y = 0.8 + (Math.random() - 0.5) * 0.15;
        z = (Math.random() - 0.5) * 0.15;
      }

      x += (Math.random() - 0.5) * 0.05;
      y += (Math.random() - 0.5) * 0.05;
      z += (Math.random() - 0.5) * 0.05;

      crossPositions[i * 3] = x;
      crossPositions[i * 3 + 1] = y;
      crossPositions[i * 3 + 2] = z;
      crossOriginalPositions[i * 3] = x;
      crossOriginalPositions[i * 3 + 1] = y;
      crossOriginalPositions[i * 3 + 2] = z;
    }

    crossGeometry.setAttribute('position', new THREE.BufferAttribute(crossPositions, 3));

    const crossMaterial = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const crossPoints = new THREE.Points(crossGeometry, crossMaterial);
    group.add(crossPoints);

    // 2. Surrounding Spherical Halo
    const haloParticlesCount = 1200;
    const haloGeometry = new THREE.BufferGeometry();
    const haloPositions = new Float32Array(haloParticlesCount * 3);

    for (let i = 0; i < haloParticlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 3.5 + Math.random() * 2.0;

      haloPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      haloPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      haloPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    haloGeometry.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));

    const haloMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const haloPoints = new THREE.Points(haloGeometry, haloMaterial);
    group.add(haloPoints);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop — NO continuous rotation, only gentle float + mouse tilt
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking (lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Only mouse-driven tilt — no continuous spinning
      group.rotation.y = targetX * 1.2;
      group.rotation.x = targetY * 1.2;

      // Gentle floating motion on cross particles (subtle Y drift)
      const positions = crossGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < crossParticlesCount; i++) {
        const originalY = crossOriginalPositions[i * 3 + 1];
        positions[i * 3 + 1] = originalY + Math.sin(elapsedTime * 1.5 + crossOriginalPositions[i * 3] * 3) * 0.04;
      }
      crossGeometry.attributes.position.needsUpdate = true;

      // Very slow gentle drift on halo only
      haloPoints.rotation.y = Math.sin(elapsedTime * 0.2) * 0.15;
      haloPoints.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crossGeometry.dispose();
      crossMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="hero-canvas-container" />;
};
