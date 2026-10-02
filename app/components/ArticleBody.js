"use client";

import { useEffect, useRef } from "react";

const ARTICLE_API =
  "https://alpha.khulaasaa.com/api/english/articles";

export default function ArticleBody({ html }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    /* Quote + attribution */
    const quotes = Array.from(root.querySelectorAll("blockquote"));

    quotes.forEach((quote) => {
      if (quote.dataset.processed === "true") return;

      const next = quote.nextElementSibling;

      if (next?.tagName === "BLOCKQUOTE") {
        quote.dataset.processed = "true";
        next.dataset.processed = "true";

        quote.classList.add("kh-quote");

        const attribution = document.createElement("div");
        attribution.className = "kh-quote-attribution";
        attribution.textContent =
          next.textContent.trim().replace(/^[-—–]\s*/, "");

        quote.appendChild(attribution);
        next.remove();
      } else {
        quote.classList.add("kh-quote");
      }
    });

    /* Instagram */
    const instagramLinks = Array.from(
      root.querySelectorAll(
        'a[href*="instagram.com/p/"], a[href*="instagram.com/reel/"], a[href*="instagram.com/reels/"]'
      )
    );

    let hasInstagramEmbed = false;

    instagramLinks.forEach((link) => {
      if (link.dataset.instagramProcessed === "true") return;

      const url = link.href.replace(
        "https://web.facebook.com/",
        "https://www.facebook.com/"
      );
      if (!url) return;

      link.dataset.instagramProcessed = "true";
      hasInstagramEmbed = true;

      const wrapper = document.createElement("div");
      wrapper.className = "kh-instagram-embed";

      const blockquote = document.createElement("blockquote");
      blockquote.className = "instagram-media";
      blockquote.setAttribute("data-instgrm-permalink", url);
      blockquote.setAttribute("data-instgrm-version", "14");

      wrapper.appendChild(blockquote);

      const parent = link.parentElement;

      if (
        parent &&
        parent.tagName === "P" &&
        parent.textContent.trim() === link.textContent.trim()
      ) {
        parent.replaceWith(wrapper);
      } else {
        link.replaceWith(wrapper);
      }
    });

    if (hasInstagramEmbed) {
      const processInstagram = () => {
        if (window.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
        }
      };

      const existingInstagramScript = document.querySelector(
        'script[src="https://www.instagram.com/embed.js"]'
      );

      if (existingInstagramScript) {
        processInstagram();
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.instagram.com/embed.js";
        script.onload = processInstagram;
        document.body.appendChild(script);
      }
    }

        /* Facebook */
    const facebookLinks = Array.from(
      root.querySelectorAll(
        'a[href*="facebook.com/"], a[href*="fb.watch/"]'
      )
    );

    let hasFacebookEmbed = false;

    facebookLinks.forEach((link) => {
      if (link.dataset.facebookProcessed === "true") return;

      const url = link.href.replace(
        "https://web.facebook.com/",
        "https://www.facebook.com/"
      );
      if (!url) return;

      link.dataset.facebookProcessed = "true";

      const isShareUrl =
        url.includes("/share/") ||
        url.includes("web.facebook.com/share/");

      /*
       * Facebook share links are not reliable embed URLs.
       * Render a clean fallback card instead.
       */
      if (isShareUrl) {
        const card = document.createElement("a");

        card.href = url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = "kh-facebook-link-card";

        card.innerHTML = `
          <div class="kh-facebook-link-icon" aria-hidden="true">
            f
          </div>

          <div class="kh-facebook-link-copy">
            <span>FACEBOOK</span>
            <strong>View this post on Facebook</strong>
            <small>Open the original public post →</small>
          </div>
        `;

        const parent = link.parentElement;

        if (
          parent &&
          parent.tagName === "P" &&
          parent.textContent.trim() === link.textContent.trim()
        ) {
          parent.replaceWith(card);
        } else {
          link.replaceWith(card);
        }

        return;
      }

      /*
       * Canonical Facebook post/video URLs:
       * use Facebook's official embed.
       */
      hasFacebookEmbed = true;

      const wrapper = document.createElement("div");
      wrapper.className = "kh-facebook-embed";

      const embed = document.createElement("div");

      const isVideo =
        url.includes("/videos/") ||
        url.includes("/reel/") ||
        url.includes("/reels/") ||
        url.includes("fb.watch");

      embed.className = isVideo
        ? "fb-video"
        : "fb-post";

      embed.setAttribute("data-href", url);
      embed.setAttribute("data-width", "500");

      if (isVideo) {
        embed.setAttribute("data-show-text", "false");
        embed.setAttribute("data-allowfullscreen", "true");
      } else {
        embed.setAttribute("data-show-text", "true");
      }

      wrapper.appendChild(embed);

      const parent = link.parentElement;

      if (
        parent &&
        parent.tagName === "P" &&
        parent.textContent.trim() === link.textContent.trim()
      ) {
        parent.replaceWith(wrapper);
      } else {
        link.replaceWith(wrapper);
      }
    });

    if (hasFacebookEmbed) {
      const processFacebook = () => {
        if (window.FB?.XFBML?.parse) {
          window.FB.XFBML.parse(root);
        }
      };

      const existingFacebookScript =
        document.getElementById("facebook-jssdk");

      if (existingFacebookScript) {
        processFacebook();
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.src =
          "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0";
        script.id = "facebook-jssdk";
        script.onload = processFacebook;

        document.body.appendChild(script);
      }
    }

    /* YouTube */
    const youtubeLinks = Array.from(
      root.querySelectorAll(
        'a[href*="youtube.com/watch"], a[href*="youtu.be/"], a[href*="youtube.com/shorts/"]'
      )
    );

    youtubeLinks.forEach((link) => {
      if (link.dataset.youtubeProcessed === "true") return;

      const url = link.href;
      if (!url) return;

      let videoId = null;

      try {
        const parsed = new URL(url);

        if (parsed.hostname.includes("youtu.be")) {
          videoId = parsed.pathname.split("/").filter(Boolean)[0];
        } else if (parsed.pathname.startsWith("/shorts/")) {
          videoId = parsed.pathname.split("/").filter(Boolean)[1];
        } else {
          videoId = parsed.searchParams.get("v");
        }
      } catch {
        return;
      }

      if (!videoId) return;

      link.dataset.youtubeProcessed = "true";

      const wrapper = document.createElement("div");
      wrapper.className = "kh-youtube-embed";

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.title = "YouTube video";
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      wrapper.appendChild(iframe);

      const parent = link.parentElement;

      if (
        parent &&
        parent.tagName === "P" &&
        parent.textContent.trim() === link.textContent.trim()
      ) {
        parent.replaceWith(wrapper);
      } else {
        link.replaceWith(wrapper);
      }
    });
    /* X / Twitter */
    const xLinks = Array.from(
      root.querySelectorAll(
        'a[href*="x.com/"][href*="/status/"], a[href*="twitter.com/"][href*="/status/"]'
      )
    );

    let hasXEmbed = false;

    xLinks.forEach((link) => {
      if (link.dataset.xProcessed === "true") return;

      const url = link.href;
      if (!url) return;

      link.dataset.xProcessed = "true";
      hasXEmbed = true;

      const wrapper = document.createElement("div");
      wrapper.className = "kh-x-embed";

      const blockquote = document.createElement("blockquote");
      blockquote.className = "twitter-tweet";

      const anchor = document.createElement("a");
      anchor.href = url.replace(
        "https://x.com/",
        "https://twitter.com/"
      );

      blockquote.appendChild(anchor);
      wrapper.appendChild(blockquote);

      const parent = link.parentElement;

      if (
        parent &&
        parent.tagName === "P" &&
        parent.textContent.trim() === link.textContent.trim()
      ) {
        parent.replaceWith(wrapper);
      } else {
        link.replaceWith(wrapper);
      }
    });

    if (hasXEmbed) {
      const processX = () => {
        if (window.twttr?.widgets?.load) {
          window.twttr.widgets.load(root);
        }
      };

      const existingXScript = document.getElementById("twitter-wjs");

      if (existingXScript) {
        processX();
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://platform.twitter.com/widgets.js";
        script.id = "twitter-wjs";
        script.onload = processX;

        document.body.appendChild(script);
      }
    }
    /* Khulaasaa English article previews */
    const khulaasaaLinks = Array.from(
      root.querySelectorAll(
        'a[href*="khulaasaa.com/en/post/"]'
      )
    );

    khulaasaaLinks.forEach(async (link) => {
      if (link.dataset.khulaasaaProcessed === "true") return;

      const match = link.href.match(/\/en\/post\/(\d+)/);
      if (!match) return;

      const articleId = match[1];
      link.dataset.khulaasaaProcessed = "true";

      try {
        const response = await fetch(
          `${ARTICLE_API}/${articleId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) return;

        const result = await response.json();
        const article = result?.data || result;

        if (!article) return;

        const card = document.createElement("a");
        card.href = `/en/post/${article.id}`;
        card.className = "kh-related-inline-card";

        const image =
          article.image ||
          article.main_image ||
          article.thumbnail ||
          "";

        card.innerHTML = `
          ${
            image
              ? `
                <div class="kh-related-inline-image">
                  <img src="${image}" alt="${article.title || ""}" />
                </div>
              `
              : ""
          }

          <div class="kh-related-inline-copy">
            <span class="kh-related-inline-label">
              ${article.categories?.[0]?.name || "Khulaasaa"}
            </span>

            <h3>${article.title || "Read this article"}</h3>

            ${
              article.summary
                ? `<p>${article.summary}</p>`
                : ""
            }

            <span class="kh-related-inline-read">
              Read article →
            </span>
          </div>
        `;

        const parent = link.parentElement;

        if (
          parent &&
          parent.tagName === "P" &&
          parent.textContent.trim() === link.textContent.trim()
        ) {
          parent.replaceWith(card);
        } else {
          link.replaceWith(card);
        }
      } catch (error) {
        console.error("Khulaasaa preview failed:", error);
      }
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="article-body"
      dangerouslySetInnerHTML={{
        __html: html || "<p>Article content is not available.</p>",
      }}
    />
  );
}