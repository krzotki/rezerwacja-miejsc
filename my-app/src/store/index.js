import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
    seatCount: 0,
    nextToEachOther: false,
    seats: [],
    seatsChosen: [],
};

const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        changeSeatsAmount(state, action) {
            state.seatCount = action.payload;
        },
        setNextToEachOther(state, action) {
            state.nextToEachOther = action.payload;
        },
        updateSeats(state, action) {
            state.seats = action.payload;
        },
        updateChosenSeats(state, action) {
            state.seatsChosen = action.payload;
        }
    } 
});

const store = configureStore({
    reducer: seatsSlice.reducer
});

export const seatsActions = seatsSlice.actions;
export default store;

