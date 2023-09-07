import { useQuery } from '@tanstack/react-query';
import { fetchGetBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useBooking() {
    const { id: bookingId } = useParams();

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => fetchGetBooking(bookingId),
        onError: (err) => toast.error(`Error: ${err?.message ?? 'No Error message provided.'}`),
    });

    return { isLoading, booking, error };
}
