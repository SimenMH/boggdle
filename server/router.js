import express from 'express';
import {
  getStatistics,
  getTable,
  submitScore,
  submitWord,
} from './controllers/tableController.js';
import { adminAuth } from './middleware/adminAuth.js';
import { regenNextTable, regenTable } from './controllers/adminController.js';

const router = express.Router();

router.route('/table').get(getTable).post(submitScore);
router.route('/word').post(submitWord);
router.route('/stats').get(getStatistics);

router.route('/admin/regen').all(adminAuth).put(regenTable);
router.route('/admin/regenNextTable').all(adminAuth).put(regenNextTable);

export default router;
