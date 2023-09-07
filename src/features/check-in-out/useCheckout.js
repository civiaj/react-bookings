import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUpdateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckout() {
    const queryClient = useQueryClient();

    const { mutate: checkout, isLoading: isCheckingout } = useMutation({
        mutationFn: (bookingId) => fetchUpdateBooking(bookingId, { status: 'checked-out' }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ refetchType: 'active' });
            toast.success(`Booking #${data.id} successfully checked out`);
        },
        onError: (error) => toast.error(`Error: ${error.message ?? 'No Error message provided.'}`),
    });

    return { checkout, isCheckingout };
}
