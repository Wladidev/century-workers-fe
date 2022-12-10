import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Stack,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {isMailValid} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logIn} from '../../store/slices/login';
import * as loginService from '../../services/login';
const navigationScreens = {
  waiter: 'WaiterHome',
};

const roles = {
  1: {navigation: 'WaiterHome'}, // Mesero
  2: {navigation: 'Kitchen'}, // cocina
  3: {navigation: 'Storage'}, //Bodega
  4: {navigation: 'WaiterHome'}, // Admin
  5: {navigation: 'WaiterHome'}, // finanzas
};

//

const Login = ({navigation}) => {
  const [login, setLogin] = useState({
    mail: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const {isLogged, rol} = useAppSelector(state => state.login);

  const [validations, setValidations] = useState(false);

  const {mail, password} = login;

  const handleCheckMail = () => {
    const isValid = isMailValid(mail);
    setValidations(!isValid);
  };

  // navigation.navigate(roles[1]);

  const toast = useToast();
  const handleLogin = async () => {
    try {
      const resp = await loginService.login({
        correo: mail,
        contrasena: password,
      });
      const userRol =
        resp?.data?.funcionario?.tipo_funcionario?.id_tipo_funcionario;
      dispatch(
        logIn({
          mail,
          rol: userRol,
          userId: resp?.data?.funcionario?.id_funcionario,
        }),
      );
      console.log('user rol ===>', userRol);
      switch (userRol) {
        case 1:
          navigation.navigate('WaiterHome');
          break;
        case 2:
          navigation.navigate('Kitchen');
          break;
        case 3:
          navigation.navigate('Storage');
          break;
        default:
          navigation.navigate('WaiterHome');
          break;
      }
      setLogin({mail: '', password: ''});
    } catch (error) {
      toast.show({
        description: 'Correo y/o contraseña invalidos',
      });
    }
  };

  const disabled = !isMailValid(mail) || !password;

  return (
    <KeyboardAvoidingView
      h={{
        base: '400px',
        lg: 'auto',
      }}
      flex={1}
      behavior="padding">
      <Stack flex={1}>
        <Box my="auto">
          <Box px="12" my="auto">
            <Text mb="20" fontSize={'2xl'} bold textAlign="center">
              Login Trabajadores{'\n'}Siglo 21
            </Text>
            <FormControl mb="4" isInvalid={validations}>
              <FormControl.Label>Correo</FormControl.Label>
              <Input
                value={mail}
                onChangeText={value =>
                  setLogin(old => ({...old, mail: value?.toLowerCase()}))
                }
                onBlur={handleCheckMail}
                placeholder="Ingresa tu correo"
              />
              <FormControl.ErrorMessage>
                Correo invalido.
              </FormControl.ErrorMessage>
            </FormControl>
            <Text>Contraseña</Text>
            <Input
              mb="4"
              value={password}
              onChangeText={value =>
                setLogin(old => ({...old, password: value}))
              }
              type="password"
            />
            <Button isDisabled={disabled} onPress={handleLogin}>
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
      </Stack>
    </KeyboardAvoidingView>
  );
};

export default Login;
