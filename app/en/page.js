import SiteFooter from "../components/SiteFooter";
import MaldivesDateTime from "../components/MaldivesDateTime";
import { getEnglishArticles } from "../../lib/englishApi";

const navItems = [
  { name: "Home", href: "/en" },
  { name: "National", href: "/en/national" },
  { name: "Business", href: "/en/business" },
  { name: "World", href: "/en/world" },
  { name: "Sports", href: "/en/sports" },
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
        <div className="container masthead">
          <div className="brand-wrap">
            <a
              className="brand-logo-link"
              href="/en"
              aria-label="Khulaasaa English home"
            >
              <img
                src="https://khulaasaa-english.vercel.app/logo.png"
                alt="Khulaasaa English"
                className="khulaasaa-logo"
              />
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

                {navItems.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.name}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

export default async function EnglishHome() {
  const articles = await getEnglishArticles(30);

  const lead = articles[0] || null;
  const sideStories = articles.slice(1, 4);
  const moreStories = articles.slice(4, 12);

  return (
    <>
      <Header />

      <main className="kh-front-page">
        <div className="container">

          {lead ? (
            <section className="kh-front-lead">

              <div className="kh-front-lead-copy">
                <a
                  href={`/en/${articleCategory(lead).toLowerCase()}`}
                  className="kh-front-kicker"
                >
                  {articleCategory(lead)}
                </a>

                <h1 className="kh-front-headline">
                  <a href={`/en/post/${lead.id}`}>
                    {articleHeadline(lead)}
                  </a>
                </h1>

                {lead.summary && (
                  <p className="kh-front-summary">
                    {lead.summary}
                  </p>
                )}

                <div className="kh-front-time">
                  {timeAgo(lead.published_at)}
                </div>
              </div>

              <div className="kh-front-lead-media">
                <a href={`/en/post/${lead.id}`}>
                  {articleImage(lead) ? (
                    <img
                      src={articleImage(lead)}
                      alt={articleHeadline(lead)}
                    />
                  ) : (
                    <div className="kh-front-image-placeholder">
                      K.
                    </div>
                  )}
                </a>

                {lead.caption && (
                  <p className="kh-front-caption">
                    {lead.caption}
                  </p>
                )}
              </div>

              <aside className="kh-front-side">
                <div className="kh-front-side-heading">
                  Latest updates
                </div>

                {sideStories.length > 0 ? (
                  <div className="kh-front-side-list">
                    {sideStories.map((story) => (
                      <article
                        key={story.id}
                        className="kh-front-side-story"
                      >
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
                  </div>
                ) : (
                  <p className="kh-front-empty">
                    More updates coming soon.
                  </p>
                )}
              </aside>

            </section>
          ) : (
            <section className="kh-front-no-news">
              <h1>Khulaasaa English</h1>
              <p>No English articles are available yet.</p>
            </section>
          )}

          {moreStories.length > 0 && (
            <section className="kh-front-more">
              <div className="kh-front-section-title">
                <h2>More Top Stories</h2>
              </div>

              <div className="kh-front-more-grid">
                {moreStories.map((story) => (
                  <article
                    className="kh-front-card"
                    key={story.id}
                  >
                    <a
                      href={`/en/post/${story.id}`}
                      className="kh-front-card-image-link"
                    >
                      {articleImage(story) ? (
                        <img
                          src={articleImage(story)}
                          alt={articleHeadline(story)}
                          className="kh-front-card-image"
                        />
                      ) : (
                        <div className="kh-front-card-placeholder">
                          K.
                        </div>
                      )}
                    </a>

                    <div className="kh-front-card-content">
                      <span className="kh-front-card-category">
                        {articleCategory(story)}
                      </span>

                      <h3>
                        <a href={`/en/post/${story.id}`}>
                          {articleHeadline(story)}
                        </a>
                      </h3>

                      <span className="kh-front-card-time">
                        {timeAgo(story.published_at)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <SiteFooter />
    </>
  );
}