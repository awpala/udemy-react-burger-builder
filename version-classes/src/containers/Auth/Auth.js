import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/';
import { checkValidity } from '../../shared/utility';

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

    componentDidMount() {
        const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props; // from Redux
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, fieldName) => {
        const { formData } = this.state;

        const updatedFormData = { 
            ...formData,
            [fieldName]: {
                ...formData[fieldName],
                value: event.target.value,
                valid: checkValidity(event.target.value, formData[fieldName].validation),
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
        const { isSignUp } = this.state;
        const { loading, error, isAuthenticated, authRedirectPath } = this.props; // from Redux store
        
        const formElementsArray = [];
        for (let key in this.state.formData) {
            formElementsArray.push({
                id: key,
                config: this.state.formData[key],
            });
        }

        const form = loading
            ? (<Spinner />)
            : (
                formElementsArray.map(formElement => {
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
                })
            );

        const errorMessage = error ? (<p>{error.message}</p>) : null;

        const authRedirect = isAuthenticated ? (<Redirect to={authRedirectPath}/>) : null;
        
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);