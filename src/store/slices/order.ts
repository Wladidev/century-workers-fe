import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {Product} from './cart';

export type Order = {
  products: Array<Product>;
  total: number;
  status: 'kitchen' | 'ready' | 'delivered';
  orderId: string;
  tableId?: number;
};

interface InitialState {
  orders: Array<Order>;
}

const initialState: InitialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    handleAddCartToOrders: (
      state,
      action: PayloadAction<{
        total: number;
        products: Array<Product>;
        id: string;
      }>,
    ) => {
      const {total, products, id} = action.payload;
      const currentState = current(state);
      state.orders = [
        ...currentState.orders,
        {total, products, orderId: id, status: 'kitchen'},
      ];
    },
  },
});

export const {handleAddCartToOrders} = orderSlice.actions;
export default orderSlice.reducer;
