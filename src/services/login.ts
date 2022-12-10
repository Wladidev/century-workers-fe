import axios from 'axios';

const login = ({correo, contrasena}) => {
  return axios.post(
    `http://localhost:8080/login?correo=${correo}&contrasena=${contrasena}`,
    {
      correo,
      contrasena,
    },
  );
};

export {login};
