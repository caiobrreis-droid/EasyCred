"use client";

import { useEffect, useRef } from "react";

type Peca = {
  tipo: "tri" | "bola";
  /** posição em fração da tela (0 a 1) */
  fx: number;
  fy: number;
  z: number;
  escala: number;
  material: "vidro" | "azul" | "forte" | "perola";
  rot: [number, number, number];
  /** só aparece em telas largas */
  soDesktop?: boolean;
};

const PECAS: Peca[] = [
  { tipo: "tri", fx: 0.9, fy: 0.42, z: -3, escala: 2.8, material: "vidro", rot: [0.15, -0.35, -0.2] },
  { tipo: "tri", fx: 0.6, fy: 0.74, z: -1.2, escala: 1.25, material: "forte", rot: [-0.25, 0.35, -0.45] },
  { tipo: "tri", fx: 0.97, fy: 0.78, z: -0.6, escala: 0.9, material: "azul", rot: [0.5, 0.3, 0.2] },
  { tipo: "tri", fx: 0.47, fy: 0.12, z: -3, escala: 0.55, material: "perola", rot: [0.2, 0.3, 0.6], soDesktop: true },
  { tipo: "tri", fx: 0.04, fy: 0.9, z: -1.5, escala: 0.7, material: "azul", rot: [-0.3, -0.3, 0.9], soDesktop: true },
  { tipo: "bola", fx: 0.9, fy: 0.12, z: -0.5, escala: 0.28, material: "forte", rot: [0, 0, 0] },
  { tipo: "bola", fx: 0.55, fy: 0.45, z: -2.2, escala: 0.18, material: "perola", rot: [0, 0, 0], soDesktop: true },
  { tipo: "bola", fx: 0.68, fy: 0.95, z: 0.2, escala: 0.22, material: "azul", rot: [0, 0, 0] },
];

/**
 * Cena 3D do topo: triângulos da logo em acrílico e esferas flutuando, reagindo ao mouse e à rolagem.
 * Carrega o three.js depois da página pronta; se o WebGL não existir, os triângulos em SVG continuam no lugar.
 */
