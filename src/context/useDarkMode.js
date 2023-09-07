import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) throw new Error('DarkModeContext was used outside of Provider');
    return context;
};
