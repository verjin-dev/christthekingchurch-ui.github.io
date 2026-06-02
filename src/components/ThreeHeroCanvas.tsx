import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, renderer
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

    // Particle Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Create a 3D Cross of Particles
    const crossParticlesCount = 500;
    const crossGeometry = new THREE.BufferGeometry();
    const crossPositions = new Float32Array(crossParticlesCount * 3);

    for (let i = 0; i < crossParticlesCount; i++) {
      // Draw a cross using vertical and horizontal bars
      const isVertical = Math.random() > 0.4;
      let x = 0;
      let y = 0;
      let z = 0;

      if (isVertical) {
        // Vertical bar: longer in Y
        y = (Math.random() - 0.5) * 4.5;
        // Jitter around the center axis
        x = (Math.random() - 0.5) * 0.15;
        z = (Math.random() - 0.5) * 0.15;
      } else {
        // Horizontal crossbar: wider in X, positioned slightly above center
        x = (Math.random() - 0.5) * 3.0;
        y = 0.8 + (Math.random() - 0.5) * 0.15;
        z = (Math.random() - 0.5) * 0.15;
      }

      // Add a slight overall jitter to make it organic
      x += (Math.random() - 0.5) * 0.05;
      y += (Math.random() - 0.5) * 0.05;
      z += (Math.random() - 0.5) * 0.05;

      crossPositions[i * 3] = x;
      crossPositions[i * 3 + 1] = y;
      crossPositions[i * 3 + 2] = z;
    }

    crossGeometry.setAttribute('position', new THREE.BufferAttribute(crossPositions, 3));

    // Glowing particle material for the Cross (Vibrant Orange/Coral)
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

    // 2. Create a surrounding Spherical Halo (Blue/Indigo)
    const haloParticlesCount = 1200;
    const haloGeometry = new THREE.BufferGeometry();
    const haloPositions = new Float32Array(haloParticlesCount * 3);

    for (let i = 0; i < haloParticlesCount; i++) {
      // Distribute points on a sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Radius between 3.5 and 5.5
      const radius = 3.5 + Math.random() * 2.0;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      haloPositions[i * 3] = x;
      haloPositions[i * 3 + 1] = y;
      haloPositions[i * 3 + 2] = z;
    }

    haloGeometry.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));

    // Material for the Halo (Soft indigo blue)
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
      // Normalize to -0.5 to 0.5
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking (lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate group based on time and mouse position
      group.rotation.y = elapsedTime * 0.15 + targetX * 1.5;
      group.rotation.x = elapsedTime * 0.08 + targetY * 1.5;

      // Add a waving/floating motion to individual particles in the shader/loop
      const positions = crossGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < crossParticlesCount; i++) {
        // Shift Y position slightly over time using a sine wave
        const originalY = crossPositions[i * 3 + 1];
        positions[i * 3 + 1] = originalY + Math.sin(elapsedTime * 2 + crossPositions[i * 3]) * 0.05;
      }
      crossGeometry.attributes.position.needsUpdate = true;

      // Slowly rotate halo slightly in opposite direction
      haloPoints.rotation.y = -elapsedTime * 0.05;
      haloPoints.rotation.z = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
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
