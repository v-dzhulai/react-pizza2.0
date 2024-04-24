function Sizes({ sizes, activeSize, setActiveSize }) {
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
