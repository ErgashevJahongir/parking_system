import { useMutation, useQuery } from "@tanstack/react-query";

import {
  IParking,
  IParkingForm,
  IParkingListResponse,
} from "./index.type";
import request from "@/services/request";

export const useList = (page: number, per_page: number, search: string | null) =>
  useQuery<IParkingListResponse>({
    queryKey: ["list-parking", page, per_page, search],
    queryFn: () =>
      request.private
        .get("reservations/admin", { params: { page: page, limit: per_page, search: search } })
        .then((res) => res.data),
  });

export const useCreate = () =>
  useMutation({
    mutationKey: ["create-reservation"],
    mutationFn: (data: IParkingForm) =>
      request.private.post("reservation", data).then((res) => res.data),
  });

export const useDetails = (id: string, openModal: boolean) =>
  useQuery<IParking>({
    queryKey: [`parking-detail-${id}`, id],
    queryFn: () => request.private.get(`reservation/admin/${id}`).then((res) => res.data),
    enabled: openModal,
  });

export const useDelete = () =>
  useMutation({
    mutationKey: ["delete-parking"],
    mutationFn: (id: string) => request.private.delete(`reservation/${id}`).then((res) => res.data),
  });