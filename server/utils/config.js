import Characters from '../data/characters.json' assert { type: 'json' };
import Config from '../models/configModel.js';
import { generateTable } from './generateTable.js';

export const getDay = async () => {
  let config = await Config.findOne({});
  return `#${config.Day}`;
};

export const getCharacters = async () => {
  let config = await Config.findOne({});
  return config.Characters;
};

export const updateDay = async () => {
  const config = await Config.findOne({});
  config.Day = config.Day + 1;
  await config.save();
};

export const initConfig = async () => {
  let config = await Config.findOne({});
  if (!config) {
    const newConfig = await Config.create({
      Day: 1,
      Characters: Characters,
    });

    await generateTable();
  }
};
