import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react"

const Services = () => {

    const [services, setServices] = useState([]);
    const [category, setCategory] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/services?category=${category}`)
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log(err))
    }, [category])



    return (
        <div className='px-[145px]'>
            <select onChange={(e) => setCategory(e.target.value)} defaultValue="Choose category" className="select mt-8">
                <option disabled={true}>Choose category</option>
                <option value="pets">Pets</option>
                <option value="food">Food</option>
                <option value="accessories">Accessories</option>
                <option value="care products">Care Products</option>
            </select>
            <div className='grid grid-cols-3 mt-12 gap-10'>
                {
                    services.map(service =>
                        <motion.div initial={{ scale: 0.9 }} animate={{
                            scale: 1,
                            transition: { duration: 1 }
                        }}
                            className="card bg-base-100 w-96 shadow-sm max-h-[400px]">
                            <figure>
                                <img className='object-contain object-center'
                                    src={service?.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{service?.name}</h2>
                                <div className='flex justify-between'>
                                    <p>Price: {service?.price}</p>
                                    <p>Category: {service?.category}</p>
                                </div>
                                <div className="card-actions justify-end">
                                    <Link to={`/details/${service?._id}`}><button className="btn btn-primary">View Details</button></Link>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </div>
        </div>
    );
};

export default Services;