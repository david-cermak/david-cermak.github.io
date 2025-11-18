import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPostBySlug, posts } from './content/posts';

import './App.css';

function formatDate(dateString?: string) {
  if (!dateString) {
    return null;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

function App() {
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug ?? '');

  const selectedPost = useMemo(
    () => getPostBySlug(selectedSlug),
    [selectedSlug],
  );

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">ESP32 publishing lab</p>
        <h1>Field notes, published from markdown.</h1>
        <p className="hero-subtitle">
          Write posts in <code>src/blog/</code>, preview locally, and ship
          everything to GitHub Pages with a single push.
        </p>
      </header>
      <main className="layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Articles</h2>
            <p>{posts.length} ready to publish</p>
          </div>
          <ul>
            {posts.map((post) => {
              const isActive = post.slug === selectedSlug;

              return (
                <li key={post.slug}>
                  <button
                    className={isActive ? 'post-chip active' : 'post-chip'}
                    onClick={() => setSelectedSlug(post.slug)}
                    aria-pressed={isActive}
                  >
                    <span className="chip-title">{post.title}</span>
                    {post.publishedAt && (
                      <span className="chip-date">
                        {formatDate(post.publishedAt)}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
        <section className="article-area">
          {selectedPost ? (
            <article>
              <p className="post-meta">
                {selectedPost.publishedAt
                  ? formatDate(selectedPost.publishedAt)
                  : 'Draft'}
              </p>
              <h1>{selectedPost.title}</h1>
              {selectedPost.description && (
                <p className="post-description">{selectedPost.description}</p>
              )}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img(props) {
                    return <img loading="lazy" {...props} />;
                  },
                  a(props) {
                    return (
                      <a {...props} target="_blank" rel="noreferrer">
                        {props.children}
                      </a>
                    );
                  },
                }}
              >
                {selectedPost.body}
              </ReactMarkdown>
            </article>
          ) : (
            <div className="empty-state">
              <p>Select an article from the list to start reading.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
