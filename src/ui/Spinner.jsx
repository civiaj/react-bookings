import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
   0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    margin: 4.8rem auto;
    width: 5rem;
    aspect-ratio: 1;
    border: 5px solid var(--color-grey-500);
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
`;
