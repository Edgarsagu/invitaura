import React from 'react'
import { getEvents, clearEvents } from './tracker'

const INVITATION_ID = 'boda-sofia-alejandro'

// ─────────────────────────────────────────────────────────────────────────────
// Datos de muestra — se usan cuando no hay eventos reales todavía
// Así el cliente ve cómo lucirá su dashboard desde el primer día
// ─────────────────────────────────────────────────────────────────────────────
function buildSeedEvents() {
  const today  = new Date()
  const events = []
  const push   = (daysAgo, event, extra = {}) => {
    const d = new Date(today - daysAgo * 86_400_000)
    events.push({ event, date: d.toISOString().slice(0, 10), ts: d.getTime(), device: Math.random() > 0.25 ? 'mobile' : 'desktop', ...extra })
  }

  // Visitas de los últimos 7 días
  const dailyViews = [12, 28, 19, 34, 47, 22, 8]
  dailyViews.forEach((n, i) => {
    for (let v = 0; v < n; v++) push(6 - i, 'view')
  })
  // Acciones
  for (let i = 0; i < 38; i++) push(Math.floor(Math.random() * 7), 'whatsapp_rsvp')
  for (let i = 0; i < 52; i++) push(Math.floor(Math.random() * 7), 'calendar_add')
  for (let i = 0; i < 44; i++) push(Math.floor(Math.random() * 7), 'pase_view')
  for (let i = 0; i < 61; i++) {
    const score = Math.floor(Math.random() * 4) + 2
    push(Math.floor(Math.random() * 7), 'trivia_complete', { score, total: 5 })
  }
  return events
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers para procesar eventos
// ─────────────────────────────────────────────────────────────────────────────
function processEvents(events) {
  const today = new Date()

  // Últimos 7 días (etiquetas)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today - (6 - i) * 86_400_000)
    return {
      label: i === 6 ? 'Hoy' : d.toLocaleDateString('es-MX', { weekday: 'short' }),
      date:  d.toISOString().slice(0, 10),
      views: 0,
    }
  })

  let mobile = 0, desktop = 0
  let waClicks = 0, calClicks = 0, paseViews = 0
  let triviaPlays = 0, triviaScoreSum = 0, triviaTotal = 0

  for (const e of events) {
    if (e.event === 'view') {
      e.device === 'mobile' ? mobile++ : desktop++
      const slot = days.find(d => d.date === e.date)
      if (slot) slot.views++
    }
    if (e.event === 'whatsapp_rsvp') waClicks++
    if (e.event === 'calendar_add')  calClicks++
    if (e.event === 'pase_view')     paseViews++
    if (e.event === 'trivia_complete') {
      triviaPlays++
      triviaScoreSum += (e.score || 0)
      triviaTotal    += (e.total || 5)
    }
  }

  const totalViews  = mobile + desktop
  const triviaAvgPct = triviaTotal > 0 ? Math.round((triviaScoreSum / triviaTotal) * 100) : 0

  return { days, totalViews, mobile, desktop, waClicks, calClicks, paseViews, triviaPlays, triviaAvgPct }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tokens de diseño
// ─────────────────────────────────────────────────────────────────────────────
const D = {
  bg:       '#FAF7F3',
  surface:  '#FFFFFF',
  t1:       '#1C120B',
  t2:       '#8B7468',
  t3:       '#C2ADA5',
  accent:   '#B8896A',
  accentBg: '#F5E6D8',
  sage:     '#7A9478',
  sageBg:   '#E4EFE1',
  border:   'rgba(140,100,75,0.13)',
  shadow:   '0 2px 16px rgba(28,18,11,0.05)',
  shadowMd: '0 8px 36px rgba(28,18,11,0.08)',
  r:        14,
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-componentes
// ─────────────────────────────────────────────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{ background: D.surface, borderRadius: D.r, border: `1px solid ${D.border}`, boxShadow: D.shadow, ...style }}>
      {children}
    </div>
  )
}

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <Card style={{ padding: '22px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: D.t3, display: 'block', marginBottom: 8 }}>
            {label}
          </span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(28px,5vw,40px)', color: accent || D.t1, lineHeight: 1 }}>
            {value}
          </span>
          {sub && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t3, display: 'block', marginTop: 6 }}>
              {sub}
            </span>
          )}
        </div>
        <span style={{ fontSize: 28, opacity: 0.75 }}>{icon}</span>
      </div>
    </Card>
  )
}

