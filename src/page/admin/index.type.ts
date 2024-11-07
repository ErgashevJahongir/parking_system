import * as z from "zod";
import { formSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";
import { IOrder } from "../orders/index.type";

export interface IClient {
  id: number;
  full_name: string;
  phone_number: string;
  orders: IOrder[];
  created_at: string;
}

export interface IClientSingleResponse {
  success: boolean;
  message: string;
  results: IClient;
}

export interface IClientForm {
  full_name: string;
  phone_number: string;
  stores: string[];
}

export interface IClientListResponse {
  success: boolean;
  message: string;
  results: IClient[];
  total_count: number;
  page: number;
  page_count: number;
  per_page: number;
}

const formSchemaNotification = formSchema();

export interface IClientFormProps {
  isLoading: boolean;
  isUpdate?: boolean;
  errors?: Error;
  form: UseFormReturn<
    {
      full_name: string;
      phone_number: string;
      stores: string[];
    },
    unknown,
    undefined
  >;
  buttonText: string;
  handleSubmit: (values: z.infer<typeof formSchemaNotification>) => void;
}

export interface IEditSheetForm {
  sheetOpen: boolean;
  setSheetOpen: (isOpenModal: boolean) => void;
  refetch: () => void;
  id: number | null;
  setEditId: (id: number | null) => void;
}

export interface ICreateSheetForm {
  sheetOpen: boolean;
  setSheetOpen: (isOpenModal: boolean) => void;
  refetch: () => void;
}
