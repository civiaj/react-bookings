import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabin, id }) => fetchAddCabin(newCabin, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            toast.success(`Cabin successfully edited`);
        },
        onError: (error) => toast.error(`Error: ${error.message}`),
    });

    return { editCabin, isEditing };
}
