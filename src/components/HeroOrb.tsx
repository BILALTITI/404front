"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroOrbProps {
  scrollVelocityRef?: React.MutableRefObject<number>;
}

export function HeroOrb({ scrollVelocityRef }: HeroOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── Core orb with advanced shader ──────────────────────────────────────
    const orbGeo = new THREE.IcosahedronGeometry(1.8, 80);
    const orbMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        distortion: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 },
        color1: { value: new THREE.Color(0xff6b00) },
        color2: { value: new THREE.Color(0xff8c3a) },
        color3: { value: new THREE.Color(0xffd0a0) },
        colorDark: { value: new THREE.Color(0x1a0800) },
      },
      vertexShader: `
        uniform float time;
        uniform float distortion;
        uniform float mouseX;
        uniform float mouseY;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vNoise;

        vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
        vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
        vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}

        float snoise(vec3 v){
          const vec2 C=vec2(1./6.,1./3.);
          const vec4 D=vec4(0.,.5,1.,2.);
          vec3 i=floor(v+dot(v,C.yyy));
          vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);
          vec3 l=1.-g;
          vec3 i1=min(g.xyz,l.zxy);
          vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;
          vec3 x2=x0-i2+C.yyy;
          vec3 x3=x0-D.yyy;
          i=mod289(i);
          vec4 p=permute(permute(permute(
            i.z+vec4(0.,i1.z,i2.z,1.))
            +i.y+vec4(0.,i1.y,i2.y,1.))
            +i.x+vec4(0.,i1.x,i2.x,1.));
          float n_=.142857142857;
          vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);
          vec4 y_=floor(j-7.*x_);
          vec4 x=x_*ns.x+ns.yyyy;
          vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);
          vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.+1.;
          vec4 s1=floor(b1)*2.+1.;
          vec4 sh=-step(h,vec4(0.));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);
          vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z);
          vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
          m=m*m;
          return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main(){
          vUv=uv;
          vNormal=normal;

          float t=time*0.25;
          float n1=snoise(position*1.8+vec3(t,t*0.7,t*0.5));
          float n2=snoise(position*3.2+vec3(-t*0.4,t*0.6,-t*0.8));
          float n3=snoise(position*6.0+vec3(t*0.2,-t*0.3,t*0.4));
          float noise=(n1*0.5+n2*0.3+n3*0.2);

          // Scroll distortion: stretches the orb on Y
          float scrollPull=distortion*1.2;
          vec3 pos=position+normal*(noise*0.22+scrollPull*0.15*abs(position.y));

          // Mouse influence
          pos.x+=mouseX*0.15*noise;
          pos.y+=mouseY*0.15*noise;

          vNoise=noise;
          vPosition=pos;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float distortion;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 colorDark;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vNoise;

        void main(){
          vec3 viewDir=normalize(vec3(0.,0.,1.));
          float fresnel=pow(1.-max(dot(vNormal,viewDir),0.),2.5);

          // Base color mix
          float t=vUv.y+vNoise*0.3+time*0.04;
          vec3 col=mix(color1,color2,fresnel*0.8);
          col=mix(col,color3,clamp(sin(t*8.+time*0.5)*0.5+0.5,0.,1.)*0.4);
          col=mix(colorDark,col,0.85+vNoise*0.15);

          // Rim lighting
          float rim=1.-fresnel;
          col+=color1*fresnel*1.5;

          // Scroll glow pulse
          col+=color2*distortion*0.5*fresnel;

          // Energy lines
          float lines=sin(vPosition.y*12.+time*2.)*0.5+0.5;
          col+=color1*lines*0.08*fresnel;

          float alpha=0.92+fresnel*0.08;
          gl_FragColor=vec4(col,alpha);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });

    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // ── Inner glow sphere ──────────────────────────────────────────────────
    const glowGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.06,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // ── Orbital rings ──────────────────────────────────────────────────────
    function makeRing(radius: number, thickness: number, opacity: number, tiltX: number, tiltY: number) {
      const geo = new THREE.TorusGeometry(radius, thickness, 3, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = tiltX;
      mesh.rotation.y = tiltY;
      scene.add(mesh);
      return mesh;
    }

    const ring1 = makeRing(2.5, 0.012, 0.5, Math.PI / 2, 0);
    const ring2 = makeRing(2.8, 0.008, 0.3, Math.PI / 3, Math.PI / 5);
    const ring3 = makeRing(3.2, 0.006, 0.15, Math.PI / 6, Math.PI / 3);

    // ── Particle trail system ──────────────────────────────────────────────
    const PARTICLE_COUNT = 3000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 2.2 + Math.random() * 5;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);

      const brightness = 0.5 + Math.random() * 0.5;
      colors[i * 3] = 1.0 * brightness;
      colors[i * 3 + 1] = (0.42 + Math.random() * 0.2) * brightness;
      colors[i * 3 + 2] = 0.0;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        void main(){
          vColor=color;
          vec4 mvPos=modelViewMatrix*vec4(position,1.);
          vAlpha=clamp(1.0-length(position)*0.08,0.,1.);
          gl_PointSize=size*(280./-mvPos.z);
          gl_Position=projectionMatrix*mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main(){
          float d=length(gl_PointCoord-vec2(.5));
          if(d>.5) discard;
          float alpha=vAlpha*(1.-d*2.)*0.8;
          gl_FragColor=vec4(vColor,alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Orange ambient light ───────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xff6b00, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff8c3a, 2, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // ── Mouse tracking ─────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Render loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      const scrollVel = scrollVelocityRef?.current ?? 0;
      const distortion = Math.min(Math.abs(scrollVel) / 800, 1.0);

      orbMat.uniforms.time.value = t;
      orbMat.uniforms.distortion.value = distortion;
      orbMat.uniforms.mouseX.value = targetX;
      orbMat.uniforms.mouseY.value = targetY;
      particleMat.uniforms.time.value = t;

      orb.rotation.y = t * 0.18 + targetX * 0.4;
      orb.rotation.x = t * 0.10 + targetY * 0.35;

      // Breathing scale with distortion spike
      const breathe = 1 + Math.sin(t * 0.8) * 0.012 + distortion * 0.04;
      orb.scale.setScalar(breathe);

      ring1.rotation.z = t * 0.25;
      ring2.rotation.z = -t * 0.18;
      ring2.rotation.y = t * 0.08;
      ring3.rotation.z = t * 0.12;
      ring3.rotation.x = Math.PI / 6 + Math.sin(t * 0.4) * 0.15;

      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02 + targetY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollVelocityRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
