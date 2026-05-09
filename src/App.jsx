import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { BackgroundFX, ParticleCanvas, CustomCursor, NavBar, WhatsAppBtn, GoldOrnament } from './components'
import { HomePage, PortfolioPage, PricingPage, AboutPage, ContactPage, DemoPage } from './pages'
import { BodaDemo } from './demos/BodaDemo'
import { GeneradorBoda } from './generador/GeneradorBoda'

// ── Número de WhatsApp — actualizar aquí ──────────────────────────────────────
const WHATSAPP_PHONE = '5213322244222'

const TWEAK_DEFAULTS = {
  theme: 'midnight',
  ambiente: 'ceremonial',
  auraLevel: 3,
  particleMode: 'constellation',
  atmosfera: 'aurora',
  lang: 'es',
}

function computeFeel(tweaks) {
  const goldByLevel = {
    1: '#6B5516', 2: '#9E7D20', 3: '#D4AF37', 4: '#EAC94E', 5: '#FFE566',
  }
  return {
    gold: goldByLevel[tweaks.auraLevel] || '#D4AF37',
    spacing: tweaks.ambiente === 'intimo' ? 0.7 : tweaks.ambiente === 'vanguardista' ? 1.35 : 1.0,
    glow: tweaks.auraLevel >= 4,
  }
}

// Sube al tope al cambiar de ruta
function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Extrae la página activa del pathname para el NavBar
function getActivePage(pathname) {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/demos')) return 'portfolio'
  return pathname.slice(1)
}

function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS)
  const navigate = useNavigate()
  const location = useLocation()

  const lang = tweaks.lang
  const setLang = (l) => setTweaks(p => ({ ...p, lang: l }))
  const theme = tweaks.theme
  const isLight = theme === 'champagne'
  const feel = computeFeel(tweaks)

  // Transición de página
  const [transitioning, setTransitioning] = React.useState(false)
  const prevPath = React.useRef(location.pathname)
  React.useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setTransitioning(true)
      const t = setTimeout(() => setTransitioning(false), 350)
      prevPath.current = location.pathname
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  const setPage = (page) => navigate(page === 'home' ? '/' : `/${page}`)

  const particleColors = {
    oscuro:    ['#D4AF37', '#C5A059', '#F5E27A', '#B8960A'],
    midnight:  ['#8B9FD4', '#6B7FBF', '#D4AF37', '#C5A059'],
    champagne: ['#D4AF37', '#C5A059', '#B8960A'],
  }[theme] || ['#D4AF37', '#C5A059']

  const tintedColors = tweaks.auraLevel !== 3
    ? [feel.gold, ...particleColors.slice(1)]
    : particleColors

  const showParticles = tweaks.particleMode !== 'none' && theme !== 'champagne'
  const activePage = getActivePage(location.pathname)
  const isDemoRoute = location.pathname.startsWith('/demos/') || location.pathname.startsWith('/generador/')

  const pageProps = { lang, setPage, theme, feel, phone: WHATSAPP_PHONE }

  const socialLinks = {
    Instagram: 'https://instagram.com/invitaura',
    TikTok: 'https://tiktok.com/@invitaura',
    Facebook: 'https://facebook.com/invitaura',
  }

  return (
    <div style={{ position:'relative', minHeight:'100vh', cursor:'none' }}>
      {feel.glow && (
        <style>{`
          [data-glow] { filter: drop-shadow(0 0 18px ${feel.gold}70) !important; }
          h2, h3 { text-shadow: 0 0 30px ${feel.gold}30; }
        `}</style>
      )}

      <ScrollToTop />
      <BackgroundFX mode={tweaks.atmosfera} theme={theme} />

      {showParticles && (
        <ParticleCanvas
          colors={tintedColors}
          count={tweaks.ambiente === 'vanguardista' ? 140 : tweaks.ambiente === 'intimo' ? 70 : 110}
          mode={tweaks.particleMode}
        />
      )}

      <CustomCursor color={feel.gold} />

      {/* NavBar oculto en páginas de demo para experiencia inmersiva */}
      {!isDemoRoute && (
        <NavBar page={activePage} setPage={setPage} lang={lang} setLang={setLang} theme={theme} />
      )}

      {/* Overlay de transición */}
      <div style={{
        position:'fixed', inset:0, zIndex:200, pointerEvents:'none',
        background:'linear-gradient(135deg, #0c0a06, #1a1208)',
        opacity: transitioning ? 1 : 0, transition:'opacity 0.3s ease',
      }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        <Routes>
          <Route path="/"          element={<HomePage      {...pageProps} />} />
          <Route path="/portfolio" element={<PortfolioPage {...pageProps} />} />
          <Route path="/pricing"   element={<PricingPage   {...pageProps} />} />
          <Route path="/about"     element={<AboutPage     {...pageProps} />} />
          <Route path="/contact"   element={<ContactPage   {...pageProps} />} />

          {/* Rutas de demos — reemplaza el elemento con el componente real cuando esté listo */}
          <Route path="/demos/boda"             element={<BodaDemo setPage={setPage} />} />
          <Route path="/generador/boda"         element={<GeneradorBoda />} />
          <Route path="/demos/xv"         element={<DemoPage id="xv"         lang={lang} setPage={setPage} feel={feel} />} />
          <Route path="/demos/bautizo"    element={<DemoPage id="bautizo"    lang={lang} setPage={setPage} feel={feel} />} />
          <Route path="/demos/graduacion" element={<DemoPage id="graduacion" lang={lang} setPage={setPage} feel={feel} />} />
        </Routes>
      </div>

      {/* Footer y WhatsApp ocultos en demos */}
      {!isDemoRoute && (
        <>
          <footer style={{
            background: isLight ? '#1a1208' : 'transparent',
            borderTop:'1px solid rgba(212,175,55,0.12)',
            padding:'40px clamp(16px,5vw,48px)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexWrap:'wrap', gap:24,
            position:'relative', zIndex:1,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <GoldOrnament size={28} />
              <span style={{ fontFamily:'Cinzel, serif', fontSize:13, color:feel.gold, letterSpacing:3 }}>INVITAURA</span>
            </div>
            <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:13, color:'#666', letterSpacing:1 }}>
              © 2026 Invitaura · Jalisco, México · @invitaura
            </span>
            <div style={{ display:'flex', gap:20 }}>
              {Object.entries(socialLinks).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:2,
                  color:`${feel.gold}70`, textDecoration:'none', transition:'color 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = feel.gold}
                  onMouseLeave={e => e.currentTarget.style.color = `${feel.gold}70`}
                >{name}</a>
              ))}
            </div>
          </footer>
          <WhatsAppBtn lang={lang} phone={WHATSAPP_PHONE} />
        </>
      )}
    </div>
  )
}

export default App
