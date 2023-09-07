import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { Spinner } from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
    height: 100vh;
    width: 100%;
    background-color: var(--color-grey-50);
    display: grid;
    place-items: center center;
`;

function ProtectedRoute({ children }) {
    const { isLoading, isAuthenticated } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate, isLoading]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    return isAuthenticated && children;
}
export default ProtectedRoute;
