import { supabase } from "../lib/supabase";

import { useQuery, useMutation, Mutation, useQueryClient } from "@tanstack/react-query";


export const useSliderList = () => {
    return useQuery({
        queryKey: ['slider'],
        queryFn: async () => {
            const { data, error } = await supabase.from('slider').select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}



export const useAddImageSlider = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const { data: newImageSlider, error } = await supabase.from('slider').insert({
                image: data.image
            }).single()

            if (error) {
                throw new Error(error.message)
            }
            return newImageSlider
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['slider'])
        }
    })
}




export const useDeleteImageSlider = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase.from('slider').delete().eq('id', id).single()
            if (error) {
                throw new Error(error.message)
            }
        },
        async onSuccess(){
            await queryClient.invalidateQueries(['slider'])
        }
    })
}



