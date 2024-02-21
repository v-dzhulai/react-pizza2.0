import { useState } from 'react';

function Sizes({ sizes }) {
    const [activeSize, setActiveSize] = useState(0);

    return (
        <ul>
            {sizes.map((item, index) => {
                return (
                    <li
                        className={activeSize === index ? 'active' : ''}
                        onClick={() => setActiveSize(index)}
                        key={`${index}_${item}`}>
                        {item} см.
                    </li>
                );
            })}
        </ul>
    );
}

export default Sizes;
