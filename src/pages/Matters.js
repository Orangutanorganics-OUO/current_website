import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Matters.css";

const WHY_ITEMS = [
  { id: "pillar-1", type: "Pillar", title: "We protect native seeds & biodiversity", emoji: "🌾",
    description: "Safeguarding heirloom seeds and diverse landraces to keep Himalayan foodways alive.",
    tags: ["Seeds","Biodiversity","Authenticity","Traceability"] },
  { id: "pillar-2", type: "Pillar", title: "We protect water sources & soil health", emoji: "💧",
    description: "Low-water practices, organic soil care, and farmer-led stewardship to regenerate land.",
    tags: ["Water","Soil","Regeneration"] },
  { id: "pillar-3", type: "Pillar", title: "We protect farmer dignity & livelihoods", emoji: "🙌",
    description: "Fair storytelling, pride-first narratives, and practical incentives that reward good practice.",
    tags: ["Dignity","Livelihoods","Community"] },
  { id: "statement-1", type: "Statement",
    title: "Buying from OUO = standing up for the planet & Himalayan farmers", emoji: "🟢",
    description: "Every purchase fuels seed protection, water-wise cultivation, and farmer-first programs.",
    tags: ["Support","Impact","Community"] },
  { id: "project-1", type: "Project", year: "2023–ongoing", region: "Uttarakhand",
    title: "Seed Swap Circles in Uttarakhand", emoji: "🧬",
    description: "Six farmer-led seed swap circles in remote villages enabling free exchange of heirloom seeds.",
    bullets: [
      "30+ varieties of native pulses and millets reintroduced",
      "80+ farmers actively participating",
      "No money exchanged — only community knowledge and biodiversity sharing"
    ],
    quote: "This year, I sowed rajma seeds my grandfather once used. I thought they were lost forever. — Aarti Devi, smallholder from Pauri Garhwal",
    tags: ["Seeds","Biodiversity","Community","Uttarakhand","2023"] },
  { id: "project-2", type: "Project", year: "2022", region: "Pithoragarh",
    title: "Low-Water Farming Trials", emoji: "💧",
    description: "Piloted mulching + drip on 10 test plots of rajma and amaranth with local liaison support.",
    bullets: [
      "Reduced water use by ~40%",
      "Maintained yields within ~5% of control group",
      "Expanding to 50+ plots next season"
    ],
    tags: ["Water","Soil","Trials","Pithoragarh","2022"] },
  { id: "project-3", type: "Project", year: "2024", region: "2 pilot villages",
    title: "Compost-Back Incentive Program", emoji: "♻️",
    description: "Barter-style bonus payments per kg of certified organic produce for farmers using own compost.",
    bullets: [
      "Pilot in 2 villages this harvest season",
      "17 farmers enrolled so far",
      "Adds traceability to soil health practices"
    ],
    tags: ["Soil","Compost","Traceability","2024"] },
  { id: "project-4", type: "Project", year: "Ongoing", region: "Himalayan villages",
    title: "Farmer Photo Stories — No Filters, Just Faces", emoji: "🧑‍🌾",
    description: "Each pack links via QR to a rotating, unfiltered farmer story — visibility equals dignity.",
    bullets: [
      "QR code on packs links to a real farmer story",
      "Rotated monthly to spotlight new voices",
      "98% of consumers surveyed felt more connected to their food"
    ],
    tags: ["Dignity","Stories","QR","Ongoing"] }
];

const ALL_TYPES = Array.from(new Set(WHY_ITEMS.map(i => i.type)));
const ALL_TAGS = Array.from(new Set(WHY_ITEMS.flatMap(i => i.tags || []))).sort();
const ALL_YEARS = Array.from(new Set(WHY_ITEMS.map(i => i.year).filter(Boolean)));
const ALL_REGIONS = Array.from(new Set(WHY_ITEMS.map(i => i.region).filter(Boolean)));

