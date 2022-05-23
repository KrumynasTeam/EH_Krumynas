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
    const [showMessenger, setShowMessenger] = useState(false);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className="positionInBottom" style={{marginLeft: window.innerWidth-50, top: window.innerHeight-65}}>
            { showMessenger &&
            <a style={{cursor: 'pointer', position: 'absolute'}} onClick={() => setShowMessenger(!showMessenger)} unselectable="on">
                <img style={{marginTop: '-250px', marginLeft: '-160px'}} src="https://www.tidio.com/images/frontpage/widget/live-chat-widget.png" width={250} height={400}/>
            </a>
            }
            <a style={{cursor: 'pointer'}} onClick={() => setShowMessenger(!showMessenger)}>
                <img className="image" src="https://cdn.iconscout.com/icon/free/png-256/facebook-messenger-2923653-2416656.png" width={50} height={50} />
            </a>
        </div>
    );
}