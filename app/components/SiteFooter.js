import FooterPolicyModal from "./FooterPolicyModal";
export default function SiteFooter() {
  return (
    <footer className="site-footer simple-footer">
      <div className="container simple-footer-inner">

        <div className="simple-footer-divider" />

        <section className="footer-follow">
          <h3>Follow Khulaasaa on:</h3>

          <div className="footer-social-row">
  <a href="https://x.com/khulaasaanews" aria-label="X" target="_blank" rel="noopener noreferrer" title="X">
    <img src="https://khulaasaa-english.vercel.app/icons/Twitter.svg" alt="X" />
  </a>

  <a href="https://facebook.com/khulaasaa" aria-label="Facebook" target="_blank" rel="noopener noreferrer" title="Facebook">
    <img src="https://khulaasaa-english.vercel.app/icons/Facebook.svg" alt="Facebook" />
  </a>

  <a href="https://instagram.com/khulaasaanews" aria-label="Instagram" target="_blank" rel="noopener noreferrer" title="Instagram">
    <img src="https://khulaasaa-english.vercel.app/icons/Instagram.svg" alt="Instagram" />
  </a>

  <a href="https://youtube.com/@khulaasaa" aria-label="YouTube" target="_blank" rel="noopener noreferrer" title="YouTube">
    <img src="https://khulaasaa-english.vercel.app/icons/Youtube.svg" alt="YouTube" />
  </a>

  <a href="https://tiktok.com/@khulaasaa" aria-label="TikTok" target="_blank" rel="noopener noreferrer" title="TikTok">
    <img src="https://khulaasaa-english.vercel.app/icons/Tiktok.svg" alt="TikTok" />
  </a>

  <a href="https://t.me/khulaasaanews" aria-label="Telegram" target="_blank" rel="noopener noreferrer" title="Telegram">
    <img src="https://khulaasaa-english.vercel.app/icons/Telegram.svg" alt="Telegram" />
  </a>
</div>
        </section>

        <section className="footer-contacts">
          <p>
            <strong>Marketing:</strong>{" "}
            <a href="mailto:marketing@khulaasaa.com">
              marketing@khulaasaa.com
            </a>
          </p>

          <p>
            <strong>General Inquiries:</strong>{" "}
            <a href="mailto:info@khulaasaa.com">
              info@khulaasaa.com
            </a>
          </p>

          <p>
            <strong>Careers:</strong>{" "}
            <a href="mailto:jobs@khulaasaa.com">
              jobs@khulaasaa.com
            </a>
          </p>

          <p>
            <strong>WhatsApp:</strong>{" "}
            <a href="https://wa.me/9609770199">
              +960 9770199
            </a>
          </p>
        </section>

        <FooterPolicyModal />

        <div className="simple-footer-divider" />

        <div className="footer-copyright">
          © {new Date().getFullYear()} Khulaasaa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}









