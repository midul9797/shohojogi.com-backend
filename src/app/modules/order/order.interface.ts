export type ICreateOrder = {
  userId: string;
  delivery_time: string;
  service: string;
  contact: string;
  address: string;
  order_details: string;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  note: string;
};