export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let cancelado = false;
    let limpar = () => {};

    const iniciar = async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (cancelado) return;

      const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const toque = window.matchMedia("(pointer: coarse)").matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // sem WebGL: fica o SVG
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, toque ? 1.5 : 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const cena = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const ambiente = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      cena.environment = ambiente;

      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 10);

      const luz = new THREE.DirectionalLight(0xffffff, 1.6);
      luz.position.set(-4, 6, 8);
      cena.add(luz);
      const contraluz = new THREE.DirectionalLight(0x9fd8ff, 1.2);
      contraluz.position.set(6, -3, -4);
      cena.add(contraluz);

      // Triângulo arredondado da logo (mesmo desenho do SVG, num quadro de 320)
      const forma = new THREE.Shape();
      const p = (x: number, y: number) => [x - 160, 160 - y] as const;
      forma.moveTo(...p(40, 20));
      forma.quadraticCurveTo(...p(20, 8), ...p(20, 32));
      forma.lineTo(...p(20, 288));
      forma.quadraticCurveTo(...p(20, 312), ...p(40, 300));
      forma.lineTo(...p(290, 178));
      forma.quadraticCurveTo(...p(312, 160), ...p(290, 142));
      forma.lineTo(...p(40, 20));
      const geoTri = new THREE.ExtrudeGeometry(forma, {
        depth: 46,
        bevelEnabled: true,
        bevelThickness: 18,
        bevelSize: 14,
        bevelSegments: 10,
        curveSegments: 28,
      });
      geoTri.center();
      geoTri.scale(1 / 300, 1 / 300, 1 / 300);
      const geoBola = new THREE.SphereGeometry(1, 48, 48);

      const materiais = {
        vidro: new THREE.MeshPhysicalMaterial({
          color: 0x8fd0ff,
          roughness: 0.08,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          transparent: true,
          opacity: 0.72,
          iridescence: 0.6,
          iridescenceIOR: 1.3,
          envMapIntensity: 1.4,
        }),
        azul: new THREE.MeshPhysicalMaterial({ color: 0x3aa6f5, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 }),
        forte: new THREE.MeshPhysicalMaterial({ color: 0x0b6bcb, roughness: 0.18, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.06 }),
        perola: new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          roughness: 0.25,
          clearcoat: 1,
          sheen: 1,
          sheenColor: new THREE.Color(0x9fd8ff),
          iridescence: 0.4,
        }),
      };

      const grupo = new THREE.Group();
      cena.add(grupo);

      const largo = () => host.clientWidth >= 1000;
      type Item = { mesh: InstanceType<typeof THREE.Mesh>; peca: Peca; fase: number };
      const itens: Item[] = PECAS.map((peca, i) => {
        const mesh = new THREE.Mesh(peca.tipo === "tri" ? geoTri : geoBola, materiais[peca.material]);
        mesh.rotation.set(...peca.rot);
        mesh.scale.setScalar(peca.escala);
        grupo.add(mesh);
        return { mesh, peca, fase: i * 1.7 };
      });

      // Posiciona as peças conforme o tamanho da tela
      const posicionar = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const desk = largo();
        for (const it of itens) {
          const dist = camera.position.z - it.peca.z;
          const altura = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
          const largura = altura * camera.aspect;
          // No celular as peças vão para trás da foto (parte de baixo do topo)
          const fx = desk ? it.peca.fx : 0.25 + it.peca.fx * 0.7;
          const fy = desk ? it.peca.fy : 0.45 + it.peca.fy * 0.5;
          it.mesh.visible = desk || !it.peca.soDesktop;
          it.mesh.userData.base = new THREE.Vector3((fx - 0.5) * largura, (0.5 - fy) * altura, it.peca.z);
          it.mesh.scale.setScalar(it.peca.escala * (desk ? 1 : 0.7));
        }
      };
      posicionar();

      // Mouse e rolagem
      const alvo = { x: 0, y: 0 };
      const atual = { x: 0, y: 0 };
      let rolagem = 0;
      const onMove = (e: PointerEvent) => {
        alvo.x = e.clientX / window.innerWidth - 0.5;
        alvo.y = e.clientY / window.innerHeight - 0.5;
      };
      const onScroll = () => {
        rolagem = Math.min(window.scrollY / Math.max(host.clientHeight, 1), 1.5);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });

      const relogio = new THREE.Clock();
      let raf = 0;
      let visivel = true;

      const quadro = () => {
        const t = movimentoReduzido ? 0 : relogio.getElapsedTime();
        atual.x += (alvo.x - atual.x) * 0.05;
        atual.y += (alvo.y - atual.y) * 0.05;
        grupo.rotation.y = atual.x * 0.35;
        grupo.rotation.x = atual.y * 0.25;
        for (const it of itens) {
          const base = it.mesh.userData.base as InstanceType<typeof THREE.Vector3>;
          const prof = 1 + (it.peca.z + 3) * 0.35; // peças da frente se mexem mais
          it.mesh.position.set(
            base.x + atual.x * 0.4 * prof,
            base.y + Math.sin(t * 0.6 + it.fase) * 0.18 - atual.y * 0.3 * prof + rolagem * 1.6 * prof,
            base.z,
          );
          if (it.peca.tipo === "tri") {
            it.mesh.rotation.x = it.peca.rot[0] + Math.sin(t * 0.35 + it.fase) * 0.25 + rolagem * 0.8;
            it.mesh.rotation.y = it.peca.rot[1] + Math.sin(t * 0.25 + it.fase) * 0.4 + rolagem * 1.2;
            it.mesh.rotation.z = it.peca.rot[2] + Math.cos(t * 0.3 + it.fase) * 0.1;
          }
        }
        renderer.render(cena, camera);
      };

      const loop = () => {
        quadro();
        if (visivel && !movimentoReduzido) raf = requestAnimationFrame(loop);
      };

      // Só anima enquanto o topo está na tela
      const io = new IntersectionObserver(([e]) => {
        visivel = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (visivel) loop();
      });
      io.observe(host);

      const ro = new ResizeObserver(() => {
        posicionar();
        if (movimentoReduzido) quadro();
      });
      ro.observe(host);

      // Primeiro quadro pronto: troca o SVG pela cena
      quadro();
      host.closest(".hero")?.classList.add("hero--3d");

      limpar = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        geoTri.dispose();
        geoBola.dispose();
        Object.values(materiais).forEach((m) => m.dispose());
        ambiente.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        host.closest(".hero")?.classList.remove("hero--3d");
      };
    };

    // Espera a página ficar pronta para não atrasar o carregamento da foto e do título
    const temIdle = "requestIdleCallback" in window;
    const timer = temIdle ? window.requestIdleCallback(() => void iniciar()) : window.setTimeout(() => void iniciar(), 300);

    return () => {
      cancelado = true;
      if (temIdle) window.cancelIdleCallback(timer);
      else clearTimeout(timer);
      limpar();
    };
  }, []);

  return <div className="cena3d" ref={ref} aria-hidden="true" />;
}
