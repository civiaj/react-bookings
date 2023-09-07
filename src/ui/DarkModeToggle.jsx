import { useDarkMode } from '../context/useDarkMode';
import Button from './Button';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

function DarkModeToggle() {
    const { isDarkMode, toggle } = useDarkMode();
    return (
        <Button kind="icon" size="medium" onClick={toggle}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>
    );
}
export default DarkModeToggle;
