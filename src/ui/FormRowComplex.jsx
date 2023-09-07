import { FormError, FormRow, Label } from './Form';

function FormRowComplex({ error, label, children }) {
    return (
        <FormRow>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <FormError>{error.message || `Error`}</FormError>}
        </FormRow>
    );
}
export default FormRowComplex;
