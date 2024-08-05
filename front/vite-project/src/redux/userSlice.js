import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userAppointments: [], 
  userId: null,
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
      console.log("Registro exitoso en estado global:", state.user);
    },

    addAppointment(state, action) {
      state.userAppointments = Array.isArray(action.payload) ? action.payload : []
      console.log("turno cargado al estado global: ",state.userAppointments)
    },

    cancelAppointments(state, action) {
      state.userAppointments = state.userAppointments.filter(appointment => appointment.id !== action.payload)
    }
  }
});

export const { registerSuccess, addAppointment, cancelAppointments } = userSlice.actions;
export default userSlice.reducer;
