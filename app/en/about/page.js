import SiteFooter from "../../components/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <main className="info-page">
        <div className="container info-page-inner">
          <a href="/en" className="info-back">← Home</a>

          <span className="eyebrow">KHULAASAA</span>
          <h1>About Us<span>.</span></h1>

          <div className="info-content">
            <p className="info-intro">
              We are committed to informing, engaging and empowering readers
              with diverse, reliable and unbiased content.
            </p>

            <p>
              With a focus on local and global stories, Khulaasaa aims to be
              the Maldives' trusted source for news and insights.
            </p>

            <h2>Contact</h2>

            <p>
              <strong>General Inquiries</strong><br />
              <a href="mailto:info@khulaasaa.com">
                info@khulaasaa.com
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


