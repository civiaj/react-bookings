import { useState } from 'react';
import Button from '../../ui/Button';
import { FileInput, Form, FormRow, Input, Label } from '../../ui/Form';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
    const {
        user: {
            email,
            user_metadata: { fullName: currentName },
        },
    } = useUser();
    const [nameField, setNameField] = useState(currentName);
    const [avatarField, setAvatarField] = useState(null);

    const { updateUser, isUpdating } = useUpdateUser();

    function handleSubmit(e) {
        e.preventDefault();
        if (!nameField) return;
        updateUser(
            { fullName: nameField, avatar: avatarField },
            {
                onSuccess: () => {
                    setAvatarField(null);
                    e.target.reset();
                },
            }
        );
    }

    function handleCancel() {
        setNameField(currentName);
        setAvatarField(null);
    }

    return (
        <Form mode="settings" onSubmit={handleSubmit}>
            <FormRow>
                <Label>Email address</Label>
                <Input disabled defaultValue={email} />
            </FormRow>
            <FormRow>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                    id="fullName"
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <Label htmlFor="avatar">Avatar image</Label>
                <FileInput
                    onChange={(e) => setAvatarField(e.target.files[0])}
                    id="avatar"
                    accept="image/*"
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow>
                <Button
                    type="button"
                    size="medium"
                    kind="secondary"
                    onClick={handleCancel}
                    disabled={isUpdating}
                >
                    Cancel
                </Button>
                <Button size="medium" kind="primary" type="submit" disabled={isUpdating}>
                    Update account
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
