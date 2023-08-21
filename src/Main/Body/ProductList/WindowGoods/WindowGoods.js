import './WindowGoods.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, selectCart, del } from '../../../../store/cartSlice';


function WindowGoods (props) {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const windowRef = useRef();
    const [activeClass, setActiveClass] = useState();
    const [count, setCount] = useState(1);
    
    useEffect(()=> {
        if(cart[props.articul] === undefined) setCount(1)
        else setCount(cart[props.articul])
    }, [props])

    useEffect(()=> {
        setActiveClass(props.class)
    })

    const closeHandler = () => {
        console.log()
        props.f1('')
        document.body.style.overflow = "visible";
    }

    const incrementHandler = () => {
        setCount(count+1)
    }
    const decrementHandler = () => {
        if(count === 0){
            return true
        }
        setCount(count-1)
    }

    const addHandler = e => {
        let el = e.target;
        dispatch(del(el.getAttribute('data-articul')))
        for(let i = 0; i < count; i++){
            dispatch(increment(el.getAttribute('data-articul')));
        }
        props.f1('')
        document.body.style.overflow = "visible";
    }

    
    return(
    <div className={`window-goods ${activeClass}`} ref={windowRef}>
        <div className="window-item">
            <div className="window-item__title">
                <h1>{props.name}</h1>
                <button className='close' onClick={closeHandler}>
                    <img src="images/icons/close.svg" alt="X" />
                </button>
            </div>
            <div className="window-item__body">
                <div className="window-item__img">
                    <img src={props.img} alt={props.name} />
                </div>
                <div className="window-item__description">
                     <h2>{props.description}</h2>
                     <h3>Состав:</h3>
                     <ul>
                        {Object.keys(props.composition).map(item =><li key={item}>{props.composition[item]}</li>)}
                     </ul>
                     <p>{`${props.weight}г, ${props.calories}ккал `}</p>
                </div>
            </div>
            <div className="window-item__add">
                <div className="window-item__btn">
                    <button className="btn-goods-window" data-articul={props.articul} onClick={addHandler}>Добавить</button>
                </div>
                <div className="window-item__counter">
                    <button onClick={decrementHandler}>-</button>
                    <p>{count}</p>
                    <button onClick={incrementHandler}>+</button>
                </div>
                <div className="window-item__price">
                    <p>{`${props.price * count}₽`}</p>   
                </div>
            </div>
        </div> 
    </div>
    );
}

export default WindowGoods;

