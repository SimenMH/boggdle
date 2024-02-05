import asyncHandler from 'express-async-handler';
import { getCharacters, getDay } from '../utils/config.js';

import Table from '../models/tableModel.js';
import Solutions from '../models/solutionsModel.js';
import { findWord } from '../utils/dictionaryApi.js';
import { addWord } from '../utils/generateTable.js';

const getTable = asyncHandler(async (req, res) => {
  const table = await getTodaysTable();
  const characterValues = await getCharacters();

  const content = {
    day: table.Day,
    characters: table.Characters,
    values: characterValues,
  };
  res.status(200).json(content);
});

const submitWord = asyncHandler(async (req, res) => {
  const { word } = req.body;

  const day = await getDay();
  let solutions = await Solutions.findOne({ Day: day });
  let solution = solutions.Solutions.find(s => s.word === word);

  if (!solution) {
    const foundWord = await findWord(word);
    if (foundWord) {
      await addWord(word);
      solutions = await Solutions.findOne({ Day: day });
      solution = solutions.Solutions.find(s => s.word === word);
    }
  }

  if (solution) {
    // Add count to usages of solution
    solution.usages = solution.usages + 1;
    await solutions.save();

    res.status(200).json(solution.points);
  } else {
    res.status(200).json(0);
  }
});

const submitScore = asyncHandler(async (req, res) => {
  const { data } = req.body;

  let score = 0;
  for (let guess of data.guesses) {
    const solution = await validateWord(guess.word);
    if (solution) {
      score += solution.points;
    }
  }

  // Add score to table
  const table = await getTodaysTable();
  table.Scores.push(score);
  await table.save();

  res.sendStatus(201);
});

const getStatistics = asyncHandler(async (req, res) => {
  const day = await getDay();
  const scores = (await Table.findOne({ Day: day })).Scores;
  const solutions = (await Solutions.findOne({ Day: day })).Solutions;

  const best = solutions
    .slice(0, 3)
    .map(s => ({ word: s.word, points: s.points }));

  const popular = solutions
    .sort((a, b) => b.usages - a.usages)
    .filter(s => s.usages != 0)
    .slice(0, 10)
    .map(s => ({ word: s.word, points: s.points }));

  const filteredScore = scores.filter(s => s > 0);
  const average = Math.round(
    filteredScore.reduce((a, b) => a + b, 0) / filteredScore.length
  );

  const highest = Math.max(...filteredScore);

  res.status(200).json({ best, popular, average, highest });
});

// Helpers

const validateWord = async word => {
  const day = await getDay();
  const solutions = await Solutions.findOne({ Day: day });
  const solution = solutions.Solutions.find(s => s.word === word);
  return solution;
};

const getTodaysTable = async () => {
  const day = await getDay();
  const table = await Table.findOne({ Day: day });
  return table;
};

export { getTable, getStatistics, submitWord, submitScore };
