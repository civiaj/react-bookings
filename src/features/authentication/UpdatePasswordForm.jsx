import { useForm } from 'react-hook-form';
import { Form, FormRow, Input } from '../../ui/Form';
import FormRowComplex from '../../ui/FormRowComplex';
import Button from '../../ui/Button';
import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
    } = useForm();

    const { isUpdating, updateUser } = useUpdateUser();

    function onSubmit({ password }) {
        updateUser({ password }, { onSuccess: () => reset() });
    }

    return (
        <Form mode="settings" onSubmit={handleSubmit(onSubmit)}>
            <FormRowComplex label="Password (min 8 characters)" error={errors.password}>
                <Input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'This field is required',
                        minLength: { value: 8, message: 'At least 8 characters' },
                    })}
                ></Input>
            </FormRowComplex>

            <FormRowComplex label="Password (min 8 characters)" error={errors.passwordConfirm}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        validate: (value) =>
                            getValues('password') === value || 'Passwords need to match',
                    })}
                ></Input>
            </FormRowComplex>
            <FormRow>
                <Button size="medium" kind="secondary" type="reset">
                    Cancel
                </Button>
                <Button size="medium" kind="primary" type="submit">
                    Update password
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
