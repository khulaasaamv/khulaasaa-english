"use client";

import { useState } from "react";

export default function ArticleShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  }

  return (
    <button
      type="button"
      className="article-share-button"
      onClick={handleShare}
      aria-label="Share this article"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M18 8a3 3 0 1 0-2.83-4A3 3 0 0 0 15 5c0 .25.03.48.08.71L8.91 9.29A3 3 0 0 0 7 8.6a3 3 0 1 0 1.91 5.31l6.17 3.58A3 3 0 0 0 15 18a3 3 0 1 0 .91-2.15l-6.18-3.59c.04-.21.07-.43.07-.66 0-.23-.03-.45-.07-.66l6.18-3.59A3 3 0 0 0 18 8Z"
          fill="currentColor"
        />
      </svg>

      <span>{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}