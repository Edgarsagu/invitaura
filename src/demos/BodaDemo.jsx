import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { track } from '../analytics/tracker'

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — edita aquí todo el contenido de la invitación
// ─────────────────────────────────────────────────────────────────────────────
const CONFIG = {
  novia:        'Sofía',
  novio:        'Alejandro',
  fechaISO:     '2026-09-20T18:00:00',
  fechaDisplay: '20 · septiembre · 2026',
  hora:         '18:00 hrs',

  padresNovio: 'Jorge Herrera & Patricia Morales',
  padresNovia: 'Roberto Ramírez & Ana Lucía Gutiérrez',

  padrinos: [
    { tipo: 'Anillos',  nombres: 'Carlos & Valentina' },
    { tipo: 'Flores',   nombres: 'Miguel & Fernanda'  },
    { tipo: 'Lazo',     nombres: 'Eduardo & Claudia'  },
    { tipo: 'Arras',    nombres: 'Luis & Mariana'     },
  ],

  lugares: [
    {
      tipo:    'Ceremonia religiosa',
      nombre:  'Catedral de Guadalajara',
      dir:     'Av. Hidalgo 1, Centro Histórico · Guadalajara, Jalisco',
      hora:    '17:00 hrs',
      mapsUrl: 'https://maps.google.com/?q=Catedral+de+Guadalajara+Jalisco',
    },
    {
      tipo:    'Recepción',
      nombre:  'Hacienda San José del Refugio',
      dir:     'Carretera Guadalajara–Tepatitlán, km 35 · Amatitán, Jalisco',
      hora:    '19:30 hrs',
      mapsUrl: 'https://maps.google.com/?q=Hacienda+San+Jose+del+Refugio+Amatitan+Jalisco',
    },
  ],

  // Gradientes de color como placeholders — reemplazar src con URLs reales de fotos
  fotos: [
    { bg: 'linear-gradient(135deg, #E8CFC0 0%, #C4A090 100%)', label: 'Nuestro primer viaje' },
    { bg: 'linear-gradient(135deg, #C8D8C0 0%, #8AAA84 100%)', label: 'El día que dijo que sí' },
    { bg: 'linear-gradient(135deg, #D0C8E0 0%, #9490B8 100%)', label: 'Navidades juntos'       },
    { bg: 'linear-gradient(135deg, #E8C8C0 0%, #C49090 100%)', label: 'Siempre y para siempre' },
  ],

  dresscode:     'Etiqueta Formal',
  dresscodeNota: 'Les pedimos vestir en tonos neutros, champagne o marfil. Por favor evitar el color blanco.',
  dresscodeColores: [
    { hex: '#1C1C1C', nombre: 'Negro'     },
    { hex: '#5C4A36', nombre: 'Café'      },
    { hex: '#B8896A', nombre: 'Terracota' },
    { hex: '#C8B49A', nombre: 'Champagne' },
    { hex: '#F2EBE0', nombre: 'Marfil'    },
  ],

  regalos: [
    { tienda: 'Liverpool', url: 'https://mesaderegalos.liverpool.com.mx', bg: '#B40000', fg: '#fff' },
    { tienda: 'Amazon',    url: 'https://www.amazon.com.mx',               bg: '#FF9900', fg: '#111' },
  ],

  transferencia: {
    banco:  'BBVA',
    nombre: 'Sofía Ramírez Gutiérrez',
    clabe:  '012 180 0123456789 01',
    cuenta: '1234 5678 9012',
  },

  whatsapp:    '5213312345678',
  rsvpMensaje: '¡Hola! Confirmo mi asistencia a la boda de Sofía & Alejandro el 20 de septiembre 2026 🎊',
  rsvpFecha:   '1 de septiembre de 2026',

  trivia: [
    {
      pregunta: '¿Dónde se conocieron Sofía y Alejandro?',
      opciones: ['En la universidad', 'En la boda de un amigo', 'Por redes sociales', 'En el trabajo'],
      correcta: 1,
      dato: 'Se conocieron en la boda de un amigo en común. ¡El destino los tenía preparados! 💫',
    },
    {
      pregunta: '¿Cuánto tiempo llevan juntos?',
      opciones: ['2 años', '3 años', '4 años', '5 años'],
      correcta: 2,
      dato: '4 años de aventuras, risas y complicidad que los llevan al altar.',
    },
    {
      pregunta: '¿Quién propuso matrimonio?',
      opciones: ['Sofía', 'Alejandro', 'Fue una decisión mutua', 'Todavía lo debaten'],
      correcta: 1,
      dato: 'Alejandro organizó una sorpresa en el lugar de su primera cita. 💍',
    },
    {
      pregunta: '¿Cuál es el viaje favorito que han hecho juntos?',
      opciones: ['París', 'Nueva York', 'Oaxaca', 'Cancún'],
      correcta: 2,
      dato: '¡Oaxaca los enamoró a los dos! El mole, el mezcal y los pueblos mágicos. 🌿',
    },
    {
      pregunta: '¿Cuál es la canción que consideran "de ellos"?',
      opciones: ['Perfect – Ed Sheeran', 'La Bikina – Rubén Fuentes', 'Tú – Nicky Jam', 'All of Me – John Legend'],
      correcta: 3,
      dato: '"All of Me" sonó en su primera cita y nunca la olvidaron. 🎵',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: genera URL de Google Calendar con los datos del evento
// Acepta fecha local (sin Z) para respetar la hora del lugar del evento
// ─────────────────────────────────────────────────────────────────────────────
function buildCalendarUrl({ title, startISO, durationHours = 6, description, location }) {
  const pad = (n) => String(n).padStart(2, '0')
  const fmtLocal = (iso) => {
    // '2026-09-20T18:00:00' → '20260920T180000'
    return iso.replace(/[-:]/g, '').replace('T', 'T').slice(0, 15)
  }
  const start = new Date(startISO)
  const end   = new Date(start.getTime() + durationHours * 3600_000)
  const endISO = `${end.getFullYear()}${pad(end.getMonth()+1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`

  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     title,
    dates:    `${fmtLocal(startISO)}/${endISO}`,
    details:  description,
    location: location,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Tokens de diseño — paleta clara, terracota, moderna
// ─────────────────────────────────────────────────────────────────────────────
const D = {
  bg:        '#FAF7F3',
  surface:   '#FFFFFF',
  t1:        '#1C120B',
  t2:        '#8B7468',
  t3:        '#C2ADA5',
  accent:    '#B8896A',
  accentBg:  '#F5E6D8',
  sage:      '#7A9478',
  sageBg:    '#E4EFE1',
  border:    'rgba(140,100,75,0.12)',
  shadow:    '0 2px 16px rgba(28,18,11,0.05)',
  shadowMd:  '0 8px 36px rgba(28,18,11,0.08)',
  shadowLg:  '0 20px 60px rgba(28,18,11,0.1)',
  r:         20,
  rSm:       12,
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: cuenta regresiva en tiempo real
// ─────────────────────────────────────────────────────────────────────────────
function useCountdown(isoDate) {
  const calc = () => {
    const diff = new Date(isoDate) - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [t, setT] = React.useState(calc)
  React.useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

// ─────────────────────────────────────────────────────────────────────────────
// Carrusel de fotos (inspirado en Página 3)
// ─────────────────────────────────────────────────────────────────────────────
function PhotoCarousel({ fotos }) {
  const [idx, setIdx]     = React.useState(0)
  const timerRef          = React.useRef(null)
  const touchStart        = React.useRef(0)

  const go = (n) => setIdx(((n % fotos.length) + fotos.length) % fotos.length)

  const reset = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % fotos.length), 4200)
  }

  React.useEffect(() => { reset(); return () => clearInterval(timerRef.current) }, [])

  const prev = () => { go(idx - 1); reset() }
  const next = () => { go(idx + 1); reset() }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* Slide track */}
      <div style={{
        borderRadius: D.r,
        overflow: 'hidden',
        aspectRatio: '16/9',
        position: 'relative',
        boxShadow: D.shadowLg,
      }}
        onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const d = e.changedTouches[0].clientX - touchStart.current
          if (d > 50) prev()
          else if (d < -50) next()
        }}
      >
        <div style={{
          display: 'flex',
          height: '100%',
          transform: `translateX(${-idx * 100}%)`,
          transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {fotos.map((f, i) => (
            <div key={i} style={{
              flex: '0 0 100%',
              background: f.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'Lora, serif', fontStyle: 'italic',
                fontSize: 'clamp(13px,2.2vw,17px)',
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: 0.5,
                textShadow: '0 1px 6px rgba(0,0,0,0.25)',
              }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* Flechas prev/next */}
        {[
          { pos: { left: 14 }, fn: prev, ch: '‹' },
          { pos: { right: 14 }, fn: next, ch: '›' },
        ].map(({ pos, fn, ch }) => (
          <button key={ch} onClick={fn} style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', ...pos,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer', color: D.t1,
            fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: D.shadow, transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#fff'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.88)'}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Dots indicadores */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        {fotos.map((_, i) => (
          <button key={i} onClick={() => { setIdx(i); reset() }} style={{
            width: i === idx ? 28 : 8, height: 8, borderRadius: 9999,
            background: i === idx ? D.accent : `${D.accent}30`,
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pantalla de entrada: sello de lacre con paleta clara
// ─────────────────────────────────────────────────────────────────────────────
function SealEntrance({ onOpen }) {
  const [breaking, setBreaking] = React.useState(false)

  const open = () => {
    if (breaking) return
    setBreaking(true)
    setTimeout(onOpen, 500)
  }

  return (
    <div onClick={open} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: D.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      opacity: breaking ? 0 : 1,
      transition: 'opacity 0.45s ease',
      userSelect: 'none',
    }}>
      {/* Patrón de puntos */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${D.border} 1.2px, transparent 1.2px)`,
        backgroundSize: '28px 28px',
      }} />

      {/* Esquinas */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32, transform: 'scaleX(-1)' },
        { bottom: 32, left: 32, transform: 'scaleY(-1)' },
        { bottom: 32, right: 32, transform: 'scale(-1,-1)' },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M0 38 L0 0 L38 0" stroke={D.accent} strokeWidth="1.2" opacity="0.35"/>
            <circle cx="5" cy="5" r="2" fill={D.accent} opacity="0.25"/>
          </svg>
        </div>
      ))}

      {/* Sello */}
      <div style={{
        width: 188, height: 188, borderRadius: '50%',
        background: `radial-gradient(circle at 38% 34%, #D4AA86, ${D.accent})`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 0 10px ${D.accentBg}, 0 0 0 11px ${D.border}, ${D.shadowLg}`,
        transform: breaking ? 'scale(1.55)' : 'scale(1)',
        transition: 'transform 0.42s cubic-bezier(0.34,1.56,0.64,1)',
        animation: 'sealBreath 4s ease-in-out infinite',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ position: 'absolute', width: 165, height: 165, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)' }} />
        <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: 56, color: '#fff', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
          {CONFIG.novia[0]}&amp;{CONFIG.novio[0]}
        </span>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: 9, letterSpacing: 3.5, color: 'rgba(255,255,255,0.62)', marginTop: 7 }}>
          {new Date(CONFIG.fechaISO).getFullYear()}
        </span>
      </div>

      <p style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 500,
        fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
        color: D.t3, marginTop: 44,
        position: 'relative', zIndex: 1,
        animation: 'tapPulse 2.2s ease-in-out infinite',
      }}>
        Toca para abrir
      </p>

      <style>{`
        @keyframes sealBreath {
          0%,100% { box-shadow: 0 0 0 10px ${D.accentBg}, 0 0 0 11px ${D.border}, 0 16px 40px rgba(184,137,106,0.18); }
          50%      { box-shadow: 0 0 0 14px ${D.accentBg}, 0 0 0 15px ${D.border}, 0 24px 60px rgba(184,137,106,0.32); }
        }
        @keyframes tapPulse {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Componentes auxiliares reutilizables
// ─────────────────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '44px auto', maxWidth: 280 }}>
      <div style={{ flex: 1, height: 1, background: D.border }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6Z" fill={D.accent} opacity="0.45"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: D.border }} />
    </div>
  )
}

function Card({ children, style }) {
  return (
    <div style={{
      background: D.surface,
      borderRadius: D.r,
      border: `1px solid ${D.border}`,
      boxShadow: D.shadow,
      padding: 'clamp(20px,4vw,32px)',
      ...style,
    }}>
      {children}
    </div>
  )
}

// Botón de maps / acciones secundarias
function OutlineBtn({ href, onClick, children }) {
  const [hover, setHover] = React.useState(false)
  const style = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600,
    color: D.accent, textDecoration: 'none',
    border: `1px solid ${hover ? D.accent : `${D.accent}35`}`,
    borderRadius: 9999, padding: '9px 20px',
    background: hover ? D.accentBg : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.25s',
  }
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{children}</a>
  return <button onClick={onClick} style={{ ...style, border: 'none' }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{children}</button>
}

// ─────────────────────────────────────────────────────────────────────────────
// Trivia interactiva sobre los novios
// ─────────────────────────────────────────────────────────────────────────────
function TriviaSection({ preguntas, onComplete }) {
  const [estado, setEstado]       = React.useState('idle')   // idle | playing | result
  const [idx, setIdx]             = React.useState(0)
  const [score, setScore]         = React.useState(0)
  const [seleccion, setSeleccion] = React.useState(null)
  const [mostrarDato, setMostrarDato] = React.useState(false)
  const [animKey, setAnimKey]     = React.useState(0)

  const total    = preguntas.length
  const pregunta = preguntas[idx]
  const isLast   = idx === total - 1

  const iniciar = () => {
    setEstado('playing'); setIdx(0); setScore(0)
    setSeleccion(null); setMostrarDato(false); setAnimKey(k => k + 1)
  }

  const elegir = (i) => {
    if (seleccion !== null) return
    setSeleccion(i)
    if (i === pregunta.correcta) setScore(s => s + 1)
    setMostrarDato(true)
  }

  const siguiente = () => {
    if (isLast) { setEstado('result'); onComplete?.(score, total) }
    else {
      setIdx(i => i + 1); setSeleccion(null)
      setMostrarDato(false); setAnimKey(k => k + 1)
    }
  }

  const pct = score / total
  const resultado =
    pct === 1    ? { emoji: '🏆', msg: '¡Perfecto! Definitivamente eres parte de nuestra historia.' } :
    pct >= 0.8   ? { emoji: '🎉', msg: '¡Casi perfecto! Claramente eres de los cercanos.' }           :
    pct >= 0.5   ? { emoji: '😊', msg: '¡No está mal! Hay secretos que solo revelaremos en la boda.' } :
                   { emoji: '😄', msg: 'Apenas nos estás conociendo... ¡pronto sabrás más!' }

  const compartir = () => {
    const txt = `Obtuve ${score}/${total} en la trivia de ${CONFIG.novia} & ${CONFIG.novio} 💍\n¿Tú cuánto sacarás?\n${window.location.origin}/demos/boda`
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, '_blank')
  }

  // ── IDLE ──
  if (estado === 'idle') return (
    <Card style={{ maxWidth: 480, margin: '0 auto', padding: 'clamp(32px,5vw,48px)', textAlign: 'center' }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>🧠</div>
      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(20px,4vw,26px)', color: D.t1, margin: '0 0 12px' }}>
        ¿Cuánto nos conoces?
      </h3>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: D.t2, lineHeight: 1.65, margin: '0 0 32px' }}>
        {total} preguntas sobre nuestra historia.<br />¿Te atreves?
      </p>
      <OutlineBtn onClick={iniciar} style={{ width: '100%', padding: '13px', fontSize: 14, justifyContent: 'center', borderRadius: D.r }}>
        ¡Jugar ahora! →
      </OutlineBtn>
    </Card>
  )

  // ── RESULTADO ──
  if (estado === 'result') return (
    <Card style={{ maxWidth: 480, margin: '0 auto', padding: 'clamp(32px,5vw,48px)', textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>{resultado.emoji}</div>
      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(22px,4vw,30px)', color: D.t1, margin: '0 0 8px' }}>
        {score} de {total} correctas
      </h3>

      {/* Barra de puntuación */}
      <div style={{ height: 8, background: D.border, borderRadius: 99, margin: '20px 0 8px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99, background: D.accent,
          width: `${pct * 100}%`, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: D.t2, lineHeight: 1.65, margin: '12px 0 32px' }}>
        {resultado.msg}
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <OutlineBtn onClick={iniciar} style={{ flex: 1, justifyContent: 'center', padding: '12px', borderRadius: D.rSm }}>
          Intentar de nuevo
        </OutlineBtn>
        <a
          onClick={compartir}
          style={{
            flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#25D366', color: '#fff', borderRadius: D.rSm,
            padding: '12px 16px', fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1DA851'}
          onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
        >
          Compartir por WhatsApp
        </a>
      </div>
    </Card>
  )

  // ── JUGANDO ──
  return (
    <Card style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(24px,4vw,40px)' }}>
      {/* Barra de progreso */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{ flex: 1, height: 5, background: D.border, borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: D.accent, borderRadius: 99,
            width: `${(idx / total) * 100}%`, transition: 'width 0.4s ease',
          }} />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 12, color: D.t3, flexShrink: 0 }}>
          {idx + 1} / {total}
        </span>
      </div>

      {/* Pregunta + opciones con animación */}
      <div key={animKey} style={{ animation: 'fadeUp 0.35s ease' }}>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700,
          fontSize: 'clamp(17px,3vw,22px)', color: D.t1,
          margin: '0 0 24px', lineHeight: 1.4,
        }}>
          {pregunta.pregunta}
        </h3>

        {/* Opciones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {pregunta.opciones.map((op, i) => {
            const answered  = seleccion !== null
            const isCorrect = i === pregunta.correcta
            const isWrong   = i === seleccion && !isCorrect

            const bg     = answered && isCorrect ? D.sageBg  : answered && isWrong ? '#FBF0EF'     : D.surface
            const border = answered && isCorrect ? D.sage    : answered && isWrong ? '#C0504A'      : D.border
            const color  = answered && isCorrect ? D.sage    : answered && isWrong ? '#C0504A'      : D.t1

            const badgeBg    = answered && isCorrect ? D.sage : answered && isWrong ? '#C0504A' : `${D.border}`
            const badgeColor = answered && (isCorrect || isWrong) ? '#fff' : D.t3
            const badgeTxt   = answered && isCorrect ? '✓' : answered && isWrong ? '✕' : String.fromCharCode(65 + i)

            return (
              <button key={i} onClick={() => elegir(i)} style={{
                width: '100%', textAlign: 'left',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color,
                background: bg, border: `1.5px solid ${border}`,
                borderRadius: D.rSm, padding: '13px 16px',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all 0.25s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
                onMouseEnter={e => { if (!answered) e.currentTarget.style.borderColor = D.accent }}
                onMouseLeave={e => { if (!answered) e.currentTarget.style.borderColor = D.border }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: badgeBg, color: badgeColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 12,
                  transition: 'all 0.25s',
                }}>
                  {badgeTxt}
                </span>
                {op}
              </button>
            )
          })}
        </div>

        {/* Dato curioso */}
        {mostrarDato && (
          <div style={{
            background: D.accentBg, borderRadius: D.rSm,
            padding: '13px 16px', marginBottom: 20,
            borderLeft: `3px solid ${D.accent}`,
          }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: D.t2, margin: 0, lineHeight: 1.6 }}>
              💡 {pregunta.dato}
            </p>
          </div>
        )}

        {seleccion !== null && (
          <button onClick={siguiente} style={{
            width: '100%', padding: '13px',
            fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600,
            background: D.accent, color: '#fff',
            border: 'none', borderRadius: D.rSm, cursor: 'pointer',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#9A6A4A'}
            onMouseLeave={e => e.currentTarget.style.background = D.accent}
          >
            {isLast ? 'Ver mi resultado 🎉' : 'Siguiente pregunta →'}
          </button>
        )}
      </div>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pase digital de acceso con código QR
// ─────────────────────────────────────────────────────────────────────────────
function PaseDigital({ invitado, mesa, pases, onClose }) {
  // El QR codifica texto legible por cualquier escáner
  const qrValue = [
    '✓ INVITAURA',
    `${CONFIG.novia} & ${CONFIG.novio}`,
    CONFIG.fechaDisplay,
    invitado,
    mesa ? `Mesa ${mesa}` : '',
    `${pases} persona${pases !== '1' ? 's' : ''}`,
  ].filter(Boolean).join(' · ')

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(28,18,11,0.55)',
          backdropFilter: 'blur(10px)',
        }}
      />

      {/* Ticket */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1001,
        width: 'min(360px, 92vw)',
        background: D.surface,
        borderRadius: 28,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(28,18,11,0.22)',
      }}>

        {/* Cabecera */}
        <div style={{
          background: `linear-gradient(135deg, ${D.accent} 0%, #9A6A4A 100%)`,
          padding: '28px 28px 26px',
          textAlign: 'center',
          position: 'relative',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', border: 'none',
            color: '#fff', cursor: 'pointer', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >×</button>

          <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:600, fontSize:9, letterSpacing:4, textTransform:'uppercase', color:'rgba(255,255,255,0.65)', display:'block', marginBottom:8 }}>
            Pase de acceso
          </span>
          <h2 style={{ fontFamily:'Great Vibes, cursive', fontSize:38, color:'#fff', margin:0, lineHeight:1.1 }}>
            {CONFIG.novia} &amp; {CONFIG.novio}
          </h2>
          <p style={{ fontFamily:'Outfit, sans-serif', fontSize:11, letterSpacing:2.5, color:'rgba(255,255,255,0.7)', marginTop:8, textTransform:'uppercase' }}>
            {CONFIG.fechaDisplay}
          </p>
        </div>

        {/* Borde perforado */}
        <div style={{ display:'flex', alignItems:'center', margin:'0 -1px', background:D.bg }}>
          <div style={{ width:22, height:22, borderRadius:'50%', background:D.surface, flexShrink:0, marginLeft:-11 }} />
          <div style={{ flex:1, borderTop:`2px dashed ${D.border}` }} />
          <div style={{ width:22, height:22, borderRadius:'50%', background:D.surface, flexShrink:0, marginRight:-11 }} />
        </div>

        {/* Cuerpo */}
        <div style={{ padding:'24px 28px 32px', textAlign:'center' }}>
          <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:600, fontSize:9, letterSpacing:3, textTransform:'uppercase', color:D.t3, display:'block', marginBottom:6 }}>
            Invitado
          </span>
          <h3 style={{ fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:'clamp(18px,5vw,24px)', color:D.t1, margin:'0 0 22px' }}>
            {invitado}
          </h3>

          {/* QR */}
          <div style={{
            display: 'inline-block',
            padding: 14, borderRadius: 16,
            background: '#fff',
            border: `1px solid ${D.border}`,
            marginBottom: 22,
            boxShadow: D.shadow,
          }}>
            <QRCodeSVG
              value={qrValue}
              size={156}
              bgColor="#ffffff"
              fgColor={D.t1}
              level="M"
              includeMargin={false}
            />
          </div>

          {/* Mesa + pases */}
          <div style={{ display:'flex', justifyContent:'center', gap:32, marginBottom:20 }}>
            {mesa && (
              <div>
                <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:600, fontSize:9, letterSpacing:2.5, textTransform:'uppercase', color:D.t3, display:'block', marginBottom:4 }}>Mesa</span>
                <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:32, color:D.accent, lineHeight:1 }}>{mesa}</span>
              </div>
            )}
            <div>
              <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:600, fontSize:9, letterSpacing:2.5, textTransform:'uppercase', color:D.t3, display:'block', marginBottom:4 }}>Personas</span>
              <span style={{ fontFamily:'Outfit, sans-serif', fontWeight:700, fontSize:32, color:D.t1, lineHeight:1 }}>{pases}</span>
            </div>
          </div>

          <p style={{ fontFamily:'Inter, sans-serif', fontSize:11, color:D.t3, lineHeight:1.6, margin:0 }}>
            Presenta este pase al ingresar al evento.<br />
            Válido para <strong style={{ color:D.t2 }}>{pases} persona{pases !== '1' ? 's' : ''}</strong>.
          </p>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Invitación de boda — componente principal
