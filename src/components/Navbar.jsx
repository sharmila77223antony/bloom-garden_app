
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Flower2, Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { name: "Home", to: "/", page: true },
  { name: "Flower", to: "/flower", page: true },
  { name: "Season", to: "/season", page: true },
  { name: "Gallery", to: "/gallery", page: true },
  { name: "Story", to: "/story", page: true },
  { name: "Blog", to: "/blog", page: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Flower2 size={27} strokeWidth={1.5} />
          </span>
          <span>
            BLOOM<span className="brand-dot">.</span>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {links.map((item) =>
            item.page ? (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={closeMenu}
              >
                {item.name}
              </NavLink>
            ) : (
              <Link
                key={item.name}
                to={item.to}
                className="nav-link"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            )
          )}

          <Link
            to="/flower"
            className="nav-cta"
            onClick={closeMenu}
          >
            <Flower2 size={15} />
            <span>Explore Garden</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
