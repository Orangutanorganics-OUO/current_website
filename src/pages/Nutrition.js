import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../utils/products";
import "./Nutrition.css";

const getProductImage = (productName) => {
  const product = PRODUCTS.find(p => p.name === productName);
  return product?.image || '';
};

const NUTRITION = [
  { id: 1, item: "Wild Himalayan Tempering Spice (Laadu/Jimbu)",
    img: getProductImage("Wild Himalayan Tempering Spice"),
    nutrients: ["Vitamin A (131.38 IU)","Vitamin C (2.23 mg)","Folic Acid (16.53 mg)","Choline (161.20 mg)","Calcium (642.30 mg)","Potassium (2253 mg)","Copper (0.29 mg)","β-Carotene (0.79 mg)"],
    benefits: ["Boosts immunity","Supports vision and skin health","Aids in bone strength","Enhances brain function (choline)","Regulates blood pressure"],
    tags: ["Immunity","Vision","Skin","Bone","Brain","Blood pressure","Mineral-rich"] },
  { id: 2, item: "Badri Cow Ghee",
    img: getProductImage("Badri Cow Ghee"),
    nutrients: ["Healthy fats","Omega-3","Omega-6","Vitamin A","CLA (Conjugated Linoleic Acid)"],
    benefits: ["Improves digestion","Strengthens immunity","Supports heart health","Good for joint lubrication","Enhances nutrient absorption"],
    tags: ["Digestion","Immunity","Heart","Joints","Absorption","Fats"] },
  { id: 3, item: "Himalayan Black Soybean",
    img: getProductImage("Himalayan Black Soyabean"),
    nutrients: ["Protein","Iron","Calcium","Folate","Isoflavones","Fiber"],
    benefits: ["Supports muscle growth","Maintains heart health","Aids in anemia prevention","Supports bone health","Helps regulate hormones"],
    tags: ["Protein","Heart","Anemia","Bone","Hormonal","Fiber"] },
  { id: 4, item: "Himalayan White Rajma",
    img: getProductImage("Himalayan White Rajma"),
    nutrients: ["Protein","Complex Carbohydrates","Iron","Magnesium","Folate"],
    benefits: ["Boosts energy","Supports red blood cell production","Aids digestion","Regulates blood sugar","Strengthens immunity"],
    tags: ["Energy","RBC","Digestion","Blood sugar","Immunity"] },
  { id: 5, item: "Himalayan Red Rajma",
    img: getProductImage("Himalayan Red Rajma"),
    nutrients: ["Protein","Complex Carbohydrates","Antioxidants (Anthocyanins)","Iron","Magnesium","Folate"],
    benefits: ["Rich in antioxidants for anti-aging and heart health","Supports energy release","Enhances muscle and bone health","Prevents anemia"],
    tags: ["Antioxidant","Heart","Energy","Muscle","Bone","Anemia"] },
  { id: 6, item: "Himalayan Red Rice",
    img: getProductImage("Himalayan Red Rice"),
    nutrients: ["Iron","Zinc","Magnesium","Fiber","Antioxidants (Anthocyanins)","Slow-digesting Carbs"],
    benefits: ["Supports digestive health","Regulates blood sugar","Boosts energy","Promotes heart health","Antioxidant-rich for cell protection"],
    tags: ["Digestion","Blood sugar","Energy","Heart","Antioxidant","Fiber"] }
];

const ALL_TAGS = Array.from(new Set(NUTRITION.flatMap(n => n.tags))).sort();
const ALL_NUTRIENTS = Array.from(new Set(NUTRITION.flatMap(n => n.nutrients.map(s => s.split(' (')[0])))).sort();

