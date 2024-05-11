import { supabase } from '../lib/supabase'

import { Mutation, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const useCategorytList = () => {
    return useQuery({
        queryKey:['categories'],
        queryFn: async () => {
            const {data , error} = await supabase.from('categories').select('*')
            if(error){
                throw new Error(error.message)
            }
            return data
        }
    })
}

export const useAddcategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data:any){
            const {error, data: newCategory} = await supabase.from('categories').insert({
                name: data.name,
                image: data.image
            }).single()
            if(error) {
                throw new Error(error.message)
            }
            return newCategory
        },
        async onSuccess(){
            await queryClient.invalidateQueries(['categories'])
        }
    })
}




export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(id){
            const {error} = await supabase.from('categories').delete().eq('id', id)
            if(error) {
                throw new Error(error.message)
            }

        },
            async onSuccess(){
                await queryClient.invalidateQueries(['categories'])
            }
    })
}











