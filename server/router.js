import express from 'express';
import {
  getStatistics,
  getTable,
  submitScore,
  submitWord,
} from './controllers/tableController.js';
import { generateTable } from './utils/generateTable.js';

const router = express.Router();

router.get('/', (req, res) => {
  generateTable();
  res.send('hello world');
});

router.route('/table').get(getTable).post(submitScore);
router.route('/word').post(submitWord);
router.route('/stats').get(getStatistics);

export default router;
