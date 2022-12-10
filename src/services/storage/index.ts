import axios from 'axios';

const getAllFromStorage = () => {
  return axios.get('http://localhost:8080/productos');
};

export {getAllFromStorage};
