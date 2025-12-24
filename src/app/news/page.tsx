"use client";

import React, { useEffect, useState } from "react";
import { apiService } from "@/services/api";

type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
  image_url: string;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await apiService.getNews();

        // Accept either an array of articles or an object with `articles`
        const resolvedArticles: Article[] = Array.isArray(data) ? data : (data?.articles ?? []);

        setArticles(resolvedArticles);
      } catch (err: any) {
        console.error("Error fetching news articles:", err);
        setError(`Failed to load news articles: ${err?.message ?? String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>News</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>News</h1>
        <div className="error" role="alert">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>News</h1>
      {articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        <ul>
          {articles.map((a) => (
            <li key={a.id}>
              <h2>{a.title}</h2>
              <p>
                {a.author} — {a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
