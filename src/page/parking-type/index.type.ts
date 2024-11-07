import * as z from "zod";
import { formSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";

export interface IParkingType {
  id: number;
  type: string;
  last_one_hour: number;
  last_six_hour: number;
  over_six_hour: number;
  parking_count: number;
  created_at: string;
}

export interface IParkingTypeSingleResponse {
  success: boolean;
  message: string;
  results: IParkingType;
}

export interface IParkingTypeForm {
  type: string;
  last_one_hour: number;
  last_six_hour: number;
  over_six_hour: number;
  parking_count: number;
}

export interface IParkingTypeListResponse {
  success: boolean;
  message: string;
  results: IParkingType[];
  total_count: number;
  page: number;
  page_count: number;
  per_page: number;
}

const formSchemaNotification = formSchema();

export interface IParkingTypeFormProps {
  isLoading: boolean;
  isUpdate?: boolean;
  errors?: Error;
  form: UseFormReturn<
    {
      type: string;
      last_one_hour: number;
      last_six_hour: number;
      over_six_hour: number;
      parking_count: number;
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
