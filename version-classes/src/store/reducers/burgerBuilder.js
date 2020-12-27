import * as actionTypes from '../actions/actionTypes';

const BASE_PRICE = 4;

const initialState = {
    ingredients: null,
    totalPrice: BASE_PRICE,
    error: false,
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return state.ingredients[action.ingredientName] > 0
                ? {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                    },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                }
                : { ...state }; // guard condition if state.ingredients[action.ingredientName] is already 0
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: { // N.B. must create object manually (i.e., rather than simply ingredients: action.ingredients) to correct Firebase backend's reordering 
                    lettuce: action.ingredients.lettuce,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: BASE_PRICE,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;