import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Compliment {
  name: string;
  content: string;
  date: string;
}

export interface ComplimentWithId extends Compliment {
  id: number;
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
    updateItem: (state, action: PayloadAction<ComplimentWithId>) => {
      const { id, name, content, date } = action.payload;
      state.complimentList[id] = { name, content, date };
    }
  }
})

export const { addItem, deleteItem, updateItem } = complimentSlice.actions;
export default complimentSlice.reducer;
