"use client";

import { useEffect, useRef, useState } from "react";
import MaldivesDateTime from "./MaldivesDateTime";

export default function ArticleDesktopHeader() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollY.current;
        const difference = currentScrollY - previousScrollY;

        if (currentScrollY < 80) {
          setHidden(false);
        } else if (difference > 6) {
          setHidden(true);
        } else if (difference < -6) {
          setHidden(false);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`article-desktop-header ${
        hidden ? "article-desktop-header-hidden" : ""
      }`}
    >
      <div className="article-desktop-utility">
        <div className="article-desktop-utility-inner">
          <MaldivesDateTime />

          <a
            href="https://www.khulaasaa.com/"
            className="article-desktop-dhivehi"
          >
            Dhivehi Edition ↗
          </a>
        </div>
      </div>

      <div className="article-desktop-masthead">
        <a
          href="/en"
          className="article-desktop-brand"
          aria-label="Khulaasaa English home"
        >
          <img
            src="https://khulaasaa-english.vercel.app/logo.png"
            alt=""
            className="article-desktop-logo"
          />

          <div className="article-desktop-brand-copy">
            <strong>KHULAASAA</strong>
            <span>ENGLISH</span>
          </div>
        </a>

        <div className="article-desktop-tagline">
          Compact News. Complete Insight.
        </div>
      </div>

      <nav className="article-desktop-nav">
        <div className="article-desktop-nav-inner">
          <a href="/en">Home</a>
          <a href="/en/latest-news">Latest News</a>
          <a href="/en/world">World News</a>
          <a href="/en/reports">Reports</a>
          <a href="/en/business">Business</a>
          <a href="/en/sports">Sports</a>
          <a href="/en/local">Local</a>
          <a href="/en/gallery">Gallery</a>
        </div>
      </nav>
    </header>
  );
}