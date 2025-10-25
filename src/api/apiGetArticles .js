export const apiGetArticles = async (search = "") => {
  const q = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`/api/articles${q}`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
};

export const apiLikeArticle = async (id) => {
  const res = await fetch(`/api/articles/${id}/like`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to like");
  return res.json();
};

export const apiGetComments = async (id) => {
  const res = await fetch(`/api/articles/${id}/comments`);
  if (!res.ok) throw new Error("Failed to load comments");
  return res.json();
};

export const apiPostComment = async (id, payload) => {
  const res = await fetch(`/api/articles/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
};