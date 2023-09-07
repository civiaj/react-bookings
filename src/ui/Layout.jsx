import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import styled from 'styled-components';
import Header from './Header';

const GridBase = styled.div`
    display: grid;
    min-height: 100vh;
    max-height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    overflow: hidden;
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 2rem 4rem;
    grid-column: 2/3;
    grid-row: 2/3;
    overflow-y: auto;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

function Layout() {
    return (
        <GridBase>
            <SideBar />
            <Header />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </GridBase>
    );
}

export default Layout;