// ===== NEW REDESIGN — WAVE THEME — START =====
const N = {
  DEEP_FOREST:'#03605C', DEEP_FOREST_DK:'#024442', FOREST_SHADOW:'#013532',
  INK:'#655F59', SEAL_TERRACOTTA:'#D76427', CREAM:'#F8F3EB', CREAM_SOFT:'#F1E7CE',
  PAPER:'#F8F3EB', MEADOW_GOLD:'#B5882D', GOLD_LINE:'#B5882D',
  SOIL_OLIVE:'#618E69', OCHRE:'#A56650',
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [N.CREAM, N.CREAM_SOFT];
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
            stroke={N.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

function Controls({ query,setQuery, nutrient,setNutrient, activeTags,setActiveTags, reset }) {
  return (
    <div className="wtn-n-controls">
      <div className="wtn-n-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <input value={query} placeholder="Search nutrients, benefits, or products…"
               onChange={(e)=>setQuery(e.target.value)} />
      </div>
      <select className="wtn-n-select" value={nutrient || ""} onChange={e => setNutrient(e.target.value || null)}>
        <option value="">All nutrients</option>
        {ALL_NUTRIENTS.map(nn => <option key={nn} value={nn}>{nn}</option>)}
      </select>
      <button type="button" className="wtn-btn wtn-btn--ghost" onClick={reset}>Reset</button>
      <div className="wtn-n-chips">
        {ALL_TAGS.map(tag => {
          const active = activeTags.includes(tag);
          return (
            <button key={tag} type="button"
              className={`wtn-n-chip ${active?'is-active':''}`}
              onClick={()=>{ setActiveTags(active? activeTags.filter(t=>t!==tag) : [...activeTags, tag]); }}>
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Card({ n }) {
  return (
    <article className="wtn-n-card">
      <div className="wtn-n-card__media">
        <img src={n.img} alt={n.item} loading="lazy" />
      </div>
      <div className="wtn-n-card__body">
        <h3 className="wtn-n-card__title">{n.item}</h3>
        <div className="wtn-n-card__section">
          <h4 className="wtn-n-card__label">Key Nutrients</h4>
          <div className="wtn-n-card__nutrients">
            {n.nutrients.map(k => <span key={k} className="wtn-n-nutrient">{k}</span>)}
          </div>
        </div>
        <div className="wtn-n-card__section">
          <h4 className="wtn-n-card__label">Health Benefits</h4>
          <ul className="wtn-n-card__benefits">
            {n.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
        {n.tags && (
          <div className="wtn-n-card__tags">
            {n.tags.map(t => <span key={t} className="wtn-n-tag">{t}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Nutrition() {
  const [query, setQuery] = useState("");
  const [nutrient, setNutrient] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-np .wtn-reveal, .wtn-np .wtn-reveal-group');
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
  }, [query, nutrient, activeTags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NUTRITION.filter(nn => {
      if (q) {
        const hay = (nn.item + " " + nn.nutrients.join(" ") + " " + nn.benefits.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (nutrient) {
        const names = nn.nutrients.map(s => s.split(" (")[0].toLowerCase());
        if (!names.includes(nutrient.toLowerCase())) return false;
      }
      if (activeTags.length) {
        const tags = (nn.tags || []).map(t => t.toLowerCase());
        if (!activeTags.some(t => tags.includes(t.toLowerCase()))) return false;
      }
      return true;
    });
  }, [query, nutrient, activeTags]);

  const reset = () => { setQuery(""); setNutrient(null); setActiveTags([]); };

  return (
    <div className="wtn-np">
      <style>{N_STYLES}</style>

      {/* HERO */}
      <section className="wtn-n-hero">
        <div className="wtn-section__inner" style={{ textAlign: 'center' }}>
          <span className="wtn-eyebrow wtn-reveal">Nutrition</span>
          <h1 className="wtn-h2 wtn-h1 wtn-reveal">What&rsquo;s in every jar &amp; sack</h1>
          <svg className="wtn-h2-rule wtn-reveal" viewBox="0 0 84 6" preserveAspectRatio="none"
               aria-hidden="true" style={{ margin: '10px auto 18px' }}>
            <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3"
                  stroke={N.MEADOW_GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="wtn-sub wtn-reveal" style={{ margin: '0 auto' }}>
            The nutrients, benefits, and health effects behind every OUO product —
            grown slow, at altitude, for real nourishment.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[N.CREAM_SOFT]} />

      {/* LIST */}
      <section className="wtn-section wtn-n-list">
        <div className="wtn-section__inner">
          <div className="wtn-reveal">
            <Controls
              query={query} setQuery={setQuery}
              nutrient={nutrient} setNutrient={setNutrient}
              activeTags={activeTags} setActiveTags={setActiveTags}
              reset={reset}
            />
          </div>

          {filtered.length ? (
            <div className="wtn-n-grid wtn-reveal-group">
              {filtered.map(nn => <Card key={nn.id} n={nn} />)}
            </div>
          ) : (
            <div className="wtn-n-empty wtn-reveal">
              <p>No items match your filters.</p>
              <p>Tip: try searching <strong>iron</strong>, <strong>immunity</strong>, or <strong>digestion</strong>.</p>
              <button type="button" className="wtn-btn wtn-btn--primary" onClick={reset}>Reset</button>
            </div>
          )}
        </div>
      </section>

      <WaveDivider height={80} palette={[N.DEEP_FOREST, N.DEEP_FOREST_DK, N.FOREST_SHADOW]} />

      {/* CTA */}
      <section className="wtn-n-cta">
        <div className="wtn-cta__inner wtn-reveal">
          <span className="wtn-cta__eyebrow">Nourish, Deeply</span>
          <h2>Real food, richer in what your body needs.</h2>
          <p>Bring home mountain-grown ghee, pulses, rice, and spices — full of what nature intended.</p>
          <Link to="/products" className="wtn-btn wtn-btn--primary wtn-btn--large">Shop the Harvest</Link>
        </div>
      </section>
    </div>
  );
}

const N_STYLES = `
  .wtn-np, .wtn-np * { box-sizing: border-box; }
  .wtn-np {
    background: ${N.CREAM}; color: ${N.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }
  .wtn-np .wtn-reveal, .wtn-np .wtn-reveal-group > * {
    opacity: 0; transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
  }
  .wtn-np .wtn-reveal.is-inview,
  .wtn-np .wtn-reveal-group.is-inview > * { opacity: 1; transform: none; }
  .wtn-np .wtn-reveal-group > *:nth-child(2) { transition-delay: 60ms; }
  .wtn-np .wtn-reveal-group > *:nth-child(3) { transition-delay: 120ms; }
  .wtn-np .wtn-reveal-group > *:nth-child(4) { transition-delay: 180ms; }
  .wtn-np .wtn-reveal-group > *:nth-child(5) { transition-delay: 240ms; }
  .wtn-np .wtn-reveal-group > *:nth-child(6) { transition-delay: 300ms; }

  .wtn-section { position: relative; padding: 64px 28px 80px; }
  .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
  .wtn-eyebrow {
    display: inline-block;
    background: ${N.DEEP_FOREST}; color: ${N.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .wtn-h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 42px);
    color: ${N.DEEP_FOREST_DK};
    margin: 14px 0 10px; line-height: 1.15;
  }
  .wtn-h1 { font-size: clamp(34px, 4vw, 54px); }
  .wtn-h2-rule { display: block; width: 84px; height: 6px; }
  .wtn-sub { max-width: 640px; color: ${N.INK}; opacity: 0.78; font-size: 15.5px; line-height: 1.6; margin: 0 0 24px; }

  .wtn-btn {
    display: inline-block; padding: 12px 26px;
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; text-decoration: none;
    border: 1.5px solid transparent; cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .wtn-btn--primary { background: ${N.MEADOW_GOLD}; color: ${N.FOREST_SHADOW}; border-color: ${N.MEADOW_GOLD}; }
  .wtn-btn--primary:hover { background: ${N.SEAL_TERRACOTTA}; color: ${N.CREAM}; border-color: ${N.SEAL_TERRACOTTA}; transform: translateY(-1px); }
  .wtn-btn--ghost { background: ${N.CREAM}; color: ${N.DEEP_FOREST}; border-color: ${N.DEEP_FOREST}; }
  .wtn-btn--ghost:hover { background: ${N.DEEP_FOREST}; color: ${N.CREAM}; }
  .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

  .wtn-n-hero { background: ${N.CREAM}; padding: 80px 28px 40px; text-align: center; }

  /* Controls */
  .wtn-n-controls {
    display: grid;
    grid-template-columns: 2fr 1fr auto;
    gap: 10px; align-items: stretch;
    margin-bottom: 28px;
  }
  .wtn-n-search {
    display: flex; align-items: center; gap: 10px;
    background: ${N.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 0 14px; color: ${N.DEEP_FOREST};
  }
  .wtn-n-search:focus-within { border-color: ${N.MEADOW_GOLD}; }
  .wtn-n-search input {
    flex: 1; background: transparent; border: 0; outline: none;
    padding: 12px 0; font-family: inherit; font-size: 14px; color: ${N.INK};
  }
  .wtn-n-search input::placeholder { color: ${N.INK}; opacity: 0.55; }
  .wtn-n-select {
    background: ${N.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 10px 12px;
    font-family: inherit; font-size: 13.5px;
    color: ${N.DEEP_FOREST_DK}; cursor: pointer;
  }
  .wtn-n-select:focus { border-color: ${N.MEADOW_GOLD}; outline: none; }
  .wtn-n-chips { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
  .wtn-n-chip {
    background: ${N.CREAM}; color: ${N.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 6px 12px;
    font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    transition: all 160ms ease;
  }
  .wtn-n-chip:hover { border-color: ${N.MEADOW_GOLD}; }
  .wtn-n-chip.is-active { background: ${N.DEEP_FOREST}; color: ${N.CREAM}; border-color: ${N.DEEP_FOREST}; }

  /* Grid & Cards */
  .wtn-n-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
  }
  .wtn-n-card {
    background: ${N.CREAM_SOFT};
    border: 1px solid rgba(30,90,85,0.10);
    display: flex; flex-direction: column;
    overflow: hidden;
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  }
  .wtn-n-card:hover {
    transform: translateY(-4px);
    border-color: ${N.MEADOW_GOLD};
    box-shadow: 0 10px 24px rgba(15,58,54,0.10);
  }
  .wtn-n-card__media {
    background: ${N.CREAM};
    padding: 24px;
    display: flex; align-items: center; justify-content: center;
    height: 220px;
  }
  .wtn-n-card__media img { width: 100%; height: 100%; object-fit: contain; display: block; }
  .wtn-n-card__body { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 14px; }
  .wtn-n-card__title {
    font-family: Georgia, serif; font-size: 20px;
    color: ${N.DEEP_FOREST_DK}; margin: 0; line-height: 1.25;
  }
  .wtn-n-card__section { display: flex; flex-direction: column; gap: 8px; }
  .wtn-n-card__label {
    font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; color: ${N.SOIL_OLIVE}; margin: 0;
  }
  .wtn-n-card__nutrients { display: flex; flex-wrap: wrap; gap: 6px; }
  .wtn-n-nutrient {
    background: rgba(181,136,45,0.14);
    color: ${N.DEEP_FOREST_DK};
    border: 1px solid rgba(181,136,45,0.30);
    padding: 4px 10px;
    font-size: 12px;
  }
  .wtn-n-card__benefits {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 6px;
  }
  .wtn-n-card__benefits li {
    font-size: 13.5px; color: ${N.INK}; line-height: 1.5;
    padding-left: 16px; position: relative;
  }
  .wtn-n-card__benefits li::before {
    content: ""; position: absolute; left: 0; top: 8px;
    width: 8px; height: 8px; background: ${N.MEADOW_GOLD};
  }
  .wtn-n-card__tags {
    display: flex; flex-wrap: wrap; gap: 6px;
    padding-top: 10px; margin-top: 4px;
    border-top: 1px dashed rgba(30,90,85,0.18);
  }
  .wtn-n-tag {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 600; color: ${N.SOIL_OLIVE};
    background: rgba(168,185,117,0.18);
    padding: 3px 8px; border: 1px solid rgba(111,131,64,0.28);
  }

  .wtn-n-empty {
    text-align: center; padding: 40px 20px;
    background: ${N.CREAM_SOFT};
    border: 1px dashed rgba(30,90,85,0.20);
  }
  .wtn-n-empty p { color: ${N.INK}; margin: 0 0 12px; }

  /* CTA */
  .wtn-n-cta {
    background: ${N.FOREST_SHADOW}; color: ${N.CREAM};
    padding: 80px 28px; text-align: center;
  }
  .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
  .wtn-cta__eyebrow {
    display: inline-block;
    background: ${N.MEADOW_GOLD}; color: ${N.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 18px;
  }
  .wtn-n-cta h2 {
    font-family: Georgia, serif; font-size: clamp(28px, 3.6vw, 44px);
    color: ${N.CREAM}; margin: 0 0 12px; line-height: 1.15;
  }
  .wtn-n-cta p { color: ${N.CREAM}; opacity: 0.82; font-size: 15.5px; line-height: 1.6; margin: 0 0 26px; }

  @media (max-width: 900px) {
    .wtn-section { padding: 48px 20px 60px; }
    .wtn-n-hero { padding: 60px 20px 28px; }
    .wtn-n-cta { padding: 60px 20px; }
    .wtn-n-controls { grid-template-columns: 1fr 1fr; }
    .wtn-n-search { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .wtn-n-controls { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wtn-np .wtn-reveal, .wtn-np .wtn-reveal-group > * { transition: none; }
  }
`;
// ===== NEW REDESIGN — WAVE THEME — END =====
