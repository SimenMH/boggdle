import asyncHandler from 'express-async-handler';
import { getDay, getNextDay, getCharacters } from '../utils/config.js';
import { generateTable, getWordScore } from '../utils/generateTable.js';

import Solutions from '../models/solutionsModel.js';
import Table from '../models/tableModel.js';

// Regenerate Today's Table
const regenTable = asyncHandler(async (_req, res) => {
  const day = await getDay();
  await generateTable(day);
  res.sendStatus(204);
});

// Regenerate Tomorrow's Table
const regenNextTable = asyncHandler(async (_req, res) => {
  const day = await getNextDay();
  await generateTable(day);
  res.sendStatus(204);
});

// Get Tomorrow's Table
const getNextTable = asyncHandler(async (_req, res) => {
  const day = await getNextDay();
  const table = await Table.findOne({ Day: day });

  res.status(200).json(table);
});

// Get Tomorrow's Solutions (number)
const getNextSolutions = asyncHandler(async (_req, res) => {
  const day = await getNextDay();
  const solutions = await Solutions.findOne({ Day: day });

  res.status(200).json(solutions);
});

// Add word to solutions (word)
const addWord = asyncHandler(async (req, res) => {
  let { word } = req.body;
  const day = await getDay();
  const solutions = await Solutions.findOne({ Day: day });
  if (!solutions) {
    res.status(404);
    throw new Error('Could not find solutions for today');
  }

  word = word.toUpperCase().trim();

  const wordExists = solutions.Solutions.find(s => s.word === word);
  if (wordExists) {
    res.status(409);
    throw new Error('Word already exists in solutions');
  }

  const points = await getWordScore(word);
  solutions.Solutions.push({ word, points });

  await solutions.save();
  res.sendStatus(200);
});

// Remove word from solutions (word)
const removeWord = asyncHandler(async (req, res) => {
  let { word } = req.body;
  const day = await getDay();
  const solutions = await Solutions.findOne({ Day: day });
  if (!solutions) {
    res.status(404);
    throw new Error('Could not find solutions for today');
  }

  word = word.toUpperCase().trim();

  const wordExists = solutions.Solutions.find(s => s.word === word);
  if (wordExists) {
    const index = solutions.Solutions.indexOf(wordExists);
    solutions.Solutions.splice(index, 1);
    await solutions.save();
    res.sendStatus(200);
  } else {
    res.status(404);
    throw new Error('Word does not exist in solutions');
  }
});

// Get all used words
const getUsedWords = asyncHandler(async (_req, res) => {
  const day = await getDay();
  const solutions = await Solutions.findOne({ Day: day });
  if (!solutions) {
    res.status(404);
    throw new Error('Could not find solutions for today');
  }

  const usedGuesses = solutions.Solutions.filter(s => s.usages != 0)
    .sort((a, b) => b.usages - a.usages)
    .map(s => ({ word: s.word, points: s.points, usages: s.usages }));

  res.status(200).json(usedGuesses);
});

export {
  regenTable,
  regenNextTable,
  getNextTable,
  getNextSolutions,
  removeWord,
  addWord,
  getUsedWords,
};
