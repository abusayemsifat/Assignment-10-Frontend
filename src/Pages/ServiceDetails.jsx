import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ServiceDetails = () => {

    const [services, setServices] = useState([]);
    
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/services.json')
            .then(res => res.json())
            .then(data => {
                setServices(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const findResult = services.find(service => service.serviceId == id)

    if(loading){
        return <p>Loading.........</p>
    }

    return (
        <div className='flex flex-col items-center'>
            <img className='w-[400px]' src={findResult?.image} alt="" />
        </div>
    );
};

export default ServiceDetails;