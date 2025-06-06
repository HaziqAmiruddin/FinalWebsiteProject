import React from 'react'
import './ImageLinkForm.css';

const ImageLinkForm = ({OnInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className='f3'>
                {'This Magic Ghost Will Detect Faces In Your Pictures, Give It A Try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5 '>
                    <input className='f4 pa2 w-70 center' type='text' onChange={OnInputChange}/>
                    <button 
                        className='w-30 grow f4 link pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;