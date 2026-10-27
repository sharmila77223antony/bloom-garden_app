
import { useEffect, useState } from "react";
import {
  getBlogs,
  getBlogById,
  getBlogImage,
} from "../services/api";
import "./Blog.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadBlogs() {
      try {
        setLoading(true);
        setError("");

        const data = await getBlogs();

        if (active) {
          setBlogs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);

        if (active) {
          setError(err.message || "Unable to load blog posts.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadBlogs();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedBlog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedBlog(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedBlog]);

  function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async function openBlog(blog) {
    setSelectedBlog(blog);
    setDetailLoading(Boolean(blog.id));

    if (!blog.id) return;

    try {
      const fullBlog = await getBlogById(blog.id);

      setSelectedBlog((current) =>
        current?.id === blog.id ? fullBlog : current
      );
    } catch (err) {
      console.error("Could not load blog details:", err);
    } finally {
      setDetailLoading(false);
    }
  }

  function closeBlog() {
    setSelectedBlog(null);
    setDetailLoading(false);
  }

  return (
    <main className="bloom-blog-page">
      {/* BLOG INTRODUCTION */}
      <section className="blog-hero">
        <div className="blog-hero-glow" aria-hidden="true" />

        <span className="blog-decoration blog-decoration-one" aria-hidden="true">
          ✧
        </span>
        <span className="blog-decoration blog-decoration-two" aria-hidden="true">
          ✦
        </span>
        <span className="blog-decoration blog-decoration-three" aria-hidden="true">
          ✧
        </span>

        <div className="blog-hero-content">
          <p className="blog-overline">GARDENING · INSPIRATION · NATURE</p>

          <h1>
            Ideas to help
            <br />
            your garden <span className="blog-gold-italic">grow.</span>
          </h1>

          <p className="blog-hero-description">
            Discover practical gardening tips, learn about beautiful
            plants, and find inspiration for bringing more nature
            into your everyday life.
          </p>

          <a className="blog-button" href="#latest-posts">
            Explore latest posts
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* BLOG POSTS */}
      <section className="blog-list-section" id="latest-posts">
        <div className="blog-section-shell">
          <div className="blog-section-heading">
            <div>
              <p className="blog-overline">FRESH FROM THE GARDEN</p>

              <h2>Latest blog posts</h2>

              <p className="blog-section-description">
                Helpful advice, fresh ideas, and little discoveries
                for every plant lover.
              </p>
            </div>

            {!loading && !error && (
              <span className="blog-count">
                <strong>{blogs.length.toString().padStart(2, "0")}</strong>
                {blogs.length === 1 ? "POST" : "POSTS"}
              </span>
            )}
          </div>

          {loading && (
            <div className="blog-state" role="status">
              <span className="blog-spinner" />
              <p>Loading the latest blog posts...</p>
            </div>
          )}

          {!loading && error && (
            <div className="blog-state blog-state-error" role="alert">
              <span className="blog-state-icon" aria-hidden="true">✧</span>
              <h3>We couldn't load the blog posts.</h3>
              <p>{error}</p>

              <button
                type="button"
                className="blog-button"
                onClick={() => window.location.reload()}
              >
                Try again <span aria-hidden="true">↗</span>
              </button>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="blog-state">
              <span className="blog-state-icon" aria-hidden="true">✿</span>
              <h3>No blog posts yet</h3>
              <p>
                Published posts will appear here once they are
                available in your Django admin dashboard.
              </p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="blog-grid">
              {blogs.map((blog, index) => {
                const image = getBlogImage(blog);
                const description = blog.description || "";

                return (
                  <article
                    className="blog-card"
                    key={blog.id || `${blog.title}-${index}`}
                    style={{ "--card-index": index }}
                  >
                    <button
                      type="button"
                      className="blog-card-open"
                      onClick={() => openBlog(blog)}
                      aria-label={`Read ${blog.title || "blog post"}`}
                    >
                      <div className="blog-card-image">
                        {image ? (
                          <img
                            src={image}
                            alt={blog.title || "Blog post image"}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.visibility = "hidden";
                            }}
                          />
                        ) : (
                          <div className="blog-image-placeholder">
                            <span aria-hidden="true">✿</span>
                            <p>GARDEN NOTES</p>
                          </div>
                        )}

                        <span className="blog-image-label">
                          GARDEN NOTES
                        </span>
                      </div>

                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          {blog.created_at ? (
                            <time dateTime={blog.created_at}>
                              {formatDate(blog.created_at)}
                            </time>
                          ) : (
                            <span>GARDEN JOURNAL</span>
                          )}

                          <span className="blog-card-flower" aria-hidden="true">
                            ✳
                          </span>
                        </div>

                        <h3>{blog.title || "Untitled blog post"}</h3>

                        <p className="blog-card-description">
                          {description
                            ? `${description.slice(0, 150)}${
                                description.length > 150 ? "…" : ""
                              }`
                            : "Read this post to discover more gardening inspiration."}
                        </p>

                        <span className="blog-read-more">
                          Read full post
                          <span aria-hidden="true">↗</span>
                        </span>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}

          <div className="blog-footer-note">
            <span aria-hidden="true">✳</span>
            <p>Grow something beautiful every day.</p>
            <span aria-hidden="true">✳</span>
          </div>
        </div>
      </section>

      {/* FULL BLOG POST */}
      {selectedBlog && (
        <div
          className="blog-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeBlog();
          }}
        >
          <section
            className="blog-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
          >
            <button
              type="button"
              className="blog-modal-close"
              onClick={closeBlog}
              aria-label="Close blog post"
            >
              ×
            </button>

            <div className="blog-modal-scroll">
              {getBlogImage(selectedBlog) && (
                <div className="blog-modal-image-frame">
                  <img
                    className="blog-modal-image"
                    src={getBlogImage(selectedBlog)}
                    alt={selectedBlog.title || "Blog post image"}
                  />
                </div>
              )}

              <div className="blog-modal-content">
                <p className="blog-overline">FROM THE BLOG</p>

                {selectedBlog.created_at && (
                  <time dateTime={selectedBlog.created_at}>
                    {formatDate(selectedBlog.created_at)}
                  </time>
                )}

                <h2 id="blog-modal-title">
                  {selectedBlog.title || "Untitled blog post"}
                </h2>

                <div className="blog-modal-divider" aria-hidden="true">
                  <span />✳<span />
                </div>

                {detailLoading ? (
                  <div className="blog-detail-loading" role="status">
                    <span className="blog-spinner" />
                    <p>Loading the complete post...</p>
                  </div>
                ) : (
                  <p className="blog-full-description">
                    {selectedBlog.description ||
                      "No description is available for this post."}
                  </p>
                )}

                <div className="blog-modal-signoff">
                  <span aria-hidden="true">✿</span>
                  <p>Happy gardening!</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
