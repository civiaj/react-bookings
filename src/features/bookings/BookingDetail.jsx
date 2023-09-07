import styled from 'styled-components';
import BookingDataBox from './BookingDataBox';
import Button from '../../ui/Button';
import { Heading } from '../../ui/Heading';
import { Row } from '../../ui/Row';
import { Tag } from '../../ui/Tag';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { Spinner } from '../../ui/Spinner';
import ButtonGroup from '../../ui/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { isLoading, booking } = useBooking();
    const { checkout, isCheckingout } = useCheckout();
    const { deleteBooking, isDeletingBooking } = useDeleteBooking();
    const navigate = useNavigate();

    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resourceName="booking" />;
    const { status, id: bookingId } = booking;

    return (
        <Modal>
            <Row>
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            <ButtonGroup>
                <Modal.Open opens="delete-booking">
                    <Button kind="danger" size="medium">
                        Delete booking
                    </Button>
                </Modal.Open>
                {status === 'unconfirmed' && (
                    <Button
                        kind="primary"
                        size="medium"
                        onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                        Check in
                    </Button>
                )}
                {status === 'checked-in' && (
                    <Button
                        kind="primary"
                        size="medium"
                        icon={<HiArrowUpOnSquare />}
                        disabled={isCheckingout}
                        onClick={() => checkout(bookingId)}
                    >
                        Check out
                    </Button>
                )}

                <Button kind="secondary" size="medium" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
            <Modal.Window name="delete-booking">
                <ConfirmDelete
                    resourceName={`booking ${bookingId}`}
                    onConfirm={() =>
                        deleteBooking(bookingId, { onSuccess: () => navigate('/bookings') })
                    }
                    disabled={isDeletingBooking}
                />
            </Modal.Window>
        </Modal>
    );
}
export default BookingDetail;
