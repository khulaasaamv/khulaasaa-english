"use client";

import { useEffect, useState } from "react";

const API_BASE =
  "https://alpha.khulaasaa.com/api/english/articles";

const reactionOptions = [
  {
    id: "love",
    apiId: "smile",
    emoji: "❤️",
    label: "Love",
  },
  {
    id: "wow",
    apiId: "laugh",
    emoji: "😮",
    label: "Wow",
  },
  {
    id: "cry",
    apiId: "worried",
    emoji: "😢",
    label: "Cry",
  },
  {
    id: "angry",
    apiId: "angry",
    emoji: "😡",
    label: "Angry",
  },
];

const apiToUi = {
  smile: "love",
  laugh: "wow",
  worried: "cry",
  angry: "angry",
};

function getFingerprint() {
  const storageKey = "khulaasaa_reaction_fingerprint";

  let existing = window.localStorage.getItem(storageKey);

  if (existing) {
    return existing;
  }

  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);

  const fingerprint = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  window.localStorage.setItem(storageKey, fingerprint);

  return fingerprint;
}

function emptyCounts() {
  return {
    love: 0,
    wow: 0,
    cry: 0,
    angry: 0,
  };
}

function convertCounts(apiCounts = {}) {
  return {
    love: Number(apiCounts.smile || 0),
    wow: Number(apiCounts.laugh || 0),
    cry: Number(apiCounts.worried || 0),
    angry: Number(apiCounts.angry || 0),
  };
}

export default function ArticleReactions({ articleId }) {
  const [counts, setCounts] = useState(emptyCounts());
  const [selected, setSelected] = useState(null);
  const [fingerprint, setFingerprint] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadReactions() {
      try {
        const fp = getFingerprint();

        setFingerprint(fp);

        const response = await fetch(
          `${API_BASE}/${articleId}/reactions?fingerprint=${encodeURIComponent(fp)}`,
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load reactions");
        }

        const result = await response.json();

        if (cancelled) return;

        setCounts(convertCounts(result?.data?.counts));
        setSelected(
          result?.data?.selected
            ? apiToUi[result.data.selected] || null
            : null
        );
      } catch (error) {
        console.error("Failed to load reactions:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReactions();

    return () => {
      cancelled = true;
    };
  }, [articleId]);

  const total = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0
  );

  const percentage = (id) => {
    if (total === 0) return 0;

    return Math.round((counts[id] / total) * 100);
  };

  async function react(reaction) {
    if (!fingerprint || saving) return;

    try {
      setSaving(true);

      const response = await fetch(
        `${API_BASE}/${articleId}/reactions`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reaction_type: reaction.apiId,
            fingerprint,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to save reaction"
        );
      }

      setCounts(convertCounts(result?.data?.counts));

      setSelected(
        result?.data?.selected
          ? apiToUi[result.data.selected] || reaction.id
          : reaction.id
      );
    } catch (error) {
      console.error("Failed to save reaction:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="article-reactions">
      <div className="reaction-heading">
        <span className="reaction-label">
          React to this story
        </span>

        {total > 0 && (
          <span className="reaction-total">
            {total} {total === 1 ? "reaction" : "reactions"}
          </span>
        )}
      </div>

      <div
        className={`reaction-buttons ${
          selected ? "reaction-results-visible" : ""
        }`}
      >
        {reactionOptions.map((reaction) => (
          <button
            key={reaction.id}
            type="button"
            disabled={loading || saving}
            className={
              selected === reaction.id
                ? "reaction-button selected"
                : "reaction-button"
            }
            onClick={() => react(reaction)}
          >
            <span className="reaction-emoji">
              {reaction.emoji}
            </span>

            <span className="reaction-name">
              {reaction.label}
            </span>

            {selected && (
              <strong className="reaction-percentage">
                {percentage(reaction.id)}%
              </strong>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}