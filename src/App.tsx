import { isValidElement, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { getPostBySlug, posts } from './content/posts';
import { MermaidDiagram } from './components/MermaidDiagram';

import './App.css';

const DEFAULT_YEAR = '25';

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

type RouteParams = {
  year?: string;
  slug?: string;
};

function BlogPage() {
  const navigate = useNavigate();
  const { year, slug } = useParams<RouteParams>();
  const fallbackYear = year ?? DEFAULT_YEAR;
  
  const filteredPosts = useMemo(
    () => posts.filter((post) => post.year === fallbackYear),
    [fallbackYear],
  );
  
  const fallbackSlug = filteredPosts[0]?.slug ?? '';
  const selectedSlug = slug ?? fallbackSlug;

  const selectedPost = useMemo(
    () => getPostBySlug(selectedSlug),
    [selectedSlug],
  );

  const handleSelect = (nextSlug: string) => {
    navigate(`/${fallbackYear}/${nextSlug}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleYearChange = (newYear: string) => {
    const postsForYear = posts.filter((post) => post.year === newYear);
    const firstSlug = postsForYear[0]?.slug ?? '';
    navigate(`/${newYear}/${firstSlug}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Embedded publishing lab</p>
        <h1>David's field notes</h1>
      </header>
      <main className="layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Articles</h2>
            <p>{filteredPosts.length} ready to publish</p>
          </div>
          <div className="year-tabs">
            <button
              className={fallbackYear === '25' ? 'year-tab active' : 'year-tab'}
              onClick={() => handleYearChange('25')}
              aria-pressed={fallbackYear === '25'}
            >
              2025
            </button>
            <button
              className={fallbackYear === '26' ? 'year-tab active' : 'year-tab'}
              onClick={() => handleYearChange('26')}
              aria-pressed={fallbackYear === '26'}
            >
              2026
            </button>
          </div>
          <ul>
            {filteredPosts.map((post) => {
              const isActive = post.slug === selectedSlug;

              return (
                <li key={post.slug}>
                  <button
                    className={isActive ? 'post-chip active' : 'post-chip'}
                    onClick={() => handleSelect(post.slug)}
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
                  pre(props) {
                    if (
                      isValidElement(props.children) &&
                      props.children.type === 'code'
                    ) {
                      const codeChild = props.children as {
                        props: { className?: unknown; children?: unknown };
                      };
                      const className = String(codeChild.props.className ?? '');

                      if (className.includes('language-mermaid')) {
                        const chart = String(codeChild.props.children ?? '').trimEnd();
                        return <MermaidDiagram chart={chart} />;
                      }
                    }

                    return <pre {...props} />;
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_YEAR}`} replace />} />
      <Route path="/:year" element={<BlogPage />} />
      <Route path="/:year/:slug" element={<BlogPage />} />
      <Route path="*" element={<Navigate to={`/${DEFAULT_YEAR}`} replace />} />
    </Routes>
  );
}

export default App;
