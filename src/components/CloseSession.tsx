import {Box, Button} from 'native-base';
import React from 'react';
import {useAppDispatch} from '../hooks';
import {logIn} from '../store/slices/login';

const CloseSession = ({navigation}) => {
  const dispatch = useAppDispatch();

  const closeSession = () => {
    navigation.navigate('Login');
    dispatch(logIn({mail: undefined, rol: undefined, userId: undefined}));
  };
  return (
    <Box my="4">
      <Button onPress={closeSession} bg="red.500">
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default CloseSession;
