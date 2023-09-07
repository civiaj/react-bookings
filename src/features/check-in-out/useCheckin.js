import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUpdateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isCheckingin } = useMutation({
        mutationFn: ({ bookingId, breakfast }) =>
            fetchUpdateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ refetchType: 'active' });
            toast.success(`Booking #${data.id} successfully checked in`);
            navigate('/');
        },
        onError: (error) => toast.error(`Error: ${error.message ?? 'No Error message provided.'}`),
    });

    return { checkin, isCheckingin };
}
