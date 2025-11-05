import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../utils/blogData';
import './Blog.css';
// import BlogDetail from './pages/BlogDetail';

function Blog() {
  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-title">Our Blog</h1>
        <p className="blog-subtitle">
          Stories, recipes, and insights from the Himalayas
        </p>
      </div>

      <div className="blog-grid">
        {BLOG_POSTS.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="blog-cta">
        <h2>Want to Stay Updated?</h2>
        <p>Subscribe to our newsletter for the latest posts, recipes, and exclusive offers</p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
          />
          <button className="btn btn--primary">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="blog-card">
      <div className="blog-card__image">
        <img src={post.image} alt={post.title} />
        <span className="blog-card__category">{post.category}</span>
      </div>
      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <span className="blog-card__link">
          Read More →
        </span>
      </div>
    </Link>
  );
}

export default Blog;
