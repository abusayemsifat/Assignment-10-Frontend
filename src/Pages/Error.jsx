import React from 'react';
import errImg from '../assets/404.jpg'

const Error = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='h-full w-full'>
                <img src={errImg} alt="" className='object-cover' />
            </div>
            <a href="https://www.freepik.com/free-vector/error-404-concept-landing-page_4730712.htm#fromView=search&page=1&position=10&uuid=2511b95d-34d1-46ac-babf-634aaf025988&query=404+page+design">Image by pikisuperstar on Freepik</a>
        </div>
    );
};

export default Error;