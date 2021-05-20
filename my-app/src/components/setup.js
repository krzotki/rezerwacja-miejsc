import {  Input, Checkbox, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {seatsActions } from '../store/index';

const Setup = () => {
    const dispatch = useDispatch();

    const handleInputChange = (evt) => {
        dispatch(seatsActions.changeSeatsAmount(evt.target.value));
    };

    const handleCheckboxChange = (evt) => {
        console.log(evt)
        dispatch(seatsActions.setNextToEachOther(evt.target.checked));
    };

    const seatCount = useSelector(state => state.seatCount);
    const checked = useSelector(state => state.nextToEachOther)

    return (
        <div className="site-layout-content">

            <Input value={seatCount} type='number' addonBefore='Liczba miejsc' onChange={(evt) => handleInputChange(evt)}></Input>

            <Checkbox checked={checked} onChange={(evt) => handleCheckboxChange(evt)}>Czy miejsca mają być obok siebie?</Checkbox>
            <NavLink to='/seats' exact>
                 <Button >Wybierz miejsca</Button>
            </NavLink>
        </div>
    );
};

export default Setup;