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
      onTouchStart={() => setHoveredTile(tile.id)}
      onTouchEnd={() => setHoveredTile(null)}
      onTouchMove={touch => {
        // Find the tile in the X/Y position of the touch
        if (touch.touches.length) {
          const touchPos = touch.touches[0];
          const element = document.elementFromPoint(
            touchPos.clientX,
            touchPos.clientY
          );
          if (element && element.dataset && element.dataset['tileId']) {
            setHoveredTile(parseInt(element.dataset['tileId']));
          }
        }
      }}
      className='LetterTile'
      style={{ backgroundColor: Colors[tile.highlight] }}
      data-tile-id={tile.id}
    >
      {tile.letter}
      <div className='LetterTile__Points'>{tile.points}</div>
    </div>
  );
}

export default Tile;
