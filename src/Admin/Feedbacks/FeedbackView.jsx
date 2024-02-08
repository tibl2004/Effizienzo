import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackList.scss'; // Importieren Sie die SCSS-Datei

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editedFeedback, setEditedFeedback] = useState(null);
  const [editedText, setEditedText] = useState('');

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

  const handleEdit = (feedback) => {
    setEditedFeedback(feedback);
    setEditedText(feedback.feedbackText);
  };

  const handleSave = () => {
    if (editedFeedback && editedText.trim() !== '') {
      axios.put(`http://localhost:4000/feedbacks/${editedFeedback.id}`, { feedbackText: editedText })
        .then(response => {
          console.log('Feedback erfolgreich aktualisiert:', response.data);
          setEditedFeedback(null);
          setEditedText('');
          // Aktualisieren Sie die Feedback-Liste nach dem Speichern
          axios.get('http://localhost:4000/feedbacks')
            .then(response => {
              setFeedbacks(response.data);
            })
            .catch(error => {
              console.error('Error fetching feedbacks:', error);
            });
        })
        .catch(error => {
          console.error('Fehler beim Aktualisieren des Feedbacks:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/feedbacks/${id}`)
      .then(response => {
        console.log('Feedback erfolgreich gelöscht:', response.data);
        // Aktualisieren Sie die Feedback-Liste nach dem Löschen
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
      })
      .catch(error => {
        console.error('Fehler beim Löschen des Feedbacks:', error);
      });
  };

  return (
    <div className="feedback-list">
      <h2>Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>Aktuell sind keine Feedbacks vorhanden!</p>
      ) : (
        <ul>
          {feedbacks.map(feedback => (
            <li key={feedback.id} className="feedback-item">
              {editedFeedback && editedFeedback.id === feedback.id ? (
                <>
                  <textarea value={editedText} onChange={e => setEditedText(e.target.value)} />
                  <button onClick={handleSave}>Speichern</button>
                </>
              ) : (
                <>
                  <p>{renderStars(feedback.rating)}</p>
                  <p>{feedback.feedbackText}</p>
                  <button onClick={() => handleEdit(feedback)}>Bearbeiten</button>
                  <button onClick={() => handleDelete(feedback.id)}>Löschen</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackList;
