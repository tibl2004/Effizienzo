import React, { useState } from 'react';

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'Ist Zahlung mit TWINT möglich?',
      answer:
        'Leider verwenden wir kein Twint und bitten Sie daher, den Betrag per Banküberweisung zu begleichen. Unsere Bankangaben finden Sie auf der Rechnung.',
      isOpen: false,
    },
    {
      id: 2,
      question: 'Ich habe bezahlt',
      answer:
        'Besten Dank für die Information.\n\nSobald wir die Zahlungseingangsbestätigung unserer Bank erhalten haben, werden wir Ihnen die beiden Artikel versenden. Zu gegebener Zeit werden Sie von uns eine E-Mail mit der Posttrackingnummer erhalten. Bitte nehmen Sie zur Kenntnis, dass das Paket erst am nächsten Tag getrackt werden kann.',
      isOpen: false,
    },
    {
      id: 3,
      question: 'Ich habe bezahlt! (Ist bei Postfinance Eingänge sichtbar)',
      answer:
        'Wir haben unsere Zahlungseingänge geprüft und wir können Ihre Zahlung des Artikels bestätigen. ' +
        'Bitte nehmen Sie zur Kenntnis, dass wir Ihr Paket morgen (nach Erfassung Ihrer Einzahlung in unserer Buchhaltung) verschicken können. ' +
        'Sobald wir das Paket versenden, erhalten Sie eine weitere Mail mit der entsprechenden Trackingnummer.',
      isOpen: false,
    },
  ]);

  const toggleFAQ = (id) => {
    const updatedFAQs = faqs.map((faq) =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
    );
    setFaqs(updatedFAQs);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h2>Häufig gestellte Fragen</h2>

      {faqs.map((faq) => (
        <div className="faq-item" key={faq.id}>
          <div className="question" onClick={() => toggleFAQ(faq.id)}>
            <span>{faq.isOpen ? '⬆️' : '⬇️'}</span> {faq.question}
          </div>
          {faq.isOpen && (
            <div className="answer">
              {faq.answer}
              <span
                className="copy-icon"
                onClick={() => copyToClipboard(faq.answer)}
                title="Antwort kopieren!"
                role="img"
                aria-label="Kopieren"
              >
                📋
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
