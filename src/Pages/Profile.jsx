import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext)
    console.log(user)

    const [isOpen, setIsOpen] = useState(false)

    const handleOpenForm = () => {
        setIsOpen(!isOpen)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;

        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        }).then(() => {
            setUser({...user, photoURL:photoUrl, displayName:name})
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user?.photoURL} />
                </div>
            </div>
            <p className='font-bold text-xl'>{user?.displayName}</p>
            <p>{user?.email}</p>
            <button onClick={handleOpenForm} className="btn">Update Profile</button>

            {
                isOpen && (
                    <form onSubmit={handleUpdate} className="fieldset">
                        <label className="label">Name</label>
                        <input defaultValue={user?.displayName} name='name' type="text" className="input" placeholder="Your Name" />

                        <label className="label">Photo URL</label>
                        <input defaultValue={user?.photoURL} name='photoUrl' type="text" className="input" placeholder="Your url" />

                        <button className="btn btn-neutral mt-4">Update</button>
                    </form>
                )
            }
        </div>
    );
};

export default Profile;