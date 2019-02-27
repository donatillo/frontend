import React, { Component } from 'react';
import LoginButtons from './LoginButtons';
import { enterWithoutLogin } from "../actions/session";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const cardStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    width: '22rem',
    height: '17rem',
    zOrder: -1,
};

function mapDispatchToProps(dispatch) {
  return {
    enterWithoutLogin: () => dispatch(enterWithoutLogin())
  }
}

class LoginBox extends Component {

    enterWithoutLogin = () => {
        this.props.enterWithoutLogin();
    }

    render() {
        return (
            <div className="card" style={cardStyle}>
                <div className="card-body">
                    <h5 className="card-title">Welcome to donatillo!</h5>
                    <p className="card-body">Please sign in using one of the buttons below:</p>
                    <center><LoginButtons /></center>
                    <p className="card-body">
                        You can also <a href="#!" onClick={this.enterWithoutLogin}>enter without login</a>.
                    </p>
                </div>
            </div>);
    }
}

LoginBox.propTypes = {
  enterWithoutLogin: PropTypes.func
}

export default connect(null, mapDispatchToProps)(LoginBox);