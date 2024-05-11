import { supabase } from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert({
          name: data.name,
          address: data.address,
          phone_number: data.phone_number,
          total_price: data.total_price,
          order_status: data.order_status,
          products: data.products,
          location_latitude:data.location_latitude,
          location_longitude: data.location_longitud,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["orders"]);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id) {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["orders"]);
    },
  });
};


export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update({
          name: data.name,
          address: data.address,
          phone_number: data.phone_number,
          total_price: data.total_price,
          order_status: data.order_status,
          products: data.products,
          location_latitude:data.location_latitude,
          location_longitude: data.location_longitud,
        })
        .eq("id", data.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },

    async onSuccess() {
      await queryClient.invalidateQueries("[orders]");
    },
  });
};


export const useOrderWithID = (id: any) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return order;
    },
  });
};