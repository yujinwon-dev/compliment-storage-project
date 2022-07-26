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
    addItem: (state, action: PayloadAction<Compliment>) => {
      state.complimentList.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.complimentList.splice(action.payload, 1);
    },
  }
})

export const { addItem, deleteItem } = complimentSlice.actions;
export default complimentSlice.reducer;
