import React, { Component } from 'react';
import './BeschreibungRicardo.scss';

class BeschreibungRicardo extends Component {
  constructor(props) {
    super(props);

    this.artikelDetailsRef = React.createRef();

    this.state = {
      beschreibung: '',
      artikelDetails: '',
    };
  }

  handleCombinedButtonClick = () => {
    this.handleHinweisEntfernen();
    this.handleLeereZeilenLoeschen();
  };

  handleHinweisEntfernen = () => {
    this.setState((prevState) => ({
      artikelDetails: prevState.artikelDetails.replace(/Hinweis/g, ''),
    }));
  };

  handleLeereZeilenLoeschen = () => {
    this.setState((prevState) => {
      // Remove the top empty line in beschreibung
      let beschreibung = prevState.beschreibung.replace(/^\s*\n/, '');

      // Remove the top empty line in artikelDetails
      let artikelDetails = prevState.artikelDetails.replace(/^\s*\n/, '');

      return {
        beschreibung,
        artikelDetails,
      };
    });
  };

  handleZusammenkopieren = () => {
    const { beschreibung, artikelDetails } = this.state;

    // Artikeldetails als Liste formatieren
    const artikelDetailsListe = artikelDetails
      .split('\n')
      .map((detail) => `• ${detail.trim()}`)
      .join('\n');

    // Text zusammenfügen
    const zusammengefuegt = `${beschreibung} \n\n${artikelDetailsListe} \n\nProjekt Restwert Schönbühl\nÖffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr`;

    // Zugriff auf das DOM-Element
    const textarea = document.createElement('textarea');
    textarea.value = zusammengefuegt;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Hier kannst du die zusammengefügten Daten verwenden
    console.log(zusammengefuegt);
  };

  render() {
    return (
      <div className="BeschreibungRicardo">
        <textarea
          placeholder="Beschreibung"
          className="beschreibung"
          value={this.state.beschreibung}
          onChange={(e) => this.setState({ beschreibung: e.target.value })}
        />
        <textarea
          ref={this.artikelDetailsRef}
          className="artikeldetails"
          placeholder="Artikeldetails"
          value={this.state.artikelDetails}
          onChange={(e) => this.setState({ artikelDetails: e.target.value })}
        />
        <button onClick={this.handleCombinedButtonClick}>Hinweis entfernen & Leere Zeilen löschen</button>
        <div>
          <p>Projekt Restwert Schönbühl</p>
          <p>Öffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr</p>
        </div>
        <button onClick={this.handleZusammenkopieren}>Zusammenkopieren</button>
      </div>
    );
  }
}

export default BeschreibungRicardo;
