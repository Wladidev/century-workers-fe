import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

type Product = {
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
  products: Array<Product>;
}

const initialState: InitialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{products: Array<Product>}>) => {
      const {products} = action.payload;
      state.products = products;
    },
  },
});

export const {setProducts} = productsSlice.actions;
export default productsSlice.reducer;
