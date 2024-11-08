import * as z from "zod";
import { formSchema } from "./validation";
import { UseFormReturn } from "react-hook-form";

export interface IParking {
  id: string;
  car_number: string;
  parking_rate_id: string;
  user_id?: string | null;
  start_time: string;
  end_timeы: string;
}

export interface IParkingForm {
  car_number: string;
  parking_rate_id: string;
  start_time: string
  user_id?: string | null;
}

export interface IParkingListResponse {
  reservations: IParking[];
  count: number;
  page: number;
}

const formSchemaNotification = formSchema();

export interface IParkingFormProps {
  isLoading: boolean;
  isUpdate?: boolean;
  errors?: Error;
  form: UseFormReturn<
    {
      car_number: string;
      parking_rate_id: string;
      user_id?: string | null;
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
