"use client";

import { usePathname } from "next/navigation";
import MaldivesDateTime from "./MaldivesDateTime";

const navItems = [
  { href: "/en", label: "Home" },
  { href: "/en/latest-news", label: "Latest News" },
  { href: "/en/world", label: "World News" },
  { href: "/en/reports", label: "Reports" },
  { href: "/en/business", label: "Business" },
  { href: "/en/sports", label: "Sports" },
  { href: "/en/local", label: "Local" },
  { href: "/en/gallery", label: "Gallery" },
];

export default function EnglishDesktopHeader() {
  const pathname = usePathname();

  // Homepage already has the exact header we want.
  if (pathname === "/en" || pathname === "/en/") {
    return null;
  }

  const isActive = (href) => {
    if (href === "/en") return false;

    if (href === "/en/gallery") {
      return pathname.startsWith("/en/gallery");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="english-global-desktop-header">
      <div className="english-global-utility">
        <div className="english-global-inner english-global-utility-inner">
          <MaldivesDateTime />

          <a
            href="https://www.khulaasaa.com/"
            className="english-global-dhivehi"
          >
            Dhivehi edition ↗
          </a>
        </div>
      </div>

      <div className="english-global-inner english-global-masthead">
        <a
          href="/en"
          className="english-global-brand"
          aria-label="Khulaasaa English home"
        >
          <img
            src="https://khulaasaa-english.vercel.app/logo.png"
            alt=""
            className="english-global-logo"
          />

          <div className="english-global-brand-text">
            <strong>KHULAASAA</strong>
            <span>ENGLISH</span>
          </div>
        </a>

        <div className="english-global-tagline">
          <span>Compact News.</span>
          <span>Complete Insight.</span>
        </div>
      </div>

      <nav className="english-global-nav">
        <div className="english-global-inner english-global-nav-inner">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}