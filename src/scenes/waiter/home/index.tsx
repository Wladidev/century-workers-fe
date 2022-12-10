import {Box, Button, Stack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import CloseSession from '../../../components/CloseSession';
import HomeTableCard from '../../../components/waiter/HomeTableCard';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import * as Services from '../../../services/waiter';
import {setProducts} from '../../../store/slices/products';

const WaiterHome = ({navigation}) => {
  const {tables} = useAppSelector(state => state.table);
  const {userId} = useAppSelector(state => state.login);
  const [userTables, setTables] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Services.getProducts();
        dispatch(setProducts({products: response?.data}));
      } catch (error) {
        // Todo agregar modal error al obtener productos
      }
    };
    const getTables = async () => {
      try {
        const response = await Services.getTablesById(userId);
        setTables(response.data);
      } catch (error) {
        console.log('This is the error ===>', error);
      }
    };
    getTables();
    getProducts();
  }, []);
  return (
    <Stack px="6" safeArea flex={1}>
      <Box mt="8" mb="6">
        <Text fontSize="3xl" textAlign="center" bold>
          Tus mesas activas
        </Text>
      </Box>
      {userTables.map(table => (
        <HomeTableCard table={table} navigation={navigation} />
      ))}

      <CloseSession navigation={navigation} />
    </Stack>
  );
};

export default WaiterHome;
