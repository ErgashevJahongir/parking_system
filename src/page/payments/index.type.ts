import { IParking } from "../parkings/index.type";

export interface IPayment {
  id: string;
  amount: number
  reservation: IParking
}

export interface IPaymentListResponse {
  reservations: IPayment[];
  count: number;
  page: number;
}