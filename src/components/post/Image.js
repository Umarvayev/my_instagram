import React from 'react';

const Image = ({ src, caption }) => {
    return (
        <img className='rasm2'
            src={src}
            alt={caption}
        />
    );
};

export default Image;
