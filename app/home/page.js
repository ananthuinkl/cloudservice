"use client";
// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyWQDymrYy4TSZL1AV7LD67Jsu35Eli4PIP8e4fW8NWByuY8j13VtfiJVz2qMS3khp5kg/exec');
        const jsonData = await response.json();

        console.log('Received data:', jsonData); // Log the received data

        // Check if the received data is an array before setting it in the state
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          console.error('Data received is not an array:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Google Sheet</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: 'blue', color: 'white' }}>
          <tr>
            {/* Assuming the first row contains headers */}
            {data.length > 0 &&
              data[0].map((header, index) => (
                <th key={index} style={{ border: '1px solid white', padding: '8px' }}>
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ border: '1px solid blue', padding: '8px', backgroundColor: 'white' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
