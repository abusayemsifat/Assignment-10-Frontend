import React from 'react';
import Slider from '../Components/Slider';
import PopularSection from '../Components/PopularSection';
import MeetOurVets from '../Components/MeetOurVets';
import WinterCareTips from '../Components/WinterCareTips';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Slider></Slider>
            <div className='w-11/12 mx-auto'>
                <PopularSection></PopularSection>
                <WinterCareTips></WinterCareTips>
                <MeetOurVets></MeetOurVets>
            </div>
        </div>
    );
};

export default Home;