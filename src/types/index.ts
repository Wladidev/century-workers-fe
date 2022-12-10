export type Table = {
  preparationStatusId: 0 | 1 | 2;
  isWaiterCalled: boolean;
  tableNumber: number;
  orders: Array<number>;
};
