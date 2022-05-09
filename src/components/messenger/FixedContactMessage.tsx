import React, { useEffect, useState } from 'react';
import './FixedContactMessage.scss';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export const FixedContactMessage = () => {
    const [_, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className="positionInBottom" style={{marginLeft: window.innerWidth-50, top: window.innerHeight-65}}>
            <a style={{cursor: 'pointer'}} onClick={() => window.location.reload()}>
                <img className="image" src="https://cdn.iconscout.com/icon/free/png-256/facebook-messenger-2923653-2416656.png" width={50} height={50} />
            </a>
        </div>
    );
}