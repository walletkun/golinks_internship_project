const GameTile = ( { letter, status }) => {
    // Determining the appropriate class based on the status
    const statusClass = status ? `tile-${status}` : 'tile-default';

    return (
        <div className={`tile ${statusClass}`}>
            {letter}
        </div>
    )
}

export default GameTile;