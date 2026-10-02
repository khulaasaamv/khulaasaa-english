import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import { getEnglishArticles } from "../../../lib/englishApi";

const sections = {
  "latest-news": {
    name: "Latest News",
    aliases: [],
  },

  world: {
    name: "World News",
    aliases: ["world news", "world"],
  },

  reports: {
    name: "Reports",
    aliases: ["reports", "report"],
  },

  business: {
    name: "Business",
    aliases: ["business"],
  },

  sports: {
    name: "Sports",
    aliases: ["sports", "sport"],
  },

  local: {
    name: "Local",
    aliases: ["local", "national", "news"],
  },
};

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

function normalize(value = "") {
  return String(value).trim().toLowerCase();
}

function headline(article) {
  return article?.short_title || article?.title || "";
}

function image(article) {
  return (
    article?.image ||
    article?.main_image ||
    article?.thumbnail ||
    null
  );
}

function categoryName(article) {
  return article?.categories?.[0]?.name || "News";
}

function formatPublished(value) {
  if (!value) return "";

  const date = new Date(value);
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);

  if (minutes < 1) return "Just now";

  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  }

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Indian/Maldives",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function generateStaticParams() {
  return Object.keys(sections).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const section = sections[category];

  if (!section) {
    notFound();
  }

  const articles = await getEnglishArticles(100);

  const sectionArticles =
    category === "latest-news"
      ? articles
      : articles.filter((article) => {
          const articleCategories = (article.categories || []).map(
            (item) => normalize(item.name)
          );

          return section.aliases.some((alias) =>
            articleCategories.includes(normalize(alias))
          );
        });

  const lead = sectionArticles[0] || null;
  const remaining = sectionArticles.slice(1);

  return (
    <>
<div className="category-mobile-topbar">
  <button
    type="button"
    className="category-mobile-dim"
    aria-label="Toggle dim mode"
  >
    ◐
  </button>

  <a
    href="/en"
    className="category-mobile-logo-link"
    aria-label="Khulaasaa English home"
  >
    <img
      src="https://khulaasaa-english.vercel.app/logo.png"
      alt="Khulaasaa"
      className="category-mobile-logo"
    />
  </a>

  <details className="category-mobile-sections">
    <summary aria-label="Open categories">
      ☰
    </summary>

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
        className="category-mobile-edition"
      >
        Dhivehi edition ↗
      </a>
    </nav>
  </details>
</div>
<main className="category-page">
        <div className="container">

          <a href="/en" className="category-desktop-back">← Home</a>

        <header className="category-hero-header">
            <div>
<h1>
                {section.name}<span>.</span>
              </h1>
            </div>
          </header>

          {lead ? (
            <>
              <section className="category-lead">
                <a href={`/en/post/${lead.id}`}>
                  {image(lead) ? (
                    <img
                      src={image(lead)}
                      alt={headline(lead)}
                      className="category-lead-image"
                    />
                  ) : (
                    <div className="category-placeholder category-lead-image">
                      K.
                    </div>
                  )}
                </a>

                <div className="category-lead-copy">
                  <span className="eyebrow">
                    {categoryName(lead)}
                  </span>

                  <h2>
                    <a href={`/en/post/${lead.id}`}>
                      {headline(lead)}
                    </a>
                  </h2>

                  {lead.summary && (
                    <p>{lead.summary}</p>
                  )}

                  <div className="category-story-meta">
                    <span>{lead.author || "Khulaasaa"}</span>
                    <span>{formatPublished(lead.published_at)}</span>
                  </div>
                </div>
              </section>

              <section className="category-story-grid">
                {remaining.map((story) => (
                  <article
                    className="category-story-card"
                    key={story.id}
                  >
                    <a href={`/en/post/${story.id}`}>
                      {image(story) ? (
                        <img
                          src={image(story)}
                          alt={headline(story)}
                          className="category-card-image"
                        />
                      ) : (
                        <div className="category-placeholder category-card-image">
                          K.
                        </div>
                      )}
                    </a>

                    <div>
                      <span className="eyebrow">
                        {categoryName(story)}
                      </span>

                      <h2>
                        <a href={`/en/post/${story.id}`}>
                          {headline(story)}
                        </a>
                      </h2>

                      {story.summary && (
                        <p>{story.summary}</p>
                      )}

                      <span className="story-meta">
                        {formatPublished(story.published_at)}
                      </span>
                    </div>
                  </article>
                ))}
              </section>
            </>
          ) : (
            <section className="category-empty">
              <h2>No stories published in {section.name} yet.</h2>
              <p>
                Stories will appear here automatically when English
                articles are published under this section.
              </p>
            </section>
          )}

        </div>
      </main>

      <SiteFooter />
    </>
  );
}