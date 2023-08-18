import Category from "./Category/Category";
import Body from "./Body/Body"
import './Main.css';
import { useState } from "react";

function Main(){
    const [category, setCategory] = useState();
    const categoriesUpdate = (value) => {
        setCategory(value)
    }
    return(
        <div className="Main">
            <div className="container">
                <Category categoriesUpdate={categoriesUpdate}/>
                <Body category={category}/>
            </div>
        </div>
    );
}

export default Main;