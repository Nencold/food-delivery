import './Footer.css';

function Footer(){
    return(
        <div className="Footer">
            <div className="container">
                <div className="footer__row">
                    <div className="foorter__column-top">
                        <div className="footer__logo">
                            <img src="images/footerlogo.svg" alt="logo" />
                        </div>
                        <div className="footer__contacts">
                            <div className="footer__phone">
                                <p>Номер для заказа</p>
                                <p><a href="#"><img src="images/icons/Call.svg" alt="call"/></a>+7(930)833-38-11</p>
                            </div>
                            <div className="footer__social">
                                <p>Мы в соцсетях</p>
                                <a href="https://web.telegram.org/"><img src="images/icons/telegram.svg" alt="t" /></a>
                                <a href="https://www.facebook.com/"><img src="images/icons/facebook.png" alt="f" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="foorter__column">
                        <p>© YouMeal, 2022</p>
                        <p>Design: Anastasia Ilina</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;