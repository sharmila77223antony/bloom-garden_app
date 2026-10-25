
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Gallery.css";


const flowers = [
  {
    id: 1,
    name: "Ruby Velvet Rose",
    type: "Rose",
    category: "romantic",
    palette: ["#7C0E44", "#F70063", "#FFB1D0"],
    description: "Deep ruby glass petals with vivid pink travelling light.",
    meaning: "Love & devotion",
    shape: "rose",
  },
  {
    id: 2,
    name: "Golden Sunflower",
    type: "Sunflower",
    category: "bold",
    palette: ["#A85B00", "#FFC928", "#FFF7A8"],
    description: "Golden glass petals glowing with warm sunshine.",
    meaning: "Happiness & vitality",
    shape: "cosmos",
  },
  {
    id: 3,
    name: "Sunset Dahlia",
    type: "Dahlia",
    category: "bold",
    palette: ["#A92C12", "#FF572E", "#FFD09A"],
    description: "Layered fiery orange petals with glowing copper edges.",
    meaning: "Creativity & strength",
    shape: "dahlia",
  },
  {
    id: 4,
    name: "Ocean Glass Lotus",
    type: "Lotus",
    category: "ethereal",
    palette: ["#075B70", "#14C9D5", "#B6FFFF"],
    description: "Turquoise glass petals illuminated with icy aqua light.",
    meaning: "Peace & renewal",
    shape: "lotus",
  },
  {
    id: 5,
    name: "Amethyst Orchid",
    type: "Orchid",
    category: "ethereal",
    palette: ["#482078", "#A855F7", "#E7C6FF"],
    description: "Violet crystal petals with luminous lavender reflections.",
    meaning: "Beauty & wonder",
    shape: "orchid",
  },
  {
    id: 6,
    name: "Emerald Cosmos",
    type: "Cosmos",
    category: "bold",
    palette: ["#075B3D", "#21C979", "#C2FFD9"],
    description: "Emerald glass petals with fresh green light along every edge.",
    meaning: "Growth & harmony",
    shape: "cosmos",
  },
  {
    id: 7,
    name: "Midnight Sapphire",
    type: "Anemone",
    category: "dark",
    palette: ["#10265F", "#3478FF", "#C2DEFF"],
    description: "Deep sapphire petals with brilliant blue illuminated contours.",
    meaning: "Mystery & wisdom",
    shape: "anemone",
  },
  {
    id: 8,
    name: "Peach Star Lily",
    type: "Star Lily",
    category: "romantic",
    palette: ["#A84635", "#FF9B78", "#FFE3B5"],
    description: "Star-shaped peach petals edged with soft champagne light.",
    meaning: "Hope & radiance",
    shape: "star",
  },
  {
    id: 9,
    name: "Magenta Chrysanthemum",
    type: "Chrysanthemum",
    category: "bold",
    palette: ["#7C0E44", "#F70063", "#FFC0DC"],
    description: "Fine layered magenta petals with shimmering rose highlights.",
    meaning: "Optimism & abundance",
    shape: "chrysanthemum",
  },
  {
    id: 10,
    name: "Ivory Magnolia",
    type: "Magnolia",
    category: "ethereal",
    palette: ["#9B7542", "#FFE8B0", "#FFFFFF"],
    description: "Pearlescent ivory petals with champagne-gold glass edges.",
    meaning: "Grace & dignity",
    shape: "magnolia",
  },
  {
    id: 11,
    name: "Coral Flame Poppy",
    type: "Poppy",
    category: "romantic",
    palette: ["#9B1740", "#FF496C", "#FFC1A8"],
    description: "Coral-red glass petals with luminous peach reflections.",
    meaning: "Imagination & remembrance",
    shape: "poppy",
  },
  {
    id: 12,
    name: "Golden Prism Peony",
    type: "Peony",
    category: "ethereal",
    palette: ["#8A6100", "#E9BC28", "#FFF4A6"],
    description: "Overlapping golden petals with radiant champagne highlights.",
    meaning: "Prosperity & romance",
    shape: "peony",
  },
];

