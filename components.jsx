// components.jsx — shared components for Invitaura

// ── ParticleCanvas ──────────────────────────────────────────────────────────
function ParticleCanvas({ colors = ['#D4AF37','#C5A059','#F7F3E9'], count = 110, mode = 'ember' }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const mkParticle = (w, h, atTop = false) => {
      if (mode === 'rain') return {
        x: Math.random() * w, y: atTop ? Math.random() * -200 : Math.random() * h,
        vx: (Math.random() - 0.3) * 0.6, vy: Math.random() * 4 + 2.5,
        size: Math.random() * 1.4 + 0.3, opacity: Math.random() * 0.45 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.018, life: 0, maxLife: 9999,
      };
      if (mode === 'constellation') return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
        size: Math.random() * 1.8 + 0.5, opacity: Math.random() * 0.55 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2, wobbleSpeed: Math.random() * 0.006 + 0.002,
        life: 0, maxLife: 99999,
      };
      // ember
      return {
        x: Math.random() * w, y: Math.random() * h + h,
        vx: (Math.random() - 0.5) * 0.4, vy: -(Math.random() * 0.6 + 0.15),
        size: Math.random() * 2.2 + 0.4, opacity: Math.random() * 0.55 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2, wobbleSpeed: Math.random() * 0.025 + 0.01,
        life: Math.random() * 120, maxLife: Math.random() * 180 + 80,
      };
    };

    let particles = Array.from({ length: count }, () => mkParticle(canvas.width, canvas.height));
    if (mode === 'ember') particles.forEach(p => { p.y = Math.random() * canvas.height; });

    let mx = -1000, my = -1000;
    const onMouse = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Constellation lines pass
      if (mode === 'constellation') {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d < 140) {
              ctx.save();
              ctx.globalAlpha = (1 - d / 140) * 0.16;
              ctx.strokeStyle = colors[0];
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      particles.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * (mode === 'constellation' ? 0.08 : mode === 'rain' ? 0.15 : 0.35);
        p.y += p.vy;
        p.life++;

        if (mode === 'constellation') {
          if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        } else if (mode === 'rain') {
          if (p.y > canvas.height + 20) Object.assign(p, mkParticle(canvas.width, canvas.height, true));
        } else {
          // ember: mouse repulsion
          const dx = p.x - mx, dy = p.y - my;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 80) { p.x += (dx/d)*2; p.y += (dy/d)*2; }
          if (p.y < -20 || p.life > p.maxLife) {
            Object.assign(p, mkParticle(canvas.width, canvas.height));
            p.y = canvas.height + 10;
          }
        }

        const fi = mode === 'constellation' ? 1 : Math.min(p.life / 40, 1);
        const fo = mode === 'constellation' ? 1 : Math.min((p.maxLife - p.life) / 40, 1);
        const alpha = p.opacity * Math.min(fi, fo);
        ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [colors.join(','), count, mode]);

  return React.createElement('canvas', {
    ref: canvasRef,
    style: { position:'fixed', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }
  });
}

// ── CustomCursor ─────────────────────────────────────────────────────────────
function CustomCursor({ color = '#D4AF37' }) {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  React.useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0;
    let hovered = false;
    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = mx+'px'; dotRef.current.style.top = my+'px'; }
    };
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    let raf;
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx+'px';
        ringRef.current.style.top = ry+'px';
        const s = hovered ? 1.8 : 1;
        ringRef.current.style.transform = `translate(-50%,-50%) scale(${s})`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);
  return (
    <React.Fragment>
      <div ref={dotRef} style={{ position:'fixed', width:7, height:7, borderRadius:'50%',
        background:color, transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:9999 }} />
      <div ref={ringRef} style={{ position:'fixed', width:38, height:38, borderRadius:'50%',
        border:`1.5px solid ${color}55`, transform:'translate(-50%,-50%)',
        pointerEvents:'none', zIndex:9998, transition:'transform 0.25s' }} />
    </React.Fragment>
  );
}

