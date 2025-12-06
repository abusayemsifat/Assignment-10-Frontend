import React, { useEffect, useState } from 'react';

const PopularSection = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('./services.json')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className='mt-8 w-11/12 mx-auto'>
            <div>
                <h3 className='font-bold text-3xl text-center'>Popular Winter Care Services</h3>
            </div>

            <div className='grid grid-cols-3 mt-12 gap-10'>
                {
                    services.slice(0,3).map(service =>
                        <div className="card bg-base-100 w-96 shadow-sm max-h-[400px]">
                            <figure>
                                <img className='object-contain object-center'
                                    src={service?.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{service?.serviceName}</h2>
                                <div className='flex justify-between'>
                                    <p>Price: {service?.price}</p>
                                    <p>Rating: {service.rating}</p>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">View Details</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default PopularSection;