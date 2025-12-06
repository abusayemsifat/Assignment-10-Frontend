import React from 'react';
import v1 from '../assets/vet1.jpg'
import v2 from '../assets/vet2.jpg'
import v3 from '../assets/vet3.jpg'

const MeetOurVets = () => {
    return (
        <div>
            <div>
                <h3 className='font-bold text-3xl text-center mb-7 mt-16'>Meet Our Expert Vets</h3>
            </div>

            <div className='flex justify-between gap-5 max-w-[1450px] mx-auto'>
                <div className="card bg-base-100 w-[450px] shadow-sm">
                    <figure>
                        <img
                            src={v1}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">James Herriot</h2>
                        <h3 className='font-semibold'>Winter Dermatology</h3>
                        <p>5 Years Exp.</p>
                        <div className="card-actions">
                            <button className="btn btn-primary w-full">Book Appointment</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-[450px] shadow-sm">
                    <figure>
                        <img
                            src={v2}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">Mary Brancker</h2>
                        <h3 className='font-semibold'>Cold weather nutrition</h3>
                        <p>6 Years Exp.</p>
                        <div className="card-actions">
                            <button className="btn btn-primary w-full">Book Appointment</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-[450px] shadow-sm">
                    <figure>
                        <img
                            src={v3}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold">Brian Sinclair</h2>
                        <h3 className='font-semibold'>Pet allergies and dry skin</h3>
                        <p>3 Years Exp.</p>
                        <div className="card-actions">
                            <button className="btn btn-primary w-full">Book Appointment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetOurVets;