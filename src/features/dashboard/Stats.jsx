import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
    HiOutlineBriefcase,
    HiOutlineBanknotes,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from 'react-icons/hi2';

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, el) => acc + el.totalPrice, 0);
    const totalCheckins = confirmedStays.length;
    const occupancyRate = Math.round(
        (confirmedStays.reduce((acc, el) => acc + el.numNights, 0) / (numDays * numCabins)) * 100
    );

    return (
        <>
            <Stat icon={<HiOutlineBriefcase />} color="blue" title="Bookings" value={numBookings} />
            <Stat
                icon={<HiOutlineBanknotes />}
                color="green"
                title="Sales"
                value={formatCurrency(sales)}
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                color="indigo"
                title="Check ins"
                value={totalCheckins}
            />
            <Stat
                icon={<HiOutlineChartBar />}
                color="yellow"
                title="Occupancy rate"
                value={`${occupancyRate}%`}
            />
        </>
    );
}
export default Stats;
