import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-lg);
    border-radius: var(--border-radius-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    color: var(--color-grey-700);
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    position: absolute;
    right: 1rem;
    top: 1rem;

    svg {
        width: 2.2rem;
        height: 2.2rem;
        stroke-width: 0.4rem;
    }

    &:hover {
        background-color: var(--color-grey-200);

        svg {
            fill: var(--color-brand-600);
        }
    }
`;

const ModalContext = createContext();
const Modal = ({ children }) => {
    const [openName, setOpenName] = useState('');
    const close = () => setOpenName('');
    const open = (name) => setOpenName(name);

    return (
        <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
    );
};

const Open = ({ children, opens: windowName }) => {
    const { open } = useContext(ModalContext);
    return cloneElement(children, { onClick: () => open(windowName) });
};

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);

    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <>
            <StyledOverlay>
                <StyledModal ref={ref}>
                    <Button onClick={close}>
                        <IoIosClose />
                    </Button>
                    <div>{cloneElement(children, { onCloseModal: close })}</div>
                </StyledModal>
            </StyledOverlay>
        </>,
        document.getElementById('root')
    );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
