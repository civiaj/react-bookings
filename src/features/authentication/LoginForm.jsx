import { Form, Input } from '../../ui/Form';
import { FormRowVertical, Label } from '../../ui/Form';
import Button from '../../ui/Button';
import { useState } from 'react';
import { login } from '../../services/apiAuth';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
function LoginForm() {
    const [email, setEmail] = useState('email@example.com');
    const [password, setPassword] = useState('1q2w3e4r');
    const { login, isLoading } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;
        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail('');
                    setPassword('');
                },
            }
        );
    };

    return (
        <Form mode="login" onSubmit={handleSubmit}>
            <FormRowVertical>
                <Label htmlFor="email">Email address</Label>
                <Input
                    disabled={isLoading}
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
            </FormRowVertical>
            <FormRowVertical>
                <Label htmlFor="password">Password</Label>
                <Input
                    disabled={isLoading}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Input>
            </FormRowVertical>
            <Button kind="primary" size="medium" disabled={isLoading}>
                {!isLoading ? 'Log in' : <SpinnerMini />}
            </Button>
        </Form>
    );
}
export default LoginForm;
