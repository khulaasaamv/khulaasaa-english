const API_BASE = "https://alpha.khulaasaa.com/api";

export async function getEnglishArticles(limit = 20, category = null) {
  const params = new URLSearchParams();

  params.set("limit", String(limit));

  if (category) {
    params.set("category", category);
  }

  const response = await fetch(
    `${API_BASE}/english/articles?${params.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load English articles: ${response.status}`
    );
  }

  const result = await response.json();

  return result.data || [];
}

export async function getEnglishArticle(id) {
  const response = await fetch(
    `${API_BASE}/english/articles/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  return result.data || null;
}

export function articleUrl(article) {
  return `/en/post/${article.id}`;
}

export function primaryCategory(article) {
  return article.categories?.[0]?.name || "News";
}
