import { gql } from '../helpers/utils';

export const getOrders = async () =>
  gql(
    `query {
        OrderGoodFind(query: "[{}]") {
            _id
            createdAt
            price
            count
            total
        }
    }`,
  );

export const createOrder = async (id, count) =>
  gql(
    `mutation($order: OrderInput) {
      OrderUpsert(order: $order) {
        _id
        createdAt
        total
      }
    }`,
    { order: { orderGoods: [{ good: { _id: id }, count }] } },
  );
