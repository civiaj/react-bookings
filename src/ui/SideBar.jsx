import styled from "styled-components";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledSideBar = styled.aside`
    padding: 1rem 2rem;
    background-color: var(--color-grey-0);
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1/3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

function SideBar() {
    return (
        <StyledSideBar>
            <MainNav />
            <Uploader />
        </StyledSideBar>
    );
}

export default SideBar;
