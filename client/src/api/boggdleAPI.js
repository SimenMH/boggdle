// Gets table / Character values
export const getTable = async () => {
  const res = await fetch('http://localhost:5000/table');
  const table = await res.json();

  return table;
};

// Submit Word / Get Score
export const submitWord = async word => {
  const res = await fetch('http://localhost:5000/word', {
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
  await fetch('http://localhost:5000/table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: saveData }),
  });
};

// Get Statistics
export const getStatistics = async () => {
  const res = await fetch('http://localhost:5000/stats');
  const statistics = await res.json();

  return statistics;
};
