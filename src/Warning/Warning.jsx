import React, { useState } from 'react';
import './Warning.scss'; 

function Warning() {

  return (
    <div className="warning-box">
    <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: 'white', marginRight: '5px' }} />
    Bitte sonst noch andere Wichtige Relevante Informationen erfassen! Wie z.B. für technische Geräte ist es sehr wichtig!
  </div>
  );
}

export default Warning;