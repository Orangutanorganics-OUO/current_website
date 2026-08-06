import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    q: "What products do you offer?",
    a: `• Badri Cow Ghee – made from indigenous Himalayan cows
• White & Red Rajma – heirloom pulses with natural protein
• Himalayan Red Rice & Black Soybean – high in minerals and fiber
• Wild Himalayan Tempering Spice – naturally sun-dried aroma blend

All grown, harvested, and packed within the Himalayan ecosystem — not rebranded from elsewhere.`,
  },
  {
    id: 9,
    q: "How should I store OUO products?",
    a: `• Ghee: Keep airtight in a cool, dark space (no refrigeration needed).
• Pulses / Grains: Store in moisture-free airtight containers.
• Spices: Use dry spoons and avoid direct sunlight.
Since no preservatives are added, natural care ensures freshness.`,
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
    a: "Yes. Our products align naturally with Ayurvedic principles — especially Badri Cow Ghee and Himalayan Rajma — because they’re sattvic (pure), easily digestible, and free from chemical residues.",
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

Every jar or pack you buy accelerates that mission — to prove the Himalayas can lead the world in clean, transparent food.`,
  },
];

// ===== NEW REDESIGN — WAVE THEME — START =====
const FQ = {
  DEEP_FOREST: '#03605C', DEEP_FOREST_DK: '#024442', FOREST_SHADOW: '#013532',
  INK: '#655F59', SEAL_TERRACOTTA: '#D76427', CREAM: '#F8F3EB', CREAM_SOFT: '#F1E7CE',
  PAPER: '#F8F3EB', MEADOW_GOLD: '#B5882D', GOLD_LINE: '#B5882D',
  OCHRE: '#A56650', SOIL_OLIVE: '#618E69',
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [FQ.CREAM, FQ.CREAM_SOFT];
  const style = { transform: flip ? 'scaleY(-1)' : 'none', display: 'block', width: '100%', height };
  return (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" style={style}>
      <path d="M0,32 C220,4 460,72 720,36 C980,0 1220,60 1440,28 L1440,100 L0,100 Z"
            fill={layers[0]} opacity="0.95"/>
      {layers[1] && (
        <path d="M0,52 C260,28 480,80 780,52 C1060,26 1260,72 1440,48 L1440,100 L0,100 Z"
              fill={layers[1]} opacity="0.65"/>
      )}
      <path d="M0,34 C220,6 460,74 720,38 C980,2 1220,62 1440,30"
            stroke={FQ.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

function FAQItem({ item, open, onToggle }) {
  return (
    <article className={`wtn-faq__card ${open ? 'is-open' : ''}`}>
      <button className="wtn-faq__q" onClick={onToggle} aria-expanded={open}>
        <span className="wtn-faq__qtext">{item.q}</span>
        <span className="wtn-faq__icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={open ? "M3 8 L13 8" : "M3 8 L13 8 M8 3 L8 13"}
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="wtn-faq__body">
          <p className="wtn-faq__a">{item.a}</p>
        </div>
      )}
    </article>
  );
}

function Faq() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-faqp .wtn-reveal, .wtn-faqp .wtn-reveal-group');
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
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((r) => (r.q + " " + r.a).toLowerCase().includes(q));
  }, [query]);

  const reset = () => { setQuery(""); setOpenId(FAQ_ITEMS[0].id); };

  return (
    <div className="wtn-faqp">
      <style>{FQ_STYLES}</style>

      {/* ============ HERO ============ */}
      <section className="wtn-faq-hero">
        <div className="wtn-section__inner" style={{ textAlign: 'center' }}>
          <span className="wtn-eyebrow wtn-reveal">Answers</span>
          <h1 className="wtn-h2 wtn-h1 wtn-reveal">Frequently Asked Questions</h1>
          <svg className="wtn-h2-rule wtn-reveal" viewBox="0 0 84 6" preserveAspectRatio="none"
               aria-hidden="true" style={{ margin: '10px auto 18px' }}>
            <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3"
                  stroke={FQ.MEADOW_GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="wtn-sub wtn-reveal" style={{ margin: '0 auto' }}>
            Everything you might want to know — about our farmers, our products,
            our traceability, and how we ship the Himalayas to your kitchen.
          </p>

          {/* Search */}
          <div className="wtn-faq-search wtn-reveal">
            <div className="wtn-faq-search__input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <input value={query} placeholder="Search questions or keywords…"
                     onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button className="wtn-btn wtn-btn--ghost" onClick={reset} type="button">Reset</button>
          </div>
        </div>
      </section>

      <WaveDivider height={70} palette={[FQ.CREAM_SOFT]} />

      {/* ============ FAQ LIST ============ */}
      <section className="wtn-section wtn-faq-list">
        <div className="wtn-section__inner" style={{ maxWidth: 900 }}>
          {filtered.length ? (
            <div className="wtn-faq__stack wtn-reveal-group">
              {filtered.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? -1 : item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="wtn-faq-empty wtn-reveal">
              <p>No FAQ matches your search. Try a different keyword, or</p>
              <button className="wtn-btn wtn-btn--primary" onClick={reset} type="button">Reset search</button>
            </div>
          )}
        </div>
      </section>

      <WaveDivider height={80} palette={[FQ.DEEP_FOREST, FQ.DEEP_FOREST_DK, FQ.FOREST_SHADOW]} />

      {/* ============ CTA ============ */}
      <section className="wtn-faq-cta">
        <div className="wtn-cta__inner wtn-reveal">
          <span className="wtn-cta__eyebrow">Still Curious?</span>
          <h2>Didn&rsquo;t find your answer?</h2>
          <p>Write to us — we reply personally, from the valley.</p>
          <Link to="/contact" className="wtn-btn wtn-btn--primary wtn-btn--large">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

const FQ_STYLES = `
  .wtn-faqp, .wtn-faqp * { box-sizing: border-box; }
  .wtn-faqp {
    background: ${FQ.CREAM};
    color: ${FQ.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }
  .wtn-faqp .wtn-reveal, .wtn-faqp .wtn-reveal-group > * {
    opacity: 0; transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
  }
  .wtn-faqp .wtn-reveal.is-inview,
  .wtn-faqp .wtn-reveal-group.is-inview > * { opacity: 1; transform: none; }
  .wtn-faqp .wtn-reveal-group > *:nth-child(2) { transition-delay: 40ms; }
  .wtn-faqp .wtn-reveal-group > *:nth-child(3) { transition-delay: 80ms; }
  .wtn-faqp .wtn-reveal-group > *:nth-child(4) { transition-delay: 120ms; }
  .wtn-faqp .wtn-reveal-group > *:nth-child(5) { transition-delay: 160ms; }
  .wtn-faqp .wtn-reveal-group > *:nth-child(6) { transition-delay: 200ms; }

  .wtn-section { position: relative; padding: 64px 28px 80px; }
  .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
  .wtn-eyebrow {
    display: inline-block;
    background: ${FQ.DEEP_FOREST}; color: ${FQ.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .wtn-h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 42px);
    color: ${FQ.DEEP_FOREST_DK};
    margin: 14px 0 10px; line-height: 1.15;
  }
  .wtn-h1 { font-size: clamp(34px, 4vw, 54px); }
  .wtn-h2-rule { display: block; width: 84px; height: 6px; }
  .wtn-sub { max-width: 640px; color: ${FQ.INK}; opacity: 0.78; font-size: 15.5px; line-height: 1.6; margin: 0 0 24px; }

  .wtn-btn {
    display: inline-block; padding: 12px 26px;
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; text-decoration: none;
    border: 1.5px solid transparent; cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .wtn-btn--primary { background: ${FQ.MEADOW_GOLD}; color: ${FQ.FOREST_SHADOW}; border-color: ${FQ.MEADOW_GOLD}; }
  .wtn-btn--primary:hover { background: ${FQ.SEAL_TERRACOTTA}; color: ${FQ.CREAM}; border-color: ${FQ.SEAL_TERRACOTTA}; transform: translateY(-1px); }
  .wtn-btn--ghost { background: ${FQ.CREAM}; color: ${FQ.DEEP_FOREST}; border-color: ${FQ.DEEP_FOREST}; }
  .wtn-btn--ghost:hover { background: ${FQ.DEEP_FOREST}; color: ${FQ.CREAM}; }
  .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

  .wtn-faq-hero { background: ${FQ.CREAM}; padding: 80px 28px 40px; text-align: center; }

  /* Search */
  .wtn-faq-search {
    display: flex; gap: 12px; justify-content: center;
    max-width: 620px; margin: 6px auto 0;
    align-items: stretch; flex-wrap: wrap;
  }
  .wtn-faq-search__input {
    display: flex; align-items: center; gap: 10px;
    flex: 1 1 320px;
    background: ${FQ.CREAM_SOFT};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 0 16px;
    color: ${FQ.DEEP_FOREST};
  }
  .wtn-faq-search__input:focus-within { border-color: ${FQ.MEADOW_GOLD}; }
  .wtn-faq-search__input input {
    flex: 1;
    background: transparent; border: 0;
    padding: 14px 0;
    font-family: inherit; font-size: 14.5px;
    color: ${FQ.INK}; outline: none;
  }
  .wtn-faq-search__input input::placeholder { color: ${FQ.INK}; opacity: 0.55; }

  /* FAQ list */
  .wtn-faq-list { background: ${FQ.PAPER}; }
  .wtn-faq__stack { display: flex; flex-direction: column; gap: 14px; }
  .wtn-faq__card {
    background: ${FQ.CREAM_SOFT};
    border: 1px solid rgba(30,90,85,0.10);
    transition: border-color 200ms ease, box-shadow 200ms ease;
  }
  .wtn-faq__card:hover { border-color: ${FQ.MEADOW_GOLD}; }
  .wtn-faq__card.is-open { border-color: ${FQ.MEADOW_GOLD}; box-shadow: 0 8px 20px rgba(15,58,54,0.08); }
  .wtn-faq__q {
    width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 20px;
    background: transparent; border: 0;
    padding: 22px 24px;
    text-align: left; cursor: pointer;
    font-family: Georgia, serif;
    font-size: clamp(15px, 1.4vw, 18px);
    color: ${FQ.DEEP_FOREST_DK};
    line-height: 1.35;
  }
  .wtn-faq__icon {
    flex: 0 0 auto;
    width: 36px; height: 36px;
    display: inline-flex; align-items: center; justify-content: center;
    background: ${FQ.DEEP_FOREST}; color: ${FQ.CREAM};
    border-radius: 50%;
    transition: background 180ms ease;
  }
  .wtn-faq__card.is-open .wtn-faq__icon { background: ${FQ.SEAL_TERRACOTTA}; }
  .wtn-faq__body {
    padding: 0 24px 22px;
    border-top: 1px dashed rgba(30,90,85,0.18);
    padding-top: 18px;
  }
  .wtn-faq__a {
    margin: 0;
    font-size: 14.5px; line-height: 1.7; color: ${FQ.INK};
    white-space: pre-wrap;
  }

  .wtn-faq-empty {
    text-align: center; padding: 40px 20px;
    background: ${FQ.CREAM_SOFT};
    border: 1px dashed rgba(30,90,85,0.20);
  }
  .wtn-faq-empty p { color: ${FQ.INK}; margin: 0 0 16px; }

  /* CTA */
  .wtn-faq-cta {
    background: ${FQ.FOREST_SHADOW}; color: ${FQ.CREAM};
    padding: 80px 28px; text-align: center;
  }
  .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
  .wtn-cta__eyebrow {
    display: inline-block;
    background: ${FQ.MEADOW_GOLD}; color: ${FQ.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 18px;
  }
  .wtn-faq-cta h2 {
    font-family: Georgia, serif; font-size: clamp(28px, 3.6vw, 44px);
    color: ${FQ.CREAM}; margin: 0 0 12px; line-height: 1.15;
  }
  .wtn-faq-cta p { color: ${FQ.CREAM}; opacity: 0.82; font-size: 15.5px; line-height: 1.6; margin: 0 0 26px; }

  @media (max-width: 900px) {
    .wtn-section { padding: 48px 20px 60px; }
    .wtn-faq-hero { padding: 60px 20px 28px; }
    .wtn-faq-cta { padding: 60px 20px; }
    .wtn-faq__q { padding: 18px 18px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wtn-faqp .wtn-reveal, .wtn-faqp .wtn-reveal-group > * { transition: none; }
  }
`;
// ===== NEW REDESIGN — WAVE THEME — END =====

export default Faq;
