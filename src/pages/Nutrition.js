import React, { useMemo, useState } from "react";
import { PRODUCTS } from "../utils/products";
import "./Nutrition.css";

// Get product image by name
const getProductImage = (productName) => {
  const product = PRODUCTS.find(p => p.name === productName);
  return product?.image || '';
};

// Nutrition & Health Benefits data
const NUTRITION = [
  {
    id: 1,
    item: "Wild Himalayan Tempering Spice (Laadu/Jimbu)",
    img: getProductImage("Wild Himalayan Tempering Spice"),
    nutrients: [
      "Vitamin A (131.38 IU)",
      "Vitamin C (2.23 mg)",
      "Folic Acid (16.53 mg)",
      "Choline (161.20 mg)",
      "Calcium (642.30 mg)",
      "Potassium (2253 mg)",
      "Copper (0.29 mg)",
      "β-Carotene (0.79 mg)"
    ],
    benefits: [
      "Boosts immunity",
      "Supports vision and skin health",
      "Aids in bone strength",
      "Enhances brain function (choline)",
      "Regulates blood pressure"
    ],
    tags: ["Immunity","Vision","Skin","Bone","Brain","Blood pressure","Mineral-rich"]
  },
  {
    id: 2,
    item: "Badri Cow Ghee",
    img: getProductImage("Badri Cow Ghee"),
    nutrients: ["Healthy fats","Omega-3","Omega-6","Vitamin A","CLA (Conjugated Linoleic Acid)"],
    benefits: [
      "Improves digestion",
      "Strengthens immunity",
      "Supports heart health",
      "Good for joint lubrication",
      "Enhances nutrient absorption"
    ],
    tags: ["Digestion","Immunity","Heart","Joints","Absorption","Fats"]
  },
  {
    id: 3,
    item: "Himalayan Black Soybean",
    img: getProductImage("Himalayan Black Soyabean"),
    nutrients: ["Protein","Iron","Calcium","Folate","Isoflavones","Fiber"],
    benefits: [
      "Supports muscle growth",
      "Maintains heart health",
      "Aids in anemia prevention",
      "Supports bone health",
      "Helps regulate hormones"
    ],
    tags: ["Protein","Heart","Anemia","Bone","Hormonal","Fiber"]
  },
  {
    id: 4,
    item: "Himalayan White Rajma",
    img: getProductImage("Himalayan White Rajma"),
    nutrients: ["Protein","Complex Carbohydrates","Iron","Magnesium","Folate"],
    benefits: [
      "Boosts energy",
      "Supports red blood cell production",
      "Aids digestion",
      "Regulates blood sugar",
      "Strengthens immunity"
    ],
    tags: ["Energy","RBC","Digestion","Blood sugar","Immunity"]
  },
  {
    id: 5,
    item: "Himalayan Red Rajma",
    img: getProductImage("Himalayan Red Rajma"),
    nutrients: ["Protein","Complex Carbohydrates","Antioxidants (Anthocyanins)","Iron","Magnesium","Folate"],
    benefits: [
      "Rich in antioxidants for anti-aging and heart health",
      "Supports energy release",
      "Enhances muscle and bone health",
      "Prevents anemia"
    ],
    tags: ["Antioxidant","Heart","Energy","Muscle","Bone","Anemia"]
  },
  {
    id: 6,
    item: "Himalayan Red Rice",
    img: getProductImage("Himalayan Red Rice"),
    nutrients: ["Iron","Zinc","Magnesium","Fiber","Antioxidants (Anthocyanins)","Slow-digesting Carbs"],
    benefits: [
      "Supports digestive health",
      "Regulates blood sugar",
      "Boosts energy",
      "Promotes heart health",
      "Antioxidant-rich for cell protection"
    ],
    tags: ["Digestion","Blood sugar","Energy","Heart","Antioxidant","Fiber"]
  }
];

const ALL_TAGS = Array.from(new Set(NUTRITION.flatMap(n => n.tags))).sort();
const ALL_NUTRIENTS = Array.from(new Set(NUTRITION.flatMap(n => n.nutrients.map(s => s.split(' (')[0])))).sort();

function Controls({query,setQuery, nutrient, setNutrient, activeTags, setActiveTags, reset}){
  return (
    <section className="controls">
      <div className="input" title="Search items, nutrients, or benefits">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <input value={query} placeholder="Search nutrition..." onChange={e=>setQuery(e.target.value)} />
      </div>

      <div className="select">
        <select value={nutrient || ""} onChange={e => setNutrient(e.target.value || null)}>
          <option value="">All nutrients</option>
          {ALL_NUTRIENTS.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <button className="btn" onClick={reset} title="Clear all filters" style={{color:"black"}}>Reset</button>

      <div className="chipset" style={{gridColumn:'1 / -1'}}>
        <div className="chips">
          {ALL_TAGS.map(tag => {
            const active = activeTags.includes(tag);
            return (
              <button key={tag} className={"chip " + (active?"chip--active":"")} onClick={()=>{
                setActiveTags(active? activeTags.filter(t=>t!==tag) : [...activeTags, tag])
              }}>{tag}</button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Card({n}){
  return (
    <article className="card">
      <div className="card__band" aria-hidden></div>
      <div className="card__media">
        <img
          src={n.img}
          alt={n.item}
          className="card__image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
            margin: "0 auto",
            backgroundColor: "rgb(241, 241, 241)",
            borderRadius: "12px",
          }}
        />
      </div>
      <h3 className="card__title">{n.item}</h3>
      <div className="card__meta">
        <span>{n.nutrients.slice(0,3).join(", ")}{n.nutrients.length>3?"…":""}</span>
      </div>
      <div className="card__body">
        <div className="kv">
          {n.nutrients.map(k => <span key={k} className="k">{k}</span>)}
        </div>
        <ul className="benefits">
          {n.benefits.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function Nutrition(){
  const [query, setQuery] = useState("");
  const [nutrient, setNutrient] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return NUTRITION.filter(n => {
      if (q){
        const hay = (n.item + " " + n.nutrients.join(" ") + " " + n.benefits.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (nutrient){
        const names = n.nutrients.map(s => s.split(" (")[0].toLowerCase());
        if (!names.includes(nutrient.toLowerCase())) return false;
      }
      if (activeTags.length){
        const tags = (n.tags||[]).map(t=>t.toLowerCase());
        const ok = activeTags.some(t => tags.includes(t.toLowerCase()));
        if (!ok) return false;
      }
      return true;
    });
  }, [query, nutrient, activeTags]);

  const reset = () => { setQuery(""); setNutrient(null); setActiveTags([]); };

  return (
    <React.Fragment>
      <Controls
        query={query} setQuery={setQuery}
        nutrient={nutrient} setNutrient={setNutrient}
        activeTags={activeTags} setActiveTags={setActiveTags}
        reset={reset}
      />

      <main className="container">
        {filtered.length ? (
          <section className="grid">
            {filtered.map(n => <Card key={n.id} n={n} />)}
          </section>
        ) : (
          <div className="empty">
            <p>No items match. Adjust filters or <button className="btn btn--primary" onClick={reset}>reset</button>.</p>
            <p>Tip: try searching for <strong>"iron"</strong>, <strong>"immunity"</strong>, or <strong>"digestion"</strong>.</p>
          </div>
        )}
      </main>
    </React.Fragment>
  )
}
