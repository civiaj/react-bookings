import Button from '../../ui/Button';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';
import SpinnerMnini from '../../ui/SpinnerMini';

function Logout() {
    const { logout, isLoading } = useLogout();

    return (
        <Button kind="icon" size="medium" onClick={logout}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMnini />}
        </Button>
    );
}
export default Logout;
