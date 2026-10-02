import EnglishDimToggle from "../components/EnglishDimToggle";
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


async function getEnglishGalleries() {
  try {
    const response = await fetch(
      "https://alpha.khulaasaa.com/api/galleries?language=en",
      {
        next: { revalidate: 60 },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) return [];

    const result = await response.json();

    return Array.isArray(result)
      ? result
      : result?.data || [];
  } catch {
    return [];
  }
}
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

          <EnglishDimToggle className="home-mobile-dim" />

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
  const galleries = await getEnglishGalleries();
  const latestGallery = galleries[0] || null;
  const sideGalleries = galleries.slice(1, 4);
  const remainingGalleries = galleries.slice(4);
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
              title="Editor's Picks"
              articles={featuredCards}
            />
          </div>

          
          <section className="kh-home-section kh-gallery-section">
            <div className="kh-home-section-header">
              <h2>Gallery</h2>

              <a href="/en/gallery">
                View gallery →
              </a>
            </div>

            {latestGallery ? (
              <>
                <div className="kh-home-gallery-feature-layout">

                  <a
                    href={`/en/gallery/${latestGallery.id}`}
                    className="kh-home-gallery-card kh-home-gallery-main"
                  >
                    <div className="kh-home-gallery-image">
                      {latestGallery.featured_image ? (
                        <img
                          src={latestGallery.featured_image}
                          alt={latestGallery.title}
                        />
                      ) : (
                        <div className="kh-home-gallery-fallback">
                          K.
                        </div>
                      )}
                    </div>

                    <div className="kh-home-gallery-copy">
                      <span className="kh-home-gallery-label">
                        LATEST GALLERY
                      </span>

                      <h3>{latestGallery.title}</h3>

                      {latestGallery.summary && (
                        <p className="kh-home-gallery-summary">
                          {latestGallery.summary}
                        </p>
                      )}

                      <div className="kh-home-gallery-meta">
                        {latestGallery.images?.length || 0}{" "}
                        {(latestGallery.images?.length || 0) === 1
                          ? "photo"
                          : "photos"}
                      </div>
                    </div>
                  </a>

                  {sideGalleries.length > 0 && (
                    <div className="kh-home-gallery-side">
                      {sideGalleries.map((gallery) => (
                        <a
                          href={`/en/gallery/${gallery.id}`}
                          className="kh-home-gallery-side-card"
                          key={gallery.id}
                        >
                          <div className="kh-home-gallery-side-image">
                            {gallery.featured_image ? (
                              <img
                                src={gallery.featured_image}
                                alt={gallery.title}
                              />
                            ) : (
                              <div className="kh-home-gallery-fallback">
                                K.
                              </div>
                            )}
                          </div>

                          <div className="kh-home-gallery-side-copy">
                            <span>
                              {gallery.images?.length || 0}{" "}
                              {(gallery.images?.length || 0) === 1
                                ? "photo"
                                : "photos"}
                            </span>

                            <h3>{gallery.title}</h3>

                            {gallery.summary && (
                              <p>{gallery.summary}</p>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {remainingGalleries.length > 0 && (
                  <div className="kh-home-gallery-grid">
                    {remainingGalleries.map((gallery) => (
                      <a
                        href={`/en/gallery/${gallery.id}`}
                        className="kh-home-gallery-small"
                        key={gallery.id}
                      >
                        <div className="kh-home-gallery-small-image">
                          {gallery.featured_image ? (
                            <img
                              src={gallery.featured_image}
                              alt={gallery.title}
                            />
                          ) : (
                            <div className="kh-home-gallery-fallback">
                              K.
                            </div>
                          )}
                        </div>

                        <div className="kh-home-gallery-small-copy">
                          <span>
                            {gallery.images?.length || 0}{" "}
                            {(gallery.images?.length || 0) === 1
                              ? "photo"
                              : "photos"}
                          </span>

                          <h3>{gallery.title}</h3>

                          {gallery.summary && (
                            <p>{gallery.summary}</p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="kh-gallery-placeholder">
                <a href="/en/gallery">
                  View the latest Khulaasaa photo galleries
                </a>
              </div>
            )}
          </section>

          <NewsSection
            title="Local"
            articles={local}
            href="/en/local"
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
            title="World News"
            articles={worldNews}
            href="/en/world"
          />

          <NewsSection
            title="Sports"
            articles={sports}
            href="/en/sports"
          />


        </div>
      </main>

      <SiteFooter />
    </>
  );
}