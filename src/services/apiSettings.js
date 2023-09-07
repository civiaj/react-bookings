import supabase from './supabase';

export async function fetchSettings() {
    const { data, error } = await supabase.from('settings').select('*');
    if (error) throw new Error('Settings could not be loaded.');
    return data.at(0);
}

export async function fetchUpdateSettings(newSettings) {
    const { data, error } = await supabase.from('settings').update(newSettings).eq('id', 1);

    if (error) throw new Error('Settings could not be updated.');

    return data;
}
