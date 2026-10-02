import EnglishDimToggle from "../../components/EnglishDimToggle";
import SiteFooter from "../../components/SiteFooter";
const API_URL = "https://alpha.khulaasaa.com/api/galleries?language=en";

async function getEnglishGalleries() {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) return [];

    const result = await response.json();

    return Array.isArray(result)
      ? result
      : result?.data || [];
  } catch {
    return [];
  }
}

function getCover(item) {
  return (
    item.featured_image ||
    item.featured_image_url ||
    item.images?.[0]?.image ||
    null
  );
}

export default async function GalleryPage() {
  const galleries = await getEnglishGalleries();

  const featured = galleries[0] || null;
  const remaining = galleries.slice(1);

  return (
    <>
      <main className="gallery-page">
      <div className="category-mobile-topbar gallery-category-mobile-header">
        <EnglishDimToggle className="category-mobile-dim" />

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

      <div className="container">

        <div className="category-brand-header">
          <div className="category-brand-left">
            <a
              href="/en"
              className="category-brand-link"
              aria-label="Khulaasaa English home"
            >
              <img
                src="https://khulaasaa-english.vercel.app/logo.png"
                alt="Khulaasaa"
                className="category-brand-logo"
              />
            </a>
          </div>

          <a href="/en" className="category-back-link">
            ← Home
          </a>
        </div>

        <a href="/en" className="category-desktop-back">← Home</a>

        <header className="category-hero-header gallery-category-header">
  <div>
    <h1>
      Gallery<span>.</span>
    </h1>
  </div>
</header>

        {!featured ? (
          <section className="gallery-live-empty">
            <h2>No galleries published yet.</h2>
          </section>
        ) : (
          <>
            <a
              href={`/en/gallery/${featured.id}`}
              className="gallery-modern-feature"
            >
              <div className="gallery-modern-feature-image">
                {getCover(featured) ? (
                  <img
                    src={getCover(featured)}
                    alt={featured.title}
                  />
                ) : (
                  <div className="gallery-placeholder">
                    <span className="gallery-k">K.</span>
                  </div>
                )}
              </div>

              <div className="gallery-modern-feature-copy">
                <span className="eyebrow">
                  LATEST GALLERY
                </span>

                <h2>{featured.title}</h2>

                {featured.summary && (
                  <p>{featured.summary}</p>
                )}

                <div className="gallery-modern-meta">
                  <span>
                    {featured.images?.length || 0}{" "}
                    {(featured.images?.length || 0) === 1
                      ? "photo"
                      : "photos"}
                  </span>

                  <span>View gallery →</span>
                </div>
              </div>
            </a>

            {remaining.length > 0 && (
              <section className="gallery-modern-grid">
                {remaining.map((item) => (
                  <a
                    href={`/en/gallery/${item.id}`}
                    className="gallery-modern-card"
                    key={item.id}
                  >
                    <div className="gallery-modern-card-image">
                      {getCover(item) ? (
                        <img
                          src={getCover(item)}
                          alt={item.title}
                        />
                      ) : (
                        <div className="gallery-placeholder">
                          <span className="gallery-k">K.</span>
                        </div>
                      )}
                    </div>

                    <div className="gallery-modern-card-copy">
                      <span>
                        {item.images?.length || 0}{" "}
                        {(item.images?.length || 0) === 1
                          ? "photo"
                          : "photos"}
                      </span>

                      <h3>{item.title}</h3>
                    </div>
                  </a>
                ))}
              </section>
            )}
          </>
        )}

      </div>
      </main>

      <SiteFooter />
    </>
  );
}