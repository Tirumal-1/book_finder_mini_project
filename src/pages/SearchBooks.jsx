 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBooks.css";

export default function SearchBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Book title is required");
      setBooks([]);
      return;
    }
    setError("");
    setLoading(true);
    setBooks([]);
    try {
      let url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title.trim())}`;
      if (author.trim()) {
        url += `&author=${encodeURIComponent(author.trim())}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed fetching");
      const data = await res.json();
      setBooks(data.docs);
    } catch {
      setError("Error fetching books. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="search-bg">
      {/* Back Button */}
      <button
        className="back-btn"
        style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <form className="search-card" onSubmit={handleSearch}>
        <h2 className="search-title">Search Books</h2>
        <label htmlFor="title">
          Book Title <span>*</span>
        </label>
        <input
          id="title"
          className="search-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter the book title"
          autoFocus
        />

        <label htmlFor="author">Author (Optional)</label>
        <input
          id="author"
          className="search-input"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter the author name"
        />

        <button className="search-btn" type="submit">
          Search
        </button>

        {error && <div className="search-error">{error}</div>}
      </form>

      {!loading && books.length > 0 && (
        <div
          className="book-grid"
          style={{ marginTop: "20px", maxWidth: "900px", width: "90vw", marginLeft: "auto", marginRight: "auto" }}
        >
          {books.map((book) => {
            const coverUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : "https://via.placeholder.com/180x280?text=No+Cover";
            return (
              <div
                key={book.key}
                className="book-card"
                onClick={() => navigate(`/book/${encodeURIComponent(book.key)}`)}
              >
                <img alt={book.title} className="book-cover" src={coverUrl} />
                <div className="book-info">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">
                    {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <p style={{ color: "white", textAlign: "center", marginTop: "2rem", fontSize: "1.3rem" }}>
          Loading results...
        </p>
      )}
    </div>
  );
}
