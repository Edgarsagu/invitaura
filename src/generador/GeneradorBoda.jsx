import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG DEL EVENTO — mismos datos que BodaDemo
// ─────────────────────────────────────────────────────────────────────────────
const EVENTO = {
  novia:        'Sofía',
  novio:        'Alejandro',
  fechaDisplay: '20 · septiembre · 2026',
  // En producción cambia a la URL real del cliente
  get baseUrl() { return `${window.location.origin}/demos/boda` },
  whatsappMsg: (nombre, link) =>
    `Hola ${nombre} 🌸\n\nTe compartimos tu invitación personalizada para nuestra boda. Incluye tu pase de acceso con código QR para el día del evento:\n\n${link}\n\n¡Esperamos verte pronto! 💕\nSofía & Alejandro`,
}

const STORAGE_KEY = 'invitaura_gen_boda_sofia_alejandro'

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
  danger:   '#C0504A',
  dangerBg: '#FBF0EF',
  border:   'rgba(140,100,75,0.13)',
  shadow:   '0 2px 16px rgba(28,18,11,0.05)',
  shadowMd: '0 8px 36px rgba(28,18,11,0.08)',
  r:        14,
  rSm:      8,
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function buildLink(nombre, mesa, pases) {
  if (!nombre.trim()) return ''
  let url = `${EVENTO.baseUrl}?invitado=${encodeURIComponent(nombre.trim())}`
  if (mesa) url += `&mesa=${encodeURIComponent(mesa)}`
  url += `&pases=${pases}`
  return url
}

function buildQrValue(nombre, mesa, pases) {
  return [
    '✓ INVITAURA',
    `${EVENTO.novia} & ${EVENTO.novio}`,
    EVENTO.fechaDisplay,
    nombre,
    mesa ? `Mesa ${mesa}` : '',
    `${pases} persona${pases !== '1' ? 's' : ''}`,
  ].filter(Boolean).join(' · ')
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-componentes UI
// ─────────────────────────────────────────────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{ background: D.surface, borderRadius: D.r, border: `1px solid ${D.border}`, boxShadow: D.shadow, ...style }}>
      {children}
    </div>
  )
}

function Label({ children }) {
  return (
    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: D.t3, display: 'block', marginBottom: 7 }}>
      {children}
    </span>
  )
}

function Input({ value, onChange, placeholder, type = 'text', maxLength }) {
  const [focus, setFocus] = React.useState(false)
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: '100%',
        fontFamily: 'Inter, sans-serif', fontSize: 15, color: D.t1,
        background: D.bg, border: `1.5px solid ${focus ? D.accent : D.border}`,
        borderRadius: D.rSm, padding: '11px 14px',
        outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
      }}
    />
  )
}

