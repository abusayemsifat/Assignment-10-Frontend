import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router';

const MyServices = () => {

    const [myServices, setMyServices] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/my-services?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyServices(data))
            .catch(err => console.log(err))
    }, [user?.email])

    console.log(myServices)

    return (
        <div>
            My Services
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myServices?.map(service =>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={service?.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{service?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{service?.description}</p>
                                    </td>
                                    <td>{service?.price}</td>
                                    <th className='flex gap-3'>
                                        <button className="btn btn-error btn-xs">Delete</button>
                                        <Link to={`/update-services/${service?._id}`}><button className="btn btn-primary btn-xs">Edit</button></Link>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyServices;