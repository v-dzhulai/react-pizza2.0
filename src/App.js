import { useEffect, useState } from 'react';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort';

import './scss/app.scss';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://65d60b38f6967ba8e3bd5b93.mockapi.io/api/react-pizza/items')
            .then((res) => res.json())
            .then((arr) => setItems(arr));
    }, []);

    return (
        <div className="wrapper">
            <Header />

            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>

                    <h2 className="content__title">Всі піци</h2>

                    <div className="content__items">
                        {items.map((obj, i) => {
                            return <PizzaBlock key={`${i}_${obj.name}`} {...obj} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
