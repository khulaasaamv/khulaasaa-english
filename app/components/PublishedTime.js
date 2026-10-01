"use client";

import { useEffect, useState } from "react";

export default function PublishedTime({
  publishedAt,
  fallback = "",
}) {
  const [display, setDisplay] = useState(fallback);

  useEffect(() => {
    if (!publishedAt) {
      setDisplay(fallback);
      return;
    }

    const update = () => {
      const published = new Date(publishedAt);
      const now = new Date();

      const diffMs = now.getTime() - published.getTime();
      const diffMinutes = Math.max(
        0,
        Math.floor(diffMs / 60000)
      );

      const diffHours = Math.floor(diffMinutes / 60);

      if (diffMinutes < 1) {
        setDisplay("Just now");
        return;
      }

      if (diffMinutes < 60) {
        setDisplay(
          `${diffMinutes} min${diffMinutes === 1 ? "" : "s"} ago`
        );
        return;
      }

      if (diffHours < 24) {
        setDisplay(
          `${diffHours} hr${diffHours === 1 ? "" : "s"} ago`
        );
        return;
      }

      const datePart = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Indian/Maldives",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(published);

      const timePart = new Intl.DateTimeFormat("en-US", {
        timeZone: "Indian/Maldives",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(published);

      setDisplay(`${datePart} · ${timePart}`);
    };

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [publishedAt, fallback]);

  return (
    <time dateTime={publishedAt || undefined}>
      {display}
    </time>
  );
}


