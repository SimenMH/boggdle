import asyncHandler from 'express-async-handler';
import { getDay, getNextDay } from '../utils/config.js';
import { generateTable } from '../utils/generateTable.js';
import Solutions from '../models/solutionsModel.js';
import Table from '../models/tableModel.js';

// Regenerate Today's Table
const regenTable = asyncHandler(async (req, res) => {
  const day = await getDay();
  await generateTable(day);
  res.sendStatus(204);
});

// Regenerate Tomorrow's Table
const regenNextTable = asyncHandler(async (req, res) => {
  const day = await getNextDay();
  await generateTable(day);
  res.sendStatus(204);
});
// Get Tomorrow's Table
const getNextTable = asyncHandler(async (req, res) => {
  const day = await getNextDay();
  const table = await Table.findOne({ Day: day });

  res.status(200).json(table);
});
// Get Tomorrow's Solutions (number)
const getNextSolutions = asyncHandler(async (req, res) => {
  const day = await getNextDay();
  const solutions = await Solutions.findOne({ Day: day });

  res.status(200).json(solutions);
});
// Remove word from solutions (word)
const removeWord = asyncHandler(async (req, res) => {});
// Add word to solutions (word)
const addWord = asyncHandler(async (req, res) => {});
// Get all used words
const getUsedWords = asyncHandler(async (req, res) => {});

export {
  regenTable,
  regenNextTable,
  getNextTable,
  getNextSolutions,
  removeWord,
  addWord,
  getUsedWords,
};
