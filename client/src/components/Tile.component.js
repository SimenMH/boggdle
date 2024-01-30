const Colors = {
  0: '', // Default
  1: '#b59f3b', // Select
  2: '#538d4e', // Correct
  3: '#f5563a', // Incorrect
  4: '#2b2b2e', // Disabled
};

function Tile({ tile, setHoveredTile }) {
  return (
    <div
      onMouseEnter={() => setHoveredTile(tile.id)}
      onMouseLeave={() => setHoveredTile(null)}
      className='LetterTile'
      style={{ backgroundColor: Colors[tile.highlight] }}
    >
      {tile.letter}
      <div className='LetterTile__Points'>{tile.points}</div>
    </div>
  );
}

export default Tile;
