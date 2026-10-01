import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import { getEnglishArticles } from "../../../lib/englishApi";

const categories = [
  { name: "National", slug: "national" },
  { name: "Business", slug: "business" },
  { name: "World", slug: "world" },
  { name: "Sports", slug: "sports" },
];

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

  const liveArticles = await getEnglishArticles(
    30,
    currentCategory.name
  );

  const categoryStories = liveArticles.map((article) => ({
    id: article.id,
    slug: String(article.id),
    category: article.categories?.[0]?.name || currentCategory.name,
    title: article.short_title || article.title,
    fullTitle: article.title,
    summary: article.summary || "",
    image: article.image || article.main_image || article.thumbnail || null,
    time: "Latest",
    publishedAt: article.published_at,
  }));

  const lead = categoryStories[0];
  const remaining = categoryStories.slice(1);

  return (
    <>
      <main className="category-page">
        <div className="container">

          <div className="category-brand-header category-mobile-header">
            <button
              type="button"
              className="mobile-search-button"
              aria-label="Search"
            >
              <span aria-hidden="true">⌕</span>
            </button>

            <details className="mobile-menu category-sections-menu">
              <summary aria-label="Open sections">
                <span>＋</span>
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
                <a href="/en/national">National</a>
                <a href="/en/business">Business</a>
                <a href="/en/world">World</a>
                <a href="/en/sports">Sports</a>
                <a href="/en/gallery">Gallery</a>
              </nav>
            </details>

            <a
              href="/en"
              className="category-brand-link category-centered-logo"
              aria-label="Khulaasaa English home"
            >
              <img
                src="https://khulaasaa-english.vercel.app/logo.png"
                alt="Khulaasaa"
                className="category-brand-logo"
              />
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

          {lead ? (
            <>
              <section className="category-lead">
                <StoryVisual story={lead} large />

                <div className="category-lead-copy">
                  <span className="eyebrow">
                    {lead.category}
                  </span>

                  <h2>
                    <a href={`/en/post/${lead.id}`}>
                      {lead.title}
                    </a>
                  </h2>

                  <p>{lead.summary}</p>

                  <div className="category-story-meta">
                    <span>Khulaasaa</span>
                    <span>{lead.time}</span>
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
                      <StoryVisual story={story} />
                    </a>

                    <div>
                      <span className="eyebrow">
                        {story.category}
                      </span>

                      <h2>
                        <a href={`/en/post/${story.id}`}>
                          {story.title}
                        </a>
                      </h2>

                      <p>{story.summary}</p>

                      <span className="story-meta">
                        {story.time}
                      </span>
                    </div>
                  </article>
                ))}
              </section>
            </>
          ) : (
            <div className="category-empty">
              <p>No articles are available in this section yet.</p>
            </div>
          )}

        </div>
      </main>

      <SiteFooter />
    </>
  );
}