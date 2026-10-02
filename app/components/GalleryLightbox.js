"use client";

import { useEffect, useState } from "react";

export default function GalleryLightbox({
  images = [],
  galleryTitle = "",
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;
  const activeImage =
    isOpen && images[activeIndex]
      ? images[activeIndex]
      : null;

  const open = (index) => {
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
  };

  const previous = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0
        ? images.length - 1
        : current - 1;
    });
  };

  const next = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === images.length - 1
        ? 0
        : current + 1;
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  useEffect(() => {
    if (!isOpen) return;

    let wheelLocked = false;

    const handleWheel = (event) => {
      if (wheelLocked) return;

      if (Math.abs(event.deltaY) < 20) return;

      wheelLocked = true;

      if (event.deltaY > 0) {
        next();
      } else {
        previous();
      }

      window.setTimeout(() => {
        wheelLocked = false;
      }, 350);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, images.length]);

  return (
    <>
      <div className="gallery-lightbox-grid">
        {images.map((photo, index) => (
          <button
            type="button"
            className="gallery-lightbox-trigger"
            key={photo.id || index}
            onClick={() => open(index)}
            aria-label={`Open photo ${index + 1}`}
          >
            <img
              src={photo.image}
              alt={
                photo.caption ||
                `${galleryTitle} photo ${index + 1}`
              }
            />
          </button>
        ))}
      </div>

      {isOpen && activeImage && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={close}
            aria-label="Close gallery"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                onClick={previous}
                aria-label="Previous photo"
              >
                ←
              </button>

              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                onClick={next}
                aria-label="Next photo"
              >
                →
              </button>
            </>
          )}

          <div className="gallery-lightbox-stage">
            <div className="gallery-lightbox-counter">
              {activeIndex + 1} / {images.length}
            </div>

            <img
              src={activeImage.image}
              alt={
                activeImage.caption ||
                `${galleryTitle} photo ${activeIndex + 1}`
              }
              className="gallery-lightbox-image"
            />

            {activeImage.caption && (
              <div className="gallery-lightbox-caption">
                {activeImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}