import * as z from "zod";
import { formSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";

export interface IParkingType {
  id: string;
  type: string;
  last_one_hour: number;
  last_six_hour: number;
  over_six_hour: number;
  parking_count: number;
}

export interface IParkingTypeForm {
  type: string;
  last_one_hour: number;
  last_six_hour: number;
  over_six_hour: number;
  parking_count: number;
}

export interface IParkingTypeListResponse {
  parking_rates: IParkingType[];
  count: number;
  page: number;
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
  id: string | null;
  setEditId: (id: string | null) => void;
}

export interface ICreateSheetForm {
  sheetOpen: boolean;
  setSheetOpen: (isOpenModal: boolean) => void;
  refetch: () => void;
}
