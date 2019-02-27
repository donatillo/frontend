import React from 'react';

const boxStyle = {
    width: 400,
    marginLeft: -200,
    height: 300,
    marginTop: -150,
    backgroundColor: "white",
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'black',
    zIndex: 1,
};

const cardStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    width: "24rem",
    zOrder: -1,
};

export default function LoginBox(props) {
    return (
        <div className="mx-auto my-auto card" style={cardStyle}>
            <div className="card-body">
                <h5 className="card-title">Welcome to donatillo!</h5>
            </div>
        </div>);
}