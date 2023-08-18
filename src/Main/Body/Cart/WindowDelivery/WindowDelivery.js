import { useRef, useState } from 'react';
import './WindowDelivery.css';
import { useEffect } from 'react';

function WindowDelivery (props) {
    const deliveryRef = useRef();
    const [windowClass, setWindowClass] = useState();
    useEffect(()=>{
        setWindowClass(props.class)
    })
    

    const deliveryCheckAdd = e => {
        if(e.target.checked){
            deliveryRef.current.classList.add('active')
        }
    }
    const deliveryCheckStop = e => {
        if(e.target.checked){
            deliveryRef.current.classList.remove('active')
        }
    }

    const btnHandler = e => {
        e.preventDefault();
    }


    const closeHandler = e => {
        props.props('')
    }
    return(
        <div className={`window-delivery ${windowClass}`}>
            <div className="window-delivery__row">
                <div className="window-delivery__column-img">
                    <img src="images/delivery.png" alt="" />
                </div>
                <div className="window-delivery__column-form">
                    <div className="window-delivery__close">
                    <button className='close' onClick={closeHandler}>
                        <img src="images/icons/close.svg" alt="X" />
                    </button>
                    </div>
                    
                    <form action="">
                        <div>
                            <h2>Доставка</h2>
                        </div>
                        <div>
                            <input type="text" name="name" placeholder='Ваше имя' className='form-inp'/>
                        </div>
                        <div>
                            <input type="tel" placeholder='Телефон' className='form-inp'/>
                        </div>
                        <div>
                            <label className='radio-label'>
                                <input type="radio" name='delivery' value='self-delivery' className='radio'onChange={deliveryCheckStop} defaultChecked/> 
                                <span className="radio-check"></span>
                                <span className='radio-text'>Самовывоз</span> 
                            </label>
                        </div>
                        <div>
                            <label className='radio-label'>
                                <input type="radio" name='delivery' value='delivery' className='radio' onChange={deliveryCheckAdd}/>
                                <span className="radio-check"></span>
                                <span className='radio-text'>Доставка</span>
                            </label>
                        </div> 
                        <div className="form__delivery" ref={deliveryRef}>
                            <div>
                                <input type="text" placeholder='Улица, дом, квартира'/>
                            </div>
                            <div className='form-last-inp'> 
                                <input type="number" placeholder='Этаж'/>
                                <input type="text" placeholder='Домофон'/>
                            </div>
                        </div> 
                        <div className="form-btn">
                            <button type="submit" className="btn2" onClick={btnHandler}>Оформить</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WindowDelivery;