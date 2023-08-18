import Cart from "./Cart/Cart";
import ProductList from "./ProductList/ProductList";
import WindowDelivery from "./Cart/WindowDelivery/WindowDelivery";
import './Body.css';
import { useState } from "react";

function Body (props){
    const [windowClass, setWindowClass] = useState();
    const WindowDeliveryActive = (name) => {
        setWindowClass(name)
    }
    return(
        <div className="body">
            <WindowDelivery props={WindowDeliveryActive} class={windowClass}/>
            <Cart props={WindowDeliveryActive} class={windowClass}/>
            <ProductList category={props}/>
        </div>
    ); 
}

export default Body;