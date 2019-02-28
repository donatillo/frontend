import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import Main from './Main';

const mapStateToProps = state => {
    return { session: state.get('session') };
}

class App extends Component {
    render() {
        if (this.props.session.userCode != null)
            return <Main />;
        else
            return <LoginScreen />;
    }
}

export default connect(mapStateToProps)(App);