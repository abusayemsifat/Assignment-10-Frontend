import React from 'react';

const WinterCareTips = () => {
    return (
        <div>
            <div>
                <h3 className='font-bold text-3xl text-center mb-7 mt-16'>Winter Care Tips for Pets</h3>
            </div>
            <div className='flex justify-between gap-5 max-w-[1450px] mx-auto'>
                <div className='w-[330px] h-[360px] border-1 border-gray-400 shadow-lg flex flex-col justify-between p-6 rounded-xl'>
                    <p className='text-5xl'>❄️</p>
                    <h2 className='font-bold text-3xl'>Keep Your Pet Warm Indoors</h2>
                    <p>Provide a warm, draft-free bed and cozy blankets. Indoor temperatures should be comfortable, as pets can get chilly just like people during colder weather.</p>
                </div>
                <div className='w-[330px] h-[360px] border-1 border-gray-400 shadow-lg flex flex-col justify-between p-6 rounded-xl'>
                    <p className='text-5xl'>🐾</p>
                    <h2 className='font-bold text-3xl'>Moisturize Paws Regularly</h2>
                    <p>Protect paws from cracking by applying a pet-safe balm after walks. This creates a barrier against harsh salts and cold surfaces, preventing painful dryness.</p>
                </div>
                <div className='w-[330px] h-[360px] border-1 border-gray-400 shadow-lg flex flex-col justify-between p-6 rounded-xl'>
                    <p className='text-5xl'>🧥</p>
                    <h2 className='font-bold text-3xl'>Limit Outdoor Time</h2>
                    <p>Minimize your pet's exposure to freezing temperatures. Shorten walks and supervise outdoor breaks to prevent frostbite and keep them safe from winter hazards.</p>
                </div>
                <div className='w-[330px] h-[360px] border-1 border-gray-400 shadow-lg flex flex-col justify-between p-6 rounded-xl'>
                    <p className='text-5xl'>💧</p>
                    <h2 className='font-bold text-3xl'>Hydrated & Maintain Nutrition</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique accusamus tempore culpa odit sequi animi exercitationem quaerat? Reprehenderit dignissimos inventore cumque sunt quas voluptatibus sit!</p>
                </div>
            </div>
        </div>
    );
};

export default WinterCareTips;