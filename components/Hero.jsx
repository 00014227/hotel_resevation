import React from 'react';

function Hero({children}) {
    return (
        <div className=' max-w-6xl flex justify-center items-center'>
            {children}
        </div>
    );
}

export default Hero;