// app.jsx — main App, Tweaks, mount

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "oscuro",
  "ambiente": "ceremonial",
  "auraLevel": 3,
  "particleMode": "ember",
  "atmosfera": "aurora",
  "lang": "es"
}/*EDITMODE-END*/;

// ── Feel system ───────────────────────────────────────────────────────────────
function computeFeel(tweaks) {
  const goldByLevel = {
    1: '#6B5516', 2: '#9E7D20', 3: '#D4AF37', 4: '#EAC94E', 5: '#FFE566',
  };
  const heroByAmbiente = {
    intimo:      'clamp(36px, 5.5vw, 78px)',
    ceremonial:  'clamp(52px, 10vw, 130px)',
    vanguardista:'clamp(76px, 13vw, 168px)',
  };
  const spacingByAmbiente = { intimo: 0.7, ceremonial: 1.0, vanguardista: 1.35 };

  return {
    gold:     goldByLevel[tweaks.auraLevel] || '#D4AF37',
    heroSize: heroByAmbiente[tweaks.ambiente] || heroByAmbiente.ceremonial,
    spacing:  spacingByAmbiente[tweaks.ambiente] || 1.0,
    glow:     tweaks.auraLevel >= 4,
  };
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState('home');
  const [transitioning, setTransitioning] = React.useState(false);
  const [displayPage, setDisplayPage] = React.useState('home');

  const lang = tweaks.lang;
  const setLang = (l) => setTweaks(p => ({ ...p, lang: l }));
  const theme = tweaks.theme;
  const isLight = theme === 'champagne';
  const feel = computeFeel(tweaks);

  const navigateTo = (newPage) => {
    if (newPage === displayPage) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayPage(newPage);
      setPage(newPage);
      window.scrollTo(0, 0);
      setTimeout(() => setTransitioning(false), 50);
    }, 320);
  };

  const particleColors = {
    oscuro:    ['#D4AF37', '#C5A059', '#F5E27A', '#B8960A'],
    midnight:  ['#8B9FD4', '#6B7FBF', '#D4AF37', '#C5A059'],
    champagne: ['#D4AF37', '#C5A059', '#B8960A'],
  }[theme] || ['#D4AF37', '#C5A059'];

  // Tint particle colors with aura gold
  const tintedColors = tweaks.auraLevel !== 3
    ? [feel.gold, ...particleColors.slice(1)]
    : particleColors;

  const pageProps = { lang, setPage: navigateTo, theme, feel };

  const pages = {
    home:      <HomePage      {...pageProps} />,
    portfolio: <PortfolioPage {...pageProps} />,
    pricing:   <PricingPage   {...pageProps} />,
    about:     <AboutPage     {...pageProps} />,
    contact:   <ContactPage   {...pageProps} />,
  };

  const showParticles = tweaks.particleMode !== 'none' && theme !== 'champagne';

  return (
    <div style={{ position:'relative', minHeight:'100vh', cursor:'none' }}>
      {/* Glow injection for high aura levels */}
      {feel.glow && (
        <style>{`
          [data-glow] { filter: drop-shadow(0 0 18px ${feel.gold}70) !important; }
          h2, h3 { text-shadow: 0 0 30px ${feel.gold}30; }
        `}</style>
      )}

      {/* Atmospheric background */}
      <BackgroundFX mode={tweaks.atmosfera} theme={theme} />

      {/* Particles */}
      {showParticles && (
        <ParticleCanvas
          colors={tintedColors}
          count={tweaks.ambiente === 'vanguardista' ? 140 : tweaks.ambiente === 'intimo' ? 70 : 110}
          mode={tweaks.particleMode}
        />
      )}

      {/* Cursor */}
      <CustomCursor color={feel.gold} />

      {/* Nav */}
      <NavBar page={page} setPage={navigateTo} lang={lang} setLang={setLang} theme={theme} />

      {/* Transition overlay */}
      <div style={{
        position:'fixed', inset:0, zIndex:200, pointerEvents:'none',
        background:'linear-gradient(135deg, #0c0a06, #1a1208)',
        opacity: transitioning ? 1 : 0, transition:'opacity 0.3s ease',
      }}/>

      {/* Pages */}
      <div style={{ position:'relative', zIndex:1 }}>
        {pages[displayPage]}
      </div>

      {/* Footer */}
      <footer style={{
        background: isLight ? '#1a1208' : 'transparent',
        borderTop:'1px solid rgba(212,175,55,0.12)', padding:'40px 48px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
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
          {['Instagram','TikTok','Facebook'].map(s => (
            <a key={s} href="#" style={{
              fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:2,
              color:`${feel.gold}70`, textDecoration:'none', transition:'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = feel.gold}
              onMouseLeave={e => e.currentTarget.style.color = `${feel.gold}70`}
            >{s}</a>
          ))}
        </div>
      </footer>

      <WhatsAppBtn lang={lang} />
      <TweaksWrapper tweaks={tweaks} setTweaks={setTweaks} feel={feel} />
    </div>
  );
}

// ── TweaksWrapper ─────────────────────────────────────────────────────────────
function TweaksWrapper({ tweaks, setTweaks, feel }) {
  const goldSwatch = (level) => {
    const colors = { 1:'#6B5516', 2:'#9E7D20', 3:'#D4AF37', 4:'#EAC94E', 5:'#FFE566' };
    return `<svg viewBox='0 0 40 24' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='24' fill='${colors[level]}'/></svg>`;
  };

  return (
    <TweaksPanel title="Tweaks">

      {/* ── Ambiente ── */}
      <TweakSection label="Ambiente">
        <TweakRadio
          label="Escala y energía"
          value={tweaks.ambiente}
          options={[
            { value:'intimo',       label:'Íntimo' },
            { value:'ceremonial',   label:'Ceremonial' },
            { value:'vanguardista', label:'Vanguardista' },
          ]}
          onChange={v => setTweaks(p => ({ ...p, ambiente: v }))}
        />
        <p style={{ fontSize:11, color:'#888', fontFamily:'sans-serif', marginTop:6, lineHeight:1.5 }}>
          { tweaks.ambiente === 'intimo'       ? 'Espacios suaves, tipografía íntima. Para eventos cercanos y personales.' :
            tweaks.ambiente === 'ceremonial'   ? 'Equilibrio clásico. Elegancia atemporal.' :
            'Escala dramática, presencia cinematográfica. Máximo impacto.' }
        </p>
      </TweakSection>

      {/* ── Aura del Oro ── */}
      <TweakSection label="Aura del Oro">
        <TweakSlider
          label={`Intensidad — ${['Susurro','Tenue','Clásico','Radiante','Deslumbrante'][tweaks.auraLevel - 1]}`}
          value={tweaks.auraLevel}
          min={1} max={5} step={1}
          onChange={v => setTweaks(p => ({ ...p, auraLevel: v }))}
        />
        <div style={{ display:'flex', gap:6, marginTop:10 }}>
          {[1,2,3,4,5].map(n => (
            <div key={n}
              onClick={() => setTweaks(p => ({ ...p, auraLevel: n }))}
              title={['Susurro','Tenue','Clásico','Radiante','Deslumbrante'][n-1]}
              style={{
                flex:1, height:20, cursor:'pointer',
                background: {1:'#6B5516',2:'#9E7D20',3:'#D4AF37',4:'#EAC94E',5:'#FFE566'}[n],
                outline: tweaks.auraLevel === n ? '2px solid white' : 'none',
                outlineOffset: 1,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </TweakSection>

      {/* ── Atmósfera ── */}
      <TweakSection label="Atmósfera">
        <TweakRadio
          label="Fondo"
          value={tweaks.atmosfera}
          options={[
            { value:'aurora',   label:'Aurora Dorada' },
            { value:'brasa',    label:'Brasa Viva' },
            { value:'catedral', label:'Catedral' },
            { value:'none',     label:'Vacío' },
          ]}
          onChange={v => setTweaks(p => ({ ...p, atmosfera: v }))}
        />
        <p style={{ fontSize:11, color:'#888', fontFamily:'sans-serif', marginTop:6, lineHeight:1.5 }}>
          { tweaks.atmosfera === 'aurora'   ? 'Mesh gradient en movimiento. Lujo digital, vivo y premium.' :
            tweaks.atmosfera === 'brasa'    ? 'Calor desde las esquinas con pulso suave. Íntimo como cena a la luz de las velas.' :
            tweaks.atmosfera === 'catedral' ? 'Spotlight teatral con rayos dorados. Dramático y ceremonial.' :
            'Fondo limpio, sin atmósfera.' }
        </p>
      </TweakSection>

      {/* ── Partículas ── */}
      <TweakSection label="Partículas">
        <TweakRadio
          label="Comportamiento"
          value={tweaks.particleMode}
          options={[
            { value:'ember',         label:'Ascua ↑' },
            { value:'constellation', label:'Constelación ✦' },
            { value:'rain',          label:'Lluvia ↓' },
            { value:'none',          label:'Ninguna' },
          ]}
          onChange={v => setTweaks(p => ({ ...p, particleMode: v }))}
        />
      </TweakSection>

      {/* ── Tema ── */}
      <TweakSection label="Tema">
        <TweakRadio
          label="Paleta"
          value={tweaks.theme}
          options={[
            { value:'oscuro',    label:'Oscuro Ritual' },
            { value:'midnight',  label:'Medianoche' },
            { value:'champagne', label:'Champagne' },
          ]}
          onChange={v => setTweaks(p => ({ ...p, theme: v }))}
        />
        <TweakRadio
          label="Idioma"
          value={tweaks.lang}
          options={[{ value:'es', label:'Español' }, { value:'en', label:'English' }]}
          onChange={v => setTweaks(p => ({ ...p, lang: v }))}
        />
      </TweakSection>

    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
