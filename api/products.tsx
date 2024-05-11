import { supabase } from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          category: data.category,
          price: data.price,
          description: data.description,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: udatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          category: data.category,
          price: data.price,
          description: data.description,
        })
        .eq("id", data.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return udatedProduct;
    },

    async onSuccess() {
      await queryClient.invalidateQueries("[products]");
    },
  });
};

export const useProduct = (id: any) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
