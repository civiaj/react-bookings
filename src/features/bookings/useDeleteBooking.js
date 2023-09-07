import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeleteBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
        mutationFn: (bookingId) => fetchDeleteBooking(bookingId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ refetchType: 'active' });
            toast.success(`Booking #${data.id} successfully deleted`);
        },
        onError: (error) => toast.error(`Error: ${error.message ?? 'No Error message provided.'}`),
    });

    return { deleteBooking, isDeletingBooking };
}
