import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CabinForm from './CabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import { useCreateCabin } from './useCreateCabin';
import Menus from '../../ui/Menus';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3/2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.3);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 600;
    color: var(--color-green-700);
`;

export function CabinRow({ cabin }) {
    const { name, maxCapacity, regularPrice, discount, image, id: cabinId, description } = cabin;
    const { deleteCabin, isDeleting } = useDeleteCabin();
    const { createCabin } = useCreateCabin();

    function handleCreateCopy() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    }

    return (
        <Table.Row role="row">
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />
                        <Menus.List id={cabinId}>
                            <Menus.Button onClick={handleCreateCopy} icon={<HiSquare2Stack />}>
                                Duplicate
                            </Menus.Button>
                            <Modal.Open opens="edit-cabin">
                                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens="delete-cabin">
                                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="edit-cabin">
                            <CabinForm mode="modal" cabinToEdit={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete-cabin">
                            <ConfirmDelete
                                resourceName="cabins"
                                disabled={isDeleting}
                                mode="modal"
                                cabinToEdit={cabin}
                                onConfirm={() => deleteCabin(cabinId)}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}
