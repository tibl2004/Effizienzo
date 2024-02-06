import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackList.scss'; // Importieren Sie die SCSS-Datei

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/feedbacks')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });
  }, []);

  // Funktion zum Konvertieren des Ratings in Sternsymbole
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="feedback-list">
      <h2>Feedbacks</h2>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.id} className="feedback-item">
            <p>{renderStars(feedback.rating)}</p>
            <p>{feedback.feedbackText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
