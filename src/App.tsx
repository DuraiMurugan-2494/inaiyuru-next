import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  Menu,
  Plus,
  Send,
  X,
} from "lucide-react";

type Template = {
  id: number;
  name: string;
  type: string;
  category: string;
  description: string;
  className: string;
  label: string;
};

const templates: Template[] = [
  {
    id: 1,
    name: "Sunday Supply",
    type: "Shop / lifestyle",
    category: "Shop",
    description: "A product-first storefront with room to tell your story.",
    className: "art-sunday",
    label: "SUNDAY\\nSUPPLY",
  },
  {
    id: 2,
    name: "Good Form",
    type: "Studio / wellness",
    category: "Wellness",
    description: "A calm, confident home for services and bookings.",
    className: "art-form",
    label: "GOOD\\nFORM",
  },
  {
    id: 3,
    name: "Little Ritual",
    type: "Cafe / food",
    category: "Food",
    description: "Warm visuals and a menu that makes people hungry.",
    className: "art-ritual",
    label: "LITTLE\\nRITUAL",
  },
  {
    id: 4,
    name: "Field Notes",
    type: "Portfolio / creative",
    category: "Portfolio",
    description: "A bold canvas for work that deserves to be seen.",
    className: "art-field",
    label: "FIELD\\nNOTES",
  },
  {
    id: 5,
    name: "Kindred House",
    type: "Local business",
    category: "Services",
    description: "A clear, welcoming presence that turns visits into leads.",
    className: "art-kindred",
    label: "KINDRED\\nHOUSE",
  },
  {
    id: 6,
    name: "Forma Objects",
    type: "Design / product",
    category: "Shop",
    description: "A gallery-like product experience with a modern edge.",
    className: "art-forma",
    label: "FORMA\\nOBJECTS",
  },
];

