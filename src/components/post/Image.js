import React from 'react';

const Image = ({ src, caption }) => {
    return (
        <img className='foto'
            src={src}
            alt={caption}
        />
    );
};

export default Image;
