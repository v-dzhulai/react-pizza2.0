import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

function Home() {
    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({ name: 'популярністю', sortProperty: 'rating' });
    const [currentPage, setCurrentPage] = useState(1);
    const categories = ['Всі', "М'ясні", 'Веґетаріанські', 'Ґриль', 'Гострі', 'Закриті'];

    useEffect(() => {
        setLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(
            `https://65d60b38f6967ba8e3bd5b93.mockapi.io/api/react-pizza/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map((obj, i) => <PizzaBlock key={`${i}_${obj.name}`} {...obj} />);

    const skeleton = [...new Array(items.length)].map((item, i) => (
        <Skeleton key={`${i}_${item}`} />
    ));

    return (
        <>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                    categories={categories}
                />
                <Sort value={sortType} onClickSortType={(id) => setSortType(id)} />
            </div>

            <h2 className="content__title">{categories[categoryId]} піци</h2>

            <div className="content__items">{isLoading ? skeleton : pizzas}</div>

            <Pagination currentPage={currentPage} onChangePage={(num) => setCurrentPage(num)} />
        </>
    );
}

export default Home;
