import React from 'react';
import cartEmpty from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

function CartEmpty() {
    return (
        <>
            <div className="cart cart--empty">
                <h2>
                    Кошик пустий <icon>😕</icon>
                </h2>
                <p>Для того щоб замовити піцу перейдіть на головну сторінку.</p>
                <img src={cartEmpty} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Повернутися назад</span>
                </Link>
            </div>
        </>
    );
}

export default CartEmpty;