const categories = ["All", "Shop", "Wellness", "Food", "Portfolio", "Services"];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Inaiyuru home">
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M5 27V5h9v22H5Zm13 0V5h9v22h-9ZM5 16h22"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </span>{" "}
      inaiyuru
      <span className="registered">®</span>
    </a>
  );
}
function Artwork({ item }: { item: Template }) {
  return (
    <div className={`concept-art art-${item.id}`}>
      <div className="concept-nav">
        <span>{item.name.toUpperCase()}</span>
        <span>MENU +</span>
      </div>
      <div className="concept-shape" />
      <div className="concept-type">
        {item.label.split("\\n").map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
      <div className="concept-foot">
        <span>{item.type}</span>
        <ArrowUpRight size={20} />
      </div>
    </div>
  );
}
function App() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Template | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleTemplates =
    category === "All"
      ? templates
      : templates.filter((t) => t.category === category);
  useEffect(() => {
    if (selected) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  async function handleInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/duraiucevit@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...payload,
            _subject: `New Inaiyuru website inquiry — ${String(payload.name || "New customer")}`,
            _template: "table",
          }),
        },
      );
      if (!response.ok)
        throw new Error("Email service did not accept the request.");
      const result = await response.json();
      if (result.success === "false" || result.success === false)
        throw new Error("Email service did not accept the request.");
      setSent(true);
      form.reset();
    } catch (err) {
      const subject = encodeURIComponent(
        `Inaiyuru website inquiry — ${String(payload.name || "New customer")}`,
      );
      const body = encodeURIComponent(
        `Name: ${payload.name || ""}\nEmail: ${payload.email || ""}\nBusiness: ${payload.business || ""}\nWebsite path: ${payload.path || ""}\nBudget/timing: ${payload.budget || ""}\n\nWhat I need:\n${payload.message || ""}`,
      );
      window.location.href = `mailto:duraiucevit@gmail.com?subject=${subject}&body=${body}`;
      setError(
        "Automatic delivery could not be confirmed. Your email app has been opened as a fallback. Please send the prepared message.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="top">
      <header className="site-header">
        <Logo />
        <nav
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          {[
            ["The design edit", "work"],
            ["Our approach", "process"],
            ["The studio", "about"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Let's talk <ArrowUpRight size={17} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section className="hero atelier-hero">
          <div className="hero-content">
            <span className="eyebrow">
              <i className="status-dot" /> INDEPENDENT DIGITAL DESIGN STUDIO
            </span>
            <h1>
              Presence.
              <br />
              With <em>purpose.</em>
            </h1>
            <p className="hero-description">
              Distinctive websites for businesses ready to be taken seriously.
              Strategy, design, and development — considered together.
            </p>
            <div className="hero-links">
              <a className="button" href="#contact">
                Let's build your next chapter <ArrowUpRight size={18} />
              </a>
              <a className="hero-work-link" href="#work">
                Explore our design directions <ArrowDownRight size={16} />
              </a>
            </div>
            <div className="hero-service-note">
              <span>THOUGHTFULLY DESIGNED.</span>
              <span>BUILT AROUND YOUR BUSINESS.</span>
            </div>
          </div>
          <div
            className="hero-visual"
            onPointerMove={(e) => {
              const bounds = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--pointer-x",
                `${((e.clientX - bounds.left) / bounds.width) * 2 - 1}`,
              );
              e.currentTarget.style.setProperty(
                "--pointer-y",
                `${((e.clientY - bounds.top) / bounds.height) * 2 - 1}`,
              );
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.setProperty("--pointer-x", "0");
              e.currentTarget.style.setProperty("--pointer-y", "0");
            }}
          >
            <img
              className="architectural-image"
              src="/images/studio-interior.jpg"
              alt="A thoughtfully composed interior with natural materials, sculptural furniture, and warm light"
              fetchPriority="high"
              width="1600"
              height="1067"
            />
            <div className="visual-shade" />
            <div className="study-header">
              <span>THE INAIYURU PERSPECTIVE</span>
              <span>DESIGN STUDY — 01</span>
            </div>
            <div className="study-title">
              Form.
              <br />
              <em>Feeling.</em>
              <br />
              Function.
            </div>
            <div className="visual-seal" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <path
                  d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60M34 11l32 78M11 34l78 32M11 66l78-32M34 89l32-78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="study-bottom">
              <span>
                A BALANCE OF EXPRESSION
                <br />
                AND INTENTION.
              </span>
              <a href="#work" aria-label="Explore design concepts">
                <ArrowDownRight size={24} />
              </a>
            </div>
          </div>
        </section>
        <div className="discipline-strip">
          <span>YOUR AMBITION. OUR CRAFT.</span>
          <div>
            <span>01 / STRATEGY</span>
            <span>02 / DESIGN</span>
            <span>03 / DEVELOPMENT</span>
          </div>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
        <section id="work" className="work-section section-pad">
          <div className="section-title">
            <div>
              <span className="eyebrow">01 / DESIGN DIRECTIONS</span>
              <h2>
                Distinct by design.
                <br />
                <em>Personal by nature.</em>
              </h2>
            </div>
            <p>
              Find a direction that feels like you. Then we make it yours — from
              the first impression to the smallest detail.
            </p>
          </div>
          <div className="filter-row">
            <span className="mini-label">EXPLORE BY WORLD</span>
            <div className="filters">
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  <sup>
                    {c === "All"
                      ? "06"
                      : String(
                          templates.filter((t) => t.category === c).length,
                        ).padStart(2, "0")}
                  </sup>
                </button>
              ))}
            </div>
          </div>
          <div className="concept-grid">
            {visibleTemplates.map((item) => (
              <article className="concept-card" key={item.id}>
                <button
                  className="concept-preview"
                  onClick={() => setSelected(item)}
                  aria-label={`Preview ${item.name}`}
                >
                  <Artwork item={item} />
                  <span className="preview-label">
                    EXPLORE CONCEPT <ArrowUpRight size={16} />
                  </span>
                </button>
                <div className="concept-meta">
                  <div>
                    <span className="mini-label">{item.type} / CONCEPT</span>
                    <h3>{item.name}</h3>
                  </div>
                  <button
                    className="round-button"
                    onClick={() => setSelected(item)}
                    aria-label={`Explore ${item.name}`}
                  >
                    <ArrowUpRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="work-bottom">
            <span>DESIGN CONCEPTS. MADE TO BECOME YOURS.</span>
            <a href="#contact">
              Thinking outside these boxes? Let's talk{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section id="about" className="about-section section-pad">
          <span className="eyebrow">02 / THE STUDIO PHILOSOPHY</span>
          <div className="about-grid">
            <div className="about-symbol" aria-hidden="true">
              ✳
            </div>
            <div>
              <h2>
                Considered details.
                <br />
                <span>Lasting impressions.</span>
              </h2>
              <p>
                Your business has its own story. Your website should too. We
                combine expressive design with clear thinking to build a home
                for your business that looks distinct, feels natural, and works
                beautifully.
              </p>
              <a className="quiet-link" href="#contact">
                Let's make something that matters <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="about-bottom">
            <span>SMALL STUDIO. DIRECT CONVERSATIONS. SHARED AMBITION.</span>
            <span>THOUGHTFULLY MADE, NEVER MASS-PRODUCED.</span>
          </div>
        </section>
        <section id="process" className="process-section section-pad">
          <div className="section-title">
            <div>
              <span className="eyebrow">03 / THE WAY WE WORK</span>
              <h2>
                A clear process.
                <br />
                <em>An exceptional outcome.</em>
              </h2>
            </div>
            <p>
              No complicated handoffs. No technical vocabulary test. Just a
              collaborative path from your idea to your corner of the internet.
            </p>
          </div>
          <div className="process-list">
            {[
              [
                "Discover the direction.",
                "Choose a design direction or bring a blank page. We get to know your business, your audience, and what success looks like.",
              ],
              [
                "Shape the experience.",
                "We shape the design, content, and experience around you. You get room to review, ask questions, and refine the details.",
              ],
              [
                "Launch with confidence.",
                "We bring it all together, check the details, and help your business take its next confident step online.",
              ],
            ].map(([title, copy], i) => (
              <article key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ArrowUpRight className="step-arrow" />
              </article>
            ))}
          </div>
          <div className="roadmap">
            <span className="eyebrow">
              <i className="status-dot" /> ON OUR RADAR
            </span>
            <p>Websites today. Smarter business tools tomorrow.</p>
            <span>EXPLORING AI & AUTOMATION — NOT YET A SERVICE</span>
          </div>
        </section>
        <section id="contact" className="contact-section section-pad">
          <div className="contact-left">
            <div className="eyebrow">
              <span>06</span> / YOUR MOVE
            </div>
            <h2>
              Got a business?
              <br />
              <span>Let's give it a home.</span>
            </h2>
            <p>
              Tell us a little about what you're building. We'll take it from
              there — no pressure, no awkward sales pitch.
            </p>
            <div className="contact-email">
              <span>OR EMAIL US DIRECTLY</span>
              <a href="mailto:duraiucevit@gmail.com">
                duraiucevit@gmail.com <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="contact-doodle">
              <Asterisk size={72} />
              <span>
                GOOD THINGS
                <br />
                START SOMEWHERE.
              </span>
            </div>
          </div>
          <div className="contact-form-wrap">
            {sent ? (
              <div className="success-panel">
                <div className="success-icon">
                  <Check size={30} />
                </div>
                <span className="eyebrow">MESSAGE SENT</span>
                <h3>That's a great first step.</h3>
                <p>
                  Your inquiry was accepted by our email service. We'll be in
                  touch after we review it.
                </p>
                <button
                  className="button button-blue"
                  onClick={() => setSent(false)}
                >
                  Send another inquiry <Plus size={17} />
                </button>
              </div>
            ) : (
              <form className="inquiry-form" onSubmit={handleInquiry}>
                <div className="form-top">
                  <span>PROJECT INQUIRY</span>
                  <span>TAKES ABOUT 2 MINUTES ↘</span>
                </div>
                <label>
                  Your name <span>*</span>
                  <input
                    required
                    name="name"
                    placeholder="What should we call you?"
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email address <span>*</span>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@yourbusiness.com"
                    autoComplete="email"
                  />
                </label>
                <label>
                  What kind of business? <span>*</span>
                  <input
                    required
                    name="business"
                    placeholder="e.g. cafe, consultant, local service"
                  />
                </label>
                <label>
                  How would you like to start?
                  <select name="path" defaultValue="not-sure">
                    <option value="not-sure">Not sure yet</option>
                    <option value="template">Choose a template</option>
                    <option value="custom">Build a custom website</option>
                    <option value="store">Online store</option>
                    <option value="redesign">
                      Redesign an existing website
                    </option>
                  </select>
                  <ChevronDown className="select-chevron" size={15} />
                </label>
                <label>
                  What are you imagining?{" "}
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="A little about your business, goals, ideas, or questions..."
                  />
                </label>
                <button
                  className="button button-blue submit-button"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Sending inquiry…" : "Send my inquiry"}{" "}
                  {sending ? <span className="spinner" /> : <Send size={17} />}
                </button>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <p className="form-privacy">
                  Your details are used to respond to this inquiry. Please don't
                  include sensitive information.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Logo />
          <span>
            GOOD THINGS START
            <br />
            WITH A CONVERSATION.
          </span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
        <div className="footer-word" aria-hidden="true">
          inaiyuru<span>®</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} INAIYURU</span>
          <span>INDEPENDENT IN SPIRIT. CONNECTED BY DESIGN.</span>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        className="template-modal"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        aria-labelledby="modal-title"
      >
        {selected && (
          <div className="modal-inner">
            <button
              className="modal-close round-button"
              aria-label="Close preview"
              onClick={() => setSelected(null)}
              autoFocus
            >
              <X />
            </button>
            <Artwork item={selected} />
            <div className="modal-details">
              <span className="eyebrow">A DIRECTION, MADE YOURS</span>
              <h2 id="modal-title">{selected.name}</h2>
              <p>
                {selected.description} We'll adapt the layout, colors, content,
                and details to fit your business.
              </p>
              <a
                className="button"
                href="#contact"
                onClick={() => setSelected(null)}
              >
                I like this direction <ArrowRight size={18} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
export default App;
