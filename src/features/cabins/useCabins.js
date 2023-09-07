import { useQuery } from '@tanstack/react-query';
import { fetchCabins } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCabins() {
    const {
        data: cabins,
        isLoading,
        isSuccess,
    } = useQuery({
        queryFn: fetchCabins,
        queryKey: ['cabins'],
        onError: (err) => toast.error(`Error: ${err?.message ?? 'No Error message provided.'}`),
    });

    return { cabins, isLoading, isSuccess };
}
