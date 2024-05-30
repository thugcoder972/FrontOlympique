import styled from "styled-components";
import Total from '../Cart/Total'
import CartItem from '../Cart/CartItem'
import { useSelector } from 'react-redux'

export default function Cart() {
    const cart = useSelector((state) => state.cart)
    return (
        <Wrapper>
            <div className="cart card">
                <div className="cart__left">
                    <div className="card-header row justify-content-between">
                        <div className="col-12 col-md-8">
                            <h3>Shopping Cart</h3>
                            {cart?.map((item) => (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            ))}
                        </div>
                        <div className="col-12 col-md-4 row align-items-end">
                            <Total />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.cart {
    display: flex;
    margin: 30px auto;
    height: max-content;
    padding: 20px 20px 0 20px;
    gap: 20px;
    flex: 1;
}

.cart__left {
    padding: 20px;
    width: 100%;
    background-color: white;
}

.cart__left h3 {
    font-size: 32px;
    font-weight: 450;
    padding-bottom: 20px;
    border-bottom: 1px solid gainsboro;
}

.cart__title {
    margin-right: 10px;
    padding: 10px;
    border-bottom: 1px solid lightgray;
}

@media(max-width: 800px) {
    .cart {
        flex-direction: column;
        margin: unset;
    }

    .cart__left {
        width: 100%;
    }

    .card-header {
        flex-direction: column;
    }

    .col-4, .col-8, .col-12 {
        width: 100%;
    }

    .row {
        flex-direction: column;
    }
}

@media(max-width: 500px) {
    .cart__left h3 {
        font-size: 24px;
    }
}
`;
