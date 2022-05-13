// --- IMPORTS --- //
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import Process from '../../components/Process'
import { getIsProfileLoading, getUserDetails, selectUserEmail, selectUserJoined, selectUserName, selectUserPostsCount } from '../slices/user'
import format from 'date-fns/format';
import "./Profile.css";

// --- DECLARATIONS --- //
const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUserName);
    const email = useSelector(selectUserEmail);
    const joined = useSelector(selectUserJoined);
    const numPosts = useSelector(selectUserPostsCount);

    const loading = useSelector(getIsProfileLoading);

    useEffect(() => {
        dispatch(getUserDetails({ id }));
    }, []);

    return (
        <main>
            <section className='profile'>
                {!loading && user && (
                    <div className='profile-card'>
                        <FaUserCircle className="user-menu-ico" />
                        <p className='profile-username'>{user}</p>
                        <p className='profile-email'>Email: {email || 'n/a'}</p>
                        <p className='profile-joined'>Joined: {format(new Date(joined), "MMMM dd, yyyy")}</p>
                        <p className='profile-postsCount'>Posts: <Link to={`/profile/posts/${id}`}>{numPosts || 0}</Link></p>
                    </div>
                )}
                {loading && !user && (
                    <Process msg="Loading user profile..." />
                )}
                {!loading && !user && (
                    <>
                        <p>Could not find user profile ...</p>
                    </>
                )}
            </section>
        </main>
    )
}

export default Profile;