import React from 'react'
import ReactDOM from 'react-dom/client'
import { BackgroundFX, ParticleCanvas, CustomCursor, NavBar, WhatsAppBtn, GoldOrnament } from './components'
import { HomePage, PortfolioPage, PricingPage, AboutPage, ContactPage } from './pages'

// ── Número de WhatsApp — actualizar aquí ──────────────────────────────────────
// Formato: código de país + número sin espacios ni guiones (ej. 5213312345678)
const WHATSAPP_PHONE = '5213312345678'

const TWEAK_DEFAULTS = {
  theme: 'oscuro',
  ambiente: 'ceremonial',
  auraLevel: 3,
  particleMode: 'ember',
  atmosfera: 'aurora',
  lang: 'es',
}

function computeFeel(tweaks) {
  const goldByLevel = {
    1: '#6B5516', 2: '#9E7D20', 3: '#D4AF37', 4: '#EAC94E', 5: '#FFE566',
  }
  return {
    gold: goldByLevel[tweaks.auraLevel] || '#D4AF37',
    heroSize: tweaks.ambiente === 'vanguardista' ? 'clamp(76px, 13vw, 168px)' : tweaks.ambiente === 'intimo' ? 'clamp(36px, 5.5vw, 78px)' : 'clamp(52px, 10vw, 130px)',
    spacing: tweaks.ambiente === 'intimo' ? 0.7 : tweaks.ambiente === 'vanguardista' ? 1.35 : 1.0,
    glow: tweaks.auraLevel >= 4,
  }
}

function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS)
  const [page, setPage] = React.useState('home')
  const [transitioning, setTransitioning] = React.useState(false)
  const [displayPage, setDisplayPage] = React.useState('home')

  const lang = tweaks.lang
  const setLang = (l) => setTweaks(p => ({ ...p, lang: l }))
  const theme = tweaks.theme
  const isLight = theme === 'champagne'
  const feel = computeFeel(tweaks)

  const navigateTo = (newPage) => {
    if (newPage === displayPage) return
    setTransitioning(true)
    setTimeout(() => {
      setDisplayPage(newPage)
      setPage(newPage)
      window.scrollTo(0, 0)
      setTimeout(() => setTransitioning(false), 50)
    }, 320)
  }

  const particleColors = {
    oscuro:    ['#D4AF37', '#C5A059', '#F5E27A', '#B8960A'],
    midnight:  ['#8B9FD4', '#6B7FBF', '#D4AF37', '#C5A059'],
    champagne: ['#D4AF37', '#C5A059', '#B8960A'],
  }[theme] || ['#D4AF37', '#C5A059']

  const tintedColors = tweaks.auraLevel !== 3
    ? [feel.gold, ...particleColors.slice(1)]
    : particleColors

  const pageProps = { lang, setPage: navigateTo, theme, feel, phone: WHATSAPP_PHONE }

  const pages = {
    home:      <HomePage      {...pageProps} />,
    portfolio: <PortfolioPage {...pageProps} />,
    pricing:   <PricingPage   {...pageProps} />,
    about:     <AboutPage     {...pageProps} />,
    contact:   <ContactPage   {...pageProps} />,
  }

  const showParticles = tweaks.particleMode !== 'none' && theme !== 'champagne'

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

      <BackgroundFX mode={tweaks.atmosfera} theme={theme} />

      {showParticles && (
        <ParticleCanvas
          colors={tintedColors}
          count={tweaks.ambiente === 'vanguardista' ? 140 : tweaks.ambiente === 'intimo' ? 70 : 110}
          mode={tweaks.particleMode}
        />
      )}

      <CustomCursor color={feel.gold} />

      <NavBar page={page} setPage={navigateTo} lang={lang} setLang={setLang} theme={theme} />

      {/* Page transition overlay */}
      <div style={{
        position:'fixed', inset:0, zIndex:200, pointerEvents:'none',
        background:'linear-gradient(135deg, #0c0a06, #1a1208)',
        opacity: transitioning ? 1 : 0, transition:'opacity 0.3s ease',
      }}/>

      <div style={{ position:'relative', zIndex:1 }}>
        {pages[displayPage]}
      </div>

      {/* Footer */}
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
    </div>
  )
}

export default App
