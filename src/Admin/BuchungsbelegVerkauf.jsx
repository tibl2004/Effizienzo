import React, { Component, createRef } from 'react';
import ReactToPdf from 'react-to-pdf';

class BuchungsbelegVerkauf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [{ artikel: '', verkaufspreis: '' }],
    };

    this.pdfRef = createRef(); // Ref für die Tabelle
  }

  handleAddRow = () => {
    this.setState((prevState) => ({
      rows: [...prevState.rows, { artikel: '', verkaufspreis: '' }],
    }));
  };

  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...this.state.rows];
    newRows[index][name] = value;
    this.setState({ rows: newRows });
  };

  berechneGesamt = () => {
    const { rows } = this.state;
    let gesamt = 0;
    rows.forEach((row) => {
      if (!isNaN(row.verkaufspreis)) {
        gesamt += parseFloat(row.verkaufspreis);
      }
    });
    return gesamt;
  };

  handleCreatePdf = () => {
    const pdfOptions = {
      orientation: 'portrait', // Sie können 'landscape' verwenden, wenn gewünscht
    };

    if (this.pdfRef.current) {
      const table = this.pdfRef.current; // Das ref auf die Tabelle
      table.toPdf(pdfOptions).then((pdf) => {
        // PDF ist erstellt, Sie können es hier verwenden, z.B. speichern oder anzeigen
        // Hier ist ein Beispiel, wie Sie es anzeigen können:
        const blobURL = URL.createObjectURL(pdf);
        window.open(blobURL, '_blank');
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Buchungsbeleg Verkauf</h1>
        <table ref={this.pdfRef}>
          <thead>
            <tr>
              <th>ARTIKEL</th>
              <th>VERKAUFSPREIS (in CHF)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="artikel"
                    value={row.artikel}
                    onChange={(e) => this.handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="verkaufspreis"
                    value={row.verkaufspreis}
                    onChange={(e) => this.handleInputChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <strong>Gesamt: {this.berechneGesamt()} CHF</strong>
        </div>
        <button onClick={this.handleAddRow}>Zeile hinzufügen</button>
        <button onClick={this.handleCreatePdf}>PDF erstellen</button>
      </div>
    );
  }
}

export default BuchungsbelegVerkauf;
