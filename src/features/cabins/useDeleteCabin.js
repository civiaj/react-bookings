import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { fetchDeleteCabin } from '../../services/apiCabins';

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
        mutationFn: fetchDeleteCabin,
        onSuccess: () => {
            toast.success(`Cabin successfully deleted`);
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(`Error: ${err.message}`),
    });

    return { deleteCabin, isDeleting };
}
