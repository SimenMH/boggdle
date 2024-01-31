// const url = 'https://boggdle.simenmh.com';
const url = 'http://localhost:5000';

// Gets table / Character values
export const getTable = async () => {
  const res = await fetch(url + '/table');
  const table = await res.json();

  return table;
};

// Submit Word / Get Score
export const submitWord = async word => {
  const res = await fetch(url + '/word', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word }),
  });
  const score = await res.json();

  return score;
};

// Submit Final Score
export const submitScore = async saveData => {
  await fetch(url + '/table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: saveData }),
  });
};

// Get Statistics
export const getStatistics = async () => {
  const res = await fetch(url + '/stats');
  const statistics = await res.json();

  return statistics;
};
