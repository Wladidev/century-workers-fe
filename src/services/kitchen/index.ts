import axios from 'axios';

const getAllPedidos = () => {
  return axios.get('http://localhost:8080/pedidos');
};

const markPedidoAsReady = (id_pedido, estado) => {
  return axios.post(
    `http://localhost:8080/pedido?id_pedido=${id_pedido}&estado=${estado}`,
  );
};

export {getAllPedidos, markPedidoAsReady};
