import { gallery } from "../../../data/stories";

function GalleryVisual({ item, featured = false }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        className="gallery-image"
      />
    );
  }

  return (
    <div
      className={`gallery-placeholder ${
        featured ? "gallery-featured-placeholder" : ""
      }`}
    >
      <span className="gallery-k">K.</span>
      <span className="gallery-label">KHULAASAA / GALLERY</span>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <div className="container">
        <div className="category-brand-header">
  <div className="category-brand-left">
    <a
      href="/en"
      className="category-brand-link"
      aria-label="Khulaasaa English home"
    >
      <img
        src="https://khulaasaa-english.vercel.app/logo.png"
        alt="Khulaasaa"
        className="category-brand-logo"
      />
    </a>
  </div>

  <a href="/en" className="category-back-link">
    ← Home
  </a>
</div>

<header className="category-hero-header gallery-category-header">
  <div>
    <span className="eyebrow">SECTION</span>

    <h1>
      Gallery<span>.</span>
    </h1>
  </div>

  <p>
    The Maldives and beyond, captured through the Khulaasaa lens.
  </p>
</header>

        <section className="gallery-featured">
          <GalleryVisual item={gallery[0]} featured />

          <div className="gallery-featured-copy">
            <span className="eyebrow">FEATURED GALLERY</span>
            <h2>{gallery[0].title}</h2>
            <p>
              A visual story featuring people, places and moments worth
              remembering.
            </p>
          </div>
        </section>

        <section className="gallery-grid">
          {gallery.slice(1).map((item, index) => (
            <article
              className={`gallery-card ${
                index === 1 ? "gallery-card-wide" : ""
              }`}
              key={item.id}
            >
              <GalleryVisual item={item} />

              <div className="gallery-card-overlay">
                <span>PHOTO STORY</span>
                <h2>{item.title}</h2>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}



