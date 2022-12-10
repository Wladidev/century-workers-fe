import {Box, Button, Stack, Text, useToast, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import CloseSession from '../../components/CloseSession';
import {getAllPedidos, markPedidoAsReady} from '../../services/kitchen';

const Kitchen = ({navigation}) => {
  const toast = useToast();
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    const getPedidos = async () => {
      try {
        const response = await getAllPedidos();

        setPedidos(response.data.filter(p => p.estado_pedido === 1));
      } catch (error) {
        toast.show({description: 'Error al obtener los pedidos'});
      }
    };
    getPedidos();
  }, []);
  return (
    <Stack safeArea>
      <Text bold textAlign="center" fontSize="3xl">
        Cocina
      </Text>
      {pedidos.length < 1 ? (
        <Text>Aún no hay pedidos para realizar</Text>
      ) : (
        <ScrollView>
          <Box mt="4">
            {pedidos.map(pedido => (
              <PedidoCard pedido={pedido} />
            ))}
          </Box>
        </ScrollView>
      )}
      <CloseSession navigation={navigation} />
    </Stack>
  );
};

const PedidoCard = ({pedido}) => {
  const [show, setShow] = useState(true);
  const toast = useToast();

  const handleMarkAsDone = async () => {
    try {
      const response = await markPedidoAsReady(pedido.id_pedido, 2);
      console.log('This is the response ===>', response);
      if (response.data) {
        setShow(false);
      }
    } catch (error) {
      toast.show({description: 'Error al marcar pedido como listo'});
    }
  };

  return show ? (
    <Box p="4" borderBottomColor="black" borderBottomWidth={1}>
      <Text bold fontSize="2xl">
        Plato a preparar:
      </Text>
      <Text fontSize="lg">{pedido?.receta?.nombre}</Text>
      <Button onPress={handleMarkAsDone} mt="4" bg="green.600">
        Marcar como realizado
      </Button>
    </Box>
  ) : null;
};

export default Kitchen;
