import * as z from "zod";
import { formSchema } from "./validation";
import i18next from "i18next";
import { UseFormReturn } from "react-hook-form";
import { IStore } from "../shops/index.type";

export interface INotification {
  id: number;
  title: string;
  description: string;
  stores: IStore[];
  created_at: string;
}

export interface INotificationSingleResponse {
  success: boolean;
  message: string;
  results: INotification;
}

export interface INotificationForm {
  title: string;
  description: string;
  stores: string[];
}

export interface INotificationListResponse {
  success: boolean;
  message: string;
  results: INotification[];
  total_count: number;
  page: number;
  page_count: number;
  per_page: number;
}

const formSchemaNotification = formSchema(i18next.t);

export interface INotificationFormProps {
  isLoading: boolean;
  isUpdate?: boolean;
  errors?: Error;
  form: UseFormReturn<
    {
      title: string;
      description: string;
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
