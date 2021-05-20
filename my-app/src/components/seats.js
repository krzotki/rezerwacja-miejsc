import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { seatsActions } from "../store/index";
import './seats.css';

const Seats = (props) => {

    const dispatch = useDispatch();
    const seatCount = useSelector(state => state.seatCount);
    const nextToEachOther = useSelector(state => state.nextToEachOther);
    let seats = useSelector(state => state.seats);
    const seatsChosen = useSelector(state => state.seatsChosen);

    useEffect(() => {
        const fetchSeats = async () => {
            const response = await fetch('http://localhost:3000/seats');

            const data = await response.json();
            dispatch(seatsActions.updateSeats(data));
        };

        fetchSeats();
    }, []);

    seats = seats.slice().sort((s1, s2) => {
        return s1.cords.x - s2.cords.x;
    });
    const minX = (seats[0] && seats[0].cords.x);
    const maxX = (seats[seats.length - 1] && seats[seats.length - 1].cords.x);

    seats = seats.slice().sort((s1, s2) => {
        return s1.cords.y - s2.cords.y;
    });
    const minY = (seats[0] && seats[0].cords.y);
    const maxY = (seats[seats.length - 1] && seats[seats.length - 1].cords.y);

    const seatSize = 60;

    const seatClickHandler = (seatId) => {
        const index = seatsChosen.findIndex(seat => seat == seatId);
        if(index > -1) {
            const newSeats = [...seatsChosen];
            newSeats.splice(index, 1);
            dispatch(seatsActions.updateChosenSeats(newSeats));
        }
        else {
            dispatch(seatsActions.updateChosenSeats(seatsChosen.concat(seatId)));
        }
    };

    const seatsElements = seats.map(seat => {
        const styles = {
            position: 'absolute',
            left: `${seat.cords.y * seatSize}px`,
            top: `${seat.cords.x * seatSize}px`,
            width: `${seatSize - 10}px`,
            height: `${seatSize - 10}px`,
            margin: '10px'
        };

        const classes = ['seat'];
        if(seat.reserved) classes.push('reserved');
        if(seatsChosen.includes(seat.id)) classes.push('chosen');

        return <div onClick={() => seatClickHandler(seat.id)} className={classes.join(' ')} style={styles} key={seat.id}>{seat.id}</div>;
    });

    console.log(seatsChosen)

    const containerStyles = {
        width: `${(maxY - minY + 1) * seatSize}px`,
        height: `${(maxX - minX + 1) * seatSize}px`,
    };

    return (
        <div className='all_seats' style={containerStyles}>
            {seatsElements}
        </div>
    );
};

export default Seats;