// ===== NEW REDESIGN — WAVE THEME — START =====
const M = {
  DEEP_FOREST:'#03605C', DEEP_FOREST_DK:'#024442', FOREST_SHADOW:'#013532',
  INK:'#655F59', SEAL_TERRACOTTA:'#D76427', CREAM:'#F8F3EB', CREAM_SOFT:'#F1E7CE',
  PAPER:'#F8F3EB', MEADOW_GOLD:'#B5882D', GOLD_LINE:'#B5882D',
  SOIL_OLIVE:'#618E69', BRAND_TEAL:'#5D9C9D',
  BRAND_BROWN:'#826845', BRAND_GREEN:'#618E69', OCHRE:'#A56650',
};

const TYPE_TONE = {
  Pillar:    M.BRAND_GREEN,
  Statement: M.MEADOW_GOLD,
  Project:   M.BRAND_TEAL,
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [M.CREAM, M.CREAM_SOFT];
  const style = { transform: flip ? 'scaleY(-1)' : 'none', display: 'block', width: '100%', height };
  return (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" style={style}>
      <path d="M0,32 C220,4 460,72 720,36 C980,0 1220,60 1440,28 L1440,100 L0,100 Z"
            fill={layers[0]} opacity="0.95"/>
      {layers[1] && (
        <path d="M0,52 C260,28 480,80 780,52 C1060,26 1260,72 1440,48 L1440,100 L0,100 Z"
              fill={layers[1]} opacity="0.65"/>
      )}
      {layers[2] && (
        <path d="M0,72 C300,54 520,90 800,72 C1080,54 1260,88 1440,72 L1440,100 L0,100 Z"
              fill={layers[2]} opacity="0.4"/>
      )}
      <path d="M0,34 C220,6 460,74 720,38 C980,2 1220,62 1440,30"
            stroke={M.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

function Controls({ query,setQuery, type,setType, year,setYear, region,setRegion, tags,setTags, reset }) {
  return (
    <div className="wtn-m-controls">
      <div className="wtn-m-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <input value={query} placeholder="Search pillars, projects, or tags…"
               onChange={(e)=>setQuery(e.target.value)} />
      </div>
      <select className="wtn-m-select" value={type || ""} onChange={e => setType(e.target.value || null)}>
        <option value="">All types</option>
        {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select className="wtn-m-select" value={year || ""} onChange={e => setYear(e.target.value || null)}>
        <option value="">Any year</option>
        {ALL_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <select className="wtn-m-select" value={region || ""} onChange={e => setRegion(e.target.value || null)}>
        <option value="">Any region</option>
        {ALL_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <button type="button" className="wtn-btn wtn-btn--ghost" onClick={reset}>Reset</button>
      <div className="wtn-m-chips">
        {ALL_TAGS.map(tag => {
          const active = tags.includes(tag);
          return (
            <button key={tag} type="button"
              className={`wtn-m-chip ${active?'is-active':''}`}
              onClick={()=>{ setTags(active? tags.filter(t=>t!==tag) : [...tags, tag]); }}>
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Card({ item }) {
  const tone = TYPE_TONE[item.type] || M.DEEP_FOREST;
  return (
    <article className="wtn-m-card">
      <span className="wtn-m-card__type" style={{ background: tone }}>{item.type}</span>
      <div className="wtn-m-card__head">
        <span className="wtn-m-card__emoji" aria-hidden>{item.emoji}</span>
        <h3 className="wtn-m-card__title">{item.title}</h3>
      </div>
      {(item.year || item.region) && (
        <div className="wtn-m-card__meta">
          {item.year && <span>{item.year}</span>}
          {item.year && item.region && <span aria-hidden>·</span>}
          {item.region && <span>{item.region}</span>}
        </div>
      )}
      <p className="wtn-m-card__desc">{item.description}</p>
      {item.bullets && (
        <ul className="wtn-m-card__bullets">
          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      {item.quote && <p className="wtn-m-card__quote">{item.quote}</p>}
      {item.tags && (
        <div className="wtn-m-card__tags">
          {item.tags.map(t => <span key={t} className="wtn-m-tag">{t}</span>)}
        </div>
      )}
    </article>
  );
}

export default function Matters() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(null);
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-mp .wtn-reveal, .wtn-mp .wtn-reveal-group');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); }
      }),
      // threshold: 0 — a tall .wtn-reveal-group (many cards in 1-col
      // mobile) caps its own intersectionRatio below 0.12, so a
      // 0.12 threshold would never fire. Trigger as soon as any
      // part enters the rootMargin-trimmed viewport.
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [query, type, year, region, tags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WHY_ITEMS.filter(it => {
      if (q) {
        const hay = (it.title + " " + (it.description || "") + " " + (it.bullets || []).join(" ") + " " + (it.quote || "") + " " + (it.tags || []).join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (type && it.type !== type) return false;
      if (year && it.year !== year) return false;
      if (region && it.region !== region) return false;
      if (tags.length) {
        const t = (it.tags || []).map(x => x.toLowerCase());
        if (!tags.some(x => t.includes(x.toLowerCase()))) return false;
      }
      return true;
    });
  }, [query, type, year, region, tags]);

  const reset = () => { setQuery(""); setType(null); setYear(null); setRegion(null); setTags([]); };

  return (
    <div className="wtn-mp">
      <style>{M_STYLES}</style>

      {/* HERO */}
      <section className="wtn-m-hero">
        <div className="wtn-section__inner" style={{ textAlign: 'center' }}>
          <span className="wtn-eyebrow wtn-reveal">Why It Matters</span>
          <h1 className="wtn-h2 wtn-h1 wtn-reveal">Impact, projects, and the promises we keep</h1>
          <svg className="wtn-h2-rule wtn-reveal" viewBox="0 0 84 6" preserveAspectRatio="none"
               aria-hidden="true" style={{ margin: '10px auto 18px' }}>
            <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3"
                  stroke={M.MEADOW_GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="wtn-sub wtn-reveal" style={{ margin: '0 auto' }}>
            The pillars we stand on, the projects we run, and the outcomes we can measure.
            Filter by pillar, year, region, or theme.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[M.CREAM_SOFT]} />

      {/* CONTROLS + GRID */}
      <section className="wtn-section wtn-m-list">
        <div className="wtn-section__inner">
          <div className="wtn-reveal">
            <Controls
              query={query} setQuery={setQuery}
              type={type} setType={setType}
              year={year} setYear={setYear}
              region={region} setRegion={setRegion}
              tags={tags} setTags={setTags}
              reset={reset}
            />
          </div>

          {filtered.length ? (
            <div className="wtn-m-grid wtn-reveal-group">
              {filtered.map(item => <Card key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="wtn-m-empty wtn-reveal">
              <p>No items match. Adjust filters or reset.</p>
              <p>Tip: try searching <strong>Seeds</strong>, <strong>Water</strong>, or <strong>Dignity</strong>.</p>
              <button type="button" className="wtn-btn wtn-btn--primary" onClick={reset}>Reset</button>
            </div>
          )}
        </div>
      </section>

      <WaveDivider height={80} palette={[M.DEEP_FOREST, M.DEEP_FOREST_DK, M.FOREST_SHADOW]} />

      {/* CTA */}
      <section className="wtn-m-cta">
        <div className="wtn-cta__inner wtn-reveal">
          <span className="wtn-cta__eyebrow">Take the next step</span>
          <h2>Every jar is a vote for this future.</h2>
          <p>Support seed protection, water-wise farming, and dignified livelihoods with your next order.</p>
          <Link to="/products" className="wtn-btn wtn-btn--primary wtn-btn--large">Shop the Harvest</Link>
        </div>
      </section>
    </div>
  );
}

const M_STYLES = `
  .wtn-mp, .wtn-mp * { box-sizing: border-box; }
  .wtn-mp {
    background: ${M.CREAM}; color: ${M.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }
  .wtn-mp .wtn-reveal, .wtn-mp .wtn-reveal-group > * {
    opacity: 0; transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
  }
  .wtn-mp .wtn-reveal.is-inview,
  .wtn-mp .wtn-reveal-group.is-inview > * { opacity: 1; transform: none; }
  .wtn-mp .wtn-reveal-group > *:nth-child(2) { transition-delay: 60ms; }
  .wtn-mp .wtn-reveal-group > *:nth-child(3) { transition-delay: 120ms; }
  .wtn-mp .wtn-reveal-group > *:nth-child(4) { transition-delay: 180ms; }
  .wtn-mp .wtn-reveal-group > *:nth-child(5) { transition-delay: 240ms; }
  .wtn-mp .wtn-reveal-group > *:nth-child(6) { transition-delay: 300ms; }

  .wtn-section { position: relative; padding: 64px 28px 80px; }
  .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
  .wtn-eyebrow {
    display: inline-block;
    background: ${M.DEEP_FOREST}; color: ${M.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .wtn-h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 42px);
    color: ${M.DEEP_FOREST_DK};
    margin: 14px 0 10px; line-height: 1.15;
  }
  .wtn-h1 { font-size: clamp(34px, 4vw, 54px); }
  .wtn-h2-rule { display: block; width: 84px; height: 6px; }
  .wtn-sub { max-width: 640px; color: ${M.INK}; opacity: 0.78; font-size: 15.5px; line-height: 1.6; margin: 0 0 24px; }

  .wtn-btn {
    display: inline-block; padding: 12px 26px;
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; text-decoration: none;
    border: 1.5px solid transparent; cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .wtn-btn--primary { background: ${M.MEADOW_GOLD}; color: ${M.FOREST_SHADOW}; border-color: ${M.MEADOW_GOLD}; }
  .wtn-btn--primary:hover { background: ${M.SEAL_TERRACOTTA}; color: ${M.CREAM}; border-color: ${M.SEAL_TERRACOTTA}; transform: translateY(-1px); }
  .wtn-btn--ghost { background: ${M.CREAM}; color: ${M.DEEP_FOREST}; border-color: ${M.DEEP_FOREST}; }
  .wtn-btn--ghost:hover { background: ${M.DEEP_FOREST}; color: ${M.CREAM}; }
  .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

  .wtn-m-hero { background: ${M.CREAM}; padding: 80px 28px 40px; text-align: center; }

  /* Controls */
  .wtn-m-controls {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    gap: 10px;
    align-items: stretch;
    margin-bottom: 24px;
  }
  .wtn-m-search {
    display: flex; align-items: center; gap: 10px;
    background: ${M.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 0 14px; color: ${M.DEEP_FOREST};
  }
  .wtn-m-search:focus-within { border-color: ${M.MEADOW_GOLD}; }
  .wtn-m-search input {
    flex: 1; background: transparent; border: 0; outline: none;
    padding: 12px 0; font-family: inherit; font-size: 14px; color: ${M.INK};
  }
  .wtn-m-search input::placeholder { color: ${M.INK}; opacity: 0.55; }
  .wtn-m-select {
    background: ${M.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 10px 12px;
    font-family: inherit; font-size: 13.5px;
    color: ${M.DEEP_FOREST_DK};
    cursor: pointer;
  }
  .wtn-m-select:focus { border-color: ${M.MEADOW_GOLD}; outline: none; }
  .wtn-m-chips {
    grid-column: 1 / -1;
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 4px;
  }
  .wtn-m-chip {
    background: ${M.CREAM}; color: ${M.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 6px 12px;
    font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    transition: all 160ms ease;
  }
  .wtn-m-chip:hover { border-color: ${M.MEADOW_GOLD}; }
  .wtn-m-chip.is-active { background: ${M.DEEP_FOREST}; color: ${M.CREAM}; border-color: ${M.DEEP_FOREST}; }

  /* Grid + Cards */
  .wtn-m-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
  .wtn-m-card {
    position: relative;
    background: ${M.CREAM_SOFT};
    border: 1px solid rgba(30,90,85,0.10);
    padding: 24px 22px 20px;
    display: flex; flex-direction: column;
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  }
  .wtn-m-card:hover {
    transform: translateY(-4px);
    border-color: ${M.MEADOW_GOLD};
    box-shadow: 0 10px 24px rgba(15,58,54,0.10);
  }
  .wtn-m-card__type {
    align-self: flex-start;
    color: ${M.CREAM};
    font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 800; padding: 4px 10px;
    margin-bottom: 12px;
  }
  .wtn-m-card__head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px; }
  .wtn-m-card__emoji { font-size: 22px; }
  .wtn-m-card__title {
    font-family: Georgia, serif;
    font-size: 19px; color: ${M.DEEP_FOREST_DK};
    margin: 0; line-height: 1.25;
  }
  .wtn-m-card__meta {
    display: flex; gap: 6px;
    font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: ${M.SOIL_OLIVE};
    margin: 0 0 12px;
  }
  .wtn-m-card__desc { margin: 0 0 12px; font-size: 14px; color: ${M.INK}; opacity: 0.85; line-height: 1.6; }
  .wtn-m-card__bullets {
    list-style: none; padding: 0; margin: 0 0 12px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .wtn-m-card__bullets li {
    font-size: 13.5px; color: ${M.INK}; line-height: 1.5;
    padding-left: 16px; position: relative;
  }
  .wtn-m-card__bullets li::before {
    content: ""; position: absolute; left: 0; top: 8px;
    width: 8px; height: 8px; background: ${M.MEADOW_GOLD};
  }
  .wtn-m-card__quote {
    font-family: Georgia, serif; font-style: italic;
    font-size: 14px; color: ${M.INK};
    padding: 10px 14px; margin: 0 0 12px;
    border-left: 3px solid ${M.MEADOW_GOLD};
    background: rgba(181,136,45,0.08);
  }
  .wtn-m-card__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 6px; border-top: 1px dashed rgba(30,90,85,0.18); }
  .wtn-m-tag {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 600; color: ${M.SOIL_OLIVE};
    background: rgba(168,185,117,0.18);
    padding: 3px 8px; border: 1px solid rgba(111,131,64,0.28);
  }

  .wtn-m-empty {
    text-align: center; padding: 40px 20px;
    background: ${M.CREAM_SOFT};
    border: 1px dashed rgba(30,90,85,0.20);
  }
  .wtn-m-empty p { color: ${M.INK}; margin: 0 0 12px; }

  /* CTA */
  .wtn-m-cta {
    background: ${M.FOREST_SHADOW}; color: ${M.CREAM};
    padding: 80px 28px; text-align: center;
  }
  .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
  .wtn-cta__eyebrow {
    display: inline-block;
    background: ${M.MEADOW_GOLD}; color: ${M.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 18px;
  }
  .wtn-m-cta h2 {
    font-family: Georgia, serif; font-size: clamp(28px, 3.6vw, 44px);
    color: ${M.CREAM}; margin: 0 0 12px; line-height: 1.15;
  }
  .wtn-m-cta p { color: ${M.CREAM}; opacity: 0.82; font-size: 15.5px; line-height: 1.6; margin: 0 0 26px; }

  @media (max-width: 900px) {
    .wtn-section { padding: 48px 20px 60px; }
    .wtn-m-hero { padding: 60px 20px 28px; }
    .wtn-m-cta { padding: 60px 20px; }
    .wtn-m-controls { grid-template-columns: 1fr 1fr; }
    .wtn-m-search { grid-column: 1 / -1; }
    .wtn-m-select { grid-column: span 1; }
  }
  @media (max-width: 560px) {
    .wtn-m-controls { grid-template-columns: 1fr; }
    .wtn-m-select { grid-column: 1 / -1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wtn-mp .wtn-reveal, .wtn-mp .wtn-reveal-group > * { transition: none; }
  }
`;
// ===== NEW REDESIGN — WAVE THEME — END =====
