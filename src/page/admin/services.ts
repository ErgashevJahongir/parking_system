import { useMutation, useQuery } from "@tanstack/react-query";

import {
  IClient,
  IClientForm,
  IClientListResponse,
} from "./index.type";
import request from "@/services/request";
import { IParkingListResponse } from "../parkings/index.type";

export const useList = (page: number, per_page: number, search: string | null) =>
  useQuery<IClientListResponse>({
    queryKey: ["list-clients", page, per_page, search],
    queryFn: () =>
      request.private
        .get("clients", { params: { page, per_page, search: search } })
        .then((res) => res.data),
  });

export const useCreate = () =>
  useMutation({
    mutationKey: ["create-client"],
    mutationFn: (data: IClientForm) =>
      request.private.post("client/register", data).then((res) => res.data),
  });

export const useDetails = (id: string, openModal: boolean) =>
  useQuery<IClient>({
    queryKey: [`client-detail-${id}`, id],
    queryFn: () => request.private.get(`client/${id}`).then((res) => res.data),
    enabled: openModal,
  });

export const useUpdate = (id: string) =>
  useMutation({
    mutationKey: ["update-client"],
    mutationFn: (data: IClientForm) =>
      request.private.put(`client/${id}`, data).then((res) => res.data),
  });

export const useDelete = () =>
  useMutation({
    mutationKey: ["delete-client"],
    mutationFn: (id: string) => request.private.delete(`client/${id}`).then((res) => res.data),
  });

export const useListParking = (page: number, per_page: number, search: string | null, id: string, openModal: boolean) =>
  useQuery<IParkingListResponse>({
    queryKey: ["list-parking", page, per_page, search],
    queryFn: () =>
      request.private
        .get(`reservations/client/${id}`, { params: { page: page, limit: per_page, search: search } })
        .then((res) => res.data),
    enabled: openModal,
  });