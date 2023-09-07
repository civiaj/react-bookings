import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { Form, FormRow, Input } from '../../ui/Form';
import FormRowComplex from '../../ui/FormRowComplex';
import { useSignup } from './useSignup';

function SignupForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm();

    const { signup, isLoading } = useSignup();

    const onSubmit = ({ fullName, email, password }) => {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    };

    return (
        <Form mode="settings" onSubmit={handleSubmit(onSubmit)}>
            <FormRowComplex label="Full name" error={errors?.fullName}>
                <Input
                    disabled={isLoading}
                    id="fullName"
                    type="text"
                    {...register('fullName', { required: 'This field is required' })}
                />
            </FormRowComplex>
            <FormRowComplex label="Email address" error={errors?.email}>
                <Input
                    disabled={isLoading}
                    id="email"
                    type="text"
                    {...register('email', {
                        required: 'This field is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Please provide a valid email address',
                        },
                    })}
                />
            </FormRowComplex>
            <FormRowComplex label="Password (min 8 characters)" error={errors?.password}>
                <Input
                    disabled={isLoading}
                    id="password"
                    type="password"
                    {...register('password', {
                        required: 'This field is required',
                        minLength: {
                            value: 8,
                            message: 'Password needs a minimum of 8 characters',
                        },
                    })}
                />
            </FormRowComplex>
            <FormRowComplex label="Repeat password" error={errors?.confirmPassword}>
                <Input
                    disabled={isLoading}
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', {
                        required: 'This field is required',
                        validate: (value) =>
                            value === getValues('password') || 'Passwords need to match',
                    })}
                />
            </FormRowComplex>
            <FormRow>
                <Button size="medium" kind="secondary" type="reset" disabled={isLoading}>
                    Cancel
                </Button>
                <Button size="medium" kind="primary" type="submit" disabled={isLoading}>
                    Create a new user
                </Button>
            </FormRow>
        </Form>
    );
}
export default SignupForm;
