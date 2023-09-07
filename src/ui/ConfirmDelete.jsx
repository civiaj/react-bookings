import styled from 'styled-components';
import { Heading } from './Heading';
import Button from './Button';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledConfirmDelete = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    button {
        margin-right: 1rem;
    }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
    const ref = useOutsideClick();

    return (
        <StyledConfirmDelete ref={ref}>
            <Heading as="h3">Delete {resourceName}</Heading>
            <p>
                Are you sure you want to delete this {resourceName} permamently? This action cannot
                be undone.
            </p>

            <div>
                <Button onClick={onCloseModal} kind="secondary" size="medium" disabled={disabled}>
                    Cancel
                </Button>

                <Button onClick={onConfirm} kind="danger" size="medium" disabled={disabled}>
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}
export default ConfirmDelete;
