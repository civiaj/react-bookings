import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '../../services/apiSettings';
import { toast } from 'react-hot-toast';

export function useSettings() {
    const {
        data: settings,
        isLoading,
        isSuccess,
    } = useQuery({
        queryFn: fetchSettings,
        queryKey: ['Settings'],
        onError: (error) => toast.error(`Error: ${error?.message ?? 'No error message provided.'}`),
    });

    return { settings, isLoading, isSuccess };
}
