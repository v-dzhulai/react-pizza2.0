function Types({ types, indexActiveType, setIndexActiveType, typesTitle }) {
    return (
        <ul>
            {types.map((item, index) => {
                return (
                    <li
                        className={indexActiveType === index ? 'active' : ''}
                        onClick={() => setIndexActiveType(index)}
                        key={`${index}_${item}`}>
                        {typesTitle[index]}
                    </li>
                );
            })}
        </ul>
    );
}

export default Types;
