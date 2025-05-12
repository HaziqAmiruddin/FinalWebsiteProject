import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxPosition = [], onImageLoad}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2 '>
                {imageUrl && <img id='inputImage' src={imageUrl}  alt={'Detected'} width='500px' height='auto' onLoad={onImageLoad}/>}

                    {
                        boxPosition.map((box, i) => {
                            console.log(`Box ${i}:`, box);
                            return (
                                <div
                                    key={i}
                                    className='bounding_box'
                                    style={{
                                        top: box.topRow,
                                        right: box.rightCol,
                                        bottom: box.bottomRow,
                                        left: box.leftCol
                                    }}
                                ></div>
                            );
                        })
                    }
            </div>
        </div>
    );
}

export default FaceRecognition;


