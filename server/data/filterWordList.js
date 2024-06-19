import fs from 'fs';

import BannedWordList from './bannedWordsList.json' assert { type: 'json' };

// Function to filter out profanity words
function filterProfanity(words) {
  return words.filter(word => {
    return !BannedWordList.includes(word.toUpperCase());
  });
}

// Function to update the JSON file
function updateJsonFile(filePath, filteredWords) {
  fs.writeFileSync(filePath, JSON.stringify(filteredWords, null, 2));
}

function processArray(inputArray) {
  // Use a Set to remove duplicates (case insensitive)
  const uniqueSet = new Set(inputArray.map(word => word.toLowerCase()));

  // Convert Set back to an array and capitalize each word
  const processedArray = [...uniqueSet].map(word => word.toUpperCase());

  return processedArray;
}

// Load the JSON file
const jsonFilePath = './wordlist.json';
const jsonData = await fs.promises.readFile(jsonFilePath, 'utf-8');
const parsedData = JSON.parse(jsonData);

// Filter out profanity
const filteredWords = filterProfanity(parsedData);

const newWords = processArray(filteredWords);

// Update the JSON file with filtered words
updateJsonFile('./filteredWords.json', newWords);

console.log('Profanity filtered and JSON file updated successfully.');
