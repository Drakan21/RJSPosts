// --- IMPORTS --- //
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAllFiltered,
    getPostStatus,
    getPostError,
    getAllPosts,
} from "../slices/posts";
import Feed from "../../components/Feed";
import STATUS from "../../api/commsStatus";
import NoPosts from "../post/NoPosts";

// --- DECLARATIONS --- //
const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllFiltered);
    const status = useSelector(getPostStatus);
    const error = useSelector(getPostError);

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    return (
        <main className="homeView">
            {status === STATUS.LOADING && <p className="statusMessage">Loading Posts ...</p>}
            {status === STATUS.FAILED && error && (
                <p className="statusMessage errorMessage">{error}</p>
            )}
            {status === STATUS.SUCCESS &&
                !error &&
                (posts?.length > 0 ? <Feed posts={posts} /> : <NoPosts />)}
        </main>
    );
}

export default Home;
