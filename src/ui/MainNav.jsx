import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaCalendarCheck, FaHome, FaLaptopHouse, FaUsers } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem 2.4rem;
    transition: all 0.15s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  svg {
    font-size: 2.4rem;
    stroke-width: 0;
    transition: all 0.15s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <FaHome />
            <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/bookings">
            <FaCalendarCheck />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <FaLaptopHouse />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <FaUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <MdSettings />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
export default MainNav;
