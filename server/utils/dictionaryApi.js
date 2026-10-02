import boggle from 'node-boggle-solver';
import Table from '../models/tableModel.js';

import { isBanned } from '../data/wordlist.js';

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const API_TIMEOUT_MS = 3000;

export const findWord = async (word, day) => {
  if (isBanned(word)) return false;
  if ((await verifyWordInTable(word, day)) === false) return false;

  try {
    const res = await fetch(url + encodeURIComponent(word), {
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    return res.status === 200;
  } catch (err) {
    // Timeout or network failure: treat the word as not found rather than hanging the request
    console.warn(`Dictionary API lookup failed for "${word}": ${err.name}`);
    return false;
  }
};

const verifyWordInTable = async (word, day) => {
  return new Promise(async (resolve, reject) => {
    try {
      const solver = boggle([word]);
      const table = await Table.findOne({ Day: day });

      if (table) {
        solver.solve(table.Characters, async (err, res) => {
          resolve(res.list.length > 0);
        });
      } else {
        reject('Could not find table');
      }
    } catch (err) {
      reject(err);
    }
  });
};
