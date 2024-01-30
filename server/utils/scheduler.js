import schedule from 'node-schedule';
import { updateDay } from './config.js';
import { generateTable } from './generateTable.js';

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'Etc/UTC';

const init = () => {
  schedule.scheduleJob(rule, async () => {
    console.log('Updating day! Yippie! 🚀');
    await updateDay();
    await generateTable();
  });
  console.log('Initialized scheduler');
};

export default { init };
