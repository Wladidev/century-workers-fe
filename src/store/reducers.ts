import {combineReducers} from 'redux';
import login from './slices/login';
import table from './slices/table';
import products from './slices/products';
import cart from './slices/cart';
import order from './slices/order';

const rootReducer = combineReducers({
  login,
  table,
  products,
  cart,
  order,
});

export default rootReducer;
