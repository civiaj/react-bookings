import { useForm } from 'react-hook-form';
import FormRowComplex from '../../ui/FormRowComplex';
import { FormRow, Input, Label } from '../../ui/Form';
import { Form } from '../../ui/Form';
import useUpdateSettings from './useUpdateSettings';

function SettingsForm({ settings }) {
    const { breakfastPrice, maxBookingLength, maxGuestsPerBooking, minBookingLength } = settings;

    const { updateSettings, isUpdating } = useUpdateSettings();

    const handleSubmit = (e) => {
        if (!e.target.value) return;
        updateSettings({ [e.target.id]: e.target.value });
    };

    return (
        <Form mode="settings">
            <FormRow>
                <Label htmlFor="minBookingLength">Minimum nights/booking</Label>
                <Input
                    id="minBookingLength"
                    defaultValue={minBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleSubmit(e)}
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="maxBookingLength">Maximum nights/booking</Label>
                <Input
                    id="maxBookingLength"
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleSubmit(e)}
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="maxGuestsPerBooking">Maximum guests/booking</Label>
                <Input
                    id="maxGuestsPerBooking"
                    defaultValue={maxGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={(e) => handleSubmit(e)}
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="breakfastPrice">Breakfast price</Label>
                <Input
                    id="breakfastPrice"
                    defaultValue={breakfastPrice}
                    disabled={isUpdating}
                    onBlur={(e) => handleSubmit(e)}
                />
            </FormRow>
        </Form>
    );
}
export default SettingsForm;
