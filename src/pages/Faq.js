import React, { useMemo, useState } from "react";
import "./Faq.css";


// --- FAQ DATA (from attached sheet, lightly formatted) -----------------------
const FAQ_ITEMS = [
  {
    id: 1,
    q: "Who is Orang Utan Organics and why the Himalayan focus?",
    a: "Orang Utan Organics (OUO) is an agri-organic initiative born in the Gangotri Valley of Uttarakhand, around 2,300 m altitude. We partner with small Himalayan farmers to bring truly mountain-grown, clean, and traceable produce — from red & white rajma to Badri cow ghee and wild spices — directly to your kitchen. We’re not an urban label using the “Himalayan” tag. We live and grow there.",
  },
  {
    id: 2,
    q: "What makes OUO different from other Himalayan organic brands?",
    a: "Most “Himalayan” brands outsource or aggregate from lower plains. OUO operates at source: our farmers, storage units, and packhouses are within the Himalayan belt itself. Each product connects to a real farmer, real altitude, and real village story — that’s our biggest differentiator.",
  },
  {
    id: 3,
    q: "What is 'traceable food' and why does it matter?",
    a: "We’re currently in the development phase of a digital traceability platform that will let you scan a QR code and see where your food truly comes from — the farm cluster, the farmer’s name, and even the seed lineage. The system uses geo-seed mapping, Medusa-based traceability dashboards hosted on secure AWS RDS servers, and AI-driven validation to cross-check supply batches. We believe consumers deserve to know the truth behind the label. Traceability is not a buzzword here — it’s a promise in progress, and customers will soon experience it live on every OUO pack.",
  },
  {
    id: 4,
    q: "Why does altitude matter for your products?",
    a: "High-altitude crops grow slowly, in glacial water and mineral-rich soil, resulting in higher protein and flavor density. For example, Himalayan Rajma is creamier and more digestible, and Badri Cow Ghee is richer in good fats because the cows graze on wild herbs found only above 2,000 m. Altitude gives nature time to perfect the nutrition.",
  },
  {
    id: 5,
    q: "How do you ensure your farmers get a fair price?",
    a: `Farmer‑First Pricing Model: direct partnerships (no middlemen), assured buybacks above market, reimbursements for organic inputs, and incentives for quality + traceability.`,
  },
  {
    id: 6,
    q: "Are OUO products certified organic?",
    a: "Yes. OUO operates under PGS Organic India, NABL lab tested and follows APEDA/EIC compliance for export readiness. But our true “certificate” lies in our soil — zero chemical inputs, traditional composting, and glacier-fed irrigation.",
  },
  {
    id: 7,
    q: "How does OUO support Himalayan farmers?",
    a: "We guarantee fair, above-market pricing; train farmers in regenerative practices; and include them in our tech platforms instead of leaving them out. Every new farmer onboarded is digitally mapped, ensuring ownership and pride remain within the mountain community.",
  },
  {
    id: 8,
    q: "What products do you offer ?",
    a: `
    • Badri Cow Ghee – made from indigenous Himalayan cows\n
• White & Red Rajma – heirloom pulses with natural protein\n
• Himalayan Red Rice & Black Soybean – high in minerals and fiber\n
• Wild Himalayan Tempering Spice – naturally sun-dried aroma blend\n\n

All grown, harvested, and packed within the Himalayan ecosystem — not rebranded from elsewhere.
`
  },
  {
    id: 9,
    q: "How should I store OUO products?",
    a: `• Ghee: Keep airtight in a cool, dark space (no refrigeration needed).
• Pulses / Grains: Store in moisture-free airtight containers.
• Spices: Use dry spoons and avoid direct sunlight.
Since no preservatives are added, natural care ensures freshness.
`
  },
  {
    id: 10,
    q: "Do you deliver across India?",
    a: `Yes — we deliver pan-India within 3 to 7 days depending on your pin code. Orders are trackable through our WhatsApp AI journey or via your order confirmation email.`,
  },
  {
    id: 11,
    q: "What if my order is damaged or incorrect?",
    a: `If something goes wrong, contact us within 48 hours of delivery at support@orangutanorganics.com. We’ll replace or refund according to our simple return policy — no long forms, just human support.`,
  },
  {
    id: 12,
    q: "Are OUO products suitable for Ayurveda and wellness diets?",
    a: "Yes. Our products align naturally with Ayurvedic principles — especially Badri Cow Ghee and Himalayan Rajma — because they’re sattvic (pure), easily digestible, and free from chemical residues."
  },
  {
    id: 13,
    q: "What is OUO doing for sustainability and carbon credits?",
    a: `We’re documenting soil-carbon data to build a future carbon-credit model that rewards farmers for regenerative practices. Our goal is to make Himalayan farming climate-positive — turning every purchase into environmental support.`,
  },
  {
    id: 14,
    q: "What’s next for Orang Utan Organics?",
    a: `Our roadmap includes:
• Full-scale traceability launch with consumer dashboards
• Predictive-yield AI models for altitude-based farming
• Integration with carbon-tracking tools
• Global outreach through BIOFACH India 2025 and similar events

Every jar or pack you buy accelerates that mission — to prove the Himalayas can lead the world in clean, transparent food.
`
  },
];


function ControlsFaq({ query, setQuery, reset }) {
  return (
    <section className="faq-controls">
      <div className="faq-input" title="Search by question or keyword">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <input value={query} placeholder="Search FAQ..." onChange={(e) => setQuery(e.target.value)} />
      </div>

      <button className="faq-btn" onClick={reset} title="Clear search" style={{ color: "black" }}>Reset</button>
    </section>
  );
}

function FAQItem({ item, open, onToggle }) {
  return (
    <article className="faq-card" role="region" aria-label={item.q}>
      <div className="faq-card__band" aria-hidden></div>
      <button className="faq__q" onClick={onToggle} aria-expanded={open}>
        <span className="faq__qtext">{item.q}</span>
        <span className="faq__icon" aria-hidden>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="faq-card__body">
          <p className="faq__a">{item.a}</p>
        </div>
      )}
    </article>
  );
}

function Faq() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;

    return FAQ_ITEMS.filter((r) => {
      const hay = (r.q + " " + r.a).toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const reset = () => { setQuery(""); setOpenId(FAQ_ITEMS[0].id); };

  return (
    <>
      <ControlsFaq query={query} setQuery={setQuery} reset={reset} />

      <main className="faq-container">
        {filtered.length ? (
          <section className="faq-grid">
            {filtered.map((item) => (
              <div key={item.id} className="faq-col-span-12">
                <FAQItem item={item} open={openId === item.id} onToggle={() => setOpenId(openId === item.id ? -1 : item.id)} />
              </div>
            ))}
          </section>
        ) : (
          <div className="faq-empty">
            <p>No FAQ matches your search. Try a different keyword or <button className="faq-btn faq-btn--primary" onClick={reset}>reset</button>.</p>
          </div>
        )}
      </main>
    </>
  );
}

export default Faq;