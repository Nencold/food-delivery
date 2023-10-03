import './Cart.css';
import React, {useEffect, useRef, useState}  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../../../store/goodsSlice';
import { increment, decrement, selectCart } from '../../../store/cartSlice';


function Cart (props){
    const goods = useSelector(selectGoods);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);
    //переиндексирую массив товара
    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {});

    useEffect(()=>{
        let count = Object.keys(cart).reduce((accum,item) => 
        accum += cart[item]
        , 0)
        setCounter(count)
    })


    const btnWindowActive = () => {
        if(counter === 0){
            return true;
        }
        props.props('active');
        document.body.style.overflow = "hidden";
    } 


    const getSum = () => {
        let sum = Object.keys(cart).reduce((accum,item) => 
        accum += cart[item] * goodsObj[item]['price']
        ,0)
        
        return sum;
    }

    const getDelivery = () => {
        let delivery = 'Стоимость доставки 199₽';
        if(getSum() >= 599 ) delivery = 'Бесплатная доставка';
        return delivery;
    }

    const incrementHandler = e => {
        let el = e.target;
        dispatch(increment(el.getAttribute('data-articul')));
    }
    const decrementHandler = e => {
        let el = e.target;
        dispatch(decrement(el.getAttribute('data-articul')));
    }

    
    const [cartActive, setCartActive] = useState(false);

    
    return(
        <div className={`cart ${cartActive ? 'active': ''}`}>
            <div className="cart-title" onClick={() => cartActive ? setCartActive(false): setCartActive(true)}>
                <div className="cart-title__name">
                    <h2>Корзина</h2>
                </div>
                <div className="cart-title__counter">
                    <p>{counter}</p>
                </div>
            </div>
            <div className={`cart-nothing ${cartActive && counter === 0? 'active': ''}`}>
                <p>Тут пока пусто...</p>
            </div>
            <div className={`cart__body ${cartActive && counter > 0? 'active': ''}`}>
                {Object.keys(cart).map(item => { 
                        return (
                            <div className="cart-item" key={item + goodsObj.title}>
                                <div className="cart-item-img">
                                    <img src={goodsObj[item].img} alt={item.id} />
                                </div>
                                <div className="cart-item-description">
                                    <p className="name">
                                        {goodsObj[item].title}
                                    </p>
                                    <p className="weight">
                                        {goodsObj[item].weight + 'г'}
                                    </p>
                                    <p className="price">
                                        {goodsObj[item].price + '₽'}
                                    </p>
                                </div>
                                <div className="cart-item-counter">
                                <button data-articul={goodsObj[item].articul} onClick={decrementHandler}>-</button>
                                <p>{cart[item]}</p>
                                <button data-articul={goodsObj[item].articul} onClick={incrementHandler}>+</button>
                            </div>
                            </div>
                        )
                    })}
                <div className="cart__footer">
                    <div className="cart-title__total">
                        <p>Итого</p>
                        <p>{getSum() + '₽'}</p>
                    </div>
                    <button className={`btn1`} onClick={btnWindowActive}>Оформить заказ</button>
                    <div className="cart-title__delivery">
                        <img src="images/icons/Доставка.svg" alt="delivery" /><p>{getDelivery()}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Cart;