function Btn({ children, onClick, variant = 'primary', disabled, style }) {
  const [hover, setHover] = React.useState(false)
  const base = {
    fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13,
    border: 'none', borderRadius: D.rSm, cursor: disabled ? 'not-allowed' : 'pointer',
    padding: '12px 20px', transition: 'all 0.2s', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', gap: 8,
    opacity: disabled ? 0.45 : 1, ...style,
  }
  const variants = {
    primary:  { background: hover && !disabled ? '#9A6A4A' : D.accent, color: '#fff', boxShadow: disabled ? 'none' : `0 4px 16px ${D.accent}35` },
    ghost:    { background: hover ? D.accentBg : 'transparent', color: D.accent, border: `1.5px solid ${hover ? D.accent : `${D.accent}40`}` },
    danger:   { background: hover ? D.danger : 'transparent', color: hover ? '#fff' : D.danger, border: `1.5px solid ${D.danger}40` },
    whatsapp: { background: hover ? '#1DA851' : '#25D366', color: '#fff', boxShadow: '0 4px 14px rgba(37,211,102,0.25)' },
  }
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant] }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Preview del pase (mini ticket)
// ─────────────────────────────────────────────────────────────────────────────
function PasePreview({ nombre, mesa, pases }) {
  const hasData = nombre.trim()
  const qrValue = hasData ? buildQrValue(nombre, mesa, pases) : ''

  return (
    <div style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
      {/* Cabecera del ticket */}
      <div style={{
        background: hasData ? `linear-gradient(135deg, ${D.accent}, #9A6A4A)` : D.border,
        borderRadius: `${D.r}px ${D.r}px 0 0`,
        padding: '20px 20px 18px',
        textAlign: 'center',
        transition: 'background 0.4s',
      }}>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 8, letterSpacing: 3.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
          Pase de acceso
        </span>
        <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: 28, color: '#fff', display: 'block', lineHeight: 1.1 }}>
          {EVENTO.novia} &amp; {EVENTO.novio}
        </span>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.65)', display: 'block', marginTop: 5, textTransform: 'uppercase' }}>
          {EVENTO.fechaDisplay}
        </span>
      </div>

      {/* Borde perforado */}
      <div style={{ display: 'flex', alignItems: 'center', background: D.bg }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: D.bg, flexShrink: 0, marginLeft: -9, border: `1px solid ${D.border}` }} />
        <div style={{ flex: 1, borderTop: `2px dashed ${D.border}` }} />
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: D.bg, flexShrink: 0, marginRight: -9, border: `1px solid ${D.border}` }} />
      </div>

      {/* Cuerpo */}
      <div style={{ background: D.surface, borderRadius: `0 0 ${D.r}px ${D.r}px`, border: `1px solid ${D.border}`, borderTop: 'none', padding: '20px', textAlign: 'center' }}>
        {hasData ? (
          <>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: D.t3, display: 'block', marginBottom: 5 }}>Invitado</span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: D.t1, display: 'block', marginBottom: 14 }}>{nombre}</span>

            <div style={{ display: 'inline-block', padding: 10, borderRadius: 10, border: `1px solid ${D.border}`, background: '#fff', marginBottom: 14 }}>
              <QRCodeSVG value={qrValue} size={110} bgColor="#ffffff" fgColor={D.t1} level="M" includeMargin={false} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
              {mesa && (
                <div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: D.t3, display: 'block', marginBottom: 3 }}>Mesa</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 22, color: D.accent }}>{mesa}</span>
                </div>
              )}
              <div>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: D.t3, display: 'block', marginBottom: 3 }}>Personas</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 22, color: D.t1 }}>{pases}</span>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: '24px 0', color: D.t3, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
            Escribe el nombre del invitado<br />para ver el preview
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Fila de invitado en la lista
// ─────────────────────────────────────────────────────────────────────────────
function GuestRow({ guest, onRemove }) {
  const [copied, setCopied] = React.useState(false)

  const copy = () => {
    navigator.clipboard.writeText(guest.link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const sendWA = () => {
    const tel = guest.telefono ? `521${guest.telefono.replace(/\D/g, '')}` : ''
    const msg = EVENTO.whatsappMsg(guest.nombre, guest.link)
    const url = tel
      ? `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: `1px solid ${D.border}`,
      flexWrap: 'wrap',
    }}>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 160 }}>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, color: D.t1, display: 'block' }}>
          {guest.nombre}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t3 }}>
          {[guest.mesa && `Mesa ${guest.mesa}`, `${guest.pases} persona${guest.pases !== '1' ? 's' : ''}`].filter(Boolean).join(' · ')}
        </span>
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <Btn variant="ghost" onClick={copy} style={{ padding: '8px 14px', fontSize: 12 }}>
          {copied ? '✓ Copiado' : '📋 Copiar'}
        </Btn>
        <Btn variant="whatsapp" onClick={sendWA} style={{ padding: '8px 14px', fontSize: 12 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </Btn>
        <button onClick={onRemove} title="Eliminar" style={{
          background: 'transparent', border: `1.5px solid ${D.border}`,
          borderRadius: D.rSm, padding: '8px 10px', cursor: 'pointer',
          color: D.t3, fontSize: 14, transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = D.danger; e.currentTarget.style.color = D.danger }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = D.border; e.currentTarget.style.color = D.t3 }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
export function GeneradorBoda() {
  const [nombre,   setNombre]   = React.useState('')
  const [mesa,     setMesa]     = React.useState('')
  const [pases,    setPases]    = React.useState('1')
  const [telefono, setTelefono] = React.useState('')
  const [linkCopied, setLinkCopied] = React.useState(false)
  const [confirmClear, setConfirmClear] = React.useState(false)

  const [guests, setGuests] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
    catch { return [] }
  })

  const link = buildLink(nombre, mesa, pases)
  const canGenerate = nombre.trim().length > 0

  const saveGuests = (list) => {
    setGuests(list)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  const handleGenerar = () => {
    if (!canGenerate) return
    const nuevo = {
      nombre: nombre.trim(), mesa, pases, telefono,
      link, fecha: new Date().toLocaleString('es-MX'),
    }
    // Reemplaza si ya existe el mismo nombre
    const updated = [nuevo, ...guests.filter(g => g.nombre !== nuevo.nombre)]
    saveGuests(updated)
    // Copia el link automáticamente
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2500)
    })
    // Limpia el formulario para el siguiente
    setNombre(''); setMesa(''); setPases('1'); setTelefono('')
  }

  const removeGuest = (nombre) => saveGuests(guests.filter(g => g.nombre !== nombre))

  const clearAll = () => {
    if (confirmClear) { saveGuests([]); setConfirmClear(false) }
    else { setConfirmClear(true); setTimeout(() => setConfirmClear(false), 3000) }
  }

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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 18 }}>🎫</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: D.t1 }}>
              Generador de pases
            </div>
            <div style={{ fontFamily: 'Great Vibes, cursive', fontSize: 18, color: D.t2, lineHeight: 1 }}>
              {EVENTO.novia} &amp; {EVENTO.novio} · {EVENTO.fechaDisplay}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: D.t3, fontWeight: 500 }}>
          {guests.length} invitado{guests.length !== 1 ? 's' : ''} generado{guests.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(24px,4vw,48px) clamp(20px,5vw,56px)', maxWidth: 1100, margin: '0 auto' }}>

        {/* Formulario + Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px,1fr) minmax(260px,340px)', gap: 24, alignItems: 'start', marginBottom: 32 }}>

          {/* ── Formulario ───────────────────────────────────────────────── */}
          <Card style={{ padding: 'clamp(20px,4vw,32px)' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: D.t1, margin: '0 0 28px' }}>
              Nuevo pase
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <Label>Nombre del invitado *</Label>
                <Input
                  value={nombre}
                  onChange={setNombre}
                  placeholder="Ej: Eduardo Torres"
                  maxLength={60}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <Label>Número de mesa</Label>
                  <Input value={mesa} onChange={setMesa} placeholder="Ej: 5" maxLength={4} />
                </div>
                <div>
                  <Label>Pases (personas)</Label>
                  <select
                    value={pases}
                    onChange={e => setPases(e.target.value)}
                    style={{
                      width: '100%', fontFamily: 'Inter, sans-serif', fontSize: 15, color: D.t1,
                      background: D.bg, border: `1.5px solid ${D.border}`,
                      borderRadius: D.rSm, padding: '11px 14px', outline: 'none',
                    }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={String(n)}>{n} persona{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>WhatsApp del invitado (opcional)</Label>
                <Input
                  value={telefono}
                  onChange={setTelefono}
                  placeholder="Ej: 3312345678"
                  type="tel"
                  maxLength={10}
                />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: D.t3, marginTop: 5, display: 'block' }}>
                  Sin código de país — se agrega automáticamente
                </span>
              </div>
            </div>

            {/* Link generado */}
            {link && (
              <div style={{
                marginTop: 24, padding: '12px 14px',
                background: D.accentBg, borderRadius: D.rSm,
                border: `1px solid ${D.accent}30`,
              }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: D.accent, display: 'block', marginBottom: 6 }}>
                  Link generado
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: D.t2, wordBreak: 'break-all', display: 'block', lineHeight: 1.5 }}>
                  {link}
                </span>
              </div>
            )}

            {/* Acciones */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              <Btn
                onClick={handleGenerar}
                disabled={!canGenerate}
                style={{ flex: 1, minWidth: 140 }}
              >
                {linkCopied ? '✓ Link copiado' : '✦ Generar pase'}
              </Btn>
            </div>
            {linkCopied && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.sage, marginTop: 10, textAlign: 'center' }}>
                ✓ Pase generado y link copiado — listo para pegar en WhatsApp
              </p>
            )}
          </Card>

          {/* ── Preview ──────────────────────────────────────────────────── */}
          <div style={{ position: 'sticky', top: 100 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: D.t2, margin: '0 0 16px', textAlign: 'center' }}>
              Preview del pase
            </h2>
            <PasePreview nombre={nombre} mesa={mesa} pases={pases} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: D.t3, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              El QR es escaneable por cualquier<br />cámara de celular
            </p>
          </div>
        </div>

        {/* ── Lista de invitados ──────────────────────────────────────────── */}
        {guests.length > 0 && (
          <Card>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: D.t1, margin: 0 }}>
                  Lista de invitados
                </h3>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: D.t3 }}>
                  {guests.length} pase{guests.length !== 1 ? 's' : ''} generado{guests.length !== 1 ? 's' : ''} · {guests.reduce((sum, g) => sum + parseInt(g.pases), 0)} personas en total
                </span>
              </div>
              <Btn variant="danger" onClick={clearAll} style={{ padding: '8px 16px', fontSize: 12 }}>
                {confirmClear ? '¿Confirmar? Toca de nuevo' : '🗑 Limpiar lista'}
              </Btn>
            </div>

            {guests.map(g => (
              <GuestRow key={g.nombre} guest={g} onRemove={() => removeGuest(g.nombre)} />
            ))}
          </Card>
        )}

        {guests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: D.t3 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎫</div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500 }}>
              Aún no hay pases generados
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, marginTop: 6 }}>
              Escribe el nombre de tu primer invitado y toca "Generar pase"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
