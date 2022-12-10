import {Box, Button, Text, useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getOrdersByTableId} from '../../services/waiter';

const preparation = {
  1: {title: 'Plato en preparación', color: 'yellow.500', bold: false},
  2: {title: 'Plato listo para la entrega', color: 'red.500', bold: true},
  3: undefined,
};

const Order = ({tableId}) => {
  const {orders: ordersFromFront} = useAppSelector(state => state.order);
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [statusId, setStatusId] = useState(3);

  useEffect(() => {
    const getTableOrders = async () => {
      try {
        const response = await getOrdersByTableId(tableId);
        const preparationStatus = response?.data?.reduce(
          (prev, cur) =>
            cur.estado_pedido === 2
              ? 2
              : cur.estado_pedido < prev
              ? cur.estado_pedido
              : prev,
          3,
        );
        console.log('Response data ===>', preparation);
        setStatusId(preparationStatus);
        setOrders(response.data);
      } catch (error) {
        toast.show({description: 'Error al obtener ordenes de la mesa'});
      }
    };
    getTableOrders();
  }, []);

  return orders?.length > 0 ? (
    <Box my="4">
      <Text mb="4" bold>
        Ordenes de la mesa
      </Text>
      {orders.map((order, index) => (
        <OrderComponent order={order} index={index} />
      ))}
    </Box>
  ) : (
    <Box>
      <Text mt="4" textAlign="center" bold fontSize="lg">
        Aún no hay pedidos en cocina / sin entregar.
      </Text>
    </Box>
  );
};

const OrderComponent = ({order, index}) => {
  const {estado_pedido} = order;
  return (
    <Box>
      <Box borderWidth={1} borderColor="black" borderRadius="md" p="2">
        <Text bold textAlign="center">
          Orden {index + 1}
        </Text>
        <Text width="80%" noOfLines={1} bold>
          {order?.receta?.nombre}
        </Text>

        <Text>$ {order?.receta?.precio?.toLocaleString('es-CL')}</Text>
        {estado_pedido === 2 && (
          <>
            <Text my="4" textAlign="center" fontSize="lg" bold>
              !Plato listo para entregar!
            </Text>
            <Button bg="green.600">Marcar como entregado</Button>
          </>
        )}
        {estado_pedido === 1 && (
          <>
            <Text
              my="4"
              color="orange.500"
              textAlign="center"
              fontSize="lg"
              bold>
              Plato en preparación
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};
export default Order;
