import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { FileInput, Form, FormRow, Input, TextContent } from '../../ui/Form';
import FormRowComplex from '../../ui/FormRowComplex';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
        getValues,
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { createCabin, isCreating } = useCreateCabin();
    const { editCabin, isEditing } = useEditCabin();

    const onSubmit = (data) => {
        const image = typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession)
            editCabin({ newCabin: { ...data, image }, id: editId }, { onSuccess: () => reset() });
        else
            createCabin(
                { ...data, image },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    };

    const isWorking = isCreating || isEditing;

    return (
        <Form mode={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit)}>
            <FormRowComplex error={formErrors?.name} label={'Cabin name'}>
                <Input
                    disabled={isWorking}
                    id="name"
                    type="text"
                    {...register('name', {
                        required: 'This field is required',
                        minLength: { value: 3, message: 'At least 3 characters' },
                    })}
                />
            </FormRowComplex>

            <FormRowComplex error={formErrors?.maxCapacity} label={'Maximum capacity'}>
                <Input
                    disabled={isWorking}
                    id="maxCapacity"
                    type="number"
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: { value: 1, message: `Capacity should be at least 1` },
                    })}
                />
            </FormRowComplex>

            <FormRowComplex error={formErrors?.regularPrice} label={'Regular price'}>
                <Input
                    disabled={isWorking}
                    id="regularPrice"
                    type="number"
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: { value: 1, message: `Regular price should be at least 1` },
                    })}
                />
            </FormRowComplex>

            <FormRowComplex error={formErrors?.discount} label={'Discount'}>
                <Input
                    disabled={isWorking}
                    id="discount"
                    type="number"
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            +value <= +getValues().regularPrice ||
                            'Discount should be less than regular price',
                    })}
                />
            </FormRowComplex>

            <FormRowComplex error={formErrors?.description} label={'Description for website'}>
                <TextContent
                    disabled={isWorking}
                    id="description"
                    type="text"
                    {...register('description', {
                        required: 'This field is required',
                        minLength: { value: 5, message: `At least 5 characters` },
                    })}
                />
            </FormRowComplex>

            <FormRowComplex error={formErrors?.image} label={'Cabin photo'}>
                <FileInput
                    disabled={isWorking}
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession ? false : 'This field is required',
                    })}
                />
            </FormRowComplex>

            <FormRow>
                <Button
                    size="medium"
                    kind="secondary"
                    type="reset"
                    disabled={isWorking}
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button size="medium" kind="primary" type="submit" disabled={isWorking}>
                    {isEditSession ? 'Edit Cabin' : 'Add Cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CabinForm;
