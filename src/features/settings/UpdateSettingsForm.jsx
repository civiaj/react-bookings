import { useSettings } from './useSettings';
import { Spinner } from '../../ui/Spinner';
import SettingsForm from './SettingsForm';

function UpdateSettingsForm() {
    const { settings, isLoading } = useSettings();

    if (isLoading) return <Spinner />;

    return <SettingsForm settings={settings} />;
}
export default UpdateSettingsForm;