// Barra horizontal de porcentaje
function PercentBar({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: D.t2 }}>{label}</span>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, color: D.t1 }}>{value.toLocaleString('es-MX')}</span>
      </div>
      <div style={{ height: 8, background: D.border, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard principal
// ─────────────────────────────────────────────────────────────────────────────
export function DashboardBoda() {
  const [usingSeed, setUsingSeed] = React.useState(false)
  const [confirmClear, setConfirmClear] = React.useState(false)
  const [refreshKey, setRefreshKey] = React.useState(0)

  const rawEvents = React.useMemo(() => {
    const real = getEvents(INVITATION_ID)
    if (real.length === 0) {
      setUsingSeed(true)
      return buildSeedEvents()
    }
    setUsingSeed(false)
    return real
  }, [refreshKey])

  const data = React.useMemo(() => processEvents(rawEvents), [rawEvents])
  const maxViews = Math.max(...data.days.map(d => d.views), 1)

  const handleClear = () => {
    if (confirmClear) {
      clearEvents(INVITATION_ID)
      setConfirmClear(false)
      setRefreshKey(k => k + 1)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  const lastUpdated = new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div style={{ background: D.bg, minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: D.surface, borderBottom: `1px solid ${D.border}`,
        padding: '20px clamp(20px,5vw,56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        position: 'sticky', top: 0, zIndex: 100, boxShadow: D.shadow,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${D.accent}, #9A6A4A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: 18 }}>📊</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: D.t1 }}>
              Analytics · Boda
            </div>
            <div style={{ fontFamily: 'Great Vibes, cursive', fontSize: 18, color: D.t2, lineHeight: 1 }}>
              Sofía &amp; Alejandro · 20 septiembre 2026
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', align: 'center', gap: 12, flexWrap: 'wrap' }}>
          {usingSeed && (
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600,
              background: D.accentBg, color: D.accent,
              borderRadius: 9999, padding: '4px 12px', letterSpacing: 1,
            }}>
              DATOS DE MUESTRA
            </span>
          )}
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t3, alignSelf: 'center' }}>
            Actualizado {lastUpdated}
          </span>
          {!usingSeed && (
            <button onClick={handleClear} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600,
              background: 'transparent', border: `1px solid ${D.border}`,
              borderRadius: 9999, padding: '6px 14px',
              color: confirmClear ? '#C0504A' : D.t3, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {confirmClear ? '¿Borrar todo? Confirmar' : '🗑 Resetear datos'}
            </button>
          )}
        </div>
      </div>

      {/* ── Contenido ──────────────────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(24px,4vw,48px) clamp(20px,5vw,56px)', maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Métricas principales ─────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
          <StatCard label="Total de visitas"  value={data.totalViews.toLocaleString('es-MX')} sub="Personas únicas (por sesión)" icon="👁" accent={D.accent} />
          <StatCard label="RSVP WhatsApp"     value={data.waClicks}  sub="Tocaron Confirmar por WhatsApp"    icon="💬" accent={D.sage}   />
          <StatCard label="Jugaron la trivia" value={data.triviaPlays} sub={`Promedio: ${data.triviaAvgPct}% correcto`} icon="🧠" />
          <StatCard label="Vieron su pase QR" value={data.paseViews} sub="Abrieron el pase digital"          icon="🎫" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px,1fr) minmax(240px,340px)', gap: 16, marginBottom: 16 }}>

          {/* ── Gráfica de visitas últimos 7 días ───────────────────────── */}
          <Card style={{ padding: '24px 28px' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: D.t1, margin: '0 0 24px' }}>
              Visitas — últimos 7 días
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
              {data.days.map((d) => {
                const heightPct = maxViews > 0 ? (d.views / maxViews) * 100 : 0
                const isToday   = d.label === 'Hoy'
                return (
                  <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 11, color: isToday ? D.accent : D.t3 }}>
                      {d.views}
                    </span>
                    <div style={{
                      width: '100%', borderRadius: '6px 6px 0 0',
                      background: isToday ? D.accent : `${D.accent}45`,
                      height: `${Math.max(heightPct, 4)}%`,
                      transition: 'height 0.6s ease',
                      minHeight: 4,
                    }} />
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: isToday ? 700 : 500, color: isToday ? D.accent : D.t3, textTransform: 'capitalize' }}>
                      {d.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* ── Dispositivos ─────────────────────────────────────────────── */}
          <Card style={{ padding: '24px 28px' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: D.t1, margin: '0 0 24px' }}>
              Dispositivos
            </h3>
            <PercentBar label="📱 Móvil"      value={data.mobile}  max={data.totalViews} color={D.accent} />
            <PercentBar label="💻 Escritorio" value={data.desktop} max={data.totalViews} color={D.sage}   />

            <div style={{ marginTop: 24, padding: '14px', background: D.accentBg, borderRadius: D.r - 4 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t2, margin: 0, lineHeight: 1.6 }}>
                💡 <strong style={{ color: D.t1 }}>{data.totalViews > 0 ? Math.round((data.mobile / data.totalViews) * 100) : 0}%</strong> de tus invitados abrió la invitación desde el celular — por eso Invitaura optimiza primero para móvil.
              </p>
            </div>
          </Card>
        </div>

        {/* ── Acciones detalladas ──────────────────────────────────────────── */}
        <Card style={{ padding: '24px 28px' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: D.t1, margin: '0 0 24px' }}>
            Acciones de los invitados
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 24 }}>
            {[
              { icon: '💬', label: 'Confirmaron asistencia',    value: data.waClicks,    desc: 'Tocaron el botón de WhatsApp RSVP',          color: '#25D366' },
              { icon: '📅', label: 'Agregaron al calendario',   value: data.calClicks,   desc: 'Guardaron la fecha en Google Calendar',       color: '#4285F4' },
              { icon: '🧠', label: 'Completaron la trivia',     value: data.triviaPlays, desc: `Promedio de aciertos: ${data.triviaAvgPct}%`, color: D.accent  },
              { icon: '🎫', label: 'Revisaron su pase QR',      value: data.paseViews,   desc: 'Abrieron su pase de acceso digital',          color: D.sage    },
            ].map(({ icon, label, value, desc, color }) => (
              <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {icon}
                </div>
                <div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, color: D.t1, display: 'block', lineHeight: 1 }}>
                    {value.toLocaleString('es-MX')}
                  </span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, color: D.t1, display: 'block', margin: '4px 0 3px' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t3 }}>
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Nota al pie ──────────────────────────────────────────────────── */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t3, textAlign: 'center', marginTop: 32, lineHeight: 1.7 }}>
          {usingSeed
            ? 'Estos son datos de muestra. Comparte la invitación con tus invitados y aquí verás sus datos reales.'
            : 'Los datos se actualizan en tiempo real. Solo tú tienes acceso a este panel.'
          }
        </p>

      </div>
    </div>
  )
}
