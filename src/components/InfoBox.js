import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { session: state.get('session') };
}

class InfoBox extends Component {
    render() {
        return (
            <div>
                <p>Logged in!</p>
                <p>User name: {this.props.session.userName}</p>
                <p>User e-mail: {this.props.session.userEmail}</p>
                <p>User code: {this.props.session.userCode}</p>
                <p>User token: <tt>{this.props.session.token}</tt></p>
                <img src={this.props.session.userImage} alt='User' />
            </div>
        );
    }
}

export default connect(mapStateToProps)(InfoBox);