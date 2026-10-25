
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Season.css";

const seasons = [
  {
    id: "spring",
    number: "01",
    name: "Spring",
    tagline: "New beginnings",
    description: "Delicate blossoms and fresh colors mark the start of a brighter chapter.",
    longDescription:
      "Spring celebrates renewal, gentle mornings, and the first flowers opening to the light. This collection combines translucent pink petals, soft peach tones, and delicate golden details.",
    symbol: "✿",
    colors: ["#ff9cae", "#ffb6c1", "#ffd1c1", "#ffe4d7"],
    background: "spring",
    mood: "Hope & renewal",
    care: "Keep in soft, natural light.",
  },
  {
    id: "summer",
    number: "02",
    name: "Summer",
    tagline: "Vibrant energy",
    description: "Bold blooms, warm sunlight, and endless inspiration.",
    longDescription:
      "Inspired by golden afternoons, summer brings glowing yellow glass, lively orange reflections, and flowers that seem to hold sunlight inside every petal.",
    symbol: "✺",
    colors: ["#ffd24a", "#ffab24", "#ffe080", "#fff0ad"],
    background: "summer",
    mood: "Joy & abundance",
    care: "Display in bright, indirect light.",
  },
  {
    id: "autumn",
    number: "03",
    name: "Autumn",
    tagline: "Golden harmony",
    description: "Rich tones and graceful transitions celebrate the beauty of change.",
    longDescription:
      "Autumn is a celebration of transformation. Amber, copper, and burnt-orange glass capture the warmth of falling leaves and the peaceful glow of the evening sun.",
    symbol: "❋",
    colors: ["#ed6b26", "#f58b43", "#ffb46d", "#dca16c"],
    background: "autumn",
    mood: "Warmth & change",
    care: "Keep away from extreme heat.",
  },
  {
    id: "winter",
    number: "04",
    name: "Winter",
    tagline: "Serene magic",
    description: "Pure shades and luminous details bring a quiet kind of wonder.",
    longDescription:
      "Winter explores the stillness of frosted mornings through icy blue petals, crystal-like highlights, and cool lavender reflections that feel calm and luminous.",
    symbol: "❄",
    colors: ["#8dc9ff", "#b8a7ff", "#d9e7ff", "#a9caff"],
    background: "winter",
    mood: "Peace & clarity",
    care: "Avoid sudden temperature changes.",
  },
];

const blooms = [
  { name: "Cherry Blossom", season: "spring", symbol: "✿", description: "A delicate pink glass blossom." },
  { name: "Sunflower Glow", season: "summer", symbol: "✺", description: "A golden bloom filled with sunshine." },
  { name: "Maple Lily", season: "autumn", symbol: "❋", description: "Warm amber petals with a copper glow." },
  { name: "Crystal Snowdrop", season: "winter", symbol: "❄", description: "A cool blue flower inspired by frost." },
  { name: "Peach Petal", season: "spring", symbol: "❀", description: "Soft peach glass with rosy highlights." },
  { name: "Golden Cosmos", season: "summer", symbol: "✿", description: "A bright, luminous summer flower." },
  { name: "Amber Dahlia", season: "autumn", symbol: "✺", description: "Layered petals in rich amber tones." },
  { name: "Bluebell Frost", season: "winter", symbol: "❋", description: "An icy bloom with a serene blue finish." },
  
];

const seasonName = (id) =>
  seasons.find((season) => season.id === id)?.name ?? id;


