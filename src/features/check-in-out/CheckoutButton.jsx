import Button from '../../ui/Button';
import { useCheckout } from '../check-in-out/useCheckout';

function CheckoutButton({ bookingId }) {
    const { checkout, isCheckingOut } = useCheckout();

    return (
        <Button
            kind="primary"
            size="small"
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
