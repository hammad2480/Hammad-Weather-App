import {createSlice} from '@reduxjs/toolkit';

export const TemperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    unit:"C"
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "C" ? "F" : "C";
    },
  },
});


export const {
   toggleUnit
} = TemperatureSlice.actions;
export default TemperatureSlice.reducer;