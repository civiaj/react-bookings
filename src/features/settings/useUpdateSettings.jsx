import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUpdateSettings } from '../../services/apiSettings';
import { toast } from 'react-hot-toast';

function useUpdateSettings() {
    const queryCient = useQueryClient();
    const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
        mutationFn: fetchUpdateSettings,
        onSuccess: () => {
            queryCient.invalidateQueries({ queryKey: ['Settings'] });
            toast.success('Settings successfully updated');
        },
        onError: (error) => toast.error(`Error: ${error.message}`),
    });
    return { updateSettings, isUpdating };
}
export default useUpdateSettings;
