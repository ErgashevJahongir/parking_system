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

export interface IAdmin {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  admin_type: string
  password: string
  phone_number: string
}

export interface IAdminSingleResponse {
  success: boolean;
  message: string;
  results: IAdmin;
}

export interface IAdminForm {
  title: string;
  is_active: boolean;
}

export interface IAdminListResponse {
  success: boolean;
  message: string;
  results: IAdmin[];
  total_count: number;
  page: number;
  page_count: number;
  per_page: number;
}

const formSchemaShop = formSchema(i18next.t);

export interface IAdminForm {
  form: UseFormReturn<
    {
      username: string;
      first_name: string;
      last_name: string;
      admin_type: string
      phone_number: string
      password: string
    },
    unknown,
    undefined
  >;
  children: React.ReactNode;
  handleSubmit: (values: z.infer<typeof formSchemaShop>) => void;
}
