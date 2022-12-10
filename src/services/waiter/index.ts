import axios from 'axios';

const getProducts = () => {
  return axios.get('http://localhost:8080/recetas');
};

const getTablesById = id => {
  return axios.get(`http://localhost:8080/mesas/funcionario/${id}`);
};

const postPedido = pedido => {
  return axios.post(
    `http://localhost:8080/pedidos?id_mesa=${pedido.id_mesa}&id_receta=${pedido.id_receta}&descripcion=${pedido.descripcion}&estado_pedido=${pedido.estado_pedido}`,
  );
};

const getOrdersByTableId = id => {
  return axios.get(`http://localhost:8080/pedidos/mesa/${id}`);
};

export {getProducts, postPedido, getTablesById, getOrdersByTableId};