function GlassBloom({ season, small = false, variant = "" }) {
  const shapeByName = {
    "Cherry Blossom": "cherry",
    "Sunflower Glow": "sunflower",
    "Maple Lily": "maple",
    "Crystal Snowdrop": "snowdrop",
    "Peach Petal": "magnolia",
    "Golden Cosmos": "marigold",
    "Amber Dahlia": "dahlia",
    "Bluebell Frost": "star",
  };

  const shape = shapeByName[variant] || {
    spring: "cherry",
    summer: "sunflower",
    autumn: "dahlia",
    winter: "star",
  }[season];

  const isTree = shape === "tree";

  return (
    <div
      className={`season-bloom-art bloom-${season} shape-${shape} ${
        small ? "bloom-small" : ""
      }`}
      aria-hidden="true"
    >
      <div className="bloom-orbit orbit-one" />
      <div className="bloom-orbit orbit-two" />

      {!isTree && (
        <>
          <div className="bloom-stem" />
          <div className="bloom-leaf leaf-one" />
          <div className="bloom-leaf leaf-two" />
        </>
      )}

      {isTree ? (
        <div className="glass-tree">
          <span className="tree-layer tree-layer-one" />
          <span className="tree-layer tree-layer-two" />
          <span className="tree-layer tree-layer-three" />
          <span className="tree-trunk" />
          <span className="tree-star">✦</span>
          <span className="tree-ornament ornament-one" />
          <span className="tree-ornament ornament-two" />
          <span className="tree-ornament ornament-three" />
        </div>
      ) : (
        <div className="bloom-petals">
          {Array.from({ length: shape === "star" ? 6 : shape === "sunflower" ? 16 : shape === "marigold" ? 12 : 8 }, (_, index) => (
            <span
              className="bloom-petal"
              key={index}
              style={{ "--petal-index": index }}
            />
          ))}

          {shape === "sunflower" && <span className="sunflower-seeds" />}
          {shape === "marigold" && <span className="marigold-center" />}
          {shape === "maple" && <span className="maple-center">✦</span>}
          {shape === "snowdrop" && <span className="snowdrop-center" />}
          {shape === "star" && <span className="star-center">✧</span>}
          {shape !== "sunflower" &&
            shape !== "marigold" &&
            shape !== "maple" &&
            shape !== "snowdrop" &&
            shape !== "star" && <span className="bloom-center" />}
        </div>
      )}

      <span className="bloom-sparkle sparkle-one">✦</span>
      <span className="bloom-sparkle sparkle-two">✧</span>
      <span className="bloom-sparkle sparkle-three">·</span>
    </div>
  );
}


