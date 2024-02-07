import fs from 'fs';
import boggle from 'node-boggle-solver';

import { getDay, getNextDay, getCharacters } from './config.js';

import Table from '../models/tableModel.js';
import Solutions from '../models/solutionsModel.js';

import WordList from '../data/filteredWords.json' assert { type: 'json' };

const defaultSolver = boggle(WordList);

const letterConfig = [
  ['A', 'A', 'A', 'F', 'R', 'S'],
  ['A', 'A', 'E', 'E', 'E', 'E'],
  ['A', 'A', 'F', 'I', 'R', 'S'],
  ['A', 'D', 'E', 'N', 'N', 'N'],
  ['A', 'E', 'E', 'E', 'E', 'M'],
  ['A', 'E', 'E', 'G', 'M', 'U'],
  ['A', 'E', 'G', 'M', 'N', 'N'],
  ['A', 'F', 'I', 'R', 'S', 'Y'],
  ['B', 'J', 'K', 'Q', 'X', 'Z'],
  ['C', 'C', 'E', 'N', 'S', 'T'],
  ['C', 'E', 'I', 'I', 'L', 'T'],
  ['C', 'E', 'I', 'L', 'P', 'T'],
  ['C', 'E', 'I', 'P', 'S', 'T'],
  ['D', 'D', 'H', 'N', 'O', 'T'],
  ['D', 'H', 'H', 'L', 'O', 'R'],
  ['D', 'H', 'L', 'N', 'O', 'R'],
  ['D', 'H', 'L', 'N', 'O', 'R'],
  ['E', 'I', 'I', 'I', 'T', 'T'],
  ['E', 'M', 'O', 'T', 'T', 'T'],
  ['E', 'N', 'S', 'S', 'S', 'U'],
  ['F', 'I', 'P', 'R', 'S', 'Y'],
  ['G', 'O', 'R', 'R', 'V', 'W'],
  ['I', 'P', 'R', 'R', 'R', 'Y'],
  ['N', 'O', 'O', 'T', 'U', 'W'],
  ['O', 'O', 'O', 'T', 'T', 'U'],
];

const MIN_SOLUTIONS = 450;

export const generateTable = async day => {
  const characters = await getCharacters();

  let characterArr = [];

  for (let key in characters) {
    for (let i = 0; i < characters[key].frequency; i++) {
      characterArr.push(key);
    }
  }

  const shuffledLetters = shuffle([...letterConfig]);

  // Generate daily string
  let tableString = '';
  for (let i = 0; i < shuffledLetters.length; i++) {
    const letterArr = shuffledLetters[i];
    tableString += letterArr[Math.floor(Math.random() * letterArr.length)];
  }

  await Table.findOneAndDelete({ Day: day });
  const table = await Table.create({ Day: day, Characters: tableString });

  defaultSolver.solve(table.Characters, async (err, res) => {
    const solutions = [];

    for (let word of res.list) {
      let points = 0;
      for (let i = 0; i < word.length; i++) {
        points += characters[word[i]].value;
      }
      if (word.length >= 6) points += 5;

      solutions.push({ word, points });
    }

    solutions.sort((a, b) => b.points - a.points);

    if (solutions.length < MIN_SOLUTIONS) {
      generateTable(day);
    } else {
      await Solutions.findOneAndDelete({ Day: day });
      await Solutions.create({ Day: day, Solutions: solutions });
    }
  });
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const addWord = async word => {
  const day = await getDay();
  const solutions = await Solutions.findOne({ Day: day });
  if (!solutions) {
    throw new Error('Could not find solutions for today');
  }

  word = word.toUpperCase().trim();

  const wordExists = solutions.Solutions.find(s => s.word === word);
  if (wordExists) {
    throw new Error('Word already exists in solutions');
  }

  let points = await getWordScore(word);

  solutions.Solutions.push({ word, points });
  await solutions.save();

  const wordListJson = await fs.promises.readFile(
    './data/wordlist.json',
    'utf-8'
  ); // Specify encoding as an option
  const wordList = JSON.parse(wordListJson);
  wordList.push(word);
  fs.writeFileSync('./data/wordlist.json', JSON.stringify(wordList, null, 2));

  const filteredWordListJson = await fs.promises.readFile(
    './data/filteredWords.json',
    'utf-8'
  ); // Specify encoding as an option
  const filteredWordList = JSON.parse(filteredWordListJson);
  filteredWordList.push(word);
  fs.writeFileSync(
    './data/filteredWords.json',
    JSON.stringify(filteredWordList, null, 2)
  );
};

export const getWordScore = async word => {
  const characters = await getCharacters();
  let points = 0;
  for (let i = 0; i < word.length; i++) {
    points += characters[word[i]].value;
  }
  if (word.length >= 6) points += 5;
  return points;
};
