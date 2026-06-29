document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initHeroCanvas();
  initTypingBadge();
  initScrollEffects();
  initMagneticButtons();
  initMobileMenu();
  initDynamicGitHubRepos();
});

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
  const maxParticles = Math.min(100, Math.floor((width * height) / 15000));
  const connectionDistance = 120;
  
  let mouse = { x: null, y: null, active: false };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2 + 1;
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
        if (dist < 200) {
          const force = (200 - dist) / 2000;
          this.x -= dx * force;
          this.y -= dy * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
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
          const alpha = (1 - dist / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
          ctx.lineWidth = 1;
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
   2. HERO 3D NEURAL SPHERE ILLUSTRATION
   ========================================================================= */
function initHeroCanvas() {
  const canvas = document.getElementById('neural-mesh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = canvas.parentElement.clientWidth;
  let height = canvas.height = canvas.parentElement.clientHeight || 450;

  let points = [];
  const totalPoints = 50;
  const sphereRadius = Math.min(width, height) * 0.35;
  const focus = 400;

  let angleX = 0.003;
  let angleY = 0.004;

  let mouseOffset = { x: 0, y: 0 };
  
  // Generate points evenly distributed on a sphere (Fibonacci lattice)
  for (let i = 0; i < totalPoints; i++) {
    const phi = Math.acos(-1 + (2 * i) / totalPoints);
    const theta = Math.sqrt(totalPoints * Math.PI) * phi;
    
    points.push({
      x: sphereRadius * Math.sin(phi) * Math.cos(theta),
      y: sphereRadius * Math.sin(phi) * Math.sin(theta),
      z: sphereRadius * Math.cos(phi),
      pulse: Math.random() * Math.PI
    });
  }

  function rotateX(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y1 = p.y * cos - p.z * sin;
    const z1 = p.z * cos + p.y * sin;
    p.y = y1;
    p.z = z1;
  }

  function rotateY(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x1 = p.x * cos - p.z * sin;
    const z1 = p.z * cos + p.x * sin;
    p.x = x1;
    p.z = z1;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Apply incremental rotation + mouse feedback
    const currAngleX = angleX + mouseOffset.y * 0.0001;
    const currAngleY = angleY + mouseOffset.x * 0.0001;
    
    // Project points
    const projected = points.map(p => {
      rotateX(p, currAngleX);
      rotateY(p, currAngleY);
      
      p.pulse += 0.03;
      
      const scale = focus / (focus + p.z);
      const x2d = p.x * scale + width / 2;
      const y2d = p.y * scale + height / 2;
      
      return { x: x2d, y: y2d, z: p.z, scale, pulse: p.pulse };
    });

    // Sort projected points by Z to draw back-to-front (depth buffer simulation)
    projected.sort((a, b) => b.z - a.z);

    // Draw lines between near neighbors
    for (let i = 0; i < projected.length; i++) {
      const p1 = projected[i];
      let connections = 0;
      for (let j = i + 1; j < projected.length; j++) {
        if (connections > 3) break; // Limit lines per node for cleaner visuals
        const p2 = projected[j];
        
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 100) {
          connections++;
          // Fade connections based on depth (z coordinate) and distance
          const depthAlpha = (p1.z + p2.z) / (sphereRadius * 2); // -0.5 to 0.5
          const alpha = Math.max(0.02, (1 - dist / 100) * (0.35 + depthAlpha * 0.3));
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    projected.forEach(p => {
      // Pulsing node glow
      const pulseVal = Math.sin(p.pulse) * 1.5 + 2.5;
      const depthAlpha = (p.z + sphereRadius) / (sphereRadius * 2); // 0 to 1
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseVal * p.scale, 0, Math.PI * 2);
      
      // Node color maps depending on depth
      const r = Math.floor(79 + (6 - 79) * depthAlpha);
      const g = Math.floor(70 + (182 - 70) * depthAlpha);
      const b = Math.floor(229 + (212 - 229) * depthAlpha);
      
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.4 + depthAlpha * 0.5})`;
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.scale * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + width / 2;
    const cy = rect.top + height / 2;
    mouseOffset.x = e.clientX - cx;
    mouseOffset.y = e.clientY - cy;
  });

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 450;
  });

  animate();
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
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  // Track scrolling details
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Update scroll indicator bar
    if (progressBar) {
      progressBar.style.width = `${scrollPct}%`;
    }
    
    // Sticky navigation class
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Active navigation state based on section viewport position
    let activeSec = "";
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.clientHeight;
      if (scrollTop >= secTop - 150) {
        activeSec = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSec}`) {
        link.classList.add('active');
      }
    });
  });

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
