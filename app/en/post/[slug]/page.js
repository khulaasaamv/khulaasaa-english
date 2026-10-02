import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import ArticleReactions from "../../../components/ArticleReactions";
import ArticleComments from "../../../components/ArticleComments";
import PublishedTime from "../../../components/PublishedTime";
import ArticleBackLink from "../../../components/ArticleBackLink";

import {
  getEnglishArticle,
  getEnglishArticles,
} from "../../../../lib/englishApi";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getEnglishArticle(slug);

  if (!story) {
    return {
      title: "Khulaasaa English",
    };
  }

  const image =
    story.image ||
    story.main_image ||
    story.thumbnail ||
    "https://khulaasaa-english.vercel.app/logo.png";

  const url =
    `https://www.khulaasaa.com/en/post/${story.id}`;

  return {
    title: story.title,
    description:
      story.summary || "Khulaasaa English",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: story.title,
      description:
        story.summary || "Khulaasaa English",
      url,
      siteName: "Khulaasaa English",
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description:
        story.summary || "Khulaasaa English",
      images: [image],
    },
  };
}

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
        {story.categories?.[0]?.name || "News"}
      </span>
    </div>
  );
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const story = await getEnglishArticle(slug);

  if (!story) {
    notFound();
  }

  const allArticles = await getEnglishArticles(20);

  const primaryCategory =
    story.categories?.[0]?.name || "News";

  const related = allArticles
    .filter(
      (item) =>
        item.id !== story.id &&
        item.categories?.some(
          (category) =>
            category.name === primaryCategory
        )
    )
    .slice(0, 3);

  return (
    <>
      <main className="article-page">
        <div className="container article-container">

          <header className="article-site-header article-mobile-header">
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
                <summary aria-label="Open sections">
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
                    className="home-mobile-dhivehi"
                  >
                    Dhivehi edition ↗
                  </a>
                </nav>
              </details>

            </div>
          </header>

          <ArticleBackLink />

          <article className="article-main">

            <div className="article-heading">
              <span className="eyebrow">
                {primaryCategory}
              </span>

              <h1>{story.title}</h1>

              {story.summary && (
                <p className="article-summary">
                  {story.summary}
                </p>
              )}

              <div className="article-meta">
                <span>
                  By {story.author || "Khulaasaa"}
                </span>

                <span aria-hidden="true">•</span>

                <PublishedTime
                  publishedAt={story.published_at}
                />
              </div>
            </div>

            <StoryVisual story={story} />

            {story.image_caption && (
              <p className="article-image-caption">
                {story.image_caption}
              </p>
            )}

            <div
              className="article-body"
              dangerouslySetInnerHTML={{
                __html:
                  story.content ||
                  "<p>Article content is not available.</p>",
              }}
            />

            <section className="article-engagement">
              <ArticleReactions articleId={story.id} />

              <ArticleComments
                articleId={story.id}
                initialComments={story.comments || []}
              />
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
                      href={`/en/post/${item.id}`}
                      className="article-related-item"
                      key={item.id}
                    >
                      <div className="article-related-thumb">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.short_title ||
                              item.title
                            }
                          />
                        ) : (
                          <span>K.</span>
                        )}
                      </div>

                      <div className="article-related-copy">
                        <span className="eyebrow">
                          {item.categories?.[0]?.name || "News"}
                        </span>

                        <h3>
                          {item.short_title ||
                            item.title}
                        </h3>

                        <PublishedTime
                          publishedAt={
                            item.published_at
                          }
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

          </article>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}