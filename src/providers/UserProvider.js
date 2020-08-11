import React, { Component, createContext } from 'react';
import { auth } from '../configs/firebase';

export const UserContext = createContext();

class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => {
        auth.onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth });
        });
    };

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;
