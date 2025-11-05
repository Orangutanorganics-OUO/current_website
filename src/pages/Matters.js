import React, { useMemo, useState } from "react";
import "./Matters.css";

const WHY_ITEMS = [
  {
    id: "pillar-1",
    type: "Pillar",
    title: "We protect native seeds & biodiversity",
    emoji: "🌾",
    description: "Safeguarding heirloom seeds and diverse landraces to keep Himalayan foodways alive.",
    tags: ["Seeds","Biodiversity","Authenticity","Traceability"]
  },
  {
    id: "pillar-2",
    type: "Pillar",
    title: "We protect water sources & soil health",
    emoji: "💧",
    description: "Low-water practices, organic soil care, and farmer-led stewardship to regenerate land.",
    tags: ["Water","Soil","Regeneration"]
  },
  {
    id: "pillar-3",
    type: "Pillar",
    title: "We protect farmer dignity & livelihoods",
    emoji: "🙌",
    description: "Fair storytelling, pride-first narratives, and practical incentives that reward good practice.",
    tags: ["Dignity","Livelihoods","Community"]
  },
  {
    id: "statement-1",
    type: "Statement",
    title: "Buying from OUO = standing up for the planet & Himalayan farmers",
    emoji: "🟢",
    description: "Every purchase fuels seed protection, water-wise cultivation, and farmer-first programs.",
    tags: ["Support","Impact","Community"]
  },
  {
    id: "project-1",
    type: "Project",
    year: "2023–ongoing",
    region: "Uttarakhand",
    title: "Seed Swap Circles in Uttarakhand",
    emoji: "🧬",
    description: "Six farmer-led seed swap circles in remote villages enabling free exchange of heirloom seeds.",
    bullets: [
      "✅ 30+ varieties of native pulses and millets reintroduced",
      "✅ 80+ farmers actively participating",
      "✅ No money exchanged — only community knowledge and biodiversity sharing"
    ],
    quote: "This year, I sowed rajma seeds my grandfather once used. I thought they were lost forever. — Aarti Devi, smallholder from Pauri Garhwal",
    tags: ["Seeds","Biodiversity","Community","Uttarakhand","2023"]
  },
  {
    id: "project-2",
    type: "Project",
    year: "2022",
    region: "Pithoragarh",
    title: "Low-Water Farming Trials",
    emoji: "💧",
    description: "Piloted mulching + drip on 10 test plots of rajma and amaranth with local liaison support.",
    bullets: [
      "✅ Reduced water use by ~40%",
      "✅ Maintained yields within ~5% of control group",
      "✅ Expanding to 50+ plots next season"
    ],
    tags: ["Water","Soil","Trials","Pithoragarh","2022"]
  },
  {
    id: "project-3",
    type: "Project",
    year: "2024",
    region: "2 pilot villages",
    title: "Compost-Back Incentive Program",
    emoji: "♻️",
    description: "Barter-style bonus payments per kg of certified organic produce for farmers using own compost.",
    bullets: [
      "🎯 Pilot in 2 villages this harvest season",
      "🧑‍🌾 17 farmers enrolled so far",
      "📦 Adds traceability to soil health practices"
    ],
    tags: ["Soil","Compost","Traceability","2024"]
  },
  {
    id: "project-4",
    type: "Project",
    year: "Ongoing",
    region: "Himalayan villages",
    title: "Farmer Photo Stories — No Filters, Just Faces",
    emoji: "🧑‍🌾",
    description: "Each pack links via QR to a rotating, unfiltered farmer story — visibility equals dignity.",
    bullets: [
      "📸 QR code on packs links to a real farmer story",
      "🔁 Rotated monthly to spotlight new voices",
      "💬 98% of consumers surveyed felt more connected to their food"
    ],
    tags: ["Dignity","Stories","QR","Ongoing"]
  }
];

const ALL_TYPES = Array.from(new Set(WHY_ITEMS.map(i => i.type)));
const ALL_TAGS = Array.from(new Set(WHY_ITEMS.flatMap(i => i.tags || []))).sort();
const ALL_YEARS = Array.from(new Set(WHY_ITEMS.map(i => i.year).filter(Boolean)));
const ALL_REGIONS = Array.from(new Set(WHY_ITEMS.map(i => i.region).filter(Boolean)));

