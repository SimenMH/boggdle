const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

import BannedWordList from '../data/bannedWordsList.json' assert { type: 'json' };

export const findWord = async word => {
  if (BannedWordList.includes(word.toUpperCase())) return false;

  const res = await fetch(url + word);
  return res.status === 200;
};
