import React, { useState, useEffect } from 'react';

const Lager = () => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./kisten/kisten.json');
        const data = await response.json();
        setBoxes(data.kisten);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {boxes.map((box) => (
        <div key={box.id} className="box">
          <p>ID: {box.id}</p>
          <p>Category: {box.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Lager;
