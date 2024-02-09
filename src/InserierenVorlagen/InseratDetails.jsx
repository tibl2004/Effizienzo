import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InseratDetails() {
  const { id } = useParams(); // Holen Sie die ID aus den URL-Parametern
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/inserieren/${id}`) // Verwenden Sie die ID in der URL
      .then(response => {
        // Überprüfen Sie, ob das Datenobjekt Labels enthält und setzen Sie sie entsprechend
        if (response.data && response.data.labels) {
          setLabels(response.data.labels);
        } else {
          setLabels([]); // Setzen Sie labels auf ein leeres Array, wenn keine Labels vorhanden sind
        }
      })
      .catch(error => console.error('Fehler beim Abrufen der Labels:', error));
  }, [id]);

  return (
    <div>
      <h2>ID: {id}</h2>
      <h3>Labels:</h3>
      <ul>
        {labels.map((label, index) => (
          <li key={index}>{label}</li>
        ))}
      </ul>
    </div>
  );
}

export default InseratDetails;