export default function Season() {
    const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBloom, setSelectedBloom] = useState(null);
  const [savedBlooms, setSavedBlooms] = useState([]);

  const filteredBlooms =
    activeFilter === "all"
      ? blooms
      : blooms.filter((bloom) => bloom.season === activeFilter);

  const selectedSeason = selectedBloom
    ? seasons.find((season) => season.id === selectedBloom.season)
    : null;

  const toggleSaved = (name) => {
    setSavedBlooms((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  return (
    <main className="season-page">
      <div className="season-ambient ambient-one" />
      <div className="season-ambient ambient-two" />

      <section className="season-hero">
        <motion.div
          className="season-hero-flower hero-flower-left"
          initial={{ opacity: 0, x: -35, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.1 }}
        >
          <GlassBloom season="spring" />
        </motion.div>

        <motion.div
          className="season-hero-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="season-eyebrow">
            <span />
            THE SEASONS COLLECTION
            <span />
          </div>

          <h1>
            Seasons of <em>Bloom</em>
          </h1>

          <p className="season-hero-subtitle">
            Four moods, one magical world
          </p>
          <p className="season-hero-description">
            Discover how every season brings a unique color, light, and story to life.
          </p>

          <a className="season-explore-button" href="#season-collection">
            Explore the collection <span>↓</span>
          </a>
        </motion.div>

        <motion.div
          className="season-hero-flower hero-flower-right"
          initial={{ opacity: 0, x: 35, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
        >
          <GlassBloom season="summer" />
        </motion.div>
      </section>

      <section
        className="season-collection"
        id="season-collection"
        aria-label="Four seasons"
      >
        <div className="season-card-grid">
          {seasons.map((season, index) => (
            <motion.button
              type="button"
              className={`season-card season-card-${season.background}`}
              key={season.id}
              onClick={() => setSelectedBloom({
                name: `${season.name} Collection`,
                season: season.id,
                description: season.longDescription,
              })}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <span className="season-card-number">
                {season.number} / {season.name.toUpperCase()}
              </span>

              <GlassBloom season={season.id} />

              <div className="season-card-content">
                <h2>{season.name}</h2>
                <span className="season-card-tagline">
                  {season.tagline}
                </span>
                <p>{season.description}</p>

                <div className="season-card-bottom">
                  <div className="season-swatches" aria-label="Season colors">
                    {season.colors.map((color) => (
                      <span
                        key={color}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span className="season-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="season-highlights">
        <div className="season-highlights-heading">
          <div className="season-highlights-copy">
            <div className="season-section-kicker">
              <span className="season-kicker-flower">✿</span>
              SEASONAL HIGHLIGHTS
            </div>
            <h2>Explore the <em>Blooms</em></h2>
            <p>
              Every season holds a special collection of glass flowers.
              Choose a bloom to discover its story.
            </p>
          </div>

          <div className="season-filter-list" aria-label="Filter flowers">
            {["all", ...seasons.map((season) => season.id)].map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter === "all" ? "All" : seasonName(filter)}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="season-bloom-grid">
          <AnimatePresence mode="popLayout">
            {filteredBlooms.map((bloom) => (
              <motion.button
                layout
                type="button"
                key={bloom.name}
                className={`season-bloom-card bloom-card-${bloom.season}`}
                onClick={() => setSelectedBloom(bloom)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.22 }}
                whileHover={{ y: -4 }}
              >
                <div className="season-bloom-card-art">
                  <GlassBloom
                        season={bloom.season}
                        variant={bloom.name}
                        small
                        />
                </div>
                <div className="season-bloom-card-caption">
                  <div>
                    <h3>{bloom.name}</h3>
                    <span>{seasonName(bloom.season).toUpperCase()}</span>
                  </div>
                  <span className="season-mini-arrow">↗</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="season-footer-note">
          <span>✦</span>
          <p>Every bloom has a season. Every season has a story.</p>
          <span>✦</span>
        </div>
      </section>

      <AnimatePresence>
        {selectedBloom && selectedSeason && (
          <motion.div
            className="season-modal-backdrop"
            onClick={() => setSelectedBloom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="season-modal-title"
              className={`season-detail-modal season-card-${selectedSeason.background}`}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.97 }}
            >
              <div className="season-modal-art">
                <GlassBloom
                    season={selectedSeason.id}
                    variant={selectedBloom.name.replace(" Collection", "")}
                    />
                <span className="season-modal-art-label">
                  {selectedSeason.name.toUpperCase()} COLLECTION
                </span>
              </div>

              <div className="season-modal-info">
                <button
                  type="button"
                  className="season-modal-close"
                  aria-label="Close details"
                  onClick={() => setSelectedBloom(null)}
                >
                  ×
                </button>

                <div className="season-section-kicker">
                  {selectedSeason.name.toUpperCase()} COLLECTION
                </div>
                <h2 id="season-modal-title">{selectedBloom.name}</h2>
                <p className="season-modal-tagline">
                  {selectedSeason.tagline}
                </p>
                <p className="season-modal-description">
                  {selectedBloom.description}
                </p>

                <div className="season-modal-palette">
                  <span>Color palette</span>
                  <div className="season-swatches">
                    {selectedSeason.colors.map((color) => (
                      <span
                        key={color}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="season-modal-facts">
                  <div><span>Season</span><strong>{selectedSeason.name}</strong></div>
                  <div><span>Meaning</span><strong>{selectedSeason.mood}</strong></div>
                  <div><span>Display</span><strong>Soft natural light</strong></div>
                  <div><span>Care</span><strong>{selectedSeason.care}</strong></div>
                </div>

                <button
                    type="button"
                    className="season-save-button"
                    onClick={() => setSelectedBloom(null)}
                    >
                    Return to Collection
                    <span>↗</span>
                    </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
