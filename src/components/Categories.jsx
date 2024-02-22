function Categories({ value, onClickCategory, categories }) {
    return (
        <div className="categories">
            <ul>
                {categories.map((title, i) => {
                    return (
                        <li
                            className={value === i ? 'active' : ''}
                            onClick={() => onClickCategory(i)}
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
