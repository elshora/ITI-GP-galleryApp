import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/dashboard/categorySlice/categorySlice';
import CategorySlider from '../slider/CategorySlider';
import Spinner from '../spinner/Spinner';

export default function CategoriesHolder() {
  const { categories, isLoading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        categories?.data?.map((category) => (
          <CategorySlider key={category._id} categoryName={category.name} />
        ))
      )}
    </div>
  );
}
