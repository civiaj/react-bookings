import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { IoIosClose } from 'react-icons/io';
import styled from 'styled-components';

const StyledDeleteToast = styled.button`
    background: none;
    border: none;
    color: var(--color-grey-700);
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    svg {
        width: 1.8rem;
        height: 1.8rem;
        stroke-width: 0.4rem;
    }

    &:hover {
        background-color: var(--color-grey-200);

        svg {
            fill: var(--color-brand-600);
        }
    }
`;

function ToasterComponent() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
                success: {
                    duration: 3000,
                },
                error: {
                    duration: 5000,
                },
                style: {
                    fontSize: '1.4rem',
                    maxWidth: '50rem',
                    backgroundColor: 'var(--color-grey-0)',
                    border: '1px solid var(--color-grey-200)',
                    color: 'var(--color-grey-700)',
                    boxShadow: 'var(--shadow-sm)',
                },
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <StyledDeleteToast onClick={() => toast.dismiss(t.id)}>
                                    <IoIosClose />
                                </StyledDeleteToast>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}
export default ToasterComponent;
