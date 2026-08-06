import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recipe.css";

// --- Data --------------------------------------------------------------------
// 20 signature recipes featuring OUO products. Calorie counts are approximate.
const RECIPES = [
  {
    id: "rcp-1",
    title: "Himalayan Rajma Chawal Deluxe",
    emoji: "🍛",
    occasion: "Comfort",
    calories: 450,
    time: 45,
    ingredients: ["Red Rajma", "Badri Cow Ghee", "Wild Himalayan Tempering Spice"],
    quickTip:
      "Pressure-cook rajma; finish with ghee + ready-to-sprinkle tempering spice.",
    steps: [
      "Soak red rajma 8–10 hrs; pressure-cook with salt + turmeric till soft.",
      "In ghee, sauté onion, ginger, garlic, tomato; add spice mix.",
      "Simmer cooked rajma 10 min; serve with steamed rice and a ghee drizzle.",
    ],
    tags: ["Rajma", "Ghee", "Tempering", "Comfort"],
  },
  {
    id: "rcp-2",
    title: "White Rajma in Burnt Ghee Pepper",
    emoji: "🥘",
    occasion: "Everyday",
    calories: 410,
    time: 40,
    ingredients: ["White Rajma", "Badri Cow Ghee", "Tempering Spice"],
    quickTip: "Use an immersion blender to mash 1 cup beans for creaminess.",
    steps: [
      "Pressure-cook soaked white rajma.",
      "Bloom tempering spice in hot ghee; add cracked pepper.",
      "Fold in rajma + liquor; simmer until glossy.",
    ],
    tags: ["Rajma", "Ghee", "Pepper"],
  },
  {
    id: "rcp-3",
    title: "Red Rice Khichdi with Ghee Tadka",
    emoji: "🍲",
    occasion: "Comfort",
    calories: 380,
    time: 30,
    ingredients: ["Red Rice", "Badri Cow Ghee", "Tempering Spice"],
    quickTip: "Rinse red rice twice; cook 1:2.5 rice:water for soft grains.",
    steps: [
      "Pressure-cook red rice + moong with salt.",
      "Temper hot ghee with spice + garlic; pour over.",
      "Finish with coriander and lemon.",
    ],
    tags: ["Red Rice", "Khichdi", "Comfort"],
  },
  {
    id: "rcp-4",
    title: "Black Soybean Pahadi Stir-Fry",
    emoji: "🍳",
    occasion: "Protein",
    calories: 360,
    time: 25,
    ingredients: ["Black Soybean", "Tempering Spice", "Badri Cow Ghee"],
    quickTip: "Microwave-parboil soaked beans to cut stove time.",
    steps: [
      "Boil soaked black soybean till just tender.",
      "In ghee, pop tempering spice; add beans + chili + onion.",
      "Toss 3–4 min; finish with lemon.",
    ],
    tags: ["Soybean", "Quick", "Protein"],
  },
  {
    id: "rcp-5",
    title: "Festive Ghee-Roasted Potatoes with Jimbu",
    emoji: "🥔",
    occasion: "Festive",
    calories: 320,
    time: 35,
    ingredients: ["Badri Cow Ghee", "Tempering Spice"],
    quickTip: "Parboil potatoes; roast hot so edges go crisp.",
    steps: [
      "Parboil cubes; drain well.",
      "Roast at high heat with ghee, tempering spice, salt.",
      "Toss with chili flakes and fresh herbs.",
    ],
    tags: ["Festive", "Sides", "Crispy"],
  },
  {
    id: "rcp-6",
    title: "Red Rajma Taco Filling (Urban Hack)",
    emoji: "🌮",
    occasion: "Experimental",
    calories: 390,
    time: 20,
    ingredients: ["Red Rajma", "Tempering Spice"],
    quickTip: "Use leftover rajma—reduce till pasty for tacos/rolls.",
    steps: [
      "Reduce cooked rajma in a pan with onions and spice.",
      "Mash slightly; adjust salt and chili.",
      "Stuff tacos/chapati rolls; top with onions + lemon.",
    ],
    tags: ["Fusion", "Street"],
  },
  {
    id: "rcp-7",
    title: "Himalayan Ghee Fried Rice (Red Rice)",
    emoji: "🍚",
    occasion: "Everyday",
    calories: 430,
    time: 18,
    ingredients: ["Red Rice", "Badri Cow Ghee"],
    quickTip: "Use chilled rice for non-sticky grains.",
    steps: [
      "Stir-fry aromatics in ghee.",
      "Add chilled red rice; toss on high heat.",
      "Season with salt, pepper, and a pinch of tempering spice.",
    ],
    tags: ["Red Rice", "Quick"],
  },
  {
    id: "rcp-8",
    title: "White Rajma Mediterranean Salad",
    emoji: "🥗",
    occasion: "Light",
    calories: 310,
    time: 15,
    ingredients: ["White Rajma"],
    quickTip: "Use canned-like texture by salting cooking water well.",
    steps: [
      "Toss cooked white rajma with tomato, cucumber, onion, lemon.",
      "Add olive oil (or ghee when warm), herbs, cracked pepper.",
      "Chill 10 minutes before serving.",
    ],
    tags: ["Salad", "Rajma"],
  },
  {
    id: "rcp-9",
    title: "Ghee & Jimbu Popcorn",
    emoji: "🍿",
    occasion: "Snack",
    calories: 280,
    time: 8,
    ingredients: ["Badri Cow Ghee", "Tempering Spice"],
    quickTip: "Bloom tempering spice in ghee off-heat to avoid burning.",
    steps: [
      "Pop kernels.",
      "Pour over warm ghee infused with tempering spice.",
      "Toss with salt.",
    ],
    tags: ["Snack", "Quick"],
  },
  {
    id: "rcp-10",
    title: "Black Soybean Chaat",
    emoji: "🥣",
    occasion: "Snack",
    calories: 300,
    time: 12,
    ingredients: ["Black Soybean"],
    quickTip: "Pressure-cook to al dente; shock in cold water for bite.",
    steps: [
      "Mix boiled soybeans with onions, tomatoes, green chilies.",
      "Add lemon, salt, chaat masala; finish with coriander.",
      "Optional: a small ghee tempering.",
    ],
    tags: ["Street", "Protein"],
  },
  {
    id: "rcp-11",
    title: "Festive Red Rice Kheer",
    emoji: "🍮",
    occasion: "Festive",
    calories: 420,
    time: 35,
    ingredients: ["Red Rice", "Badri Cow Ghee"],
    quickTip: "Toast rice in ghee before simmering for nuttiness.",
    steps: [
      "Toast red rice in ghee; add milk and simmer till creamy.",
      "Sweeten; add cardamom and nuts.",
      "Serve warm with saffron.",
    ],
    tags: ["Dessert", "Festive"],
  },
  {
    id: "rcp-12",
    title: "Rajma Patty Burgers",
    emoji: "🍔",
    occasion: "Experimental",
    calories: 470,
    time: 25,
    ingredients: ["Red Rajma", "White Rajma", "Tempering Spice"],
    quickTip: "Chill patties 15 mins; shallow-fry in ghee for crisp crust.",
    steps: [
      "Mash rajma; add onions, spice, breadcrumbs.",
      "Shape patties; chill.",
      "Pan-sear in ghee; assemble burgers/wraps.",
    ],
    tags: ["Fusion", "Snack"],
  },
  {
    id: "rcp-13",
    title: "Red Rice Buddha Bowl",
    emoji: "🥙",
    occasion: "Light",
    calories: 380,
    time: 20,
    ingredients: ["Red Rice", "Black Soybean"],
    quickTip: "Batch-cook red rice for 3 days of bowls.",
    steps: [
      "Layer red rice, soybeans, veggies.",
      "Drizzle yogurt-tahini or lemon-ghee dressing.",
      "Top with toasted seeds and herbs.",
    ],
    tags: ["Bowl", "Meal-Prep"],
  },
  {
    id: "rcp-14",
    title: "Ghee-Glazed Carrots with Jimbu",
    emoji: "🥕",
    occasion: "Side",
    calories: 220,
    time: 15,
    ingredients: ["Badri Cow Ghee", "Tempering Spice"],
    quickTip: "Add a splash of orange juice at the end for shine.",
    steps: [
      "Sauté carrots in ghee till tender-crisp.",
      "Add tempering spice + orange splash; toss.",
      "Season and serve.",
    ],
    tags: ["Side", "Quick"],
  },
  {
    id: "rcp-15",
    title: "White Rajma Hummus",
    emoji: "🧆",
    occasion: "Snack",
    calories: 330,
    time: 10,
    ingredients: ["White Rajma"],
    quickTip: "Blend hot beans for silkier texture.",
    steps: [
      "Blend white rajma with tahini, garlic, lemon, salt.",
      "Swirl with warm ghee or olive oil.",
      "Dust with tempering spice (optional).",
    ],
    tags: ["Dip", "Rajma"],
  },
  {
    id: "rcp-16",
    title: "Pahadi Dal Makhani (Black Soybean)",
    emoji: "🍲",
    occasion: "Dinner",
    calories: 520,
    time: 55,
    ingredients: ["Black Soybean", "Badri Cow Ghee"],
    quickTip: "Slow-simmer with a piece of ginger for depth.",
    steps: [
      "Cook soybeans till soft.",
      "Simmer with tomato-onion masala and spices.",
      "Finish with generous ghee and cream (optional).",
    ],
    tags: ["Comfort", "Protein"],
  },
  {
    id: "rcp-17",
    title: "Red Rice Upma with Tempering Spice",
    emoji: "🥣",
    occasion: "Breakfast",
    calories: 340,
    time: 18,
    ingredients: ["Red Rice", "Tempering Spice", "Badri Cow Ghee"],
    quickTip: "Pulse-cook red rice to just-soft for upma-like texture.",
    steps: [
      "Sauté onions, chilies in ghee; add tempering spice.",
      "Fold in cooked red rice; season.",
      "Garnish with coconut and lemon.",
    ],
    tags: ["Breakfast", "Quick"],
  },
  {
    id: "rcp-18",
    title: "Temple-Style Ghee Rice (Festive)",
    emoji: "🕯️",
    occasion: "Festive",
    calories: 460,
    time: 25,
    ingredients: ["Red Rice", "Badri Cow Ghee"],
    quickTip: "Add a clove + bay leaf while blooming ghee.",
    steps: [
      "Bloom spices in ghee; add cooked rice.",
      "Toss gently; add fried cashews and raisins.",
      "Serve with raita.",
    ],
    tags: ["Festive", "Rice"],
  },
  {
    id: "rcp-19",
    title: "Rajma & Red Rice Stuffed Peppers",
    emoji: "🌶️",
    occasion: "Dinner",
    calories: 420,
    time: 30,
    ingredients: ["Red Rajma", "Red Rice", "Tempering Spice"],
    quickTip: "Pre-roast peppers 8 min for better texture.",
    steps: [
      "Mix cooked rajma + rice with onion, tempering spice.",
      "Stuff into peppers; bake till tender.",
      "Finish with ghee drizzle.",
    ],
    tags: ["Baked", "Dinner"],
  },
  {
    id: "rcp-20",
    title: "Ghee-Lemon Red Rice Pancakes",
    emoji: "🥞",
    occasion: "Experimental",
    calories: 350,
    time: 20,
    ingredients: ["Red Rice", "Badri Cow Ghee"],
    quickTip: "Blend leftover rice with curd for batter in 30 sec.",
    steps: [
      "Blend cooked red rice with curd, egg (optional), salt, baking soda.",
      "Pan-cook in ghee like pancakes.",
      "Serve with honey and lemon zest.",
    ],
    tags: ["Breakfast", "Fusion"],
  },
];

