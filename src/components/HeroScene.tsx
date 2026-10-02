'use client';

import { useEffect, useRef } from 'react';

/** Lê uma cor do tema (variável CSS em canais RGB) como string aceita pelo three.js. */
const themeColor = (name: string) => {
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return `rgb(${channels.split(/\s+/).join(',')})`;
};

/**
 * Cena 3D do topo: nó toroidal em arame com pontos, núcleo facetado, órbitas e partículas.
 * Reage ao mouse e à rolagem, pausa fora da tela e usa as cores do tema.
 * Se o WebGL não estiver disponível, o fundo em CSS continua cobrindo o espaço.
 */
export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 8;

      const accent = new THREE.Color(themeColor('--accent'));
      const accent2 = new THREE.Color(themeColor('--accent-2'));
      const ink = new THREE.Color(themeColor('--fg'));
      const muted = new THREE.Color(themeColor('--muted'));

      const group = new THREE.Group();
      scene.add(group);

      // Nó toroidal: arame + pontos.
      const knotGeometry = new THREE.TorusKnotGeometry(1.1, 0.16, 110, 6, 2, 3);
      const knotWire = new THREE.Mesh(
        knotGeometry,
        new THREE.MeshBasicMaterial({
          color: accent,
          wireframe: true,
          transparent: true,
          opacity: 0.28,
        }),
      );
      const knotPoints = new THREE.Points(
        knotGeometry,
        new THREE.PointsMaterial({
          color: accent2,
          size: 0.028,
          transparent: true,
          opacity: 0.9,
        }),
      );
      group.add(knotWire, knotPoints);

      // Núcleo facetado, com luz colorida.
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: ink,
        flatShading: true,
        roughness: 0.35,
        metalness: 0.4,
      });
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 1), coreMaterial);
      group.add(core);

      const keyLight = new THREE.PointLight(accent, 40, 20);
      keyLight.position.set(3, 2, 4);
      const fillLight = new THREE.PointLight(accent2, 28, 20);
      fillLight.position.set(-3, -2, 3);
      scene.add(keyLight, fillLight, new THREE.AmbientLight(0xffffff, 0.5));

      // Esferas em órbita.
      const orbiters = [0].map((index) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.09 + index * 0.02, 20, 20),
          new THREE.MeshBasicMaterial({ color: index % 2 ? accent2 : accent }),
        );
        group.add(mesh);
        return {
          mesh,
          radius: 1.9 + index * 0.45,
          speed: 0.5 - index * 0.12,
          tilt: index * 0.9,
          phase: index * 2.1,
        };
      });

      // Partículas distantes.
      const count = 160;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const radius = 2.6 + Math.random() * 3.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const dust = new THREE.Points(
        dustGeometry,
        new THREE.PointsMaterial({
          color: muted,
          size: 0.018,
          transparent: true,
          opacity: 0.7,
        }),
      );
      scene.add(dust);

      // Tamanho e posição conforme a largura: mais à direita no desktop.
      const resize = () => {
        const { clientWidth: width, clientHeight: height } = host;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const wide = width > 700;
        group.position.x = wide ? 0.5 : 0;
        group.scale.setScalar(wide ? 1 : 0.8);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();

      // Entrada do usuário.
      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      // Segue o tema quando o usuário alterna claro/escuro.
      const applyTheme = () => {
        const nextAccent = new THREE.Color(themeColor('--accent'));
        const nextAccent2 = new THREE.Color(themeColor('--accent-2'));
        (knotWire.material as import('three').MeshBasicMaterial).color.copy(nextAccent);
        (knotPoints.material as import('three').PointsMaterial).color.copy(nextAccent2);
        coreMaterial.color.set(themeColor('--fg'));
        (dust.material as import('three').PointsMaterial).color.set(
          themeColor('--muted'),
        );
        keyLight.color.copy(nextAccent);
        fillLight.color.copy(nextAccent2);
        orbiters.forEach(({ mesh }, index) =>
          (mesh.material as import('three').MeshBasicMaterial).color.copy(
            index % 2 ? nextAccent2 : nextAccent,
          ),
        );
      };
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      colorScheme.addEventListener('change', applyTheme);

      // Só anima quando visível.
      let visible = true;
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibilityObserver.observe(host);

      const clock = new THREE.Clock();
      let frame = 0;
      const render = () => {
        const time = clock.getElapsedTime();
        const scroll = window.scrollY;

        group.rotation.y += (pointer.x * 0.6 - group.rotation.y + time * 0.12) * 0.04;
        group.rotation.x += (pointer.y * 0.4 - group.rotation.x) * 0.04;
        knotWire.rotation.z = time * 0.15;
        knotPoints.rotation.z = time * 0.15;
        core.rotation.x = time * 0.4;
        core.rotation.y = time * 0.3;
        dust.rotation.y = time * 0.02 + scroll * 0.0005;
        group.position.y = -scroll * 0.0015;

        orbiters.forEach(({ mesh, radius, speed, tilt, phase }) => {
          const angle = time * speed + phase;
          mesh.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * Math.sin(tilt),
            Math.sin(angle) * radius * Math.cos(tilt),
          );
        });

        renderer.render(scene, camera);
      };

      const loop = () => {
        frame = requestAnimationFrame(loop);
        if (visible && !document.hidden) render();
      };
      if (reduceMotion) render();
      else loop();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onPointerMove);
        resizeObserver.disconnect();
        themeObserver.disconnect();
        visibilityObserver.disconnect();
        colorScheme.removeEventListener('change', applyTheme);
        scene.traverse((object) => {
          const mesh = object as import('three').Mesh;
          mesh.geometry?.dispose();
          const material = mesh.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material?.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="h-full w-full" />;
}
