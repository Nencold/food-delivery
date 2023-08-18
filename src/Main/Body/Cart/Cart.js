import './Cart.css';
import React, {useEffect, useRef, useState}  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../../../store/goodsSlice';
import { increment, decrement, selectCart } from '../../../store/cartSlice';


function Cart (props){
    const goods = useSelector(selectGoods);
    const cart = useSelector(selectCart);
    const body = useRef();
    const cartRef = useRef();
    const nothingRef = useRef();
    const dispatch = useDispatch();
    const [btnInactive, setBtnInactive] = useState()
    //переиндексирую массив товара
    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {});

    const getCount = () => {
        let count = Object.keys(cart).reduce((accum,item) => 
        accum += cart[item]
        , 0)
        return count;
    }

    const btnWindowActive = () => {
        if(getCount() === 0){
            return true
        }
        props.props('active')
    } 

    useEffect(()=>{
        if(getCount() === 0) setBtnInactive('inactive')
        else setBtnInactive('')
    })

    const getSum = () => {
        let sum = Object.keys(cart).reduce((accum,item) => 
        accum += cart[item] * goodsObj[item]['price']
        ,0)
        
        return sum;
    }

    const getDelivery = () => {
        let delivery = 'Стоимость доставки 199₽';
        if(getSum() >= 599 ) delivery = 'Бесплатная доставка'
        return delivery
    }

    const incrementHandler = e => {
        let el = e.target;
        dispatch(increment(el.getAttribute('data-articul')));
    }
    const decrementHandler = e => {
        let el = e.target;
        dispatch(decrement(el.getAttribute('data-articul')));
    }

    
    const activeToggleClass = () => {
        
        if(getCount() === 0){
            nothingRef.current.classList.toggle('active')
        }else{
            nothingRef.current.classList.remove('active')
            body.current.classList.toggle('active')
        }
        if(nothingRef.current.classList.contains('active') || body.current.classList.contains('active')){
            cartRef.current.classList.add('active')
        } else {
            cartRef.current.classList.remove('active')
        }
    };
    
    return(
        <div className="cart" ref={cartRef}>
            <div className="cart-title" onClick={activeToggleClass}>
                <div className="cart-title__name">
                    <h2>Корзина</h2>
                </div>
                <div className="cart-title__counter">
                    <p>{getCount()}</p>
                </div>
            </div>
            <div className="cart-nothing" ref={nothingRef}>
                <p>Тут пока пусто...</p>
            </div>
            <div className="cart__body" ref={body}>
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
                    <button className={`btn1 ${btnInactive}`} onClick={btnWindowActive}>Оформить заказ</button>
                    <div className="cart-title__delivery">
                        <img src="images/icons/Доставка.svg" alt="" /><p>{getDelivery()}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Cart;