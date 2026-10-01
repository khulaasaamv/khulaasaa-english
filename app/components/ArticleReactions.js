"use client";

import { useState } from "react";

const reactionOptions = [
  { id: "love", emoji: "❤️", label: "Love" },
  { id: "wow", emoji: "😮", label: "Wow" },
  { id: "cry", emoji: "😢", label: "Cry" },
  { id: "angry", emoji: "😡", label: "Angry" },
];

export default function ArticleReactions() {
  const [counts, setCounts] = useState({
    love: 0,
    wow: 0,
    cry: 0,
    angry: 0,
  });

  const [selected, setSelected] = useState(null);

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  const react = (id) => {
    if (selected === id) return;

    setCounts((current) => {
      const next = { ...current };

      if (selected) {
        next[selected] = Math.max(0, next[selected] - 1);
      }

      next[id] += 1;
      return next;
    });

    setSelected(id);
  };

  const percentage = (id) => {
    if (total === 0) return 0;
    return Math.round((counts[id] / total) * 100);
  };

  return (
    <div className="article-reactions">
      <div className="reaction-heading">
        <span className="reaction-label">React to this story</span>

        {selected && (
          <span className="reaction-total">
            {total} {total === 1 ? "reaction" : "reactions"}
          </span>
        )}
      </div>

      <div className={`reaction-buttons ${selected ? "reaction-results-visible" : ""}`}>
        {reactionOptions.map((reaction) => (
          <button
            key={reaction.id}
            type="button"
            className={selected === reaction.id ? "reaction-button selected" : "reaction-button"}
            onClick={() => react(reaction.id)}
          >
            <span className="reaction-emoji">{reaction.emoji}</span>
            <span className="reaction-name">{reaction.label}</span>

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


