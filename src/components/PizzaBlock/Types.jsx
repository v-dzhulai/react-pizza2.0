import { useState } from 'react';

function Types({ types }) {
    const [indexActive, setIndexActive] = useState(0);
    const typesTitle = ['тонке', 'традиційне'];

    return (
        <ul>
            {types.map((item, index) => {
                return (
                    <li
                        className={indexActive === index ? 'active' : ''}
                        onClick={() => setIndexActive(index)}
                        key={`${index}_${item}`}>
                        {typesTitle[index]}
                    </li>
                );
            })}
        </ul>
    );
}

export default Types;
