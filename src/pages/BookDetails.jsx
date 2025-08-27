 import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails() {
  const { key } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const decodedKey = decodeURIComponent(key);
        const url = `https://openlibrary.org${decodedKey}.json`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch {
        setBook(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [key]);

  function handleBuy() {
    alert("Buy action clicked (dummy)");
  }
  function handleRent() {
    alert("Rent action clicked (dummy)");
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      {loading && <p>Loading book details...</p>}

      {!loading && book && (
        <div className="book-details">
          {/* Book Cover */}
          {book.covers && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={book.title}
              className="detail-cover"
            />
          )}
          <h2>{book.title || "No Title"}</h2>
          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}
          {book.subjects && (
            <p>
              <strong>Subjects:</strong> {book.subjects.join(", ")}
            </p>
          )}

          <div className="actions">
            <button onClick={handleBuy}>Buy</button>
            <button onClick={handleRent}>Rent</button>
          </div>
        </div>
      )}

      {!loading && !book && <p>Book details not found.</p>}
    </div>
  );
}