// ─────────────────────────────────────────────────────────────────────────────
export function BodaDemo({ setPage }) {
  const [opened, setOpened]   = React.useState(false)
  const [copied, setCopied]   = React.useState(null)
  const [paseOpen, setPaseOpen] = React.useState(false)
  const time = useCountdown(CONFIG.fechaISO)

  // Track view once the seal is opened (avoids counting bots that never interact)
  React.useEffect(() => {
    if (opened) track('boda-sofia-alejandro', 'view')
  }, [opened])

  // Parámetros de URL para pase personalizado
  // Ejemplo: /demos/boda?invitado=Eduardo%20Torres&mesa=5&pases=2
  const [searchParams] = useSearchParams()
  const invitado = searchParams.get('invitado')
  const mesa     = searchParams.get('mesa')
  const pases    = searchParams.get('pases') || '1'

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2200)
    })
  }

  // Estilos de sección reutilizables
  const sec = {
    padding: 'clamp(72px,11vw,128px) clamp(20px,5vw,60px)',
    maxWidth: 820, margin: '0 auto', width: '100%',
  }

  const sectionLabel = (text) => (
    <span style={{
      display: 'block', textAlign: 'center',
      fontFamily: 'Outfit, sans-serif', fontWeight: 600,
      fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
      color: D.t3, marginBottom: 20,
    }}>
      {text}
    </span>
  )

  return (
    <div style={{ background: D.bg, color: D.t1, minHeight: '100vh', overflowX: 'hidden' }}>

      {!opened && <SealEntrance onOpen={() => setOpened(true)} />}

      {/* Pase digital — modal */}
      {paseOpen && invitado && (
        <PaseDigital
          invitado={invitado}
          mesa={mesa}
          pases={pases}
          onClose={() => setPaseOpen(false)}
        />
      )}

      {/* Botón flotante MI PASE — solo visible si hay parámetro ?invitado= */}
      {invitado && (
        <button
          onClick={() => { setPaseOpen(true); track('boda-sofia-alejandro', 'pase_view') }}
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 500,
            display: 'flex', alignItems: 'center', gap: 8,
            background: D.accent, color: '#fff',
            borderRadius: 9999, padding: '12px 22px',
            fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: `0 4px 24px ${D.accent}45`,
            transition: 'all 0.25s',
            opacity: opened ? 1 : 0,
            pointerEvents: opened ? 'auto' : 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#9A6A4A'}
          onMouseLeave={e => e.currentTarget.style.background = D.accent}
        >
          🎫 Mi pase
        </button>
      )}

      {/* Botón volver */}
      <button onClick={() => setPage('portfolio')} style={{
        position: 'fixed', top: 20, left: 20, zIndex: 500,
        display: 'flex', alignItems: 'center', gap: 8,
        background: D.surface, border: `1px solid ${D.border}`,
        borderRadius: 9999, padding: '10px 20px',
        color: D.t2, cursor: 'pointer',
        fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 500,
        boxShadow: D.shadow, transition: 'all 0.25s',
        opacity: opened ? 1 : 0, pointerEvents: opened ? 'auto' : 'none',
      }}
        onMouseEnter={e => { e.currentTarget.style.color = D.accent; e.currentTarget.style.borderColor = `${D.accent}50` }}
        onMouseLeave={e => { e.currentTarget.style.color = D.t2; e.currentTarget.style.borderColor = D.border }}
      >
        ← Portafolio
      </button>

      {/* ── 01 HERO ────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 'clamp(108px,15vw,170px) clamp(20px,5vw,60px) clamp(88px,11vw,130px)',
        position: 'relative',
        background: `
          radial-gradient(ellipse at 18% 82%, ${D.accentBg} 0%, transparent 48%),
          radial-gradient(ellipse at 82% 18%, ${D.sageBg} 0%, transparent 44%),
          ${D.bg}
        `,
      }}>
        {/* Esquinas decorativas */}
        {[
          { top: 44, left: 44 },
          { top: 44, right: 44, transform: 'scaleX(-1)' },
          { bottom: 44, left: 44, transform: 'scaleY(-1)' },
          { bottom: 44, right: 44, transform: 'scale(-1,-1)' },
        ].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, opacity: 0.28 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M0 48 L0 0 L48 0" stroke={D.accent} strokeWidth="1.2"/>
              <circle cx="6" cy="6" r="2.5" fill={D.accent} opacity="0.4"/>
            </svg>
          </div>
        ))}

        {sectionLabel('nos casamos')}

        <h1 style={{
          fontFamily: 'Great Vibes, cursive',
          fontSize: 'clamp(66px,16vw,148px)',
          color: D.t1, lineHeight: 1.05, margin: 0,
        }}>
          {CONFIG.novia}
        </h1>

        <span style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 300,
          fontSize: 'clamp(16px,3.5vw,26px)', letterSpacing: 10,
          color: D.accent, display: 'block', margin: '6px 0',
        }}>
          &amp;
        </span>

        <h1 style={{
          fontFamily: 'Great Vibes, cursive',
          fontSize: 'clamp(66px,16vw,148px)',
          color: D.t1, lineHeight: 1.05, margin: '0 0 44px',
        }}>
          {CONFIG.novio}
        </h1>

        <Divider />

        <p style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 400,
          fontSize: 'clamp(12px,2vw,15px)', letterSpacing: 3.5,
          color: D.t2, marginTop: 8, textTransform: 'uppercase',
        }}>
          {CONFIG.fechaDisplay}
        </p>

        {/* Indicador scroll */}
        <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 52, background: `linear-gradient(to bottom, transparent, ${D.accent}45)` }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 8, letterSpacing: 3.5, color: D.t3, textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ── 02 INVITACIÓN FORMAL ────────────────────────────────────────────── */}
      <section style={{ ...sec, textAlign: 'center' }}>
        {sectionLabel('con amor te invitamos')}

        <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 'clamp(17px,2.8vw,23px)', color: D.t2, lineHeight: 2 }}>
          Juntos y con el corazón lleno de gratitud,
        </p>
        <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(40px,8vw,72px)', color: D.t1, lineHeight: 1.2, margin: '14px 0' }}>
          {CONFIG.novia} &amp; {CONFIG.novio}
        </h2>
        <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 'clamp(17px,2.8vw,23px)', color: D.t2, lineHeight: 2 }}>
          tienen el honor de invitarte a compartir<br />el día más especial de nuestras vidas.
        </p>

        <Divider />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,5vw,48px)' }}>
          {[
            { lbl: 'Padres del novio',  val: CONFIG.padresNovio },
            { lbl: 'Padres de la novia', val: CONFIG.padresNovia },
          ].map(({ lbl, val }) => (
            <div key={lbl}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: D.t3, display: 'block', marginBottom: 12 }}>{lbl}</span>
              <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(19px,4vw,28px)', color: D.t2, display: 'block', lineHeight: 1.4 }}>{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 CUENTA REGRESIVA ─────────────────────────────────────────────── */}
      <section style={{ ...sec, textAlign: 'center' }}>
        {sectionLabel('la celebración comienza en')}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(10px,2.5vw,20px)', flexWrap: 'wrap' }}>
          {[
            { val: time.d, name: 'Días'     },
            { val: time.h, name: 'Horas'    },
            { val: time.m, name: 'Minutos'  },
            { val: time.s, name: 'Segundos' },
          ].map(({ val, name }) => (
            <Card key={name} style={{ minWidth: 76, padding: 'clamp(18px,3.5vw,30px) clamp(12px,2.5vw,24px)', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                fontSize: 'clamp(38px,9vw,70px)',
                color: D.accent, lineHeight: 1,
              }}>
                {String(val).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 9, letterSpacing: 2.5, color: D.t3, marginTop: 10, textTransform: 'uppercase' }}>
                {name}
              </div>
            </Card>
          ))}
        </div>

        <Divider />

        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(22px,4vw,36px)', color: D.t2 }}>
          {CONFIG.hora} · {CONFIG.fechaDisplay}
        </p>
      </section>

      {/* ── 04 GALERÍA DE FOTOS ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,11vw,128px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', width: '100%' }}>
          {sectionLabel('algunos momentos juntos')}
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 'clamp(17px,2.5vw,22px)', color: D.t2, textAlign: 'center', marginBottom: 40 }}>
            Antes de este gran día 💕
          </p>
          <PhotoCarousel fotos={CONFIG.fotos} />
        </div>
      </section>

      {/* ── 05 TRIVIA ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,11vw,128px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', width: '100%' }}>
          {sectionLabel('¿cuánto nos conoces?')}
          <p style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 'clamp(17px,2.5vw,22px)', color: D.t2, textAlign: 'center', marginBottom: 40 }}>
            Pon a prueba qué tan bien nos conoces antes del gran día
          </p>
          <TriviaSection
            preguntas={CONFIG.trivia}
            onComplete={(score, total) => track('boda-sofia-alejandro', 'trivia_complete', { score, total })}
          />
        </div>
      </section>

      {/* ── 06 PADRINOS ─────────────────────────────────────────────────────── */}
      <section style={{ ...sec }}>
        {sectionLabel('nuestros padrinos')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(168px,1fr))', gap: 12 }}>
          {CONFIG.padrinos.map((p, i) => (
            <Card key={i} style={{ textAlign: 'center', padding: '26px 16px' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: D.accent, display: 'block', marginBottom: 12 }}>
                {p.tipo}
              </span>
              <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(19px,4vw,27px)', color: D.t1 }}>
                {p.nombres}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 06 ITINERARIO ───────────────────────────────────────────────────── */}
      <section style={{ ...sec }}>
        {sectionLabel('itinerario del día')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CONFIG.lugares.map((lugar, i) => (
            <Card key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: D.accent, flexShrink: 0 }} />
                {i < CONFIG.lugares.length - 1 && (
                  <div style={{ width: 2, height: 36, borderRadius: 2, background: `linear-gradient(to bottom, ${D.accent}40, transparent)`, marginTop: 6 }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: D.accent, display: 'block', marginBottom: 6 }}>
                  {lugar.tipo} · {lugar.hora}
                </span>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 'clamp(18px,3vw,24px)', color: D.t1, margin: '0 0 6px' }}>
                  {lugar.nombre}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: D.t2, lineHeight: 1.6, margin: '0 0 18px' }}>
                  {lugar.dir}
                </p>
                <OutlineBtn href={lugar.mapsUrl}>↗ Cómo llegar</OutlineBtn>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 07 CÓDIGO DE VESTIMENTA ──────────────────────────────────────────── */}
      <section style={{ ...sec, textAlign: 'center' }}>
        {sectionLabel('código de vestimenta')}
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 'clamp(22px,4.5vw,40px)', color: D.t1, marginBottom: 12 }}>
          {CONFIG.dresscode}
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px,2.2vw,16px)', color: D.t2, maxWidth: 400, margin: '0 auto 44px', lineHeight: 1.7 }}>
          {CONFIG.dresscodeNota}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(14px,3vw,28px)', flexWrap: 'wrap' }}>
          {CONFIG.dresscodeColores.map(({ hex, nombre }) => (
            <div key={hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: hex,
                border: `3px solid ${D.border}`, boxShadow: D.shadow,
              }} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 10, color: D.t3, letterSpacing: 1.5 }}>
                {nombre}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 08 MESA DE REGALOS ──────────────────────────────────────────────── */}
      <section style={{ ...sec, textAlign: 'center' }}>
        {sectionLabel('mesa de regalos')}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px,2.5vw,18px)', color: D.t2, maxWidth: 420, margin: '0 auto 44px', lineHeight: 1.75 }}>
          Tu presencia es el mejor regalo.<br />Si deseas obsequiarnos algo, con amor lo recibimos.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
          {CONFIG.regalos.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{
              padding: '14px 36px',
              background: r.bg, color: r.fg, borderRadius: D.rSm,
              fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: 1,
              textDecoration: 'none', transition: 'opacity 0.25s', display: 'block',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {r.tienda}
            </a>
          ))}
        </div>

        <Card style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: D.t3, display: 'block', textAlign: 'center', marginBottom: 24 }}>
            Transferencia bancaria
          </span>
          {[
            { lbl: 'Banco',  val: CONFIG.transferencia.banco  },
            { lbl: 'Nombre', val: CONFIG.transferencia.nombre },
            { lbl: 'CLABE',  val: CONFIG.transferencia.clabe,  key: 'clabe'  },
            { lbl: 'Cuenta', val: CONFIG.transferencia.cuenta, key: 'cuenta' },
          ].map(({ lbl, val, key }) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, marginBottom: 18 }}>
              <div>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 10, color: D.t3, display: 'block', marginBottom: 3 }}>{lbl}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: D.t1 }}>{val}</span>
              </div>
              {key && (
                <button onClick={() => copy(val.replace(/\s/g, ''), key)} style={{
                  background: copied === key ? D.accentBg : 'transparent',
                  border: `1px solid ${copied === key ? D.accent : D.border}`,
                  borderRadius: 9999, color: D.accent,
                  padding: '6px 16px', cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 11,
                  flexShrink: 0, transition: 'all 0.2s',
                }}>
                  {copied === key ? '✓ Copiado' : 'Copiar'}
                </button>
              )}
            </div>
          ))}
        </Card>
      </section>

      {/* ── 09 RSVP ─────────────────────────────────────────────────────────── */}
      <section style={{ ...sec, textAlign: 'center' }}>
        {sectionLabel('confirma tu asistencia')}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px,2.5vw,19px)', color: D.t2, maxWidth: 440, margin: '0 auto 44px', lineHeight: 1.75 }}>
          Confirma antes del{' '}
          <strong style={{ color: D.t1, fontWeight: 600 }}>{CONFIG.rsvpFecha}</strong>
          {' '}para que podamos preparar el lugar perfecto para ti.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {/* WhatsApp RSVP */}
          <a
            href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.rsvpMensaje)}`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => track('boda-sofia-alejandro', 'whatsapp_rsvp')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#25D366', color: '#fff', borderRadius: D.rSm,
              padding: 'clamp(15px,3vw,20px) clamp(28px,5vw,52px)',
              fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'background 0.25s',
              boxShadow: '0 4px 24px rgba(37,211,102,0.28)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1DA851'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Confirmar por WhatsApp
          </a>

          {/* Google Calendar */}
          <a
            onClick={() => track('boda-sofia-alejandro', 'calendar_add')}
            href={buildCalendarUrl({
              title:       `Boda ${CONFIG.novia} & ${CONFIG.novio}`,
              startISO:    CONFIG.fechaISO,
              durationHours: 6,
              description: `Ceremonia: ${CONFIG.lugares[0].nombre} — ${CONFIG.lugares[0].hora}\nRecepción: ${CONFIG.lugares[1].nombre} — ${CONFIG.lugares[1].hora}`,
              location:    CONFIG.lugares[0].dir,
            })}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: D.surface, color: D.t1, borderRadius: D.rSm,
              padding: 'clamp(12px,2.5vw,16px) clamp(22px,4vw,40px)',
              fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
              border: `1px solid ${D.border}`,
              boxShadow: D.shadow,
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${D.accent}50`; e.currentTarget.style.color = D.accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = D.border; e.currentTarget.style.color = D.t1 }}
          >
            {/* Ícono Google Calendar */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 2v4M8 2v4M3 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 13h2v2H8z" fill="currentColor" opacity="0.5"/>
              <path d="M11 13h2v2h-2z" fill="currentColor" opacity="0.5"/>
              <path d="M14 13h2v2h-2z" fill="currentColor" opacity="0.5"/>
              <path d="M8 16h2v2H8z" fill="currentColor" opacity="0.3"/>
              <path d="M11 16h2v2h-2z" fill="currentColor" opacity="0.3"/>
            </svg>
            Agregar a mi calendario
          </a>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${D.border}`, padding: '52px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(28px,5vw,42px)', color: D.t3, marginBottom: 14 }}>
          {CONFIG.novia} &amp; {CONFIG.novio} · {new Date(CONFIG.fechaISO).getFullYear()}
        </p>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 10, letterSpacing: 3.5, textTransform: 'uppercase', color: D.t3 }}>
          Hecho con amor · <span style={{ color: D.accent }}>Invitaura</span>
        </p>
      </footer>

    </div>
  )
}
