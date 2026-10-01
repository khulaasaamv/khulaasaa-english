import SiteFooter from "../../components/SiteFooter";

export default function EditorialPolicyPage() {
  return (
    <>
      <main className="info-page">
        <div className="container info-page-inner">
          <a href="/en" className="info-back">← Home</a>

          <span className="eyebrow">POLICY</span>
          <h1>Editorial Policy<span>.</span></h1>

          <div className="info-content">
            <p className="info-intro">
              Khulaasaa is committed to reliable and responsible journalism.
            </p>

            <p>
              The complete English editorial policy is being prepared.
              For the currently published information, please refer to
              the main Khulaasaa website.
            </p>

            <a
              className="info-external-link"
              href="https://www.khulaasaa.com/"
            >
              Visit Khulaasaa ↗
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}


