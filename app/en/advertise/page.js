import SiteFooter from "../../components/SiteFooter";

export default function AdvertisePage() {
  return (
    <>
      <main className="info-page">
        <div className="container info-page-inner">
          <a href="/en" className="info-back">← Home</a>

          <span className="eyebrow">KHULAASAA MEDIA</span>
          <h1>Advertise<span>.</span></h1>

          <div className="info-content">
            <p className="info-intro">
              Interested in advertising or partnering with Khulaasaa?
            </p>

            <p>
              Contact our marketing team to discuss advertising,
              sponsorship and commercial opportunities.
            </p>

            <p>
              <strong>Marketing</strong><br />
              <a href="mailto:marketing@khulaasaa.com">
                marketing@khulaasaa.com
              </a>
            </p>

            <p>
              <strong>WhatsApp</strong><br />
              <a href="https://wa.me/9609770199">
                +960 9770199
              </a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}


