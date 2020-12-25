import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        const { ingredients, price } = this.props;

        this.setState({ loading: true });

        const order = {
            ingredients,
            price,
            customer: {
                name: 'Max',
                address: {
                    street: '123 Fake St',
                    zipCode: '12345',
                    country: 'US'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'rush'
        }
        axios.post('/orders.json', order) // N.B. .json extension is used for Firebase (rather than the generic route /orders)
        .then(response => {
            // console.log(response)
            this.setState({ loading: false });
            this.props.history.push('/');
        })
        .catch(error => {
            // console.log(error)
            this.setState({ loading: false });
        });
    }

    render() {
        let form = this.state.loading
            ? <Spinner />
            : (
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            );

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;