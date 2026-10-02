"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "khulaasaa-english-theme";

export default function EnglishDimToggle({ className = "" }) {
  const [isDim, setIsDim] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const dim = saved === "dim";

    document.documentElement.classList.toggle("english-dim", dim);
    setIsDim(dim);
  }, []);

  function toggleDim() {
    const next =
      !document.documentElement.classList.contains("english-dim");

    document.documentElement.classList.toggle(
      "english-dim",
      next
    );

    localStorage.setItem(
      STORAGE_KEY,
      next ? "dim" : "light"
    );

    setIsDim(next);
  }

  return (
    <button
      type="button"
      className={className}
      onClick={toggleDim}
      aria-label={isDim ? "Switch to light mode" : "Switch to dim mode"}
      title={isDim ? "Light mode" : "Dim mode"}
    >
      <span className="english-dim-symbol" aria-hidden="true">
        ◐
      </span>
    </button>
  );
}