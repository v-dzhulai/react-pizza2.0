import qs from 'qs';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const categories = ['Всі', "М'ясні", 'Веґетаріанські', 'Ґриль', 'Гострі', 'Закриті'];

    async function getPizzas() {
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));
    }

    // If we change parameters and there was first render
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType.sortProperty, currentPage]);

    // If there was first render we check URL-parameters and save it in redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sortType,
                }),
            );

            isSearch.current = true;
        }
    }, []);

    // If there was first render we request pizzas
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj, i) => <PizzaBlock key={`${i}_${obj.name}`} {...obj} />);

    const skeleton = [...new Array(items.length)].map((item, i) => (
        <Skeleton key={`${i}_${item}`} />
    ));

    return (
        <>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => dispatch(setCategoryId(id))}
                    categories={categories}
                />

                <Sort />
            </div>

            <h2 className="content__title">{categories[categoryId]} піци</h2>

            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>
                        Сталася помилка <icon>😕</icon>
                    </h2>

                    <p>На жаль не вдалося отримати піци...</p>
                    <p>Повторіть спробу пізніше.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
            )}

            <Pagination
                currentPage={currentPage}
                onChangePage={(num) => dispatch(setCurrentPage(num))}
            />
        </>
    );
}

export default Home;
