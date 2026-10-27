
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogById, getBlogImage } from "../services/api";
import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStory() {
      setLoading(true);
      setError("");
      setBlog(null);

      try {
        const result = await getBlogById(id);
        if (active) setBlog(result);
      } catch (err) {
        if (active) {
          setError("This story could not be loaded. Please try again.");
        }
        console.error("Blog detail API error:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStory();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <main className="bloom-detail-status">Loading story...</main>;
  }

  if (error || !blog) {
    return (
      <main className="bloom-detail-status">
        <h1>Story unavailable</h1>
        <p>{error || "This story could not be found."}</p>
        <Link to="/blog">← Back to BLOOM Journal</Link>
      </main>
    );
  }

  const image = getBlogImage(blog);

  return (
    <main className="bloom-detail-page">
      <Link className="bloom-detail-back" to="/blog">
        ← Back to the journal
      </Link>

      <article className="bloom-detail-article">
        {blog.created_at && (
          <time className="bloom-detail-date">
            {new Date(blog.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}

        <h1>{blog.title}</h1>

        {image && (
          <img className="bloom-detail-image" src={image} alt={blog.title} />
        )}

        <div className="bloom-detail-content">
          {blog.description}
        </div>
      </article>
    </main>
  );
}
