document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackgroundCanvas();
  initHeroCanvas();
  initTypingBadge();
  initScrollEffects();
  initMagneticButtons();
  initMobileMenu();
  initDynamicGitHubRepos();
});

/* =========================================================================
   0. THEME TOGGLE (DARK NAVY CHARCOAL / LIGHT MODE)
   ========================================================================= */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  // Check saved theme preference
  const savedTheme = localStorage.getItem('portfolio_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('portfolio_theme', isLight ? 'light' : 'dark');
  });
}

/* =========================================================================
   1. AMBIENT NEURAL NETWORK BACKGROUND CANVAS
   ========================================================================= */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let particles = [];
  const maxParticles = Math.min(75, Math.floor((width * height) / 20000));
  const connectionDistance = 115;
  
  let mouse = { x: null, y: null, active: false };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.size = Math.random() * 1.8 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap boundaries
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive movement
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          const force = (180 - dist) / 2500;
          this.x -= dx * force;
          this.y -= dy * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    init();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  init();
  animate();
}

/* =========================================================================
   2. HERO SCIENTIFIC INTERACTIVE NEURAL BRAIN VISUALIZATION
   ========================================================================= */
function initHeroCanvas() {
  const canvas = document.getElementById('neural-mesh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const container = canvas.parentElement;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    if (!container) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = container.clientWidth;
    height = container.clientHeight || 470;
    
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();

  // --- ANATOMICAL BRAIN LOBE POINT GENERATION ---
  let nodes = [];
  const totalLobePoints = {
    frontal: 85,     // Left / Anterior lobe
    parietal: 95,    // Superior dorsal arch
    occipital: 75,   // Right / Posterior curve
    temporal: 65,    // Mid-lower anterior curve
    cerebellum: 55,  // Lower posterior structure
    brainstem: 35,   // Columnar lower stem
    core: 50         // Dense internal synaptic bridge
  };

  function addLobePoints(count, cx, cy, rx, ry, lobeName) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      const x = cx + r * rx * Math.cos(angle);
      const y = cy + r * ry * Math.sin(angle);
      // Compute smooth 3D ellipsoidal depth
      const distFromCenter = Math.pow((x - cx) / rx, 2) + Math.pow((y - cy) / ry, 2);
      const zNorm = Math.max(0, 1 - distFromCenter);
      const z = (Math.random() - 0.5) * Math.sqrt(zNorm) * 0.95;

      nodes.push({
        origX: x,
        origY: y,
        origZ: z,
        x: x,
        y: y,
        z: z,
        screenX: 0,
        screenY: 0,
        vx: 0,
        vy: 0,
        baseSize: Math.random() * 1.5 + 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        lobe: lobeName,
        energy: 0,
        connections: []
      });
    }
  }

  function buildBrain() {
    nodes = [];
    // Frontal Lobe (left anterior)
    addLobePoints(totalLobePoints.frontal, -0.42, -0.16, 0.38, 0.40, 'frontal');
    // Parietal / Motor Cortex (top superior arch)
    addLobePoints(totalLobePoints.parietal, 0.08, -0.44, 0.46, 0.32, 'parietal');
    // Occipital Lobe (back posterior)
    addLobePoints(totalLobePoints.occipital, 0.52, -0.10, 0.36, 0.38, 'occipital');
    // Temporal Lobe (mid-lower front)
    addLobePoints(totalLobePoints.temporal, -0.20, 0.22, 0.34, 0.24, 'temporal');
    // Cerebellum (lower back)
    addLobePoints(totalLobePoints.cerebellum, 0.42, 0.46, 0.30, 0.22, 'cerebellum');
    // Brainstem (column angling downwards)
    addLobePoints(totalLobePoints.brainstem, 0.14, 0.66, 0.16, 0.28, 'brainstem');
    // Core Synaptic Bridge (corpus callosum / thalamus)
    addLobePoints(totalLobePoints.core, 0.02, -0.04, 0.28, 0.22, 'core');

    // Build connections based on normalized 3D distance
    const maxConnectDist = 0.28;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].connections = [];
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].connections.length >= 6) break;
        const dx = nodes[i].origX - nodes[j].origX;
        const dy = nodes[i].origY - nodes[j].origY;
        const dz = nodes[i].origZ - nodes[j].origZ;
        const dist = Math.hypot(dx, dy, dz);

        if (dist < maxConnectDist) {
          nodes[i].connections.push({ target: j, dist });
        }
      }
    }
  }

  buildBrain();

  // --- INCOMING DATA STREAMLINES (Left to Brain) ---
  const streamlines = [
    { startX: -1.35, startY: -0.38, cp1X: -0.9, cp1Y: -0.35, cp2X: -0.65, cp2Y: -0.25, lobe: 'frontal' },
    { startX: -1.45, startY: -0.18, cp1X: -0.95, cp1Y: -0.15, cp2X: -0.60, cp2Y: -0.15, lobe: 'frontal' },
    { startX: -1.30, startY: 0.02, cp1X: -0.85, cp1Y: 0.05, cp2X: -0.55, cp2Y: 0.02, lobe: 'frontal' },
    { startX: -1.40, startY: 0.22, cp1X: -0.9, cp1Y: 0.25, cp2X: -0.5, cp2Y: 0.20, lobe: 'temporal' },
    { startX: -1.25, startY: 0.42, cp1X: -0.75, cp1Y: 0.48, cp2X: -0.35, cp2Y: 0.38, lobe: 'temporal' },
    { startX: -1.18, startY: 0.62, cp1X: -0.6, cp1Y: 0.68, cp2X: -0.12, cp2Y: 0.65, lobe: 'brainstem' }
  ];

  // Traveling streamline data pulses
  const streamPulses = [
    { lineIdx: 0, progress: 0.1, speed: 0.007 },
    { lineIdx: 0, progress: 0.6, speed: 0.008 },
    { lineIdx: 1, progress: 0.3, speed: 0.009 },
    { lineIdx: 1, progress: 0.8, speed: 0.007 },
    { lineIdx: 2, progress: 0.2, speed: 0.008 },
    { lineIdx: 2, progress: 0.7, speed: 0.009 },
    { lineIdx: 3, progress: 0.15, speed: 0.008 },
    { lineIdx: 3, progress: 0.65, speed: 0.007 },
    { lineIdx: 4, progress: 0.4, speed: 0.009 },
    { lineIdx: 5, progress: 0.5, speed: 0.008 }
  ];

  // Synaptic network traveling pulses
  const synapticPulses = [];
  for (let i = 0; i < 14; i++) {
    synapticPulses.push({
      nodeFrom: Math.floor(Math.random() * nodes.length),
      targetIdx: 0,
      progress: Math.random(),
      speed: 0.015 + Math.random() * 0.02
    });
  }

  // Interactive Ripple Disturbance Shockwaves
  const ripples = [];

  // Interaction State
  let mouse = { x: -1000, y: -1000, active: false };
  let angleX = 0;
  let angleY = 0;
  let targetAngleX = 0;
  let targetAngleY = 0;
  let hoveredNodeIdx = -1;

  // --- INTERACTION EVENT LISTENERS ---
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    // Subtle 3D perspective tilt
    const normX = (mouse.x - width / 2) / (width / 2);
    const normY = (mouse.y - height / 2) / (height / 2);
    targetAngleY = normX * 0.15;
    targetAngleX = -normY * 0.12;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
    targetAngleX = 0;
    targetAngleY = 0;
    hoveredNodeIdx = -1;
  });

  // Click creates expanding ripple disturbance
  canvas.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    ripples.push({
      x: clickX,
      y: clickY,
      radius: 0,
      maxRadius: Math.max(width, height) * 0.65,
      speed: 6.5,
      opacity: 1
    });

    // Excites immediate nearby nodes
    nodes.forEach(p => {
      const dist = Math.hypot(p.screenX - clickX, p.screenY - clickY);
      if (dist < 100) {
        p.energy = 1.2;
      }
    });
  });

  // Touch Support (mobile smooth interaction)
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
      const normX = (mouse.x - width / 2) / (width / 2);
      const normY = (mouse.y - height / 2) / (height / 2);
      targetAngleY = normX * 0.12;
      targetAngleX = -normY * 0.10;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.active = false;
    targetAngleX = 0;
    targetAngleY = 0;
  });

  // Link Process Badges Hover to excite corresponding lobes
  const badgeMap = {
    'data-collection': 'frontal',
    'model-training': 'parietal',
    'data-preprocessing': 'temporal',
    'machine-learning': 'occipital',
    'deep-learning': 'occipital',
    'prediction-insights': 'cerebellum'
  };

  document.querySelectorAll('.process-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      for (const [key, lobe] of Object.entries(badgeMap)) {
        if (badge.classList.contains(`badge-${key}`)) {
          nodes.forEach(p => {
            if (p.lobe === lobe || p.lobe === 'core') {
              p.energy = 1.0;
            }
          });
        }
      }
    });
  });

  // Cubic Bezier helper
  function getCubicBezierPoint(t, p0, p1, p2, p3) {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const xt = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const yt = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

    return { x: xt, y: yt };
  }

  // --- RENDER LOOP ---
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Dynamic sizing based on container
    const brainScale = Math.min(width * 0.44, height * 0.48);
    const centerX = width * 0.54;
    const centerY = height * 0.47;

    // Smooth 3D tilt interpolation
    if (!prefersReducedMotion) {
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;
    }

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const fov = 380;

    // Soft illuminated volumetric brain halo
    const brainGlow = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, brainScale * 0.95);
    brainGlow.addColorStop(0, 'rgba(14, 165, 233, 0.22)');
    brainGlow.addColorStop(0.4, 'rgba(99, 102, 241, 0.12)');
    brainGlow.addColorStop(0.8, 'rgba(56, 189, 248, 0.04)');
    brainGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = brainGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, brainScale * 0.95, 0, Math.PI * 2);
    ctx.fill();

    // Update Ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rip = ripples[i];
      rip.radius += rip.speed;
      rip.opacity = Math.max(0, 1 - rip.radius / rip.maxRadius);

      // Draw subtle ripple ring
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${rip.opacity * 0.25})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (rip.opacity <= 0) {
        ripples.splice(i, 1);
      }
    }

    // Project nodes to screen coordinates
    let closestDist = Infinity;
    hoveredNodeIdx = -1;

    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];

      // 3D rotation
      const x1 = p.origX * cosY + p.origZ * sinY;
      const z1 = p.origZ * cosY - p.origX * sinY;
      const y2 = p.origY * cosX - z1 * sinX;
      const z2 = z1 * cosX + p.origY * sinX;

      const pScale = fov / (fov + z2 * brainScale * 0.65);
      let sx = centerX + x1 * brainScale * pScale;
      let sy = centerY + y2 * brainScale * pScale;

      // Mouse interactive repulsion / attraction
      if (mouse.active) {
        const mdx = mouse.x - sx;
        const mdy = mouse.y - sy;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 100) {
          const force = (100 - mDist) / 100;
          p.vx -= (mdx / mDist) * force * 1.6;
          p.vy -= (mdy / mDist) * force * 1.6;
          p.energy = Math.max(p.energy, force * 0.7);

          if (mDist < closestDist) {
            closestDist = mDist;
            hoveredNodeIdx = i;
          }
        }
      }

      // Check active ripple wave impact on node
      ripples.forEach(rip => {
        const rDist = Math.hypot(sx - rip.x, sy - rip.y);
        if (Math.abs(rDist - rip.radius) < 18) {
          p.energy = Math.max(p.energy, rip.opacity);
        }
      });

      // Spring recovery
      p.vx *= 0.88;
      p.vy *= 0.88;
      sx += p.vx;
      sy += p.vy;

      p.screenX = sx;
      p.screenY = sy;
      p.zDepth = z2;
      p.projScale = pScale;

      // Energy decay
      p.energy *= 0.94;
      p.pulse += p.pulseSpeed;
    }

    // --- DRAW INCOMING DATA STREAMLINES ---
    streamlines.forEach((line, idx) => {
      const p0 = { x: centerX + line.startX * brainScale, y: centerY + line.startY * brainScale };
      const p1 = { x: centerX + line.cp1X * brainScale, y: centerY + line.cp1Y * brainScale };
      const p2 = { x: centerX + line.cp2X * brainScale, y: centerY + line.cp2Y * brainScale };
      // Target anchor node
      const p3 = { x: centerX + (line.cp2X + 0.18) * brainScale, y: centerY + line.cp2Y * brainScale };

      // Flowing streamline gradient
      const grad = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.02)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.18)');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0.28)');

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw traveling streamline pulses
      streamPulses.filter(sp => sp.lineIdx === idx).forEach(sp => {
        if (!prefersReducedMotion) {
          sp.progress += sp.speed;
          if (sp.progress > 1) sp.progress = 0;
        }

        const pt = getCubicBezierPoint(sp.progress, p0, p1, p2, p3);
        const pAlpha = Math.sin(sp.progress * Math.PI);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pAlpha * 0.9})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });

    // --- DRAW SYNAPTIC CONNECTION EDGES ---
    for (let i = 0; i < nodes.length; i++) {
      const p1 = nodes[i];
      const isHoveredNode = (i === hoveredNodeIdx);

      for (let c = 0; c < p1.connections.length; c++) {
        const j = p1.connections[c].target;
        const p2 = nodes[j];

        const avgDepth = (p1.zDepth + p2.zDepth) / 2; // -0.5 to 0.5
        const depthAlpha = Math.max(0.04, (avgDepth + 0.5) * 0.35);
        const energyAlpha = Math.max(p1.energy, p2.energy) * 0.6;
        const hoverAlpha = (isHoveredNode || j === hoveredNodeIdx) ? 0.7 : 0;

        const totalAlpha = Math.min(1, depthAlpha + energyAlpha + hoverAlpha);

        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);

        if (p1.energy > 0.3 || p2.energy > 0.3 || hoverAlpha > 0) {
          ctx.strokeStyle = `rgba(186, 230, 253, ${totalAlpha})`;
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = `rgba(56, 189, 248, ${totalAlpha * 0.55})`;
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
      }
    }

    // --- DRAW TRAVELING SYNAPTIC IMPULSES ---
    synapticPulses.forEach(sp => {
      const pFrom = nodes[sp.nodeFrom];
      if (!pFrom || !pFrom.connections.length) return;

      const conn = pFrom.connections[sp.targetIdx % pFrom.connections.length];
      if (!conn) return;

      const pTo = nodes[conn.target];
      if (!pTo) return;

      if (!prefersReducedMotion) {
        sp.progress += sp.speed;
        if (sp.progress >= 1) {
          sp.progress = 0;
          sp.nodeFrom = conn.target;
          sp.targetIdx = Math.floor(Math.random() * 5);
        }
      }

      const curX = pFrom.screenX + (pTo.screenX - pFrom.screenX) * sp.progress;
      const curY = pFrom.screenY + (pTo.screenY - pFrom.screenY) * sp.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // --- DRAW NODES (Back-to-Front simulation) ---
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      const depthFactor = (p.zDepth + 0.5); // 0 to 1
      const pulseVal = Math.sin(p.pulse) * 0.4 + 1;
      const nodeSize = (p.baseSize * p.projScale * pulseVal) + p.energy * 2.5;

      // Glow halo for nodes
      const haloAlpha = Math.max(0.12, (depthFactor * 0.35) + p.energy * 0.7);
      ctx.beginPath();
      ctx.arc(p.screenX, p.screenY, nodeSize * 2.2, 0, Math.PI * 2);

      if (p.energy > 0.4 || i === hoveredNodeIdx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${haloAlpha})`;
      } else if (p.lobe === 'occipital' || p.lobe === 'temporal') {
        ctx.fillStyle = `rgba(99, 102, 241, ${haloAlpha})`;
      } else {
        ctx.fillStyle = `rgba(56, 189, 248, ${haloAlpha})`;
      }
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(p.screenX, p.screenY, Math.max(1, nodeSize * 0.8), 0, Math.PI * 2);
      ctx.fillStyle = p.energy > 0.3 ? '#ffffff' : `rgba(240, 249, 255, ${Math.min(1, 0.6 + depthFactor * 0.4)})`;
      ctx.fill();

      // Active concentric pulse ring on hovered node
      if (i === hoveredNodeIdx) {
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, nodeSize * 3.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  render();
}

/* =========================================================================
   3. HERO BADGE TYPING MATRIX ENGINE
   ========================================================================= */
function initTypingBadge() {
  const target = document.querySelector('.hero-badge-text');
  if (!target) return;
  
  const keywords = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst"
  ];
  
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  
  function type() {
    const currentWord = keywords[wordIdx];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }
    
    let typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % keywords.length;
      typeSpeed = 400; // Pause before typing next word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  setTimeout(type, 1000);
}

/* =========================================================================
   4. SCROLL PROGRESS, STICKY NAV, REVEAL OBSERVERS
   ========================================================================= */
function initScrollEffects() {
  const header = document.querySelector('header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateScrollState() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Update scroll indicator bar
    if (progressBar) {
      progressBar.style.width = `${scrollPct}%`;
    }
    
    // Sticky navigation class
    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Active navigation state based on section viewport position
    let activeSec = "home";
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      if (scrollTop >= secTop - 200) {
        activeSec = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSec}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  // Scroll Reveal Animations Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // For skill bars, trigger percentage fill
        if (entry.target.classList.contains('skill-category-card')) {
          const bars = entry.target.querySelectorAll('.skill-progress-bar');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-scale, .reveal-slide-left, .reveal-slide-right, .stagger-container, .skill-category-card').forEach(el => {
    revealObserver.observe(el);
  });
}

/* =========================================================================
   5. MAGNETIC SPRING BUTTON ANIMATIONS
   ========================================================================= */
function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn, .c-btn, .social-icon-btn');
  
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      // Calculate cursor position relative to button center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element in cursor direction (35% magnetic pull)
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* =========================================================================
   6. RESPONSIVE MOBILE NAVIGATION
   ========================================================================= */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
    
    // Disable scroll when mobile menu is open
    if (nav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* =========================================================================
   7. DYNAMIC GITHUB REPOSITORY DETAILS FETCHING
   ========================================================================= */
function initDynamicGitHubRepos() {
  const projectCards = document.querySelectorAll('.project-card[data-repo]');
  
  projectCards.forEach(card => {
    const repoSlug = card.getAttribute('data-repo');
    if (!repoSlug) return;
    
    // Create elements to show stars & forks dynamically under the description
    const metaBlock = card.querySelector('.project-meta');
    if (!metaBlock) return;
    
    const statsContainer = document.createElement('div');
    statsContainer.className = 'project-git-stats';
    statsContainer.style.display = 'flex';
    statsContainer.style.gap = '12px';
    statsContainer.style.marginTop = '8px';
    statsContainer.style.fontFamily = 'var(--font-mono)';
    statsContainer.style.fontSize = '0.72rem';
    statsContainer.style.color = 'var(--text-secondary)';
    
    // Stars indicator template
    const starSpan = document.createElement('span');
    starSpan.style.display = 'flex';
    starSpan.style.alignItems = 'center';
    starSpan.style.gap = '4px';
    starSpan.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <span class="star-count">0</span>
    `;
    
    // Forks indicator template
    const forkSpan = document.createElement('span');
    forkSpan.style.display = 'flex';
    forkSpan.style.alignItems = 'center';
    forkSpan.style.gap = '4px';
    forkSpan.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
      <span class="fork-count">0</span>
    `;
    
    statsContainer.appendChild(starSpan);
    statsContainer.appendChild(forkSpan);
    
    // Insert after the title in project-card-content
    const cardTitle = card.querySelector('h3');
    if (cardTitle) {
      cardTitle.parentNode.insertBefore(statsContainer, cardTitle.nextSibling);
    }

    // Call GitHub REST API
    fetch(`https://api.github.com/repos/${repoSlug}`)
      .then(response => {
        if (!response.ok) throw new Error('Repository not found or rate limited');
        return response.json();
      })
      .then(data => {
        // Update stats
        statsContainer.querySelector('.star-count').textContent = `${data.stargazers_count} stars`;
        statsContainer.querySelector('.fork-count').textContent = `${data.forks_count} forks`;
        
        // Optionally update description with actual GitHub repo description if it exists
        if (data.description) {
          const descBlock = card.querySelector('.repo-desc');
          if (descBlock) {
            descBlock.textContent = data.description;
          }
        }
      })
      .catch(err => {
        console.warn(`GitHub API fallback for ${repoSlug}:`, err);
        // Fallback default displays
        statsContainer.querySelector('.star-count').textContent = `0 stars`;
        statsContainer.querySelector('.fork-count').textContent = `0 forks`;
      });
  });
}
