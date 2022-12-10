import {
  Box,
  Button,
  ScrollView,
  Select,
  Stack,
  Text,
  Tooltip,
  useToast,
} from 'native-base';
import React, {useId, useState} from 'react';
import AlertComponent from '../../../components/AlertComponent';
import Order from '../../../components/waiter/Order';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {postPedido} from '../../../services/waiter';
import {
  addProductToCart,
  deleteAllCart,
  deleteProductFromCart,
  Product,
} from '../../../store/slices/cart';
import {handleAddCartToOrders} from '../../../store/slices/order';
import {setCallAsAttended} from '../../../store/slices/table';
import {Table as TableI} from '../../../types';

const Table = ({navigation, route}) => {
  const [table, setTable] = useState(route?.params?.table);
  const {preparationStatusId, isWaiterCalled, tableNumber, orders, id_mesa} =
    table;

  const {products} = useAppSelector(state => state.products);
  const {cart, total} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const handleMarkAsAttended = () => {
    dispatch(setCallAsAttended({id: tableNumber}));
    setTable(old => ({...old, isWaiterCalled: false}));
  };

  const handleAddProductToCart = product => {
    dispatch(addProductToCart({productId: product, products}));
  };

  return (
    <Stack px="4" safeArea>
      <Box>
        <Text bold textAlign={'center'} fontSize="3xl">
          Mesa {tableNumber}
        </Text>
      </Box>
      {isWaiterCalled && (
        <Box mt="4" justifyContent="center" flexDir={'row'}>
          <Button onPress={handleMarkAsAttended}>
            Marcar llamado como atendido
          </Button>
        </Box>
      )}
      <Box my="4">
        <Text bold>Agregar productos</Text>
      </Box>
      <Box>
        <Select onValueChange={handleAddProductToCart}>
          {products.map(product => (
            <Select.Item
              key={product.id_receta}
              isDisabled={product?.cantidad < 1}
              label={product?.nombre}
              value={product.id_receta}
            />
          ))}
        </Select>
      </Box>
      {cart.length > 0 && <CartProducts cart={cart} total={total} />}
      <Order tableId={id_mesa} />
    </Stack>
  );
};

const CartProducts: React.FC<{cart: Array<Product>; total: number}> = ({
  cart,
  total,
}) => {
  const id = useId();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const handleDeleteProduct = productId => {
    dispatch(deleteProductFromCart({id: productId}));
  };

  const handleDeleteCart = () => {
    dispatch(deleteAllCart({}));
  };

  const handleAddCartToOrder = () => {
    try {
      dispatch(handleAddCartToOrders({products: cart, total, id}));
      // Promise.all(
      //   cart.map(async p => {
      //     const pedido = {
      //       id_mesa: 7,
      //       id_receta: p.id_receta,
      //       descripcion: 'a',
      //       estado_pedido: 1,
      //     };
      //     console.log('This is the pedido ===>', pedido);
      //     const response = await postPedido(pedido);
      //     console.log('This is the response ===>', response);
      //   }),
      // ).catch(e => {
      //   toast.show({
      //     description: 'Ocurrío un error',
      //   });
      // });
    } catch (error) {
      console.log('This is the error ==>', error.response);
      toast.show({
        description: 'Ocurrío un error',
      });
    }
    // dispatch(deleteAllCart({}));
  };

  return (
    <>
      <Box my="4">
        <Text mb="2" bold>
          Productos agregados
        </Text>
        <Box borderRadius="md" borderWidth={1} borderColor="black">
          <ScrollView p="2" height={200}>
            <Box>
              {cart.map(product => (
                <Button
                  onPress={() => handleDeleteProduct(product.id_receta)}
                  variant="unstyled">
                  <Box flex={1} flexDir="row" justifyContent="space-between">
                    <Text width="70%" noOfLines={1} bold>
                      {product?.nombre}
                    </Text>
                    <Text width="30%" ml="4">
                      $ {product?.precio?.toLocaleString('es-CL')}
                    </Text>
                  </Box>
                </Button>
              ))}
            </Box>
          </ScrollView>
        </Box>
        <Box mt="2" flexDir="row" justifyContent="space-between">
          <Text bold>Total</Text>
          <Text>$ {total.toLocaleString('es-CL')}</Text>
        </Box>
        <Box justifyContent="space-between" flexDir={'row'}>
          <AlertComponent
            config={{
              description: '¿Estás seguro de eliminar el pedido?',
              title: 'Estás apunto de eliminar todo el pedido',
              primaryButtonColor: 'red',
              modalButtonProps: {
                mt: 2,
                colorScheme: 'red',
              },
              modalButtonText: 'Eliminat todo el pedido',
              onCancel: () => null,
              onPress: handleDeleteCart,
              primaryButtonText: 'Sí, eliminar',
              secondaryButtonText: 'Cancelar',
            }}
          />
          <Button
            onPress={handleAddCartToOrder}
            colorScheme="green"
            isDisabled={cart?.length < 1}
            mt="2">
            Enviar a cocina
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Table;
