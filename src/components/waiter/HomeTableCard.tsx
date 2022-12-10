import {Box, Button, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {getOrdersByTableId} from '../../services/waiter';
import {Table} from '../../types';

const preparation = {
  1: {title: 'Plato en preparación', color: 'yellow.500', bold: false},
  2: {title: 'Plato listo para la entrega', color: 'red.500', bold: true},
  3: undefined,
};

const tables = {
  1: 'Uno',
  2: 'Dos',
  3: 'Tres',
  4: 'Cuatro',
  5: 'Cinco',
  6: 'Seis',
  7: 'Siete',
  8: 'Ocho',
};

const HomeTableCard: React.FC<{table: Table; navigation: any}> = ({
  table,
  navigation,
}) => {
  const {preparationStatusId, isWaiterCalled, id_mesa} = table;
  const [statusId, setStatusId] = useState(3);

  console.log('table ===>', table);

  useEffect(() => {
    const getTableOrders = async () => {
      try {
        const response = await getOrdersByTableId(id_mesa);
        console.log('This is the response data ===>', response.data);
        const preparationStatus = response?.data?.reduce(
          (prev, cur) =>
            cur.estado_pedido === 2
              ? 2
              : cur.estado_pedido < prev
              ? cur.estado_pedido
              : prev,
          3,
        );
        console.log(preparationStatus);
        setStatusId(preparationStatus);
      } catch (error) {
        console.log('This is the= > ', error.response);
      }
    };
    getTableOrders();
  }, []);

  return (
    <Box mb="4" p="4" borderWidth="1" borderRadius="lg" borderColor="black">
      <Box flexDir="row" justifyContent="space-between">
        {preparation[statusId] && (
          <Text
            bold={preparation[statusId]?.bold}
            color={preparation[statusId]?.color}>
            {preparation[statusId]?.title}
          </Text>
        )}
        {isWaiterCalled && <Text color="emerald.600">Te han llamado</Text>}
      </Box>
      <Text mb="3" fontSize="lg">
        Mesa {tables[id_mesa]}
      </Text>
      <Button onPress={() => navigation.navigate('TableInfo', {table})}>
        Ver mesa
      </Button>
    </Box>
  );
};

export default HomeTableCard;
