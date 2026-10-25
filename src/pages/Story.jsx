
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import "./Story.css";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const values = [
  {
    icon: "✿",
    title: "Nature First",
    description:
      "Every creation begins with the delicate shapes, colors, and rhythms of nature.",
  },
  {
    icon: "♡",
    title: "Timeless Creations",
    description:
      "We celebrate beauty that stays meaningful long after the moment has passed.",
  },
  {
    icon: "✧",
    title: "Art with Emotion",
    description:
      "Every bloom represents a feeling, a memory, or a story worth keeping.",
  },
  {
    icon: "❋",
    title: "A Greener Tomorrow",
    description:
      "We believe thoughtful creativity and a kinder relationship with nature belong together.",
  },
];

const milestones = [
  {
    year: "2020",
    title: "A Small Beginning",
    description: "A simple dream to preserve the beauty of flowers in a new form.",
    symbol: "✿",
  },
  {
    year: "2021",
    title: "The First Creation",
    description: "An idea began to blossom into a world of colorful botanical art.",
    symbol: "❀",
  },
  {
    year: "2023",
    title: "A Growing Garden",
    description: "More shapes, more colors, and more stories found their place.",
    symbol: "✾",
  },
  {
    year: "2024",
    title: "Beyond the Bloom",
    description: "The journey continues with new ideas and everlasting inspiration.",
    symbol: "✧",
  },
];

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

