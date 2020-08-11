import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import Button from '../Button';
import { auth } from '../../configs/firebase';

import styles from './index.module.css';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: null
        };
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: (message, className) => (
                <div className={className}>{message}</div>
            )
        });

        this.createAccountMode = this.props.match.path === '/create-account';
    }

    onFieldChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    createNewAccount = () => {
        if (this.state.password !== this.state.confirmPassword) {
            return this.setState({ error: 'Passwords do not match!' });
        }

        auth.createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        )
            .then(result => () => this.props.history.push('/'))
            .catch(error => {
                this.setState({
                    error: error.message
                });
            });
    };

    signIn() {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    onFormSubmit = e => {
        e.preventDefault();

        if (this.validator.allValid()) {
            this.createAccountMode ? this.createNewAccount() : this.signIn();
        } else {
            this.validator.showMessages();
        }
    };

    render() {
        return (
            <div>
                <h1 className={styles.title}>
                    {this.createAccountMode
                        ? 'Create Your Account'
                        : 'Welcome Back'}
                </h1>

                <form
                    noValidate
                    onSubmit={this.onFormSubmit}
                    className={styles.form}
                >
                    <p className={styles['spcial-error']}>{this.state.error}</p>

                    <input
                        onChange={this.onFieldChange}
                        type="email"
                        placeholder="Email"
                        name="email"
                        className={styles.input}
                    />
                    {this.validator.message(
                        'email',
                        this.state.email,
                        'required|email',
                        { className: styles.error }
                    )}

                    <input
                        onChange={this.onFieldChange}
                        type="password"
                        placeholder="Password"
                        name="password"
                        className={styles.input}
                    />
                    {this.validator.message(
                        'password',
                        this.state.password,
                        'required|min:8',
                        { className: styles.error }
                    )}

                    {this.createAccountMode ? (
                        <>
                            <input
                                onChange={this.onFieldChange}
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                className={styles.input}
                            />
                            {this.validator.message(
                                'confirmPassword',
                                this.state.confirmPassword,
                                'required|min:8',
                                { className: styles.error }
                            )}
                        </>
                    ) : (
                        ''
                    )}

                    <Button
                        text={
                            this.createAccountMode
                                ? 'Create account'
                                : 'Sign in'
                        }
                    />
                </form>
            </div>
        );
    }
}

export default AuthForm;
