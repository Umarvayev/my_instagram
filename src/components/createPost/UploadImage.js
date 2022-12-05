import React from 'react';

const UploadImage = ({ imageInput, handleUpload}) => {
    return (
        <div className="relative p-6 flex items-center justify-center rang1" style={{width: 400, height: 100, zIndex: 10000}}>
            <div>
                <div className="flex justify-center">
                    <input
                        type="file"
                        className="hidden"
                        ref={imageInput}
                        onChange={handleUpload}
                    />
                    <button
                        type="button"
                        className="rand_bg_button bg-white"
                        onClick={() => imageInput.current.click()}
                    >
                        upload images
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadImage;
