import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  userAppointments: JSON.parse(localStorage.getItem('userAppointments')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerSuccess(state, action) {
      const userData = action.payload;
      state.userId = userData.id;  
      state.user = userData;  
      state.userAppointments = [];

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', JSON.stringify(userData.id));
    },

    addAppointment(state, action) {
      // Aseguramos que el turno se añade al array de turnos en el estado global
      state.userAppointments = [...state.userAppointments, action.payload];
      localStorage.setItem('userAppointments', JSON.stringify(state.userAppointments));
      console.log("Turno añadido al estado global:", state.userAppointments);
    },    

    cancelAppointments(state, action) {
      state.userAppointments = state.userAppointments.filter(appointment => appointment.id !== action.payload);
      localStorage.setItem('userAppointments', JSON.stringify(state.userAppointments));
    }
  }
});

export const { registerSuccess, addAppointment, cancelAppointments } = userSlice.actions;
export default userSlice.reducer;
