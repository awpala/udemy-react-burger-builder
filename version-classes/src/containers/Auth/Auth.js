import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/';

class Auth extends Component {
    state = {
        formData: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        const { required, minLength, maxLength, isEmail, isNumeric } = rules;

        if (required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (minLength) {
            isValid = value.length >= minLength && isValid;
        }

        if (maxLength) {
            isValid = value.length <= maxLength && isValid;
        }

        if (isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        
        return isValid;
    }

    inputChangedHandler = (event, fieldName) => {
        const { formData } = this.state;

        const updatedFormData = { 
            ...formData,
            [fieldName]: {
                ...formData[fieldName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, formData[fieldName].validation),
                touched: true
            }
        };

        this.setState({ formData: updatedFormData });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { formData: { email, password }, isSignUp } = this.state;
        this.props.onAuth(email.value, password.value, isSignUp); // from Redux
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.formData) {
            formElementsArray.push({
                id: key,
                config: this.state.formData[key],
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

        const { isSignUp } = this.state;
        
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {mappedFormElements}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"
                >
                    SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    };
}

export default connect(null, mapDispatchToProps)(Auth);