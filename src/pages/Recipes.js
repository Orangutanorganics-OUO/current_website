import React, { useMemo, useState } from "react";
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

const LOGO_URL =
  "https://orangutanorganics.com/wp-content/uploads/2024/07/Orang-utan-color-logo-1.png";

const ALL_INGREDIENTS = Array.from(
  new Set(RECIPES.flatMap((r) => r.ingredients))
).sort();
const ALL_OCCASIONS = Array.from(new Set(RECIPES.map((r) => r.occasion)));
const ALL_TAGS = Array.from(new Set(RECIPES.flatMap((r) => r.tags || []))).sort();

// --- UI ---------------------------------------------------------------------

function Controls({
  query,
  setQuery,
  occasion,
  setOccasion,
  tags,
  setTags,
  kcal,
  setKcal,
  ingredients,
  setIngredients,
  reset,
}) {
  return (
    <section className="controls">
      <div className="input" title="Search by recipe, ingredient, tag">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          value={query}
          placeholder="Search recipes..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="select">
        <select value={occasion || ""} onChange={(e) => setOccasion(e.target.value || null)}>
          <option value="">All occasions</option>
          {ALL_OCCASIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="range">
        <label>Max Calories: {kcal} kcal</label>
        <input
          type="range"
          min={200}
          max={700}
          step={10}
          value={kcal}
          onChange={(e) => setKcal(Number(e.target.value))}
        />
      </div>

      <button className="btn" onClick={reset} title="Clear all filters" style={{ color: "black" }}>
        Reset
      </button>

      <div className="chipset" style={{ gridColumn: "1 / -1" }}>
        <div className="chips">
          {ALL_INGREDIENTS.map((ing) => {
            const active = ingredients.includes(ing);
            return (
              <button
                key={ing}
                className={"chip " + (active ? "chip--active" : "")}
                onClick={() => {
                  setIngredients(
                    active ? ingredients.filter((x) => x !== ing) : [...ingredients, ing]
                  );
                }}
              >
                {ing}
              </button>
            );
          })}
        </div>
      </div>

      <div className="chipset" style={{ gridColumn: "1 / -1" }}>
        <div className="chips">
          {ALL_TAGS.map((tag) => {
            const active = tags.includes(tag);
            return (
              <button
                key={tag}
                className={"chip " + (active ? "chip--active" : "")}
                onClick={() => {
                  setTags(active ? tags.filter((t) => t !== tag) : [...tags, tag]);
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RecipeCard({ recipe }) {
  return (
    <article className="card" role="region" aria-label={recipe.title}>
      <div className="card__band" aria-hidden></div>
      <h3 className="card__title">
        {recipe.emoji ? recipe.emoji + " " : ""}
        {recipe.title}
      </h3>
      <div className="card__meta">
        <span>{recipe.occasion}</span>
        <span>•</span>
        <span>{recipe.calories} kcal</span>
        <span>•</span>
        <span>{recipe.time} min</span>
      </div>
      <div className="card__body">
        <div className="pillrow">
          {recipe.ingredients?.map((i) => (
            <span key={i} className="pill">{i}</span>
          ))}
        </div>

        <p className="muted">Tip: {recipe.quickTip}</p>
        <ol className="steps">
          {recipe.steps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}

export default function Recipes() {
  const [query, setQuery] = useState("");
  const [occasion, setOccasion] = useState(null);
  const [tags, setTags] = useState([]);
  const [kcal, setKcal] = useState(600);
  const [ingredients, setIngredients] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (q) {
        const hay = (
          r.title +
          " " +
          r.ingredients.join(" ") +
          " " +
          (r.tags || []).join(" ")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (occasion && r.occasion !== occasion) return false;
      if (kcal && r.calories > kcal) return false;
      if (ingredients.length) {
        const set = new Set(r.ingredients.map((x) => x.toLowerCase()));
        const ok = ingredients.some((ing) => set.has(ing.toLowerCase()));
        if (!ok) return false;
      }
      if (tags.length) {
        const t = (r.tags || []).map((x) => x.toLowerCase());
        const ok = tags.some((x) => t.includes(x.toLowerCase()));
        if (!ok) return false;
      }
      return true;
    });
  }, [query, occasion, kcal, ingredients, tags]);

  const reset = () => {
    setQuery("");
    setOccasion(null);
    setTags([]);
    setKcal(600);
    setIngredients([]);
  };

  return (
    <>
      <Controls
        query={query}
        setQuery={setQuery}
        occasion={occasion}
        setOccasion={setOccasion}
        tags={tags}
        setTags={setTags}
        kcal={kcal}
        setKcal={setKcal}
        ingredients={ingredients}
        setIngredients={setIngredients}
        reset={reset}
      />

      <main className="container">
        {filtered.length ? (
          <section className="grid">
            {filtered.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </section>
        ) : (
          <div className="empty">
            <p>
              No recipes match. Adjust filters or
              {" "}
              <button className="btn btn--primary" onClick={reset}>
                reset
              </button>
              .
            </p>
            <p>
              Tip: try searching <strong>Rajma</strong>, <strong>Red Rice</strong>, or use the
              calorie slider.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
