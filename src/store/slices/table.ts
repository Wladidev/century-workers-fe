import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {Table} from '../../types';

interface InitialState {
  tables: Array<Table>;
}

const initialState: InitialState = {
  tables: [
    {
      isWaiterCalled: false,
      orders: [],
      preparationStatusId: 0,
      tableNumber: 1,
    },
    {
      isWaiterCalled: true,
      orders: [],
      preparationStatusId: 0,
      tableNumber: 3,
    },
    {
      isWaiterCalled: false,
      orders: [],
      preparationStatusId: 1,
      tableNumber: 5,
    },
  ],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setCallAsAttended: (state, action: PayloadAction<{id: number}>) => {
      const currentState = current(state);
      const {tables} = currentState;
      const {id} = action.payload;
      state.tables = tables.map(table =>
        table.tableNumber === id ? {...table, isWaiterCalled: false} : table,
      );
    },
  },
});

export const {setCallAsAttended} = tableSlice.actions;
export default tableSlice.reducer;
