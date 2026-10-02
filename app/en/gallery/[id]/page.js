import GalleryLightbox from "../../../components/GalleryLightbox";
import SiteFooter from "../../../components/SiteFooter";
import { notFound } from "next/navigation";

async function getGallery(id) {
  try {
    const response = await fetch(
      `https://alpha.khulaasaa.com/api/galleries/${id}?language=en`,
      {
        next: { revalidate: 60 },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result?.data || result;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const gallery = await getGallery(id);

  if (!gallery) {
    return {
      title: "Gallery | Khulaasaa English",
    };
  }

  const image =
    gallery.featured_image ||
    gallery.images?.[0]?.image ||
    undefined;

  return {
    title: `${gallery.title} | Khulaasaa English`,
    description:
      gallery.summary || "Khulaasaa English photo gallery",
    openGraph: {
      title: gallery.title,
      description:
        gallery.summary || "Khulaasaa English photo gallery",
      images: image ? [image] : [],
    },
  };
}

export default async function GalleryDetailPage({ params }) {
  const { id } = await params;
  const gallery = await getGallery(id);

  if (!gallery) {
    notFound();
  }

  const images = gallery.images || [];

  return (
    <>
      <main className="gallery-detail-page">
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

          <a
            href="/en/gallery"
            className="category-back-link"
          >
            ← Gallery
          </a>
        </div>

        <header className="gallery-detail-header">
          <span className="eyebrow">
            PHOTO GALLERY
          </span>

          <h1>{gallery.title}</h1>

          {gallery.summary && (
            <p>{gallery.summary}</p>
          )}

          <div className="gallery-detail-count">
            {images.length}{" "}
            {images.length === 1 ? "photo" : "photos"}
          </div>
        </header>

        {images.length > 0 ? (
          <GalleryLightbox
            images={images}
            galleryTitle={gallery.title}
          />
        ) : (
          <div className="gallery-live-empty">
            No photos have been added to this gallery.
          </div>
        )}

      </div>
      </main>

      <SiteFooter />
    </>
  );
}