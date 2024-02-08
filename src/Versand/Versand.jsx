import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Versand.scss';

function Versand() {
  const [briefe, setBriefe] = useState([]);
  const [pakete, setPakete] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/briefe')
      .then(response => {
        setBriefe(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Briefe:', error);
      });

    axios.get('http://localhost:4000/pakete')
      .then(response => {
        setPakete(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Pakete:', error);
      });
  }, []);

  const handleEditBrief = (data) => {
    setEditMode(true);
    setEditedData(data);
  };

  const handleSaveBrief = () => {
    if (editedData.id) {
      axios.put(`http://localhost:4000/briefe/${editedData.id}`, editedData)
        .then(response => {
          console.log('Daten erfolgreich aktualisiert:', response.data);
          setEditMode(false);
          setEditedData({});
          window.location.reload(); // Reload the page
        })
        .catch(error => {
          console.error('Fehler beim Aktualisieren der Daten:', error);
        });
    } else {
      axios.post('http://localhost:4000/briefe', editedData)
        .then(response => {
          console.log('Daten erfolgreich erstellt:', response.data);
          setEditMode(false);
          setEditedData({});
          window.location.reload(); // Reload the page
        })
        .catch(error => {
          console.error('Fehler beim Erstellen der Daten:', error);
        });
    }
  };

  const handleDeleteBrief = (id) => {
    axios.delete(`http://localhost:4000/briefe/${id}`)
      .then(response => {
        console.log('Daten erfolgreich gelöscht:', response.data);
        window.location.reload(); // Reload the page after deletion
      })
      .catch(error => {
        console.error('Fehler beim Löschen der Daten:', error);
      });
  };

  const handleEditPaket = (data) => {
    setEditMode(true);
    setEditedData(data);
  };

  const handleSavePaket = () => {
    if (editedData.id) {
      axios.put(`http://localhost:4000/pakete/${editedData.id}`, editedData)
        .then(response => {
          console.log('Daten erfolgreich aktualisiert:', response.data);
          setEditMode(false);
          setEditedData({});
          window.location.reload(); // Reload the page
        })
        .catch(error => {
          console.error('Fehler beim Aktualisieren der Daten:', error);
        });
    } else {
      axios.post('http://localhost:4000/pakete', editedData)
        .then(response => {
          console.log('Daten erfolgreich erstellt:', response.data);
          setEditMode(false);
          setEditedData({});
          window.location.reload(); // Reload the page
        })
        .catch(error => {
          console.error('Fehler beim Erstellen der Daten:', error);
        });
    }
  };

  const handleDeletePaket = (id) => {
    axios.delete(`http://localhost:4000/pakete/${id}`)
      .then(response => {
        console.log('Daten erfolgreich gelöscht:', response.data);
        window.location.reload(); // Reload the page after deletion
      })
      .catch(error => {
        console.error('Fehler beim Löschen der Daten:', error);
      });
  };

  const handleCopy = (id, text) => {
    // Copy logic remains the same
  };

  const handlePost = () => {
    setEditMode(true);
    setEditedData({
      id: null,
      format: '',
      dicke: '',
      gewicht: '',
      porto: '',
      faktura: ''
    });
  };

  return (
    <div className='Versand'>
      <h1>Versand</h1>

      <h2>Briefe</h2>

      <table border="1" className="versand-table">
        <thead>
          <tr>
            <th>Format</th>
            <th>Dicke *</th>
            <th>Gewicht</th>
            <th>Portokosten Post</th>
            <th>Faktura-Preis **</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {briefe.map((brief) => (
            <tr key={brief.id}>
              <td>
                {editMode && editedData.id === brief.id ? 
                  <input value={editedData.format} onChange={e => setEditedData({ ...editedData, format: e.target.value })} />
                  : brief.format}
              </td>
              <td>
                {editMode && editedData.id === brief.id ? 
                  <input value={editedData.dicke} onChange={e => setEditedData({ ...editedData, dicke: e.target.value })} />
                  : brief.dicke}
              </td>
              <td>
                {editMode && editedData.id === brief.id ? 
                  <input value={editedData.gewicht} onChange={e => setEditedData({ ...editedData, gewicht: e.target.value })} />
                  : brief.gewicht}
              </td>
              <td>
                {editMode && editedData.id === brief.id ? 
                  <input value={editedData.porto} onChange={e => setEditedData({ ...editedData, porto: e.target.value })} />
                  : brief.porto}
              </td>
              <td
                id={`fak-${brief.id}`}
                onClick={() => handleCopy(`fak-${brief.id}`, brief.faktura)}
                className={`${brief.specialClass} ${copiedId === `fak-${brief.id}` ? 'copied' : ''}`}
              >
                {editMode && editedData.id === brief.id ? 
                  <input value={editedData.faktura} onChange={e => setEditedData({ ...editedData, faktura: e.target.value })} />
                  : brief.faktura}
              </td>
              <td>
                {editMode && editedData.id === brief.id ? (
                  <>
                    <button onClick={handleSaveBrief}>Speichern</button>
                    <button onClick={() => handleDeleteBrief(brief.id)}>Löschen</button>
                  </>
                ) : (
                  <button onClick={() => handleEditBrief(brief)}>Bearbeiten</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!editMode && <button onClick={handlePost}>Post</button>}

      <h2>Pakete</h2>

      <table border="1" className='pakete-table'>
        <thead>
          <tr>
            <th>Masse</th>
            <th>Gewicht</th>
            <th>Portokosten Post</th>
            <th>Faktura-Preis</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {pakete.map((paket) => (
            <tr key={paket.id}>
              <td>
                {editMode && editedData.id === paket.id ? 
                  <input value={editedData.masse} onChange={e => setEditedData({ ...editedData, masse: e.target.value })} />
                  : paket.masse}
              </td>
              <td>
                {editMode && editedData.id === paket.id ? 
                  <input value={editedData.gewicht} onChange={e => setEditedData({ ...editedData, gewicht: e.target.value })} />
                  : paket.gewicht}
              </td>
              <td>
                {editMode && editedData.id === paket.id ? 
                  <input value={editedData.portopost} onChange={e => setEditedData({ ...editedData, portopost: e.target.value })} />
                  : paket.portopost}
              </td>
              <td>
                {editMode && editedData.id === paket.id ? 
                  <input value={editedData.faktura} onChange={e => setEditedData({ ...editedData, faktura: e.target.value })} />
                  : paket.faktura}
              </td>
              <td>
                {editMode && editedData.id === paket.id ? (
                  <>
                    <button onClick={handleSavePaket}>Speichern</button>
                    <button onClick={() => handleDeletePaket(paket.id)}>Löschen</button>
                  </>
                ) : (
                  <button onClick={() => handleEditPaket(paket)}>Bearbeiten</button>
                )}
              </td>
            </tr>
          ))}
          {editMode && (
            <tr>
              <td>
                <input value={editedData.masse} onChange={e => setEditedData({ ...editedData, masse: e.target.value })} />
              </td>
              <td>
                <input value={editedData.gewicht} onChange={e => setEditedData({ ...editedData, gewicht: e.target.value })} />
              </td>
              <td>
                <input value={editedData.portopost} onChange={e => setEditedData({ ...editedData, portopost: e.target.value })} />
              </td>
              <td>
                <input value={editedData.faktura} onChange={e => setEditedData({ ...editedData, faktura: e.target.value })} />
              </td>
              <td>
                <button onClick={handleSavePaket}>Speichern</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!editMode && <button onClick={handlePost}>Post</button>}
    </div>
  );
}

export default Versand;
