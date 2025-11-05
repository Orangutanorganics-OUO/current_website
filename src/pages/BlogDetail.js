import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById, getRelatedPosts } from '../utils/blogData';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const post = getBlogPostById(id);

  if (!post) {
    return (
      <div className="blog-not-found">
        <h2>Blog post not found</h2>
        <Link to="/blog" className="btn btn--primary">Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <div className="blog-detail">
      <div className="blog-detail__container">
        <Link to="/blog" className="back-link">← Back to Blog</Link>

        <article className="blog-article">
          <header className="article-header">
            <span className="article-category">{post.category}</span>
            <h1 className="article-title">{post.title}</h1>

            <div className="article-meta">
              <span className="meta-item">
                <strong>By</strong> {post.author}
              </span>
              <span className="meta-separator">•</span>
              <span className="meta-item">{post.date}</span>
              <span className="meta-separator">•</span>
              <span className="meta-item">{post.readTime}</span>
            </div>
          </header>

          <div className="article-image">
            <img src={post.image} alt={post.title} />
          </div>

          <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <footer className="article-footer">
            <div className="article-tags">
              <strong>Category:</strong> <span className="tag">{post.category}</span>
            </div>

            {/* <div className="article-share">
              <strong>Share:</strong>
              <div className="share-buttons">
                <button className="share-btn" title="Share on Facebook">FB</button>
                <button className="share-btn" title="Share on Twitter">TW</button>
                <button className="share-btn" title="Share on WhatsApp">WA</button>
              </div>
            </div> */}
          </footer>
        </article>

        {relatedPosts.length > 0 && (
          <section className="related-posts">
            <h2>Related Articles</h2>
            <div className="related-grid">
              {relatedPosts.map(relatedPost => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="related-card">
                  <div className="related-card__image">
                    <img src={relatedPost.image} alt={relatedPost.title} />
                  </div>
                  <div className="related-card__content">
                    <span className="related-category">{relatedPost.category}</span>
                    <h3>{relatedPost.title}</h3>
                    <p>{relatedPost.excerpt.substring(0, 100)}...</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