const ALL_INGREDIENTS = Array.from(
  new Set(RECIPES.flatMap((r) => r.ingredients))
).sort();
const ALL_OCCASIONS = Array.from(new Set(RECIPES.map((r) => r.occasion)));
const ALL_TAGS = Array.from(new Set(RECIPES.flatMap((r) => r.tags || []))).sort();

// ===== NEW REDESIGN — WAVE THEME — START =====
const R = {
  DEEP_FOREST:'#03605C', DEEP_FOREST_DK:'#024442', FOREST_SHADOW:'#013532',
  INK:'#655F59', SEAL_TERRACOTTA:'#D76427', CREAM:'#F8F3EB', CREAM_SOFT:'#F1E7CE',
  PAPER:'#F8F3EB', MEADOW_GOLD:'#B5882D', GOLD_LINE:'#B5882D',
  SOIL_OLIVE:'#618E69', OCHRE:'#A56650',
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [R.CREAM, R.CREAM_SOFT];
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
            stroke={R.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

function Controls({ query, setQuery, occasion, setOccasion, tags, setTags, kcal, setKcal, ingredients, setIngredients, reset }) {
  return (
    <div className="wtn-r-controls">
      <div className="wtn-r-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <input value={query} placeholder="Search recipes, ingredients, or tags…"
               onChange={(e)=>setQuery(e.target.value)} />
      </div>
      <select className="wtn-r-select" value={occasion || ""} onChange={(e) => setOccasion(e.target.value || null)}>
        <option value="">All occasions</option>
        {ALL_OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div className="wtn-r-range">
        <label>Max Calories: <strong>{kcal} kcal</strong></label>
        <input type="range" min={200} max={700} step={10} value={kcal}
               onChange={(e) => setKcal(Number(e.target.value))} />
      </div>
      <button type="button" className="wtn-btn wtn-btn--ghost" onClick={reset}>Reset</button>

      <div className="wtn-r-chipwrap">
        <span className="wtn-r-chipwrap__label">Ingredients</span>
        <div className="wtn-r-chips">
          {ALL_INGREDIENTS.map(ing => {
            const active = ingredients.includes(ing);
            return (
              <button key={ing} type="button"
                className={`wtn-r-chip ${active?'is-active':''}`}
                onClick={()=>{ setIngredients(active? ingredients.filter(x=>x!==ing) : [...ingredients, ing]); }}>
                {ing}
              </button>
            );
          })}
        </div>
      </div>

      <div className="wtn-r-chipwrap">
        <span className="wtn-r-chipwrap__label">Tags</span>
        <div className="wtn-r-chips">
          {ALL_TAGS.map(tag => {
            const active = tags.includes(tag);
            return (
              <button key={tag} type="button"
                className={`wtn-r-chip ${active?'is-active':''}`}
                onClick={()=>{ setTags(active? tags.filter(t=>t!==tag) : [...tags, tag]); }}>
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <article className="wtn-r-card">
      <div className="wtn-r-card__head">
        <span className="wtn-r-card__emoji" aria-hidden>{recipe.emoji}</span>
        <div>
          <span className="wtn-r-card__occ">{recipe.occasion}</span>
          <h3 className="wtn-r-card__title">{recipe.title}</h3>
        </div>
      </div>
      <div className="wtn-r-card__meta">
        <span><strong>{recipe.calories}</strong> kcal</span>
        <span aria-hidden>·</span>
        <span><strong>{recipe.time}</strong> min</span>
      </div>
      <div className="wtn-r-card__ings">
        {recipe.ingredients?.map(i => <span key={i} className="wtn-r-ing">{i}</span>)}
      </div>
      {recipe.quickTip && (
        <p className="wtn-r-card__tip"><strong>Tip:</strong> {recipe.quickTip}</p>
      )}
      <ol className="wtn-r-card__steps">
        {recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
      {recipe.tags && (
        <div className="wtn-r-card__tags">
          {recipe.tags.map(t => <span key={t} className="wtn-r-tag">{t}</span>)}
        </div>
      )}
    </article>
  );
}

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [occasion, setOccasion] = useState(null);
  const [tags, setTags] = useState([]);
  const [kcal, setKcal] = useState(600);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-rp .wtn-reveal, .wtn-rp .wtn-reveal-group');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); }
      }),
      // threshold: 0 (not 0.12) — a tall .wtn-reveal-group on mobile
      // (20 recipe cards in 1 column can be ~8000px tall) caps its own
      // intersectionRatio well below 0.12, so a threshold of 0.12 would
      // never fire and the cards would stay invisible. Trigger as soon
      // as any part enters the rootMargin-trimmed viewport instead.
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [query, occasion, kcal, ingredients, tags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter(r => {
      if (q) {
        const hay = (r.title + " " + r.ingredients.join(" ") + " " + (r.tags || []).join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (occasion && r.occasion !== occasion) return false;
      if (kcal && r.calories > kcal) return false;
      if (ingredients.length) {
        const set = new Set(r.ingredients.map(x => x.toLowerCase()));
        if (!ingredients.some(ing => set.has(ing.toLowerCase()))) return false;
      }
      if (tags.length) {
        const t = (r.tags || []).map(x => x.toLowerCase());
        if (!tags.some(x => t.includes(x.toLowerCase()))) return false;
      }
      return true;
    });
  }, [query, occasion, kcal, ingredients, tags]);

  const reset = () => {
    setQuery(""); setOccasion(null); setTags([]); setKcal(600); setIngredients([]);
  };

  return (
    <div className="wtn-rp">
      <style>{R_STYLES}</style>

      {/* HERO */}
      <section className="wtn-r-hero">
        <div className="wtn-section__inner" style={{ textAlign: 'center' }}>
          <span className="wtn-eyebrow wtn-reveal">From the Valley Kitchen</span>
          <h1 className="wtn-h2 wtn-h1 wtn-reveal">20 Signature Himalayan Recipes</h1>
          <svg className="wtn-h2-rule wtn-reveal" viewBox="0 0 84 6" preserveAspectRatio="none"
               aria-hidden="true" style={{ margin: '10px auto 18px' }}>
            <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3"
                  stroke={R.MEADOW_GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="wtn-sub wtn-reveal" style={{ margin: '0 auto' }}>
            Comfort classics, festive plates, quick snacks, and clever fusions —
            all built around OUO rajma, red rice, ghee, spice, and black soybean.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[R.CREAM_SOFT]} />

      {/* CONTROLS + GRID */}
      <section className="wtn-section wtn-r-list">
        <div className="wtn-section__inner">
          <div className="wtn-reveal">
            <Controls
              query={query} setQuery={setQuery}
              occasion={occasion} setOccasion={setOccasion}
              tags={tags} setTags={setTags}
              kcal={kcal} setKcal={setKcal}
              ingredients={ingredients} setIngredients={setIngredients}
              reset={reset}
            />
          </div>

          {filtered.length ? (
            <div className="wtn-r-grid wtn-reveal-group">
              {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          ) : (
            <div className="wtn-r-empty wtn-reveal">
              <p>No recipes match your filters.</p>
              <p>Tip: try <strong>Rajma</strong>, <strong>Red Rice</strong>, or bump up max calories.</p>
              <button type="button" className="wtn-btn wtn-btn--primary" onClick={reset}>Reset</button>
            </div>
          )}
        </div>
      </section>

      <WaveDivider height={80} palette={[R.DEEP_FOREST, R.DEEP_FOREST_DK, R.FOREST_SHADOW]} />

      {/* CTA */}
      <section className="wtn-r-cta">
        <div className="wtn-cta__inner wtn-reveal">
          <span className="wtn-cta__eyebrow">Cook Along</span>
          <h2>Everything you need to make these — from the valley.</h2>
          <p>Real ghee, real rajma, real red rice. Shipped straight from Himalayan farms.</p>
          <Link to="/products" className="wtn-btn wtn-btn--primary wtn-btn--large">Shop the Ingredients</Link>
        </div>
      </section>
    </div>
  );
}

const R_STYLES = `
  .wtn-rp, .wtn-rp * { box-sizing: border-box; }
  .wtn-rp {
    background: ${R.CREAM}; color: ${R.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }
  .wtn-rp .wtn-reveal, .wtn-rp .wtn-reveal-group > * {
    opacity: 0; transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
  }
  .wtn-rp .wtn-reveal.is-inview,
  .wtn-rp .wtn-reveal-group.is-inview > * { opacity: 1; transform: none; }
  .wtn-rp .wtn-reveal-group > *:nth-child(2) { transition-delay: 40ms; }
  .wtn-rp .wtn-reveal-group > *:nth-child(3) { transition-delay: 80ms; }
  .wtn-rp .wtn-reveal-group > *:nth-child(4) { transition-delay: 120ms; }
  .wtn-rp .wtn-reveal-group > *:nth-child(5) { transition-delay: 160ms; }
  .wtn-rp .wtn-reveal-group > *:nth-child(6) { transition-delay: 200ms; }

  .wtn-section { position: relative; padding: 64px 28px 80px; }
  .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
  .wtn-eyebrow {
    display: inline-block;
    background: ${R.DEEP_FOREST}; color: ${R.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .wtn-h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 42px);
    color: ${R.DEEP_FOREST_DK};
    margin: 14px 0 10px; line-height: 1.15;
  }
  .wtn-h1 { font-size: clamp(34px, 4vw, 54px); }
  .wtn-h2-rule { display: block; width: 84px; height: 6px; }
  .wtn-sub { max-width: 640px; color: ${R.INK}; opacity: 0.78; font-size: 15.5px; line-height: 1.6; margin: 0 0 24px; }

  .wtn-btn {
    display: inline-block; padding: 12px 26px;
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; text-decoration: none;
    border: 1.5px solid transparent; cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .wtn-btn--primary { background: ${R.MEADOW_GOLD}; color: ${R.FOREST_SHADOW}; border-color: ${R.MEADOW_GOLD}; }
  .wtn-btn--primary:hover { background: ${R.SEAL_TERRACOTTA}; color: ${R.CREAM}; border-color: ${R.SEAL_TERRACOTTA}; transform: translateY(-1px); }
  .wtn-btn--ghost { background: ${R.CREAM}; color: ${R.DEEP_FOREST}; border-color: ${R.DEEP_FOREST}; }
  .wtn-btn--ghost:hover { background: ${R.DEEP_FOREST}; color: ${R.CREAM}; }
  .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

  .wtn-r-hero { background: ${R.CREAM}; padding: 80px 28px 40px; text-align: center; }

  /* Controls */
  .wtn-r-controls {
    display: grid;
    grid-template-columns: 2fr 1fr 1.4fr auto;
    gap: 10px 12px; align-items: center;
    margin-bottom: 28px;
  }
  .wtn-r-search {
    display: flex; align-items: center; gap: 10px;
    background: ${R.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 0 14px; color: ${R.DEEP_FOREST};
  }
  .wtn-r-search:focus-within { border-color: ${R.MEADOW_GOLD}; }
  .wtn-r-search input {
    flex: 1; background: transparent; border: 0; outline: none;
    padding: 12px 0; font-family: inherit; font-size: 14px; color: ${R.INK};
  }
  .wtn-r-search input::placeholder { color: ${R.INK}; opacity: 0.55; }
  .wtn-r-select {
    background: ${R.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 10px 12px;
    font-family: inherit; font-size: 13.5px;
    color: ${R.DEEP_FOREST_DK}; cursor: pointer;
  }
  .wtn-r-select:focus { border-color: ${R.MEADOW_GOLD}; outline: none; }
  .wtn-r-range {
    display: flex; flex-direction: column; gap: 4px;
    background: ${R.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 8px 14px;
  }
  .wtn-r-range label {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700; color: ${R.SOIL_OLIVE};
  }
  .wtn-r-range strong { color: ${R.DEEP_FOREST_DK}; font-weight: 800; }
  .wtn-r-range input[type=range] { width: 100%; accent-color: ${R.MEADOW_GOLD}; }

  .wtn-r-chipwrap { grid-column: 1 / -1; }
  .wtn-r-chipwrap__label {
    display: block;
    font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; color: ${R.SOIL_OLIVE}; margin: 8px 0 6px;
  }
  .wtn-r-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .wtn-r-chip {
    background: ${R.CREAM}; color: ${R.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 5px 11px;
    font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    transition: all 160ms ease;
  }
  .wtn-r-chip:hover { border-color: ${R.MEADOW_GOLD}; }
  .wtn-r-chip.is-active { background: ${R.DEEP_FOREST}; color: ${R.CREAM}; border-color: ${R.DEEP_FOREST}; }

  /* Grid & Cards */
  .wtn-r-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
  .wtn-r-card {
    background: ${R.CREAM_SOFT};
    border: 1px solid rgba(30,90,85,0.10);
    padding: 22px 22px 20px;
    display: flex; flex-direction: column;
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  }
  .wtn-r-card:hover {
    transform: translateY(-4px);
    border-color: ${R.MEADOW_GOLD};
    box-shadow: 0 10px 24px rgba(15,58,54,0.10);
  }
  .wtn-r-card__head { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 8px; }
  .wtn-r-card__emoji {
    font-size: 32px; line-height: 1;
    flex: 0 0 auto;
    padding-top: 4px;
  }
  .wtn-r-card__occ {
    display: inline-block;
    background: ${R.MEADOW_GOLD}; color: ${R.FOREST_SHADOW};
    font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 800; padding: 3px 8px; margin-bottom: 6px;
  }
  .wtn-r-card__title {
    font-family: Georgia, serif; font-size: 18px;
    color: ${R.DEEP_FOREST_DK}; margin: 0; line-height: 1.25;
  }
  .wtn-r-card__meta {
    display: flex; gap: 8px;
    font-size: 12px; color: ${R.INK}; opacity: 0.85;
    margin: 0 0 12px;
  }
  .wtn-r-card__meta strong { color: ${R.DEEP_FOREST_DK}; font-weight: 700; }
  .wtn-r-card__ings { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .wtn-r-ing {
    font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 600; color: ${R.SOIL_OLIVE};
    background: rgba(168,185,117,0.18);
    padding: 4px 8px; border: 1px solid rgba(111,131,64,0.28);
  }
  .wtn-r-card__tip {
    background: rgba(181,136,45,0.10);
    border-left: 3px solid ${R.MEADOW_GOLD};
    padding: 10px 12px; margin: 0 0 12px;
    font-size: 13px; color: ${R.INK}; line-height: 1.55;
  }
  .wtn-r-card__tip strong { color: ${R.DEEP_FOREST_DK}; font-weight: 700; }
  .wtn-r-card__steps {
    margin: 0 0 12px; padding-left: 20px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .wtn-r-card__steps li {
    font-size: 13.5px; color: ${R.INK}; line-height: 1.55;
  }
  .wtn-r-card__tags {
    display: flex; flex-wrap: wrap; gap: 6px;
    padding-top: 10px; margin-top: auto;
    border-top: 1px dashed rgba(30,90,85,0.18);
  }
  .wtn-r-tag {
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 600; color: ${R.DEEP_FOREST_DK};
    background: ${R.CREAM};
    padding: 3px 8px; border: 1px solid rgba(3,96,92,0.18);
  }

  .wtn-r-empty {
    text-align: center; padding: 40px 20px;
    background: ${R.CREAM_SOFT};
    border: 1px dashed rgba(30,90,85,0.20);
  }
  .wtn-r-empty p { color: ${R.INK}; margin: 0 0 12px; }

  /* CTA */
  .wtn-r-cta {
    background: ${R.FOREST_SHADOW}; color: ${R.CREAM};
    padding: 80px 28px; text-align: center;
  }
  .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
  .wtn-cta__eyebrow {
    display: inline-block;
    background: ${R.MEADOW_GOLD}; color: ${R.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 18px;
  }
  .wtn-r-cta h2 {
    font-family: Georgia, serif; font-size: clamp(28px, 3.6vw, 44px);
    color: ${R.CREAM}; margin: 0 0 12px; line-height: 1.15;
  }
  .wtn-r-cta p { color: ${R.CREAM}; opacity: 0.82; font-size: 15.5px; line-height: 1.6; margin: 0 0 26px; }

  @media (max-width: 900px) {
    .wtn-section { padding: 48px 20px 60px; }
    .wtn-r-hero { padding: 60px 20px 28px; }
    .wtn-r-cta { padding: 60px 20px; }
    .wtn-r-controls { grid-template-columns: 1fr 1fr; }
    .wtn-r-search { grid-column: 1 / -1; }
    .wtn-r-range { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .wtn-r-controls { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wtn-rp .wtn-reveal, .wtn-rp .wtn-reveal-group > * { transition: none; }
  }
`;
// ===== NEW REDESIGN — WAVE THEME — END =====
