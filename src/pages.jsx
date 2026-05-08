import React from 'react'
import { BlurText, ArrowUpRight, PlayIcon, RevealOnScroll, GoldOrnament } from './components'

// ── Translations ──────────────────────────────────────────────────────────────
export const T = {
  es: {
    heroTitle: 'INVITAURA',
    heroTagline: 'Tu aura en cada detalle',
    heroSub: 'Invitaciones digitales únicas, escritas a mano en código. Cada evento merece su propia obra.',
    heroCta: 'Hablar por WhatsApp',
    heroScroll: 'Descubrir',
    philosophyTitle: 'La invitación es el primer latido de tu evento',
    philosophyText: 'No usamos plantillas. Cada invitación nace desde cero, con animaciones propias, música, contadores y experiencias que sorprenden.',
    eventsTitle: 'Para cada momento único',
    demoTitle: 'Nuestras Creaciones',
    demoSub: 'Cada demo es una experiencia real — tal como llegará a tus invitados.',
    demoNote: 'Demo interactiva — haz clic para explorar',
    pricingTitle: 'Elige tu experiencia',
    pricingSub: 'Cada paquete incluye diseño exclusivo, animaciones y entrega en 7 días hábiles.',
    aboutTitle: 'Hechos a código, no a plantillas',
    aboutText: 'Somos un estudio creativo de Jalisco, México, especializado en experiencias digitales para eventos. Creemos que cada celebración merece algo irrepetible.',
    aboutDiff: 'Diferenciador',
    aboutDiffText: 'Mientras otros venden plantillas, nosotros programamos cada invitación desde cero. El resultado: una experiencia que ningún otro tiene.',
    contactTitle: 'Hagamos algo memorable',
    contactSub: 'Cuéntanos de tu evento y te enviamos una cotización personalizada en menos de 24 horas.',
    contactName: 'Tu nombre',
    contactEmail: 'Correo electrónico',
    contactEvent: 'Tipo de evento',
    contactDate: 'Fecha del evento',
    contactMsg: 'Cuéntanos sobre tu evento',
    contactSend: 'Enviar por WhatsApp',
    contactOr: 'o escríbenos directamente',
    events: ['Bodas','XV Años','Bautizos','Graduaciones'],
    packages: [
      { name:'Esencia', price:'$1,500', tag:'MXN', features:['Diseño exclusivo','Animación de apertura','Cuenta regresiva','RSVP digital','Soporte 30 días'], highlight:false },
      { name:'Aura', price:'$2,500', tag:'MXN', features:['Todo en Esencia','Canvas de partículas','Música de fondo','Efecto parallax','Galería de fotos','Mapa interactivo'], highlight:true },
      { name:'Ritual', price:'$4,000', tag:'MXN', features:['Todo en Aura','Diseño 100% conceptual','Animaciones GSAP avanzadas','Sección de historia','Itinerario completo','Revisiones ilimitadas'], highlight:false },
    ],
    demos: [
      { title:'Boda Clásica', type:'Boda', desc:'Elegancia atemporal. Sello de cera, partículas doradas, cuenta regresiva y RSVP.' },
      { title:'XV Años', type:'XV Años', desc:'Magia y color. Efectos floreales, música, galería y mapa del venue.' },
      { title:'Bautizo', type:'Bautizo', desc:'Delicadeza celestial. Tonos suaves, filigrana ornamental y mensaje de amor.' },
      { title:'Graduación', type:'Graduación', desc:'Modernidad y logro. Tipografía bold, animaciones dinámicas, itinerario.' },
    ],
    pricingNote: '* Precios en MXN · IVA no incluido · Cotización personalizada disponible',
  },
  en: {
    heroTitle: 'INVITAURA',
    heroTagline: 'Your aura in every detail',
    heroSub: 'Unique digital invitations, handcrafted in code. Every event deserves its own masterpiece.',
    heroCta: 'Chat on WhatsApp',
    heroScroll: 'Discover',
    philosophyTitle: 'The invitation is the first heartbeat of your event',
    philosophyText: "We don't use templates. Every invitation is built from scratch with custom animations, music, countdowns, and experiences that astonish.",
    eventsTitle: 'For every unique moment',
    demoTitle: 'Our Creations',
    demoSub: 'Every demo is a real experience — exactly as your guests will receive it.',
    demoNote: 'Interactive demo — click to explore',
    pricingTitle: 'Choose your experience',
    pricingSub: 'Every package includes an exclusive design, animations, and delivery within 7 business days.',
    aboutTitle: 'Handcrafted in code, not templates',
    aboutText: 'We are a creative studio from Jalisco, Mexico, specializing in digital event experiences. We believe every celebration deserves something one-of-a-kind.',
    aboutDiff: 'Our Difference',
    aboutDiffText: 'While others sell templates, we code every invitation from scratch. The result: an experience no one else has.',
    contactTitle: "Let's make something memorable",
    contactSub: "Tell us about your event and we'll send a personalized quote in under 24 hours.",
    contactName: 'Your name',
    contactEmail: 'Email address',
    contactEvent: 'Event type',
    contactDate: 'Event date',
    contactMsg: 'Tell us about your event',
    contactSend: 'Send via WhatsApp',
    contactOr: 'or write to us directly',
    events: ['Weddings','Sweet 16','Baptisms','Graduations'],
    packages: [
      { name:'Essence', price:'$85', tag:'USD', features:['Exclusive design','Opening animation','Countdown timer','Digital RSVP','30-day support'], highlight:false },
      { name:'Aura', price:'$140', tag:'USD', features:['Everything in Essence','Particle canvas','Background music','Parallax effect','Photo gallery','Interactive map'], highlight:true },
      { name:'Ritual', price:'$225', tag:'USD', features:['Everything in Aura','100% conceptual design','Advanced GSAP animations','Story section','Full itinerary','Unlimited revisions'], highlight:false },
    ],
    demos: [
      { title:'Classic Wedding', type:'Wedding', desc:'Timeless elegance. Wax seal, golden particles, countdown, and RSVP.' },
      { title:'Sweet 16', type:'Sweet 16', desc:'Magic and color. Floral effects, music, gallery, and venue map.' },
      { title:'Baptism', type:'Baptism', desc:'Celestial delicacy. Soft tones, ornamental filigree, and a love message.' },
      { title:'Graduation', type:'Graduation', desc:'Modern achievement. Bold typography, dynamic animations, itinerary.' },
    ],
    pricingNote: '* Prices in USD · Taxes not included · Custom quotes available',
  },
}