const filters = [
  { label: "All blooms", value: "all" },
  { label: "Romantic", value: "romantic" },
  { label: "Ethereal", value: "ethereal" },
  { label: "Bold", value: "bold" },
  { label: "Dark & dramatic", value: "dark" },
];

const petalPaths = {
  rose: "M 0 0 C -38 -22 -42 -74 -4 -102 C 22 -76 35 -33 0 0 Z",
  lotus: "M 0 0 C -30 -38 -26 -87 0 -112 C 27 -83 30 -38 0 0 Z",
  dahlia: "M 0 0 L -17 -38 L -11 -84 L 0 -111 L 12 -82 L 18 -38 Z",
  tulip: "M 0 0 C -42 -28 -37 -75 -27 -101 C -12 -84 -5 -65 0 -56 C 8 -80 23 -100 31 -102 C 45 -58 37 -23 0 0 Z",
  orchid: "M 0 0 C -22 -25 -61 -26 -81 -56 C -57 -73 -25 -67 -9 -47 C -23 -84 -8 -108 0 -114 C 15 -88 15 -66 9 -47 C 37 -73 69 -67 82 -51 C 56 -22 24 -25 0 0 Z",
  cosmos: "M 0 0 C -19 -28 -28 -67 0 -102 C 29 -70 21 -28 0 0 Z",
  anemone: "M 0 0 C -37 -12 -55 -58 -26 -91 C -4 -74 8 -39 0 0 Z",
  star: "M 0 0 L -15 -37 L -10 -94 L 0 -116 L 11 -94 L 15 -37 Z",
  chrysanthemum: "M 0 0 C -12 -28 -13 -73 0 -108 C 14 -70 13 -29 0 0 Z",
  magnolia: "M 0 0 C -42 -20 -53 -63 -29 -100 C -3 -80 7 -37 0 0 Z",
  poppy: "M 0 0 C -48 -12 -60 -60 -34 -87 C -10 -78 1 -42 0 0 Z",
  peony: "M 0 0 C -35 -19 -47 -61 -20 -94 C 1 -75 15 -34 0 0 Z",
};

const petalCounts = {
  rose: 9,
  lotus: 8,
  dahlia: 14,
  tulip: 3,
  orchid: 5,
  cosmos: 8,
  anemone: 7,
  star: 6,
  chrysanthemum: 18,
  magnolia: 6,
  poppy: 4,
  peony: 12,
};

