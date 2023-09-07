import supabase from './supabase';
import { getToday } from '../utils/helpers';

import { PAGE_SIZE } from '../utils/constants';

export async function fetchBookings({ filter, sort, page }) {
    let query = supabase
        .from('bookings')
        .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

    if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

    if (sort) query = query.order(sort.field, { ascending: sort.direction === 'asc' });

    if (page) {
        const from = PAGE_SIZE * (page - 1);
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw new Error('Bookings could not be loaded.');
    return { data, count };
}

export async function fetchGetBooking(id) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, cabins(*), guests(*)')
        .eq('id', id)
        .single();
    if (error) throw new Error(`Booking with id: ${id} could not be loaded.`);
    return data;
}

export async function fetchUpdateBooking(id, newObj) {
    const { data, error } = await supabase
        .from('bookings')
        .update(newObj)
        .eq('id', id)
        .select()
        .single();
    if (error) throw new Error('Booking could not be updated.');
    return data;
}

export async function fetchDeleteBooking(id) {
    const { data, error } = await supabase.from('bookings').delete().eq('id', id).select().single();
    if (error) throw new Error('Booking could not be deleted.');
    return data;
}

// date = isostring
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from('bookings')
        .select('created_at, totalPrice, extrasPrice')
        .gte('created_at', date)
        .lte('created_at', getToday({ end: true }));
    if (error) throw new Error(error.message);
    return data;
}

// date = isostring
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, guests(fullName)')
        .gte('startDate', date)
        .lte('startDate', getToday());
    if (error) throw new Error(error.message);
    return data;
}

export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, guests(fullName, nationality, countryFlag)')
        .or(
            `and(status.eq.unconfirmed, startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        );
    // eq to this - stay.status === 'unconfirmed' && isToday(new Date(stay.startDate)) ||
    // stay.status === 'checked-in' && isToday(new Date(stay.endDate()))

    if (error) throw new Error(error.message);
    return data;
}
