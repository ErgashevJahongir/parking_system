import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import i18next from "i18next";
import { formSchema } from "./validation";

export interface IPayment {
  id: number;
  amount: number;
  payed: boolean;
  residual: number;
  date: string;
}

export interface IStore {
  id: number;
  title: string;
  is_active: boolean;
  amount: number;
  created_at: string;
  boss: string;
  username: string;
  password: string;
  responsible_person: string;
  manager: string;
  location: string;
  additional_phone_number: string;
  phone_number: string;
  payed_date: string;
  block: boolean;
  payment_list: IPayment[];
}

export interface IStoreSingleResponse {
  success: boolean;
  message: string;
  results: IStore;
}

export interface IStoreForm {
  title: string;
  is_active: boolean;
}

export interface IStoreListResponse {
  success: boolean;
  message: string;
  results: IStore[];
  total_count: number;
  page: number;
  page_count: number;
  per_page: number;
}

const formSchemaShop = formSchema(i18next.t);

export interface IShopForm {
  form: UseFormReturn<
    {
      title: string;
      boss: string;
      manager: string;
      responsible_person: string;
      password: string;
      username: string;
      additional_phone_number: string;
      phone_number: string;
      location: string;
      amount: number;
      payed_date: Date;
    },
    unknown,
    undefined
  >;
  children: React.ReactNode;
  handleSubmit: (values: z.infer<typeof formSchemaShop>) => void;
}

export interface IOrder {
  id: number;
  amount: number;
  payed: boolean;
  residual: number;
  date: string;
  month: number
  product: string
}

export interface IStoreReports {
  id: number;
  title: string;
  total_sales_price: number,
  sales_count: number,
  is_active: boolean;
  amount: number;
  created_at: string;
  boss: string;
  username: string;
  password: string;
  responsible_person: string;
  manager: string;
  location: string;
  additional_phone_number: string;
  phone_number: string;
  payed_date: string;
  block: boolean;
  orders: IOrder[];
}
