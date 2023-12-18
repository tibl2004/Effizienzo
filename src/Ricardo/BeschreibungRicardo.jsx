import React, { Component } from 'react';
import './BeschreibungRicardo.scss';

class BeschreibungRicardo extends Component {
  constructor(props) {
    super(props);

    this.beschreibungRef = React.createRef();
    this.artikelDetailsRef = React.createRef();
    this.oeffnungszeitenRef = React.createRef();

    this.state = {
      beschreibung: '',
      artikelDetails: '',
      // Remove oeffnungszeiten from the state since it's hardcoded
    };
  }

  handleHinweisEntfernen = () => {
    this.setState((prevState) => ({
      artikelDetails: prevState.artikelDetails.replace(/Hinweis/g, ''),
    }));
  };

  handleLeereZeilenLoeschen = () => {
    this.setState((prevState) => ({
      beschreibung: prevState.beschreibung.replace(/\n\s*\n/g, '\n'),
      artikelDetails: prevState.artikelDetails.replace(/\n\s*\n/g, '\n'),
    }));
  };

  handleZusammenkopieren = () => {
    const { beschreibung, artikelDetails } = this.state;
    const zusammengefuegt = `${beschreibung} \n\n${artikelDetails} \n\nProjekt Restwert Schönbühl\nÖffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr`;

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
          className='beschreibung'
          value={this.state.beschreibung}
          onChange={(e) => this.setState({ beschreibung: e.target.value })}
        />
        <textarea
          ref={this.artikelDetailsRef}
          className='artikeldetails'
          placeholder="Artikeldetails"
          value={this.state.artikelDetails}
          onChange={(e) => this.setState({ artikelDetails: e.target.value })}
        />
        <button onClick={this.handleHinweisEntfernen}>Hinweis entfernen!</button>
        <button onClick={this.handleLeereZeilenLoeschen}>Leere Zeilen löschen</button>
        <p>
          Projekt Restwert Schönbühl
          <br />
          Öffnungszeiten: Montag - Freitag 08:00 - 12:00 Uhr und 13:00 - 16:30 Uhr
        </p>
        <button onClick={this.handleZusammenkopieren}>Zusammenkopieren</button>
      </div>
    );
  }
}

export default BeschreibungRicardo;
