import * as z from "zod";
import { formSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";

export interface IClient {
  id: string;
  name: string;
  phone_number: string;
  created_at: string;
}

export interface IClientForm {
  name: string;
  phone_number: string;
}

export interface IClientListResponse {
  page: number;
  count: number;
  clients: IClient[]
}

const formSchemaNotification = formSchema();

export interface IClientFormProps {
  isLoading: boolean;
  isUpdate?: boolean;
  errors?: Error;
  form: UseFormReturn<
    {
      name: string;
      phone_number: string;
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
  id: string | null;
  setEditId: (id: string | null) => void;
}

export interface ICreateSheetForm {
  sheetOpen: boolean;
  setSheetOpen: (isOpenModal: boolean) => void;
  refetch: () => void;
}
