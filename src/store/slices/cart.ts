import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

export type Product = {
  cantidad: number;
  descripcion: string;
  id_receta: number;
  imagen: string;
  precio: number;
  bodega_cocina: null | any;
  tipo_receta: {
    descripcion: string;
    id_tipo_receta: number;
  };
};

interface InitialState {
  cart: Array<Product>;
  productsIds: Array<number>;
  total: number;
  tableId?: number;
}

const initialState: InitialState = {
  cart: [],
  productsIds: [],
  total: 0,
};

const updateTotalCart = (cart: Array<Product>) =>
  cart.reduce((prev, curr) => prev + curr.precio, 0);

export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{productId: number; products: Array<Product>}>,
    ) => {
      const {products, productId} = action.payload;
      const currentState = current(state);
      const productToAdd = products.filter(p => p.id_receta === productId);
      const updatedCart = [...currentState.cart, productToAdd[0]];
      state.cart = updatedCart;
      state.total = updateTotalCart(updatedCart);
    },
    deleteProductFromCart: (state, action: PayloadAction<{id: number}>) => {
      const {id} = action.payload;
      const currentState = current(state);

      const updatedCart = currentState?.cart.filter(p => p.id_receta !== id);
      state.cart = updatedCart;
      state.total = updateTotalCart(updatedCart);
    },
    deleteAllCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {addProductToCart, deleteProductFromCart, deleteAllCart} =
  cartSlice.actions;
export default cartSlice.reducer;