function GlassFlower({ className = "" }) {
  return (
    <svg
      className={`story-flower-art ${className}`}
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="An elegant golden glass flower"
    >
      <defs>
        <linearGradient id="storyPetal" x1="65" y1="55" x2="245" y2="290">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset="35%" stopColor="#FFF449" stopOpacity=".6" />
          <stop offset="70%" stopColor="#E9A51B" stopOpacity=".25" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="storyStem" x1="160" y1="160" x2="160" y2="340">
          <stop stopColor="#FFF449" />
          <stop offset="1" stopColor="#9B7411" />
        </linearGradient>
        <radialGradient id="storyCenter">
          <stop stopColor="#FFFDE2" />
          <stop offset=".55" stopColor="#FFF449" />
          <stop offset="1" stopColor="#C78B0B" />
        </radialGradient>
        <filter id="storyGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="story-flower-petals" filter="url(#storyGlow)">
        {Array.from({ length: 12 }, (_, index) => (
          <ellipse
            key={index}
            cx="160"
            cy="105"
            rx={index % 2 === 0 ? "24" : "20"}
            ry={index % 2 === 0 ? "72" : "61"}
            transform={`rotate(${index * 30} 160 160)`}
            fill="url(#storyPetal)"
            stroke="#E8B72D"
            strokeWidth=".9"
            strokeOpacity=".9"
          />
        ))}
      </g>

      <g className="story-flower-inner">
        {Array.from({ length: 8 }, (_, index) => (
          <ellipse
            key={index}
            cx="160"
            cy="120"
            rx="14"
            ry="48"
            transform={`rotate(${index * 45} 160 160)`}
            fill="url(#storyPetal)"
            stroke="#FFFFFF"
            strokeWidth="1.4"
          />
        ))}
      </g>

      <circle
        cx="160"
        cy="160"
        r="27"
        fill="url(#storyCenter)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <circle cx="160" cy="160" r="12" fill="#FFFDE8" opacity=".9" />

      <path
        d="M160 185 C155 235 171 277 157 340"
        stroke="url(#storyStem)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M160 258 C126 222 94 239 88 270 C120 278 145 272 160 258Z"
        fill="url(#storyPetal)"
        stroke="#D6A71D"
        strokeWidth="1.2"
      />

      <path
        d="M161 302 C189 265 220 276 227 305 C202 318 180 315 161 302Z"
        fill="url(#storyPetal)"
        stroke="#D6A71D"
        strokeWidth="1.2"
      />

      <path
        d="M160 258 Q125 250 100 264 M161 302 Q196 291 215 300"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity=".95"
      />

      <g className="story-flower-sparkles" fill="#FFF449">
        <path d="M55 100 L59 112 L71 116 L59 120 L55 132 L51 120 L39 116 L51 112Z" />
        <path d="M260 172 L263 181 L272 184 L263 187 L260 196 L257 187 L248 184 L257 181Z" />
        <circle cx="238" cy="87" r="3" />
        <circle cx="79" cy="203" r="2.5" />
        <circle cx="219" cy="235" r="2" />
      </g>
    </svg>
  );
}

export default function Story() {
  return (
    <main className="story-page">
      {/* HERO */}
      <section className="story-hero">
        <div className="story-hero-glow" />
        <div className="story-hero-botanical story-hero-botanical-left">
          <GlassFlower />
        </div>
        <div className="story-hero-botanical story-hero-botanical-right">
          <GlassFlower />
        </div>

        <motion.div
          className="story-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="story-eyebrow story-hero-eyebrow">
            OUR STORY
            </span>

          <h1>
            A Garden
            <br />
            That Never <em>Fades.</em>
          </h1>

          <p>
            Every flower has a story. Every color holds a feeling.
            Welcome to a garden where nature and imagination bloom together.
          </p>

          <a href="#our-beginning" className="story-button">
            Discover Our Story <span>↘</span>
          </a>
        </motion.div>

        <span className="story-hero-sparkle sparkle-one">✧</span>
        <span className="story-hero-sparkle sparkle-two">✦</span>
        <span className="story-hero-sparkle sparkle-three">✧</span>
      </section>

      {/* ORIGIN */}
      <section className="story-origin section-shell" id="our-beginning">
        <Reveal className="story-origin-copy">
          <span className="story-eyebrow">OUR BEGINNING</span>
          <h2>
            Where Nature
            <br />
            Meets <em>Imagination.</em>
          </h2>

          <p>
            BLOOM began with a simple thought: what if the beauty of a flower
            could inspire us every day? From the soft curve of a petal to the
            glow of sunlight on a leaf, nature has a way of turning ordinary
            moments into something extraordinary.
          </p>

          <p>
            This is a celebration of color, creativity, and the little details
            that make the world beautiful. Our garden is a place to slow down,
            explore, and discover your own meaning in every bloom.
          </p>

          <Link to="/gallery" className="story-button">
            Explore the Garden <span>↗</span>
          </Link>
        </Reveal>

        <Reveal className="story-origin-art">
          <div className="story-art-orbit orbit-one" />
          <div className="story-art-orbit orbit-two" />
          <div className="story-art-frame">
            <div className="story-art-caption">
              <span>01 /</span> THE FIRST BLOOM
            </div>
            <GlassFlower />
          </div>
          <span className="story-art-star star-a">✦</span>
          <span className="story-art-star star-b">✧</span>
        </Reveal>

        <Reveal className="story-origin-highlights">
          <article className="story-highlight">
            <div className="story-highlight-icon">❋</div>
            <div>
              <h3>Inspired by Nature</h3>
              <p>
                Botanical forms and seasonal colors inspire every part of
                our enchanted world.
              </p>
            </div>
          </article>

          <article className="story-highlight">
            <div className="story-highlight-icon">✧</div>
            <div>
              <h3>Made with Imagination</h3>
              <p>
                We bring natural beauty to life through artistic details,
                light, and color.
              </p>
            </div>
          </article>

          <article className="story-highlight">
            <div className="story-highlight-icon">♡</div>
            <div>
              <h3>Created to Inspire</h3>
              <p>
                Every bloom is an invitation to find beauty in a new way
                and create a memory of your own.
              </p>
            </div>
          </article>
        </Reveal>
      </section>

      {/* QUOTE */}
      <section className="story-quote-section">
        <div className="story-quote-image">
          <div className="story-quote-image-glow" />
          <GlassFlower />
          <span className="story-image-label">A LITTLE MAGIC, IN EVERY PETAL</span>
        </div>

        <Reveal className="story-quote-copy">
          <span className="story-eyebrow">A NOTE FROM THE GARDEN</span>
          <div className="story-quote-mark">“</div>
          <blockquote>
            Flowers remind us that even the smallest things can hold the
            <em> most beautiful magic.</em>
          </blockquote>
          <p>
            In every bloom, we find a reason to pause, to wonder, and to
            appreciate the beauty growing around us. That is the feeling
            we hope you carry with you through BLOOM.
          </p>
          <div className="story-signature">
            <span />
            <span>With love, the BLOOM garden</span>
          </div>
        </Reveal>
      </section>

      {/* VALUES */}
      <section className="story-values section-shell">
        <Reveal className="story-section-heading">
          <span className="story-eyebrow">WHAT WE BELIEVE</span>
          <h2>
            Rooted in Beauty,
            <br className="story-mobile-break" /> Guided by <em>Meaning.</em>
          </h2>
          <p>
            The little principles that help our garden grow.
          </p>
        </Reveal>

        <div className="story-values-grid">
          {values.map((value, index) => (
            <Reveal key={value.title} className="story-value-wrap">
              <motion.article
                className="story-value-card"
                whileHover={{ y: -7 }}
                transition={{ duration: 0.25 }}
              >
                <div className="story-value-number">
                  0{index + 1}
                </div>
                <div className="story-value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div className="story-value-line" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="story-journey">
        <div className="story-journey-glow" />

        <Reveal className="story-section-heading">
          <span className="story-eyebrow">OUR JOURNEY</span>
          <h2>
            From a Dream to a <em>Blooming</em> World.
          </h2>
          <p>
            Every garden grows one little moment at a time.
          </p>
        </Reveal>

        <div className="story-timeline section-shell">
          <div className="story-timeline-line" />

          {milestones.map((item, index) => (
            <Reveal key={item.year} className="story-timeline-item">
              <div className="story-timeline-marker">
                <span>{item.symbol}</span>
              </div>

              <div className="story-timeline-card">
                <span className="story-timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="story-cta">
        <div className="story-cta-decoration decoration-left">✿</div>
        <div className="story-cta-decoration decoration-right">✧</div>

        <Reveal className="story-cta-content">
          <span className="story-eyebrow">YOUR STORY STARTS HERE</span>
          <h2>
            Come Find Your
            <br />
            <em>Little Piece of Magic.</em>
          </h2>
          <p>
            Wander through the colors, discover your favorite blooms,
            and let your imagination take root.
          </p>

          <div className="story-cta-actions">
            <Link to="/gallery" className="story-button">
              Explore the Gallery <span>↗</span>
            </Link>
            <Link to="/season" className="story-secondary-link">
              Discover the Seasons <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
