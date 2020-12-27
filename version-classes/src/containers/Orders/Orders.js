import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        const { onFetchOrders, token } = this.props; // from Redux
        onFetchOrders(token);
    }

    render() {
        const { orders, loading } = this.props; // from Redux store

        const ordersOutput = !loading
        ? (
            orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        ) 
        : (<Spinner />)
        
        return (
            <div>
                {ordersOutput}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));