const LOGO_URL = "https://orangutanorganics.com/wp-content/uploads/2024/07/Orang-utan-color-logo-1.png";

function Header(){
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="/">
          <img className="header__logo" src={LOGO_URL} alt="Orang Utan Organics logo" />
          <div className="header__title">
            <span className="header__name">Orang Utan Organics</span>
            <span className="header__tag">Powered by Mountain Farmers • Why It Matters</span>
          </div>
        </a>
      </div>
    </header>
  );
}

function Controls({query,setQuery, type,setType, year,setYear, region,setRegion, tags,setTags, reset}){
  return (
    <section className="controls">
      <div className="input" title="Search pillars, projects, quotes, tags">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <input value={query} placeholder="Search impact..." onChange={e=>setQuery(e.target.value)} />
      </div>

      <div className="select">
        <select value={type || ""} onChange={e => setType(e.target.value || null)}>
          <option value="">All types</option>
          {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="select">
        <select value={year || ""} onChange={e => setYear(e.target.value || null)}>
          <option value="">Any year</option>
          {ALL_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div className="select">
        <select value={region || ""} onChange={e => setRegion(e.target.value || null)}>
          <option value="">Any region</option>
          {ALL_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <button className="btn" onClick={reset} title="Clear all filters" style={{color:"black"}}>Reset</button>

      <div className="chipset" style={{gridColumn:'1 / -1'}}>
        <div className="chips">
          {ALL_TAGS.map(tag => {
            const active = tags.includes(tag);
            return (
              <button key={tag} className={"chip " + (active?"chip--active":"")} onClick={()=>{
                setTags(active? tags.filter(t=>t!==tag) : [...tags, tag])
              }}>{tag}</button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Card({item}){
  return (
    <article className="card" role="region" aria-label={item.title}>
      <div className="card__band" aria-hidden></div>
      <h3 className="card__title">{item.emoji ? item.emoji + " " : ""}{item.title}</h3>
      <div className="card__meta">
        <span>{item.type}</span>
        {item.year ? <><span>•</span><span>{item.year}</span></> : null}
        {item.region ? <><span>•</span><span>{item.region}</span></> : null}
      </div>
      <div className="card__body">
        <p>{item.description}</p>
        {item.bullets ? (
          <ul className="kv">
            {item.bullets.map((b, i) => <li key={i} className="k">{b}</li>)}
          </ul>
        ) : null}
        {item.quote ? <div className="quote">{item.quote}</div> : null}
      </div>
    </article>
  );
}

export default function Matters(){
  const [query, setQuery] = useState("");
  const [type, setType] = useState(null);
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [tags, setTags] = useState([]);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return WHY_ITEMS.filter(it => {
      if (q){
        const hay = (it.title + " " + (it.description||"") + " " + (it.bullets||[]).join(" ") + " " + (it.quote||"") + " " + (it.tags||[]).join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (type && it.type !== type) return false;
      if (year && it.year !== year) return false;
      if (region && it.region !== region) return false;
      if (tags.length){
        const t = (it.tags||[]).map(x=>x.toLowerCase());
        const ok = tags.some(x => t.includes(x.toLowerCase()));
        if (!ok) return false;
      }
      return true;
    });
  }, [query,type,year,region,tags]);

  const reset = () => { setQuery(""); setType(null); setYear(null); setRegion(null); setTags([]); };

  return (
    <React.Fragment>
      <Controls
        query={query} setQuery={setQuery}
        type={type} setType={setType}
        year={year} setYear={setYear}
        region={region} setRegion={setRegion}
        tags={tags} setTags={setTags}
        reset={reset}
      />

      <main className="container">
        {filtered.length ? (
          <section className="grid">
            {filtered.map(item => <Card key={item.id} item={item} />)}
          </section>
        ) : (
          <div className="empty">
            <p>No items match. Adjust filters or <button className="btn btn--primary" onClick={reset}>reset</button>.</p>
            <p>Tip: try searching for <strong>Seeds</strong>, <strong>Water</strong>, <strong>Dignity</strong> or filter by year/region.</p>
          </div>
        )}
      </main>

    </React.Fragment>
  )
}