// ── WhatsAppBtn ───────────────────────────────────────────────────────────────
function WhatsAppBtn({ lang = 'es' }) {
  const label = lang === 'en' ? 'WhatsApp' : 'WhatsApp';
  const msg = encodeURIComponent(lang === 'en'
    ? 'Hi! I want to learn more about Invitaura digital invitations.'
    : '¡Hola! Me gustaría saber más sobre las invitaciones digitales de Invitaura.');
  const [hov, setHov] = React.useState(false);
  return (
    <a href={`https://wa.me/5213322244222?text=${msg}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position:'fixed', bottom:28, right:28, zIndex:1000,
        display:'flex', alignItems:'center', gap:10,
        background: hov ? '#1ab956' : '#25D366',
        color:'#fff', padding:'13px 22px', borderRadius:50,
        textDecoration:'none', fontSize:13, letterSpacing:1.5,
        fontFamily:'Cinzel, serif',
        boxShadow: hov ? '0 6px 28px rgba(37,211,102,0.55)' : '0 4px 20px rgba(37,211,102,0.35)',
        transition:'all 0.3s',
      }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {label}
    </a>
  );
}

// ── BlurText (word-by-word blur reveal) ──────────────────────────────────────
function BlurText({ text, className = '', baseDelay = 0, stagger = 0.1, style = {} }) {
  const words = text.split(' ');
  return (
    <p className={className} style={{
      display:'flex', flexWrap:'wrap', justifyContent:'center', rowGap:'0.1em', margin:0, ...style,
    }}>
      {words.map((w, i) => (
        <span key={i} className="blur-word" style={{ animationDelay: `${baseDelay + i * stagger}s` }}>{w}</span>
      ))}
    </p>
  );
}

// ── ArrowUpRight icon ────────────────────────────────────────────────────────
function ArrowUpRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
    </svg>
  );
}
function PlayIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
  );
}

// ── NavBar (liquid-glass pills, Securify/Invitaura hybrid) ───────────────────
function NavBar({ page, setPage, lang, setLang, theme }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const items = {
    es: [['home','Inicio'],['portfolio','Demos'],['pricing','Precios'],['about','Nosotros'],['contact','Contacto']],
    en: [['home','Home'],['portfolio','Demos'],['pricing','Pricing'],['about','About'],['contact','Contact']],
  }[lang];

  const ctaLabel = lang === 'es' ? 'Reserva tu lugar' : 'Claim a Spot';

  return (
    <nav style={{
      position:'fixed', top:16, left:0, right:0, zIndex:100,
      padding:'0 32px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
    }}>
      {/* Left — logo orb */}
      <div onClick={() => setPage('home')} className="liquid-glass" style={{
        width:48, height:48, borderRadius:9999, cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)' : 'inset 0 1px 1px rgba(255,255,255,0.1)',
        transition:'box-shadow 0.4s',
      }}>
        <span className="font-heading" style={{
          fontStyle:'italic', fontSize:30, color:'#F7F3E9', lineHeight:1, letterSpacing:'-0.02em',
          marginTop:-2,
        }}>a</span>
      </div>

      {/* Center pill — desktop */}
      <div className="liquid-glass" style={{
        borderRadius:9999, padding:'6px 6px 6px 6px',
        display:'flex', alignItems:'center', gap:0,
      }}>
        {items.map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)} className="font-body" style={{
            background:'transparent', border:'none', cursor:'pointer',
            fontSize:13, fontWeight:500, color: page === id ? '#0c0a06' : 'rgba(247,243,233,0.9)',
            backgroundColor: page === id ? '#F7F3E9' : 'transparent',
            padding:'8px 16px', borderRadius:9999, transition:'all 0.25s', whiteSpace:'nowrap',
          }}
            onMouseEnter={e => { if (page !== id) e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { if (page !== id) e.currentTarget.style.color = 'rgba(247,243,233,0.9)'; }}
          >{label}</button>
        ))}
        <button onClick={() => setPage('contact')} className="font-body" style={{
          background:'#F7F3E9', border:'none', borderRadius:9999, cursor:'pointer',
          fontSize:13, fontWeight:500, color:'#0c0a06',
          padding:'8px 14px 8px 18px', marginLeft:6,
          display:'inline-flex', alignItems:'center', gap:6, whiteSpace:'nowrap',
        }}>
          {ctaLabel} <ArrowUpRight size={14}/>
        </button>
      </div>

      {/* Right — language toggle */}
      <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="liquid-glass font-body" style={{
        width:48, height:48, borderRadius:9999, cursor:'pointer',
        background:'rgba(255,255,255,0.01)', border:'none',
        fontSize:11, fontWeight:600, color:'#F7F3E9', letterSpacing:1,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>{lang === 'es' ? 'EN' : 'ES'}</button>
    </nav>
  );
}

// ── RevealOnScroll ────────────────────────────────────────────────────────────
function RevealOnScroll({ children, delay = 0, direction = 'up', distance = 28 }) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const from = direction === 'up' ? `translate3d(0,${distance}px,0)` :
               direction === 'left' ? `translate3d(-${distance}px,0,0)` :
               `translate3d(${distance}px,0,0)`;
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate3d(0,0,0)' : from,
      filter: vis ? 'blur(0)' : 'blur(6px)',
      willChange: 'opacity, transform, filter',
      transition: `opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, filter 0.9s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ── GoldOrnament (logo mark) ─────────────────────────────────────────────────
function GoldOrnament({ size = 80, animate = false }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 100 85" style={animate ? { animation:'spinSlow 20s linear infinite' } : {}}>
      <defs>
        <radialGradient id="goldGrad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#F5E27A"/>
          <stop offset="100%" stopColor="#B8960A"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="55" rx="46" ry="20" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.9"/>
      <ellipse cx="50" cy="45" rx="14" ry="38" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="50" cy="9" r="3.5" fill="#D4AF37"/>
      <circle cx="50" cy="9" r="8" fill="#D4AF3725"/>
      <circle cx="50" cy="9" r="14" fill="#D4AF3710"/>
    </svg>
  );
}

// ── SplitText (char by char reveal) ──────────────────────────────────────────
function SplitText({ text, style = {}, charStyle = {}, stagger = 0.04, delay = 0 }) {
  return (
    <span style={{ display:'inline-block', ...style }}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{
          display:'inline-block',
          animation: `charReveal 0.6s ease both`,
          animationDelay: `${delay + i * stagger}s`,
          ...charStyle,
        }}>{ch === ' ' ? '\u00A0' : ch}</span>
      ))}
    </span>
  );
}

