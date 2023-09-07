import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBookings } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    const filterParams = searchParams.get('status') || 'all';
    const filter = filterParams === 'all' ? null : { field: 'status', value: filterParams };

    //SORT
    const sortParams = searchParams.get('sort') || 'startDate-desc';
    const [field, direction] = sortParams.split('-');
    const sort = { field, direction };

    //PAGINATION
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    //QUERY
    const { data: { data: bookings, count } = {}, isLoading } = useQuery({
        queryKey: ['bookings', filter, sort, page],
        queryFn: () => fetchBookings({ filter, sort, page }),
        onError: (err) => toast.error(`Error: ${err?.message ?? 'No Error message provided.'}`),
    });

    //PRE-FETCHING
    const maxPage = Math.ceil(count / PAGE_SIZE);
    if (page < maxPage)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sort, page + 1],
            queryFn: () => fetchBookings({ filter, sort, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sort, page - 1],
            queryFn: () => fetchBookings({ filter, sort, page: page - 1 }),
        });

    return { bookings, isLoading, count };
}
