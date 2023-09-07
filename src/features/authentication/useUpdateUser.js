import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';

import { toast } from 'react-hot-toast';

export const useUpdateUser = () => {
    const querClient = useQueryClient();
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success('Account successfully updated ');

            querClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => toast.error(error.message),
    });
    return { updateUser, isUpdating };
};
