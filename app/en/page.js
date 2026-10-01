import MaldivesDateTime from "../components/MaldivesDateTime";
import { categories, stories, gallery } from "../../data/stories";

function StoryVisual({ story, lead = false }) {
  if (story.image) {
    return (
      <img
        src={story.image}
        alt={story.title}
        className={lead ? "lead-image" : "story-image"}
      />
    );
  }

  return (
    <div className={`image-placeholder ${lead ? "lead-image" : ""}`}>
      <span className="image-monogram">K.</span>
      <span className="image-caption">{story.category}</span>
    </div>
  );
}

function StoryCard({ story }) {
  return (
    <article className="story-card">
      <StoryVisual story={story} />

      <div className="story-copy">
        <span className="eyebrow">{story.category}</span>
        <h3>{story.title}</h3>
        <p className="story-meta">{story.time}</p>
      </div>
    </article>
  );
}

export default function EnglishHome() {
  const leadStory = stories[0];
  const supportingStories = stories.slice(1, 5);
  const editorStories = stories.filter(
    (story) => story.editorsChoice
  );

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <MaldivesDateTime />
          <a href="https://www.khulaasaa.com/">
            Dhivehi edition ↗
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container masthead">
          <div className="brand-wrap">
            <a
              className="brand-logo-link"
              href="/en"
              aria-label="Khulaasaa English home"
            >
              <img
                src="/logo.png"
                alt="Khulaasaa"
                className="khulaasaa-logo"
              />

              <div className="brand-text-wrap">
                <span className="brand">KHULAASAA</span>
                <span className="edition-badge">ENGLISH</span>
              </div>
            </a>
          </div>

          <a className="mobile-dhivehi-switch" href="https://www.khulaasaa.com/">Dhivehi edition ↗</a>

    <div className="masthead-right">
            <p className="tagline">
              Compact News.
              <br />
              <strong>Complete Insight.</strong>
            </p>
          </div>
        </div>

        <div className="nav-border">
          <div className="container navigation">
            <nav className="desktop-nav">
              <a className="active" href="/en">
                Home
              </a>

              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/en/${category.slug}`}
                >
                  {category.name}
                </a>
              ))}

              <a href="/en/gallery">Gallery</a>
            </nav>

            <details className="mobile-menu">
              <summary>
                Menu <span>＋</span>
              </summary>

              <nav>
                <a href="/en">Home</a>

                {categories.map((category) => (
                  <a
                    key={category.slug}
                    href={`/en/${category.slug}`}
                  >
                    {category.name}
                  </a>
                ))}

                <a href="/en/gallery">Gallery</a>
              </nav>
            </details>

            <a className="latest-link" href="#latest">
              <span className="status-dot" />
              Latest news
            </a>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="front-grid">
          <section className="lead-section">
            <article className="lead-story">
  <div className="lead-headline">
    <h2>{leadStory.title}</h2>
  </div>

  <StoryVisual story={leadStory} lead />

  <div className="lead-copy">
    <p className="lead-summary">
      {leadStory.summary}
    </p>

    <div className="byline">
      <span>
        By <strong>Khulaasaa</strong>
      </span>

      <span className="meta-divider" />

      <span>{leadStory.time}</span>
    </div>
  </div>
</article>

            <div className="supporting-grid">
              {supportingStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>

          <aside className="latest-panel" id="latest">
            <div className="latest-heading">
              <span className="status-dot" />
              <h2>Latest updates</h2>
            </div>

            <p className="latest-intro">
              The stories that matter, as they develop.
            </p>

            <ol className="latest-list">
              {stories.slice(0, 5).map((story, index) => (
                <li key={story.id}>
                  <span className="update-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <span className="eyebrow">
                      {story.category}
                    </span>
                    <h3>{story.title}</h3>
                    <span className="story-meta">
                      {story.time}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        

        <section className="home-gallery-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">VISUAL JOURNAL</span>
              <h2>
                Gallery<span>.</span>
              </h2>
            </div>
          </div>

          <div className="home-gallery-grid">
            {gallery.slice(0, 4).map((item, index) => (
              <article
                className={`home-gallery-card ${
                  index === 0 ? "home-gallery-featured" : ""
                }`}
                key={item.id}
              >
                <div className="gallery-placeholder">
                  <span className="gallery-k">K.</span>
                  <span className="gallery-label">
                    KHULAASAA / PHOTO
                  </span>
                </div>

                <div className="home-gallery-overlay">
                  <span>PHOTO STORY</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-categories">
          {categories.map((category, index) => {
            const categoryStories = stories
              .filter(
                (story) =>
                  story.categorySlug === category.slug
              )
              .slice(0, 3);

            return (
              <div
                className="home-category-block"
                key={category.slug}
              >
                <div className="section-heading">
                  <h2>
                    {category.name}<span>.</span>
                  </h2>
                </div>

                <div className="home-category-grid">
                  {categoryStories.map((story) => (
                    <StoryCard
                      story={story}
                      key={story.id}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
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

















