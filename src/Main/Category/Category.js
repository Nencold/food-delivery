import React, { useEffect, useRef, useState } from 'react';
import './Category.css';

function Category (props){
    const btn = useRef();
    const [dataKey, setDataKey] = useState('Бургеры');
    const categoryRef = useRef();
    const [scroll, setScroll] = useState({
        isScrolling: false,
        clientX: '',
        scrollX: ''
    })
    const [width, setWidth] = useState();
    let categoriesList = [
        {
            id: 'Бургеры',
            img: 'images/icons/Бургеры.svg',
            name: 'Бургеры',
        },
        {
            id: 'Закуски',
            img: 'images/icons/Закуски.svg',
            name: 'Закуски',
        },
        {
            id: 'Хот-доги',
            img: 'images/icons/Хот-доги.svg',
            name: 'Хот-доги',
        },
        {
            id: 'Комбо',
            img: 'images/icons/Комбо.svg',
            name: 'Комбо',
        },
        {
            id: 'Шаурма',
            img: 'images/icons/Шаурма.svg',
            name: 'Шаурма',
        },
        {
            id: 'Пицца',
            img: 'images/icons/Пицца.svg',
            name: 'Пицца',
        },
        {
            id: 'Вок',
            img: 'images/icons/Вок.svg',
            name: 'Вок',
        },
        {
            id: 'Десерты',
            img: 'images/icons/Десерты.svg',
            name: 'Десерты',
        },
        {
            id: 'Соусы',
            img: 'images/icons/Соусы.svg',
            name: 'Соусы',
        },
    ]

    //прокрутка колесиком мыши
    useEffect(()=> {
        const el = categoryRef.current;
        if(el){
            const onWheel = e => {
                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 3,
                    behavior: 'smooth'
                })
            }
            
            el.addEventListener('wheel', onWheel)

            return () => el.removeEventListener('wheel', onWheel)
        }

    }, [])
    //скролл
    const onMouseDown = e => {
        if (categoryRef && categoryRef.current && !categoryRef.current.contains(e.target)){
            return
        }
        e.preventDefault()
        setScroll({
            ...scroll,
            isScrolling: true,
            clientX: e.clientX
        })
    }

    const onMouseUp = e => {
        if (categoryRef && categoryRef.current && !categoryRef.current.contains(e.target)){
            return
        }
        setScroll({
            ...scroll,
            isScrolling: false,
        })
    }

    const onMouseMove = e => {
        if (categoryRef && categoryRef.current && !categoryRef.current.contains(e.target)){
            return
        }

        const {clientX, scrollX, isScrolling} = scroll
        if(isScrolling) {
            setWidth( 1290 - window.innerWidth)
            let sX = scrollX - e.clientX + clientX
            let cX = e.clientX 
            categoryRef.current.scrollLeft = scrollX
            if(sX >= 0 && sX < width){
                setScroll({
                    ...scroll,
                    clientX: cX,
                    scrollX: sX
                })
               
            } 
        }
        
    }

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)

        return () => {
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
        }
    })


    const btnActive = e => {
        let btns = categoryRef.current.childNodes
        Array.from(btns).map(item => {
            item.classList.remove('active');
        })
        e.currentTarget.classList.add('active')
        setDataKey(e.currentTarget.dataset.key)
    }   
    
    useEffect(()=> {
        props.categoriesUpdate(dataKey)
    }, [dataKey])
        
    


    return(
            <div 
            className="category"
            ref={categoryRef} 
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            >
                {categoriesList.map((item, id) => {
                    if(item.id === dataKey){
                        return <button className = "category-btn active" onClick={btnActive} data-key={item.id} key={item.name+item.id} ref={btn}><img src={item.img} alt={id}/>{item.name}</button>
                    }else{
                        return <button className = "category-btn" onClick={btnActive} data-key={item.id} key={item.name+item.id} ref={btn}><img src={item.img} alt={id}/>{item.name}</button>
                    }
                    
                })}
            </div>
    );
}

export default Category;