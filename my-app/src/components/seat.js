

const Seat = (props) => {

    const styles = {
        position: 'absolute',
        left: `${props.seat.cords.y * props.seatSize}px`,
        top: `${props.seat.cords.x * props.seatSize}px`,
        width: `${props.seatSize - 10}px`,
        height: `${props.seatSize - 10}px`,
        margin: '0 10px 10px 0'
    };

    const classes = ['seat'];
    if (props.seat.reserved) classes.push('reserved');
    if (props.seatChosen) classes.push('chosen');
    if (props.seatUnavailable) classes.push('unavailable');

    return (
        <div 
        onClick={() => props.seatClickHandler(props.seat.id)} 
        className={classes.join(' ')} 
        style={styles} 
        >
        </div>
    );
};

export default Seat;