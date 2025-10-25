import React, { useEffect, useState } from "react";
import { apiGetComments, apiPostComment, apiLikeArticle } from "../../api/apiGetArticles ";

export default function ArticleDetail({ article, onClose, onUpdate }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [likes, setLikes] = useState(article.likes || 0);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingComments(true);
      try {
        const data = await apiGetComments(article._id || article.id);
        setComments(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingComments(false);
      }
    };
    load();
  }, [article]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setPosting(true);
    const newComment = { author: "Anonymous", text: commentText.trim(), createdAt: new Date().toISOString() };
    setComments((c) => [newComment, ...c]);
    setCommentText("");
    try {
      const saved = await apiPostComment(article._id || article.id, newComment);
      setComments((c) => c.map(cm => cm === newComment ? saved : cm));
    } catch (err) {
      console.error(err);
      // leave optimistic or show error
    } finally {
      setPosting(false);
    }
  };

  const doLike = async () => {
    if (liking) return;
    setLiking(true);
    setLikes((l) => l + 1);
    try {
      const res = await apiLikeArticle(article._id || article.id);
      setLikes(res.likes ?? res.likesCount ?? likes);
      if (onUpdate) onUpdate({ ...article, likes: res.likes ?? res.likesCount ?? likes });
    } catch (err) {
      console.error(err);
      setLikes((l) => Math.max(0, l - 1));
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <header className="flex items-start justify-between p-4 border-b">
          <div>
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <div className="text-sm text-gray-500">{new Date(article.createdAt || article.publishedAt || Date.now()).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={doLike} className="px-3 py-1 rounded-md bg-blue-600 text-white">{liking ? "..." : `Like (${likes})`}</button>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="prose max-w-none">
            {/* if article.content is HTML, dangerously set it */}
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-gray-700">{article.excerpt || "No content available."}</p>
            )}
          </div>

          <section>
            <h4 className="font-semibold mb-2">Comments</h4>
            <form onSubmit={submitComment} className="flex gap-2 mb-4">
              <input
                className="flex-1 border px-3 py-2 rounded-md focus:outline-none"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md" disabled={posting}>
                {posting ? "Posting..." : "Post"}
              </button>
            </form>

            {loadingComments ? (
              <div className="text-gray-500">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-gray-500">No comments yet.</div>
            ) : (
              <ul className="space-y-3">
                {comments.map((c, i) => (
                  <li key={i} className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{c.author || "Anonymous"}</div>
                      <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                    <p className="text-gray-700 mt-1">{c.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}