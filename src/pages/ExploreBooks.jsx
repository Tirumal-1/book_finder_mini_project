 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreBooks.css";

export default function ExploreBooks() {
  // ...same fetching logic as before...
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // ...fetch logic unchanged...
     const popularTitles = [
      "harry potter",
      "lord of the rings",
      "game of thrones",
      "sherlock holmes",
      "pride and prejudice",
      "to kill a mockingbird",
    ];

    // Fetch books for each title and combine result
    async function fetchBooks() {
      setLoading(true);
      let combinedBooks = [];
      for (let title of popularTitles) {
        try {
          const res = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=5`
          );
          const data = await res.json();
          combinedBooks = combinedBooks.concat(data.docs);
          if (combinedBooks.length >= 30) break; // Limit total books for performance
        } catch {
          // ignore failed fetch
        }
      }
      setBooks(combinedBooks.slice(0, 30));
      setLoading(false);
    }

    fetchBooks();
  }, []);

  return (
    <div className="explore-page">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      <div className="explore-title-wrapper">
        <h2 className="explore-title">Explore Books</h2>
      </div>
      {loading ? (
        <p className="loading-msg">Loading books...</p>
      ) : (
        <div className="book-grid">
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
    </div>
  );
}
