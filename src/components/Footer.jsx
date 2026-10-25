
import { Flower2, Heart, ArrowUp, Sparkles } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Flowers", href: "/flower" },
  { name: "Seasons", href: "/season" },
  { name: "Gallery", href: "/gallery" },
  { name: "Story", href: "/story" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a href="#home" className="footer-brand">
          <span className="footer-logo">
            <Flower2 size={29} strokeWidth={1.4} />
          </span>

          <span>
            <strong>
              BLOOM<span>.</span>
            </strong>
            <small>An Enchanted Glass Garden</small>
          </span>
        </a>

        <p className="footer-message">
          A garden of beauty, light,
          <br />
          and endless wonder.
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.name}>
              {link.name}
            </a>
          ))}
        </nav>

        
      <button
        type="button"
        className="back-to-top"
        aria-label="Back to top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ArrowUp size={19} />
      </button>

      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} BLOOM. All rights reserved.
        </span>

        <span className="footer-love">
          Made with <Heart size={13} fill="currentColor" /> and a little magic.
        </span>

        <div className="footer-socials">
          <a
            href="https://github.com/sharmila77223antony"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="Visit GitHub"
          >
            <img src="/images/github.png" alt="GitHub" />
          </a>

        </div>
      </div>
    </footer>
  );
}
