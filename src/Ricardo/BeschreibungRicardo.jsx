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
      // Entferne alle leeren Zeilen in artikelDetails
      let artikelDetails = prevState.artikelDetails.replace(/^\s*[\r\n]/gm, '');

      return {
        artikelDetails,
      };
    });
  };

  handleZusammenkopieren = () => {
    const { beschreibung, artikelDetails } = this.state;

    // Artikeldetails als Liste formatieren
    const artikelDetailsListe = artikelDetails
      .split('\n')
      .map((detail, index) => <li key={index}>{detail.trim()}</li>);

    // Hier kannst du die zusammengefügten Daten verwenden
    console.log(beschreibung, artikelDetailsListe);
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
        <ul ref={this.artikelDetailsRef} className="artikeldetails">
          {this.state.artikelDetails
            .split('\n')
            .map((detail, index) => <li key={index}>{detail.trim()}</li>)}
        </ul>
        <button onClick={this.handleCombinedButtonClick}>Hinweis entfernen & Leere Zeilen löschen</button>
        <div>
          <p>Projekt Restwert Schönbühl</p>
          <p>Öffnungszeiten: Montag - Freitag 08:30 - 12:00 Uhr und 13:00 - 16:30 Uhr</p>
        </div>
        <button onClick={this.handleZusammenkopieren}>Zusammenkopieren</button>
      </div>
    );
  }
}

export default BeschreibungRicardo;
