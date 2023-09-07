import styled from 'styled-components';
import { useUser } from './useUser';

const StyledAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: cover;
    border-radius: 50%;
    outline: 2px soliv var(--color-grey-100);
`;

function UserAvatar() {
    const { user } = useUser();
    const { fullName, avatar } = user.user_metadata;

    return (
        <StyledAvatar>
            <Avatar src={avatar || 'default-user.jpg'} alt={`Avatar of ${fullName}`} />
            <span>{fullName}</span>
        </StyledAvatar>
    );
}

export default UserAvatar;
