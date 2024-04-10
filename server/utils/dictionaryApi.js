import boggle from 'node-boggle-solver';
import { getDay } from './config.js';
import Table from '../models/tableModel.js';

import BannedWordList from '../data/bannedWordsList.json' assert { type: 'json' };

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const findWord = async (word, day) => {
  if (BannedWordList.includes(word.toUpperCase())) return false;
  if ((await verifyWordInTable(word, day)) === false) return false;

  const res = await fetch(url + word);
  return res.status === 200;
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
