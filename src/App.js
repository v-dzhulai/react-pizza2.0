import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort';

import db from './assets/db.json';

import './scss/app.scss';

function App() {
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
                        {db.pizzas.map((obj, i) => {
                            return <PizzaBlock key={`${i}_${obj.name}`} {...obj} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
