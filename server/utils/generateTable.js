import { getDay, getCharacters } from './config.js';

import Table from '../models/tableModel.js';
import Solutions from '../models/solutionsModel.js';

import WordList from '../data/wordlist.json' assert { type: 'json' };
import boggle from 'node-boggle-solver';

const defaultSolver = boggle(WordList);

const tableSize = 25;
const MIN_SOLUTIONS = 250;

export const generateTable = async () => {
  const characters = await getCharacters();

  let characterArr = [];

  for (let key in characters) {
    for (let i = 0; i < characters[key].frequency; i++) {
      characterArr.push(key);
    }
  }

  // Generate daily string
  let tableString = '';
  for (let i = 0; i < tableSize; i++) {
    tableString += characterArr.splice(
      Math.floor(Math.random() * characterArr.length),
      1
    );
  }

  const day = await getDay();
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
      generateTable();
    } else {
      await Solutions.findOneAndDelete({ Day: day });
      await Solutions.create({ Day: day, Solutions: solutions });
    }
  });
};
