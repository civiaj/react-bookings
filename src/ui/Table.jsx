import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
    border: 1px solid var(--color-grey-200);
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    overflow: hidden;
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: ${(props) => props.columns};
    column-gap: 2.4rem;
    align-items: center;
    transition: none;
`;

const TableHeader = styled(TableRow)`
    font-weight: 600;
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

const StyledTableRow = styled(TableRow)`
    padding: 2rem 2rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledBody = styled.section`
    margin: 0.4rem 0;
`;

const Footer = styled.footer`
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    padding: 1.6rem 2.4rem;

    &:not(:has(*)) {
        display: none;
    }
`;

const Empty = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
    return (
        <TableContext.Provider value={columns}>
            <StyledTable role="table">{children}</StyledTable>
        </TableContext.Provider>
    );
}

function Header({ children }) {
    const columns = useContext(TableContext);
    return (
        <TableHeader role="row" columns={columns} as="header">
            {children}
        </TableHeader>
    );
}

function Row({ children }) {
    const columns = useContext(TableContext);
    return (
        <StyledTableRow role="row" columns={columns}>
            {children}
        </StyledTableRow>
    );
}

function Body({ data, render }) {
    if (!data || !data.length) return <Empty>No data to show at the moment</Empty>;
    return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
