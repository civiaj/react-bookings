import styled from 'styled-components';

import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
    border-bottom: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    padding: 1rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;
