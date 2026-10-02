"use client";

import { useEffect, useState } from "react";

const categoryLabels = {
  "latest-news": "Latest News",
  world: "World News",
  reports: "Reports",
  business: "Business",
  sports: "Sports",
  local: "Local",
  gallery: "Gallery",
};

export default function ArticleBackLink() {
  const [target, setTarget] = useState({
    href: "/en",
    label: "Home",
  });

  useEffect(() => {
    try {
      if (!document.referrer) return;

      const referrer = new URL(document.referrer);

      if (referrer.origin !== window.location.origin) {
        return;
      }

      const path = referrer.pathname.replace(/\/+$/, "");

      if (path === "/en") {
        setTarget({
          href: "/en",
          label: "Home",
        });
        return;
      }

      const match = path.match(/^\/en\/([^/]+)$/);

      if (match) {
        const slug = match[1];

        if (categoryLabels[slug]) {
          setTarget({
            href: `/en/${slug}`,
            label: categoryLabels[slug],
          });
        }
      }
    } catch {
      // Default remains Home.
    }
  }, []);

  return (
    <a href={target.href} className="article-context-back">
      <span aria-hidden="true">←</span>
      <span>{target.label}</span>
    </a>
  );
}