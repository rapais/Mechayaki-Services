import { useQuery } from "@tanstack/react-query";
import { menuItemsApi } from "../../api/menuItems.api.js";

export function useMenuItems(activeOnly = true) {
  return useQuery({
    queryKey: ["menu-items", { activeOnly }],
    queryFn: () => menuItemsApi.list(activeOnly),
    staleTime: 10_000,
  });
}
