"use client";

import { useEffect } from "react";

export default function EnglishThemeBoot() {
  useEffect(() => {
    const saved = localStorage.getItem("khulaasaa-english-theme");

    document.documentElement.classList.toggle(
      "english-dim",
      saved === "dim"
    );
  }, []);

  return null;
}