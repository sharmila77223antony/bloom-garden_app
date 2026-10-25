
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Flower.css";

const flowers = [
  {
    id: 1, name: "Velvet Rose", category: "Roses",
    colors: ["#ff3159", "#a90032", "#ffb5b8"], meaning: "Love & passion",
    shape: "rose", petals: 10, color: "#f42d54",
    description: "A dramatic ruby glass rose with layered, curling petals, glowing edges and a deep crimson heart.",
    season: "Spring to autumn", light: "Bright, indirect light for this artistic display",
    care: "Keep the sculpture clean with a soft microfiber cloth."
  },
  {
    id: 2, name: "Cobalt Iris", category: "Irises",
    colors: ["#315dff", "#9e70ff", "#e2d8ff"], meaning: "Wisdom & hope",
    shape: "iris", petals: 6, color: "#5268ff",
    description: "Sculptural cobalt petals with violet gradients and silvery highlights, inspired by the graceful iris.",
    season: "Spring", light: "Display near soft natural light",
    care: "Wipe gently with a dry, lint-free cloth."
  },
  {
    id: 3, name: "Sunset Tulip", category: "Tulips",
    colors: ["#ff702e", "#ffcb49", "#ffb0a0"], meaning: "Fresh beginnings",
    shape: "tulip", petals: 6, color: "#ff803e",
    description: "Tall, curved glass petals blend sunset orange and warm gold into one luminous bloom.",
    season: "Spring", light: "Soft morning light",
    care: "Avoid abrasive cleaners to protect the glossy finish."
  },
  {
    id: 4, name: "Magenta Hibiscus", category: "Hibiscus",
    colors: ["#ff268e", "#c60061", "#ffb4dc"], meaning: "Beauty & joy",
    shape: "hibiscus", petals: 5, color: "#ed3198",
    description: "Five broad, translucent petals create a tropical silhouette with luminous pink edges.",
    season: "Summer inspiration", light: "Bright display lighting",
    care: "Dust the petals carefully with a soft brush."
  },
  {
    id: 5, name: "Emerald Orchid", category: "Orchids",
    colors: ["#39d5a0", "#087a61", "#e3ff9d"], meaning: "Grace & admiration",
    shape: "orchid", petals: 6, color: "#29b991",
    description: "A rare-looking green glass orchid with leaflike curves and a luminous lime center.",
    season: "All-season display", light: "Bright, indirect light",
    care: "Keep away from direct heat and sudden temperature changes."
  },
  {
    id: 6, name: "Turquoise Lotus", category: "Lotus",
    colors: ["#21d8e5", "#1684d8", "#c9ffff"], meaning: "Peace & renewal",
    shape: "lotus", petals: 12, color: "#29cddd",
    description: "An open water-inspired sculpture with layered turquoise petals and an icy blue glow.",
    season: "Summer inspiration", light: "A bright, calm display space",
    care: "Clean the center and petal gaps gently."
  },
  {
    id: 7, name: "Violet Lavender", category: "Lavender",
    colors: ["#a46aff", "#6332bb", "#e3c8ff"], meaning: "Calm & devotion",
    shape: "lavender", petals: 8, color: "#9562e9",
    description: "Clusters of violet glass buds form an airy botanical sculpture with delicate lilac highlights.",
    season: "Summer inspiration", light: "Soft light against a pale background",
    care: "Use a small soft brush for narrow details."
  },
  {
    id: 8, name: "Orange Marigold", category: "Marigolds",
    colors: ["#ff9d18", "#e45b00", "#ffe8a0"], meaning: "Warmth & celebration",
    shape: "marigold", petals: 14, color: "#ff9b1c",
    description: "Dense, rippled orange petals create a glowing sphere of amber and golden glass.",
    season: "All-season display", light: "Warm ambient lighting",
    care: "Keep the layered petals free from dust."
  },
  {
    id: 9, name: "Cherry Blossom", category: "Blossoms",
    colors: ["#ffc3df", "#ff8ebd", "#fff4fb"], meaning: "New beginnings",
    shape: "cherry", petals: 5, color: "#ffb6d7",
    description: "Soft pink glass blossoms with pearly white rims capture the fleeting beauty of spring.",
    season: "Spring inspiration", light: "Diffused daylight",
    care: "Handle the fine stems and branches gently."
  },
  {
    id: 10, name: "Sapphire Bellflower", category: "Bellflowers",
    colors: ["#377aff", "#2244b5", "#bde8ff"], meaning: "Gratitude & affection",
    shape: "bell", petals: 6, color: "#4779ed",
    description: "Blue bell-shaped blooms hang from slender glass stems, catching cool sapphire reflections.",
    season: "Spring inspiration", light: "Cool, indirect lighting",
    care: "Use a soft cloth on the stem and petals."
  },
  {
    id: 11, name: "Peach Cosmos", category: "Cosmos",
    colors: ["#ffcfb5", "#ff9b83", "#fff4e5"], meaning: "Harmony & kindness",
    shape: "cosmos", petals: 8, color: "#ffb69e",
    description: "Wide peach petals unfold in a delicate radial arrangement with warm coral reflections.",
    season: "Summer inspiration", light: "Gentle, warm lighting",
    care: "Keep the sculpture away from rough surfaces."
  },
  {
    id: 12, name: "Opal Anemone", category: "Anemones",
    colors: ["#80e8ff", "#f4b8ff", "#fff5ba"], meaning: "Imagination & wonder",
    shape: "opal", petals: 8, color: "#b7a6ff",
    description: "Iridescent glass petals shift between pastel blue, lilac, pink and champagne gold.",
    season: "All-season display", light: "Bright light to reveal its color shifts",
    care: "Polish with a clean microfiber cloth."
  },
];

