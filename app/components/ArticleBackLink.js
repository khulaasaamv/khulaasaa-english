"use client";

import { useEffect, useState } from "react";

const CATEGORY_NAMES = {
  "/en/latest-news": "Latest News",
  "/en/world": "World News",
  "/en/reports": "Reports",
  "/en/business": "Business",
  "/en/sports": "Sports",
  "/en/local": "Local",
  "/en/gallery": "Gallery",
};

export default function ArticleBackLink() {
  const [backLink, setBackLink] = useState({
    href: "/en",
    label: "Home",
  });

  useEffect(() => {
    try {
      if (!document.referrer) return;

      const previous = new URL(document.referrer);

      if (previous.origin !== window.location.origin) return;

      const pathname = previous.pathname.replace(/\/$/, "");

      if (CATEGORY_NAMES[pathname]) {
        setBackLink({
          href: pathname,
          label: CATEGORY_NAMES[pathname],
        });
        return;
      }

      if (pathname === "/en") {
        setBackLink({
          href: "/en",
          label: "Home",
        });
      }
    } catch {
      // Default to English home.
    }
  }, []);

  return (
    <a
      href={backLink.href}
      className="article-back-link"
    >
      <span aria-hidden="true">←</span>
      <span>{backLink.label}</span>
    </a>
  );
}