import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients(); // from Redux, async via redux-thunk
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        const { isAuthenticated, onSetAuthRedirectPath } = this.props; // from Redux

        if (isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    
    purchaseContinueHandler = () => {
        this.props.onInitPurchase(); // from Redux
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        const { purchasing } = this.state;
        const { ings, price, error, isAuthenticated, onIngredientAdded, onIngredientRemoved } = this.props; // from Redux store

        let orderSummary = !ings
            ? <Spinner/>
            : (
                <OrderSummary
                    ingredients={ings}
                    price={price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );

        let burger = !ings
            ? (error ? <p>Ingredients can't be loaded!</p> : <Spinner/>)
            : (
                <Aux>
                    <Burger ingredients={ings} />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(ings)}
                        price={price}
                        ordered={this.purchaseHandler}
                        isAuth={isAuthenticated}
                    />
                </Aux>
            );

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));