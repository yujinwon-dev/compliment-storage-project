import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Compliment {
  name: string;
  content: string;
  date: string;
}

interface ComplimentState {
  complimentList: Array<Compliment>;
}

const initialState: ComplimentState = {
  complimentList: [],
}

export const complimentSlice = createSlice({
  name: 'compliment',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Compliment>) => {
      state.complimentList.push(action.payload);
    }
  }
})

export const { add } = complimentSlice.actions;
export default complimentSlice.reducer;
