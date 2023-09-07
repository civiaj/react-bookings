import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';
import { useEffect } from 'react';

import { Row } from '../../ui/Row';
import { Heading } from '../../ui/Heading';

import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import ButtonGroup from '../../ui/ButtonGroup';
import { useBooking } from '../bookings/useBooking';
import { Spinner } from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();
    const { isLoading, booking } = useBooking();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const { checkin, isCheckingin } = useCheckin();
    const { settings, isLoading: isLoadingSettings } = useSettings();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking]);

    if (isLoading || isLoadingSettings) return <Spinner />;

    const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
    const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (breakfast) {
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else checkin({ bookingId, breakfast: {} });
    }

    return (
        <>
            <Row>
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id="breakfast"
                        checked={breakfast}
                        onChange={() => {
                            setBreakfast((p) => !p);
                            setConfirmPaid(false);
                        }}
                    >
                        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((p) => !p)}
                    id="confirmPaid"
                    disabled={confirmPaid}
                >
                    I confirmPaid that {guests.fullName} has paid the total amount of{' '}
                    {!breakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(optionalBreakfastPrice + totalPrice)} (${formatCurrency(
                              totalPrice
                          )} + ${formatCurrency(optionalBreakfastPrice)})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    kind="primary"
                    size="medium"
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingin}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button kind="secondary" size="medium" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
