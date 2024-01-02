"use client";
// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the fetch URL to include the user's search term
        const response = await fetch(`https://script.google.com/macros/s/AKfycbz6lusc9Go52j7lEq0kLue4f7Et-z-BzyBB6LfFQkRZCU2wRwXB1pEJCQX3WxLy_KpCSw/exec?search=${searchTerm}`);
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
  }, [searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Data from Data Base</h1>
      {/* Input for user to enter search term */}
      <label>
        Search:
        <input type="text" value={searchTerm} onChange={handleSearchInputChange} />
      </label>

      <table>
        <thead>
          <tr>
            {/* Assuming the first row contains headers */}
            {data.length > 0 && data[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
