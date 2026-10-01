import { notFound } from "next/navigation";
import { stories } from "../../../../data/stories";
import SiteFooter from "../../../components/SiteFooter";
import PublishedTime from "../../../components/PublishedTime";
import ArticleReactions from "../../../components/ArticleReactions";

function StoryVisual({ story }) {
  if (story.image) {
    return (
      <img
        src={story.image}
        alt={story.title}
        className="article-cover-image"
      />
    );
  }

  return (
    <div className="article-cover-placeholder">
      <span className="article-cover-k">K.</span>
      <span className="article-cover-category">
        {story.category}
      </span>
    </div>
  );
}

export function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const story = stories.find(
    (item) => item.slug === slug
  );

  if (!story) {
    notFound();
  }

  const related = stories
    .filter(
      (item) =>
        item.id !== story.id &&
        item.categorySlug === story.categorySlug
    )
    .slice(0, 3);

  return (
    <>
      <main className="article-page">
        <div className="container article-container">

          <header className="article-site-header article-mobile-header">
  <button
    type="button"
    className="mobile-search-button"
    aria-label="Search"
  >
    <span aria-hidden="true">⌕</span>
  </button>
  <details className="mobile-menu article-sections-menu">
    <summary aria-label="Open sections"><span>＋</span></summary>

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
    className="article-logo-link article-centered-logo"
    aria-label="Khulaasaa English"
  >
    <img
      src="https://khulaasaa-english.vercel.app/logo.png"
      alt="Khulaasaa"
      className="article-logo"
    />
  </a>
</header>

          <article className="article-main">
            <div className="article-heading">
              <span className="eyebrow">
                {story.category}
              </span>

              <h1>{story.title}</h1>

              <p className="article-summary">
                {story.summary}
              </p>

              <div className="article-meta">
                <span>
                  By <strong>Khulaasaa</strong>
                </span>

                <span className="article-meta-dot" />

                <PublishedTime publishedAt={story.publishedAt} fallback={story.time} />
              </div>
            </div>

            <StoryVisual story={story} />

            <div className="article-body">
              <p>
                This is the article body area for the English edition.
                The full translated or originally written English story
                will appear here.
              </p>

              <p>
                Khulaasaa English will use this layout for complete
                reporting, context, quotes and additional information
                related to each story.
              </p>

              <p>
                Once the English content source is connected, this page
                will load the full article automatically based on the
                story slug.
              </p>
            </div>
          </article>

                              <section className="article-engagement">
            <ArticleReactions />

            <div className="article-comments">
              <div className="comments-heading">
                <h2>Comments</h2>
                <span>0 comments</span>
              </div>

              <form className="comment-form">
                <input
                  type="text"
                  placeholder="Your name"
                  aria-label="Your name"
                />

                <textarea
                  placeholder="Write a comment..."
                  aria-label="Write a comment"
                  rows="4"
                />

                <button type="submit">
                  Post comment
                </button>
              </form>

              <div className="comments-empty">
                Be the first to comment on this story.
              </div>
            </div>
          </section>
{related.length > 0 && (
            <section className="article-related">
              <div className="section-heading">
                <h2>
                  Related Stories<span>.</span>
                </h2>
              </div>

              <div className="article-related-list">
                {related.map((item) => (
                  <a
                    href={`/en/post/${item.slug}`}
                    className="article-related-item"
                    key={item.id}
                  >
                    <div className="article-related-thumb">
                      <span>K.</span>
                    </div>

                    <div className="article-related-copy">
                      <span className="eyebrow">
                        {item.category}
                      </span>

                      <h3>{item.title}</h3>

                      <span className="story-meta">
                        {item.time}
                      </span>
                    </div>
                  </a>
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










