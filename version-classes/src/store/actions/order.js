import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// action creators
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id,
        orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => { // N.B. redux-thunk provides ability to perform async actions in action creators
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData) // N.B. .json extension is used for Firebase (rather than the generic route /orders)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