// ── HomePage ──────────────────────────────────────────────────────────────────
export function HomePage({ lang, setPage, theme, feel = {}, phone }) {
  const t = T[lang]
  const isLight = theme === 'champagne'
  const fg = isLight ? '#1a1208' : '#F7F3E9'
  const gold = feel.gold || '#D4AF37'

  return (
    <div style={{ color: fg, minHeight:'100vh' }}>
      {/* Hero */}
      <section data-screen-label="01 Hero" style={{
        minHeight:'100vh', position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column', alignItems:'center',
        paddingTop:120, paddingBottom:32,
      }}>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:200,
          background:`linear-gradient(to bottom, transparent, rgba(10,8,4,0.6))`, zIndex:2, pointerEvents:'none' }}/>

        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'0 clamp(16px,4vw,48px)', textAlign:'center', maxWidth:900, zIndex:3, width:'100%' }}>

          {/* Badge */}
          <div className="liquid-glass soft-reveal" style={{
            borderRadius:9999, display:'inline-flex', alignItems:'center', gap:10,
            padding:'4px 14px 4px 4px', marginBottom:32, animationDelay:'0.4s',
          }}>
            <span className="font-body" style={{
              background:'#F7F3E9', color:'#0c0a06', borderRadius:9999,
              padding:'4px 10px', fontSize:11, fontWeight:600, letterSpacing:0.3,
            }}>{lang === 'es' ? 'Nuevo' : 'New'}</span>
            <span className="font-body" style={{ fontSize:13, color:'rgba(247,243,233,0.9)' }}>
              {lang === 'es' ? 'Demos interactivas en vivo · 2026' : 'Live interactive demos · 2026'}
            </span>
          </div>

          {/* Headline */}
          <BlurText
            text={lang === 'es' ? 'Tu evento merece ser inolvidable' : 'Your event deserves to be unforgettable'}
            className="font-heading"
            baseDelay={0.1}
            stagger={0.1}
            style={{
              fontStyle:'italic',
              fontSize:'clamp(48px, 9vw, 110px)',
              lineHeight:0.85, letterSpacing:'-0.04em',
              color:'#F7F3E9', maxWidth:840, marginBottom:20,
            }}
          />

          {/* Subhead */}
          <p className="soft-reveal font-body" style={{
            fontSize:16, color:'rgba(247,243,233,0.88)', fontWeight:300, lineHeight:1.45,
            maxWidth:560, margin:'8px 0 28px', animationDelay:'0.9s',
          }}>{t.heroSub}</p>

          {/* CTAs */}
          <div className="soft-reveal" style={{
            display:'flex', alignItems:'center', gap:24, marginBottom:48,
            animationDelay:'1.2s', flexWrap:'wrap', justifyContent:'center',
          }}>
            <button onClick={() => setPage('contact')} className="liquid-glass-strong font-body" style={{
              borderRadius:9999, border:'none', cursor:'pointer',
              padding:'12px 22px', color:'#F7F3E9', fontSize:14, fontWeight:500,
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
              {lang === 'es' ? 'Hablar por WhatsApp' : 'Chat on WhatsApp'} <ArrowUpRight size={18}/>
            </button>
            <button onClick={() => setPage('portfolio')} className="font-body" style={{
              background:'transparent', border:'none', cursor:'pointer',
              color:'#F7F3E9', fontSize:14, fontWeight:400,
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
              {lang === 'es' ? 'Ver demos' : 'View demos'} <PlayIcon size={12}/>
            </button>
          </div>

          {/* Value props — replacing fake stats */}
          <div className="soft-reveal" style={{
            display:'flex', alignItems:'stretch', gap:16, marginTop:8, animationDelay:'1.4s',
            flexWrap:'wrap', justifyContent:'center',
          }}>
            {[
              {
                icon:'clock',
                n: lang === 'es' ? '7 días' : '7 days',
                label: lang === 'es' ? 'Tiempo de entrega garantizado' : 'Guaranteed delivery time'
              },
              {
                icon:'code',
                n: '100%',
                label: lang === 'es' ? 'Código único, sin plantillas' : 'Unique code, no templates'
              },
            ].map((s, i) => (
              <div key={i} className="liquid-glass" style={{
                width:240, padding:20, borderRadius:20,
                display:'flex', flexDirection:'column', alignItems:'flex-start',
              }}>
                <div className="liquid-glass" style={{
                  width:36, height:36, borderRadius:10,
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18,
                }}>
                  {s.icon === 'clock' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F3E9" strokeWidth="1.6" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F3E9" strokeWidth="1.6" strokeLinecap="round">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                  )}
                </div>
                <span className="font-heading" style={{
                  fontStyle:'italic', fontSize:36, color:'#F7F3E9', lineHeight:0.9, letterSpacing:'-0.02em',
                }}>{s.n}</span>
                <span className="font-body" style={{
                  fontSize:11, color:'rgba(247,243,233,0.7)', fontWeight:300, marginTop:8, textAlign:'left',
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event type labels */}
        <div className="soft-reveal" style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:18,
          marginTop:64, paddingBottom:8, animationDelay:'1.55s', zIndex:3,
        }}>
          <div className="liquid-glass" style={{ borderRadius:9999, padding:'5px 14px' }}>
            <span className="font-body" style={{ fontSize:11, fontWeight:500, color:'rgba(247,243,233,0.85)' }}>
              {lang === 'es' ? 'Para los momentos más importantes de tu vida' : "For your life's most important moments"}
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:32, flexWrap:'wrap', justifyContent:'center', padding:'0 16px' }}>
            {[
              lang === 'es' ? 'Bodas' : 'Weddings',
              lang === 'es' ? 'XV Años' : 'Sweet 16',
              lang === 'es' ? 'Bautizos' : 'Baptisms',
              lang === 'es' ? 'Graduaciones' : 'Graduations',
              lang === 'es' ? 'Corporativo' : 'Corporate',
            ].map((name, i) => (
              <span key={i} className="font-heading" style={{
                fontStyle:'italic', fontSize:'clamp(18px, 3vw, 26px)', color:'#F7F3E9', letterSpacing:'-0.01em',
              }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section data-screen-label="02 Philosophy" style={{ padding:`${Math.round(120*(feel.spacing||1))}px clamp(16px,5vw,48px)`, maxWidth:900, margin:'0 auto', textAlign:'center', zIndex:1, position:'relative' }}>
        <RevealOnScroll>
          <div style={{ width:40, height:1, background:gold, margin:'0 auto 40px' }}/>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px, 4vw, 48px)',
            fontWeight:400, fontStyle:'italic', lineHeight:1.3, margin:'0 0 28px',
            color: isLight ? '#1a1208' : '#F7F3E9' }}>{t.philosophyTitle}</h2>
          <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:20, color: isLight ? '#555' : '#C8BFA8',
            lineHeight:1.8, maxWidth:640, margin:'0 auto' }}>{t.philosophyText}</p>
        </RevealOnScroll>
      </section>

      {/* Event types */}
      <section data-screen-label="03 Events" style={{ padding:`${Math.round(80*(feel.spacing||1))}px clamp(16px,3vw,24px) ${Math.round(120*(feel.spacing||1))}px`, maxWidth:1180, margin:'0 auto', zIndex:1, position:'relative' }}>
        <RevealOnScroll>
          <p className="font-body" style={{ fontSize:12, letterSpacing:3, color:'rgba(247,243,233,0.6)', textAlign:'center', marginBottom:14, textTransform:'uppercase' }}>
            {t.eventsTitle}
          </p>
          <h2 className="font-heading" style={{ fontStyle:'italic', fontSize:'clamp(28px, 5vw, 60px)', lineHeight:0.95, letterSpacing:'-0.03em', color:'#F7F3E9', textAlign:'center', marginBottom:56 }}>
            {lang === 'es' ? 'Para cada momento único' : 'For every unique moment'}
          </h2>
        </RevealOnScroll>
        <div style={{ display:'flex', alignItems:'stretch', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
          {t.events.map((ev, i) => {
            const icons = [
              <svg key="w" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F3E9" strokeWidth="1.6"><circle cx="9" cy="14" r="6"/><circle cx="15" cy="14" r="6"/><path d="M7 5l2 3M17 5l-2 3" strokeLinecap="round"/></svg>,
              <svg key="x" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F3E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18l2-9 4 5 3-9 3 9 4-5 2 9z"/><line x1="3" y1="21" x2="21" y2="21"/></svg>,
              <svg key="b" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F3E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11c4-6 11-7 18-4-3 5-8 7-12 7-3 0-5-1-6-3z"/><path d="M9 14c-1 2-1 4 0 6"/><circle cx="17" cy="8" r="0.6" fill="#F7F3E9"/></svg>,
              <svg key="g" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F3E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><line x1="22" y1="9" x2="22" y2="14"/></svg>,
            ]
            const subs = lang === 'es'
              ? ['Elegancia atemporal y emoción','Magia, color y celebración','Delicadeza y momentos sagrados','Logro y nuevos comienzos']
              : ['Timeless elegance and emotion','Magic, color and celebration','Delicacy and sacred moments','Achievement and new beginnings']
            return (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <div onClick={() => setPage('portfolio')} className="liquid-glass" style={{
                  width:240, padding:20, borderRadius:20, cursor:'pointer',
                  display:'flex', flexDirection:'column', alignItems:'flex-start',
                  transition:'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div className="liquid-glass" style={{
                    width:36, height:36, borderRadius:10,
                    display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18,
                  }}>{icons[i]}</div>
                  <span className="font-heading" style={{
                    fontStyle:'italic', fontSize:34, color:'#F7F3E9', lineHeight:0.9, letterSpacing:'-0.02em',
                  }}>{ev}</span>
                  <span className="font-body" style={{
                    fontSize:11, color:'rgba(247,243,233,0.7)', fontWeight:300, marginTop:8, textAlign:'left', lineHeight:1.4,
                  }}>{subs[i]}</span>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </section>
    </div>
  )
}

// ── PortfolioPage ─────────────────────────────────────────────────────────────
export function PortfolioPage({ lang, theme, feel = {}, phone }) {
  const t = T[lang]
  const isLight = theme === 'champagne'
  const fg = isLight ? '#1a1208' : '#F7F3E9'
  const gold = feel.gold || '#D4AF37'

  // ── URLs de demos reales — agrega la URL cuando el demo esté listo ──────────
  const demoUrls = [
    null,  // Boda Clásica   → ej: 'https://invitaura.com.mx/demos/boda'
    null,  // XV Años        → ej: 'https://invitaura.com.mx/demos/xv'
    null,  // Bautizo        → ej: 'https://invitaura.com.mx/demos/bautizo'
    null,  // Graduación     → ej: 'https://invitaura.com.mx/demos/graduacion'
  ]

  const [activeDemo, setActiveDemo] = React.useState(null)
  const [previewTab, setPreviewTab] = React.useState(0)
  const [tilt, setTilt] = React.useState({})

  const handleMouseMove = (e, i) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18
    setTilt(prev => ({ ...prev, [i]: { x, y } }))
  }
  const handleMouseLeave = (i) => setTilt(prev => ({ ...prev, [i]: { x:0, y:0 } }))

  const demoThemes = [
    { accent:'#D4AF37', accent2:'#F5E27A', icon:'◇' },
    { accent:'#E8A4B8', accent2:'#F5C8D6', icon:'✦' },
    { accent:'#A8CFDE', accent2:'#D4E8F0', icon:'☽' },
    { accent:'#C5D8A8', accent2:'#E0EBC8', icon:'✶' },
  ]

  const waMsg = encodeURIComponent(
    lang === 'es'
      ? `¡Hola Invitaura! Me interesa este diseño: `
      : `Hi Invitaura! I'm interested in this design: `
  )

  return (
    <div style={{ color:fg, minHeight:'100vh', paddingTop:140 }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(16px,4vw,36px) 120px' }}>
        {/* Header */}
        <RevealOnScroll>
          <div style={{ textAlign:'center', marginBottom:64 }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8, marginBottom:24,
              padding:'6px 14px 6px 6px', borderRadius:999,
              background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.08)',
              backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
            }}>
              <span style={{ background:`linear-gradient(135deg, ${gold}, #F5E27A)`,
                color:'#0c0a06', fontFamily:'Cinzel, serif', fontSize:9, fontWeight:600,
                padding:'3px 12px', borderRadius:999, letterSpacing:2 }}>PORTAFOLIO</span>
              <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:14, color:'rgba(247,243,233,0.7)' }}>
                {lang === 'es' ? '4 demos en vivo' : '4 live demos'}
              </span>
            </div>
            <h1 style={{ fontFamily:'Cinzel, serif',
              fontSize:'clamp(24px, 4vw, 52px)', fontWeight:400, letterSpacing:6, lineHeight:1.1,
              marginBottom:20, color:fg }}>
              {t.demoTitle}
            </h1>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:20, color: isLight ? '#555' : 'rgba(247,243,233,0.65)',
              maxWidth:520, margin:'0 auto', lineHeight:1.6 }}>
              {t.demoSub}
            </p>
          </div>
        </RevealOnScroll>

        {/* Demo grid — responsive via CSS class */}
        <div className="portfolio-grid">
          {t.demos.map((demo, i) => {
            const th = demoThemes[i]
            const t_ = tilt[i] || { x:0, y:0 }
            return (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <div
                  className="demo-card"
                  onMouseMove={e => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  onClick={() => setActiveDemo(i)}
                  style={{
                    background:`
                      radial-gradient(ellipse at top right, ${th.accent}25, transparent 55%),
                      radial-gradient(ellipse at bottom left, ${th.accent2}15, transparent 50%),
                      rgba(255,255,255,0.04)
                    `,
                    border:`1px solid rgba(255,255,255,0.08)`,
                    backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                    transform:`perspective(1000px) rotateX(${t_.y}deg) rotateY(${t_.x}deg)`,
                    transition: tilt[i] ? 'box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)' : 'transform 0.7s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: tilt[i]
                      ? `${-t_.x*2}px ${t_.y*2}px 50px rgba(0,0,0,0.5), 0 0 80px ${th.accent}25, inset 0 1px 0 rgba(255,255,255,0.1)`
                      : '0 12px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}>

                  {/* Big icon */}
                  <div style={{
                    position:'absolute', top:28, left:28,
                    width:54, height:54, borderRadius:14,
                    background:`linear-gradient(135deg, ${th.accent}40, ${th.accent}10)`,
                    border:`1px solid ${th.accent}50`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:24, color:th.accent,
                    boxShadow:`0 8px 24px ${th.accent}25`,
                  }}>{th.icon}</div>

                  {/* Type chip */}
                  <div style={{
                    position:'absolute', top:96, left:28,
                    fontFamily:'Cinzel, serif', fontSize:9, fontWeight:600,
                    color:th.accent, letterSpacing:2.5,
                    padding:'5px 12px', borderRadius:999,
                    background:`${th.accent}18`, border:`1px solid ${th.accent}40`,
                  }}>{demo.type.toUpperCase()}</div>

                  {/* Bottom content */}
                  <div style={{ position:'absolute', bottom:32, left:32, right:32 }}>
                    <h3 style={{
                      fontFamily:'Cinzel, serif',
                      fontSize:'clamp(18px, 2.6vw, 32px)', fontWeight:600, letterSpacing:3, lineHeight:1.15,
                      color:fg, margin:'0 0 14px',
                    }}>{demo.title}</h3>
                    <p style={{
                      fontFamily:'Cormorant Garamond, serif', fontSize:16, lineHeight:1.55,
                      color: isLight ? '#666' : 'rgba(247,243,233,0.7)',
                      margin:'0 0 22px', maxWidth:'88%',
                    }}>{demo.desc}</p>
                    <div style={{
                      display:'inline-flex', alignItems:'center', gap:8,
                      fontFamily:'Cinzel, serif', fontSize:10, fontWeight:600,
                      color:th.accent, letterSpacing:2.5,
                    }}>
                      {lang === 'es' ? 'Explorar demo' : 'Explore demo'}
                      <span style={{ display:'inline-flex', width:24, height:24, borderRadius:'50%',
                        alignItems:'center', justifyContent:'center',
                        background:`${th.accent}25`, fontSize:11 }}>→</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>

        {/* ── Sección Preview ── visible solo cuando hay al menos una URL de demo */}
        {demoUrls.some(u => u) && (
          <div style={{ marginTop:100 }}>
            <RevealOnScroll>
              <div style={{ textAlign:'center', marginBottom:48 }}>
                <div style={{ width:40, height:1, background:gold, margin:'0 auto 32px' }}/>
                <h2 style={{ fontFamily:'Cinzel, serif', fontSize:'clamp(20px,3vw,40px)',
                  fontWeight:400, letterSpacing:6, color:fg, marginBottom:16 }}>
                  {lang === 'es' ? 'PREVIEW EN VIVO' : 'LIVE PREVIEW'}
                </h2>
                <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:18,
                  color:'rgba(247,243,233,0.6)', maxWidth:480, margin:'0 auto' }}>
                  {lang === 'es'
                    ? 'Así verán tus invitados la invitación en su celular'
                    : 'This is how your guests will see the invitation on their phone'}
                </p>
              </div>
            </RevealOnScroll>

            {/* Tabs de selección */}
            <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:40, flexWrap:'wrap' }}>
              {t.demos.map((demo, i) => demoUrls[i] && (
                <button key={i} onClick={() => setPreviewTab(i)} style={{
                  fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:2,
                  padding:'10px 22px', borderRadius:9999, border:'none', cursor:'pointer',
                  background: previewTab === i ? demoThemes[i].accent : 'rgba(255,255,255,0.06)',
                  color: previewTab === i ? '#0c0a06' : 'rgba(247,243,233,0.7)',
                  transition:'all 0.25s',
                }}>{demo.type.toUpperCase()}</button>
              ))}
            </div>

            {/* Frame del celular con iframe */}
            {demoUrls[previewTab] && (
              <RevealOnScroll>
                <div style={{ display:'flex', justifyContent:'center' }}>
                  {/* Silueta de celular */}
                  <div style={{
                    width:320, background:'#111', borderRadius:44,
                    padding:'12px 10px',
                    boxShadow:`0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 2px #222`,
                    position:'relative',
                  }}>
                    {/* Notch */}
                    <div style={{
                      width:90, height:24, background:'#111', borderRadius:12,
                      margin:'0 auto 8px',
                      boxShadow:'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    }}/>
                    {/* Pantalla con iframe */}
                    <div style={{ borderRadius:28, overflow:'hidden', height:620, background:'#000' }}>
                      <iframe
                        src={demoUrls[previewTab]}
                        title={t.demos[previewTab].title}
                        style={{ width:'100%', height:'100%', border:'none' }}
                        loading="lazy"
                      />
                    </div>
                    {/* Home bar */}
                    <div style={{
                      width:100, height:4, background:'rgba(255,255,255,0.2)',
                      borderRadius:2, margin:'10px auto 0',
                    }}/>
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        )}
      </div>

      {/* Demo modal */}
      {activeDemo !== null && (
        <div onClick={() => setActiveDemo(null)} style={{
          position:'fixed', inset:0, zIndex:500,
          background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(8px)', padding:'16px',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width:'min(640px, 90vw)', borderRadius:24,
            background:`
              radial-gradient(ellipse at top, ${demoThemes[activeDemo].accent}25, transparent 60%),
              rgba(20,18,14,0.85)
            `,
            border:`1px solid ${demoThemes[activeDemo].accent}40`,
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            padding:'clamp(32px,5vw,56px)', textAlign:'center', position:'relative',
            boxShadow:`0 30px 80px rgba(0,0,0,0.6), 0 0 100px ${demoThemes[activeDemo].accent}20`,
          }}>
            <button onClick={() => setActiveDemo(null)} style={{
              position:'absolute', top:20, right:24, background:'none', border:'none',
              color:'#888', fontSize:24, cursor:'pointer', fontFamily:'serif',
            }}>×</button>
            <div style={{ fontSize:40, color:demoThemes[activeDemo].accent, marginBottom:16 }}>{demoThemes[activeDemo].icon}</div>
            <h2 style={{ fontFamily:'Cinzel, serif', fontSize:'clamp(18px,4vw,28px)', letterSpacing:4, color:'#F7F3E9', marginBottom:8 }}>
              {t.demos[activeDemo].title}
            </h2>
            <p style={{ fontFamily:'Great Vibes, cursive', fontSize:'clamp(20px,4vw,28px)', color:demoThemes[activeDemo].accent, marginBottom:28 }}>
              {lang === 'es' ? 'Próximamente disponible' : 'Coming soon'}
            </p>
            <div style={{ width:60, height:1, background:demoThemes[activeDemo].accent, margin:'0 auto 28px' }}/>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:17, color:'#C8BFA8', lineHeight:1.7, marginBottom:36 }}>
              {t.demos[activeDemo].desc}
            </p>
            <a
              href={`https://wa.me/${phone}?text=${waMsg}${encodeURIComponent(t.demos[activeDemo].title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:'inline-block',
                fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:3,
                padding:'14px 36px', background:demoThemes[activeDemo].accent,
                textDecoration:'none', color:'#0c0a06', cursor:'pointer',
              }}>{lang === 'es' ? 'SOLICITAR ESTE DISEÑO' : 'REQUEST THIS DESIGN'}</a>
          </div>
        </div>
      )}
    </div>
  )
}

// ── PricingPage ───────────────────────────────────────────────────────────────
export function PricingPage({ lang, theme, setPage, feel = {} }) {
  const t = T[lang]
  const isLight = theme === 'champagne'
  const fg = isLight ? '#1a1208' : '#F7F3E9'
  const gold = feel.gold || '#D4AF37'

  return (
    <div style={{ color:fg, minHeight:'100vh', paddingTop:140 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 clamp(16px,5vw,48px) 120px' }}>
        <RevealOnScroll>
          <div style={{ textAlign:'center', marginBottom:90 }}>
            <div style={{ width:40, height:1, background:gold, margin:'0 auto 32px' }}/>
            <h1 style={{ fontFamily:'Cinzel, serif', fontSize:'clamp(22px, 4vw, 52px)', fontWeight:400, letterSpacing:6, marginBottom:20 }}>
              {t.pricingTitle.toUpperCase()}
            </h1>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:19, color: isLight ? '#555' : '#C8BFA8', maxWidth:480, margin:'0 auto' }}>
              {t.pricingSub}
            </p>
          </div>
        </RevealOnScroll>

        {/* Pricing grid — responsive via CSS class */}
        <div className="pricing-grid">
          {t.packages.map((pkg, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>
              <div style={{
                padding:'52px clamp(20px,4vw,40px)',
                background: pkg.highlight
                  ? `linear-gradient(160deg, rgba(212,175,55,0.12), rgba(197,160,89,0.06))`
                  : isLight ? '#fff' : 'rgba(255,255,255,0.02)',
                border: pkg.highlight ? `1px solid ${gold}60` : isLight ? '1px solid #DDD5C0' : '1px solid rgba(255,255,255,0.06)',
                position:'relative',
                transition:'transform 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {pkg.highlight && (
                  <div style={{
                    position:'absolute', top:-1, left:'50%', transform:'translateX(-50%)',
                    background:gold, color:'#0c0a06', fontFamily:'Cinzel, serif',
                    fontSize:9, letterSpacing:3, padding:'5px 18px',
                  }}>{lang === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}</div>
                )}

                <div style={{ fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:4, color:gold, marginBottom:24 }}>
                  {pkg.name.toUpperCase()}
                </div>
                <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:8 }}>
                  <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px, 5vw, 64px)', fontWeight:300, color: pkg.highlight ? gold : fg, lineHeight:1 }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:2, color:'#888' }}>{pkg.tag}</span>
                </div>

                <div style={{ width:30, height:1, background:`${gold}50`, margin:'24px 0 28px' }}/>

                <ul style={{ listStyle:'none', padding:0, margin:'0 0 40px' }}>
                  {pkg.features.map((f, j) => (
                    <li key={j} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12,
                      fontFamily:'Cormorant Garamond, serif', fontSize:16, color: isLight ? '#444' : '#C8BFA8' }}>
                      <span style={{ color:gold, fontSize:12 }}>◇</span> {f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => setPage('contact')} style={{
                  width:'100%', padding:'14px', fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:3,
                  background: pkg.highlight ? gold : 'transparent',
                  border:`1px solid ${pkg.highlight ? gold : gold+'60'}`,
                  color: pkg.highlight ? '#0c0a06' : gold, cursor:'pointer', transition:'all 0.3s',
                }}
                  onMouseEnter={e => { if (!pkg.highlight) { e.currentTarget.style.background = `${gold}15` } }}
                  onMouseLeave={e => { if (!pkg.highlight) { e.currentTarget.style.background = 'transparent' } }}
                >{lang === 'es' ? 'ELEGIR ESTE PAQUETE' : 'CHOOSE THIS PACKAGE'}</button>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <p style={{ textAlign:'center', fontFamily:'Cormorant Garamond, serif', fontSize:15, color: isLight ? '#888' : '#666', marginTop:48 }}>
            {t.pricingNote}
          </p>
        </RevealOnScroll>
      </div>
    </div>
  )
}

// ── AboutPage ─────────────────────────────────────────────────────────────────
export function AboutPage({ lang, theme, setPage, feel = {} }) {
  const t = T[lang]
  const isLight = theme === 'champagne'
  const fg = isLight ? '#1a1208' : '#F7F3E9'
  const gold = feel.gold || '#D4AF37'

  const stats = [
    { n:'100%', l: lang === 'es' ? 'Código a mano' : 'Handcrafted code' },
    { n:'0',    l: lang === 'es' ? 'Plantillas usadas' : 'Templates used' },
    { n:'∞',    l: lang === 'es' ? 'Posibilidades' : 'Possibilities' },
  ]

  return (
    <div style={{ color:fg, minHeight:'100vh', paddingTop:140 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 clamp(16px,5vw,48px) 120px' }}>

        <RevealOnScroll>
          <div style={{ marginBottom:80 }}>
            <div style={{ width:40, height:1, background:gold, marginBottom:32 }}/>
            <h1 style={{ fontFamily:'Cinzel, serif', fontSize:'clamp(22px, 4vw, 52px)', fontWeight:400, letterSpacing:5, marginBottom:0, maxWidth:700 }}>
              {t.aboutTitle.toUpperCase()}
            </h1>
          </div>
        </RevealOnScroll>

        {/* Split layout — stacks on mobile */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:80, alignItems:'start', marginBottom:100 }}>
          <RevealOnScroll direction="left">
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:22, lineHeight:1.8, color: isLight ? '#444' : '#C8BFA8', marginBottom:40 }}>
              {t.aboutText}
            </p>
            <div style={{ padding:32, background: isLight ? '#fff' : 'rgba(212,175,55,0.05)', border:`1px solid ${gold}30` }}>
              <div style={{ fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:3, color:gold, marginBottom:16 }}>
                {t.aboutDiff.toUpperCase()}
              </div>
              <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:19, lineHeight:1.7, color: isLight ? '#444' : '#C8BFA8', margin:0 }}>
                {t.aboutDiffText}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.1}>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding:'40px', background: isLight ? '#fff' : 'rgba(255,255,255,0.02)',
                  border: isLight ? '1px solid #E8E0D0' : '1px solid rgba(255,255,255,0.05)',
                  display:'flex', alignItems:'center', gap:24,
                }}>
                  <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:56, fontWeight:300, color:gold, lineHeight:1 }}>{s.n}</span>
                  <span style={{ fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:3, color: isLight ? '#333' : '#C8BFA8' }}>{s.l.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div style={{ textAlign:'center', paddingTop:60, borderTop:`1px solid ${gold}20` }}>
            <p style={{ fontFamily:'Great Vibes, cursive', fontSize:'clamp(28px,5vw,42px)', color:gold, marginBottom:24 }}>
              {lang === 'es' ? '¿Listo para algo irrepetible?' : 'Ready for something unforgettable?'}
            </p>
            <button onClick={() => setPage('contact')} style={{
              fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:3, padding:'16px 48px',
              border:`1px solid ${gold}`, background:'transparent', color:gold, cursor:'pointer', transition:'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = '#0c0a06' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold }}
            >{lang === 'es' ? 'COTIZAR MI INVITACIÓN' : 'GET A QUOTE'}</button>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}

// ── ContactPage ───────────────────────────────────────────────────────────────
export function ContactPage({ lang, theme, feel = {}, phone }) {
  const t = T[lang]
  const isLight = theme === 'champagne'
  const fg = isLight ? '#1a1208' : '#F7F3E9'
  const gold = feel.gold || '#D4AF37'

  const [form, setForm] = React.useState({ name:'', email:'', eventType:'', date:'', msg:'' })
  const [sent, setSent] = React.useState(false)

  const eventOptions = {
    es: ['Boda','XV Años','Bautizo','Graduación','Cumpleaños','Evento corporativo','Otro'],
    en: ['Wedding','Sweet 16','Baptism','Graduation','Birthday','Corporate event','Other'],
  }[lang]

  const handleSend = () => {
    if (!form.name || !form.eventType) return
    const msg = lang === 'es'
      ? `Hola Invitaura! Soy ${form.name}. Quiero una invitación para: ${form.eventType}${form.date ? `, el ${form.date}` : ''}. ${form.msg}`
      : `Hi Invitaura! I'm ${form.name}. I'd like an invitation for: ${form.eventType}${form.date ? ` on ${form.date}` : ''}. ${form.msg}`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  const inputStyle = {
    width:'100%', padding:'16px 0', background:'transparent',
    border:'none', borderBottom: isLight ? '1px solid #C8BFA8' : '1px solid rgba(212,175,55,0.25)',
    color:fg, fontFamily:'Cormorant Garamond, serif', fontSize:18,
    outline:'none', boxSizing:'border-box', transition:'border-color 0.3s',
  }
  const labelStyle = {
    display:'block', fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:3,
    color:`${gold}90`, marginBottom:8, marginTop:36,
  }

  return (
    <div style={{ color:fg, minHeight:'100vh' }}>
      {/* Contact grid — responsive via CSS class */}
      <div className="contact-grid">
        {/* Left panel */}
        <div style={{
          background: isLight ? '#1a1208' : theme === 'midnight' ? '#0d1020' : '#080604',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'80px clamp(24px,6vw,80px)', textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          {[...Array(5)].map((_,i) => (
            <div key={i} style={{
              position:'absolute', borderRadius:'50%',
              width: 100 + i*100, height: 100 + i*100,
              border:`1px solid rgba(212,175,55,${0.08 - i*0.015})`,
              top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            }}/>
          ))}
          <div style={{ position:'relative', zIndex:1 }}>
            <GoldOrnament size={90} />
            <h2 style={{ fontFamily:'Cinzel, serif', fontSize:'clamp(18px, 3vw, 36px)', letterSpacing:6, color:'#F7F3E9', margin:'32px 0 16px' }}>
              {t.contactTitle.toUpperCase()}
            </h2>
            <div style={{ width:40, height:1, background:gold, margin:'0 auto 28px' }}/>
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:19, color:'#C8BFA8', lineHeight:1.7, maxWidth:340 }}>
              {t.contactSub}
            </p>
            <div style={{ marginTop:48, display:'flex', flexDirection:'column', gap:16 }}>
              {[['✉','contacto@invitaura.com.mx'],['📍','Jalisco, México'],['@','@invitaura']].map(([ic, val], i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, fontFamily:'Cormorant Garamond, serif', fontSize:16, color:'#C8BFA8' }}>
                  <span style={{ color:gold, fontSize:14 }}>{ic}</span>{val}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div style={{ padding:'clamp(100px,12vw,140px) clamp(24px,6vw,72px) 80px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {sent ? (
            <div style={{ textAlign:'center', paddingTop:40 }}>
              <div style={{ fontSize:48, color:gold, marginBottom:24 }}>✓</div>
              <h3 style={{ fontFamily:'Cinzel, serif', fontSize:22, letterSpacing:4, marginBottom:16 }}>
                {lang === 'es' ? '¡MENSAJE ENVIADO!' : 'MESSAGE SENT!'}
              </h3>
              <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:18, color: isLight ? '#555' : '#C8BFA8' }}>
                {lang === 'es' ? 'Te contactaremos en menos de 24 horas.' : "We'll contact you within 24 hours."}
              </p>
            </div>
          ) : (
            <div>
              <div style={{ width:40, height:1, background:gold, marginBottom:40 }}/>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:36, fontWeight:400, fontStyle:'italic', marginBottom:0 }}>
                {lang === 'es' ? 'Cuéntanos tu historia' : 'Tell us your story'}
              </h2>

              {[
                [t.contactName, 'name', 'text'],
                [t.contactEmail, 'email', 'email'],
                [t.contactDate, 'date', 'date'],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label style={labelStyle}>{label.toUpperCase()}</label>
                  <input type={type} value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = gold}
                    onBlur={e => e.target.style.borderColor = isLight ? '#C8BFA8' : 'rgba(212,175,55,0.25)'}
                  />
                </div>
              ))}

              <label style={labelStyle}>{t.contactEvent.toUpperCase()}</label>
              <select value={form.eventType} onChange={e => setForm(p => ({...p, eventType: e.target.value}))} style={{
                ...inputStyle, cursor:'pointer',
                WebkitAppearance:'none', appearance:'none',
              }}>
                <option value="">—</option>
                {eventOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>

              <label style={labelStyle}>{t.contactMsg.toUpperCase()}</label>
              <textarea value={form.msg} onChange={e => setForm(p => ({...p, msg: e.target.value}))}
                rows={3} style={{ ...inputStyle, resize:'none' }}
                onFocus={e => e.target.style.borderColor = gold}
                onBlur={e => e.target.style.borderColor = isLight ? '#C8BFA8' : 'rgba(212,175,55,0.25)'}
              />

              <button onClick={handleSend} style={{
                marginTop:40, width:'100%', padding:'18px',
                fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:3,
                background:gold, border:'none', color:'#0c0a06', cursor:'pointer', transition:'all 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#C5A059'}
                onMouseLeave={e => e.currentTarget.style.background = gold}
              >
                <span style={{ marginRight:10 }}>↗</span>{t.contactSend.toUpperCase()}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── DemoPage ──────────────────────────────────────────────────────────────────
export function DemoPage({ id, lang, setPage, feel = {} }) {
  const gold = feel.gold || '#D4AF37'

  const demoData = {
    boda:       { titleEs: 'Boda Clásica',  titleEn: 'Classic Wedding', accent: '#D4AF37', icon: '◇', descEs: 'Elegancia atemporal con sello de cera, partículas doradas y cuenta regresiva.', descEn: 'Timeless elegance with wax seal, golden particles and countdown.' },
    xv:         { titleEs: 'XV Años',       titleEn: 'Sweet 16',        accent: '#E8A4B8', icon: '✦', descEs: 'Magia y color. Efectos floreales, música y galería de fotos.', descEn: 'Magic and color. Floral effects, music and photo gallery.' },
    bautizo:    { titleEs: 'Bautizo',       titleEn: 'Baptism',         accent: '#A8CFDE', icon: '☽', descEs: 'Delicadeza celestial con tonos suaves y filigrana ornamental.', descEn: 'Celestial delicacy with soft tones and ornamental filigree.' },
    graduacion: { titleEs: 'Graduación',    titleEn: 'Graduation',      accent: '#C5D8A8', icon: '✶', descEs: 'Modernidad y logro. Tipografía bold y animaciones dinámicas.', descEn: 'Modern achievement. Bold typography and dynamic animations.' },
  }

  const demo = demoData[id] || demoData.boda
  const title = lang === 'es' ? demo.titleEs : demo.titleEn
  const desc  = lang === 'es' ? demo.descEs  : demo.descEn
  const accent = demo.accent

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(24px, 6vw, 80px)',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Back button */}
      <button
        onClick={() => setPage('portfolio')}
        style={{
          position: 'fixed', top: 24, left: 24, zIndex: 100,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(12,10,6,0.7)', backdropFilter: 'blur(12px)',
          border: `1px solid ${gold}30`, borderRadius: 9999,
          padding: '10px 20px', color: gold, cursor: 'pointer',
          fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 2,
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${gold}15`; e.currentTarget.style.borderColor = gold }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(12,10,6,0.7)'; e.currentTarget.style.borderColor = `${gold}30` }}
      >
        ← {lang === 'es' ? 'VOLVER' : 'BACK'}
      </button>

      {/* Icon */}
      <div style={{
        fontSize: 64, color: accent, marginBottom: 24,
        filter: `drop-shadow(0 0 24px ${accent}60)`,
        animation: 'spinSlow 12s linear infinite',
      }}>
        {demo.icon}
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'Cinzel, serif',
        fontSize: 'clamp(28px, 6vw, 56px)',
        letterSpacing: 6,
        color: '#F7F3E9',
        marginBottom: 16,
      }}>
        {title.toUpperCase()}
      </h1>

      {/* Coming soon badge */}
      <div className="liquid-glass" style={{
        borderRadius: 9999,
        padding: '6px 20px',
        marginBottom: 32,
        display: 'inline-block',
      }}>
        <span style={{
          fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 3,
          color: accent,
        }}>
          {lang === 'es' ? 'PRÓXIMAMENTE' : 'COMING SOON'}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(16px, 2.5vw, 22px)',
        color: 'rgba(247,243,233,0.65)',
        maxWidth: 500,
        lineHeight: 1.6,
        marginBottom: 48,
      }}>
        {desc}
      </p>

      {/* CTA */}
      <button
        onClick={() => setPage('contact')}
        style={{
          fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 3,
          background: gold, color: '#0c0a06', border: 'none',
          padding: '16px 36px', cursor: 'pointer', transition: 'background 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#C5A059'}
        onMouseLeave={e => e.currentTarget.style.background = gold}
      >
        {lang === 'es' ? 'COTIZAR ESTE ESTILO' : 'QUOTE THIS STYLE'}
      </button>
    </div>
  )
}
