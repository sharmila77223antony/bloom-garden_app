
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Flower2,
  Play,
  X,
  Sparkles,
} from "lucide-react";

function GlassFlower({ className = "" }) {
  return (
    <div className={`glass-flower ${className}`} aria-label="Glowing glass flower">
      <div className="flower-halo" />

      <div className="petal-assembly">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            className="petal"
            key={index}
            style={{ "--petal-index": index }}
          >
            <div className="petal-highlight" />
          </div>
        ))}

        <div className="flower-center">
          <div className="flower-center-core" />
          {Array.from({ length: 12 }, (_, index) => (
            <span
              className="stamen"
              key={index}
              style={{ "--stamen-index": index }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    x: (index * 37 + 11) % 100,
    y: (index * 29 + 7) % 100,
    size: 2 + (index % 4),
    duration: 5 + (index % 7),
    delay: -(index % 8),
  }));

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            "--x": `${particle.x}%`,
            "--y": `${particle.y}%`,
            "--size": `${particle.size}px`,
            "--duration": `${particle.duration}s`,
            "--delay": `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [magicOpen, setMagicOpen] = useState(false);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <Particles />

        <div className="hero-moon" aria-hidden="true" />
        <div className="light-beam beam-one" aria-hidden="true" />
        <div className="light-beam beam-two" aria-hidden="true" />

        <div className="hero-content">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <Sparkles size={14} />
              <span>A LITTLE WORLD OF WONDER</span>
            </div>

            <h1 className="hero-title">
              Where magic
              <br />
              <span className="title-gradient">comes to bloom.</span>
            </h1>

            <p className="hero-subtitle">
              An Enchanted Glass Garden
            </p>

            <p className="hero-description">
              Step into a dreamy world where delicate glass flowers
              bloom, luminous petals dance with the wind, and every
              little moment feels like magic.
            </p>

            <div className="hero-actions">
              <a href="#discover" className="button-primary">
                Explore the Garden
                <ArrowRight size={18} />
              </a>

              <button
                className="button-watch"
                onClick={() => setMagicOpen(true)}
              >
                <span className="play-circle">
                  <Play size={15} fill="currentColor" />
                </span>
                <span>Watch the magic</span>
              </button>
            </div>

            <div className="hero-note">
              <span className="note-dot" />
              <span>A quiet place for your imagination</span>
            </div>
          </motion.div>

          <motion.div
            className="flower-stage"
            initial={{ opacity: 0, scale: 0.78, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stage-orbit orbit-a" />
            <div className="stage-orbit orbit-b" />
            <div className="stage-orbit orbit-c" />

            <div className="floating-label label-top">
              <span className="label-sparkle">✧</span>
              <span>Petals of light</span>
            </div>

            <GlassFlower />

            <div className="mini-flower mini-flower-one">
              <GlassFlower />
            </div>

            <div className="mini-flower mini-flower-two">
              <GlassFlower />
            </div>

            <div className="floating-label label-bottom">
              <span className="label-dot" />
              <span>Blooming in wonder</span>
            </div>

            <div className="glass-platform">
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        </div>

        <a className="scroll-cue" href="#discover">
          <span>SCROLL TO DISCOVER</span>
          <span className="scroll-line">
            <ArrowDown size={14} />
          </span>
        </a>

        <div className="hero-bottom-glow" aria-hidden="true" />
      </section>

      <section className="discover-section" id="discover">
        <div className="section-heading">
          <span className="section-kicker">A WORLD BEYOND ORDINARY</span>
          <h2>
            Every petal holds
            <br />
            <span>a little wonder.</span>
          </h2>
          <p>
            Wander through a garden shaped by light, color,
            imagination, and the delicate beauty of glass.
          </p>
        </div>

        
<div className="preview-grid">
  {/* Glass Flowers */}
  <motion.div
    className="preview-card card-flower"
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Link to="/flower" className="preview-card-link">
      <div className="preview-art">
        <GlassFlower className="preview-flower" />
        <span className="preview-number">01 / COLLECTION</span>
      </div>

      <div className="preview-info">
        <div>
          <h3>The Glass Flowers</h3>
          <p>Little sculptures made of light</p>
        </div>
        <ArrowRight size={20} />
      </div>
    </Link>
  </motion.div>

  {/* Seasons of Bloom */}
  <motion.div
    className="preview-card card-season"
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Link to="/season" className="preview-card-link">
      <div className="preview-art">
        <div className="season-sun" />
        <div className="season-ring" />
        <div className="season-petal" />
        <span className="preview-number">02 / ATMOSPHERE</span>
      </div>

      <div className="preview-info">
        <div>
          <h3>Seasons of Bloom</h3>
          <p>Four moods, one magical world</p>
        </div>
        <ArrowRight size={20} />
      </div>
    </Link>
  </motion.div>

  {/* Dream Gallery */}
  <motion.div
    className="preview-card card-gallery"
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Link to="/gallery" className="preview-card-link">
      <div className="preview-art">
        <div className="gallery-glass glass-one" />
        <div className="gallery-glass glass-two" />
        <div className="gallery-glass glass-three" />
        <span className="preview-number">03 / VISUAL JOURNAL</span>
      </div>

      <div className="preview-info">
        <div>
          <h3>The Dream Gallery</h3>
          <p>Collected moments of beauty</p>
        </div>
        <ArrowRight size={20} />
      </div>
    </Link>
  </motion.div>
</div>


        <div className="discover-bottom">
          <Flower2 size={18} />
          <span>Take your time. The garden is not going anywhere.</span>
          <span className="bottom-sparkle">✦</span>
        </div>
      </section>

      <AnimatePresence>
        {magicOpen && (
          <motion.div
            className="magic-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMagicOpen(false)}
          >
            <motion.div
              className="magic-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="magic-title"
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="dialog-close"
                onClick={() => setMagicOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <GlassFlower className="dialog-flower" />

              <span className="section-kicker">A MOMENT OF STILLNESS</span>
              <h2 id="magic-title">Let the garden breathe.</h2>
              <p>
                Watch the glass petals turn, follow the drifting
                lights, and let this little digital garden unfold.
              </p>

              <button
                className="button-primary"
                onClick={() => setMagicOpen(false)}
              >
                Return to the Garden
                <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
