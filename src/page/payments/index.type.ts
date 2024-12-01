import { IParking } from "../parkings/index.type";

export interface IPayment {
  id: string;
  end_time: string
  car_number: string
  summ: number
  reservation: IParking
}

export interface IPaymentListResponse {
  payment: IPayment[];
  count: number;
  page: number;
}