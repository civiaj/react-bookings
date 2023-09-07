import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: fetchAddCabin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            toast.success(`New cabin successfully created`);
        },
        onError: (error) => toast.error(`Error: ${error.message}`),
    });

    return { createCabin, isCreating };
}
