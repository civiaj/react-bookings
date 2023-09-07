import { Heading } from '../ui/Heading';
import CabinTable from '../features/cabins/CabinTable';
import { Row } from '../ui/Row';
import CabinAdd from '../features/cabins/CabinAdd';
import CabinOperations from '../features/cabins/CabinOperations';

function Cabins() {
    return (
        <>
            <Row>
                <Heading as="h1">All Cabins</Heading>
                <CabinOperations />
            </Row>
            <CabinTable />
            <CabinAdd />
        </>
    );
}

export default Cabins;