function FlowerArtwork({ flower, large = false }) {
  const { shape, palette, name } = flower;
  const count = petalCounts[shape] || 8;
  const path = petalPaths[shape] || petalPaths.rose;
  const uniqueId = `gallery-${flower.id}-${large ? "large" : "small"}`;

  const rotations = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        angle: (360 / count) * index + (shape === "rose" ? index * 5 : 0),
        index,
      })),
    [count, shape]
  );

  return (
    <div
      className={`gallery-art gallery-shape-${shape} ${
        large ? "gallery-art-large" : ""
      }`}
      style={{
        "--flower-deep": palette[0],
        "--flower-main": palette[1],
        "--flower-light": palette[2],
      }}
      role="img"
      aria-label={`${name}, an animated luminous glass flower`}
    >
      <div className="gallery-art-halo" />
      <svg
        className="gallery-flower-svg"
        viewBox="-150 -150 300 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${uniqueId}-glass`} cx="30%" cy="20%" r="85%">
            <stop offset="0%" stopColor={palette[2]} stopOpacity=".95" />
            <stop offset="38%" stopColor={palette[1]} stopOpacity=".67" />
            <stop offset="78%" stopColor={palette[0]} stopOpacity=".9" />
            <stop offset="100%" stopColor={palette[0]} stopOpacity=".98" />
          </radialGradient>
          <linearGradient id={`${uniqueId}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor={palette[2]} />
            <stop offset="68%" stopColor={palette[1]} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <radialGradient id={`${uniqueId}-heart`}>
            <stop offset="0%" stopColor="#fff9d6" />
            <stop offset="45%" stopColor="#ffd0e1" />
            <stop offset="100%" stopColor={palette[1]} />
          </radialGradient>
          <filter id={`${uniqueId}-glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uniqueId}-soft`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <circle
          cx="0"
          cy="0"
          r="83"
          fill={palette[1]}
          opacity=".16"
          filter={`url(#${uniqueId}-soft)`}
        />

        {/* Back glass petals */}
        {rotations.map(({ angle, index }) => (
          <g
            key={`back-${index}`}
            transform={`rotate(${angle + (shape === "rose" ? 18 : 0)}) scale(1.04)`}
          >
            <path
              d={path}
              fill={palette[0]}
              fillOpacity=".28"
              stroke={`url(#${uniqueId}-edge)`}
              strokeOpacity=".7"
              strokeWidth="1.6"
            />
          </g>
        ))}

        {/* Main translucent glass petals */}
        {rotations.map(({ angle, index }) => (
          <g key={`front-${index}`} transform={`rotate(${angle})`}>
            <path
              className="gallery-petal-glass"
              d={path}
              fill={`url(#${uniqueId}-glass)`}
              fillOpacity=".79"
              stroke={`url(#${uniqueId}-edge)`}
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
            {/* Traveling light around every petal outline */}
            {/* <path
              className="gallery-petal-light"
              d={path}
              fill="none"
              stroke={`url(#${uniqueId}-edge)`}
              strokeWidth={large ? "3.1" : "2.2"}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              strokeDasharray="17 83"
              style={{ "--light-delay": `${index * -0.17}s` }}
              filter={`url(#${uniqueId}-glow)`}
            /> */}
            
            <path
            className="gallery-petal-light"
            d={path}
            fill="none"
            stroke={`url(#${uniqueId}-edge)`}
            strokeWidth={large ? "3.1" : "2.2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="17 83"
            strokeDashoffset="100"
            style={{ "--light-delay": `${index * -0.17}s` }}
            filter={`url(#${uniqueId}-glow)`}
            />

            {/* Delicate internal glass reflection */}
            <path
              d="M 0 -12 Q -7 -45 -3 -72"
              fill="none"
              stroke="#ffffff"
              strokeOpacity=".72"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Flower-specific centers */}
        {shape === "sunflower" && (
          <circle r="27" fill="#9B4D25" stroke="#FFE4A2" strokeWidth="3" />
        )}
        {shape === "sunflower" &&
          Array.from({ length: 32 }, (_, i) => {
            const angle = i * 2.399;
            const radius = 5 + Math.sqrt(i) * 3.5;
            return (
              <circle
                key={`seed-${i}`}
                cx={Math.cos(angle) * radius}
                cy={Math.sin(angle) * radius}
                r="1.7"
                fill={i % 2 ? "#FFD77B" : "#4C251D"}
              />
            );
          })}

        {shape === "star" && (
          <path
            d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z"
            fill="#FFF8D4"
            stroke={palette[2]}
            strokeWidth="2"
          />
        )}

        {shape === "orchid" && (
          <path
            d="M -19 -6 Q -30 -25 -10 -32 Q 0 -24 10 -32 Q 30 -25 19 -6 L 0 18 Z"
            fill={`url(#${uniqueId}-heart)`}
            stroke="#ffffff"
            strokeWidth="2"
          />
        )}

        {shape !== "sunflower" && shape !== "star" && shape !== "orchid" && (
          <circle
            r={shape === "dahlia" || shape === "chrysanthemum" ? "18" : "14"}
            fill={`url(#${uniqueId}-heart)`}
            stroke="#ffffff"
            strokeWidth="2"
          />
        )}

        <circle
          cx="-3"
          cy="-4"
          r="4"
          fill="#ffffff"
          opacity=".95"
          filter={`url(#${uniqueId}-glow)`}
        />
      </svg>

      <span className="gallery-floating-spark spark-a">✦</span>
      <span className="gallery-floating-spark spark-b">✧</span>
      <span className="gallery-floating-spark spark-c">·</span>
      <span className="gallery-art-caption">HANDCRAFTED LIGHT</span>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [savedFlowers, setSavedFlowers] = useState([]);

  const visibleFlowers = useMemo(
    () =>
      activeFilter === "all"
        ? flowers
        : flowers.filter((flower) => flower.category === activeFilter),
    [activeFilter]
  );

  const toggleSaved = (id) => {
    setSavedFlowers((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  };

  return (
    <main className="glass-gallery">
      <div className="gallery-background-glow gallery-glow-one" />
      <div className="gallery-background-glow gallery-glow-two" />

      <section className="gallery-hero">
        <motion.div
          className="gallery-hero-orb"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="gallery-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="gallery-eyebrow">
            <span />
            THE LUMINOUS FLOWER ARCHIVE
            <span />
          </div>

          <h1>
            A Garden of <em>Light</em>
          </h1>
          <p>
            Where delicate glass petals meet living color.
            Discover blooms illuminated from within.
          </p>

          <div className="gallery-hero-meta">
            <span><i /> {flowers.length} unique creations</span>
            <span className="gallery-meta-divider" />
            <span>One-of-a-kind glass artistry</span>
          </div>
        </motion.div>

        <div className="gallery-hero-flower hero-art-left">
          <FlowerArtwork flower={flowers[0]} />
        </div>
        <div className="gallery-hero-flower hero-art-right">
          <FlowerArtwork flower={flowers[1]} />
        </div>
      </section>

      <section className="gallery-toolbar" aria-label="Gallery controls">
        <div className="gallery-toolbar-copy">
          <span className="gallery-section-kicker">CURATED COLLECTION</span>
          <h2>Find your <em>favorite bloom.</em></h2>
          <p>Every outline glows. Every flower tells a different story.</p>
        </div>

        <div className="gallery-filter-list">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.value}
              className={activeFilter === filter.value ? "active" : ""}
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-grid" aria-label="Glass flower gallery">
        <AnimatePresence mode="popLayout">
          {visibleFlowers.map((flower, index) => (
            <motion.article
              key={flower.id}
              className={`gallery-card gallery-card-${flower.category}`}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.35, delay: index * 0.035 }}
              whileHover={{ y: -7 }}
            >
              <button
                type="button"
                className="gallery-card-open"
                onClick={() => setSelectedFlower(flower)}
                aria-label={`View ${flower.name} details`}
              >
                <div className="gallery-card-art">
                  <span className="gallery-card-index">
                    BLOOM / {String(flower.id).padStart(2, "0")}
                  </span>
                  <FlowerArtwork flower={flower} />
                  <span className="gallery-view-hint">EXPLORE BLOOM ↗</span>
                </div>

                <div className="gallery-card-info">
                  <div>
                    <span className="gallery-flower-type">{flower.type}</span>
                    <h3>{flower.name}</h3>
                    <p>{flower.description}</p>
                  </div>
                  <span className="gallery-card-arrow">↗</span>
                </div>

                <div className="gallery-card-palette">
                  {flower.palette.map((color) => (
                    <span
                      key={color}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  <span className="gallery-palette-label">GLASS PALETTE</span>
                </div>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>

      <section className="gallery-bottom-note">
        <span>✧</span>
        <p>Light travels differently through every bloom.</p>
        <span>✧</span>
      </section>

      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            className="gallery-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlower(null)}
          >
            <motion.section
              className="gallery-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="gallery-modal-art">
                <FlowerArtwork flower={selectedFlower} large />
                <span>ILLUMINATED GLASS SERIES</span>
              </div>

              <div className="gallery-modal-info">
                <button
                  type="button"
                  className="gallery-modal-close"
                  onClick={() => setSelectedFlower(null)}
                  aria-label="Close flower details"
                >
                  ×
                </button>

                <span className="gallery-section-kicker">
                  UNIQUE GLASS CREATION / {String(selectedFlower.id).padStart(2, "0")}
                </span>
                <h2 id="gallery-modal-title">{selectedFlower.name}</h2>
                <p className="gallery-modal-type">{selectedFlower.type} Collection</p>
                <p className="gallery-modal-description">
                  {selectedFlower.description}
                </p>

                <div className="gallery-modal-meaning">
                  <span>Symbolism</span>
                  <strong>{selectedFlower.meaning}</strong>
                </div>

                <div className="gallery-modal-colors">
                  <span>Signature colors</span>
                  <div>
                    {selectedFlower.palette.map((color) => (
                      <span
                        key={color}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                
                <button
                type="button"
                className="gallery-save-button"
                onClick={() => setSelectedFlower(null)}
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
