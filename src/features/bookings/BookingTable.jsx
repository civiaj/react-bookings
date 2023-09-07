import { Spinner } from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useBookings } from './useBookings';
import BookingRow from './BookingRow';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';
import Menus from '../../ui/Menus';

function BookingTable() {
    const { bookings, isLoading, count } = useBookings();

    if (isLoading) return <Spinner />;

    if (!bookings || !bookings.length) return <Empty resourceName="bookings" />;

    return (
        <Menus>
            <Table columns=".6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <span>cabin</span>
                    <span>guest</span>
                    <span>dates</span>
                    <span>status</span>
                    <span>amount</span>
                </Table.Header>
                <Table.Body
                    data={bookings}
                    render={(booking) => <BookingRow booking={booking} key={booking.id} />}
                />
                <Table.Footer>
                    <Pagination count={count} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}
export default BookingTable;
