import React, { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectGoods} from '../../../store/goodsSlice'; 
import './ProductList.css';
import { increment } from "../../../store/cartSlice";
import WindowGoods from "./WindowGoods/WindowGoods";

function ProductList (props){
    const [windowClass, setWindowClass] = useState();
    const [dataKey, setDataKey] = useState();
    const goods = useSelector(selectGoods);
    const dispatch = useDispatch();
    const btnRef = useRef();
    
    
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
        console.log(btnRef.current)
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
        
            <div className="product-list">
            
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