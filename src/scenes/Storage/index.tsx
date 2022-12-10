import {Box, Button, Select, Stack, Text, useToast} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import CloseSession from '../../components/CloseSession';
import {getAllFromStorage} from '../../services/storage';

const Storage = ({navigation}) => {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [number, setNumber] = useState(1);
  const [product, setProduct] = useState(undefined);

  const handleChangeNumber = (type: 'add' | 'remove') => {
    if ((type === 'remove' && number > 1) || type === 'add') {
      setNumber(old => (type === 'add' ? old + 1 : old - 1));
    }
  };
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getAllFromStorage();
        setProducts(response.data);
      } catch (error) {
        toast.show({description: 'Ocurrío un error al obtener los productos.'});
      }
    };
    getAllProducts();
  }, []);

  const handleAddToStock = () => {
    toast.show({description: `${product} agregado satisfactioramente.`});
    setProduct(undefined);
    setNumber(1);
  };

  return (
    <Stack safeArea>
      <Box>
        <Text textAlign="center" fontSize="3xl" bold>
          Bodega
        </Text>
      </Box>
      <Box mt="4" px="6">
        <Text mb="4" bold>
          Agregar stock a producto
        </Text>
        <Select selectedValue={product} onValueChange={v => setProduct(v)}>
          {products.map(product => (
            <Select.Item
              label={product.descripcion}
              value={product.descripcion}
            />
          ))}
        </Select>
      </Box>
      {product && (
        <Box mt="4" justifyContent="center" alignContent="center" flexDir="row">
          <Button
            onPress={() => handleChangeNumber('remove')}
            borderRadius={0}
            width="20%">
            -
          </Button>
          <Text
            height="100%"
            borderRadius={0}
            borderColor="black"
            borderWidth={1}
            width="30%"
            textAlign="center"
            my="auto">
            {number}
          </Text>
          <Button
            onPress={() => handleChangeNumber('add')}
            borderRadius={0}
            width="20%">
            +
          </Button>
        </Box>
      )}
      <Box m="4" px="6">
        <Button isDisabled={!product} onPress={handleAddToStock} bg="green.500">
          Agregar stock
        </Button>
      </Box>
      <Box px="4">
        <CloseSession navigation={navigation} />
      </Box>
    </Stack>
  );
};

export default Storage;
