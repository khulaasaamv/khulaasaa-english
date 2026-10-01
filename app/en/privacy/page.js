import SiteFooter from "../../components/SiteFooter";

export default function PrivacyPage() {
  return (
    <>
      <main className="info-page">
        <div className="container info-page-inner">
          <a href="/en" className="info-back">← Home</a>

          <span className="eyebrow">POLICY</span>
          <h1>Privacy Policy<span>.</span></h1>

          <div className="info-content">
            <p className="info-intro">
              Khulaasaa's privacy policy applies to the use of our
              websites and digital services.
            </p>

            <p>
              The full English policy is being prepared. For the current
              published policy, please refer to the main Khulaasaa website.
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


