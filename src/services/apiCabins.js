import supabase, { supabaseUrl } from './supabase';

export async function fetchCabins() {
    const { data, error } = await supabase.from('cabins').select('*');
    if (error) throw new Error('Cabins could not be loaded.');
    return data;
}

export async function fetchDeleteCabin(id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id).select('*');
    if (error) throw new Error('Cabin could not be deleted.');
    return data;
}

export async function fetchAddCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Create cabin
    let query = supabase.from('cabins');

    // A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

    const { data, error } = await query.select('id').single();

    if (error) throw new Error('Cabin could not be created.');

    if (hasImagePath) return;

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        throw new Error('Cabin image could not be uploaded.');
    }
}
