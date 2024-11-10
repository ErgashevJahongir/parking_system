import { useQuery } from "@tanstack/react-query";

import { IPaymentListResponse, } from "./index.type";
import request from "@/services/request";

export const useList = (page: number, per_page: number, search: string | null) =>
  useQuery<IPaymentListResponse>({
    queryKey: ["list-parking", page, per_page, search],
    queryFn: () =>
      request.private
        .get("reservations/admin", { params: { page: page, limit: per_page, search: search } })
        .then((res) => res.data),
  });