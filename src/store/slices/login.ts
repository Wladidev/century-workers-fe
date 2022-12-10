import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  isLogged: boolean;
  mail: string;
  rol: string;
  userId: number;
}

const initialState: InitialState = {
  isLogged: false,
  mail: undefined,
  rol: undefined,
  userId: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        mail: string;
        rol: 'waiter' | 'cellar' | 'admin';
        userId: number;
      }>,
    ) => {
      const {mail, rol, userId} = action.payload;
      state.isLogged = true;
      state.mail = mail;
      state.rol = rol;
      state.userId = userId;
    },
  },
});

export const {logIn} = loginSlice.actions;
export default loginSlice.reducer;
