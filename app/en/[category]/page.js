import { notFound } from "next/navigation";
import { categories, stories } from "../../../data/stories";

function StoryVisual({ story, large = false }) {
  if (story.image) {
    return (
      <img
        src={story.image}
        alt={story.title}
        className={large ? "category-lead-image" : "category-card-image"}
      />
    );
  }

  return (
    <div
      className={`category-placeholder ${
        large ? "category-lead-image" : "category-card-image"
      }`}
    >
      <span>K.</span>
      <small>{story.category}</small>
    </div>
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const currentCategory = categories.find(
    (item) => item.slug === category
  );

  if (!currentCategory) {
    notFound();
  }

  const categoryStories = stories.filter(
    (story) => story.categorySlug === category
  );

  const lead = categoryStories[0];
  const remaining = categoryStories.slice(1);

  return (
    <>
      <main className="category-page">
      <div className="container">
        <div className="category-brand-header">
  <div className="category-brand-left">
    <a
      href="/en"
      className="category-brand-link"
      aria-label="Khulaasaa English home"
    >
      <img
        src="/logo.png"
        alt="Khulaasaa"
        className="category-brand-logo"
      />
    </a>
  </div>

  <a href="/en" className="category-back-link">
    ← Home
  </a>
</div>

<header className="category-hero-header">
  <div>
    <span className="eyebrow">SECTION</span>

    <h1>
      {currentCategory.name}<span>.</span>
    </h1>
  </div>

  <p>
    Latest reporting, analysis and essential updates from
    Khulaasaa English.
  </p>
</header>

        {lead && (
          <section className="category-lead">
            <StoryVisual story={lead} large />

            <div className="category-lead-copy">
              <span className="eyebrow">{lead.category}</span>
              <h2>{lead.title}</h2>
              <p>{lead.summary}</p>

              <div className="category-story-meta">
                <span>Khulaasaa</span>
                <span>{lead.time}</span>
              </div>
            </div>
          </section>
        )}

        <section className="category-story-grid">
          {remaining.map((story) => (
            <article className="category-story-card" key={story.id}>
              <StoryVisual story={story} />

              <div>
                <span className="eyebrow">{story.category}</span>
                <h2>{story.title}</h2>
                <p>{story.summary}</p>
                <span className="story-meta">{story.time}</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>

      <footer className="site-footer">
  <div className="container modern-footer">
    <div className="footer-top">
      <a
        href="/en"
        className="footer-logo-link"
        aria-label="Khulaasaa English home"
      >
        <img
          src="/logo.png"
          alt="Khulaasaa"
          className="footer-logo"
        />
      </a>

      <div className="footer-nav">
        <a href="/en/national">National</a>
        <a href="/en/business">Business</a>
        <a href="/en/world">World</a>
        <a href="/en/sports">Sports</a>
        <a href="/en/gallery">Gallery</a>
      </div>
    </div>

    <div className="footer-divider" />

    <div className="footer-middle">
      <div className="footer-column">
        <span className="footer-label">Explore</span>
        <a href="/en">Home</a>
        <a href="#latest">Latest News</a>
        <a href="/en/gallery">Gallery</a>
      </div>

      <div className="footer-column">
        <span className="footer-label">Edition</span>
        <a href="https://www.khulaasaa.com/">
          Dhivehi ↗
        </a>
      </div>

      <div className="footer-column">
        <span className="footer-label">Follow</span>

        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            f
          </a>

          <a href="#" aria-label="Instagram">
            ◎
          </a>

          <a href="#" aria-label="X">
            𝕏
          </a>

          <a href="#" aria-label="YouTube">
            ▶
          </a>
        </div>
      </div>
    </div>

    <div className="footer-divider" />

    <div className="footer-bottom">
      <span>
        © {new Date().getFullYear()} Khulaasaa Media
      </span>

      <div className="footer-legal">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Corrections</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </div>
</footer>
    </>

  );
}








