import fs from 'fs';

const WORDLIST_PATH = './data/wordlist.json';
const FILTERED_WORDS_PATH = './data/filteredWords.json';
const BANNED_WORDS_PATH = './data/bannedWordsList.json';

const readJson = async path =>
  JSON.parse(await fs.promises.readFile(path, 'utf-8'));

const writeJson = (path, data) =>
  fs.promises.writeFile(path, JSON.stringify(data, null, 2));

let bannedWordList = await readJson(BANNED_WORDS_PATH);

export const isBanned = word => bannedWordList.includes(word.toUpperCase());

export const getFilteredWordList = () => readJson(FILTERED_WORDS_PATH);

const refreshBannedWordList = async () => {
  bannedWordList = await readJson(BANNED_WORDS_PATH);
};

export const regenerateFilteredWords = async () => {
  const wordlist = await readJson(WORDLIST_PATH);
  const banned = new Set(bannedWordList);
  const filtered = new Set();
  for (const word of wordlist) {
    const upper = word.toUpperCase();
    if (!banned.has(upper)) {
      filtered.add(upper);
    }
  }
  await writeJson(FILTERED_WORDS_PATH, [...filtered]);
};

export const addToWordlist = async word => {
  const lower = word.toLowerCase().trim();

  const wordlist = await readJson(WORDLIST_PATH);
  if (!wordlist.includes(lower)) {
    wordlist.push(lower);
    await writeJson(WORDLIST_PATH, wordlist);
  }

  await regenerateFilteredWords();
};

export const removeFromWordlist = async word => {
  const upper = word.toUpperCase().trim();

  const banned = await readJson(BANNED_WORDS_PATH);
  if (!banned.includes(upper)) {
    banned.push(upper);
    await writeJson(BANNED_WORDS_PATH, banned);
  }

  await refreshBannedWordList();
  await regenerateFilteredWords();
};
