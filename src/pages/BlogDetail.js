import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById, getRelatedPosts } from '../utils/blogData';
import './BlogDetail.css';

const W = {
  DEEP_FOREST:  '#03605C',
  INK:              '#655F59',
  SEAL_TERRACOTTA:  '#D76427',
  CREAM:            '#F8F3EB',
  MEADOW_GOLD:      '#B5882D',
  CREAM_SOFT:      '#F1E7CE',
  PAPER:           '#F8F3EB',
  DEEP_FOREST_DK:  '#024442',
  FOREST_SHADOW:   '#013532',
  GOLD_LINE:       '#B5882D',
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [W.CREAM_SOFT];
  const style = { transform: flip ? 'scaleY(-1)' : 'none', display: 'block', width: '100%', height };
  return (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" style={style}>
      <path d="M0,32 C220,4 460,72 720,36 C980,0 1220,60 1440,28 L1440,100 L0,100 Z"
            fill={layers[0]} opacity="0.95"/>
      {layers[1] && (
        <path d="M0,52 C260,28 480,80 780,52 C1060,26 1260,72 1440,48 L1440,100 L0,100 Z"
              fill={layers[1]} opacity="0.65"/>
      )}
      <path d="M0,34 C220,6 460,74 720,38 C980,2 1220,62 1440,30"
            stroke={W.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

const scopedStyles = `
  .bd, .bd * { box-sizing: border-box; }
  .bd {
    background: ${W.CREAM};
    color: ${W.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* ---------- NOT FOUND ---------- */
  .bd-nf {
    min-height: 60vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    background: ${W.CREAM};
    padding: 80px 24px;
    gap: 24px;
  }
  .bd-nf h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 40px);
    color: ${W.DEEP_FOREST_DK}; margin: 0;
  }

  /* ---------- HERO ---------- */
  .bd__hero {
    position: relative; background: ${W.CREAM};
    padding: 72px 28px 40px;
    text-align: center;
  }
  .bd__hero-inner { max-width: 780px; margin: 0 auto; }
  .bd__back {
    display: inline-flex; align-items: center; gap: 6px;
    color: ${W.DEEP_FOREST}; text-decoration: none;
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; margin-bottom: 22px;
    transition: color 180ms ease;
  }
  .bd__back:hover { color: ${W.SEAL_TERRACOTTA}; }
  .bd__category {
    display: inline-block;
    background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
    font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .bd__title {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(30px, 4.4vw, 52px);
    line-height: 1.1; margin: 18px 0 14px;
    color: ${W.DEEP_FOREST_DK};
    letter-spacing: -0.01em; font-weight: 700;
  }
  .bd__meta {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    flex-wrap: wrap;
    font-size: 12.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: ${W.MEADOW_GOLD};
    margin-top: 10px;
  }
  .bd__meta strong { color: ${W.DEEP_FOREST}; font-weight: 800; }
  .bd__meta-sep { opacity: 0.6; }

  /* ---------- ARTICLE IMAGE ---------- */
  .bd__image-wrap {
    max-width: 1080px; margin: 24px auto 0;
    padding: 0 28px;
    position: relative;
  }
  .bd__image {
    overflow: hidden;
    border: 1.5px solid rgba(3,96,92,0.18);
    aspect-ratio: 16/9;
  }
  .bd__image img { display: block; width: 100%; height: 100%; object-fit: cover; }

  /* ---------- ARTICLE BODY ---------- */
  .bd-body-band { background: ${W.PAPER}; }
  .bd-body {
    max-width: 760px; margin: 0 auto;
    padding: 64px 28px 40px;
    font-size: 17px; line-height: 1.8; color: ${W.INK};
  }
  .bd-body h1, .bd-body h2, .bd-body h3, .bd-body h4 {
    font-family: Georgia, "Iowan Old Style", serif;
    color: ${W.DEEP_FOREST_DK};
    margin: 32px 0 12px; line-height: 1.25; font-weight: 700;
  }
  .bd-body h1 { font-size: clamp(26px, 3vw, 34px); }
  .bd-body h2 { font-size: clamp(22px, 2.6vw, 28px); }
  .bd-body h3 { font-size: clamp(18px, 2.2vw, 22px); }
  .bd-body p { margin: 0 0 18px; }
  .bd-body a { color: ${W.SEAL_TERRACOTTA}; text-decoration: underline; }
  .bd-body a:hover { color: ${W.DEEP_FOREST}; }
  .bd-body ul, .bd-body ol { margin: 0 0 18px 22px; padding: 0; }
  .bd-body li { margin: 0 0 8px; }
  .bd-body blockquote {
    border-left: 3px solid ${W.MEADOW_GOLD};
    margin: 22px 0; padding: 8px 20px;
    color: ${W.DEEP_FOREST_DK};
    font-style: italic; background: ${W.CREAM_SOFT};
  }
  .bd-body img {
    display: block; max-width: 100%; height: auto;
    margin: 22px auto; border: 1px solid rgba(3,96,92,0.15);
  }
  .bd-body code {
    background: ${W.CREAM_SOFT}; padding: 2px 6px;
    font-size: 0.92em; border-radius: 2px;
  }

  /* ---------- ARTICLE FOOTER ---------- */
  .bd-footer {
    max-width: 760px; margin: 0 auto;
    padding: 0 28px 64px;
    display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  }
  .bd-footer strong {
    font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
    color: ${W.DEEP_FOREST}; font-weight: 800;
  }
  .bd-tag {
    display: inline-block;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }

  /* ---------- RELATED ---------- */
  .bd-related-band { background: ${W.CREAM_SOFT}; }
  .bd-related {
    max-width: 1240px; margin: 0 auto;
    padding: 72px 28px 88px;
  }
  .bd-related__head { text-align: center; margin-bottom: 34px; }
  .bd-related__eyebrow {
    display: inline-block;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .bd-related__title {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(24px, 3vw, 34px);
    color: ${W.DEEP_FOREST_DK};
    margin: 14px 0 0; font-weight: 700;
  }
  .bd-related__grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
  }
  .bd-related__card {
    background: ${W.CREAM};
    text-decoration: none; color: ${W.INK};
    border: 1px solid rgba(3,96,92,0.10);
    display: flex; flex-direction: column;
    overflow: hidden;
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  }
  .bd-related__card:hover {
    transform: translateY(-4px);
    border-color: ${W.MEADOW_GOLD};
    box-shadow: 0 12px 26px rgba(1,53,50,0.10);
  }
  .bd-related__img {
    aspect-ratio: 4/3; overflow: hidden; background: ${W.CREAM_SOFT};
  }
  .bd-related__img img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .bd-related__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 8px; }
  .bd-related__cat {
    font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; color: ${W.MEADOW_GOLD};
  }
  .bd-related__body h3 {
    margin: 0;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 17px; line-height: 1.3; color: ${W.DEEP_FOREST_DK};
    font-weight: 700;
  }
  .bd-related__body p {
    margin: 0; font-size: 13.5px; line-height: 1.6;
    color: ${W.INK}; opacity: 0.85;
  }

  /* ---------- BTN (used by not-found) ---------- */
  .bd-btn {
    display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none;
    padding: 14px 26px; font-size: 12.5px; letter-spacing: 0.24em;
    text-transform: uppercase; font-weight: 700;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border: 1.5px solid ${W.DEEP_FOREST};
    transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
  }
  .bd-btn:hover {
    background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA};
    transform: translateY(-1px);
  }

  /* ---------- REVEAL ---------- */
  .bd-reveal {
    opacity: 0; transform: translate3d(0, 28px, 0);
    transition: opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
                transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
  }
  .bd-reveal.is-inview { opacity: 1; transform: translate3d(0, 0, 0); }
  .bd-reveal-group > * {
    opacity: 0; transform: translate3d(0, 32px, 0) scale(0.96);
    transition: opacity 850ms cubic-bezier(0.22, 0.7, 0.2, 1),
                transform 850ms cubic-bezier(0.22, 0.7, 0.2, 1);
  }
  .bd-reveal-group.is-inview > * { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  .bd-reveal-group.is-inview > *:nth-child(1) { transition-delay:  60ms; }
  .bd-reveal-group.is-inview > *:nth-child(2) { transition-delay: 140ms; }
  .bd-reveal-group.is-inview > *:nth-child(3) { transition-delay: 220ms; }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 960px) {
    .bd-related__grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .bd__hero { padding: 48px 20px 24px; }
    .bd__image-wrap { padding: 0 20px; margin-top: 16px; }
    .bd-body { padding: 44px 22px 28px; font-size: 16px; }
    .bd-footer { padding: 0 22px 44px; }
    .bd-related { padding: 48px 20px 60px; }
    .bd-related__grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bd-reveal, .bd-reveal-group > * {
      opacity: 1 !important; transform: none !important;
      transition: none !important;
    }
  }
`;

function BlogDetail() {
  const { id } = useParams();
  const post = getBlogPostById(id);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.bd-reveal, .bd-reveal-group');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="bd">
        <style>{scopedStyles}</style>
        <div className="bd-nf">
          <h2>Blog post not found</h2>
          <Link to="/blog" className="bd-btn">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <div className="bd">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="bd__hero">
        <div className="bd__hero-inner">
          <Link to="/blog" className="bd__back">← Back to Blog</Link>
          <div><span className="bd__category">{post.category}</span></div>
          <h1 className="bd__title">{post.title}</h1>
          <div className="bd__meta">
            <span><strong>By</strong> {post.author}</span>
            <span className="bd__meta-sep">·</span>
            <span>{post.date}</span>
            <span className="bd__meta-sep">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ============ IMAGE ============ */}
      <div className="bd__image-wrap bd-reveal">
        <div className="bd__image">
          <img src={post.image} alt={post.title} />
        </div>
      </div>

      <WaveDivider height={60} palette={[W.PAPER]} />

      {/* ============ BODY ============ */}
      <section className="bd-body-band">
        <article
          className="bd-body bd-reveal"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="bd-footer">
          <strong>Category:</strong>
          <span className="bd-tag">{post.category}</span>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <>
          <WaveDivider height={70} palette={[W.CREAM_SOFT]} />
          <section className="bd-related-band">
            <div className="bd-related">
              <div className="bd-related__head">
                <span className="bd-related__eyebrow bd-reveal">Read Next</span>
                <h2 className="bd-related__title bd-reveal">Related articles</h2>
              </div>
              <div className="bd-related__grid bd-reveal-group">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} to={`/blog/${rp.id}`} className="bd-related__card">
                    <div className="bd-related__img">
                      <img src={rp.image} alt={rp.title} loading="lazy" />
                    </div>
                    <div className="bd-related__body">
                      <span className="bd-related__cat">{rp.category}</span>
                      <h3>{rp.title}</h3>
                      <p>{rp.excerpt.substring(0, 100)}...</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default BlogDetail;
