import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'rush', displayValue: 'Rush'},
                        { value: 'standard', displayValue: 'Standard'},
                        { value: 'economy', displayValue: 'Economy'},
                    ]
                },
                value: ''
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        const { ingredients, price } = this.props;
        const { orderForm } = this.state;

        this.setState({ loading: true });

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients,
            price,
            orderData: formData,
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        const mappedFormElements = formElementsArray.map(formElement => {
            const { config: { elementType, elementConfig, value }, id } = formElement;

            return (
                <Input
                    key={id}
                    elementType={elementType}
                    elementConfig={elementConfig}
                    value={value}
                    changed={(event) => this.inputChangedHandler(event, id)}
                />
            );
        });

        let form = this.state.loading
            ? <Spinner />
            : (
                <form onSubmit={this.orderHandler}>
                    {mappedFormElements}
                    <Button btnType="Success">ORDER</Button>
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