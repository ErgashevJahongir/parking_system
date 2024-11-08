import { useMutation, useQuery } from "@tanstack/react-query";

import {
  IParkingType,
  IParkingTypeForm,
  IParkingTypeListResponse,
} from "./index.type";
import request from "@/services/request";

export const useList = (page: number, per_page: number, search: string | null) =>
  useQuery<IParkingTypeListResponse>({
    queryKey: ["list-parking-rate", page, per_page, search],
    queryFn: () =>
      request.private
        .get("parking/rates", { params: { page: page, limit: per_page, search: search } })
        .then((res) => res.data),
  });

export const useCreate = () =>
  useMutation({
    mutationKey: ["create-parking-rate"],
    mutationFn: (data: IParkingTypeForm) =>
      request.private.post("parking/rate", data).then((res) => res.data),
  });

export const useDetails = (id: string, openModal: boolean) =>
  useQuery<IParkingType>({
    queryKey: [`parking-rate-detail-${id}`, id],
    queryFn: () => request.private.get(`parking/rate/${id}`).then((res) => res.data),
    enabled: openModal,
  });

export const useUpdate = (id: string) =>
  useMutation({
    mutationKey: ["update-parking-rate"],
    mutationFn: (data: IParkingTypeForm) =>
      request.private.put(`parking/rate/${id}`, data).then((res) => res.data),
  });

export const useDelete = () =>
  useMutation({
    mutationKey: ["delete-parking-rate"],
    mutationFn: (id: string) => request.private.delete(`parking/rate/${id}`).then((res) => res.data),
  });