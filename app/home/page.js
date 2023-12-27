"use client";
// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyw0BbA2I98d8kXg7cEza-r7PtwLVbAfXYX6cfzuufJZeAqbi-JYJWBPIID8PCWaJEv/exec');
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