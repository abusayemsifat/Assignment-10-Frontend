import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ServiceDetails = () => {

    const [service, setService] = useState([]);
    
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3000/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])


    if(loading){
        return <p>Loading.........</p>
    }

    return (
        <div className='flex flex-col items-center'>
            <img className='w-[400px]' src={service?.image} alt="" />
            <h1>{service.name}</h1>
        </div>
    );
};

export default ServiceDetails;