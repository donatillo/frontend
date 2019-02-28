import React from 'react';
import title1 from '../images/title1.jpg';
import LoginBox from './LoginBox';

const cropStyle = {
    height: '100vh',
    overflow: 'hidden',
};

const imageStyle = {
    minHeight: '100vh',
    minWidth: '100vw',
};

export default function LoginScreen(props) {
    return (
        <div style={cropStyle}>
            <img src={title1} alt="Main logo" className="img-responsive float-right" style={imageStyle} />
            <LoginBox />
        </div>);
}
