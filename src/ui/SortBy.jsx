import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortValue = searchParams.get('sort') || '';

    const handleChange = (e) => {
        searchParams.set('sort', e.target.value);
        searchParams.set('page', 1);
        setSearchParams(searchParams);
    };

    return <Select type="white" options={options} onChange={handleChange} value={sortValue} />;
}
export default SortBy;
