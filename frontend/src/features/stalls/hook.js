import { useQuery } from "@tanstack/react-query";
import { stallsApi } from "../../api/stalls.api";

export function useStalls() {
    return useQuery({
        queryKey: ["stalls"],
        queryFn: stallsApi.list,
    });
}