export const getSaveData = day => {
  let saveData = JSON.parse(localStorage.getItem(day));
  if (!saveData || !validateSaveData(saveData)) {
    const newSaveData = {
      guesses: [
        {
          word: '',
          points: 0,
        },
        {
          word: '',
          points: 0,
        },
        {
          word: '',
          points: 0,
        },
      ],
      lives: 3,
      score: 0,
      submitted: false,
    };
    localStorage.setItem(day, JSON.stringify(newSaveData));
    saveData = newSaveData;
  }

  return saveData;
};

export const updateSaveData = (day, data) => {
  if (validateSaveData(data)) {
    localStorage.setItem(day, JSON.stringify(data));
    return true;
  } else {
    return false;
  }
};

export const getHighScores = () => {
  let highScores = JSON.parse(localStorage.getItem('highscores'));
  if (!highScores || !validateHighScores(highScores)) {
    const newHighScores = {
      word: {
        word: '',
        points: 0,
      },
      score: 0,
    };

    localStorage.setItem('highscores', JSON.stringify(newHighScores));
    highScores = newHighScores;
  }

  return highScores;
};

export const updateHighScores = data => {
  let highScores = JSON.parse(localStorage.getItem('highscores'));
  if (!highScores || !validateHighScores(highScores)) {
    highScores = {
      word: {
        word: '',
        points: 0,
      },
      score: 0,
    };
  }

  const localStorageData = { ...localStorage, data };
  const allDaysData = Object.keys(localStorageData)
    .filter(key => key[0] === '#')
    .reduce((obj, key) => {
      obj[key] = localStorageData[key];
      return obj;
    }, {});

  for (const key in allDaysData) {
    const dayData = JSON.parse(allDaysData[key]);

    for (let i = 0; i < dayData['guesses'].length; i++) {
      const word = dayData['guesses'][i];
      if (word['points'] > highScores['word']['points']) {
        highScores['word'] = word;
      }
    }

    if (dayData['score'] > highScores['score']) {
      highScores['score'] = dayData['score'];
    }
  }

  if (validateHighScores(highScores)) {
    localStorage.setItem('highscores', JSON.stringify(highScores));
    return highScores;
  }

  return false;
};

const validateSaveData = data => {
  const requiredFields = ['guesses', 'score', 'submitted'];
  const validFields = requiredFields.every(field =>
    Object.keys(data).includes(field)
  );

  const validTypes =
    typeof data['guesses'] === 'object' &&
    typeof data['score'] === 'number' &&
    typeof data['submitted'] === 'boolean';

  const validGuessLength = data['guesses'].length === 3;

  const requiredGuessFields = ['word', 'points'];
  let validGuessProps = true;

  for (let i = 0; i < data['guesses'].length; i++) {
    const currentGuess = data['guesses'][i];
    if (
      !requiredGuessFields.every(field =>
        Object.keys(currentGuess).includes(field)
      ) ||
      typeof currentGuess['word'] !== 'string' ||
      typeof currentGuess['points'] !== 'number'
    ) {
      validGuessProps = false;
    }
  }

  return validFields && validTypes && validGuessLength && validGuessProps;
};

const validateHighScores = highScores => {
  const requiredFields = ['word', 'score'];
  const validFields = requiredFields.every(field =>
    Object.keys(highScores).includes(field)
  );

  const validTypes =
    typeof highScores['word'] === 'object' &&
    typeof highScores['score'] === 'number';

  if (!highScores['word'] || typeof highScores['word'] !== 'object')
    return false;

  const requiredWordFields = ['word', 'points'];
  const validWordFields = requiredWordFields.every(field =>
    Object.keys(highScores['word']).includes(field)
  );

  const validWordTypes =
    typeof highScores['word']['word'] === 'string' &&
    typeof highScores['word']['points'] === 'number';

  return validFields && validTypes && validWordFields && validWordTypes;
};

export const addLivesToSaveData = day => {
  const saveData = getSaveData(day);
  saveData['lives'] = 3;
  updateSaveData(day, saveData);
};
