import styled, { css } from 'styled-components';

const size = {
    big: css`
        padding: 1rem 2rem;
        align-self: flex-start;
    `,

    medium: css`
        padding: 0.6rem 1.4rem;
        min-height: 3.5rem;
    `,

    small: css`
        font-size: 1.1rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
        padding: 0.4rem 1rem;
    `,
};

const kind = {
    primary: css`
        color: var(--color-brand-100);
        background-color: var(--color-brand-600);
        border: 1px solid var(--color-brand-600);
        &:hover {
            background-color: var(--color-brand-500);
        }

        &:active {
            background-color: var(--color-brand-600);
        }
    `,

    icon: css`
        transition: all 0.3s;

        svg {
            width: 2.2rem;
            height: 2.2rem;
        }

        &:hover {
            background-color: var(--color-grey-100);

            svg {
                color: var(--color-brand-600);
            }
        }
    `,

    secondary: css`
        color: var(--color-grey-600);
        background-color: var(--color-grey-0);
        border: 1px solid var(--color-grey-300);
        &:hover {
            background-color: var(--color-grey-100);
        }

        &:active {
            background-color: var(--color-grey-0);
        }
    `,

    danger: css`
        background-color: var(--color-red-700);
        color: var(--color-grey-0);
        border: 1px solid var(--color-red-700);

        &:hover {
            background-color: var(--color-red-800);
        }

        &:active {
            background-color: var(--color-red-700);
        }
    `,
};

const Button = styled.button`
    font-size: 1.4rem;
    background: none;
    border-radius: 7px;
    border: none;
    font-family: inherit;

    ${(props) => props.size && size[props.size]};
    ${(props) => props.kind && kind[props.kind]}
`;

export default Button;
