// --- IMPORTS --- //
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getIsProfileLoading, getUserPosts, selectUserPosts } from '../slices/user';
import Process from '../../components/Process';
import Feed from '../../components/Feed';

// --- DECLARATIONS --- //
const UserPosts = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(selectUserPosts);
    const isLoading = useSelector(getIsProfileLoading);

    useEffect(() => {
        dispatch(getUserPosts({ id }));
    }, [])

    return (
        <section>
            {isLoading && !posts && (
                <Process msg="Loading user posts..." />
            )}
            {!isLoading && posts && (
                <Feed posts={posts} />
            )}
        </section>
    )
}

export default UserPosts