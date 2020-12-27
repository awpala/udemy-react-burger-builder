import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const { ings, purchased } = this.props; // from Redux store

        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;

        const summary = ings
            ? (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
            : (<Redirect to="/" />);

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
}

export default connect(mapStateToProps)(Checkout);