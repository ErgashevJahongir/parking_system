import { useMutation, useQuery } from "@tanstack/react-query";

import {
  INotificationForm,
  INotificationListResponse,
  INotificationSingleResponse,
} from "./index.type";
import request from "@/services/request";

export const useList = (page: number, per_page: number, search: string | null) =>
  useQuery<INotificationListResponse>({
    queryKey: ["list-stores", page, per_page, search],
    queryFn: () =>
      request.private
        .get("store", { params: { page, per_page, title: search } })
        .then((res) => res.data),
  });

export const useCreate = () =>
  useMutation({
    mutationKey: ["create-store"],
    mutationFn: (data: INotificationForm) =>
      request.private.post("store/", data).then((res) => res.data),
  });

export const useDetails = (id: number, openModal: boolean) =>
  useQuery<INotificationSingleResponse>({
    queryKey: [`store-detail-${id}`, id],
    queryFn: () => request.private.get(`store/${id}`).then((res) => res.data),
    enabled: openModal,
  });

export const useUpdate = (id: number) =>
  useMutation({
    mutationKey: ["update-store"],
    mutationFn: (data: INotificationForm) =>
      request.private.put(`store/${id}`, data).then((res) => res.data),
  });

export const useDelete = () =>
  useMutation({
    mutationKey: ["delete-store"],
    mutationFn: (id: number) => request.private.delete(`store/${id}`).then((res) => res.data),
  });

export const useCreatePayment = async () =>
  useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (data: { amount: number }) =>
      request.private.post("/admin/update/student/monthly/payment/", data).then((res) => res.data),
  });