const categories = ["All", ...new Set(flowers.map((flower) => flower.category))];

function GlassBloom({ flower, large = false }) {
  return (
    <div
      className={`glass-bloom bloom-${flower.shape} ${large ? "bloom-large" : ""}`}
      style={{
        "--petal-color": flower.colors[0],
        "--petal-deep": flower.colors[1],
        "--petal-light": flower.colors[2],
        "--petal-count": flower.petals,
      }}
      aria-hidden="true"
    >
      <div className="bloom-halo" />
      <div className="bloom-stem" />
      <div className="bloom-leaf bloom-leaf-left" />
      <div className="bloom-leaf bloom-leaf-right" />
      <motion.div
        className="bloom-head"
        animate={{ rotate: [0, 2, -2, 0], y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: flower.petals }, (_, index) => (
          <span
            className="bloom-petal"
            key={index}
            style={{
              "--petal-index": index,
              "--petal-angle": `${(360 / flower.petals) * index}deg`,
            }}
          />
        ))}
        <span className="bloom-core">
          <span className="bloom-core-light" />
        </span>
      </motion.div>
      <span className="bloom-spark bloom-spark-one">✦</span>
      <span className="bloom-spark bloom-spark-two">✧</span>
    </div>
  );
}

export default function Flower() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const visibleFlowers =
    category === "All"
      ? flowers
      : flowers.filter((flower) => flower.category === category);

  return (
    <div className="glass-garden">
      <section className="glass-garden-heading">
        <motion.div
          className="glass-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span />
          THE BLOOM COLLECTION
          <span />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          A Garden of <em>Glass</em>
        </motion.h1>

        <p>
          Little sculptures of light, color and imagination.
          <br />
          Discover your favorite bloom.
        </p>
      </section>

      <section className="glass-garden-collection">
        <div className="glass-filter-list" aria-label="Filter flower collection">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "glass-filter active" : "glass-filter"}
              onClick={() => setCategory(item)}
            >
              {item === "All" ? "✿" : "✧"} <span>{item}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="glass-flower-grid">
          <AnimatePresence mode="popLayout">
            {visibleFlowers.map((flower, index) => (
              <motion.button
                type="button"
                key={flower.id}
                className="glass-flower-card"
                onClick={() => setSelected(flower)}
                aria-label={`View ${flower.name} details`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.025 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="glass-flower-art">
                  <div className="glass-art-label">
                    {String(flower.id).padStart(2, "0")} / COLLECTION
                  </div>
                  <GlassBloom flower={flower} />
                  <div className="glass-art-glow" />
                </div>

                <div className="glass-flower-caption">
                  <div>
                    <span className="glass-caption-category">{flower.category}</span>
                    <h2>{flower.name}</h2>
                    <p>{flower.meaning}</p>
                  </div>
                  <span className="glass-card-arrow">↗</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="glass-garden-note">
        <span className="glass-note-symbol">✳</span>
        <div>
          <span className="glass-kicker">A LITTLE MAGIC</span>
          <h2>Every color tells a story.</h2>
          <p>Choose a flower to discover its unique world.</p>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="glass-detail-backdrop"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              className="glass-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="glass-detail-title"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <button
                className="glass-modal-close"
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close flower details"
              >
                ×
              </button>

              <div className="glass-modal-art">
                <GlassBloom flower={selected} large />
                <span className="glass-modal-art-label">UNIQUE GLASS SCULPTURE</span>
              </div>

              <div className="glass-modal-info">
                <span className="glass-kicker">{selected.category} / NO. {selected.id}</span>
                <h2 id="glass-detail-title">{selected.name}</h2>
                <p className="glass-modal-meaning">{selected.meaning}</p>
                <p className="glass-modal-description">{selected.description}</p>

                <h3>Color palette</h3>
                <div className="glass-color-palette">
                  {selected.colors.map((color) => (
                    <span
                      key={color}
                      style={{ background: color }}
                      title={color}
                    />
                  ))}
                  <strong>{selected.colors.join(" · ")}</strong>
                </div>

                <div className="glass-modal-details">
                  <div>
                    <span>Season</span>
                    <strong>{selected.season}</strong>
                  </div>
                  <div>
                    <span>Display light</span>
                    <strong>{selected.light}</strong>
                  </div>
                  <div>
                    <span>Care</span>
                    <strong>{selected.care}</strong>
                  </div>
                </div>

                <button
                  className="glass-modal-button"
                  type="button"
                  onClick={() => setSelected(null)}
                >
                  Return to collection <span>↗</span>
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
