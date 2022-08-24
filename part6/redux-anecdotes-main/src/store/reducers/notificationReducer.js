import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      const newNotification = action.payload;
      return {
        message: newNotification,
      };
    },
    clearNotification(state) {
      return {
        message: null,
      };
    },
  },
});

export const { addNotification,clearNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