// ── BackgroundFX ─────────────────────────────────────────────────────────────
// Three atmospheres that warm up the site. All sit at z-index 0, behind everything.
function BackgroundFX({ mode = 'aurora', theme = 'oscuro' }) {
  const isLight = theme === 'champagne';
  if (isLight || mode === 'none') return null;

  // ── Brasa: warm radial gradients from corners, breathing pulse ──
  if (mode === 'brasa') {
    return (
      <React.Fragment>
        <style>{`
          @keyframes brasaBreathe {
            0%, 100% { opacity: 0.85; transform: scale(1); }
            50%      { opacity: 1;    transform: scale(1.04); }
          }
        `}</style>
        <div style={{
          position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
          background: `
            radial-gradient(ellipse 60% 50% at 8% 92%,  rgba(120, 28, 38, 0.55), transparent 60%),
            radial-gradient(ellipse 55% 45% at 92% 12%, rgba(212, 145, 40, 0.42), transparent 60%),
            radial-gradient(ellipse 70% 55% at 95% 95%, rgba(80, 22, 40, 0.45), transparent 65%),
            radial-gradient(ellipse 50% 40% at 12% 18%, rgba(160, 90, 30, 0.32), transparent 60%),
            radial-gradient(circle at 50% 50%, #1a0d10 0%, #0a0608 70%)
          `,
          animation: 'brasaBreathe 9s ease-in-out infinite',
        }}/>
        {/* film grain overlay */}
        <div style={{
          position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.18, mixBlendMode:'overlay',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='5'/><feColorMatrix values='0 0 0 0 0.85  0 0 0 0 0.7  0 0 0 0 0.3  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}/>
      </React.Fragment>
    );
  }

  // ── Aurora: slowly morphing color mesh ──
  if (mode === 'aurora') {
    return (
      <React.Fragment>
        <style>{`
          @keyframes auroraDrift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(8vw,-6vh) scale(1.15); } }
          @keyframes auroraDrift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-10vw,6vh) scale(1.2); } }
          @keyframes auroraDrift3 { 0%,100% { transform: translate(0,0) scale(1.05); } 50% { transform: translate(6vw,8vh) scale(0.95); } }
          @keyframes auroraDrift4 { 0%,100% { transform: translate(0,0) scale(0.95); } 50% { transform: translate(-7vw,-7vh) scale(1.1); } }
        `}</style>
        {/* base */}
        <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
          background:'radial-gradient(circle at 50% 50%, #15090e 0%, #0a0608 75%)' }}/>
        {/* color blobs */}
        <div style={{
          position:'fixed', top:'-15%', left:'-10%', width:'70vw', height:'70vw', zIndex:0, pointerEvents:'none',
          background:'radial-gradient(circle, rgba(212,175,55,0.32), transparent 65%)',
          filter:'blur(40px)', animation:'auroraDrift1 18s ease-in-out infinite',
        }}/>
        <div style={{
          position:'fixed', bottom:'-20%', right:'-15%', width:'75vw', height:'75vw', zIndex:0, pointerEvents:'none',
          background:'radial-gradient(circle, rgba(124, 36, 70, 0.42), transparent 65%)',
          filter:'blur(40px)', animation:'auroraDrift2 22s ease-in-out infinite',
        }}/>
        <div style={{
          position:'fixed', top:'30%', right:'-10%', width:'55vw', height:'55vw', zIndex:0, pointerEvents:'none',
          background:'radial-gradient(circle, rgba(78, 32, 88, 0.38), transparent 65%)',
          filter:'blur(40px)', animation:'auroraDrift3 25s ease-in-out infinite',
        }}/>
        <div style={{
          position:'fixed', bottom:'10%', left:'-15%', width:'60vw', height:'60vw', zIndex:0, pointerEvents:'none',
          background:'radial-gradient(circle, rgba(180, 90, 40, 0.30), transparent 65%)',
          filter:'blur(40px)', animation:'auroraDrift4 20s ease-in-out infinite',
        }}/>
        {/* grain */}
        <div style={{
          position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.12, mixBlendMode:'overlay',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}/>
      </React.Fragment>
    );
  }

  // ── Catedral: top spotlight + slow rotating gold light rays ──
  if (mode === 'catedral') {
    return (
      <React.Fragment>
        <style>{`
          @keyframes raySweep1 { from { transform: translate(-50%, 0) rotate(-12deg); } to { transform: translate(-50%, 0) rotate(8deg); } }
          @keyframes raySweep2 { from { transform: translate(-50%, 0) rotate(15deg); }  to { transform: translate(-50%, 0) rotate(-5deg); } }
          @keyframes raySweep3 { from { transform: translate(-50%, 0) rotate(-3deg); }  to { transform: translate(-50%, 0) rotate(18deg); } }
        `}</style>
        {/* deep wine base */}
        <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
          background:`
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212, 175, 55, 0.20), transparent 60%),
            radial-gradient(ellipse 100% 80% at 50% 110%, rgba(60, 18, 30, 0.55), transparent 70%),
            linear-gradient(to bottom, #1c0a14, #0c0608 60%, #060304)
          ` }}/>

        {/* light rays from top */}
        {[
          { left:'42%', w:'180px',  duration:'14s', anim:'raySweep1', op:0.16 },
          { left:'50%', w:'120px',  duration:'18s', anim:'raySweep2', op:0.22 },
          { left:'58%', w:'200px',  duration:'16s', anim:'raySweep3', op:0.13 },
        ].map((r, i) => (
          <div key={i} style={{
            position:'fixed', top:0, left:r.left, width:r.w, height:'100vh', zIndex:0, pointerEvents:'none',
            background:`linear-gradient(to bottom, rgba(245, 226, 122, ${r.op}) 0%, rgba(212,175,55,${r.op*0.5}) 30%, transparent 75%)`,
            transformOrigin:'top center', filter:'blur(8px)',
            animation:`${r.anim} ${r.duration} ease-in-out infinite alternate`,
          }}/>
        ))}

        {/* central spotlight halo */}
        <div style={{
          position:'fixed', top:'-20vh', left:'50%', transform:'translateX(-50%)',
          width:'80vw', height:'80vh', zIndex:0, pointerEvents:'none',
          background:'radial-gradient(ellipse, rgba(245, 226, 122, 0.18), transparent 60%)',
          filter:'blur(30px)',
        }}/>

        {/* grain */}
        <div style={{
          position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.13, mixBlendMode:'overlay',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' seed='3'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}/>
      </React.Fragment>
    );
  }

  return null;
}

Object.assign(window, { ParticleCanvas, CustomCursor, WhatsAppBtn, NavBar, RevealOnScroll, GoldOrnament, SplitText, BackgroundFX, BlurText, ArrowUpRight, PlayIcon });
