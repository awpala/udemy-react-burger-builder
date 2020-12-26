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
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'standard', displayValue: 'Standard'},
                        { value: 'rush', displayValue: 'Rush'},
                        { value: 'economy', displayValue: 'Economy'},
                    ]
                },
                value: 'standard', // initial value populated by default
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
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

    checkValidity = (value, rules) => {
        let isValid = true;

        const { required, minLength, maxLength } = rules;

        if (required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (minLength) {
            isValid = value.length >= minLength && isValid;
        }

        if (maxLength) {
            isValid = value.length <= maxLength && isValid;
        }
        
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid });
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
            const { config: { elementType, elementConfig, value, validation, valid, touched }, id } = formElement;

            return (
                <Input
                    key={id}
                    elementType={elementType}
                    elementConfig={elementConfig}
                    value={value}
                    invalid={!valid}
                    shouldValidate={validation}
                    touched={touched}
                    changed={(event) => this.inputChangedHandler(event, id)}
                />
            );
        });

        let form = this.state.loading
            ? <Spinner />
            : (
                <form onSubmit={this.orderHandler}>
                    {mappedFormElements}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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