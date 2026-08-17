"use client";

import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  MapPin,
  Menu as MenuIcon,
  X,
} from "lucide-react";

const menu = [
  {
    name: "Burrata & Charred Peach",
    category: "Small plates",
    price: "₹680",
    description: "Fresh burrata, smoked peach, basil oil, pistachio.",
  },
  {
    name: "Courtyard Lamb Chops",
    category: "Mains",
    price: "₹1,450",
    description: "Tandoor-kissed chops, plum glaze, pickled mustard.",
  },
  {
    name: "Wild Mushroom Risotto",
    category: "Mains",
    price: "₹920",
    description: "Forest mushrooms, parmesan, truffle and thyme.",
  },
  {
    name: "Burnt Basque Cheesecake",
    category: "Dessert",
    price: "₹540",
    description: "Silky centre, sea salt caramel, seasonal berries.",
  },
  {
    name: "Delhi Gimlet",
    category: "Drinks",
    price: "₹620",
    description: "Gin, kokum, kaffir lime, green peppercorn.",
  },
  {
    name: "Saffron Old Fashioned",
    category: "Drinks",
    price: "₹740",
    description: "Bourbon, saffron, jaggery, aromatic bitters.",
  },
];

const photos = [
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
];

const heroSlides = [
  {
    eyebrow: "A dining room in the heart of Delhi",
    title: (
      <>
        Unplug
        <br />
        <i>yourself.</i>
      </>
    ),
    sub: (
      <>
        Come for the food.
        <br />
        Stay for the feeling.
      </>
    ),
    image: photos[0],
  },
  {
    eyebrow: "Slow evenings, shared plates",
    title: (
      <>
        Stay for
        <br />
        <i>the feeling.</i>
      </>
    ),
    sub: (
      <>
        A table under the trees.
        <br />A night with nowhere else to be.
      </>
    ),
    image: photos[1],
  },
  {
    eyebrow: "Cocktails after sunset",
    title: (
      <>
        Meet me
        <br />
        <i>outside.</i>
      </>
    ),
    sub: (
      <>
        Small pours.
        <br />
        Long conversations.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "A little escape in the city",
    title: (
      <>
        Eat slowly.
        <br />
        <i>Stay awhile.</i>
      </>
    ),
    sub: (
      <>
        Your corner of Connaught Place.
        <br />
        Open late.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [booking, setBooking] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const categories = [
    "All",
    ...Array.from(new Set(menu.map((item) => item.category))),
  ];
  const slide = heroSlides[activeSlide];
  const filtered = useMemo(
    () =>
      active === "All" ? menu : menu.filter((item) => item.category === active),
    [active],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800);
    const move = (event: PointerEvent) =>
      setCursor({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("pointermove", move);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: true,
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      3000,
    );
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main
      className="site-shell"
      style={
        {
          "--cursor-x": `${cursor.x}%`,
          "--cursor-y": `${cursor.y}%`,
        } as React.CSSProperties
      }>
      <div
        className={`loader ${loading ? "is-visible" : "is-hidden"}`}
        aria-hidden={!loading}>
        <div className="loader-mark">UC</div>
        <span>Cafe AURIKA</span>
      </div>
      <div className="grain" />
      <header className="nav">
        <a className="brand" href="#top">
          <span>UC</span>
          <b>
            Cafe 
            <br />
            AURIKA
          </b>
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#story" onClick={() => setMenuOpen(false)}>
            Our story
          </a>
          <a href="#menu" onClick={() => setMenuOpen(false)}>
            Menu
          </a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>
            Visit
          </a>
        </nav>
        <button
          className="outline-btn nav-book"
          onClick={() => setBooking(true)}>
          Book a table <ArrowUpRight size={15} />
        </button>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <MenuIcon />}
        </button>
      </header>

      <section id="top" className="hero">
        <div
          className="hero-image"
          key={activeSlide}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="hero-shade" />
        <div className="hero-copy" key={`copy-${activeSlide}`}>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="hero-sub">{slide.sub}</p>
        </div>
        <div className="hero-bottom">
          <span className="scroll-note">
            <ArrowDownRight size={17} /> Scroll to explore
          </span>
          <span className="hero-location">
            <MapPin size={15} /> Gurugram, Haryana
          </span>
          <span className="hero-index">0{activeSlide + 1} / 04</span>
        </div>
        <div className="hero-pagination" aria-label="Hero slides">
          {heroSlides.map((item, index) => (
            <button
              key={item.eyebrow}
              className={
                index === activeSlide
                  ? "pagination-dot active"
                  : "pagination-dot"
              }
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide}
              onClick={() => setActiveSlide(index)}>
              <span />
            </button>
          ))}
        </div>
        <div className="orb" />
      </section>

      <section id="story" className="story section-pad">
        <div className="section-label">01 — The place</div>
        <div className="story-grid">
          <div>
            <h2>
              Good food.
              <br />
              <em>Good energy.</em>
            </h2>
          </div>
          <div className="story-copy">
            <p className="lead">
              A lush escape from the city&apos;s rush, tucked behind the old
              trees of Connaught Place.
            </p>
            <p>
              Cafe AURIKA is a restaurant, bar and open-air hideaway
              made for long lunches, late dinners and the kind of conversations
              that accidentally run past midnight.
            </p>
            <a className="text-link" href="#visit">
              Find your way here <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="image-pair">
          <div
            className="story-image large"
            style={{ backgroundImage: `url(${photos[1]})` }}
          />
          <div
            className="story-image small"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=85)`,
            }}
          />
          <span className="image-caption">The courtyard, after dark</span>
        </div>
      </section>

      <section id="menu" className="menu-section section-pad">
        <div className="section-label">02 — At the table</div>
        <div className="menu-heading">
          <h2>
            A little bit
            <br />
            <em>of everything.</em>
          </h2>
          <p>
            Seasonal plates, old favourites and cocktails that keep the evening
            moving.
          </p>
        </div>
        <div className="filters" role="tablist">
          {categories.map((category) => (
            <button
              key={category}
              className={active === category ? "filter active" : "filter"}
              onClick={() => setActive(category)}>
              {category}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {filtered.map((item) => (
            <article className="dish" key={item.name}>
              <div className="dish-top">
                <span>{item.category}</span>
                <span>{item.price}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <ArrowUpRight className="dish-arrow" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section id="visit" className="visit section-pad">
        <div className="section-label">03 — Come by</div>
        <div className="visit-grid">
          <div>
            <h2>
              See you
              <br />
              <em>under the trees.</em>
            </h2>
            <div className="address">
              <MapPin size={18} />
              <span>
                Cafe AURIKA
                <br />
                Sushant Lok -1, Sector 43
                <br />
                Gurugram, Haryana 122003
              </span>
            </div>
            <button className="solid-btn" onClick={() => setBooking(true)}>
              Make a reservation <CalendarDays size={16} />
            </button>
          </div>
          <a
            href="https://www.google.com/maps/place/Cafe+AURIKA+%7C+Sushant+Lok+-1,+Sector+43/@28.4596543,77.0792094,766m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390d192f311eb591:0x75963c869270cd51!8m2!3d28.4596543!4d77.0792094!16s%2Fg%2F11mq5rbj6y!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="map-card">
            <div className="map-lines" />
            <div className="map-pin">
              <MapPin size={22} /> <span>UC</span>
            </div>
            <div className="map-label">
              Gurugram
              <br />
              <small>Haryana </small>
            </div>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">UC</div>
        <div>
          <p>Cafe AURIKA</p>
          <small>Eat slowly. Stay awhile.</small>
        </div>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram">
          <ExternalLink size={19} />
        </a>
        <span className="copyright">© 2026 UC</span>
      </footer>
      {booking && (
        <div
          className="dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Book a table">
          <div className="dialog">
            <button
              className="dialog-close"
              onClick={() => setBooking(false)}
              aria-label="Close">
              <X />
            </button>
            <span className="eyebrow">Reservations</span>
            <h2>
              Save a seat
              <br />
              <em>for yourself.</em>
            </h2>
            <p>
              Call us at <strong>+91 88260 02788</strong> or send a request to
              reservations@CafeAURIKA.com
            </p>
            <a className="solid-btn" href="tel:+918826002788">
              Call to book <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
