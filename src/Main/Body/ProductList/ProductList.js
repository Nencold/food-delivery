import React, { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectGoods} from '../../../store/goodsSlice'; 
import { selectCart } from "../../../store/cartSlice";
import './ProductList.css';
import { increment } from "../../../store/cartSlice";
import WindowGoods from "./WindowGoods/WindowGoods";

function ProductList (props){
    const productListRef = useRef();
    const [windowClass, setWindowClass] = useState('');
    const [dataKey, setDataKey] = useState();
    const goods = useSelector(selectGoods);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const [cartItem, setCartItem] = useState({});

    useEffect(()=>{
        setCartItem(cart)
        let list = productListRef.current.childNodes;
        
        for(let i = 0; i < list.length; i++){
            list[i].childNodes[4].classList.remove('active')
            Object.keys(cartItem).map(item => {
                if(list[i].getAttribute('data-articul') === item){
                    list[i].childNodes[4].classList.add('active')
                }
            })
        }
        })
    
    const goodsObj = goods.reduce((accum, item) => {
        accum[item['articul']] = item;
        return accum;
    }, {});
    
    const [goodsItem, setGoodsItem] = useState(goodsObj['123a']);

    useEffect(()=>{
        setDataKey(props.category.category)
    })

    const clickHandler = e => {
        let el = e.target;
        dispatch(increment(el.getAttribute('data-articul')));
    }

    const f1 = (ff) => {
        setWindowClass(ff);
    }

    const clickItemHhandler = e => {
        e.preventDefault();
        if(e.target.classList.contains('btn2')) return true
        let el = e.currentTarget.getAttribute('data-articul');
        setGoodsItem(goodsObj[el])
        f1('active')
        document.body.style.overflow = "hidden";
    }
    

    
    return(
        <div>
        <WindowGoods
        class={windowClass} 
        name={goodsItem.title} 
        img={goodsItem.img}
        description={goodsItem.description}
        composition={goodsItem.composition}
        weight={goodsItem.weight}
        calories={goodsItem.calories}
        price={goodsItem.price}
        articul={goodsItem.articul}
        f1={f1}
        />
        <h1>{dataKey}</h1>
            <div className="product-list" ref={productListRef}>
                {goods.map((item, id) => {
                    if(item.id === dataKey){
                        return ( 
                            <div className="goods-item" key={id + item.title} data-articul={item.articul} onClick={clickItemHhandler}>
                                <img src={item.img} alt={id} />
                                <p className="item-price">{item.price + '₽'}</p>
                                <p className="item-title">{item.title}</p>
                                <p className="item-weight">{item.weight + 'г'}</p>
                                <button className="btn2" data-articul={item.articul} onClick={clickHandler}>Добавить</button>
                            </div>
                        )
                    }
                })}

            </div>
        </div>
        
    );
}

export default ProductList;