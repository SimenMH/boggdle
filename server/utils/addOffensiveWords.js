import fs from 'fs';

const BANNED_WORDS_PATH = './data/bannedWordsList.json';

const wordsToAdd = [
  // WHORE family
  'BEWHORE',
  'WHORE',
  'WHOREDOM',
  'WHOREHOUSE',
  'WHOREHOUSES',
  'WHOREISHLY',
  'WHOREISHNESS',
  'WHOREMASTER',
  'WHOREMASTERY',
  'WHOREMONGER',
  'WHOREMONGERING',
  'WHORESON',
  // SLUT family (excluding what's already there)
  'SLUT',
  'SLUTS',
  'SLUTTERIES',
  'SLUTTERY',
  'SLUTTIER',
  'SLUTTIEST',
  'SLUTTISH',
  'SLUTTISHLY',
  'SLUTTY',
  // FAG family (questionable but adding as definite per typical offensive lists)
  'FAG',
  'FAGGING',
  'FAGGOT',
  'FAGGOTING',
  'FAGOT',
  'FAGOTER',
  'FAGOTING',
];

const readJson = async path =>
  JSON.parse(await fs.promises.readFile(path, 'utf-8'));

const writeJson = (path, data) =>
  fs.promises.writeFile(path, JSON.stringify(data, null, 2));

const banned = await readJson(BANNED_WORDS_PATH);
const bannedSet = new Set(banned);

for (const word of wordsToAdd) {
  if (!bannedSet.has(word)) {
    banned.push(word);
  }
}

banned.sort();
await writeJson(BANNED_WORDS_PATH, banned);

console.log(`Added ${wordsToAdd.length} words to banned list. Total banned words: ${banned.length}`);
