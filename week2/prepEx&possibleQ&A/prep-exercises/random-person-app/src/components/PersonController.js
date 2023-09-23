import React, { useState, useEffect } from 'react';
import Person from './Person';

export default function PersonController() {
  const [personData, setPersonData] = useState({});

  const getPerson = async () => {
    try {
      const response = await fetch('https://www.randomuser.me/api?results=1');
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { first, last } = data.results[0].name;
        const { email } = data.results[0];
        setPersonData({ firstName: first, lastName: last, email });
      } else {
        throw new Error('No person data found');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div>
      <h1>Random Person Data</h1>
      <Person {...personData} />
      <button onClick={getPerson}>Generate Random Data</button>
    </div>
  );
}
