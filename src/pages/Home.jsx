import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({ name: 'популярністю', sortProperty: 'rating' });
    const categories = ['Всі', "М'ясні", 'Веґетаріанські', 'Ґриль', 'Гострі', 'Закриті'];

    useEffect(() => {
        setLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(
            `https://65d60b38f6967ba8e3bd5b93.mockapi.io/api/react-pizza/items?${category}&sortBy=${sortBy}&order=${order}`,
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

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

            <div className="content__items">
                {isLoading
                    ? [...new Array(items.length)].map((item, i) => (
                          <Skeleton key={`${i}_${item}`} />
                      ))
                    : items.map((obj, i) => {
                          return <PizzaBlock key={`${i}_${obj.name}`} {...obj} />;
                      })}
            </div>
        </>
    );
}

export default Home;
