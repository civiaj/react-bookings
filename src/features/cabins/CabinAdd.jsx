import Button from '../../ui/Button';
import CabinForm from './CabinForm';
import Modal from '../../ui/Modal';

function CabinAdd() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button size="big" kind="primary">
                    Add new cabin
                </Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CabinForm />
            </Modal.Window>
        </Modal>
    );
}
export default CabinAdd;
