import { Spinner } from '../../ui/Spinner';
import { CabinRow } from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
    const { cabins, isLoading } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (!cabins || !cabins.length) return <Empty resourceName="cabins" />;

    // Filter
    const filterParams = searchParams.get('discount') || 'all';
    let filteredCabins;
    if (filterParams === 'all') filteredCabins = [...cabins];
    if (filterParams === 'no-discount') filteredCabins = cabins.filter((cabin) => !cabin.discount);
    if (filterParams === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount);

    // Sort
    const sortParams = searchParams.get('sort') || 'startDate-asc';
    const [field, direction] = sortParams.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" role="table">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
