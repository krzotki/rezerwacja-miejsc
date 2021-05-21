import { useSelector } from "react-redux";

const Summary = () => {

    const seatsChosen = useSelector(state => state.seatsChosen);
    const seats = useSelector(state => state.seats);

    console.log(seatsChosen, seats);

    const seatsElements = seatsChosen.map(id => seats.find(seat => seat.id === id)).map(seatChosen => {
        return(
            <p key={seatChosen.id}>Rząd {seatChosen.cords.x} Miejsce {seatChosen.cords.y} ({seatChosen.id})</p>
        );
    });

    return (
        <div>
            <h3>Twoja rezerwacja przebiegła pomyślnie!</h3>
            <p>Wybrane miejsca:</p>
            {seatsElements}
        </div>
    );
};

export default Summary;