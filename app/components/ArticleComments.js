"use client";

import { useState } from "react";

const COMMENT_API =
  "https://alpha.khulaasaa.com/api/english/articles";

export default function ArticleComments({
  articleId,
  initialComments = [],
}) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");

    const cleanName = name.trim();
    const cleanBody = body.trim();

    if (cleanName.length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (cleanBody.length < 2) {
      setError("Please write a comment.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${COMMENT_API}/${articleId}/comments`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            body: cleanBody,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to submit your comment."
        );
      }

      setName("");
      setBody("");
      setSuccess(true);
    } catch (err) {
      setError(
        err?.message ||
          "We could not submit your comment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="article-comments">
      <div className="comments-heading">
        <h2>Comments</h2>
        <span>
          {initialComments.length}{" "}
          {initialComments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {success ? (
        <div className="comment-success" role="status">
          <strong>Comment received.</strong>
          <p>
            Thank you for contributing. Your comment will appear
            after moderation.
          </p>
        </div>
      ) : (
        <form
          className="comment-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your name"
            aria-label="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            required
          />

          <textarea
            placeholder="Write a comment..."
            aria-label="Write a comment"
            rows="4"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={3000}
            required
          />

          {error && (
            <div className="comment-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Post comment"}
          </button>
        </form>
      )}

      {initialComments.length > 0 ? (
        <div className="published-comments">
          {initialComments.map((comment) => (
            <article
              className="published-comment"
              key={comment.id}
            >
              <strong>{comment.name}</strong>
              <p>{comment.body}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="comments-empty">
          Be the first to comment on this story.
        </div>
      )}
    </div>
  );
}