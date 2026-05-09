// ─────────────────────────────────────────────────────────────────────────────
// Tracker de eventos para invitaciones Invitaura
// Guarda en localStorage. Para conectar a un backend real, reemplaza
// la función `persist` con un fetch/sendBeacon a tu endpoint.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_PREFIX = 'invitaura_analytics_'

function getKey(invitationId) {
  return `${STORAGE_PREFIX}${invitationId}`
}

function loadEvents(invitationId) {
  try {
    return JSON.parse(localStorage.getItem(getKey(invitationId))) || []
  } catch {
    return []
  }
}

function saveEvents(invitationId, events) {
  try {
    localStorage.setItem(getKey(invitationId), JSON.stringify(events))
  } catch { /* localStorage lleno o bloqueado */ }
}

// Detecta dispositivo del visitante
function getDevice() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

// Evita contar la misma sesión dos veces para eventos de "vista"
const SESSION_KEY = 'invitaura_session'
function isNewSession(invitationId) {
  const seen = sessionStorage.getItem(SESSION_KEY)
  if (seen === invitationId) return false
  sessionStorage.setItem(SESSION_KEY, invitationId)
  return true
}

/**
 * Registra un evento en la invitación.
 * @param {string} invitationId  - ID único de la invitación, ej: 'boda-sofia-alejandro'
 * @param {string} event         - Nombre del evento: 'view' | 'whatsapp_rsvp' | 'calendar_add' | 'trivia_complete' | 'pase_view'
 * @param {object} data          - Datos adicionales opcionales, ej: { score: 4, total: 5 }
 */
export function track(invitationId, event, data = {}) {
  // Para eventos de vista, solo una vez por sesión de navegador
  if (event === 'view' && !isNewSession(invitationId)) return

  const entry = {
    event,
    date: new Date().toISOString().slice(0, 10),   // 'YYYY-MM-DD'
    ts:   Date.now(),
    device: getDevice(),
    ...data,
  }

  const events = loadEvents(invitationId)
  events.push(entry)
  saveEvents(invitationId, events)
}

/**
 * Devuelve todos los eventos registrados para una invitación.
 */
export function getEvents(invitationId) {
  return loadEvents(invitationId)
}

/**
 * Borra todos los eventos de una invitación.
 */
export function clearEvents(invitationId) {
  localStorage.removeItem(getKey(invitationId))
}
