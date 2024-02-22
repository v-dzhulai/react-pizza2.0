import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://65d60b38f6967ba8e3bd5b93.mockapi.io/api/react-pizza/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>

            <h2 className="content__title">Всі піци</h2>

            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((item, i) => <Skeleton key={`${i}_${item}`} />)
                    : items.map((obj, i) => {
                          return <PizzaBlock key={`${i}_${obj.name}`} {...obj} />;
                      })}
            </div>
        </>
    );
}

export default Home;
