import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/dashboard/categorySlice/categorySlice';
import { getArts, getArtsByCategory } from '../../features/shop/shopSlice';
import AddPost from './AddPost';
import ShopItem from './ShopItem';
import { useSearchParams } from 'react-router-dom';
export default function Shop() {
  const dispatch = useDispatch();
  const { arts, isLoading } = useSelector((state) => state.shop);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamCategory = searchParams.get('category');
  const {
    categories: { data },
  } = useSelector((state) => state.categories);

  useEffect(() => {
    if (searchParamCategory === null) {
      dispatch(getCategories());
      dispatch(getArts());
    } else {
      dispatch(getArtsByCategory(searchParamCategory));
    }
    dispatch(getCategories());
  }, [searchParamCategory, dispatch]);
  const handleClick = (category) => {
    setSearchParams({ category });
  };

  const categoriesBtn = data?.map((category) => (
    <button
      key={category._id}
      onClick={() => handleClick(category?.name)}
      className="btn btn-outline-dark btn-sm text-capitalize "
    >
      {category?.name}
    </button>
  ));

  return (
    <section className="container my-5">
      <AddPost />

      {isLoading ? (
        'loading....'
      ) : (
        <>
          <div className="d-flex gap-2 justify-content-center mb-3">
            <button
              className="btn btn-outline-dark btn-sm text-capitalize"
              onClick={() => {
                setSearchParams({});
              }}
            >
              all
            </button>
            {categoriesBtn}
          </div>
          <div className="row">
            {arts?.map((item) => (
              <ShopItem key={item._id} item={item}></ShopItem>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
