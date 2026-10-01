"use client";

import { useEffect, useState } from "react";

export default function MaldivesDateTime() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Indian/Maldives",
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      setDateTime(formatted);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="maldives-date-time">
      {dateTime || "Maldives Time"}
    </span>
  );
}
