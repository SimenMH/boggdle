import fs from 'fs';

const BANNED_WORDS_PATH = './data/bannedWordsList.json';

const wordsToAdd = [
  'DYKE',
  'DYKES',
  'DYKEY',
  'PUSSY',
  'COCK',
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
