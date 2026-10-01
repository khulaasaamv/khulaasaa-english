const sections = [
  ["National", "national"],
  ["Business", "business"],
  ["World", "world"],
  ["Sports", "sports"],
];

function Placeholder({ lead = false, number = "01" }) {
  return (
    <div className={`image-placeholder ${lead ? "lead-image" : ""}`}>
      <span className="image-monogram" aria-hidden="true">K.</span>
      <span className="image-caption">ENGLISH EDITION / {number}</span>
    </div>
  );
}

function PreviewStory({ number }) {
  return (
    <article className="story-card">
      <Placeholder number={number} />
      <div className="story-copy">
        <span className="eyebrow">STORY PREVIEW</span>
        <h3>Published English headlines will appear here.</h3>
        <p className="story-meta">Khulaasaa English</p>
      </div>
    </article>
  );
}

export default function EnglishHome() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Independent perspectives. Complete insight.</span>
          <a href="https://www.khulaasaa.com/">Dhivehi edition â†—</a>
        </div>
      </div>

      <header className="site-header">
        <div className="container masthead">
          <a className="brand" href="/en" aria-label="Khulaasaa English home">
            KHULAASAA<span className="brand-dot">.</span>
            <span className="edition">ENGLISH</span>
          </a>
          <p className="tagline">Compact News.<br /><strong>Complete Insight.</strong></p>
        </div>

        <div className="nav-border">
          <div className="container navigation">
            <nav className="desktop-nav" aria-label="Main navigation">
              <a className="active" href="/en" aria-current="page">Home</a>
              {sections.map(([name, id]) => (
                <a key={id} href={`#${id}`}>{name}</a>
              ))}
            </nav>

            <details className="mobile-menu">
              <summary>Menu <span aria-hidden="true">ï¼‹</span></summary>
              <nav aria-label="Mobile navigation">
                <a href="/en">Home</a>
                {sections.map(([name, id]) => (
                  <a key={id} href={`#${id}`}>{name}</a>
                ))}
              </nav>
            </details>

            <a className="latest-link" href="#latest">
              <span className="status-dot" aria-hidden="true" />
              Latest news
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="container">
        <div className="edition-notice">
          <span className="notice-label">DESIGN PREVIEW</span>
          <p>Our English edition is taking shape. These are layout placeholders, not news reports.</p>
        </div>

        <div className="section-heading top-heading">
          <h1>The briefing<span>.</span></h1>
          <span className="section-caption">MALDIVES & BEYOND</span>
        </div>

        <div className="front-grid">
          <section className="lead-section" aria-label="Featured stories">
            <article className="lead-story">
              <Placeholder lead />
              <div className="lead-copy">
                <span className="eyebrow">THE ENGLISH EDITION</span>
                <h2>A fresh perspective.<br />The complete picture.</h2>
                <p className="lead-summary">
                  News, reporting and ideas from the Maldives and around the
                  world. The lead English story will appear here.
                </p>
                <div className="byline">
                  <span className="byline-mark" aria-hidden="true">K.</span>
                  <span>By <strong>Khulaasaa</strong></span>
                  <span className="meta-divider" aria-hidden="true" />
                  <span>Edition preview</span>
                </div>
              </div>
            </article>

            <div className="supporting-grid">
              {["02", "03", "04", "05"].map(number => (
                <PreviewStory key={number} number={number} />
              ))}
            </div>
          </section>

          <aside className="latest-panel" id="latest">
            <div className="latest-heading">
              <span className="status-dot" aria-hidden="true" />
              <h2>Latest updates</h2>
            </div>
            <p className="latest-intro">The stories that matter, as they develop.</p>

            <ol className="latest-list">
              {[
                ["National", "The latest from across the Maldives"],
                ["Business", "Business, markets and the economy"],
                ["World", "Global developments in focus"],
                ["Sports", "Results, stories and sporting moments"],
              ].map(([category, description], index) => (
                <li key={category}>
                  <span className="update-number">0{index + 1}</span>
                  <div>
                    <span className="eyebrow">{category}</span>
                    <h3>{description}</h3>
                    <span className="story-meta">Awaiting published stories</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="edition-card">
              <span className="eyebrow">OUR PROMISE</span>
              <h3>Less noise.<br />More insight.</h3>
              <p>Clear reporting. Essential context. A wider perspective.</p>
              <span className="edition-card-mark" aria-hidden="true">K.</span>
            </div>
          </aside>
        </div>

        {sections.map(([name, id], index) => (
          <section className="topic-section" id={id} key={id}>
            <div className="section-heading">
              <h2>{name}<span>.</span></h2>
              <span className="section-caption">KHULAASAA / 0{index + 1}</span>
            </div>
            <div className="topic-preview">
              <span className="topic-number" aria-hidden="true">0{index + 1}</span>
              <div>
                <h3>A closer look at {name.toLowerCase()}.</h3>
                <p>Published English stories in this section will appear here.</p>
              </div>
              <span className="topic-arrow" aria-hidden="true">â†—</span>
            </div>
          </section>
        ))}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <a className="brand footer-brand" href="/en">
              KHULAASAA<span className="brand-dot">.</span>
            </a>
            <p>Compact News. Complete Insight.</p>
          </div>
          <div className="footer-right">
            <a href="https://www.khulaasaa.com/">Visit the Dhivehi edition â†—</a>
            <span>Â© {new Date().getFullYear()} Khulaasaa</span>
          </div>
        </div>
      </footer>
    </>
  );
}

