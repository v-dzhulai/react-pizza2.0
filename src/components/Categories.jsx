import { useState } from 'react';

function Categories() {
    const [indexActive, setIndexActive] = useState(0);
    const categories = ['Всі', "М'ясні", 'Веґетаріанські', 'Ґриль', 'Гострі', 'Закриті'];

    return (
        <div className="categories">
            <ul>
                {categories.map((title, i) => {
                    return (
                        <li
                            className={indexActive === i ? 'active' : ''}
                            onClick={() => setIndexActive(i)}
                            key={`${i}_${title}`}>
                            {title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Categories;
