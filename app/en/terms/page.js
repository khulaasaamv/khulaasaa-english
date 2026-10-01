import SiteFooter from "../../components/SiteFooter";

export default function TermsPage() {
  return (
    <>
      <main className="info-page">
        <div className="container info-page-inner">
          <a href="/en" className="info-back">← Home</a>

          <span className="eyebrow">LEGAL</span>
          <h1>Terms<span>.</span></h1>

          <div className="info-content">
            <p className="info-intro">
              These terms govern access to and use of Khulaasaa's
              digital services.
            </p>

            <p>
              The complete English terms are being prepared. Please refer
              to the main Khulaasaa website for the currently published
              information.
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
