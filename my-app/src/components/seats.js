import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { seatsActions } from "../store/index";
import { Button } from "antd";
import Seat from '../components/seat';
import Aux from '../components/myAux';
import './seats.css';
import { Link } from "react-router-dom";

const getUnavailableSeats = (seatCount, seats, minX, maxX, minY, maxY, chosenSeatsIds) => {
    const unavailableSeats = [];
    let seatsCombo = [];

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            const seat = seats.find(seat => seat.cords.x === i && seat.cords.y === j);

            if ((!seat || seat.reserved)) {
                if (seatsCombo.length < seatCount) {
                    unavailableSeats.push(...seatsCombo);
                }
                seatsCombo = [];
            }
            else {
                seatsCombo.push(seat.id);
            }
        }

        if (seatsCombo.length < seatCount) {
            unavailableSeats.push(...seatsCombo);
        }
        seatsCombo = [];
    }

    return unavailableSeats;
};

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

        const seat = seats.find(seat => seat.id === seatId);
        const index = seatsChosen.findIndex(seat => seat === seatId);
        if (index > -1) {
            const newSeats = [...seatsChosen];
            newSeats.splice(index, 1);
            dispatch(seatsActions.updateChosenSeats(newSeats));
        }
        else {

            let sameRow = true;

            if (seatsChosen.length > 0) {
                const firstChosen = seats.find(seat => seat.id === seatsChosen[0]);
                sameRow = ((!nextToEachOther) || (nextToEachOther && firstChosen.cords.x === seat.cords.x));
            }

            if (seatsChosen.length < seatCount && !seat.reserved && !unavailableSeats.includes(seatId) && sameRow) {
                dispatch(seatsActions.updateChosenSeats(seatsChosen.concat(seatId)));
            }
        }
    };

    const unavailableSeats = getUnavailableSeats(seatCount, seats, minX, maxX, minY, maxY, seatsChosen);

    const seatsElements = seats.map(seat =>
        <Seat
            key={seat.id}
            seat={seat}
            seatSize={seatSize}
            seatClickHandler={(seatId) => seatClickHandler(seatId)}
            seatChosen={seatsChosen.includes(seat.id)}
            seatUnavailable={unavailableSeats.includes(seat.id)}
        ></Seat>
    );

    const containerStyles = {
        width: `${(maxY - minY + 1) * seatSize}px`,
        height: `${(maxX - minX + 1) * seatSize}px`,
    };

    const finalCheck = () => {

        if (seatsChosen.length != seatCount) {
            return false;
        }

        if (!nextToEachOther) {
            return true;
        }

        let chosenSeats = seatsChosen.map(id => seats.find(seat => seat.id === id));

        chosenSeats = chosenSeats.slice().sort((s1, s2) => {
            return s1.cords.y - s2.cords.y;
        });

        for (let i = 1; i < chosenSeats.length; i++) {
            if (chosenSeats[i].cords.y - chosenSeats[i - 1].cords.y > 1) {
                return false;
            }
        }

        return true;
    };

    return (
        <Aux>
            <h3>Wybierz {seatCount} miejsc {nextToEachOther && "obok siebie"}</h3>
            <p>Pozostało jeszcze {seatCount - seatsChosen.length}</p>

            <div className='all_seats' style={containerStyles}>
                {seatsElements}
            </div>

            <div className='footer'>
                <div className='seat_legend'> Miejsce dostępne </div>
                <div className='seat_legend reserved'> Miejsce zajęte </div>
                <div className='seat_legend chosen'> Miejsce wybrane przez Ciebie </div>
                <div className='seat_legend unavailable'> Brak miejsca dla {seatCount} osób </div>

                <Link to='/summary'>
                    <Button
                        disabled={!finalCheck()}
                    >
                        Zatwierdź
                    </Button>
                </Link>

            </div>
        </Aux>
    );
};

export default Seats;