import { Heading } from '../ui/Heading';
import { Row } from '../ui/Row';
import BookingTable from '../features/bookings/BookingTable';
import BookingOperations from '../features/bookings/BookingOperations';

function Bookings() {
    return (
        <>
            <Row>
                <Heading as="h1">Bookings</Heading>
                <BookingOperations />
            </Row>
            <BookingTable />
        </>
    );
}

export default Bookings;
