'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    // Fill light with warm color to match chrome yellow theme
    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 0.4);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // 5. Particles (Chrome Yellow Balls)
    const particleCount = 75;
    const particles: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      angle: number;
      speed: number;
      orbitRange: THREE.Vector3;
    }[] = [];

    // Sphere geometry & premium material
    const sphereGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Chrome yellow
      metalness: 0.8,
      roughness: 0.15,
    });

    const boxWidth = 55;
    const boxHeight = 35;
    const boxDepth = 40;

    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      
      const x = (Math.random() - 0.5) * boxWidth;
      const y = (Math.random() - 0.5) * boxHeight;
      const z = (Math.random() - 0.5) * boxDepth - 10; // offset back slightly

      mesh.position.set(x, y, z);
      scene.add(mesh);

      particles.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        angle: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.25,
        orbitRange: new THREE.Vector3(
          1 + Math.random() * 1.5,
          1 + Math.random() * 1.5,
          1 + Math.random() * 1.5
        ),
      });
    }

    // 6. Connecting Lines Setup
    const maxLines = 150;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 7. Mouse Interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update particle positions (slow floating)
      particles.forEach((p) => {
        p.mesh.position.x =
          p.basePos.x + Math.sin(elapsedTime * p.speed + p.angle) * p.orbitRange.x;
        p.mesh.position.y =
          p.basePos.y + Math.cos(elapsedTime * p.speed * 0.8 + p.angle) * p.orbitRange.y;
        p.mesh.position.z =
          p.basePos.z + Math.sin(elapsedTime * p.speed * 0.5 + p.angle) * p.orbitRange.z;
      });

      // Update lines based on proximity
      let lineIndex = 0;
      const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      // Clear previous lines
      for (let i = 0; i < positions.length; i++) {
        positions[i] = 0;
      }

      const connectionDist = 12;

      for (let i = 0; i < particleCount && lineIndex < maxLines; i++) {
        const p1 = particles[i].mesh.position;
        for (let j = i + 1; j < particleCount && lineIndex < maxLines; j++) {
          const p2 = particles[j].mesh.position;
          const dist = p1.distanceTo(p2);

          if (dist < connectionDist) {
            const index = lineIndex * 6;
            
            positions[index] = p1.x;
            positions[index + 1] = p1.y;
            positions[index + 2] = p1.z;

            positions[index + 3] = p2.x;
            positions[index + 4] = p2.y;
            positions[index + 5] = p2.z;

            lineIndex++;
          }
        }
      }

      posAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      // Camera parallax with smooth inertia
      targetCameraX = mouseX * 6;
      targetCameraY = -mouseY * 4;

      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -5);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div id="three-bg-canvas" ref={containerRef} />;
}
