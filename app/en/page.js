import SiteFooter from "../components/SiteFooter";
import MaldivesDateTime from "../components/MaldivesDateTime";
import { getEnglishArticles } from "../../lib/englishApi";

const EDITORS_PICK_IDS = [
  16597,
  16581,
];
const navItems = [
  { name: "Home", href: "/en" },
  { name: "Latest News", href: "/en/latest-news" },
  { name: "World News", href: "/en/world" },
  { name: "Reports", href: "/en/reports" },
  { name: "Business", href: "/en/business" },
  { name: "Sports", href: "/en/sports" },
  { name: "Local", href: "/en/local" },
  { name: "Gallery", href: "/en/gallery" },
];

function articleHeadline(article) {
  return article?.short_title || article?.title || "";
}

function articleImage(article) {
  return (
    article?.image ||
    article?.main_image ||
    article?.thumbnail ||
    null
  );
}

function articleCategory(article) {
  return article?.categories?.[0]?.name || "News";
}

function normalizeCategory(value = "") {
  return value.trim().toLowerCase();
}

function timeAgo(value) {
  if (!value) return "";

  const published = new Date(value);
  const diffMs = Date.now() - published.getTime();
  const minutes = Math.max(0, Math.floor(diffMs / 60000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  }

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Indian/Maldives",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(published);
}

function Header() {
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
        <div className="home-mobile-topbar">

          <button
            type="button"
            className="home-mobile-dim"
            aria-label="Toggle dim mode"
          >
            ◐
          </button>

          <a
            href="/en"
            className="home-mobile-logo-link"
            aria-label="Khulaasaa English home"
          >
            <img
              src="https://khulaasaa-english.vercel.app/logo.png"
              alt="Khulaasaa"
              className="home-mobile-logo"
            />
          </a>

          <details className="home-mobile-sections">
            <summary aria-label="Open sections">☰</summary>

            <nav>
              <a href="/en">Home</a>
              <a href="/en/latest-news">Latest News</a>
              <a href="/en/world">World News</a>
              <a href="/en/reports">Reports</a>
              <a href="/en/business">Business</a>
              <a href="/en/sports">Sports</a>
              <a href="/en/local">Local</a>
              <a href="/en/gallery">Gallery</a>

              <a
                href="https://www.khulaasaa.com/"
                className="home-mobile-dhivehi"
              >
                Dhivehi edition ↗
              </a>
            </nav>
          </details>

        </div>
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
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={item.name === "Home" ? "active" : ""}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

function StoryCard({ story }) {
  return (
    <article className="kh-section-card">
      <a href={`/en/post/${story.id}`} className="kh-section-image-link">
        {articleImage(story) ? (
          <img
            src={articleImage(story)}
            alt={articleHeadline(story)}
            className="kh-section-image"
          />
        ) : (
          <div className="kh-section-placeholder">K.</div>
        )}
      </a>

      <span className="kh-section-card-category">
        {articleCategory(story)}
      </span>

      <h3>
        <a href={`/en/post/${story.id}`}>
          {articleHeadline(story)}
        </a>
      </h3>

      <span className="kh-section-card-time">
        {timeAgo(story.published_at)}
      </span>
    </article>
  );
}

function NewsSection({ title, articles, href }) {
  if (!articles.length) return null;

  return (
    <section className="kh-home-section">
      <div className="kh-home-section-header">
        <h2>{title}</h2>

        {href && (
          <a href={href}>
            View all →
          </a>
        )}
      </div>

      <div className="kh-home-section-grid">
        {articles.slice(0, 4).map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}

export default async function EnglishHome() {
  const articles = await getEnglishArticles(60);

  const featuredArticles = articles
    .filter((article) => Boolean(article.is_featured))
    .sort(
      (a, b) =>
        (a.featured_position ?? 999) -
        (b.featured_position ?? 999)
    );

  const lead = featuredArticles[0] || null;

  const remainingArticles = lead
    ? articles.filter((article) => article.id !== lead.id)
    : articles;

  const latestNews = lead
    ? remainingArticles.slice(0, 4)
    : articles.slice(0, 4);

  const featuredCards = featuredArticles
    .filter((article) => article.id !== lead?.id)
    .slice(0, 4);

  const editorsPicks = EDITORS_PICK_IDS
    .map((id) => articles.find((article) => article.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const categoryMatches = (names) =>
    articles.filter((article) => {
      const current = normalizeCategory(articleCategory(article));
      return names.some((name) => current === normalizeCategory(name));
    });

  const worldNews = categoryMatches([
    "World",
    "World News",
    "World news",
  ]);

  const reports = categoryMatches([
    "Report",
    "Reports",
  ]);

  const business = categoryMatches([
    "Business",
  ]);

  const sports = categoryMatches([
    "Sports",
  ]);

  const local = categoryMatches([
    "Local",
    "National",
    "News",
  ]);

  return (
    <>
      <Header />

      <main className="kh-front-page">
        <div className="container">

          {lead && (
            <section className="kh-featured-block">
              <div className="kh-featured-copy">
                <span className="kh-featured-kicker">
                  {articleCategory(lead)}
                </span>

                <h1>
                  <a href={`/en/post/${lead.id}`}>
                    {articleHeadline(lead)}
                  </a>
                </h1>

                {lead.summary && (
                  <p className="kh-featured-summary">
                    {lead.summary}
                  </p>
                )}

                <span className="kh-featured-time">
                  {timeAgo(lead.published_at)}
                </span>
              </div>

              <div className="kh-featured-image">
                <a href={`/en/post/${lead.id}`}>
                  {articleImage(lead) ? (
                    <img
                      src={articleImage(lead)}
                      alt={articleHeadline(lead)}
                    />
                  ) : (
                    <div className="kh-featured-placeholder">
                      K.
                    </div>
                  )}
                </a>


              </div>

              {featuredCards.length > 0 && (
                <section className="kh-mobile-featured-cards">
                  <div className="kh-mobile-featured-heading">
                    Editor’s Picks
                  </div>

                  <div className="kh-mobile-featured-grid">
                  {featuredCards.map((story) => (
                    <article
                      className="kh-mobile-featured-card"
                      key={story.id}
                    >
                      <a href={`/en/post/${story.id}`}>
                        {articleImage(story) ? (
                          <img
                            src={articleImage(story)}
                            alt={articleHeadline(story)}
                          />
                        ) : (
                          <div className="kh-mobile-featured-placeholder">
                            K.
                          </div>
                        )}
                      </a>

                      <span className="kh-mobile-featured-category">
                        {articleCategory(story)}
                      </span>

                      <h3>
                        <a href={`/en/post/${story.id}`}>
                          {articleHeadline(story)}
                        </a>
                      </h3>

                      <span className="kh-mobile-featured-time">
                        {timeAgo(story.published_at)}
                      </span>
                    </article>
                  ))}
                  </div>
                </section>
              )}

              <aside className="kh-featured-side">
                <div className="kh-featured-side-title">
                  Latest News
                </div>

                {latestNews.map((story) => (
                  <article key={story.id}>
                    <h2>
                      <a href={`/en/post/${story.id}`}>
                        {articleHeadline(story)}
                      </a>
                    </h2>

                    <span>
                      {timeAgo(story.published_at)}
                    </span>
                  </article>
                ))}
              </aside>
            </section>
          )}

          <div className="desktop-featured-articles">
            <NewsSection
              title="Featured Articles"
              articles={featuredCards}
            />
          </div>

          <NewsSection
            title="World News"
            articles={worldNews}
            href="/en/world"
          />

          <NewsSection
            title="Reports"
            articles={reports}
            href="/en/reports"
          />

          <NewsSection
            title="Business"
            articles={business}
            href="/en/business"
          />

          <NewsSection
            title="Sports"
            articles={sports}
            href="/en/sports"
          />

          <NewsSection
            title="Local"
            articles={local}
            href="/en/local"
          />

          <section className="kh-home-section kh-gallery-section">
            <div className="kh-home-section-header">
              <h2>Gallery</h2>

              <a href="/en/gallery">
                View gallery →
              </a>
            </div>

            <div className="kh-gallery-placeholder">
              <a href="/en/gallery">
                View the latest Khulaasaa photo galleries
              </a>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}