import styled, { css } from 'styled-components';

export const Form = styled.form`
    background-color: var(--color-grey-0);
    overflow: hidden;
    font-size: 1.4rem;

    ${(props) =>
        props.mode === 'modal' &&
        css`
            min-width: 80rem;
            padding: 1px;
        `};
    ${(props) =>
        props.mode === 'regular' &&
        css`
            border-radius: var(--border-radius-md);
            padding: 1rem 2rem;
        `};
    ${(props) =>
        props.mode === 'settings' &&
        css`
            border-radius: var(--border-radius-md);
            border: 1px solid var(--color-grey-200);
            padding: 1.6rem 2.4rem;
        `};
    ${(props) =>
        props.mode === 'login' &&
        css`
            min-width: 50rem;
            border-radius: var(--border-radius-md);
            border: 1px solid var(--color-grey-200);
            padding: 3rem 2.4rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        `}
`;

Form.defaultProps = {
    type: 'regular',
};

export const FormRow = styled.div`
    display: grid;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;
    padding: 1.2rem 0;
    place-items: center start;

    :first-child {
        padding-top: 0;
    }
    :last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`;

export const FormRowVertical = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const Label = styled.label`
    width: 100%;
    font-weight: 600;
    font-size: 1.4rem;
`;

export const Input = styled.input`
    border: none;
    background: none;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-md);
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    width: 100%;
`;

export const TextContent = styled.textarea`
    border: none;
    background: none;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-md);
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    width: 100%;
    min-height: 2.8rem;
    max-height: 15rem;
    resize: vertical;
`;

export const FormError = styled.span`
    font-size: 1.2rem;
    color: var(--color-red-700);
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
    font-size: 1.4rem;
    border-radius: var(--border-radius-sm);
    width: 100%;

    &::file-selector-button {
        font-size: 1.4rem;
        background: none;
        border-radius: 7px;
        border: none;
        font-family: inherit;
        font-weight: 500;
        padding: 0.4rem 1rem;
        cursor: pointer;
        color: var(--color-grey-600);
        background-color: var(--color-grey-0);
        border: 1px solid var(--color-grey-300);
        transition: all 0.3s;

        &:hover {
            background-color: var(--color-grey-100);
        }
        &:active {
            background-color: var(--color-grey-0);
        }
    }
`;
