import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import ghost from './LogoGhost.png';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className='Tilt br3 shadow-2' style={{width: '100px', height: '100px'}} scale={1.1} transitionSpeed={250}>
                <div className='flex items-center justify-center h-100'>
                    <h1 className='f6 tc'><img alt='logo' src={ghost} style={{width:'80px', height:'80px'}}></img></h1>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;