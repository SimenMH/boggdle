import { useState, useEffect } from 'react';
import { getStatistics } from '../api/boggdleAPI';
import { getHighScores, getSaveData } from '../utils/localStorage';

function Statistics({ day }) {
  const [statistics, setStatistics] = useState(null);
  const [saveData, setSaveData] = useState(null);
  const [highScores, setHighScores] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const newStatistics = await getStatistics();
      setStatistics(newStatistics);
      const newSaveData = getSaveData(day);
      setSaveData(newSaveData);
      const newHighScores = getHighScores();
      setHighScores(newHighScores);
    }
    loadStats();
  }, [day]);

  return (
    <>
      <div className='Statistics'>
        {/* FINAL SCORE */}
        {saveData && (
          <div className='Statistics__FinalScore'>
            Well done! Your final score is: <span>{saveData['score']}</span>
          </div>
        )}
        {/* HIGH SCORE */}
        {highScores && highScores['score'] !== 0 && (
          <div className='Statistics__HighScore'>
            Your all-time highest score: <span>{highScores['score']}</span>
          </div>
        )}
        {/* BEST WORD */}
        {highScores && highScores['word']['word'] && (
          <div className='Statistics__HighScore'>
            Your all-time highest scoring word:{' '}
            <span>
              {`${highScores['word']['word']} (+${highScores['word']['points']})`}
            </span>
          </div>
        )}
        {/* STATISTICS */}
        {statistics && (
          <>
            <div className='Statistics__StatsHeader'>
              Today's highest scoring solution:
            </div>
            <div className='Statistics__Stats Statistics__HighestSolution'>
              {statistics.best.map(obj => {
                return (
                  <p key={obj.word}>
                    {obj.word} (+{obj.points})
                  </p>
                );
              })}
            </div>
            <div className='Statistics__StatsHeader'>
              Today's most popular words:
            </div>
            <div className='Statistics__Stats Statistics__MostPopular'>
              {statistics.popular.map((obj, idx) => {
                return (
                  <p key={obj.word}>
                    {idx + 1}. {obj.word} (+{obj.points})
                  </p>
                );
              })}
            </div>
            <div className='Statistics__StatsHeader'>
              Today's average score: <span>{statistics.average}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Statistics;
