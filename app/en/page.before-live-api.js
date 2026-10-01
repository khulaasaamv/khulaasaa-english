import SiteFooter from "../components/SiteFooter";
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
        <h3><a href={`/en/post/${story.slug}`}>{story.title}</a></h3>
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
                src="https://khulaasaa-english.vercel.app/logo.png"
                alt="Khulaasaa"
                className="khulaasaa-logo"
              />

              <div className="brand-text-wrap">
                <span className="brand">KHULAASAA</span>
                <span className="edition-badge">ENGLISH</span>
              </div>
            </a>
          </div>

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
                Sections <span>＋</span>
              </summary>

              <nav>
                <a
                  href="https://www.khulaasaa.com/"
                  className="mobile-edition-switch"
                >
                  <span>Switch to Dhivehi edition</span>
                  <span className="edition-arrow">↗</span>
                </a>
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
    <h2><a href={`/en/post/${leadStory.slug}`}>{leadStory.title}</a></h2>
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
                    <h3><a href={`/en/post/${story.slug}`}>{story.title}</a></h3>
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
                  
                </div>

                <div className="home-gallery-overlay">
                  
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

      <SiteFooter />
    </>
  );
}



























