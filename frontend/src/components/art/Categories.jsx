import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getCategories } from '../../features/dashboard/categorySlice/categorySlice';
const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.categories);
  const handleClick = (eve) => {
    setSearchParams({ category: eve });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => handleClick('texsadsadasdt')}>
        Update Query params
      </button>
    </div>
  );
};
export default Categories;
