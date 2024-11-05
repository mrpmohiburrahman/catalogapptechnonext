// src/features/timestamp/timestampSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TimestampState {
  currentTimestamp: string;
}

const initialState: TimestampState = {
  currentTimestamp: '',
};

const timestampSlice = createSlice({
  name: 'timestamp',
  initialState,
  reducers: {
    setTimestamp(state, action: PayloadAction<string>) {
      state.currentTimestamp = action.payload;
    },
  },
});

export const { setTimestamp } = timestampSlice.actions;

export default timestampSlice.reducer;
